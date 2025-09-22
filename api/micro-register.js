// api/micro-register.js
// Receives registration data for the Micro-Learning module and forwards it
// to a Google Apps Script Web App (if configured) to write into a Sheet.
// Expected payload fields: name, age, email, accept, lang, date

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  try {
    const { name, age, email, accept, lang, date } = req.body || {}
    if (!name || !email) {
      res.status(400).json({ error: 'Missing required fields' })
      return
    }
    const now = new Date().toISOString()
    const SHEET_ID = process.env.MICRO_REGISTER_SHEET_ID || '1SMevfNeun14mgXrWuP62NSgxfO8T4sHsWWV8dh-4OH0'
    const SHEET_NAME = process.env.MICRO_REGISTER_SHEET_NAME || 'Hoja 1'
    const payload = {
      name, age, email,
      acceptance: accept || 'SI, ACEPTO',
      language: lang || 'ESPAÑOL',
      date: date || now,
      spreadsheetId: SHEET_ID,
      sheetName: SHEET_NAME,
    }

    const forwardUrl = process.env.MICRO_REGISTER_WEBHOOK
    if (!forwardUrl) {
      // Not configured: accept locally so UI can proceed without error
      res.status(200).json({ ok: true, forwarded: false, hint: 'Set MICRO_REGISTER_WEBHOOK to forward to Google Apps Script.' })
      return
    }

    // Forward as JSON to the Apps Script Web App (or any webhook you provide)
    const r = await fetch(forwardUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const text = await r.text()
    if (!r.ok) {
      res.status(502).json({ ok: false, error: 'Forward error', details: text })
      return
    }
    res.status(200).json({ ok: true, forwarded: true, response: text })
  } catch (err) {
    res.status(500).json({ error: 'Internal Error', message: err?.message || String(err) })
  }
}
