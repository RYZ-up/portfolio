import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/layout/ErrorBoundary.jsx';
import { I18nProvider } from './i18n/I18nProvider.jsx';
import { isLowPower } from './lib/device.js';
import './styles/tokens.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/encode.css';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
// Lets the CSS trim the heaviest paint effects on small machines (global.css).
if (isLowPower) document.documentElement.classList.add('low-power');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <App />
      </I18nProvider>
    </ErrorBoundary>
  </StrictMode>
);
