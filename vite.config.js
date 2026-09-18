import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Serves the Netlify chat function during `npm run dev`, so the chat works
// locally without the Netlify CLI. In production Netlify runs the real one.
function devChatFunction(env) {
  return {
    name: 'dev-chat-function',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/.netlify/functions/chat', async (req, res) => {
        try {
          process.env.GROQ_API_KEY = env.GROQ_API_KEY;
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const request = new Request('http://localhost/chat', {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            body: req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks)
          });
          const mod = await server.ssrLoadModule('/netlify/functions/chat.mjs');
          const response = await mod.default(request);
          res.statusCode = response.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(await response.text());
        } catch {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'dev function failed' }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), devChatFunction(env)]
  };
});
