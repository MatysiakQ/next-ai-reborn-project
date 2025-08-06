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
    'common.backToDashboard': 'Powrót do dashboard',
    'common.goBack': 'Powrót',
    
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
    
    // Courses
    'courses.title': 'Kursy NextAI',
    'courses.subtitle': 'Rozwijaj swoje umiejętności AI z naszymi strukturalnymi kursami',
    'courses.yourPlan': 'Twój plan',
    'courses.freePlan': 'Plan darmowy',
    'courses.buySubscription': 'Wykup subskrypcję',
    'courses.tabs.all': 'Wszystkie',
    'courses.tabs.free': 'Darmowe',
    'courses.tabs.basic': 'Basic',
    'courses.tabs.pro': 'Pro',
    'courses.sections.free': 'Kursy darmowe',
    'courses.sections.basic': 'Kursy Basic',
    'courses.sections.pro': 'Kursy Pro',
    'courses.course': 'kurs',
    'courses.courses': 'kursów',
    'courses.requiresSubscription': '- Wymaga subskrypcji',
    'courses.progress': 'Postęp',
    'courses.startCourse': 'Rozpocznij kurs',
    'courses.requires': 'Wymaga',
    'courses.difficulty.beginner': 'Początkujący',
    'courses.difficulty.intermediate': 'Średniozaawansowany',
    'courses.difficulty.advanced': 'Zaawansowany',
    'courses.cta.login.title': 'Zaloguj się, aby uzyskać dostęp do darmowych kursów',
    'courses.cta.login.desc': 'Stwórz darmowe konto i rozpocznij naukę AI już dziś',
    'courses.cta.login.button': 'Zaloguj się',
    'courses.cta.subscribe.title': 'Odblokuj wszystkie kursy',
    'courses.cta.subscribe.desc': 'Wykup subskrypcję i uzyskaj dostęp do wszystkich kursów AI',
    'courses.cta.subscribe.button': 'Zobacz pakiety',
    'courses.errors.fetch': 'Nie udało się pobrać listy kursów.',
    'courses.errors.noAccess': 'Ten kurs wymaga wykupienia odpowiedniego pakietu.',
    'courses.errors.accessTitle': 'Brak dostępu',
    
    // About
    'about.badge': 'ABOUT_PROTOCOL',
    'about.title': 'KIM JESTEŚMY',
    'about.description1': '> Zespół elite hackerów i specjalistów AI',
    'about.description2': '> Misja: demokratyzacja wiedzy o sztucznej inteligencji',
    'about.description3': '> STATUS: AKTYWNI',
    'about.mission.badge': 'MISSION_STATEMENT',
    'about.mission.title': 'NASZA MISJA',
    'about.mission.text1': '> Wierzymy, że każdy hacker powinien mieć dostęp do najlepszych materiałów edukacyjnych w dziedzinie AI i cybersecurity.',
    'about.mission.text2': '> Tworzymy kursy, które nie tylko uczą, ale inspirują do działania i ciągłego rozwoju w świecie technologii.',
    'about.mission.text3': '> Nasz zespół składa się z ekspertów w różnych dziedzinach, którzy dzielą się swoją wiedzą z globalną społecznością.',
    'about.stats.users': 'AKTYWNI UŻYTKOWNICY',
    'about.stats.modules': 'MODUŁY AI',
    'about.values.badge': 'CORE_VALUES',
    'about.values.title': 'NASZE WARTOŚCI',
    'about.values.excellence': 'DOSKONAŁOŚĆ',
    'about.values.excellenceDesc': 'Każdy moduł przechodzi przez rygorystyczny proces kontroli jakości, aby zapewnić najlepsze doświadczenie hackingowe.',
    'about.values.community': 'SPOŁECZNOŚĆ',
    'about.values.communityDesc': 'Budujemy globalną społeczność hackerów AI, gdzie każdy może dzielić się wiedzą i wspierać innych w rozwoju.',
    'about.values.passion': 'PASJA',
    'about.values.passionDesc': 'Jesteśmy napędzani pasją do technologii i chęcią pomagania innym w odkrywaniu tajników AI.',
    'about.team.badge': 'TEAM_PROFILES',
    'about.team.title': 'GŁÓWNY ZESPÓŁ',
    'about.team.anna.name': 'Anna \'Cypher\' Kowalska',
    'about.team.anna.role': 'CEO & Lead Hacker',
    'about.team.anna.desc': '10+ lat w cybersecurity i AI research. Specjalizuje się w neural networks i ethical hacking.',
    'about.team.michal.name': 'Michał \'Quantum\' Nowak',
    'about.team.michal.role': 'CTO & AI Architect',
    'about.team.michal.desc': 'Ekspert w quantum computing i deep learning. Twórca naszej platformy edukacyjnej.',
    'about.team.katarzyna.name': 'Katarzyna \'Neural\' Wiśniewska',
    'about.team.katarzyna.role': 'Head of Content',
    'about.team.katarzyna.desc': 'Specjalistka od content creation i pedagogiki AI. Autorka kursów machine learning.',
    'about.cta.title': 'DOŁĄCZ DO REWOLUCJI',
    'about.cta.desc1': '> Stań się częścią elitarnej społeczności AI hackerów',
    'about.cta.desc2': '> Rozpocznij swoją podróż w cyfrową przyszłość już dziś',
    
    // Contact
    'contact.badge': 'CONTACT_PROTOCOL',
    'contact.title': 'NAWIĄŻ KONTAKT',
    'contact.description1': '> Nawiąż bezpieczne połączenie z naszym cyber teamem',
    'contact.description2': '> Wszystkie kanały komunikacji są szyfrowane end-to-end',
    'contact.description3': '> TRANSMISJA GOTOWA',
    'contact.channels.badge': 'COMMUNICATION_CHANNELS',
    'contact.channels.title': 'SKONTAKTUJ SIĘ Z NAMI',
    'contact.channels.desc1': '> Wybierz preferowany kanał komunikacji',
    'contact.channels.desc2': '> Wszystkie zapytania są procesowane w czasie rzeczywistym',
    'contact.channels.desc3': '> SLA response time: < 24h',
    'contact.channels.email': 'EMAIL_PROTOCOL',
    'contact.channels.emailDesc': 'Zaszyfrowany kanał komunikacji',
    'contact.channels.phone': 'VOICE_CHANNEL',
    'contact.channels.phoneDesc': 'Bezpośrednia linia do centrum kontroli',
    'contact.channels.address': 'FIZYCZNA_LOKALIZACJA',
    'contact.channels.addressDesc': 'Współrzędne bezpiecznej placówki',
    'contact.channels.status': 'STATUS_SYSTEMU',
    'contact.channels.statusDesc': 'Zawsze gotowi na nowe połączenia',
    'contact.form.badge': 'ZASZYFROWANE',
    'contact.form.title': '> SECURE_MESSAGE.EXE',
    'contact.form.desc': '> Wypełnij formularz aby wysłać zaszyfrowaną wiadomość do naszego zespołu',
    'contact.form.name': 'USER_NAME:',
    'contact.form.namePlaceholder': 'Wprowadź swój pseudonim...',
    'contact.form.email': 'EMAIL_ADDRESS:',
    'contact.form.subject': 'SUBJECT_LINE:',
    'contact.form.subjectPlaceholder': 'Protokół tematu wiadomości...',
    'contact.form.message': 'MESSAGE_BODY:',
    'contact.form.messagePlaceholder': 'Skomponuj swoją zaszyfrowaną wiadomość...',
    'contact.form.submit': 'TRANSMIT_MESSAGE()',
    'contact.form.success': 'Wiadomość przesłana pomyślnie!',
    'contact.form.successDesc': 'Nasz cyber zespół odpowie w ciągu 24 godzin.',
    'contact.knowledge.title': 'KNOWLEDGE_BASE.DB',
    'contact.knowledge.desc': '> Sprawdź naszą bazę wiedzy - możliwe, że znajdziesz tam odpowiedź na swoje pytanie',
    'contact.knowledge.button': 'DOSTĘP DO BAZY FAQ',
    'contact.location.badge': 'WSPÓŁRZĘDNE',
    'contact.location.title': 'FIZYCZNA LOKALIZACJA',
    'contact.location.desc1': '> Mapowanie lokalizacji bezpiecznej placówki',
    'contact.location.desc2': '> Współrzędne GPS: 52.2297° N, 21.0122° E',
    'contact.location.desc3': '> Poziom dostępu: OGRANICZONY',
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
    'common.backToDashboard': 'Back to dashboard',
    'common.goBack': 'Go back',
    
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
    
    // Courses
    'courses.title': 'NextAI Courses',
    'courses.subtitle': 'Develop your AI skills with our structured courses',
    'courses.yourPlan': 'Your plan',
    'courses.freePlan': 'Free plan',
    'courses.buySubscription': 'Buy subscription',
    'courses.tabs.all': 'All',
    'courses.tabs.free': 'Free',
    'courses.tabs.basic': 'Basic',
    'courses.tabs.pro': 'Pro',
    'courses.sections.free': 'Free courses',
    'courses.sections.basic': 'Basic courses',
    'courses.sections.pro': 'Pro courses',
    'courses.course': 'course',
    'courses.courses': 'courses',
    'courses.requiresSubscription': '- Requires subscription',
    'courses.progress': 'Progress',
    'courses.startCourse': 'Start course',
    'courses.requires': 'Requires',
    'courses.difficulty.beginner': 'Beginner',
    'courses.difficulty.intermediate': 'Intermediate',
    'courses.difficulty.advanced': 'Advanced',
    'courses.cta.login.title': 'Log in to access free courses',
    'courses.cta.login.desc': 'Create a free account and start learning AI today',
    'courses.cta.login.button': 'Log in',
    'courses.cta.subscribe.title': 'Unlock all courses',
    'courses.cta.subscribe.desc': 'Get a subscription and access all AI courses',
    'courses.cta.subscribe.button': 'View packages',
    'courses.errors.fetch': 'Failed to fetch course list.',
    'courses.errors.noAccess': 'This course requires purchasing the appropriate package.',
    'courses.errors.accessTitle': 'No access',
    
    // About
    'about.badge': 'ABOUT_PROTOCOL',
    'about.title': 'WHO WE ARE',
    'about.description1': '> Team of elite hackers and AI specialists',
    'about.description2': '> Mission: democratizing artificial intelligence knowledge',
    'about.description3': '> STATUS: ACTIVE',
    'about.mission.badge': 'MISSION_STATEMENT',
    'about.mission.title': 'OUR MISSION',
    'about.mission.text1': '> We believe every hacker should have access to the best educational materials in AI and cybersecurity.',
    'about.mission.text2': '> We create courses that not only teach but inspire action and continuous development in the world of technology.',
    'about.mission.text3': '> Our team consists of experts in various fields who share their knowledge with the global community.',
    'about.stats.users': 'ACTIVE USERS',
    'about.stats.modules': 'AI MODULES',
    'about.values.badge': 'CORE_VALUES',
    'about.values.title': 'OUR VALUES',
    'about.values.excellence': 'EXCELLENCE',
    'about.values.excellenceDesc': 'Every module goes through a rigorous quality control process to ensure the best hacking experience.',
    'about.values.community': 'COMMUNITY',
    'about.values.communityDesc': 'We build a global community of AI hackers where everyone can share knowledge and support others in development.',
    'about.values.passion': 'PASSION',
    'about.values.passionDesc': 'We are driven by passion for technology and the desire to help others discover the secrets of AI.',
    'about.team.badge': 'TEAM_PROFILES',
    'about.team.title': 'CORE TEAM',
    'about.team.anna.name': 'Anna \'Cypher\' Kowalska',
    'about.team.anna.role': 'CEO & Lead Hacker',
    'about.team.anna.desc': '10+ years in cybersecurity and AI research. Specializes in neural networks and ethical hacking.',
    'about.team.michal.name': 'Michał \'Quantum\' Nowak',
    'about.team.michal.role': 'CTO & AI Architect',
    'about.team.michal.desc': 'Expert in quantum computing and deep learning. Creator of our educational platform.',
    'about.team.katarzyna.name': 'Katarzyna \'Neural\' Wiśniewska',
    'about.team.katarzyna.role': 'Head of Content',
    'about.team.katarzyna.desc': 'Specialist in content creation and AI pedagogy. Author of machine learning courses.',
    'about.cta.title': 'JOIN THE REVOLUTION',
    'about.cta.desc1': '> Become part of the elite AI hacker community',
    'about.cta.desc2': '> Start your journey into the digital future today',
    
    // Contact
    'contact.badge': 'CONTACT_PROTOCOL',
    'contact.title': 'INITIATE CONTACT',
    'contact.description1': '> Establish secure connection with our cyber team',
    'contact.description2': '> All communication channels are end-to-end encrypted',
    'contact.description3': '> TRANSMISSION READY',
    'contact.channels.badge': 'COMMUNICATION_CHANNELS',
    'contact.channels.title': 'CONNECT WITH US',
    'contact.channels.desc1': '> Choose your preferred communication channel',
    'contact.channels.desc2': '> All inquiries are processed in real-time',
    'contact.channels.desc3': '> SLA response time: < 24h',
    'contact.channels.email': 'EMAIL_PROTOCOL',
    'contact.channels.emailDesc': 'Encrypted communication channel',
    'contact.channels.phone': 'VOICE_CHANNEL',
    'contact.channels.phoneDesc': 'Direct line to mission control',
    'contact.channels.address': 'PHYSICAL_LOCATION',
    'contact.channels.addressDesc': 'Secure facility coordinates',
    'contact.channels.status': 'SYSTEM_STATUS',
    'contact.channels.statusDesc': 'Always ready for new connections',
    'contact.form.badge': 'ENCRYPTED',
    'contact.form.title': '> SECURE_MESSAGE.EXE',
    'contact.form.desc': '> Fill out the form to send an encrypted message to our team',
    'contact.form.name': 'USER_NAME:',
    'contact.form.namePlaceholder': 'Enter your handle...',
    'contact.form.email': 'EMAIL_ADDRESS:',
    'contact.form.subject': 'SUBJECT_LINE:',
    'contact.form.subjectPlaceholder': 'Message subject protocol...',
    'contact.form.message': 'MESSAGE_BODY:',
    'contact.form.messagePlaceholder': 'Compose your encrypted message...',
    'contact.form.submit': 'TRANSMIT_MESSAGE()',
    'contact.form.success': 'Message transmitted successfully!',
    'contact.form.successDesc': 'Our cyber team will respond within 24 hours.',
    'contact.knowledge.title': 'KNOWLEDGE_BASE.DB',
    'contact.knowledge.desc': '> Check our knowledge base - you might find the answer to your question there',
    'contact.knowledge.button': 'ACCESS FAQ DATABASE',
    'contact.location.badge': 'COORDINATES',
    'contact.location.title': 'PHYSICAL LOCATION',
    'contact.location.desc1': '> Secure facility location mapping',
    'contact.location.desc2': '> GPS coordinates: 52.2297° N, 21.0122° E',
    'contact.location.desc3': '> Access level: RESTRICTED',
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