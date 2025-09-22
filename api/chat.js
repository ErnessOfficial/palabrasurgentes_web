// api/chat.js
// Modo ESM (package.json tiene "type": "module"), usando fetch nativo de Node 18+

export default async function handler(req, res) {
    // 1. Asegurarnos de que la solicitud sea POST
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed', message: 'Solo se permiten solicitudes POST' });
        return;
    }

    // 2. Obtener los mensajes del cuerpo de la solicitud del frontend
    // Tu frontend enviará algo como: { messages: [{ role: "system", content: "..." }, { role: "user", content: "..." }] }
    const { messages } = req.body;

    if (!messages) {
        res.status(400).json({ error: 'Bad Request', message: 'Falta el campo "messages" en el cuerpo de la solicitud' });
        return;
    }

    // 3. Tu clave de API de OpenAI (¡secreta!)
    // Vercel te permite configurar esto como una variable de entorno.
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
        console.error("Error: OPENAI_API_KEY no está configurada en las variables de entorno.");
        res.status(500).json({ error: 'Configuration Error', message: 'La clave API del servidor no está configurada.' });
        return;
    }

    // 4. Llamar a la API de OpenAI
    const openaiApiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const openaiResponse = await fetch(openaiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}` // Usamos la clave aquí
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // O el modelo que estés usando
                messages: messages // Pasamos los mensajes recibidos del frontend
            })
        });

        const data = await openaiResponse.json();

        // 5. Devolver la respuesta de OpenAI (o el error) al frontend
        if (!openaiResponse.ok) {
            console.error('Error de OpenAI API:', data);
            // No envíes el error completo de OpenAI al cliente por seguridad, solo un mensaje genérico o el status.
            res.status(openaiResponse.status).json({ error: 'OpenAI API Error', details: data.error ? data.error.message : 'Error desconocido de OpenAI' });
        } else {
            res.status(200).json(data);
        }

    } catch (error) {
        console.error('Error interno del servidor al llamar a OpenAI:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
