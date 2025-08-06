import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type Language = 'pl' | 'en';

interface ThemeLanguageContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
  pl: {
    // Navigation
    'nav.home': 'Strona główna',
    'nav.automations': 'Automatyzacja',
    'nav.courses': 'Kursy',
    'nav.about': 'O nas',
    'nav.contact': 'Kontakt',
    'nav.dashboard': 'Panel użytkownika',
    'nav.admin': 'Panel administratora',
    'nav.logout': 'Wyloguj się',
    'nav.login': 'Zaloguj się',
    'nav.start': 'Rozpocznij',
    
    // Common
    'common.loading': 'Ładowanie...',
    'common.error': 'Błąd',
    'common.success': 'Sukces',
    'common.save': 'Zapisz',
    'common.cancel': 'Anuluj',
    'common.close': 'Zamknij',
    'common.submit': 'Wyślij',
    
    // Pricing
    'pricing.monthly': 'Miesięcznie',
    'pricing.yearly': 'Rocznie',
    'pricing.save': 'Oszczędzasz do 20%',
    'pricing.popular': 'Najczęściej wybierany pakiet',
    'pricing.current': 'Twój plan',
    'pricing.individual': 'Indywidualna wycena',
    'pricing.contact': 'Skontaktuj się z nami',
    'pricing.choose': 'Wybierz subskrypcję',
    'pricing.redirecting': 'Przekierowanie...',
    
    // Hero section
    'hero.badge': 'AI AUTOMATYZACJA • SYSTEM ONLINE',
    'hero.title': 'NEXTAI',
    'hero.subtitle': 'AUTOMATYZACJA',
    'hero.description1': '> Inicjalizacja systemu automatyzacji...',
    'hero.description2': '> Ładowanie modułów AI dla biznesu',
    'hero.description3': '> AUTOMATYZACJA AKTYWNA',
    'hero.start': 'ROZPOCZNIJ AUTOMATYZACJĘ',
    'hero.view': 'ZOBACZ AUTOMATYZACJE',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.automations': 'Automations',
    'nav.courses': 'Courses',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin Panel',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.start': 'Get Started',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.submit': 'Submit',
    
    // Pricing
    'pricing.monthly': 'Monthly',
    'pricing.yearly': 'Yearly',
    'pricing.save': 'Save up to 20%',
    'pricing.popular': 'Most Popular',
    'pricing.current': 'Current Plan',
    'pricing.individual': 'Custom Pricing',
    'pricing.contact': 'Contact Us',
    'pricing.choose': 'Choose Plan',
    'pricing.redirecting': 'Redirecting...',
    
    // Hero section
    'hero.badge': 'AI AUTOMATION • SYSTEM ONLINE',
    'hero.title': 'NEXTAI',
    'hero.subtitle': 'AUTOMATION',
    'hero.description1': '> Initializing automation system...',
    'hero.description2': '> Loading AI modules for business',
    'hero.description3': '> AUTOMATION ACTIVE',
    'hero.start': 'START AUTOMATION',
    'hero.view': 'VIEW AUTOMATIONS',
  }
};

export function ThemeLanguageProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('pl');

  useEffect(() => {
    // Load from localStorage or set defaults
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    }
    
    if (savedLanguage && (savedLanguage === 'pl' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <ThemeLanguageContext.Provider value={{
      theme,
      language,
      setTheme,
      setLanguage,
      t
    }}>
      {children}
    </ThemeLanguageContext.Provider>
  );
}

export function useThemeLanguage() {
  const context = useContext(ThemeLanguageContext);
  if (context === undefined) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
}