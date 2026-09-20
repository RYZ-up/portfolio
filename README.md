# Portfolio de Rayane YAZID

Bento-grid portfolio built with React + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Copy `.env.example` to `.env` to enable the visit counter (Firebase), the weather
card (OpenWeather) and the chat (Groq, server-side only).

## Structure

```
index.html              entry point (favicon, fonts, first-paint theme color)
netlify/functions/      serverless chat endpoint (also served by Vite in dev)
public/                 files served as-is
  cv/                   CV opened by the "CV" button
  images/projects/      project covers (folder, stacked photos, gallery)
src/
  main.jsx  App.jsx     bootstrap and page layout
  components/
    layout/             Nav, Logo
    sidebar/            left column (about, facts, gallery, contact)
    cards/              one folder per bento card (component + its CSS)
    ui/                 generic building blocks (BentoCard, BorderGlow, Folder, Stack…)
    icons/              SVG icon components
  data/                 static content (profile, socials + links, tools, projects…)
  hooks/                useVisitCount, useWeather
  lib/                  pure helpers (activity and presence models)
  i18n/                 FR / EN provider and translations
  styles/               design tokens, global rules, grid layout
  assets/               images, school / tool logos, Lottie animations, textures
```

## Editing content

- **Links** (GitHub, LinkedIn, CV): `src/data/socials.js`
- **Texts (FR / EN)**: `src/i18n/translations.js`
- **Grid placement of the cards**: `src/styles/layout.css` (`.cell-*` classes)
