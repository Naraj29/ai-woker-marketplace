export const maxDuration = 60;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey =
    process.env.GEMMA_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMMA_API_KEY is not set. Add it in Vercel → Settings → Environment Variables.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { prompt, systemPrompt } = body || {};

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt parameter is required' });
    }

    // Confirmed available model for this API key (run ListModels to verify)
    const model = 'gemma-4-31b-it';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const parts = [];
    if (systemPrompt) {
      parts.push({ text: `System Instruction: ${systemPrompt}` });
    }
    parts.push({ text: prompt });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`[Gemma API Error] status=${response.status} model=${model}`, JSON.stringify(data));
      return res.status(response.status).json({
        error: data?.error?.message || `Gemma API error ${response.status}`,
        details: data,
      });
    }

    if (
      data.candidates &&
      data.candidates[0]?.content?.parts?.[0]?.text
    ) {
      return res.status(200).json({
        text: data.candidates[0].content.parts[0].text,
      });
    }

    return res.status(500).json({ error: 'Unexpected response format from Gemma API', raw: data });
  } catch (error) {
    console.error('[Server Error]', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
