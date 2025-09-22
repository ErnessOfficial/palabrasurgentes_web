import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

type ArticleEntry = {
  title: string
  path: string // raw, unencoded relative to Articulos
  encodedPath: string // encoded for routing
  category: string
  subcategory: string
}

async function fileExists(p: string) {
  try { await fs.promises.access(p); return true } catch { return false }
}

async function writeAtomic(filePath: string, data: string) {
  const dir = path.dirname(filePath)
  const tmp = path.join(dir, `.${path.basename(filePath)}.tmp`)
  await fs.promises.mkdir(dir, { recursive: true })
  await fs.promises.writeFile(tmp, data, 'utf8')
  await fs.promises.rename(tmp, filePath)
}

function cleanName(name: string) {
  // Strip some common prefixes/symbols and extra spaces
  return name
    .replace(/^[_\-\s]+/, '')
    .replace(/^[\u2600-\u27BF\u{1F300}-\u{1FAFF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]+\s*/u, '')
    .replace(/^[:•·\s]+/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function extractTitleFromHtml(htmlPath: string) {
  try {
    const html = await fs.promises.readFile(htmlPath, 'utf8')
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch && titleMatch[1]) return cleanName(titleMatch[1])
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
    if (h1Match && h1Match[1]) return cleanName(h1Match[1])
  } catch {}
  return ''
}

async function walkArticles(articulosRoot: string): Promise<ArticleEntry[]> {
  const results: ArticleEntry[] = []

  async function walk(dir: string) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })
    const hasIndex = await fileExists(path.join(dir, 'index.html'))
    if (hasIndex) {
      const relDir = path.relative(articulosRoot, dir)
      const parts = relDir.split(path.sep).filter(Boolean)
      // Consider as article only if it follows Category/Subcategory/Article structure
      if (parts.length >= 3) {
        const category = cleanName(parts[0] || '')
        const subcategory = cleanName(parts[1] || '')
        const title = (await extractTitleFromHtml(path.join(dir, 'index.html'))) || cleanName(parts[parts.length - 1] || 'Artículo')
        const encodedPath = parts.map(p => encodeURIComponent(p)).join('/')
        results.push({ title, path: relDir.replace(/\\/g, '/'), encodedPath, category, subcategory })
      }
    }
    // Recurse further regardless, to find deeper articles
    for (const e of entries) {
      if (e.isDirectory()) await walk(path.join(dir, e.name))
    }
  }

  try { await walk(articulosRoot) } catch {}
  return results
}

async function writeBlogIndex(rootDir: string, outFile: string) {
  const articulosRoot = path.resolve(rootDir, 'Articulos')
  try {
    await fs.promises.access(articulosRoot)
  } catch {
    return
  }
  const entries = await walkArticles(articulosRoot)
  const json = JSON.stringify({ generatedAt: new Date().toISOString(), count: entries.length, entries }, null, 2)
  await writeAtomic(outFile, json)
}

async function openaiTranslate(text: string, targetLang: 'en' | 'es'): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return text
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: [
        { role: 'system', content: `Translate the following text to ${targetLang}. Return only the translation.` },
        { role: 'user', content: text }
      ]
    })
  })
  if (!res.ok) return text
  const data = await res.json() as any
  const content = data?.choices?.[0]?.message?.content
  return typeof content === 'string' && content.trim() ? content.trim() : text
}

async function translateHtml(html: string, targetLang: 'en' | 'es'): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return html
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: [
        { role: 'system', content: `You are a professional translator. Translate the following HTML to ${targetLang}. Preserve all HTML tags, attributes, and URLs. Translate only visible text content. Return only valid HTML.` },
        { role: 'user', content: html }
      ]
    })
  })
  if (!res.ok) return html
  const data = await res.json() as any
  const content = data?.choices?.[0]?.message?.content
  return typeof content === 'string' && content.trim() ? content : html
}

async function generateEnglishIndex(rootDir: string, outDir: string) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return
  const articulosRoot = path.resolve(rootDir, 'Articulos')
  try { await fs.promises.access(articulosRoot) } catch { return }
  const entries = await walkArticles(articulosRoot)
  const enEntries = [] as any[]
  for (const e of entries) {
    const tCategory = await openaiTranslate(e.category, 'en')
    const tSub = await openaiTranslate(e.subcategory, 'en')
    const tTitle = await openaiTranslate(e.title, 'en')
    enEntries.push({ ...e, category: tCategory, subcategory: tSub, title: tTitle })
  }
  const outPath = path.resolve(rootDir, outDir, 'blog-index-en.json')
  const enJson = JSON.stringify({ generatedAt: new Date().toISOString(), count: enEntries.length, entries: enEntries }, null, 2)
  await writeAtomic(outPath, enJson)
}

async function generateEnglishContent(rootDir: string, outDir: string) {
  const apiKey = process.env.OPENAI_API_KEY
  // If no API key, skip translation generation
  if (!apiKey) return

  const articulosRoot = path.resolve(rootDir, 'Articulos')
  const outRoot = path.resolve(rootDir, outDir)
  const enRoot = path.join(outRoot, 'Articulos_en')
  try { await fs.promises.access(articulosRoot) } catch { return }

  const entries = await walkArticles(articulosRoot)

  // Copy each article directory and translate its index.html
  for (const entry of entries) {
    const srcDir = path.join(articulosRoot, entry.path)
    const dstDir = path.join(enRoot, entry.path)
    await fs.promises.mkdir(dstDir, { recursive: true })
    // Copy everything first
    const copyRecursive = async (s: string, d: string) => {
      const items = await fs.promises.readdir(s, { withFileTypes: true })
      for (const it of items) {
        const sp = path.join(s, it.name)
        const dp = path.join(d, it.name)
        if (it.isDirectory()) {
          await fs.promises.mkdir(dp, { recursive: true })
          await copyRecursive(sp, dp)
        } else if (it.isFile()) {
          await fs.promises.copyFile(sp, dp)
        }
      }
    }
    await copyRecursive(srcDir, dstDir)
    // Translate index.html
    const srcHtmlPath = path.join(srcDir, 'index.html')
    const dstHtmlPath = path.join(dstDir, 'index.html')
    try {
      const html = await fs.promises.readFile(srcHtmlPath, 'utf8')
      const translated = await translateHtml(html, 'en')
      await fs.promises.writeFile(dstHtmlPath, translated, 'utf8')
    } catch {
      // Keep copied file as-is if translation fails
    }
  }

  // Create English index JSON with translated titles/categories
  await generateEnglishIndex(rootDir, outDir)
}

function serveAndCopyArticulos(): Plugin {
  let rootDir = ''
  let outDir = 'dist'

  const copyDir = async (src: string, dest: string) => {
    await fs.promises.mkdir(dest, { recursive: true })
    const entries = await fs.promises.readdir(src, { withFileTypes: true })
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)
      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath)
      } else if (entry.isFile()) {
        await fs.promises.copyFile(srcPath, destPath)
      }
    }
  }

  let isServe = false
  return {
    name: 'serve-and-copy-articulos',
    configResolved(resolved) {
      rootDir = resolved.root
      outDir = resolved.build.outDir
      isServe = (resolved as any).command === 'serve'
      // Generate blog-index.json in public for dev (and also keep checked-in copy up to date)
      const publicIndex = path.resolve(rootDir, 'public', 'blog-index.json')
      writeBlogIndex(rootDir, publicIndex).catch(() => {})
      // In dev, generate only English index (fast). Full EN site is generated at build time.
      generateEnglishIndex(rootDir, 'public').catch(() => {})
    },
    configureServer(server) {
      const articulosRoot = path.resolve(rootDir, 'Articulos')
      let timer: NodeJS.Timeout | null = null
      // Local dev API handlers if no DEV_API_PROXY is defined
      if (!process.env.DEV_API_PROXY) {
        server.middlewares.use(async (req: any, res, next) => {
          if (!req.url || !req.url.startsWith('/api/')) return next()
          try {
            let handler: any = null
            if (req.url.startsWith('/api/translate')) {
              const mod = await import(path.resolve(rootDir, 'api', 'translate.js'))
              handler = mod.default
            } else if (req.url.startsWith('/api/chat')) {
              const mod = await import(path.resolve(rootDir, 'api', 'chat.js'))
              handler = mod.default
            }
            if (!handler) return next()

            const method = (req.method || '').toUpperCase()
            if (['POST', 'PUT', 'PATCH'].includes(method)) {
              let raw = ''
              req.on('data', (chunk: Buffer) => { raw += chunk.toString('utf8') })
              req.on('end', async () => {
                try { req.body = raw ? JSON.parse(raw) : {} } catch { req.body = {} }
                await handler(req, res)
              })
              return
            } else {
              await handler(req, res)
              return
            }
          } catch {
            return next()
          }
        })
      }
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/Articulos/')) return next()
        const relUrl = decodeURIComponent(req.url.replace('/Articulos/', ''))
        const filePath = path.resolve(articulosRoot, relUrl)
        if (!filePath.startsWith(articulosRoot)) {
          res.statusCode = 403
          res.end('Forbidden')
          return
        }

        fs.stat(filePath, (err, stat) => {
          if (err) {
            res.statusCode = 404
            res.end('Not found')
            return
          }
          const streamPath = stat.isDirectory()
            ? path.join(filePath, 'index.html')
            : filePath

          const stream = fs.createReadStream(streamPath)
          stream.on('error', () => {
            res.statusCode = 404
            res.end('Not found')
          })
          stream.pipe(res)
        })
      })
      // Watch Articulos and regenerate index on changes
      server.watcher.add(articulosRoot)
      server.watcher.on('all', (_event, changedPath) => {
        if (!changedPath.includes('Articulos')) return
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          const publicIndex = path.resolve(rootDir, 'public', 'blog-index.json')
          writeBlogIndex(rootDir, publicIndex).catch(() => {})
          // Only EN index in dev to avoid heavy/slow rebuilds
          generateEnglishIndex(rootDir, 'public').catch(() => {})
        }, 300)
      })
    },
    async closeBundle() {
      const src = path.resolve(rootDir, 'Articulos')
      try {
        await fs.promises.access(src)
      } catch {
        return
      }
      const dest = path.resolve(rootDir, outDir, 'Articulos')
      await copyDir(src, dest)
      // Also emit blog-index.json into build output
      const outIndex = path.resolve(rootDir, outDir, 'blog-index.json')
      await writeBlogIndex(rootDir, outIndex)
      // Generate English translations and index if API key is available
      await generateEnglishContent(rootDir, outDir)
    },
  }
}

export default defineConfig(({ command, mode }) => {
  const proxy = process.env.DEV_API_PROXY
    ? { '/api': { target: process.env.DEV_API_PROXY, changeOrigin: true } }
    : undefined
  return {
    plugins: [react(), serveAndCopyArticulos()],
    server: { port: 5173, open: true, proxy },
    preview: { port: 5173, open: true, proxy },
  }
})
