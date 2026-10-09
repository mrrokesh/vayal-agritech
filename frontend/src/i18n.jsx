import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const LangContext = createContext(null);

function initialLang() {
  try { return localStorage.getItem('vayal-lang') === 'ta' ? 'ta' : 'en'; } catch { return 'en'; }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('vayal-lang', lang); } catch { /* storage blocked */ }
  }, [lang]);
  // t(english, tamil) — either argument may be a string or JSX.
  const t = useCallback((en, ta) => (lang === 'ta' ? ta : en), [lang]);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
