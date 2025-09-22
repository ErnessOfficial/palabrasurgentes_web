// scripts/gen-public-en.js
// Generate English (en-GB) translations into public/Articulos_en and blog-index-en.json
// Usage:
//   OPENAI_API_KEY="sk-..." node scripts/gen-public-en.js
// or via npm script: npm run gen:public-en

import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()

function cleanName(name) {
  return name
    .replace(/^[_\-\s]+/, '')
    .replace(/[\u2600-\u27BF\u{1F300}-\u{1FAFF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]+\s*/ug, '')
    .replace(/^[:•·\s]+/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function fileExists(p) {
  try { await fs.promises.access(p); return true } catch { return false }
}

async function extractTitleFromHtml(htmlPath) {
  try {
    const html = await fs.promises.readFile(htmlPath, 'utf8')
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch && titleMatch[1]) return cleanName(titleMatch[1])
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
    if (h1Match && h1Match[1]) return cleanName(h1Match[1])
  } catch {}
  return ''
}

async function walkArticles(articulosRoot) {
  const results = []
  async function walk(dir) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })
    const hasIndex = await fileExists(path.join(dir, 'index.html'))
    if (hasIndex) {
      const relDir = path.relative(articulosRoot, dir)
      const parts = relDir.split(path.sep).filter(Boolean)
      if (parts.length >= 3) {
        const category = cleanName(parts[0] || '')
        const subcategory = cleanName(parts[1] || '')
        const title = (await extractTitleFromHtml(path.join(dir, 'index.html'))) || cleanName(parts[parts.length - 1] || 'Artículo')
        const encodedPath = parts.map(p => encodeURIComponent(p)).join('/')
        results.push({ title, path: relDir.replace(/\\/g, '/'), encodedPath, category, subcategory })
      }
    }
    for (const e of entries) {
      if (e.isDirectory()) await walk(path.join(dir, e.name))
    }
  }
  try { await walk(articulosRoot) } catch {}
  return results
}

async function openaiTranslate(text, targetLang) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is required')
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
  if (!res.ok) throw new Error(`OpenAI error (${res.status}) while translating short text`)
  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content
  if (typeof content === 'string' && content.trim()) return content.trim()
  throw new Error('Empty translation response')
}

async function translateHtml(html, targetLangLabel) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is required')
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
        { role: 'system', content: `You are a professional translator. Translate the following HTML to ${targetLangLabel}. Preserve all HTML tags, attributes, and URLs. Translate only visible text content. Return only valid HTML.` },
        { role: 'user', content: html }
      ]
    })
  })
  if (!res.ok) throw new Error(`OpenAI error (${res.status}) while translating HTML`)
  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content
  if (typeof content === 'string' && content.trim()) return content
  throw new Error('Empty HTML translation response')
}

async function generateEnglishIndex(outDir) {
  const articulosRoot = path.resolve(rootDir, 'Articulos')
  await fs.promises.access(articulosRoot)
  const entries = await walkArticles(articulosRoot)
  const enEntries = []
  for (const e of entries) {
    const tCategory = await openaiTranslate(e.category, 'en-GB')
    const tSub = await openaiTranslate(e.subcategory, 'en-GB')
    const tTitle = await openaiTranslate(e.title, 'en-GB')
    enEntries.push({ ...e, category: tCategory, subcategory: tSub, title: tTitle })
  }
  const outPath = path.resolve(rootDir, outDir, 'blog-index-en.json')
  await fs.promises.mkdir(path.dirname(outPath), { recursive: true })
  await fs.promises.writeFile(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), count: enEntries.length, entries: enEntries }, null, 2), 'utf8')
}

async function copyRecursive(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true })
  const items = await fs.promises.readdir(src, { withFileTypes: true })
  for (const it of items) {
    const sp = path.join(src, it.name)
    const dp = path.join(dest, it.name)
    if (it.isDirectory()) {
      await copyRecursive(sp, dp)
    } else if (it.isFile()) {
      await fs.promises.copyFile(sp, dp)
    }
  }
}

async function generateEnglishContent(outDir) {
  const articulosRoot = path.resolve(rootDir, 'Articulos')
  await fs.promises.access(articulosRoot)
  const enRoot = path.resolve(rootDir, outDir, 'Articulos_en')
  const entries = await walkArticles(articulosRoot)
  for (const entry of entries) {
    const srcDir = path.join(articulosRoot, entry.path)
    const dstDir = path.join(enRoot, entry.path)
    await fs.promises.mkdir(dstDir, { recursive: true })
    await copyRecursive(srcDir, dstDir)
    const srcHtmlPath = path.join(srcDir, 'index.html')
    const dstHtmlPath = path.join(dstDir, 'index.html')
    try {
      const html = await fs.promises.readFile(srcHtmlPath, 'utf8')
      const translated = await translateHtml(html, 'British English (en-GB)')
      await fs.promises.writeFile(dstHtmlPath, translated, 'utf8')
      console.log('Translated:', entry.path)
    } catch (e) {
      console.warn('Failed to translate, kept ES version:', entry.path, e?.message || e)
    }
  }
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY no está configurada.');
    process.exit(1)
  }
  try {
    await generateEnglishContent('public')
    await generateEnglishIndex('public')
    console.log('\nListo: traducciones generadas en public/Articulos_en y blog-index-en.json')
  } catch (e) {
    console.error('Fallo al generar traducciones:', e)
    process.exit(1)
  }
}

main()

