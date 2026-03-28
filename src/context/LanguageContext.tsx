"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (ar: string, en: string) => string;
  isMounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved language preference
    const savedLang = localStorage.getItem("avatar-language") as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";
    setLanguage(newLang);
    localStorage.setItem("avatar-language", newLang);
  };

  const t = (ar: string, en: string): string => {
    return language === "ar" ? ar : en;
  };

  // Always provide context
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isMounted: mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

