import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      {
        name: 'api-dev-server',
        configureServer(server) {
          server.middlewares.use('/api/gemma', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let bodyStr = '';
            req.on('data', (chunk: any) => { bodyStr += chunk; });
            req.on('end', async () => {
              try {
                const body = bodyStr ? JSON.parse(bodyStr) : {};
                const apiKey = env.GEMMA_API_KEY || env.GOOGLE_API_KEY || env.VITE_GEMMA_API_KEY || process.env.GEMMA_API_KEY || process.env.GOOGLE_API_KEY;

                if (!apiKey) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    error: 'GEMMA_API_KEY is missing in environment variables. Please add GEMMA_API_KEY or GOOGLE_API_KEY to your .env file or Vercel Settings.'
                  }));
                  return;
                }

                const { prompt, systemPrompt, modelName } = body;
                const selectedModel = env.GEMMA_MODEL || env.VITE_GEMMA_MODEL || process.env.GEMMA_MODEL || modelName || 'gemma-2-27b-it';
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

                const parts: Array<{ text: string }> = [];
                if (systemPrompt) {
                  parts.push({ text: `System Instruction: ${systemPrompt}` });
                }
                parts.push({ text: prompt });

                const apiRes = await fetch(apiUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    contents: [{ parts }],
                    generationConfig: {
                      temperature: 0.7,
                      topK: 40,
                      topP: 0.95,
                      maxOutputTokens: 2048
                    }
                  })
                });

                const data: any = await apiRes.json();
                res.statusCode = apiRes.status;
                res.setHeader('Content-Type', 'application/json');
                if (apiRes.ok && data.candidates?.[0]?.content?.parts?.[0]) {
                  res.end(JSON.stringify({ text: data.candidates[0].content.parts[0].text }));
                } else {
                  res.end(JSON.stringify({ error: data.error?.message || 'Gemma API error', details: data }));
                }
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
              }
            });
          });
        }
      }
    ]
  };
});
