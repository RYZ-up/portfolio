import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { translations as dict } from './translations.js';

// New key: the old one ('portfolio-lang') was written on every visit, so it holds 'en'
// for visitors who never chose it. Only an explicit FR/EN click is stored now.
const STORAGE_KEY = 'portfolio-lang-choice';

const I18nContext = createContext({ lang: 'fr', t: k => k, toggle: () => {}, setLang: () => {} });

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* storage unavailable: default language */
  }
  // French by default (the audience is French recruiters); a visitor's own pick is remembered.
  return 'fr';
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dict[lang]['meta.title'];
  }, [lang]);

  const setLang = useCallback(next => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the choice lasts for this page only */
    }
  }, []);

  const t = useCallback(key => dict[lang][key] ?? dict.en[key] ?? key, [lang]);
  const toggle = useCallback(() => setLang(lang === 'fr' ? 'en' : 'fr'), [lang, setLang]);
  const value = useMemo(() => ({ lang, t, toggle, setLang }), [lang, t, toggle, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
