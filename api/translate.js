// api/translate.js
// ESM serverless-style handler. Translates HTML content preserving structure.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY) {
    res.status(500).json({ error: 'Missing OPENAI_API_KEY' })
    return
  }
  try {
    const { html, targetLang = 'en' } = req.body || {}
    if (!html || typeof html !== 'string') {
      res.status(400).json({ error: 'Invalid payload' })
      return
    }
    const langLabel = targetLang === 'en-GB' ? 'British English (en-GB)' : targetLang
    const prompt = `You are a professional translator. Translate the following HTML to ${langLabel}. Preserve all HTML tags, attributes, and URLs. Only translate visible text content. Do not add explanations. Return only valid HTML.`
    const openaiApiUrl = 'https://api.openai.com/v1/chat/completions'
    const response = await fetch(openaiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: html }
        ]
      })
    })
    const data = await response.json()
    if (!response.ok) {
      res.status(response.status).json({ error: 'OpenAI API Error', details: data })
      return
    }
    const translated = data.choices?.[0]?.message?.content || ''
    res.status(200).json({ html: translated })
  } catch (err) {
    res.status(500).json({ error: 'Internal Error', message: err?.message || String(err) })
  }
}
