
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import fa from "../locales/fa.json";
import en from "../locales/en.json";

const LanguageContext = createContext(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error(
      "useLanguage must be used within LanguageProvider"
    );
  }

  return context;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");

    return savedLanguage === "fa" ? "fa" : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translations = { fa, en };
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
