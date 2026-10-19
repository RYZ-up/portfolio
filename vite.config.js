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

// Same for the GitHub calendar (/api/github) and the services status
// (/api/status) and the repositories (/api/repos), in `vite` and `vite preview`.
function devApiFunctions(env) {
  const handle = server => {
    for (const name of ['github', 'status', 'repos']) {
      server.middlewares.use(`/api/${name}`, async (_req, res) => {
        process.env.GROQ_API_KEY = env.GROQ_API_KEY;
        process.env.VITE_OPENWEATHER_API_KEY = env.VITE_OPENWEATHER_API_KEY;
        const { default: fn } = await import(`./netlify/functions/${name}.mjs`);
        const response = await fn();
        res.statusCode = response.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(await response.text());
      });
    }
  };
  return { name: 'dev-api-functions', configureServer: handle, configurePreviewServer: handle };
}

// Visits: no Netlify Blobs locally, so the dev server reads the live total
// (GET only: reloading during development never counts as a visit).
function devVisitsFunction() {
  const handle = server => {
    server.middlewares.use('/api/visits', async (_req, res) => {
      try {
        const live = await fetch('https://ryazid.fr/api/visits');
        res.statusCode = live.status;
        res.setHeader('Content-Type', 'application/json');
        res.end(await live.text());
      } catch {
        res.statusCode = 502;
        res.end(JSON.stringify({ error: 'unavailable' }));
      }
    });
  };
  return { name: 'dev-visits-function', configureServer: handle, configurePreviewServer: handle };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // Date of this build, shown under the visit counter.
    define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString()) },
    plugins: [react(), devChatFunction(env), devApiFunctions(env), devVisitsFunction()]
  };
});
