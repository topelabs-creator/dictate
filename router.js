const ROUTER_UI = window.UI;
const ROUTER_LANGUAGES = ['en', 'pt', 'fr', 'es', 'de', 'it', 'ru'];
const ROUTER_PUBLIC_ORIGIN = 'https://hustler512.github.io/DICTATOR';
const ROUTER_LOCALE_META = {
  en: {},
  pt: {
    '': { title: 'DICTATE | Leitor de texto para voz online', description: 'Transforme notas, PDFs e documentos em áudio falado no navegador. Use o DICTATE para estudar, revisar e ouvir conteúdo com privacidade.' },
    blogs: { title: 'BLOGS | DICTATE', description: 'Explore guias práticos em português sobre leitura de texto, PDFs, notas e estudo no navegador.' },
    'browser-text-to-speech-reader': { title: 'Leitor de texto para voz no navegador | DICTATE', description: 'Transforme notas, artigos e documentos em áudio falado diretamente no navegador.' },
    'read-pdf-aloud-online': { title: 'Ler PDF em voz alta online | DICTATE', description: 'Ouça PDFs e documentos de estudo no navegador com um fluxo privado e focado.' },
    'read-notes-aloud': { title: 'Ler notas em voz alta no navegador | DICTATE', description: 'Transforme suas notas em uma sessão de revisão falada para estudar com mais foco.' },
    'student-dictation-tool': { title: 'Ferramenta de ditado para estudantes | DICTATE', description: 'Revise notas, ensaios e material de estudo por áudio em um fluxo simples no navegador.' }
  },
  fr: {
    '': { title: 'DICTATE | Lecteur de texte en parole en ligne', description: 'Transformez notes, PDF et documents en audio parlé dans le navigateur pour étudier et réviser en toute confidentialité.' },
    blogs: { title: 'BLOGS | DICTATE', description: 'Découvrez des guides pratiques en français sur la lecture de textes, les PDF, les notes et les études dans le navigateur.' },
    'browser-text-to-speech-reader': { title: 'Lecteur de texte en parole dans le navigateur | DICTATE', description: 'Transformez notes, articles et documents en audio parlé directement dans le navigateur.' },
    'read-pdf-aloud-online': { title: 'Lire un PDF à voix haute en ligne | DICTATE', description: 'Écoutez vos PDF et documents d’étude dans le navigateur avec un flux privé et ciblé.' },
    'read-notes-aloud': { title: 'Lire les notes à voix haute dans le navigateur | DICTATE', description: 'Transformez vos notes en session de révision parlée pour étudier avec plus de concentration.' },
    'student-dictation-tool': { title: 'Outil de dictée pour étudiants | DICTATE', description: 'Révisez notes, essais et supports d’étude à l’oral dans un flux simple du navigateur.' }
  },
  es: {
    '': { title: 'DICTATE | Lector de texto a voz online', description: 'Convierte notas, PDFs y documentos en audio hablado en el navegador para estudiar y repasar con privacidad.' },
    blogs: { title: 'BLOGS | DICTATE', description: 'Explora guías prácticas en español sobre lectura de textos, PDFs, apuntes y estudio en el navegador.' },
    'browser-text-to-speech-reader': { title: 'Lector de texto a voz en el navegador | DICTATE', description: 'Convierte notas, artículos y documentos en audio hablado directamente en el navegador.' },
    'read-pdf-aloud-online': { title: 'Leer PDF en voz alta online | DICTATE', description: 'Escucha PDFs y documentos de estudio en el navegador con un flujo privado y enfocado.' },
    'read-notes-aloud': { title: 'Leer apuntes en voz alta en el navegador | DICTATE', description: 'Convierte tus apuntes en una sesión de repaso hablada para estudiar con más concentración.' },
    'student-dictation-tool': { title: 'Herramienta de dictado para estudiantes | DICTATE', description: 'Repasa apuntes, ensayos y material de estudio por audio desde el navegador.' }
  },
  de: {
    '': { title: 'DICTATE | Text-to-Speech-Leser online', description: 'Wandle Notizen, PDFs und Dokumente im Browser in gesprochene Sprache um und lerne privat und fokussiert.' },
    blogs: { title: 'BLOGS | DICTATE', description: 'Praktische deutschsprachige Guides zum Vorlesen von Texten, PDFs, Notizen und Lernmaterial im Browser.' },
    'browser-text-to-speech-reader': { title: 'Browser-Text-to-Speech-Leser | DICTATE', description: 'Wandle Notizen, Artikel und Dokumente direkt im Browser in gesprochene Sprache um.' },
    'read-pdf-aloud-online': { title: 'PDF online laut vorlesen | DICTATE', description: 'Höre PDFs und Lernmaterial im Browser in einem privaten, fokussierten Ablauf.' },
    'read-notes-aloud': { title: 'Notizen im Browser laut vorlesen | DICTATE', description: 'Verwandle Notizen in eine gesprochene Wiederholungssitzung für konzentriertes Lernen.' },
    'student-dictation-tool': { title: 'Diktat-Tool für Studierende | DICTATE', description: 'Wiederhole Notizen, Essays und Lernmaterial per Audio direkt im Browser.' }
  },
  it: {
    '': { title: 'DICTATE | Lettore di testo in voce online', description: 'Trasforma note, PDF e documenti in audio parlato nel browser per studiare e ripassare in privato.' },
    blogs: { title: 'BLOGS | DICTATE', description: 'Guide pratiche in italiano per leggere testi, PDF e appunti ad alta voce nel browser.' },
    'browser-text-to-speech-reader': { title: 'Lettore di testo in voce nel browser | DICTATE', description: 'Trasforma note, articoli e documenti in audio parlato direttamente nel browser.' },
    'read-pdf-aloud-online': { title: 'Leggere PDF ad alta voce online | DICTATE', description: 'Ascolta PDF e documenti di studio nel browser con un flusso privato e concentrato.' },
    'read-notes-aloud': { title: 'Leggere appunti ad alta voce nel browser | DICTATE', description: 'Trasforma gli appunti in una sessione di ripasso parlata per studiare con più concentrazione.' },
    'student-dictation-tool': { title: 'Strumento di dettatura per studenti | DICTATE', description: 'Ripassa appunti, saggi e materiale di studio tramite audio nel browser.' }
  },
  ru: {
    '': { title: 'DICTATE | Онлайн чтение текста вслух', description: 'Преобразуйте заметки, PDF и документы в озвученный текст в браузере для приватного обучения и повторения.' },
    blogs: { title: 'BLOGS | DICTATE', description: 'Практические руководства на русском о чтении текста, PDF, заметок и учебных материалов в браузере.' },
    'browser-text-to-speech-reader': { title: 'Чтение текста в речь в браузере | DICTATE', description: 'Преобразуйте заметки, статьи и документы в озвученный текст прямо в браузере.' },
    'read-pdf-aloud-online': { title: 'Читать PDF вслух онлайн | DICTATE', description: 'Слушайте PDF и учебные документы в браузере в приватном и сфокусированном режиме.' },
    'read-notes-aloud': { title: 'Читать заметки вслух в браузере | DICTATE', description: 'Превратите заметки в озвученную сессию повторения для более сосредоточенного обучения.' },
    'student-dictation-tool': { title: 'Инструмент диктовки для студентов | DICTATE', description: 'Повторяйте заметки, эссе и учебные материалы на слух прямо в браузере.' }
  }
};
const ROUTER_SECONDARY_META = {
  pt: {
    about: { title: 'Sobre o DICTATE', description: 'Saiba como o DICTATE transforma notas em áudio no navegador com um fluxo privado e local.' },
    'how-to-use': { title: 'Como usar o DICTATE', description: 'Aprenda a colar notas, carregar documentos e criar uma sessão de escuta no DICTATE.' },
    privacy: { title: 'Política de privacidade | DICTATE', description: 'Veja como o DICTATE mantém notas e projetos no seu navegador.' }
  },
  fr: {
    about: { title: 'À propos de DICTATE', description: 'Découvrez comment DICTATE transforme vos notes en audio dans le navigateur avec un flux privé et local.' },
    'how-to-use': { title: 'Comment utiliser DICTATE', description: 'Apprenez à coller des notes, charger des documents et créer une session d’écoute avec DICTATE.' },
    privacy: { title: 'Confidentialité | DICTATE', description: 'Découvrez comment DICTATE conserve vos notes et projets dans votre navigateur.' }
  },
  es: {
    about: { title: 'Acerca de DICTATE', description: 'Descubre cómo DICTATE convierte tus notas en audio en el navegador con un flujo privado y local.' },
    'how-to-use': { title: 'Cómo usar DICTATE', description: 'Aprende a pegar notas, cargar documentos y crear una sesión de escucha con DICTATE.' },
    privacy: { title: 'Privacidad | DICTATE', description: 'Descubre cómo DICTATE mantiene tus notas y proyectos en tu navegador.' }
  },
  de: {
    about: { title: 'Über DICTATE', description: 'Erfahre, wie DICTATE Notizen im Browser privat und lokal in Sprache umwandelt.' },
    'how-to-use': { title: 'DICTATE verwenden', description: 'Lerne, Notizen einzufügen, Dokumente zu laden und eine Hörsitzung mit DICTATE zu erstellen.' },
    privacy: { title: 'Datenschutz | DICTATE', description: 'Erfahre, wie DICTATE deine Notizen und Projekte im Browser speichert.' }
  },
  it: {
    about: { title: 'Informazioni su DICTATE', description: 'Scopri come DICTATE trasforma gli appunti in audio nel browser con un flusso privato e locale.' },
    'how-to-use': { title: 'Come usare DICTATE', description: 'Impara a incollare note, caricare documenti e creare una sessione di ascolto con DICTATE.' },
    privacy: { title: 'Privacy | DICTATE', description: 'Scopri come DICTATE conserva note e progetti nel browser.' }
  },
  ru: {
    about: { title: 'О DICTATE', description: 'Узнайте, как DICTATE превращает заметки в озвученный текст в приватном локальном браузере.' },
    'how-to-use': { title: 'Как пользоваться DICTATE', description: 'Узнайте, как вставлять заметки, загружать документы и создавать сессию прослушивания в DICTATE.' },
    privacy: { title: 'Конфиденциальность | DICTATE', description: 'Узнайте, как DICTATE хранит заметки и проекты в браузере.' }
  }
};
const ROUTE_META = {
  '': {
    title: 'DICTATE | Browser Text to Speech Reader',
    description: 'Read notes, PDFs, articles, and study material aloud in your browser with a private text-to-speech reader built for studying, revision, and focus.',
    canonicalPath: '/'
  },
  blogs: {
    title: 'BLOGS | DICTATE',
    description: 'Browse practical guides and product-focused articles about browser reading, PDF listening, note review, and student study workflows.',
    canonicalPath: '/blogs'
  },
  'browser-text-to-speech-reader': {
    title: 'Browser Text to Speech Reader | DICTATE',
    description: 'Use a browser-based text to speech reader to turn notes, articles, and documents into spoken audio without uploading your files.',
    canonicalPath: '/blogs/browser-text-to-speech-reader'
  },
  'read-pdf-aloud-online': {
    title: 'Read PDF Aloud Online | DICTATE',
    description: 'Listen to PDF text aloud in your browser with a private reading workflow for study sessions, revision, and accessibility.',
    canonicalPath: '/blogs/read-pdf-aloud-online'
  },
  'read-notes-aloud': {
    title: 'Read Notes Aloud in Browser | DICTATE',
    description: 'Turn your notes into spoken audio in a focused browser workflow that helps you study, revise, and retain information faster.',
    canonicalPath: '/blogs/read-notes-aloud'
  },
  'student-dictation-tool': {
    title: 'Student Dictation Tool | DICTATE',
    description: 'A student-friendly dictation and listening tool for notes, essays, and revision content that works fully in the browser.',
    canonicalPath: '/blogs/student-dictation-tool'
  },
  projects: {
    title: 'Projects | DICTATE',
    description: 'Manage your saved listening sessions, projects, and notes in a private browser workspace.',
    canonicalPath: '/projects'
  },
  about: {
    title: 'About DICTATE | Privacy-first Voice Tool',
    description: 'Learn how DICTATE helps students and learners turn writing into speech in a private, browser-based workflow.',
    canonicalPath: '/about'
  },
  'how-to-use': {
    title: 'How to Use DICTATE',
    description: 'Start with your notes, upload a document, and build a listening session with simple browser-based dictation and playback controls.',
    canonicalPath: '/how-to-use'
  },
  privacy: {
    title: 'Privacy Policy | DICTATE',
    description: 'Review how DICTATE keeps notes on-device and avoids uploading your content to a server.',
    canonicalPath: '/privacy'
  },
  project: {
    title: 'Project Reader | DICTATE',
    description: 'Open a saved project, follow each spoken group, and review your notes with browser-based voice playback.',
    canonicalPath: '/projects'
  },
  edit: {
    title: 'Edit Project | DICTATE',
    description: 'Update an existing project, revise your content, and keep the same private local-first listening workflow.',
    canonicalPath: '/projects'
  }
};

window.Router = (() => {
  const isLocalHost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const isGitHubPages = location.hostname === 'github.io' || location.hostname.endsWith('.github.io');
  // Firebase Hosting / Google Cloud Run use clean URL rewrites — no hash routing needed
  const isFirebase = location.hostname.endsWith('.web.app') || location.hostname.endsWith('.firebaseapp.com') || location.hostname.endsWith('.run.app');
  const USE_HASH = isLocalHost || isGitHubPages;
  const BASE_PATH = isLocalHost ? '' : (isGitHubPages ? '/DICTATOR' : '');
  function localeFromLocation() {
    const queryLocale = new URLSearchParams(location.search).get('lang')?.toLowerCase();
    if (ROUTER_LANGUAGES.includes(queryLocale)) return queryLocale;
    const source = USE_HASH ? location.hash.replace(/^#\/?/, '') : location.pathname.replace(/^\/+/, '');
    const locale = source.split('/')[0]?.toLowerCase();
    return ROUTER_LANGUAGES.includes(locale) ? locale : null;
  }
  function localePath(route, locale = localeFromLocation()) {
    const clean = String(route || '').replace(/^\/+/, '').replace(/\/+$/, '');
    return locale && locale !== 'en' ? `${locale}/${clean}` : clean;
  }
  function path() {
    let raw;
    if (USE_HASH) {
      raw = location.hash.replace(/^#\/?/, '');
    } else {
      raw = location.pathname;
      if (BASE_PATH && raw.startsWith(BASE_PATH)) raw = raw.slice(BASE_PATH.length);
    }
    raw = raw.replace(/^\/+|\/+$/g, '');
    const locale = raw.split('/')[0]?.toLowerCase();
    if (ROUTER_LANGUAGES.includes(locale)) raw = raw.split('/').slice(1).join('/');
    return raw;
  }
  function restoreFallbackRoute() {
    const saved = sessionStorage.getItem('dictator_pending_route');
    if (!saved) return;
    sessionStorage.removeItem('dictator_pending_route');
    const target = saved.startsWith('/') ? saved : `/${saved}`;
    if (USE_HASH) {
      history.replaceState({}, '', `${BASE_PATH || ''}/#${target}`);
    } else if (location.pathname !== target && location.pathname !== `${BASE_PATH}${target}`) {
      history.replaceState({}, '', `${BASE_PATH || ''}${target}`);
    }
    return target;
  }
  function migrateHashRoute() {
    if (USE_HASH || !location.hash.startsWith('#/')) return false;
    const route = location.hash.replace(/^#\/?/, '');
    history.replaceState({}, '', route ? `/${route}` : '/');
    return true;
  }
  function setMetaTag(name, value, attribute = 'name') {
    let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', value);
    return tag;
  }
  function setJsonLd(payload) {
    let tag = document.head.querySelector('script[data-schema="dictator"]');
    if (!tag) {
      tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.setAttribute('data-schema', 'dictator');
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(payload);
  }
  function injectFaqSchema(routeKey = '') {
    const faqs = {
      '': [
        { question: 'What is the best browser text to speech reader?', answer: 'DICTATE is a browser-based text to speech reader for notes, documents, PDFs, and study material that keeps the workflow private and on-device.' },
        { question: 'Can I read PDF aloud online?', answer: 'Yes. DICTATE is built to help you upload text-heavy files and convert them into spoken audio in the browser.' },
        { question: 'Is this good for students?', answer: 'Yes. Students use it for revision, language practice, and listening to notes in a calmer and more focused workflow.' },
        { question: 'Does it keep my content private?', answer: 'The main workflow is local-first and browser-based, so your notes remain on your device instead of being uploaded to a server.' }
      ],
      'browser-text-to-speech-reader': [
        { question: 'What is a browser text to speech reader?', answer: 'It is a tool that converts text into spoken audio inside the browser without sending your notes to an external server.' },
        { question: 'Can I use it for notes and documents?', answer: 'Yes. It works with pasted notes and uploaded document files, making it useful for studying and revision.' },
        { question: 'Does it support repeated revision?', answer: 'Yes. You can control speed, chunking, and repetition to build a smoother study workflow.' }
      ],
      'read-pdf-aloud-online': [
        { question: 'Can I read a PDF aloud online?', answer: 'Yes. You can upload a PDF and have the visible text read back as spoken audio in the browser.' },
        { question: 'Is it useful for study?', answer: 'Yes. It is especially helpful for academic reading, revision, and long-form material that is easier to absorb by ear.' },
        { question: 'Does it work without installing software?', answer: 'Yes. The workflow is browser-based and uses the local device and browser speech APIs.' }
      ],
      'read-notes-aloud': [
        { question: 'Why read notes aloud?', answer: 'Reading aloud can reduce screen fatigue, improve focus, and make revision easier to retain over time.' },
        { question: 'Can I use it on mobile?', answer: 'Yes. The app is designed to work in browser environments and supports mobile-friendly reading workflows.' },
        { question: 'What notes work best?', answer: 'Class notes, revision scripts, personal summaries, and study material all work well in a listening session.' }
      ],
      'student-dictation-tool': [
        { question: 'What makes DICTATE useful for students?', answer: 'It helps students revise by ear, repeat difficult ideas, and absorb notes in a calmer note-listening flow.' },
        { question: 'Does it help language learning?', answer: 'Yes. Repetition and short audio groups make it useful for vocabulary and reading practice.' },
        { question: 'Can I save projects?', answer: 'Yes. Projects are saved locally in the browser so students can return to a revision session later.' }
      ]
    };
    const localizedFaqs = {
      pt: {
        '': [
          { question: 'O DICTATE é um leitor de texto para voz?', answer: 'Sim. O DICTATE transforma notas, documentos e PDFs em áudio no navegador.' },
          { question: 'Quais guias estão disponíveis?', answer: 'Encontre guias sobre leitura de texto, PDFs, notas e estudo com áudio.' },
          { question: 'O que é um leitor de texto para voz?', answer: 'É uma ferramenta que converte texto escrito em áudio dentro do navegador.' },
          { question: 'Posso ouvir um PDF online?', answer: 'Sim. Você pode carregar um PDF e ouvir o texto no navegador.' },
          { question: 'Por que ouvir notas?', answer: 'Ouvir notas ajuda na revisão, no foco e na retenção.' },
          { question: 'O DICTATE ajuda estudantes?', answer: 'Sim. Ele transforma material de estudo em uma sessão de escuta repetível.' }
        ],
        blogs: [
          { question: 'Quais guias estão disponíveis?', answer: 'Encontre guias sobre leitura de texto, PDFs, notas e estudo com áudio.' }
        ],
        'browser-text-to-speech-reader': [
          { question: 'O que é um leitor de texto para voz?', answer: 'É uma ferramenta que converte texto escrito em áudio dentro do navegador.' }
        ],
        'read-pdf-aloud-online': [
          { question: 'Posso ouvir um PDF online?', answer: 'Sim. Você pode carregar um PDF e ouvir o texto no navegador.' }
        ],
        'read-notes-aloud': [
          { question: 'Por que ouvir notas?', answer: 'Ouvir notas ajuda na revisão, no foco e na retenção.' }
        ],
        'student-dictation-tool': [
          { question: 'O DICTATE ajuda estudantes?', answer: 'Sim. Ele transforma material de estudo em uma sessão de escuta repetível.' }
        ]
      },
      fr: {
        '': [
          { question: 'DICTATE est-il un lecteur vocal?', answer: 'Oui. DICTATE transforme notes, documents et PDF en audio dans le navigateur.' },
          { question: 'Quels guides sont disponibles?', answer: 'Découvrez des guides sur les textes, PDF, notes et études avec audio.' },
          { question: 'Qu’est-ce qu’un lecteur vocal?', answer: 'C’est un outil qui convertit le texte écrit en audio dans le navigateur.' },
          { question: 'Puis-je écouter un PDF en ligne?', answer: 'Oui. Vous pouvez charger un PDF et écouter son texte dans le navigateur.' },
          { question: 'Pourquoi écouter ses notes?', answer: 'L’écoute aide à réviser, rester concentré et retenir les informations.' },
          { question: 'DICTATE aide-t-il les étudiants?', answer: 'Oui. Il transforme le matériel d’étude en session d’écoute répétable.' }
        ],
        blogs: [
          { question: 'Quels guides sont disponibles?', answer: 'Découvrez des guides sur les textes, PDF, notes et études avec audio.' }
        ],
        'browser-text-to-speech-reader': [
          { question: 'Qu’est-ce qu’un lecteur vocal?', answer: 'C’est un outil qui convertit le texte écrit en audio dans le navigateur.' }
        ],
        'read-pdf-aloud-online': [
          { question: 'Puis-je écouter un PDF en ligne?', answer: 'Oui. Vous pouvez charger un PDF et écouter son texte dans le navigateur.' }
        ],
        'read-notes-aloud': [
          { question: 'Pourquoi écouter ses notes?', answer: 'L’écoute aide à réviser, rester concentré et retenir les informations.' }
        ],
        'student-dictation-tool': [
          { question: 'DICTATE aide-t-il les étudiants?', answer: 'Oui. Il transforme le matériel d’étude en session d’écoute répétable.' }
        ]
      },
      es: {
        '': [
          { question: '¿DICTATE es un lector de texto a voz?', answer: 'Sí. DICTATE convierte notas, documentos y PDFs en audio en el navegador.' },
          { question: '¿Qué guías están disponibles?', answer: 'Encuentra guías sobre textos, PDFs, apuntes y estudio con audio.' },
          { question: '¿Qué es un lector de texto a voz?', answer: 'Es una herramienta que convierte texto escrito en audio dentro del navegador.' },
          { question: '¿Puedo escuchar un PDF online?', answer: 'Sí. Puedes cargar un PDF y escuchar su texto en el navegador.' },
          { question: '¿Por qué escuchar apuntes?', answer: 'Escuchar ayuda a repasar, concentrarse y retener información.' },
          { question: '¿DICTATE ayuda a estudiantes?', answer: 'Sí. Convierte material de estudio en una sesión de escucha repetible.' }
        ],
        blogs: [
          { question: '¿Qué guías están disponibles?', answer: 'Encuentra guías sobre textos, PDFs, apuntes y estudio con audio.' }
        ],
        'browser-text-to-speech-reader': [
          { question: '¿Qué es un lector de texto a voz?', answer: 'Es una herramienta que convierte texto escrito en audio dentro del navegador.' }
        ],
        'read-pdf-aloud-online': [
          { question: '¿Puedo escuchar un PDF online?', answer: 'Sí. Puedes cargar un PDF y escuchar su texto en el navegador.' }
        ],
        'read-notes-aloud': [
          { question: '¿Por qué escuchar apuntes?', answer: 'Escuchar ayuda a repasar, concentrarse y retener información.' }
        ],
        'student-dictation-tool': [
          { question: '¿DICTATE ayuda a estudiantes?', answer: 'Sí. Convierte material de estudio en una sesión de escucha repetible.' }
        ]
      },
      de: {
        '': [
          { question: 'Ist DICTATE ein Text-to-Speech-Leser?', answer: 'Ja. DICTATE wandelt Notizen, Dokumente und PDFs im Browser in Sprache um.' },
          { question: 'Welche Guides gibt es?', answer: 'Entdecke Guides zu Texten, PDFs, Notizen und Lernen mit Audio.' },
          { question: 'Was ist ein Text-to-Speech-Leser?', answer: 'Ein Tool, das geschriebenen Text im Browser in Audio umwandelt.' },
          { question: 'Kann ich ein PDF online anhören?', answer: 'Ja. Lade ein PDF hoch und höre den Text im Browser.' },
          { question: 'Warum Notizen anhören?', answer: 'Anhören unterstützt Wiederholung, Konzentration und Erinnern.' },
          { question: 'Hilft DICTATE Studierenden?', answer: 'Ja. Lernmaterial wird in eine wiederholbare Hörsitzung verwandelt.' }
        ],
        blogs: [
          { question: 'Welche Guides gibt es?', answer: 'Entdecke Guides zu Texten, PDFs, Notizen und Lernen mit Audio.' }
        ],
        'browser-text-to-speech-reader': [
          { question: 'Was ist ein Text-to-Speech-Leser?', answer: 'Ein Tool, das geschriebenen Text im Browser in Audio umwandelt.' }
        ],
        'read-pdf-aloud-online': [
          { question: 'Kann ich ein PDF online anhören?', answer: 'Ja. Lade ein PDF hoch und höre den Text im Browser.' }
        ],
        'read-notes-aloud': [
          { question: 'Warum Notizen anhören?', answer: 'Anhören unterstützt Wiederholung, Konzentration und Erinnern.' }
        ],
        'student-dictation-tool': [
          { question: 'Hilft DICTATE Studierenden?', answer: 'Ja. Lernmaterial wird in eine wiederholbare Hörsitzung verwandelt.' }
        ]
      },
      it: {
        '': [
          { question: 'DICTATE è un lettore di testo in voce?', answer: 'Sì. DICTATE trasforma note, documenti e PDF in audio nel browser.' },
          { question: 'Quali guide sono disponibili?', answer: 'Trova guide su testi, PDF, appunti e studio con audio.' },
          { question: 'Cos’è un lettore di testo in voce?', answer: 'È uno strumento che converte il testo scritto in audio nel browser.' },
          { question: 'Posso ascoltare un PDF online?', answer: 'Sì. Puoi caricare un PDF e ascoltare il testo nel browser.' },
          { question: 'Perché ascoltare gli appunti?', answer: 'Ascoltare aiuta nel ripasso, nella concentrazione e nella memoria.' },
          { question: 'DICTATE aiuta gli studenti?', answer: 'Sì. Trasforma il materiale di studio in una sessione di ascolto ripetibile.' }
        ],
        blogs: [
          { question: 'Quali guide sono disponibili?', answer: 'Trova guide su testi, PDF, appunti e studio con audio.' }
        ],
        'browser-text-to-speech-reader': [
          { question: 'Cos’è un lettore di testo in voce?', answer: 'È uno strumento che converte il testo scritto in audio nel browser.' }
        ],
        'read-pdf-aloud-online': [
          { question: 'Posso ascoltare un PDF online?', answer: 'Sì. Puoi caricare un PDF e ascoltare il testo nel browser.' }
        ],
        'read-notes-aloud': [
          { question: 'Perché ascoltare gli appunti?', answer: 'Ascoltare aiuta nel ripasso, nella concentrazione e nella memoria.' }
        ],
        'student-dictation-tool': [
          { question: 'DICTATE aiuta gli studenti?', answer: 'Sì. Trasforma il materiale di studio in una sessione di ascolto ripetibile.' }
        ]
      },
      ru: {
        '': [
          { question: 'DICTATE — это чтение текста вслух?', answer: 'Да. DICTATE превращает заметки, документы и PDF в озвученный текст в браузере.' },
          { question: 'Какие руководства доступны?', answer: 'Найдите руководства по тексту, PDF, заметкам и обучению с аудио.' },
          { question: 'Что такое чтение текста вслух?', answer: 'Это инструмент, который превращает письменный текст в аудио в браузере.' },
          { question: 'Можно ли слушать PDF онлайн?', answer: 'Да. Загрузите PDF и слушайте его текст в браузере.' },
          { question: 'Зачем слушать заметки?', answer: 'Прослушивание помогает повторять, концентрироваться и запоминать.' },
          { question: 'DICTATE помогает студентам?', answer: 'Да. Он превращает учебный материал в повторяемую сессию прослушивания.' }
        ],
        blogs: [
          { question: 'Какие руководства доступны?', answer: 'Найдите руководства по тексту, PDF, заметкам и обучению с аудио.' }
        ],
        'browser-text-to-speech-reader': [
          { question: 'Что такое чтение текста вслух?', answer: 'Это инструмент, который превращает письменный текст в аудио в браузере.' }
        ],
        'read-pdf-aloud-online': [
          { question: 'Можно ли слушать PDF онлайн?', answer: 'Да. Загрузите PDF и слушайте его текст в браузере.' }
        ],
        'read-notes-aloud': [
          { question: 'Зачем слушать заметки?', answer: 'Прослушивание помогает повторять, концентрироваться и запоминать.' }
        ],
        'student-dictation-tool': [
          { question: 'DICTATE помогает студентам?', answer: 'Да. Он превращает учебный материал в повторяемую сессию прослушивания.' }
        ]
      }
    };
    const articleRoutes = ['browser-text-to-speech-reader', 'read-pdf-aloud-online', 'read-notes-aloud', 'student-dictation-tool'];
    const sharedArticleFaqs = articleRoutes.includes(routeKey) ? ROUTER_UI?.getBlogCopy?.(routeKey)?.faqs : null;
    const mainEntity = (sharedArticleFaqs || localizedFaqs[localeFromLocation()?.toLowerCase()]?.[routeKey] || faqs[routeKey] || faqs['']).map(item => Array.isArray(item) ? { question: item[0], answer: item[1] } : item).map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }));
    setJsonLd({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity });
  }
  function normalizePublicPath(input = '/') {
    const value = String(input || '/').replace(/^\/+/, '').replace(/\/+$/, '');
    return value ? `/${value}` : '/';
  }
  function updateMeta(routeKey = '') {
    const meta = ROUTE_META[routeKey] || ROUTE_META[''];
    const locale = localeFromLocation() || 'en';
    const localized = ROUTER_LOCALE_META[locale]?.[routeKey] || ROUTER_SECONDARY_META[locale]?.[routeKey] || { title: meta.title, description: meta.description };
    document.title = localized.title;
    setMetaTag('description', localized.description, 'name');
    setMetaTag('keywords', 'browser text to speech reader, read pdf aloud online, read notes aloud in browser, student dictation tool, private text to speech tool, browser voice reader', 'name');
    const isPrivateRoute = ['projects', 'project', 'edit'].includes(routeKey);
    setMetaTag('robots', isPrivateRoute ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'name');
    setMetaTag('og:title', localized.title, 'property');
    setMetaTag('og:description', localized.description, 'property');
    setMetaTag('og:locale', `${locale}_${locale === 'en' ? 'US' : locale === 'pt' ? 'BR' : locale.toUpperCase()}`, 'property');
    setMetaTag('twitter:title', localized.title, 'name');
    setMetaTag('twitter:description', localized.description, 'name');
    injectFaqSchema(routeKey);

    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.rel = 'canonical';
    const canonicalPath = meta.canonicalPath === '/' && locale !== 'en'
      ? `/${locale}/`
      : normalizePublicPath(localePath(meta.canonicalPath, locale));
    canonical.href = `${ROUTER_PUBLIC_ORIGIN}${canonicalPath}`;
    if (!canonical.parentNode) document.head.appendChild(canonical);

    const ogUrl = document.head.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', `${ROUTER_PUBLIC_ORIGIN}${canonicalPath}`);
    if (!ogUrl.parentNode) document.head.appendChild(ogUrl);
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    ROUTER_LANGUAGES.forEach(language => {
      const alternate = document.createElement('link');
      alternate.rel = 'alternate';
      alternate.hreflang = language;
      alternate.href = `${ROUTER_PUBLIC_ORIGIN}${normalizePublicPath(localePath(meta.canonicalPath, language))}`;
      alternate.dataset.hreflang = 'dictate';
      document.head.appendChild(alternate);
    });
    const fallback = document.createElement('link');
    fallback.rel = 'alternate';
    fallback.hreflang = 'x-default';
    fallback.href = `${ROUTER_PUBLIC_ORIGIN}${normalizePublicPath(meta.canonicalPath)}`;
    fallback.dataset.hreflang = 'dictate';
    document.head.appendChild(fallback);
  }
  function navigate(value) {
    const clean = String(value || '').replace(/^\/+/, '').replace(/\/+$/, '');
    const routed = localePath(clean);
    const target = routed ? `${BASE_PATH || ''}/#/${routed}` : `${BASE_PATH || ''}/`;
    if (USE_HASH) {
      if (location.hash !== (routed ? `#/${routed}` : '')) history.pushState({}, '', target);
    } else {
      const cleanTarget = routed ? `/${routed}` : '/';
      if (location.pathname !== cleanTarget) history.pushState({}, '', cleanTarget);
    }
    handle();
  }
  function url(value, locale = localeFromLocation()) {
    const routed = localePath(value, locale);
    if (USE_HASH) return routed ? `${BASE_PATH || ''}/#/${routed}` : `${BASE_PATH || ''}/`;
    return routed ? `/${routed}` : '/';
  }
  function setLanguage(language) {
    const next = ROUTER_LANGUAGES.includes(String(language || '').toLowerCase()) ? String(language).toLowerCase() : 'en';
    const route = path();
    const target = url(route, next);
    if (USE_HASH) history.replaceState({}, '', target);
    else history.replaceState({}, '', target);
    handle();
  }
  async function handle() {
    const parts = path().split('/');
    const routeKey = parts[0] || '';
    const blogSlug = routeKey === 'blogs' ? (parts[1] || '') : routeKey;
    const legacyBlogSlugs = ['browser-text-to-speech-reader', 'read-pdf-aloud-online', 'read-notes-aloud', 'student-dictation-tool'];
    if (legacyBlogSlugs.includes(routeKey)) return navigate(`blogs/${routeKey}`);
    if (routeKey !== 'project') window.TTS?.stop();
    updateMeta(routeKey === 'blogs' && !blogSlug ? 'blogs' : blogSlug);
    if (!routeKey) return ROUTER_UI.renderHome();
    if (routeKey === 'blogs' && !blogSlug) return ROUTER_UI.renderBlogs();
    if (routeKey === 'blogs' && blogSlug && ['browser-text-to-speech-reader','read-pdf-aloud-online','read-notes-aloud','student-dictation-tool'].includes(blogSlug)) return ROUTER_UI.renderIntentPage(blogSlug);
    if (routeKey === 'browser-text-to-speech-reader' || routeKey === 'read-pdf-aloud-online' || routeKey === 'read-notes-aloud' || routeKey === 'student-dictation-tool') return ROUTER_UI.renderIntentPage(routeKey);
    if (routeKey === 'projects') return ROUTER_UI.renderProjects();
    if (routeKey === 'project' && parts[1]) return ROUTER_UI.renderProject(parts[1]);
    if (routeKey === 'edit' && parts[1]) return ROUTER_UI.renderHome(parts[1]);
    if (routeKey === 'about') return ROUTER_UI.renderAbout();
    if (routeKey === 'how-to-use') return ROUTER_UI.renderHowToUse();
    if (routeKey === 'privacy') return ROUTER_UI.renderPrivacy();
    navigate('');
    ROUTER_UI.toast('Page not found.', 'danger');
  }
  function init() {
    addEventListener('popstate', handle);
    migrateHashRoute();
    restoreFallbackRoute();
    const queryLocale = new URLSearchParams(location.search).get('lang');
    if (queryLocale) {
      setLanguage(localeFromLocation() || 'en');
      return;
    }
    handle();
  }
  return { navigate, url, setLanguage, init, handle, updateMeta };
})();
