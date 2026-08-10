export const maxDuration = 60;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMMA_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMMA_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      error: 'GEMMA_API_KEY environment variable is not configured on the server. Please set GEMMA_API_KEY or GOOGLE_API_KEY in Vercel Environment Variables.' 
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { prompt, systemPrompt, modelName } = body || {};
    const selectedModel = process.env.GEMMA_MODEL || process.env.VITE_GEMMA_MODEL || modelName || 'gemma-2-27b-it';

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt parameter is required' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

    const parts = [];
    if (systemPrompt) {
      parts.push({ text: `System Instruction: ${systemPrompt}` });
    }
    parts.push({ text: prompt });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemma API response error:', response.status, errorData);
      return res.status(response.status).json({
        error: `Gemma API returned error status ${response.status}`,
        details: errorData
      });
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return res.status(200).json({
        text: data.candidates[0].content.parts[0].text
      });
    }

    return res.status(500).json({ error: 'Invalid response format received from Gemma API' });
  } catch (error: any) {
    console.error('Server error calling Gemma API:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
