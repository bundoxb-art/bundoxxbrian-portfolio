"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations, Lang } from "./translations";

interface LanguageContextType {
  lang: Lang;
  t: (typeof translations)["en"];
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: translations.en,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("bb_lang") as Lang;
    if (saved === "en" || saved === "sw") setLang(saved);
  }, []);

  function toggleLang() {
    const next: Lang = lang === "en" ? "sw" : "en";
    setLang(next);
    localStorage.setItem("bb_lang", next);
  }

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}