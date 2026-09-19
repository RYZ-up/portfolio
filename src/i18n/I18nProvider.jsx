import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { translations as dict } from './translations.js';

const STORAGE_KEY = 'portfolio-lang';

const I18nContext = createContext({ lang: 'fr', t: k => k, toggle: () => {}, setLang: () => {} });

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* storage unavailable: fall through to browser language */
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dict[lang]['meta.title'];
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = useCallback(key => dict[lang][key] ?? dict.en[key] ?? key, [lang]);
  const toggle = useCallback(() => setLang(l => (l === 'fr' ? 'en' : 'fr')), []);
  const value = useMemo(() => ({ lang, t, toggle, setLang }), [lang, t, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
