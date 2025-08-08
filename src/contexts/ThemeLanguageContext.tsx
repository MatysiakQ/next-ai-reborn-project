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

    // Home page
    'home.benefits.badge': 'AUTOMATION BENEFITS',
    'home.benefits.heading.strong': 'BOOST',
    'home.benefits.heading.rest': 'EFFICIENCY',
    'home.benefits.line1': '> AI working 24/7 for your business',
    'home.benefits.line2': '> Automatic optimizations and analytics',
    'home.benefits.line3': '> Average revenue growth of 300%',
    'home.benefit.time.title': 'Time Savings',
    'home.benefit.time.desc': '80% less time on repetitive tasks',
    'home.benefit.time.stat': '80%',
    'home.benefit.cost.title': 'Cost Reduction',
    'home.benefit.cost.desc': 'Reduce operational costs by 60%',
    'home.benefit.cost.stat': '60%',
    'home.benefit.sales.title': 'Sales Growth',
    'home.benefit.sales.desc': 'Average conversion increase of 250%',
    'home.benefit.sales.stat': '250%',
    'home.benefit.security.title': 'Security',
    'home.benefit.security.desc': '99.9% reduction of human errors',
    'home.benefit.security.stat': '99.9%',

    'home.types.badge': 'AUTOMATION TYPES',
    'home.types.heading.strong': 'OUR',
    'home.types.heading.rest': 'SOLUTIONS',
    'home.types.desc1': '> Comprehensive AI bots for any business',
    'home.types.desc2': '> Tailored to your industry',
    'home.types.sales.title': 'Sales Automation',
    'home.types.sales.desc': 'Lead qualification, follow-up, CRM integration',
    'home.types.sales.f1': 'Lead scoring',
    'home.types.sales.f2': 'Auto follow-up',
    'home.types.sales.f3': 'CRM integration',
    'home.types.marketing.title': 'Marketing AI',
    'home.types.marketing.desc': 'Content generation, ad optimization, analytics',
    'home.types.marketing.f1': 'Content generation',
    'home.types.marketing.f2': 'Ad optimization',
    'home.types.marketing.f3': 'Analytics',
    'home.types.support.title': 'Customer Support',
    'home.types.support.desc': '24/7 chatbots, ticket routing, sentiment analysis',
    'home.types.support.f1': '24/7 Chatbot',
    'home.types.support.f2': 'Auto routing',
    'home.types.support.f3': 'Sentiment analysis',
    'home.types.data.title': 'Data Processing',
    'home.types.data.desc': 'ETL processes, reporting, data analysis',
    'home.types.data.f1': 'ETL processes',
    'home.types.data.f2': 'Auto reports',
    'home.types.data.f3': 'Data analysis',
    'home.types.workflow.title': 'Workflow Automation',
    'home.types.workflow.desc': 'Process optimization, task assignment, approvals',
    'home.types.workflow.f1': 'Process optimization',
    'home.types.workflow.f2': 'Task assignment',
    'home.types.workflow.f3': 'Approvals',
    'home.types.ecommerce.title': 'E-commerce AI',
    'home.types.ecommerce.desc': 'Product recommendations, inventory, pricing',
    'home.types.ecommerce.f1': 'Product recommendations',
    'home.types.ecommerce.f2': 'Inventory management',
    'home.types.ecommerce.f3': 'Pricing',

    'home.stats.automatedFirms': 'Automated Companies',
    'home.stats.uptime': 'Bot Uptime',
    'home.stats.types': 'Automation Types',
    'home.stats.support': 'Technical Support',

    'home.pricing.badge': 'AUTOMATION PACKAGES',
    'home.pricing.heading.strong': 'CHOOSE',
    'home.pricing.heading.rest': 'YOUR PLAN',
    'home.pricing.line1': '> Different automation levels for your business',
    'home.pricing.line2': '> Scalable AI solutions',
    'home.pricing.line3': '> Full support and optimizations',

    'home.contact.badge': 'CONNECT WITH US',
    'home.contact.heading.strong': 'FREE',
    'home.contact.heading.rest': 'CONSULTATION',
    'home.contact.line1': '> Discuss your automation needs with experts',
    'home.contact.line2': '> Get a personalized AI strategy',
    'home.contact.form.title': '> AUTOMATION_INQUIRY.EXE',
    'home.contact.form.desc': 'Fill out the form to get a free consultation',
    'home.contact.form.name': 'COMPANY/NAME:',
    'home.contact.form.namePlaceholder': 'Enter company name or your name...',
    'home.contact.form.email': 'CONTACT_EMAIL:',
    'home.contact.form.emailPlaceholder': 'contact@company.com',
    'home.contact.form.message': 'NEEDS_DESCRIPTION:',
    'home.contact.form.messagePlaceholder': 'Describe which processes you want to automate...',
    'home.contact.form.submit': 'SEND_INQUIRY()',

    'home.footer.heading.strong': 'READY FOR',
    'home.footer.heading.rest': 'AUTOMATION?',
    'home.footer.line1': '> Join companies that already automated their processes',
    'home.footer.line2': '> Start your digital transformation today',
    'home.footer.viewCourses': 'VIEW COURSES',

    // Automations page
    'automations.hero.badge': 'AI AUTOMATION SOLUTIONS',
    'automations.hero.title': 'Automate Your Business with AI',
    'automations.hero.desc': 'Discover the power of intelligent automation. Our AI bots work 24/7, optimizing processes, increasing sales, and reducing operational costs.',
    'automations.hero.freeConsultation': 'Free Consultation',

    'automations.benefits.heading': 'Why Automate with NextAI?',
    'automations.benefits.time.title': 'Time Savings',
    'automations.benefits.time.desc': 'Automation saves up to 80% of time on repetitive tasks',
    'automations.benefits.cost.title': 'Cost Reduction',
    'automations.benefits.cost.desc': 'Reduce operational costs through process automation',
    'automations.benefits.performance.title': 'Performance Growth',
    'automations.benefits.performance.desc': 'Increase team productivity by 300% with AI',
    'automations.benefits.security.title': 'Security',
    'automations.benefits.security.desc': 'Minimize risk of human error in critical processes',

    'automations.categories.heading': 'Our Automation Solutions',
    'automations.categories.subheading': 'Comprehensive AI bots for every aspect of your business',

    'automations.category.sales.title': 'Sales Automation',
    'automations.category.sales.desc': 'Automate the sales process from lead to conversion',
    'automations.bots.leadQualifier.name': 'Lead Qualifier Bot',
    'automations.bots.leadQualifier.desc': 'Automatically qualifies leads and assigns quality scores',
    'automations.bots.leadQualifier.features.1': 'Lead scoring',
    'automations.bots.leadQualifier.features.2': 'Automatic segmentation',
    'automations.bots.leadQualifier.features.3': 'CRM integration',
    'automations.bots.followUp.name': 'Follow-up Automation',
    'automations.bots.followUp.desc': 'Automatic follow-ups with potential customers',
    'automations.bots.followUp.features.1': 'Personalized messages',
    'automations.bots.followUp.features.2': 'Optimal timing',
    'automations.bots.followUp.features.3': 'A/B testing',

    'automations.category.marketing.title': 'Marketing Automation',
    'automations.category.marketing.desc': 'Optimize marketing campaigns with AI',
    'automations.bots.contentGenerator.name': 'Content Generator Bot',
    'automations.bots.contentGenerator.desc': 'Generates marketing content tailored to your brand',
    'automations.bots.contentGenerator.features.1': 'Social media posts',
    'automations.bots.contentGenerator.features.2': 'Blog content',
    'automations.bots.contentGenerator.features.3': 'Email campaigns',
    'automations.bots.adOptimizer.name': 'Ad Optimizer Bot',
    'automations.bots.adOptimizer.desc': 'Optimizes ads in real time',
    'automations.bots.adOptimizer.features.1': 'Budget optimization',
    'automations.bots.adOptimizer.features.2': 'Audience targeting',
    'automations.bots.adOptimizer.features.3': 'ROI tracking',

    'automations.category.support.title': 'Customer Support Automation',
    'automations.category.support.desc': '24/7 customer support with AI chatbots',
    'automations.bots.support.name': 'Customer Support Bot',
    'automations.bots.support.desc': 'Intelligent chatbot handling customer inquiries',
    'automations.bots.support.features.1': 'Natural Language Processing',
    'automations.bots.support.features.2': 'Knowledge base integration',
    'automations.bots.support.features.3': 'Human escalation',
    'automations.bots.feedback.name': 'Feedback Collector Bot',
    'automations.bots.feedback.desc': 'Automatically collects and analyzes customer feedback',
    'automations.bots.feedback.features.1': 'Sentiment analysis',
    'automations.bots.feedback.features.2': 'Feedback categorization',
    'automations.bots.feedback.features.3': 'Insights reports',

    'automations.category.process.title': 'Process Automation',
    'automations.category.process.desc': 'Automate repetitive business tasks',
    'automations.bots.dataProcessing.name': 'Data Processing Bot',
    'automations.bots.dataProcessing.desc': 'Automatic data processing and analysis',
    'automations.bots.dataProcessing.features.1': 'ETL processes',
    'automations.bots.dataProcessing.features.2': 'Reporting',
    'automations.bots.dataProcessing.features.3': 'API integrations',
    'automations.bots.workflow.name': 'Workflow Automation Bot',
    'automations.bots.workflow.desc': 'Automates complex business processes',
    'automations.bots.workflow.features.1': 'Approval workflows',
    'automations.bots.workflow.features.2': 'Task assignment',
    'automations.bots.workflow.features.3': 'Progress tracking',

    'automations.bot.featuresLabel': 'Key features:',

    'automations.industries.heading': 'Industries We Serve',
    'automations.industries.subheading': 'Our AI solutions work in every industry',
    'automations.industries.ecommerce': 'E-commerce',
    'automations.industries.fintech': 'Fintech',
    'automations.industries.healthcare': 'Healthcare',
    'automations.industries.realestate': 'Real Estate',
    'automations.industries.saas': 'SaaS',
    'automations.industries.manufacturing': 'Manufacturing',

    'automations.cta.heading': 'Ready for Automation?',
    'automations.cta.subheading': 'Join thousands of companies that automated their processes with NextAI',
    'automations.cta.viewPackages': 'View Packages',
    'automations.cta.bookDemo': 'Book Demo',
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