import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyMotion } from 'motion/react';
import App from './App.jsx';
import { I18nProvider } from './i18n/I18nProvider.jsx';
import './styles/index.css';

// `strict`: any full `motion.*` component (which would pull the whole engine back into the
// first bundle) throws in development instead of silently costing ~30 kB.
const loadFeatures = () => import('./lib/motion-features.js').then(mod => mod.default);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyMotion features={loadFeatures} strict>
      <I18nProvider>
        <App />
      </I18nProvider>
    </LazyMotion>
  </StrictMode>
);
