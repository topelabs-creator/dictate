window.UI = (() => {
  const MAX_WORDS = 5000;
  const TEXT_LIMIT_MESSAGES = {
    en: `Please keep your text within ${MAX_WORDS.toLocaleString()} words.`,
    pt: `Mantenha o texto dentro de ${MAX_WORDS.toLocaleString('pt-BR')} palavras.`,
    fr: `Limitez votre texte à ${MAX_WORDS.toLocaleString('fr-FR')} mots.`,
    es: `Mantén el texto dentro de ${MAX_WORDS.toLocaleString('es-ES')} palabras.`,
    de: `Begrenze den Text auf ${MAX_WORDS.toLocaleString('de-DE')} Wörter.`,
    it: `Mantieni il testo entro ${MAX_WORDS.toLocaleString('it-IT')} parole.`,
    ru: `Ограничьте текст ${MAX_WORDS.toLocaleString('ru-RU')} словами.`
  };
  const UI_TEXT = {
    en: {
      'home.hero.edit': 'Edit saved project',
      'home.hero.new': 'Listen. Repeat. Learn.',
      'home.h1.edit': 'Update your notes.',
      'home.h1.new': 'Dictate your notes.',
      'home.p.edit': 'Save changes to this listening session.',
      'home.p.new': 'Paste notes, upload a PDF or DOCX, and turn text into speech for studying, revision, language learning, and focused listening.',
      'home.recent': 'Recent projects',
      'home.empty': 'Your saved sessions will appear here.',
      'home.viewAll': 'View all projects',
      'home.placeholder': 'Write or paste your text here...',
      'home.counter': 'words',
      'home.privacy': 'Your notes stay on this device.',
      'home.seo.eyebrow': 'Private browser learning',
      'home.seo.title': 'Turn study notes, PDFs, and scripts into spoken audio.',
      'home.seo.body': 'DICTATE helps you listen to notes instead of reading every line. Use it for revision, language learning, reading practice, and quiet focus sessions without sending your files to a server.',
      'home.seo.link.reader': 'Browser text to speech reader',
      'home.seo.link.pdf': 'Read PDF aloud online',
      'home.seo.link.notes': 'Read notes aloud in browser',
      'home.seo.link.student': 'Student dictation tool',
      'home.seo.studyTitle': 'Study faster',
      'home.seo.studyText': 'Listen to revision notes, essays, and summaries in short blocks so you can absorb more without screen fatigue.',
      'home.seo.pdfTitle': 'Read PDFs aloud',
      'home.seo.pdfText': 'Upload a PDF or DOCX and turn complex reading material into speech you can follow while doing other tasks.',
      'home.seo.privateTitle': 'Stay private',
      'home.seo.privateText': 'Everything works in the browser with local project storage, making it a practical option for quiet, private learning.',
      'home.seo.questionsTitle': 'Common questions',
      'home.seo.question1': 'Why use a browser text to speech reader?',
      'home.seo.answer1': 'It helps you review notes by ear, reduce eye strain, and repeat difficult chapters or concepts in a focused, manageable rhythm.',
      'home.seo.question2': 'Can I read documents aloud in my browser?',
      'home.seo.answer2': 'Yes. DICTATE supports reading pasted text, browser-local documents, and PDF content directly in the browser.',
      'home.seo.question3': 'Is this good for students?',
      'home.seo.answer3': 'Yes. It is useful for revision, reading practice, language learning, and quieter study sessions with less screen fatigue.',
      'home.save': 'Save changes',
      'home.start': 'Start to dictate',
      'home.browse': 'Click to browse',
      'home.drop': 'Drop a file here',
      'home.drag': 'or drag and drop',
      'home.fileType': 'TXT, PDF, or DOCX',
      'project.yourLibrary': 'Your library',
      'project.title': 'Your projects.',
      'project.subtitle': 'Manage your listening sessions. Maximum 20 projects.',
      'project.new': '+ New project',
      'project.demoInfo': 'Built-in test project · {count} groups · Does not count toward your 20-project limit',
      'project.openDemo': 'Open demo',
      'project.open': 'Open',
      'project.rename': 'Rename',
      'project.delete': 'Delete',
      'project.emptyTitle': 'No projects yet.',
      'project.emptyText': 'Start with a note from the Home page.',
      'project.emptyAction': 'Create your first project',
      'project.storageUsed': '{count} of 20 projects used',
      'project.deleteConfirm': 'Delete this project? This cannot be undone.',
      'project.renamed': 'Project renamed.',
      'project.deleted': 'Project deleted.',
      'project.undo': 'Undo',
      'project.restored': 'Project restored.',
      'project.saved': 'Project updated.',
      'project.created': 'Project created.',
      'project.fileLoaded': '{file} loaded.',
      'project.loadFail': 'Could not save project.',
      'project.storageFull': 'Storage full (20/20 projects).',
      'project.export': 'Export backup',
      'project.import': 'Import backup',
      'project.exported': 'Backup downloaded.',
      'project.imported': '{count} projects restored.',
      'project.invalidBackup': 'That backup file is not valid.',
      'reader.back': '← Back to projects',
      'reader.demo': 'Built-in test project',
      'reader.view': 'Reader view',
      'reader.edit': 'Edit text',
      'reader.words': 'Words',
      'reader.reps': 'Reps',
      'reader.lang': 'Lang',
      'reader.restart': 'Restart',
      'reader.speed': 'Speed',
      'reader.loading': 'Loading browser voice',
      'reader.finished': 'Complete · press Restart to begin again',
      'reader.group': 'Group',
      'reader.repeat': 'Repeat',
      'reader.play': 'Play',
      'reader.pause': 'Pause',
      'about.title': 'A calmer way to learn.',
      'about.body': 'DICTATE turns notes, essays, PDFs, and study material into speech so you can listen, repeat, and retain more. It is built for students, language learners, and anyone who wants to dictate notes to a computer and review them by ear in a private browser workflow.',
      'about.section1': 'Designed for repetition',
      'about.section1p': 'Small groups, adjustable pace, and a visible reading highlight help you stay with the sentence instead of racing past it.',
      'about.section2': 'Private by default',
      'about.section2p': 'Your saved projects live in this browser using local storage and IndexedDB. DICTATE does not upload your notes to an application server.',
      'how.title': 'How to use DICTATE.',
      'how.body': 'Start on Home, paste a note or load a TXT, PDF, or DOCX file, then create a project.',
      'how.build': 'Build a session',
      'how.step1': 'Add your text.',
      'how.step2': 'Choose your default group size, repetitions, speed, and language in Settings.',
      'how.step3': 'Start the session and follow the highlighted groups.',
      'how.questions': 'Questions',
      'how.groupQuestion': 'What does a group mean?',
      'how.groupAnswer': 'A group is the number of words DICTATE speaks together before moving on.',
      'how.settingsQuestion': 'Can I change settings while reading?',
      'how.settingsAnswer': 'Yes. Reader controls save changes to the current project and reset grouping when necessary.',
      'privacy.title': 'Privacy policy.',
      'privacy.body': 'DICTATE is designed to keep your notes on your device. Projects are stored in this browser and speech is produced by the browser Web Speech API.',
      'privacy.whatLeaves': 'What leaves your device?',
      'privacy.whatLeavesBody': 'Nothing is sent to a DICTATE application server. Optional PDF, DOCX, and language-detection libraries may be loaded from their public CDNs when you use those features.',
      'privacy.removing': 'Removing your data',
      'privacy.removingBody': 'Delete individual projects from the Projects page, or clear this site’s browser storage to remove all local data.',
    },
    pt: {
      'home.hero.edit': 'Editar projeto salvo',
      'home.hero.new': 'Escute. Repita. Aprenda.',
      'home.h1.edit': 'Atualize suas anotações.',
      'home.h1.new': 'Ditado de suas anotações.',
      'home.p.edit': 'Salve as alterações desta sessão de escuta.',
      'home.p.new': 'Cole notas, carregue PDF ou DOCX e transforme texto em fala para estudo, revisão, aprendizagem de idiomas e escuta focada.',
      'home.recent': 'Projetos recentes',
      'home.empty': 'Suas sessões salvas aparecerão aqui.',
      'home.viewAll': 'Ver todos os projetos',
      'home.placeholder': 'Escreva ou cole seu texto aqui...',
      'home.counter': 'palavras',
      'home.privacy': 'Suas notas ficam neste dispositivo.',
      'home.seo.eyebrow': 'Aprendizado privado no navegador',
      'home.seo.title': 'Transforme anotações, PDFs e textos em áudio falado.',
      'home.seo.body': 'O DICTATE ajuda a ouvir notas em vez de ler linha por linha. Use para revisão, aprendizado de idiomas, prática de leitura e sessões de foco tranquilo sem enviar seus arquivos para um servidor.',
      'home.seo.link.reader': 'Leitor de texto para fala no navegador',
      'home.seo.link.pdf': 'Ler PDF em voz alta online',
      'home.seo.link.notes': 'Ler notas em voz alta no navegador',
      'home.seo.link.student': 'Ferramenta de ditado para estudantes',
      'home.seo.studyTitle': 'Estude mais rápido',
      'home.seo.studyText': 'Ouça anotações de revisão, ensaios e resumos em blocos curtos para absorver mais sem fadiga visual.',
      'home.seo.pdfTitle': 'Leia PDFs em voz alta',
      'home.seo.pdfText': 'Carregue um PDF ou DOCX e transforme material complexo em fala que você pode seguir enquanto realiza outras tarefas.',
      'home.seo.privateTitle': 'Mantenha-se privado',
      'home.seo.privateText': 'Tudo funciona no navegador com armazenamento local de projetos, o que torna o processo prático para aprendizagem silenciosa e privada.',
      'home.seo.questionsTitle': 'Perguntas frequentes',
      'home.seo.question1': 'Por que usar um leitor de texto para fala no navegador?',
      'home.seo.answer1': 'Ele ajuda a revisar notas por áudio, reduzir a fadiga visual e repetir capítulos ou conceitos difíceis em um ritmo focado e gerenciável.',
      'home.seo.question2': 'Posso ler documentos em voz alta no navegador?',
      'home.seo.answer2': 'Sim. O DICTATE suporta leitura de texto colado, documentos locais do navegador e conteúdo PDF diretamente no navegador.',
      'home.seo.question3': 'Isso é útil para estudantes?',
      'home.seo.answer3': 'Sim. É útil para revisão, prática de leitura, aprendizado de idiomas e sessões de estudo mais silenciosas, com menos fadiga visual.',
      'home.save': 'Salvar alterações',
      'home.start': 'Começar a ditar',
      'home.browse': 'Clique para procurar',
      'home.drop': 'Solte um arquivo aqui',
      'home.drag': 'ou arraste e solte',
      'home.fileType': 'TXT, PDF ou DOCX',
      'project.yourLibrary': 'Sua biblioteca',
      'project.title': 'Seus projetos.',
      'project.subtitle': 'Gerencie suas sessões de escuta. Máximo de 20 projetos.',
      'project.new': '+ Novo projeto',
      'project.demoInfo': 'Projeto de teste integrado · {count} grupos · Não conta para o limite de 20 projetos',
      'project.openDemo': 'Abrir demo',
      'project.open': 'Abrir',
      'project.rename': 'Renomear',
      'project.delete': 'Excluir',
      'project.emptyTitle': 'Ainda não há projetos.',
      'project.emptyText': 'Comece com uma nota na página inicial.',
      'project.emptyAction': 'Crie seu primeiro projeto',
      'project.storageUsed': '{count} de 20 projetos usados',
      'project.deleteConfirm': 'Excluir este projeto? Esta ação não pode ser desfeita.',
      'project.renamed': 'Projeto renomeado.',
      'project.deleted': 'Projeto excluído.',
      'project.undo': 'Desfazer',
      'project.restored': 'Projeto restaurado.',
      'project.saved': 'Projeto atualizado.',
      'project.created': 'Projeto criado.',
      'project.fileLoaded': '{file} carregado.',
      'project.loadFail': 'Não foi possível salvar o projeto.',
      'project.storageFull': 'Armazenamento cheio (20/20 projetos).',
      'project.export': 'Exportar backup',
      'project.import': 'Importar backup',
      'project.exported': 'Backup baixado.',
      'project.imported': '{count} projetos restaurados.',
      'project.invalidBackup': 'Esse arquivo de backup não é válido.',
      'reader.back': '← Voltar para projetos',
      'reader.demo': 'Projeto de teste integrado',
      'reader.view': 'Modo de leitura',
      'reader.edit': 'Editar texto',
      'reader.words': 'Palavras',
      'reader.reps': 'Repetições',
      'reader.lang': 'Idioma',
      'reader.restart': 'Reiniciar',
      'reader.speed': 'Velocidade',
      'reader.loading': 'Carregando voz do navegador',
      'reader.finished': 'Concluído · pressione Reiniciar para começar de novo',
      'reader.group': 'Grupo',
      'reader.repeat': 'Repetição',
      'reader.play': 'Reproduzir',
      'reader.pause': 'Pausar',
      'about.title': 'Uma forma mais tranquila de aprender.',
      'about.body': 'O DICTATE transforma notas, ensaios, PDFs e material de estudo em fala para você ouvir, repetir e reter mais. Ele foi pensado para estudantes, aprendizes de idiomas e qualquer pessoa que queira ditar anotações para o computador e revisá-las por áudio em um fluxo privado no navegador.',
      'about.section1': 'Pensado para repetição',
      'about.section1p': 'Grupos pequenos, ritmo ajustável e destaque visível da leitura ajudam você a permanecer na frase em vez de correr pela leitura.',
      'about.section2': 'Privado por padrão',
      'about.section2p': 'Seus projetos salvos ficam neste navegador usando armazenamento local e IndexedDB. O DICTATE não envia suas notas para um servidor de aplicação.',
      'how.title': 'Como usar o DICTATE.',
      'how.body': 'Comece na página inicial, cole uma nota ou carregue um arquivo TXT, PDF ou DOCX e então crie um projeto.',
      'how.build': 'Crie uma sessão',
      'how.step1': 'Adicione seu texto.',
      'how.step2': 'Escolha o tamanho do grupo, repetições, velocidade e idioma nas Configurações.',
      'how.step3': 'Inicie a sessão e siga os grupos destacados.',
      'how.questions': 'Perguntas',
      'how.groupQuestion': 'O que é um grupo?',
      'how.groupAnswer': 'Um grupo é o número de palavras que o DICTATE fala antes de avançar.',
      'how.settingsQuestion': 'Posso alterar as configurações durante a leitura?',
      'how.settingsAnswer': 'Sim. Os controles do leitor salvam alterações no projeto atual e ajustam o agrupamento quando necessário.',
      'privacy.title': 'Política de privacidade.',
      'privacy.body': 'O DICTATE foi projetado para manter suas notas no seu dispositivo. Os projetos ficam armazenados neste navegador e a fala é produzida pela Web Speech API do navegador.',
      'privacy.whatLeaves': 'O que sai do seu dispositivo?',
      'privacy.whatLeavesBody': 'Nada é enviado para um servidor da aplicação DICTATE. Bibliotecas opcionais de PDF, DOCX e detecção de idioma podem ser carregadas por meio de CDNs públicos quando você usa esses recursos.',
      'privacy.removing': 'Removendo seus dados',
      'privacy.removingBody': 'Exclua projetos individuais na página de Projetos ou limpe o armazenamento do site no navegador para remover todos os dados locais.',
    },
    fr: {
      'home.hero.edit': 'Modifier le projet enregistré', 'home.hero.new': 'Écoutez. Répétez. Apprenez.', 'home.h1.edit': 'Mettez vos notes à jour.', 'home.h1.new': 'Dictez vos notes.', 'home.p.edit': 'Enregistrez les changements de cette session d’écoute.', 'home.p.new': 'Transformez vos notes en une session d’écoute ciblée.', 'home.recent': 'Projets récents', 'home.empty': 'Vos sessions enregistrées apparaîtront ici.', 'home.viewAll': 'Voir tous les projets', 'home.placeholder': 'Écrivez ou collez votre texte ici...', 'home.counter': 'mots', 'home.privacy': 'Vos notes restent sur cet appareil.', 'home.seo.eyebrow': 'Apprentissage privé dans le navigateur', 'home.seo.title': 'Transformez les notes, PDF et scripts en audio parlé.', 'home.seo.body': 'DICTATE vous aide à écouter vos notes au lieu de tout relire. Utilisez-le pour réviser, apprendre une langue, pratiquer la lecture et rester concentré sans envoyer vos fichiers à un serveur.', 'home.seo.link.reader': 'Lecteur de texte en voix dans le navigateur', 'home.seo.link.pdf': 'Lire un PDF à voix haute en ligne', 'home.seo.link.notes': 'Lire des notes à voix haute dans le navigateur', 'home.seo.link.student': 'Outil de dictée pour étudiants', 'home.seo.studyTitle': 'Apprenez plus vite', 'home.seo.studyText': 'Écoutez des notes de révision, des essais et des résumés en blocs courts pour assimiler davantage sans fatigue visuelle.', 'home.seo.pdfTitle': 'Lire des PDF à voix haute', 'home.seo.pdfText': 'Téléchargez un PDF ou DOCX et transformez un document complexe en audio que vous pouvez suivre pendant d’autres tâches.', 'home.seo.privateTitle': 'Restez privé', 'home.seo.privateText': 'Tout fonctionne dans le navigateur avec un stockage local des projets, ce qui le rend pratique pour un apprentissage calme et privé.', 'home.seo.questionsTitle': 'Questions fréquentes', 'home.seo.question1': 'Pourquoi utiliser un lecteur de texte en voix dans le navigateur ?', 'home.seo.answer1': 'Il vous aide à revoir les notes à l’oreille, à réduire la fatigue visuelle et à répéter les chapitres ou idées difficiles dans un rythme maîtrisé.', 'home.seo.question2': 'Puis-je lire des documents à voix haute dans mon navigateur ?', 'home.seo.answer2': 'Oui. DICTATE prend en charge le texte collé, les documents locaux du navigateur et les PDF directement dans le navigateur.', 'home.seo.question3': 'C’est utile pour les étudiants ?', 'home.seo.answer3': 'Oui. C’est utile pour la révision, la pratique de lecture, l’apprentissage des langues et des sessions d’étude plus calmes avec moins de fatigue visuelle.', 'home.save': 'Enregistrer les changements', 'home.start': 'Commencer la dictée', 'home.browse': 'Cliquer pour parcourir', 'home.drop': 'Déposez un fichier ici', 'home.drag': 'ou glissez-déposez', 'home.fileType': 'TXT, PDF ou DOCX',
      'project.yourLibrary': 'Votre bibliothèque', 'project.title': 'Vos projets.', 'project.subtitle': 'Gérez vos sessions d’écoute. 20 projets maximum.', 'project.new': '+ Nouveau projet', 'project.demoInfo': 'Projet de test intégré · {count} groupes · Ne compte pas dans la limite de 20 projets', 'project.openDemo': 'Ouvrir la démo', 'project.open': 'Ouvrir', 'project.rename': 'Renommer', 'project.delete': 'Supprimer', 'project.emptyTitle': 'Aucun projet pour le moment.', 'project.emptyText': 'Commencez par une note depuis la page d’accueil.', 'project.emptyAction': 'Créer votre premier projet', 'project.storageUsed': '{count} projets utilisés sur 20', 'project.deleteConfirm': 'Supprimer ce projet ? Cette action est irréversible.', 'project.renamed': 'Projet renommé.', 'project.deleted': 'Projet supprimé.', 'project.undo': 'Annuler', 'project.restored': 'Projet restauré.', 'project.saved': 'Projet mis à jour.', 'project.created': 'Projet créé.', 'project.fileLoaded': '{file} chargé.', 'project.loadFail': 'Impossible d’enregistrer le projet.', 'project.storageFull': 'Stockage plein (20/20 projets).',
      'reader.back': '← Retour aux projets', 'reader.demo': 'Projet de test intégré', 'reader.view': 'Mode lecture', 'reader.edit': 'Modifier le texte', 'reader.words': 'Mots', 'reader.reps': 'Répétitions', 'reader.lang': 'Langue', 'reader.restart': 'Recommencer', 'reader.speed': 'Vitesse', 'reader.loading': 'Chargement de la voix du navigateur', 'reader.finished': 'Terminé · appuyez sur Recommencer pour recommencer', 'reader.group': 'Groupe', 'reader.repeat': 'Répétition', 'reader.play': 'Lire', 'reader.pause': 'Pause',
      'about.title': 'Une façon plus sereine d’apprendre.', 'about.body': 'DICTATE transforme vos notes, essais et supports d’étude en une pratique d’écoute réfléchie. Tout fonctionne dans votre navigateur, vos projets restent donc les vôtres.', 'about.section1': 'Conçu pour la répétition', 'about.section1p': 'Des groupes courts, un rythme réglable et un surlignage visible vous aident à rester dans la phrase au lieu de la parcourir trop vite.', 'about.section2': 'Privé par défaut', 'about.section2p': 'Vos projets sont enregistrés dans ce navigateur avec le stockage local et IndexedDB. DICTATE n’envoie pas vos notes à un serveur applicatif.',
      'how.title': 'Comment utiliser DICTATE.', 'how.body': 'Depuis l’accueil, collez une note ou chargez un fichier TXT, PDF ou DOCX, puis créez un projet.', 'how.build': 'Créer une session', 'how.step1': 'Ajoutez votre texte.', 'how.step2': 'Choisissez dans les paramètres la taille des groupes, les répétitions, la vitesse et la langue.', 'how.step3': 'Démarrez la session et suivez les groupes surlignés.', 'how.questions': 'Questions', 'how.groupQuestion': 'Que signifie un groupe ?', 'how.groupAnswer': 'Un groupe correspond au nombre de mots que DICTATE prononce avant de passer à la suite.', 'how.settingsQuestion': 'Puis-je modifier les paramètres pendant la lecture ?', 'how.settingsAnswer': 'Oui. Les commandes du lecteur enregistrent les changements du projet actuel et réinitialisent les groupes si nécessaire.',
      'privacy.title': 'Politique de confidentialité.', 'privacy.body': 'DICTATE est conçu pour conserver vos notes sur votre appareil. Les projets sont stockés dans ce navigateur et la parole est produite par l’API Web Speech du navigateur.', 'privacy.whatLeaves': 'Qu’est-ce qui quitte votre appareil ?', 'privacy.whatLeavesBody': 'Rien n’est envoyé à un serveur applicatif DICTATE. Des bibliothèques facultatives pour les PDF, DOCX et la détection de langue peuvent être chargées depuis des CDN publics lorsque vous utilisez ces fonctions.', 'privacy.removing': 'Supprimer vos données', 'privacy.removingBody': 'Supprimez des projets individuels depuis la page Projets ou effacez le stockage du site dans le navigateur pour supprimer toutes les données locales.'
    },
    es: {
      'home.hero.edit': 'Editar proyecto guardado', 'home.hero.new': 'Escucha. Repite. Aprende.', 'home.h1.edit': 'Actualiza tus notas.', 'home.h1.new': 'Dicta tus notas.', 'home.p.edit': 'Guarda los cambios de esta sesión de escucha.', 'home.p.new': 'Convierte tus notas en una sesión de escucha enfocada.', 'home.recent': 'Proyectos recientes', 'home.empty': 'Tus sesiones guardadas aparecerán aquí.', 'home.viewAll': 'Ver todos los proyectos', 'home.placeholder': 'Escribe o pega tu texto aquí...', 'home.counter': 'palabras', 'home.privacy': 'Tus notas permanecen en este dispositivo.', 'home.seo.eyebrow': 'Aprendizaje privado en el navegador', 'home.seo.title': 'Convierte apuntes, PDFs y guiones en audio hablado.', 'home.seo.body': 'DICTATE te ayuda a escuchar tus apuntes en lugar de leer línea por línea. Úsalo para repasar, aprender idiomas, practicar lectura y estudiar con más calma sin enviar tus archivos a un servidor.', 'home.seo.link.reader': 'Lector de texto a voz en el navegador', 'home.seo.link.pdf': 'Leer PDF en voz alta en línea', 'home.seo.link.notes': 'Leer apuntes en voz alta en el navegador', 'home.seo.link.student': 'Herramienta de dictado para estudiantes', 'home.seo.studyTitle': 'Estudia más rápido', 'home.seo.studyText': 'Escucha apuntes de repaso, ensayos y resúmenes en bloques breves para comprender más sin fatiga visual.', 'home.seo.pdfTitle': 'Leer PDFs en voz alta', 'home.seo.pdfText': 'Sube un PDF o DOCX y convierte materiales complejos en audio que puedes seguir mientras realizas otras tareas.', 'home.seo.privateTitle': 'Mantén la privacidad', 'home.seo.privateText': 'Todo funciona en el navegador con almacenamiento local de proyectos, lo que lo hace práctico para un aprendizaje tranquilo y privado.', 'home.seo.questionsTitle': 'Preguntas frecuentes', 'home.seo.question1': '¿Por qué usar un lector de texto a voz en el navegador?', 'home.seo.answer1': 'Te ayuda a repasar apuntes por oído, reducir la fatiga visual y repetir capítulos o conceptos difíciles con un ritmo más manejable.', 'home.seo.question2': '¿Puedo leer documentos en voz alta en mi navegador?', 'home.seo.answer2': 'Sí. DICTATE admite texto pegado, documentos locales del navegador y contenido PDF directamente en el navegador.', 'home.seo.question3': '¿Es útil para estudiantes?', 'home.seo.answer3': 'Sí. Es útil para repaso, práctica de lectura, aprendizaje de idiomas y sesiones de estudio más tranquilas con menos fatiga visual.', 'home.save': 'Guardar cambios', 'home.start': 'Comenzar a dictar', 'home.browse': 'Haz clic para buscar', 'home.drop': 'Suelta un archivo aquí', 'home.drag': 'o arrástralo y suéltalo', 'home.fileType': 'TXT, PDF o DOCX',
      'project.yourLibrary': 'Tu biblioteca', 'project.title': 'Tus proyectos.', 'project.subtitle': 'Gestiona tus sesiones de escucha. Máximo 20 proyectos.', 'project.new': '+ Nuevo proyecto', 'project.demoInfo': 'Proyecto de prueba integrado · {count} grupos · No cuenta para el límite de 20 proyectos', 'project.openDemo': 'Abrir demo', 'project.open': 'Abrir', 'project.rename': 'Cambiar nombre', 'project.delete': 'Eliminar', 'project.emptyTitle': 'Aún no hay proyectos.', 'project.emptyText': 'Empieza con una nota desde la página de inicio.', 'project.emptyAction': 'Crear tu primer proyecto', 'project.storageUsed': '{count} de 20 proyectos usados', 'project.deleteConfirm': '¿Eliminar este proyecto? Esta acción no se puede deshacer.', 'project.renamed': 'Proyecto renombrado.', 'project.deleted': 'Proyecto eliminado.', 'project.undo': 'Deshacer', 'project.restored': 'Proyecto restaurado.', 'project.saved': 'Proyecto actualizado.', 'project.created': 'Proyecto creado.', 'project.fileLoaded': '{file} cargado.', 'project.loadFail': 'No se pudo guardar el proyecto.', 'project.storageFull': 'Almacenamiento lleno (20/20 proyectos).',
      'reader.back': '← Volver a proyectos', 'reader.demo': 'Proyecto de prueba integrado', 'reader.view': 'Vista de lectura', 'reader.edit': 'Editar texto', 'reader.words': 'Palabras', 'reader.reps': 'Repeticiones', 'reader.lang': 'Idioma', 'reader.restart': 'Reiniciar', 'reader.speed': 'Velocidad', 'reader.loading': 'Cargando la voz del navegador', 'reader.finished': 'Completado · pulsa Reiniciar para comenzar de nuevo', 'reader.group': 'Grupo', 'reader.repeat': 'Repetición', 'reader.play': 'Reproducir', 'reader.pause': 'Pausa',
      'about.title': 'Una forma más tranquila de aprender.', 'about.body': 'DICTATE convierte notas, ensayos y material de estudio en una práctica de escucha deliberada. Todo funciona en tu navegador, así que tus proyectos siguen siendo tuyos.', 'about.section1': 'Diseñado para repetir', 'about.section1p': 'Los grupos pequeños, el ritmo ajustable y el resaltado visible te ayudan a seguir la frase en lugar de recorrerla deprisa.', 'about.section2': 'Privado por defecto', 'about.section2p': 'Tus proyectos guardados viven en este navegador mediante almacenamiento local e IndexedDB. DICTATE no sube tus notas a un servidor de aplicaciones.',
      'how.title': 'Cómo usar DICTATE.', 'how.body': 'Empieza en Inicio, pega una nota o carga un archivo TXT, PDF o DOCX y crea un proyecto.', 'how.build': 'Crear una sesión', 'how.step1': 'Añade tu texto.', 'how.step2': 'Elige en Ajustes el tamaño de los grupos, las repeticiones, la velocidad y el idioma.', 'how.step3': 'Inicia la sesión y sigue los grupos resaltados.', 'how.questions': 'Preguntas', 'how.groupQuestion': '¿Qué significa un grupo?', 'how.groupAnswer': 'Un grupo es el número de palabras que DICTATE pronuncia antes de avanzar.', 'how.settingsQuestion': '¿Puedo cambiar los ajustes mientras leo?', 'how.settingsAnswer': 'Sí. Los controles del lector guardan los cambios del proyecto actual y reinician los grupos cuando es necesario.',
      'privacy.title': 'Política de privacidad.', 'privacy.body': 'DICTATE está diseñado para mantener tus notas en tu dispositivo. Los proyectos se almacenan en este navegador y la voz la produce la API Web Speech del navegador.', 'privacy.whatLeaves': '¿Qué sale de tu dispositivo?', 'privacy.whatLeavesBody': 'No se envía nada a un servidor de aplicaciones de DICTATE. Las bibliotecas opcionales para PDF, DOCX y detección de idioma pueden cargarse desde CDN públicos cuando usas esas funciones.', 'privacy.removing': 'Eliminar tus datos', 'privacy.removingBody': 'Elimina proyectos individuales desde la página Proyectos o borra el almacenamiento de este sitio en el navegador para eliminar todos los datos locales.'
    },
    de: {
      'home.hero.edit': 'Gespeichertes Projekt bearbeiten', 'home.hero.new': 'Hören. Wiederholen. Lernen.', 'home.h1.edit': 'Notizen aktualisieren.', 'home.h1.new': 'Diktiere deine Notizen.', 'home.p.edit': 'Änderungen an dieser Hörsitzung speichern.', 'home.p.new': 'Verwandle deine Notizen in eine konzentrierte Hörsitzung.', 'home.recent': 'Letzte Projekte', 'home.empty': 'Gespeicherte Sitzungen erscheinen hier.', 'home.viewAll': 'Alle Projekte anzeigen', 'home.placeholder': 'Text hier schreiben oder einfügen...', 'home.counter': 'Wörter', 'home.privacy': 'Deine Notizen bleiben auf diesem Gerät.', 'home.seo.eyebrow': 'Privates Lernen im Browser', 'home.seo.title': 'Wandle Lernnotizen, PDFs und Texte in gesprochene Sprache um.', 'home.seo.body': 'DICTATE hilft dir, Notizen zu hören statt Zeile für Zeile zu lesen. Nutze es für Wiederholung, Sprachenlernen, Leseübungen und ruhige Fokus-Sitzungen, ohne deine Dateien an einen Server zu senden.', 'home.seo.link.reader': 'Browser-Texterleser', 'home.seo.link.pdf': 'PDF online laut vorlesen', 'home.seo.link.notes': 'Notizen im Browser laut vorlesen', 'home.seo.link.student': 'Studenten-Diktat-Tool', 'home.seo.studyTitle': 'Schneller lernen', 'home.seo.studyText': 'Höre Wiederholungsnotizen, Essays und Zusammenfassungen in kurzen Blöcken, um mehr ohne Bildschirmermüdung aufzunehmen.', 'home.seo.pdfTitle': 'PDFs laut vorlesen', 'home.seo.pdfText': 'Lade ein PDF oder DOCX hoch und verwandle komplexes Material in Sprache, der du beim Erledigen anderer Aufgaben folgen kannst.', 'home.seo.privateTitle': 'Privat bleiben', 'home.seo.privateText': 'Alles läuft im Browser mit lokalem Projektspeicher, wodurch es für ruhiges, privates Lernen praktisch ist.', 'home.seo.questionsTitle': 'Häufige Fragen', 'home.seo.question1': 'Warum einen Browser-Texterleser nutzen?', 'home.seo.answer1': 'Er hilft dir, Notizen per Hören zu wiederholen, die Augen zu entlasten und schwierige Kapitel oder Konzepte in einem fokussierten, gut kontrollierbaren Rhythmus zu wiederholen.', 'home.seo.question2': 'Kann ich Dokumente im Browser laut vorlesen lassen?', 'home.seo.answer2': 'Ja. DICTATE unterstützt das Vorlesen von eingefügtem Text, browserlokalen Dokumenten und PDF-Inhalten direkt im Browser.', 'home.seo.question3': 'Ist das für Studierende gut?', 'home.seo.answer3': 'Ja. Es eignet sich für Wiederholung, Leseübungen, Sprachenlernen und ruhigere Lernsitzungen mit weniger Bildschirmermüdung.', 'home.save': 'Änderungen speichern', 'home.start': 'Diktat starten', 'home.browse': 'Zum Durchsuchen klicken', 'home.drop': 'Datei hier ablegen', 'home.drag': 'oder per Drag-and-drop', 'home.fileType': 'TXT, PDF oder DOCX',
      'project.yourLibrary': 'Deine Bibliothek', 'project.title': 'Deine Projekte.', 'project.subtitle': 'Verwalte deine Hörsitzungen. Maximal 20 Projekte.', 'project.new': '+ Neues Projekt', 'project.demoInfo': 'Integriertes Testprojekt · {count} Gruppen · Wird nicht auf das Limit von 20 Projekten angerechnet', 'project.openDemo': 'Demo öffnen', 'project.open': 'Öffnen', 'project.rename': 'Umbenennen', 'project.delete': 'Löschen', 'project.emptyTitle': 'Noch keine Projekte.', 'project.emptyText': 'Beginne mit einer Notiz auf der Startseite.', 'project.emptyAction': 'Erstes Projekt erstellen', 'project.storageUsed': '{count} von 20 Projekten verwendet', 'project.deleteConfirm': 'Dieses Projekt löschen? Dies kann nicht rückgängig gemacht werden.', 'project.renamed': 'Projekt umbenannt.', 'project.deleted': 'Projekt gelöscht.', 'project.undo': 'Rückgängig', 'project.restored': 'Projekt wiederhergestellt.', 'project.saved': 'Projekt aktualisiert.', 'project.created': 'Projekt erstellt.', 'project.fileLoaded': '{file} geladen.', 'project.loadFail': 'Projekt konnte nicht gespeichert werden.', 'project.storageFull': 'Speicher voll (20/20 Projekte).',
      'reader.back': '← Zurück zu den Projekten', 'reader.demo': 'Integriertes Testprojekt', 'reader.view': 'Lesemodus', 'reader.edit': 'Text bearbeiten', 'reader.words': 'Wörter', 'reader.reps': 'Wiederholungen', 'reader.lang': 'Sprache', 'reader.restart': 'Neustart', 'reader.speed': 'Geschwindigkeit', 'reader.loading': 'Browserstimme wird geladen', 'reader.finished': 'Fertig · zum Neustart auf Neustart drücken', 'reader.group': 'Gruppe', 'reader.repeat': 'Wiederholung', 'reader.play': 'Abspielen', 'reader.pause': 'Pause',
      'about.title': 'Ruhiger lernen.', 'about.body': 'DICTATE verwandelt Notizen, Aufsätze und Lernmaterial in bewusstes Hörtraining. Alles läuft im Browser, daher bleiben deine Projekte deine eigenen.', 'about.section1': 'Für Wiederholung entwickelt', 'about.section1p': 'Kleine Gruppen, anpassbares Tempo und eine sichtbare Hervorhebung helfen dir, beim Satz zu bleiben, statt ihn zu überfliegen.', 'about.section2': 'Standardmäßig privat', 'about.section2p': 'Deine gespeicherten Projekte liegen über lokalen Speicher und IndexedDB in diesem Browser. DICTATE lädt deine Notizen nicht auf einen Anwendungsserver hoch.',
      'how.title': 'So verwendest du DICTATE.', 'how.body': 'Beginne auf der Startseite, füge eine Notiz ein oder lade eine TXT-, PDF- oder DOCX-Datei und erstelle dann ein Projekt.', 'how.build': 'Sitzung erstellen', 'how.step1': 'Füge deinen Text hinzu.', 'how.step2': 'Wähle in den Einstellungen Gruppengröße, Wiederholungen, Geschwindigkeit und Sprache.', 'how.step3': 'Starte die Sitzung und folge den hervorgehobenen Gruppen.', 'how.questions': 'Fragen', 'how.groupQuestion': 'Was bedeutet eine Gruppe?', 'how.groupAnswer': 'Eine Gruppe ist die Anzahl der Wörter, die DICTATE gemeinsam spricht, bevor es fortfährt.', 'how.settingsQuestion': 'Kann ich die Einstellungen während des Lesens ändern?', 'how.settingsAnswer': 'Ja. Die Lesesteuerung speichert Änderungen am aktuellen Projekt und setzt die Gruppierung bei Bedarf zurück.',
      'privacy.title': 'Datenschutzerklärung.', 'privacy.body': 'DICTATE wurde entwickelt, damit deine Notizen auf deinem Gerät bleiben. Projekte werden in diesem Browser gespeichert und die Sprache wird von der Web-Speech-API des Browsers erzeugt.', 'privacy.whatLeaves': 'Was verlässt dein Gerät?', 'privacy.whatLeavesBody': 'Nichts wird an einen DICTATE-Anwendungsserver gesendet. Optionale PDF-, DOCX- und Spracherkennungsbibliotheken können bei ihrer Verwendung von öffentlichen CDNs geladen werden.', 'privacy.removing': 'Daten entfernen', 'privacy.removingBody': 'Lösche einzelne Projekte auf der Projektseite oder lösche den Browserspeicher dieser Website, um alle lokalen Daten zu entfernen.'
    },
    it: {
      'home.hero.edit': 'Modifica progetto salvato', 'home.hero.new': 'Ascolta. Ripeti. Impara.', 'home.h1.edit': 'Aggiorna i tuoi appunti.', 'home.h1.new': 'Detta i tuoi appunti.', 'home.p.edit': 'Salva le modifiche a questa sessione di ascolto.', 'home.p.new': 'Trasforma i tuoi appunti in una sessione di ascolto mirata.', 'home.recent': 'Progetti recenti', 'home.empty': 'Le sessioni salvate appariranno qui.', 'home.viewAll': 'Visualizza tutti i progetti', 'home.placeholder': 'Scrivi o incolla qui il testo...', 'home.counter': 'parole', 'home.privacy': 'I tuoi appunti restano su questo dispositivo.', 'home.seo.eyebrow': 'Apprendimento privato nel browser', 'home.seo.title': 'Trasforma appunti, PDF e testi in audio parlato.', 'home.seo.body': 'DICTATE ti aiuta ad ascoltare gli appunti invece di leggerli riga per riga. Usalo per ripasso, apprendimento linguistico, pratica di lettura e sessioni di concentrazione silenziosa senza inviare i tuoi file a un server.', 'home.seo.link.reader': 'Lettore di testo in audio nel browser', 'home.seo.link.pdf': 'Leggi PDF a voce alta online', 'home.seo.link.notes': 'Leggi appunti a voce alta nel browser', 'home.seo.link.student': 'Strumento di dettatura per studenti', 'home.seo.studyTitle': 'Studia più velocemente', 'home.seo.studyText': 'Ascolta appunti di ripasso, saggi e riassunti in blocchi brevi per assorbire di più senza fatica visiva.', 'home.seo.pdfTitle': 'Leggi PDF a voce alta', 'home.seo.pdfText': 'Carica un PDF o DOCX e trasforma materiali complessi in voce che puoi seguire mentre fai altre attività.', 'home.seo.privateTitle': 'Resta privato', 'home.seo.privateText': 'Tutto funziona nel browser con archiviazione locale dei progetti, rendendo l’apprendimento tranquillo e privato.', 'home.seo.questionsTitle': 'Domande frequenti', 'home.seo.question1': 'Perché usare un lettore di testo in audio nel browser?', 'home.seo.answer1': 'Ti aiuta a rivedere gli appunti a orecchio, ridurre la fatica visiva e ripetere capitoli o concetti difficili con un ritmo mirato e gestibile.', 'home.seo.question2': 'Posso leggere documenti a voce alta nel mio browser?', 'home.seo.answer2': 'Sì. DICTATE supporta la lettura di testo incollato, documenti locali del browser e contenuti PDF direttamente nel browser.', 'home.seo.question3': 'È utile per gli studenti?', 'home.seo.answer3': 'Sì. È utile per ripasso, pratica di lettura, apprendimento linguistico e sessioni di studio più tranquille con meno fatica visiva.', 'home.save': 'Salva modifiche', 'home.start': 'Inizia a dettare', 'home.browse': 'Fai clic per sfogliare', 'home.drop': 'Trascina qui un file', 'home.drag': 'oppure trascinalo e rilascialo', 'home.fileType': 'TXT, PDF o DOCX',
      'project.yourLibrary': 'La tua raccolta', 'project.title': 'I tuoi progetti.', 'project.subtitle': 'Gestisci le tue sessioni di ascolto. Massimo 20 progetti.', 'project.new': '+ Nuovo progetto', 'project.demoInfo': 'Progetto di prova integrato · {count} gruppi · Non conta per il limite di 20 progetti', 'project.openDemo': 'Apri demo', 'project.open': 'Apri', 'project.rename': 'Rinomina', 'project.delete': 'Elimina', 'project.emptyTitle': 'Ancora nessun progetto.', 'project.emptyText': 'Inizia con una nota dalla pagina Home.', 'project.emptyAction': 'Crea il tuo primo progetto', 'project.storageUsed': '{count} progetti usati su 20', 'project.deleteConfirm': 'Eliminare questo progetto? Non è possibile annullare l’operazione.', 'project.renamed': 'Progetto rinominato.', 'project.deleted': 'Progetto eliminato.', 'project.undo': 'Annulla', 'project.restored': 'Progetto ripristinato.', 'project.saved': 'Progetto aggiornato.', 'project.created': 'Progetto creato.', 'project.fileLoaded': '{file} caricato.', 'project.loadFail': 'Impossibile salvare il progetto.', 'project.storageFull': 'Spazio esaurito (20/20 progetti).',
      'reader.back': '← Torna ai progetti', 'reader.demo': 'Progetto di prova integrato', 'reader.view': 'Vista lettura', 'reader.edit': 'Modifica testo', 'reader.words': 'Parole', 'reader.reps': 'Ripetizioni', 'reader.lang': 'Lingua', 'reader.restart': 'Riavvia', 'reader.speed': 'Velocità', 'reader.loading': 'Caricamento della voce del browser', 'reader.finished': 'Completato · premi Riavvia per ricominciare', 'reader.group': 'Gruppo', 'reader.repeat': 'Ripetizione', 'reader.play': 'Riproduci', 'reader.pause': 'Pausa',
      'about.title': 'Un modo più sereno di imparare.', 'about.body': 'DICTATE trasforma appunti, saggi e materiale di studio in una pratica di ascolto intenzionale. Tutto funziona nel browser, quindi i tuoi progetti restano tuoi.', 'about.section1': 'Progettato per la ripetizione', 'about.section1p': 'Gruppi brevi, ritmo regolabile ed evidenziazione visibile ti aiutano a seguire la frase invece di scorrerla velocemente.', 'about.section2': 'Privato per impostazione predefinita', 'about.section2p': 'I tuoi progetti salvati risiedono in questo browser tramite memoria locale e IndexedDB. DICTATE non carica i tuoi appunti su un server applicativo.',
      'how.title': 'Come usare DICTATE.', 'how.body': 'Inizia da Home, incolla una nota o carica un file TXT, PDF o DOCX, quindi crea un progetto.', 'how.build': 'Crea una sessione', 'how.step1': 'Aggiungi il testo.', 'how.step2': 'Scegli nelle Impostazioni la dimensione dei gruppi, le ripetizioni, la velocità e la lingua.', 'how.step3': 'Avvia la sessione e segui i gruppi evidenziati.', 'how.questions': 'Domande', 'how.groupQuestion': 'Che cosa significa gruppo?', 'how.groupAnswer': 'Un gruppo è il numero di parole che DICTATE pronuncia insieme prima di continuare.', 'how.settingsQuestion': 'Posso cambiare le impostazioni durante la lettura?', 'how.settingsAnswer': 'Sì. I controlli del lettore salvano le modifiche al progetto corrente e reimpostano i gruppi quando necessario.',
      'privacy.title': 'Informativa sulla privacy.', 'privacy.body': 'DICTATE è progettato per conservare i tuoi appunti sul dispositivo. I progetti vengono salvati in questo browser e la voce è prodotta dall’API Web Speech del browser.', 'privacy.whatLeaves': 'Che cosa lascia il dispositivo?', 'privacy.whatLeavesBody': 'Nessun dato viene inviato a un server applicativo DICTATE. Le librerie opzionali per PDF, DOCX e rilevamento della lingua possono essere caricate da CDN pubblici quando usi queste funzioni.', 'privacy.removing': 'Rimuovere i dati', 'privacy.removingBody': 'Elimina i singoli progetti dalla pagina Progetti oppure cancella la memoria del sito nel browser per rimuovere tutti i dati locali.'
    },
    ru: {
      'home.hero.edit': 'Изменить сохранённый проект', 'home.hero.new': 'Слушайте. Повторяйте. Учитесь.', 'home.h1.edit': 'Обновите свои заметки.', 'home.h1.new': 'Диктуйте свои заметки.', 'home.p.edit': 'Сохраните изменения этой учебной сессии.', 'home.p.new': 'Превратите заметки в сосредоточенную сессию прослушивания.', 'home.recent': 'Недавние проекты', 'home.empty': 'Сохранённые сессии появятся здесь.', 'home.viewAll': 'Показать все проекты', 'home.placeholder': 'Напишите или вставьте текст здесь...', 'home.counter': 'слов', 'home.privacy': 'Ваши заметки остаются на этом устройстве.', 'home.seo.eyebrow': 'Приватное обучение в браузере', 'home.seo.title': 'Преобразуйте заметки, PDF и тексты в озвученный аудио.', 'home.seo.body': 'DICTATE помогает слушать заметки вместо чтения строку за строкой. Используйте его для повторения, изучения языков, практики чтения и спокойных учебных сессий без отправки файлов на сервер.', 'home.seo.link.reader': 'Чтение текста в речь в браузере', 'home.seo.link.pdf': 'Читать PDF вслух онлайн', 'home.seo.link.notes': 'Читать заметки вслух в браузере', 'home.seo.link.student': 'Студенческий инструмент диктовки', 'home.seo.studyTitle': 'Учитесь быстрее', 'home.seo.studyText': 'Слушайте заметки для повторения, эссе и резюме короткими блоками, чтобы усваивать больше без зрительной усталости.', 'home.seo.pdfTitle': 'Читать PDF вслух', 'home.seo.pdfText': 'Загрузите PDF или DOCX и превратите сложный материал в речь, за которой можно следить, выполняя другие задачи.', 'home.seo.privateTitle': 'Оставайтесь приватными', 'home.seo.privateText': 'Всё работает в браузере с локальным хранилищем проектов, что делает обучение спокойным и приватным.', 'home.seo.questionsTitle': 'Часто задаваемые вопросы', 'home.seo.question1': 'Зачем использовать чтение текста в речь в браузере?', 'home.seo.answer1': 'Это помогает пересматривать заметки на слух, снижать зрительную усталость и повторять сложные главы или концепции в спокойном, управляемом ритме.', 'home.seo.question2': 'Можно ли читать документы вслух в браузере?', 'home.seo.answer2': 'Да. DICTATE поддерживает чтение вставленного текста, локальных документов и PDF-контента прямо в браузере.', 'home.seo.question3': 'Это полезно для студентов?', 'home.seo.answer3': 'Да. Это полезно для повторения, практики чтения, изучения языков и более спокойных учебных сессий с меньшей зрительной усталостью.', 'home.save': 'Сохранить изменения', 'home.start': 'Начать диктовку', 'home.browse': 'Нажмите для выбора', 'home.drop': 'Перетащите файл сюда', 'home.drag': 'или перетащите его', 'home.fileType': 'TXT, PDF или DOCX',
      'project.yourLibrary': 'Ваша библиотека', 'project.title': 'Ваши проекты.', 'project.subtitle': 'Управляйте сессиями прослушивания. Максимум 20 проектов.', 'project.new': '+ Новый проект', 'project.demoInfo': 'Встроенный тестовый проект · групп: {count} · Не учитывается в лимите 20 проектов', 'project.openDemo': 'Открыть демо', 'project.open': 'Открыть', 'project.rename': 'Переименовать', 'project.delete': 'Удалить', 'project.emptyTitle': 'Проектов пока нет.', 'project.emptyText': 'Начните с заметки на главной странице.', 'project.emptyAction': 'Создать первый проект', 'project.storageUsed': 'Использовано проектов: {count} из 20', 'project.deleteConfirm': 'Удалить этот проект? Это действие нельзя отменить.', 'project.renamed': 'Проект переименован.', 'project.deleted': 'Проект удалён.', 'project.undo': 'Отменить', 'project.restored': 'Проект восстановлен.', 'project.saved': 'Проект обновлён.', 'project.created': 'Проект создан.', 'project.fileLoaded': '{file} загружен.', 'project.loadFail': 'Не удалось сохранить проект.', 'project.storageFull': 'Хранилище заполнено (20/20 проектов).',
      'reader.back': '← Назад к проектам', 'reader.demo': 'Встроенный тестовый проект', 'reader.view': 'Режим чтения', 'reader.edit': 'Изменить текст', 'reader.words': 'Слова', 'reader.reps': 'Повторы', 'reader.lang': 'Язык', 'reader.restart': 'Начать заново', 'reader.speed': 'Скорость', 'reader.loading': 'Загрузка голоса браузера', 'reader.finished': 'Готово · нажмите «Начать заново», чтобы повторить', 'reader.group': 'Группа', 'reader.repeat': 'Повтор', 'reader.play': 'Воспроизвести', 'reader.pause': 'Пауза',
      'about.title': 'Более спокойный способ учиться.', 'about.body': 'DICTATE превращает заметки, эссе и учебные материалы в осознанную практику слушания. Всё работает в браузере, поэтому ваши проекты остаются вашими.', 'about.section1': 'Создано для повторения', 'about.section1p': 'Небольшие группы, регулируемый темп и видимая подсветка чтения помогают сосредоточиться на предложении, а не пролистывать его.', 'about.section2': 'Конфиденциальность по умолчанию', 'about.section2p': 'Сохранённые проекты находятся в этом браузере, в локальном хранилище и IndexedDB. DICTATE не загружает ваши заметки на сервер приложения.',
      'how.title': 'Как пользоваться DICTATE.', 'how.body': 'Начните на главной странице, вставьте заметку или загрузите файл TXT, PDF или DOCX, затем создайте проект.', 'how.build': 'Создать сессию', 'how.step1': 'Добавьте текст.', 'how.step2': 'Выберите в настройках размер группы, количество повторов, скорость и язык.', 'how.step3': 'Начните сессию и следите за подсвеченными группами.', 'how.questions': 'Вопросы', 'how.groupQuestion': 'Что такое группа?', 'how.groupAnswer': 'Группа — это количество слов, которые DICTATE произносит вместе перед переходом дальше.', 'how.settingsQuestion': 'Можно ли менять настройки во время чтения?', 'how.settingsAnswer': 'Да. Элементы управления чтением сохраняют изменения текущего проекта и при необходимости сбрасывают группировку.',
      'privacy.title': 'Политика конфиденциальности.', 'privacy.body': 'DICTATE создан, чтобы ваши заметки оставались на устройстве. Проекты хранятся в этом браузере, а речь создаётся с помощью браузерного API Web Speech.', 'privacy.whatLeaves': 'Что покидает ваше устройство?', 'privacy.whatLeavesBody': 'Ничего не отправляется на сервер приложения DICTATE. Дополнительные библиотеки для PDF, DOCX и определения языка могут загружаться из общедоступных CDN при использовании этих функций.', 'privacy.removing': 'Удаление данных', 'privacy.removingBody': 'Удаляйте отдельные проекты на странице проектов или очистите хранилище этого сайта в браузере, чтобы удалить все локальные данные.'
    },
  };

  function getUiLanguage() {
    const settings = window.DictateI18n?.getSettings?.() || {};
    return window.DictateI18n?.resolveUiLanguage ? window.DictateI18n.resolveUiLanguage(settings.uiLanguage || 'auto') : 'en';
  }

  function t(key, fallback = key) {
    const language = getUiLanguage();
    const table = UI_TEXT[language] || UI_TEXT.en;
    return table[key] || UI_TEXT.en[key] || fallback;
  }

  function formatText(key, values = {}) {
    const text = t(key, key);
    return text.replace(/\{(\w+)\}/g, (_, token) => String(values[token] ?? ''));
  }

  const app = () => document.querySelector('#app');
  const safe = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char]));
  const settings = () => window.DictateI18n?.getSettings?.() || { defaultDictationLang:'auto', defaultWordsPerGroup:6, defaultRepetitions:2, defaultSpeed:.9, defaultPauseDuration:.8 };

  let activeReaderGroup = null;
  let activeInputSource = { type:'paste', name:null };
  function demoProject() {
    const demoText = {
      en: `# The Clockmaker's Last Light

## Chapter 1: A Door at Midnight

At 11:59 p.m., Mira heard three knocks: "tap, tap, tap!" She froze; the old clock had stopped.

Beyond the workshop door, rain, wind, and silver leaves raced down the street. A voice whispered, "Mira... are you there?"

She lifted the brass key (the one marked "VII"), turned it twice, and stepped outside. No one was there--only a blue envelope, a broken compass, and a note: "Do not follow the stars."

## Chapter 2: The Impossible Map

Inside the envelope, she found a map covered in arrows, circles, and strange symbols: @, #, %, &, +, =. At the bottom someone had written, "North is not north; midnight is not the end."

Mira checked the time: 12:07. Then 12:08. Then 12:08 again! The compass needle spun; the workshop lights blinked on and off, on and off.

"This makes no sense," she said. "Unless..." A tiny gear fell from the ceiling and landed beside her boot. It was warm--almost alive.

## Chapter 3: The Listening Machine

She placed the gear in the clock. Click. Clack. The machine opened a hidden panel and revealed seven glass letters: A, B, C, D, E, F, G.

Each letter spoke a different word: "begin," "remember," "return," "listen," "choose," "wait," "wake." Mira wrote them down, carefully; punctuation mattered.

At precisely 12:12:12, the clock chimed once. The door vanished. In its place appeared a staircase descending into warm golden light...

Mira took one breath, then another. "All right," she said, "let's find out what the clock remembers." And down she went.`,
  pt: `# A Última Luz do Relojoeiro

## Capítulo 1: Uma Porta à Meia-noite

Às 23h59, Mira ouviu três batidas: "toc, toc, toc!" Ela congelou; o relógio antigo havia parado.

Além da porta da oficina, chuva, vento e folhas prateadas corriam pela rua. Uma voz sussurrou: "Mira... você está aí?"

Ela levantou a chave de latão (a marcada com "VII"), girou-a duas vezes e saiu. Não havia ninguém, apenas um envelope azul, uma bússola quebrada e um bilhete: "Não siga as estrelas."

## Capítulo 2: O Mapa Impossível

Dentro do envelope, encontrou um mapa coberto de setas, círculos e símbolos estranhos: @, #, %, &, +, =. No final, alguém escrevera: "O norte não é o norte; a meia-noite não é o fim."

Mira conferiu a hora: 12h07. Depois 12h08. Depois 12h08 novamente! A agulha da bússola girou; as luzes da oficina piscaram, acendendo e apagando.

"Isso não faz sentido", disse ela. "A menos que..." Uma pequena engrenagem caiu do teto e pousou ao lado de sua bota. Estava quente, quase viva.

## Capítulo 3: A Máquina de Escuta

Ela colocou a engrenagem no relógio. Clique. Clac. A máquina abriu um painel oculto e revelou sete letras de vidro: A, B, C, D, E, F, G.

Cada letra disse uma palavra diferente: "começar", "lembrar", "retornar", "escutar", "escolher", "esperar", "acordar". Mira anotou tudo com cuidado; a pontuação importava.

Exatamente às 12h12min12s, o relógio tocou uma vez. A porta desapareceu. Em seu lugar surgiu uma escada que descia para uma luz dourada e quente...

Mira respirou fundo uma vez, depois outra. "Tudo bem", disse. "Vamos descobrir o que o relógio lembra." E desceu.`,
  fr: `# La dernière lumière de l'horloger

## Chapitre 1 : Une porte à minuit

À 23 h 59, Mira entendit trois coups : "toc, toc, toc !" Elle se figea ; la vieille horloge s'était arrêtée.

Au-delà de la porte de l'atelier, la pluie, le vent et les feuilles argentées dévalaient la rue. Une voix murmura : "Mira... es-tu là ?"

Elle souleva la clé en laiton (celle marquée "VII"), la tourna deux fois et sortit. Il n'y avait personne, seulement une enveloppe bleue, une boussole cassée et un mot : "Ne suis pas les étoiles."

## Chapitre 2 : La carte impossible

Dans l'enveloppe, elle trouva une carte couverte de flèches, de cercles et de symboles étranges : @, #, %, &, +, =. En bas, quelqu'un avait écrit : "Le nord n'est pas le nord ; minuit n'est pas la fin."

Mira regarda l'heure : 12 h 07. Puis 12 h 08. Puis encore 12 h 08 ! L'aiguille de la boussole tournait ; les lumières de l'atelier clignotaient.

"Cela n'a aucun sens", dit-elle. "À moins que..." Une petite roue dentée tomba du plafond près de sa botte. Elle était chaude, presque vivante.

## Chapitre 3 : La machine d'écoute

Elle plaça la roue dans l'horloge. Clic. Clac. La machine ouvrit un panneau secret et révéla sept lettres de verre : A, B, C, D, E, F, G.

Chaque lettre prononça un mot différent : "commencer", "se souvenir", "revenir", "écouter", "choisir", "attendre", "s'éveiller". Mira les nota soigneusement ; la ponctuation comptait.

À 12 h 12 min 12 s exactement, l'horloge sonna une fois. La porte disparut. À sa place apparut un escalier descendant vers une lumière dorée et chaude...

Mira inspira une fois, puis une autre. "Très bien", dit-elle. "Découvrons ce dont l'horloge se souvient." Et elle descendit.`,
  es: `# La última luz del relojero

## Capítulo 1: Una puerta a medianoche

A las 23:59, Mira oyó tres golpes: "¡toc, toc, toc!" Se quedó inmóvil; el viejo reloj se había detenido.

Más allá de la puerta del taller, la lluvia, el viento y las hojas plateadas corrían por la calle. Una voz susurró: "Mira... ¿estás ahí?"

Levantó la llave de latón (la marcada con "VII"), la giró dos veces y salió. No había nadie, solo un sobre azul, una brújula rota y una nota: "No sigas las estrellas."

## Capítulo 2: El mapa imposible

Dentro del sobre encontró un mapa cubierto de flechas, círculos y símbolos extraños: @, #, %, &, +, =. Abajo alguien había escrito: "El norte no es el norte; la medianoche no es el final."

Mira miró la hora: 12:07. Después 12:08. ¡Después 12:08 otra vez! La aguja de la brújula giró; las luces del taller parpadearon.

"Esto no tiene sentido", dijo. "A menos que..." Un pequeño engranaje cayó del techo junto a su bota. Estaba caliente, casi vivo.

## Capítulo 3: La máquina de escucha

Colocó el engranaje en el reloj. Clic. Clac. La máquina abrió un panel oculto y reveló siete letras de cristal: A, B, C, D, E, F, G.

Cada letra dijo una palabra distinta: "empezar", "recordar", "volver", "escuchar", "elegir", "esperar", "despertar". Mira las anotó con cuidado; la puntuación importaba.

Exactamente a las 12:12:12, el reloj sonó una vez. La puerta desapareció. En su lugar apareció una escalera que descendía hacia una luz dorada y cálida...

Mira respiró una vez y luego otra. "De acuerdo", dijo. "Averigüemos qué recuerda el reloj." Y bajó.`,
  de: `# Das letzte Licht des Uhrmachers

## Kapitel 1: Eine Tür um Mitternacht

Um 23:59 Uhr hörte Mira drei Schläge: "Klopf, klopf, klopf!" Sie erstarrte; die alte Uhr war stehen geblieben.

Hinter der Werkstatttür jagten Regen, Wind und silberne Blätter die Straße entlang. Eine Stimme flüsterte: "Mira ... bist du da?"

Sie hob den Messingschlüssel (den mit der Aufschrift "VII"), drehte ihn zweimal und trat hinaus. Niemand war da, nur ein blauer Umschlag, ein zerbrochener Kompass und eine Notiz: "Folge nicht den Sternen."

## Kapitel 2: Die unmögliche Karte

Im Umschlag fand sie eine Karte voller Pfeile, Kreise und seltsamer Zeichen: @, #, %, &, +, =. Unten stand: "Norden ist nicht Norden; Mitternacht ist nicht das Ende."

Mira sah auf die Uhr: 12:07. Dann 12:08. Dann wieder 12:08! Die Kompassnadel drehte sich; die Werkstattlichter blinkten.

"Das ergibt keinen Sinn", sagte sie. "Außer ..." Ein kleines Zahnrad fiel von der Decke neben ihren Stiefel. Es war warm, fast lebendig.

## Kapitel 3: Die Hörmaschine

Sie setzte das Zahnrad in die Uhr. Klick. Klack. Die Maschine öffnete eine verborgene Klappe und enthüllte sieben gläserne Buchstaben: A, B, C, D, E, F, G.

Jeder Buchstabe sprach ein anderes Wort: "beginnen", "erinnern", "zurückkehren", "zuhören", "wählen", "warten", "aufwachen". Mira schrieb sie sorgfältig auf; die Zeichensetzung war wichtig.

Genau um 12:12:12 Uhr schlug die Uhr einmal. Die Tür verschwand. An ihrer Stelle erschien eine Treppe, die in warmes goldenes Licht hinabführte ...

Mira holte einmal tief Luft, dann noch einmal. "Also gut", sagte sie. "Finden wir heraus, woran sich die Uhr erinnert." Und sie stieg hinab.`,
  it: `# L'ultima luce dell'orologiaio

## Capitolo 1: Una porta a mezzanotte

Alle 23:59 Mira sentì tre colpi: "toc, toc, toc!" Rimase immobile; il vecchio orologio si era fermato.

Oltre la porta della bottega, pioggia, vento e foglie d'argento correvano lungo la strada. Una voce sussurrò: "Mira... ci sei?"

Sollevò la chiave d'ottone (quella con scritto "VII"), la girò due volte e uscì. Non c'era nessuno, solo una busta blu, una bussola rotta e un biglietto: "Non seguire le stelle."

## Capitolo 2: La mappa impossibile

Nella busta trovò una mappa coperta di frecce, cerchi e simboli strani: @, #, %, &, +, =. In fondo qualcuno aveva scritto: "Il nord non è il nord; la mezzanotte non è la fine."

Mira controllò l'ora: 12:07. Poi 12:08. Poi ancora 12:08! L'ago della bussola girava; le luci della bottega lampeggiavano.

"Non ha senso", disse. "A meno che..." Un piccolo ingranaggio cadde dal soffitto accanto al suo stivale. Era caldo, quasi vivo.

## Capitolo 3: La macchina d'ascolto

Mise l'ingranaggio nell'orologio. Clic. Clac. La macchina aprì un pannello nascosto e rivelò sette lettere di vetro: A, B, C, D, E, F, G.

Ogni lettera pronunciò una parola diversa: "iniziare", "ricordare", "tornare", "ascoltare", "scegliere", "aspettare", "svegliarsi". Mira le annotò con cura; la punteggiatura contava.

Esattamente alle 12:12:12 l'orologio suonò una volta. La porta scomparve. Al suo posto apparve una scala che scendeva verso una luce dorata e calda...

Mira fece un respiro, poi un altro. "Va bene", disse. "Scopriamo cosa ricorda l'orologio." E scese.`,
  ru: `# Последний свет часовщика

## Глава 1: Дверь в полночь

В 23:59 Мира услышала три стука: «тук, тук, тук!» Она замерла: старые часы остановились.

За дверью мастерской дождь, ветер и серебряные листья мчались по улице. Голос прошептал: «Мира... ты здесь?»

Она подняла латунный ключ с отметкой «VII», дважды повернула его и вышла. Никого не было, только синий конверт, сломанный компас и записка: «Не следуй за звёздами».

## Глава 2: Невозможная карта

В конверте лежала карта со стрелками, кругами и странными символами: @, #, %, &, +, =. Внизу было написано: «Север — не север; полночь — не конец».

Мира посмотрела на часы: 12:07. Потом 12:08. Потом снова 12:08! Стрелка компаса закрутилась, а огни мастерской замигали.

«В этом нет смысла», сказала она. «Если только...» Маленькая шестерёнка упала с потолка к её сапогу. Она была тёплой, почти живой.

## Глава 3: Машина для слушания

Она вставила шестерёнку в часы. Клик. Клак. Машина открыла скрытую панель и показала семь стеклянных букв: A, B, C, D, E, F, G.

Каждая буква произнесла своё слово: «начать», «помнить», «вернуться», «слушать», «выбрать», «ждать», «проснуться». Мира тщательно записала их: знаки препинания имели значение.

Ровно в 12:12:12 часы пробили один раз. Дверь исчезла. На её месте появилась лестница, ведущая вниз, к тёплому золотому свету...

Мира вдохнула один раз, потом ещё. «Хорошо», сказала она. «Давайте узнаем, что помнят часы». И спустилась.`
    };
    const language = getUiLanguage();
    const rawText = demoText[language] || demoText.en;
    const title = { en:"Demo: The Clockmaker's Last Light", pt:'Demo: A Última Luz do Relojoeiro', fr:"Démo : La dernière lumière de l'horloger", es:'Demo: La última luz del relojero', de:'Demo: Das letzte Licht des Uhrmachers', it:"Demo: L'ultima luce dell'orologiaio", ru:'Демо: Последний свет часовщика' }[language] || demoText.en;
    const sourceName = { en:'Built-in punctuation stress test', pt:'Teste integrado de pontuação', fr:'Test intégré de ponctuation', es:'Prueba integrada de puntuación', de:'Integrierter Zeichensetzungstest', it:'Test integrato di punteggiatura', ru:'Встроенный тест пунктуации' }[language] || 'Built-in punctuation stress test';
    const tokens = tokenize(rawText);
    const structure = detectStructure(rawText.split(/\r?\n/));
    return { id:'demo-stress-project', name:title, nameLower:title.toLowerCase(), rawText, wordCount:tokens.length, structure, tokens, groups:createGroups(tokens, 6, structure), sourceType:'demo', sourceName, progress:{ currentGroupIndex:0, currentRepeat:1, isPlaying:false, lastWordSpoken:'' }, config:{ wordsPerGroup:6, repetitions:2, speed:.9, language:language === 'auto' ? 'en' : language, theme:document.documentElement.dataset.theme }, isDemo:true, createdAt:0, updatedAt:0 };
  }
  function toast(message, type = 'info', action = null) { const node = document.createElement('div'); node.className = `toast ${type}`; const text = document.createElement('span'); text.textContent = message; node.append(text); if (action) { const button = document.createElement('button'); button.className = 'toast-action'; button.type = 'button'; button.textContent = action.label; button.onclick = () => { action.run(); node.remove(); }; node.append(button); } document.querySelector('#toast-region').append(node); const timeout = action?.duration || 3500; setTimeout(() => node.remove(), timeout); return node; }
  function textWordCount(value) { const text = String(value || '').trim(); return text ? text.split(/\s+/).length : 0; }
  function textLimitMessage() { return TEXT_LIMIT_MESSAGES[getUiLanguage()] || TEXT_LIMIT_MESSAGES.en; }
  function countText(input, counter, start) { const count = textWordCount(input.value); const overLimit = count > MAX_WORDS; counter.textContent = `${count.toLocaleString()} / ${MAX_WORDS.toLocaleString()} ${t('home.counter','words')}`; counter.className = `counter${overLimit ? ' danger' : count >= MAX_WORDS * .9 ? ' warning' : ''}`; counter.title = overLimit ? textLimitMessage() : ''; start.disabled = !count || overLimit; return count; }
  const BLOG_ARTICLE_COPY = {
    en: {
      'browser-text-to-speech-reader': {
        title: 'Browser Text to Speech Reader',
        intro: 'Read notes, articles, and study material aloud in your browser with a private, distraction-free voice reader built for learning, revision, and focus.',
        bullets: ['Paste copied notes or upload a file in seconds', 'Adjust speed, language, and grouping for your learning flow', 'Keep everything local in the browser with no upload requirement'],
        faqs: [
          ['What is a browser text to speech reader?', 'A browser text to speech reader converts written text into spoken audio inside your web browser. It is useful for studying, proofreading, learning vocabulary, and listening to long notes without reading them line by line.'],
          ['Does DICTATE work without uploading my files?', 'Yes. DICTATE can read pasted text and browser-local document files without requiring a server upload for the normal workflow.'],
          ['Can I use it for study notes?', 'Yes. Many students use it to listen to notes, summaries, essays, and revision material while they walk, rest, or review difficult topics.'],
          ['Can I change voice speed and language?', 'Yes. The reader supports adjustable speed, language selection, and repeated playback to make content easier to absorb.']
        ],
        start: 'Use DICTATE to turn notes, PDFs, and study material into spoken audio in your browser. It is built for students, professionals, and anyone who wants a quieter, more focused way to review text.',
        readArticle: 'Read article',
        tryTool: 'Try the tool',
        backBlogs: 'Back to BLOGS',
        why: 'Why people use it',
        how: 'How it works',
        faqTitle: 'Frequently asked questions',
        startTitle: 'Start reading today',
        blogIntro: 'Browse practical guides and product pages for reading text aloud in the browser, reviewing PDFs, and using DICTATE for study and revision.',
        blogTitle: 'BLOGS'
      },
      'read-pdf-aloud-online': {
        title: 'Read PDF Aloud Online',
        intro: 'Turn PDF content into spoken audio in the browser so you can review articles, notes, and research without staring at a screen for long periods.',
        bullets: ['Upload a PDF or DOCX file from your device', 'Listen to the text in grouped reading blocks', 'Keep reading sessions focused and private on your own browser'],
        faqs: [
          ['Can I read a PDF aloud online without installing software?', 'Yes. DICTATE lets you upload a PDF and convert the visible text into spoken audio in a browser-based workflow.'],
          ['Does it work for study documents?', 'Yes. It is useful for academic material, reading notes, research summaries, and revision documents.'],
          ['Is this private?', 'The reading flow is browser-first and local-first. Your content stays in your own browser environment unless you explicitly use external browser features.']
        ],
        start: 'Use DICTATE to turn notes, PDFs, and study material into spoken audio. It is built for students, professionals, and anyone who wants a quieter, more focused way to review text.',
        readArticle: 'Read article',
        tryTool: 'Try the tool',
        backBlogs: 'Back to BLOGS',
        why: 'Why people use it',
        how: 'How it works',
        faqTitle: 'Frequently asked questions',
        startTitle: 'Start reading today',
        blogIntro: 'Browse practical guides and product pages for reading text aloud in the browser, reviewing PDFs, and using DICTATE for study and revision.',
        blogTitle: 'BLOGS'
      },
      'read-notes-aloud': {
        title: 'Read Notes Aloud in Browser',
        intro: 'Improve memory and retention by listening to your notes instead of only reading them. DICTATE helps you turn key ideas into a spoken review session.',
        bullets: ['Paste your class notes or writing drafts into the tool', 'Listen in short, focused groups to improve comprehension', 'Repeat difficult sections without re-reading everything manually'],
        faqs: [
          ['Why would I read notes aloud?', 'Reading aloud can reduce visual fatigue, improve focus, and help you retain information by combining listening and repetition.'],
          ['Can I use it while commuting or walking?', 'Yes. It is designed for quick revision sessions in a browser and can be especially useful on phones and tablets.'],
          ['What types of notes work well?', 'Class notes, summaries, revision scripts, personal reminders, and reading passages all work well.']
        ],
        start: 'Use DICTATE to turn notes and study material into a more focused listening workflow.',
        readArticle: 'Read article',
        tryTool: 'Try the tool',
        backBlogs: 'Back to BLOGS',
        why: 'Why people use it',
        how: 'How it works',
        faqTitle: 'Frequently asked questions',
        startTitle: 'Start reading today',
        blogIntro: 'Browse practical guides and product pages for reading text aloud in the browser, reviewing PDFs, and using DICTATE for study and revision.',
        blogTitle: 'BLOGS'
      },
      'student-dictation-tool': {
        title: 'Student Dictation Tool',
        intro: 'A student-friendly dictation and listening workflow for essays, revision notes, and study material that helps you absorb information more effectively.',
        bullets: ['Create a listening session from course notes or article summaries', 'Use smaller reading groups for calmer revision', 'Switch languages and pace to match your study routine'],
        faqs: [
          ['What makes it useful for students?', 'It turns writing into spoken audio so students can revise by ear, reinforce learning, and reduce screen fatigue.'],
          ['Can it help with language learning?', 'Yes. Listening to repeated phrases, vocabulary, and short reading groups helps learners build comprehension and pronunciation awareness.'],
          ['Can I reuse notes later?', 'Yes. Projects are saved in the browser so students can return to the same session and continue revision.']
        ],
        start: 'Use DICTATE to turn notes and study material into a calmer revision workflow.',
        readArticle: 'Read article',
        tryTool: 'Try the tool',
        backBlogs: 'Back to BLOGS',
        why: 'Why people use it',
        how: 'How it works',
        faqTitle: 'Frequently asked questions',
        startTitle: 'Start reading today',
        blogIntro: 'Browse practical guides and product pages for reading text aloud in the browser, reviewing PDFs, and using DICTATE for study and revision.',
        blogTitle: 'BLOGS'
      }
    },
    pt: {
      'browser-text-to-speech-reader': { title: 'Leitor de texto para voz no navegador', intro: 'Leia notas, artigos e material de estudo em voz alta no navegador com um leitor de voz privado e sem distrações, pensado para aprender, revisar e manter o foco.', bullets: ['Cole anotações ou carregue um arquivo em segundos', 'Ajuste velocidade, idioma e agrupamento para o seu fluxo de estudo', 'Mantenha tudo local no navegador sem necessidade de upload'], faqs: [['O que é um leitor de texto para voz no navegador?', 'É uma ferramenta que converte texto em áudio falado dentro do navegador. É útil para estudar, revisar, aprender vocabulário e ouvir notas longas sem lê-las linha por linha.'], ['O DICTATE funciona sem enviar meus arquivos?', 'Sim. O DICTATE pode ler texto colado e arquivos locais do navegador sem exigir upload para o servidor no fluxo normal.'], ['Posso usar com anotações de estudo?', 'Sim. Muitos estudantes o usam para ouvir notas, resumos, ensaios e materiais de revisão enquanto caminham, descansam ou revisam tópicos difíceis.'], ['Posso alterar a velocidade e o idioma da voz?', 'Sim. O leitor permite ajustar velocidade, idioma e reprodução repetida para facilitar a assimilação do conteúdo.']], start: 'Use o DICTATE para transformar notas, PDFs e material de estudo em áudio falado no navegador. Ele foi criado para estudantes, profissionais e qualquer pessoa que queira revisar texto de forma mais calma e focada.', readArticle: 'Ler artigo', tryTool: 'Testar a ferramenta', backBlogs: 'Voltar para BLOGS', why: 'Por que as pessoas usam', how: 'Como funciona', faqTitle: 'Perguntas frequentes', startTitle: 'Comece a ler hoje', blogIntro: 'Explore guias práticos e páginas de produto para leitura em voz alta no navegador, revisão de PDFs e uso do DICTATE para estudo e revisão.', blogTitle: 'BLOGS' },
      'read-pdf-aloud-online': { title: 'Ler PDF em Voz Alta Online', intro: 'Transforme o conteúdo de PDFs em áudio falado no navegador para revisar artigos, notas e pesquisas sem ficar olhando para a tela por muito tempo.', bullets: ['Carregue um PDF ou DOCX do seu dispositivo', 'Ouça o texto em blocos de leitura agrupados', 'Mantenha sessões de leitura focadas e privadas no seu navegador'], faqs: [['Posso ler um PDF em voz alta online sem instalar software?', 'Sim. O DICTATE permite enviar um PDF e convertê-lo em áudio falado em um fluxo baseado no navegador.'], ['Funciona para documentos de estudo?', 'Sim. É útil para material acadêmico, notas de leitura, resumos de pesquisa e documentos de revisão.'], ['Isso é privado?', 'O fluxo de leitura é baseado no navegador e no dispositivo. Seu conteúdo permanece no ambiente do seu navegador, a menos que você use recursos externos explicitamente.']], start: 'Use o DICTATE para transformar notas, PDFs e material de estudo em áudio falado. Ele foi criado para estudantes, profissionais e qualquer pessoa que queira revisar texto de forma mais calma e focada.', readArticle: 'Ler artigo', tryTool: 'Testar a ferramenta', backBlogs: 'Voltar para BLOGS', why: 'Por que as pessoas usam', how: 'Como funciona', faqTitle: 'Perguntas frequentes', startTitle: 'Comece a ler hoje', blogIntro: 'Explore guias práticos e páginas de produto para leitura em voz alta no navegador, revisão de PDFs e uso do DICTATE para estudo e revisão.', blogTitle: 'BLOGS' },
      'read-notes-aloud': { title: 'Ler Notas em Voz Alta no Navegador', intro: 'Melhore a memória e a retenção ouvindo suas notas em vez de apenas lendo. O DICTATE ajuda a transformar ideias-chave em uma sessão de revisão falada.', bullets: ['Cole suas anotações de aula ou rascunhos em uma ferramenta', 'Ouça em grupos curtos e focados para melhorar a compreensão', 'Repita trechos difíceis sem reler tudo manualmente'], faqs: [['Por que ler notas em voz alta?', 'Ouvir em voz alta reduz fadiga visual, melhora o foco e ajuda a reter informações ao combinar audição e repetição.'], ['Posso usar enquanto viajo ou caminho?', 'Sim. Foi pensado para sessões rápidas de revisão no navegador e pode ser útil em telefones e tablets.'], ['Que tipos de notas funcionam bem?', 'Anotações de aula, resumos, roteiros de revisão, lembretes pessoais e textos de leitura funcionam bem.']], start: 'Use o DICTATE para transformar notas e material de estudo em um fluxo de escuta mais focado.', readArticle: 'Ler artigo', tryTool: 'Testar a ferramenta', backBlogs: 'Voltar para BLOGS', why: 'Por que as pessoas usam', how: 'Como funciona', faqTitle: 'Perguntas frequentes', startTitle: 'Comece a ler hoje', blogIntro: 'Explore guias práticos e páginas de produto para leitura em voz alta no navegador, revisão de PDFs e uso do DICTATE para estudo e revisão.', blogTitle: 'BLOGS' },
      'student-dictation-tool': { title: 'Ferramenta de Ditado para Estudantes', intro: 'Um fluxo de ditado e escuta pensado para estudantes, com ensaios, notas de revisão e material de estudo que ajudam a absorver informações mais efetivamente.', bullets: ['Crie uma sessão de escuta a partir de notas do curso ou resumos de artigos', 'Use grupos menores de leitura para uma revisão mais tranquila', 'Mude idioma e ritmo para combinar com sua rotina de estudo'], faqs: [['O que torna útil para estudantes?', 'Transforma escrita em áudio para que os estudantes revisem por ouvido, reforcem o aprendizado e reduzam a fadiga visual.'], ['Pode ajudar no aprendizado de idiomas?', 'Sim. A repetição e os grupos curtos de áudio ajudam a desenvolver compreensão e consciência de pronúncia.'], ['Posso reutilizar notas depois?', 'Sim. Os projetos são salvos no navegador para que os estudantes retornem à mesma sessão mais tarde.']], start: 'Use o DICTATE para transformar notas e material de estudo em um fluxo de revisão mais tranquilo.', readArticle: 'Ler artigo', tryTool: 'Testar a ferramenta', backBlogs: 'Voltar para BLOGS', why: 'Por que as pessoas usam', how: 'Como funciona', faqTitle: 'Perguntas frequentes', startTitle: 'Comece a ler hoje', blogIntro: 'Explore guias práticos e páginas de produto para leitura em voz alta no navegador, revisão de PDFs e uso do DICTATE para estudo e revisão.', blogTitle: 'BLOGS' }
    },
    fr: {
      'browser-text-to-speech-reader': { title: 'Lecteur de texte en parole du navigateur', intro: 'Lisez vos notes, articles et supports d’étude à voix haute dans le navigateur avec un lecteur vocal privé et sans distraction, conçu pour apprendre, réviser et rester concentré.', bullets: ['Collez des notes ou téléchargez un fichier en quelques secondes', 'Réglez la vitesse, la langue et le regroupement selon votre méthode d’étude', 'Gardez tout en local sur le navigateur sans besoin de téléversement'], faqs: [['Qu’est-ce qu’un lecteur de texte en parole dans le navigateur ?', 'C’est un outil qui convertit le texte en audio parlé dans votre navigateur. Il est utile pour étudier, relire, apprendre du vocabulaire et écouter de longues notes sans les lire ligne par ligne.'], ['DICTATE fonctionne-t-il sans téléverser mes fichiers ?', 'Oui. DICTATE peut lire du texte copié et des fichiers locaux du navigateur sans exiger de téléversement vers un serveur dans le flux habituel.'], ['Peut-il servir aux notes d’étude ?', 'Oui. Beaucoup d’étudiants l’utilisent pour écouter notes, résumés, essais et contenus de révision pendant leurs déplacements ou leurs pauses.'], ['Puis-je modifier la vitesse et la langue de la voix ?', 'Oui. Le lecteur prend en charge la vitesse, la langue et la lecture répétée pour faciliter l’assimilation.']], start: 'Utilisez DICTATE pour transformer notes, PDF et matériel d’étude en audio parlé dans le navigateur. Il est pensé pour les étudiants, les professionnels et tous ceux qui veulent relire plus calmement et avec plus de concentration.', readArticle: 'Lire l’article', tryTool: 'Essayer l’outil', backBlogs: 'Retour aux BLOGS', why: 'Pourquoi les gens l’utilisent', how: 'Comment ça marche', faqTitle: 'Questions fréquentes', startTitle: 'Commencez à lire aujourd’hui', blogIntro: 'Consultez des guides pratiques et des pages produits sur la lecture vocale dans le navigateur, la révision PDF et l’utilisation de DICTATE pour l’étude et la révision.', blogTitle: 'BLOGS' },
      'read-pdf-aloud-online': { title: 'Lire un PDF à voix haute en ligne', intro: 'Transformez le contenu des PDF en audio parlé dans le navigateur pour relire articles, notes et recherches sans rester trop longtemps devant un écran.', bullets: ['Téléchargez un PDF ou DOCX depuis votre appareil', 'Écoutez le texte en blocs de lecture groupés', 'Gardez les sessions de lecture concentrées et privées dans votre navigateur'], faqs: [['Puis-je lire un PDF à voix haute en ligne sans installer de logiciel ?', 'Oui. DICTATE permet de télécharger un PDF et de le convertir en audio parlé dans un flux navigateur.'], ['Cela fonctionne-t-il pour les documents d’étude ?', 'Oui. C’est très utile pour le matériel académique, les notes de lecture, les résumés de recherche et les documents de révision.'], ['Est-ce privé ?', 'Le flux de lecture est basé sur le navigateur et l’appareil. Votre contenu reste dans votre environnement navigateur, sauf si vous utilisez explicitement des fonctions externes.']], start: 'Utilisez DICTATE pour transformer notes, PDF et matériel d’étude en audio parlé. Il est pensé pour les étudiants, les professionnels et tous ceux qui veulent relire plus calmement et avec plus de concentration.', readArticle: 'Lire l’article', tryTool: 'Essayer l’outil', backBlogs: 'Retour aux BLOGS', why: 'Pourquoi les gens l’utilisent', how: 'Comment ça marche', faqTitle: 'Questions fréquentes', startTitle: 'Commencez à lire aujourd’hui', blogIntro: 'Consultez des guides pratiques et des pages produits sur la lecture vocale dans le navigateur, la révision PDF et l’utilisation de DICTATE pour l’étude et la révision.', blogTitle: 'BLOGS' },
      'read-notes-aloud': { title: 'Lire les notes à voix haute dans le navigateur', intro: 'Améliorez la mémoire et la rétention en écoutant vos notes au lieu de les lire seulement. DICTATE aide à transformer les idées clés en session de révision parlée.', bullets: ['Collez vos notes de cours ou brouillons dans l’outil', 'Écoutez en petits groupes ciblés pour améliorer la compréhension', 'Répétez les passages difficiles sans tout relire manuellement'], faqs: [['Pourquoi lire les notes à voix haute ?', 'La lecture à voix haute réduit la fatigue visuelle, améliore la concentration et aide à mémoriser en combinant écoute et répétition.'], ['Puis-je l’utiliser en déplacement ?', 'Oui. Il est conçu pour de courtes sessions de révision dans le navigateur et peut être utile sur téléphone ou tablette.'], ['Quels types de notes fonctionnent bien ?', 'Les notes de cours, résumés, scripts de révision, rappels personnels et passages de lecture fonctionnent très bien.']], start: 'Utilisez DICTATE pour transformer notes et matériel d’étude en un flux d’écoute plus concentré.', readArticle: 'Lire l’article', tryTool: 'Essayer l’outil', backBlogs: 'Retour aux BLOGS', why: 'Pourquoi les gens l’utilisent', how: 'Comment ça marche', faqTitle: 'Questions fréquentes', startTitle: 'Commencez à lire aujourd’hui', blogIntro: 'Consultez des guides pratiques et des pages produits sur la lecture vocale dans le navigateur, la révision PDF et l’utilisation de DICTATE pour l’étude et la révision.', blogTitle: 'BLOGS' },
      'student-dictation-tool': { title: 'Outil de dictée pour étudiants', intro: 'Un flux de dictée et d’écoute pensé pour les étudiants, avec essais, notes de révision et matériel de cours qui facilitent l’assimilation des informations.', bullets: ['Créez une session d’écoute à partir de notes de cours ou de résumés d’articles', 'Utilisez des groupes de lecture plus petits pour une révision plus calme', 'Changez la langue et le rythme selon votre routine d’étude'], faqs: [['Qu’est-ce qui le rend utile pour les étudiants ?', 'Il transforme l’écriture en audio pour que les étudiants révisent à l’oreille, renforcent leur apprentissage et réduisent la fatigue visuelle.'], ['Peut-il aider à l’apprentissage des langues ?', 'Oui. La répétition et les courts blocs audio aident à développer la compréhension et la conscience de la prononciation.'], ['Puis-je réutiliser mes notes plus tard ?', 'Oui. Les projets sont enregistrés dans le navigateur pour que les étudiants puissent revenir à une session de révision plus tard.']], start: 'Utilisez DICTATE pour transformer notes et matériel d’étude en un flux de révision plus serein.', readArticle: 'Lire l’article', tryTool: 'Essayer l’outil', backBlogs: 'Retour aux BLOGS', why: 'Pourquoi les gens l’utilisent', how: 'Comment ça marche', faqTitle: 'Questions fréquentes', startTitle: 'Commencez à lire aujourd’hui', blogIntro: 'Consultez des guides pratiques et des pages produits sur la lecture vocale dans le navigateur, la révision PDF et l’utilisation de DICTATE pour l’étude et la révision.', blogTitle: 'BLOGS' }
    },
    es: {
      'browser-text-to-speech-reader': { title: 'Lector de texto a voz del navegador', intro: 'Lee tus notas, artículos y material de estudio en voz alta en el navegador con un lector de voz privado y sin distracciones, pensado para aprender, repasar y mantener el enfoque.', bullets: ['Pega notas o carga un archivo en segundos', 'Ajusta velocidad, idioma y agrupación según tu flujo de estudio', 'Mantén todo local en el navegador sin necesidad de subir archivos'], faqs: [['¿Qué es un lector de texto a voz del navegador?', 'Es una herramienta que convierte texto en audio hablado dentro del navegador. Sirve para estudiar, corregir, aprender vocabulario y escuchar notas largas sin leerlas línea por línea.'], ['¿DICTATE funciona sin subir mis archivos?', 'Sí. DICTATE puede leer texto pegado y archivos locales del navegador sin exigir una subida al servidor en el flujo normal.'], ['¿Se puede usar con apuntes de estudio?', 'Sí. Muchos estudiantes lo usan para escuchar apuntes, resúmenes, ensayos y material de repaso mientras caminan, descansan o revisan temas difíciles.'], ['¿Puedo cambiar la velocidad e idioma de la voz?', 'Sí. El lector admite velocidad, idioma y reproducción repetida para facilitar la asimilación del contenido.']], start: 'Usa DICTATE para convertir notas, PDFs y material de estudio en audio hablado en el navegador. Está pensado para estudiantes, profesionales y cualquier persona que quiera repasar con más calma y enfoque.', readArticle: 'Leer artículo', tryTool: 'Probar la herramienta', backBlogs: 'Volver a BLOGS', why: 'Por qué la gente lo usa', how: 'Cómo funciona', faqTitle: 'Preguntas frecuentes', startTitle: 'Empieza a leer hoy', blogIntro: 'Explora guías prácticas y páginas de producto para lectura en voz alta en el navegador, revisión de PDFs y uso de DICTATE para estudiar y repasar.', blogTitle: 'BLOGS' },
      'read-pdf-aloud-online': { title: 'Leer PDF en voz alta en línea', intro: 'Convierte el contenido de PDFs en audio hablado en el navegador para revisar artículos, notas e investigaciones sin mirar la pantalla durante mucho tiempo.', bullets: ['Sube un PDF o DOCX desde tu dispositivo', 'Escucha el texto en bloques de lectura agrupados', 'Mantén sesiones de lectura enfocadas y privadas en tu navegador'], faqs: [['¿Puedo leer un PDF en voz alta en línea sin instalar software?', 'Sí. DICTATE permite subir un PDF y convertir el texto visible en audio hablado dentro de un flujo basado en el navegador.'], ['¿Funciona para documentos de estudio?', 'Sí. Es muy útil para material académico, notas de lectura, resúmenes de investigación y documentos de repaso.'], ['¿Es privado?', 'El flujo de lectura es primero del navegador y del dispositivo. Tu contenido permanece en tu entorno del navegador, salvo que uses funciones externas explícitamente.']], start: 'Usa DICTATE para convertir notas, PDFs y material de estudio en audio hablado. Está pensado para estudiantes, profesionales y cualquier persona que quiera repasar con más calma y enfoque.', readArticle: 'Leer artículo', tryTool: 'Probar la herramienta', backBlogs: 'Volver a BLOGS', why: 'Por qué la gente lo usa', how: 'Cómo funciona', faqTitle: 'Preguntas frecuentes', startTitle: 'Empieza a leer hoy', blogIntro: 'Explora guías prácticas y páginas de producto para lectura en voz alta en el navegador, revisión de PDFs y uso de DICTATE para estudiar y repasar.', blogTitle: 'BLOGS' },
      'read-notes-aloud': { title: 'Leer apuntes en voz alta en el navegador', intro: 'Mejora la memoria y la retención escuchando tus apuntes en lugar de leerlos solo. DICTATE ayuda a convertir ideas clave en una sesión de repaso hablada.', bullets: ['Pega tus apuntes de clase o borradores en la herramienta', 'Escucha en grupos cortos y enfocados para mejorar la comprensión', 'Repite secciones difíciles sin volver a leerlo todo manualmente'], faqs: [['¿Por qué leer apuntes en voz alta?', 'La lectura en voz alta reduce la fatiga visual, mejora el enfoque y ayuda a retener información combinando escucha y repetición.'], ['¿Puedo usarlo mientras viajo o camino?', 'Sí. Está pensado para sesiones rápidas de repaso en el navegador y puede ser muy útil en teléfonos y tabletas.'], ['¿Qué tipos de apuntes funcionan bien?', 'Apuntes de clase, resúmenes, guiones de repaso, recordatorios personales y pasajes de lectura funcionan muy bien.']], start: 'Usa DICTATE para convertir notas y material de estudio en un flujo de escucha más enfocado.', readArticle: 'Leer artículo', tryTool: 'Probar la herramienta', backBlogs: 'Volver a BLOGS', why: 'Por qué la gente lo usa', how: 'Cómo funciona', faqTitle: 'Preguntas frecuentes', startTitle: 'Empieza a leer hoy', blogIntro: 'Explora guías prácticas y páginas de producto para lectura en voz alta en el navegador, revisión de PDFs y uso de DICTATE para estudiar y repasar.', blogTitle: 'BLOGS' },
      'student-dictation-tool': { title: 'Herramienta de dictado para estudiantes', intro: 'Un flujo de dictado y escucha pensado para estudiantes, con ensayos, apuntes de repaso y material de estudio que ayudan a asimilar mejor la información.', bullets: ['Crea una sesión de escucha a partir de apuntes del curso o resúmenes de artículos', 'Usa grupos de lectura más pequeños para un repaso más tranquilo', 'Cambia el idioma y el ritmo según tu rutina de estudio'], faqs: [['¿Qué lo hace útil para estudiantes?', 'Convierte la escritura en audio para que revisen por oído, refuercen el aprendizaje y reduzcan la fatiga visual.'], ['¿Puede ayudar con el aprendizaje de idiomas?', 'Sí. La repetición y los grupos cortos de audio ayudan a desarrollar comprensión y conciencia de pronunciación.'], ['¿Puedo reutilizar apuntes más tarde?', 'Sí. Los proyectos se guardan en el navegador para que los estudiantes vuelvan a la misma sesión más tarde.']], start: 'Usa DICTATE para convertir notas y material de estudio en un flujo de repaso más tranquilo.', readArticle: 'Leer artículo', tryTool: 'Probar la herramienta', backBlogs: 'Volver a BLOGS', why: 'Por qué la gente lo usa', how: 'Cómo funciona', faqTitle: 'Preguntas frecuentes', startTitle: 'Empieza a leer hoy', blogIntro: 'Explora guías prácticas y páginas de producto para lectura en voz alta en el navegador, revisión de PDFs y uso de DICTATE para estudiar y repasar.', blogTitle: 'BLOGS' }
    },
    de: {
      'browser-text-to-speech-reader': { title: 'Browser-Sprachausgabe-Leser', intro: 'Lies Notizen, Artikel und Lernmaterial im Browser laut vor – mit einem privaten, unaufdringlichen Sprachleser für Lernen, Wiederholung und Konzentration.', bullets: ['Füge Notizen ein oder lade in Sekunden eine Datei hoch', 'Passe Geschwindigkeit, Sprache und Gruppierung deinem Lernfluss an', 'Halte alles lokal im Browser und ohne Upload'], faqs: [['Was ist ein Browser-Sprachausgabe-Leser?', 'Ein Browser-Sprachausgabe-Leser wandelt geschriebenen Text in gesprochene Sprache innerhalb des Browsers um. Das ist nützlich zum Lernen, Korrigieren, Vokabeln üben und lange Notizen zu hören, ohne sie Zeile für Zeile zu lesen.'], ['Funktioniert DICTATE ohne Upload meiner Dateien?', 'Ja. DICTATE kann eingefügten Text und browserlokale Dokumente lesen, ohne im normalen Ablauf einen Server-Upload zu verlangen.'], ['Kann ich damit Lernnotizen verwenden?', 'Ja. Viele Studierende nutzen es, um Notizen, Zusammenfassungen, Essays und Wiederholungsmaterial beim Gehen, Pausieren oder beim Üben schwieriger Themen zu hören.'], ['Kann ich Geschwindigkeit und Sprache der Stimme ändern?', 'Ja. Der Leser unterstützt einstellbare Geschwindigkeit, Sprachwahl und wiederholte Wiedergabe, damit Inhalte leichter verständlich werden.']], start: 'Nutze DICTATE, um Notizen, PDFs und Lernmaterial im Browser in gesprochene Sprache umzuwandeln. Es ist ideal für Studierende, Berufstätige und alle, die ruhiger und fokussierter über Text lernen möchten.', readArticle: 'Artikel lesen', tryTool: 'Tool testen', backBlogs: 'Zurück zu BLOGS', why: 'Warum Menschen es nutzen', how: 'So funktioniert es', faqTitle: 'Häufig gestellte Fragen', startTitle: 'Heute anfangen zu lesen', blogIntro: 'Entdecke praktische Guides und Produktseiten zum Lautlesen im Browser, zum Anhören von PDFs und zur Nutzung von DICTATE für Lernen und Wiederholung.', blogTitle: 'BLOGS' },
      'read-pdf-aloud-online': { title: 'PDF online laut vorlesen', intro: 'Wandle PDF-Inhalte im Browser in gesprochene Sprache um, damit du Artikel, Notizen und Forschungsergebnisse durchhören kannst, ohne lange auf einen Bildschirm zu schauen.', bullets: ['Lade ein PDF oder DOCX von deinem Gerät hoch', 'Höre den Text in gruppierten Leseabschnitten', 'Halte Lernsitzungen fokussiert und privat im eigenen Browser'], faqs: [['Kann ich ein PDF online ohne Softwareinstallation laut vorlesen lassen?', 'Ja. DICTATE lässt dich ein PDF hochladen und den sichtbaren Text im Browser in gesprochene Sprache umwandeln.'], ['Funktioniert es für Studienmaterial?', 'Ja. Es ist nützlich für akademisches Material, Lesebemerkungen, Forschungskurzfassungen und Wiederholungsdokumente.'], ['Ist das privat?', 'Der Lesefluss ist browser- und geräteorientiert. Deine Inhalte bleiben in deiner Browserumgebung, sofern du keine externen Funktionen nutzt.']], start: 'Nutze DICTATE, um Notizen, PDFs und Lernmaterial in gesprochene Sprache umzuwandeln. Es ist ideal für Studierende, Berufstätige und alle, die ruhiger und fokussierter über Text lernen möchten.', readArticle: 'Artikel lesen', tryTool: 'Tool testen', backBlogs: 'Zurück zu BLOGS', why: 'Warum Menschen es nutzen', how: 'So funktioniert es', faqTitle: 'Häufig gestellte Fragen', startTitle: 'Heute anfangen zu lesen', blogIntro: 'Entdecke praktische Guides und Produktseiten zum Lautlesen im Browser, zum Anhören von PDFs und zur Nutzung von DICTATE für Lernen und Wiederholung.', blogTitle: 'BLOGS' },
      'read-notes-aloud': { title: 'Notizen im Browser laut vorlesen', intro: 'Verbessere Gedächtnis und Erinnerung, indem du deine Notizen hörst statt nur liest. DICTATE hilft dir, wichtige Ideen in eine gesprochene Wiederholungssitzung zu verwandeln.', bullets: ['Kopiere deine Kursnotizen oder Entwürfe in das Tool', 'Höre in kurzen, fokussierten Gruppen, um das Verständnis zu verbessern', 'Wiederhole schwierige Abschnitte, ohne alles manuell neu zu lesen'], faqs: [['Warum Notizen laut vorlesen?', 'Das laute Vorlesen reduziert visuelle Ermüdung, verbessert die Konzentration und hilft beim Behalten durch Kombination von Hören und Wiederholen.'], ['Kann ich es beim Pendeln oder Gehen nutzen?', 'Ja. Es ist für kurze Wiederholungssitzungen im Browser gedacht und kann besonders auf Smartphones und Tablets hilfreich sein.'], ['Welche Arten von Notizen funktionieren gut?', 'Kursnotizen, Zusammenfassungen, Wiederholungsmanuskripte, persönliche Erinnerungen und Lesetexte funktionieren gut.']], start: 'Nutze DICTATE, um Notizen und Lernmaterial in einen fokussierteren Hörfluss zu verwandeln.', readArticle: 'Artikel lesen', tryTool: 'Tool testen', backBlogs: 'Zurück zu BLOGS', why: 'Warum Menschen es nutzen', how: 'So funktioniert es', faqTitle: 'Häufig gestellte Fragen', startTitle: 'Heute anfangen zu lesen', blogIntro: 'Entdecke praktische Guides und Produktseiten zum Lautlesen im Browser, zum Anhören von PDFs und zur Nutzung von DICTATE für Lernen und Wiederholung.', blogTitle: 'BLOGS' },
      'student-dictation-tool': { title: 'Diktat-Tool für Studierende', intro: 'Ein studierendenfreundlicher Diktat- und Hörfluss für Essays, Wiederholungsnotizen und Lernmaterial, der das Aufnehmen von Informationen effektiver macht.', bullets: ['Erstelle eine Hörsitzung aus Kursnotizen oder Artikelzusammenfassungen', 'Nutze kleinere Lesegruppen für eine ruhigere Wiederholung', 'Wechsle Sprache und Tempo entsprechend deiner Lernroutine'], faqs: [['Was macht es für Studierende nützlich?', 'Es verwandelt Schreiben in gesprochene Sprache, damit Studierende per Hören wiederholen, Lernen verstärken und visuelle Ermüdung reduzieren.'], ['Kann es beim Sprachenlernen helfen?', 'Ja. Wiederholung und kurze Audio-Gruppen helfen beim Verstehen und Bewusstwerden der Aussprache.'], ['Kann ich Notizen später erneut nutzen?', 'Ja. Projekte werden im Browser gespeichert, sodass Studierende später zu derselben Session zurückkehren können.']], start: 'Nutze DICTATE, um Notizen und Lernmaterial in einen ruhigeren Wiederholungsfluss zu verwandeln.', readArticle: 'Artikel lesen', tryTool: 'Tool testen', backBlogs: 'Zurück zu BLOGS', why: 'Warum Menschen es nutzen', how: 'So funktioniert es', faqTitle: 'Häufig gestellte Fragen', startTitle: 'Heute anfangen zu lesen', blogIntro: 'Entdecke praktische Guides und Produktseiten zum Lautlesen im Browser, zum Anhören von PDFs und zur Nutzung von DICTATE für Lernen und Wiederholung.', blogTitle: 'BLOGS' }
    },
    it: {
      'browser-text-to-speech-reader': { title: 'Lettore vocale del browser', intro: 'Leggi note, articoli e materiale di studio ad alta voce nel browser con un lettore vocale privato e privo di distrazioni, pensato per apprendere, ripassare e restare concentrato.', bullets: ['Incolla note o carica un file in pochi secondi', 'Regola velocità, lingua e raggruppamento in base al tuo flusso di studio', 'Tieni tutto locale nel browser senza bisogno di upload'], faqs: [['Cos’è un lettore vocale del browser?', 'È uno strumento che trasforma il testo in audio parlato all’interno del browser. È utile per studiare, correggere, imparare vocaboli e ascoltare note lunghe senza leggerle riga per riga.'], ['DICTATE funziona senza caricare i miei file?', 'Sì. DICTATE può leggere testo incollato e file locali del browser senza richiedere un upload al server nel flusso normale.'], ['Posso usarlo per note di studio?', 'Sì. Molti studenti lo usano per ascoltare appunti, riassunti, saggi e materiale di ripasso mentre camminano, riposano o ripassano argomenti difficili.'], ['Posso cambiare velocità e lingua della voce?', 'Sì. Il lettore supporta velocità regolabile, scelta della lingua e riproduzione ripetuta per rendere il contenuto più facile da assimilare.']], start: 'Usa DICTATE per trasformare note, PDF e materiale di studio in audio parlato nel browser. È pensato per studenti, professionisti e chiunque voglia ripassare in modo più tranquillo e concentrato.', readArticle: 'Leggi articolo', tryTool: 'Prova lo strumento', backBlogs: 'Torna a BLOGS', why: 'Perché le persone lo usano', how: 'Come funziona', faqTitle: 'Domande frequenti', startTitle: 'Inizia a leggere oggi', blogIntro: 'Esplora guide pratiche e pagine di prodotto per la lettura vocale nel browser, la revisione di PDF e l’uso di DICTATE per studio e ripasso.', blogTitle: 'BLOGS' },
      'read-pdf-aloud-online': { title: 'Leggi PDF a voce alta online', intro: 'Trasforma il contenuto dei PDF in audio parlato nel browser per rivedere articoli, note e ricerche senza fissare a lungo uno schermo.', bullets: ['Carica un PDF o DOCX dal tuo dispositivo', 'Ascolta il testo in blocchi di lettura raggruppati', 'Mantieni sessioni di lettura concentrate e private nel tuo browser'], faqs: [['Posso leggere un PDF a voce alta online senza installare software?', 'Sì. DICTATE ti permette di caricare un PDF e convertire il testo visibile in audio parlato in un flusso basato sul browser.'], ['Funziona per documenti di studio?', 'Sì. È utile per materiale accademico, note di lettura, riassunti di ricerca e documenti di ripasso.'], ['È privato?', 'Il flusso di lettura è basato sul browser e sul dispositivo. I tuoi contenuti restano nel tuo ambiente browser, a meno che tu non usi esplicitamente funzioni esterne.']], start: 'Usa DICTATE per trasformare note, PDF e materiale di studio in audio parlato. È pensato per studenti, professionisti e chiunque voglia ripassare in modo più tranquillo e concentrato.', readArticle: 'Leggi articolo', tryTool: 'Prova lo strumento', backBlogs: 'Torna a BLOGS', why: 'Perché le persone lo usano', how: 'Come funziona', faqTitle: 'Domande frequenti', startTitle: 'Inizia a leggere oggi', blogIntro: 'Esplora guide pratiche e pagine di prodotto per la lettura vocale nel browser, la revisione di PDF e l’uso di DICTATE per studio e ripasso.', blogTitle: 'BLOGS' },
      'read-notes-aloud': { title: 'Leggi appunti a voce alta nel browser', intro: 'Migliora memoria e ritenzione ascoltando i tuoi appunti invece di leggerli solo. DICTATE aiuta a trasformare le idee chiave in una sessione di ripasso parlata.', bullets: ['Incolla i tuoi appunti di lezione o bozze nello strumento', 'Ascolta in gruppi brevi e mirati per migliorare la comprensione', 'Ripeti le sezioni difficili senza rileggere tutto manualmente'], faqs: [['Perché leggere gli appunti a voce alta?', 'La lettura a voce alta riduce la fatica visiva, migliora la concentrazione e aiuta a trattenere le informazioni combinando ascolto e ripetizione.'], ['Posso usarlo mentre viaggio o cammino?', 'Sì. È stato progettato per sessioni brevi di ripasso nel browser e può essere utile su telefoni e tablet.'], ['Che tipi di appunti funzionano bene?', 'Appunti di lezione, riassunti, script di ripasso, promemoria personali e passaggi di lettura funzionano bene.']], start: 'Usa DICTATE per trasformare note e materiale di studio in un flusso di ascolto più concentrato.', readArticle: 'Leggi articolo', tryTool: 'Prova lo strumento', backBlogs: 'Torna a BLOGS', why: 'Perché le persone lo usano', how: 'Come funziona', faqTitle: 'Domande frequenti', startTitle: 'Inizia a leggere oggi', blogIntro: 'Esplora guide pratiche e pagine di prodotto per la lettura vocale nel browser, la revisione di PDF e l’uso di DICTATE per studio e ripasso.', blogTitle: 'BLOGS' },
      'student-dictation-tool': { title: 'Strumento di dettatura per studenti', intro: 'Un flusso di dettatura e ascolto pensato per studenti, con saggi, appunti di ripasso e materiale di studio che aiutano a assimilare le informazioni in modo più efficace.', bullets: ['Crea una sessione di ascolto da appunti di corso o riassunti di articoli', 'Usa gruppi di lettura più piccoli per un ripasso più tranquillo', 'Cambia lingua e ritmo in base alla tua routine di studio'], faqs: [['Cosa lo rende utile per gli studenti?', 'Trasforma la scrittura in audio, così gli studenti possono ripassare a orecchio, rafforzare l’apprendimento e ridurre la fatica visiva.'], ['Può aiutare nell’apprendimento delle lingue?', 'Sì. Ripetizione e brevi gruppi audio aiutano a sviluppare comprensione e consapevolezza della pronuncia.'], ['Posso riutilizzare gli appunti dopo?', 'Sì. I progetti vengono salvati nel browser, così gli studenti possono tornare alla stessa sessione più tardi.']], start: 'Usa DICTATE per trasformare note e materiale di studio in un flusso di ripasso più tranquillo.', readArticle: 'Leggi articolo', tryTool: 'Prova lo strumento', backBlogs: 'Torna a BLOGS', why: 'Perché le persone lo usano', how: 'Come funziona', faqTitle: 'Domande frequenti', startTitle: 'Inizia a leggere oggi', blogIntro: 'Esplora guide pratiche e pagine di prodotto per la lettura vocale nel browser, la revisione di PDF e l’uso di DICTATE per studio e ripasso.', blogTitle: 'BLOGS' }
    },
    ru: {
      'browser-text-to-speech-reader': { title: 'Чтение текста в речь в браузере', intro: 'Читайте заметки, статьи и учебный материал вслух в браузере с помощью приватного, беспрерывного голосового чтения для обучения, повторения и концентрации.', bullets: ['Вставляйте заметки или загружайте файл за несколько секунд', 'Настраивайте скорость, язык и группировку под свой учебный процесс', 'Держите всё локально в браузере без необходимости загрузки'], faqs: [['Что такое чтение текста в речь в браузере?', 'Это инструмент, который преобразует текст в озвученный аудиофайл прямо в браузере. Он полезен для учебы, проверки, изучения слов и прослушивания длинных заметок без чтения строкой за строкой.'], ['DICTATE работает без загрузки моих файлов?', 'Да. DICTATE может читать вставленный текст и локальные файлы браузера без обязательной загрузки на сервер в обычном режиме.'], ['Можно ли использовать его для учебных заметок?', 'Да. Многие студенты используют его, чтобы слушать заметки, конспекты, эссе и материалы повторения, когда идут, отдыхают или разбирают сложные темы.'], ['Можно ли изменить скорость и язык голоса?', 'Да. Читалка поддерживает настраиваемую скорость, выбор языка и повторное воспроизведение, чтобы контент было легче усваивать.']], start: 'Используйте DICTATE, чтобы превращать заметки, PDF и учебный материал в озвученный текст в браузере. Он создан для студентов, специалистов и всех, кто хочет повторять материал спокойнее и сосредоточеннее.', readArticle: 'Читать статью', tryTool: 'Попробовать инструмент', backBlogs: 'Назад к BLOGS', why: 'Почему люди используют', how: 'Как это работает', faqTitle: 'Часто задаваемые вопросы', startTitle: 'Начните читать сегодня', blogIntro: 'Ознакомьтесь с практическими гайдами и страницами продукта о чтении текста вслух в браузере, прослушивании PDF и использовании DICTATE для обучения и повторения.', blogTitle: 'BLOGS' },
      'read-pdf-aloud-online': { title: 'Читать PDF вслух онлайн', intro: 'Преобразуйте содержимое PDF в озвученный аудиофайл в браузере, чтобы пересматривать статьи, заметки и исследования, не глядя долго в экран.', bullets: ['Загрузите PDF или DOCX с вашего устройства', 'Слушайте текст в сгруппированных блоках чтения', 'Держите сессии чтения сфокусированными и приватными в вашем браузере'], faqs: [['Можно ли читать PDF вслух онлайн без установки программ?', 'Да. DICTATE позволяет загрузить PDF и преобразовать видимый текст в озвученный текст в браузерном режиме.'], ['Подходит ли для учебных документов?', 'Да. Это полезно для академического материала, заметок для чтения, кратких резюме исследований и документов для повторения.'], ['Это приватно?', 'Поток чтения ориентирован на браузер и устройство. Ваш контент остаётся в среде браузера, если вы явно не используете внешние функции.']], start: 'Используйте DICTATE, чтобы превращать заметки, PDF и учебный материал в озвученный текст. Он создан для студентов, специалистов и всех, кто хочет повторять материал спокойнее и сосредоточеннее.', readArticle: 'Читать статью', tryTool: 'Попробовать инструмент', backBlogs: 'Назад к BLOGS', why: 'Почему люди используют', how: 'Как это работает', faqTitle: 'Часто задаваемые вопросы', startTitle: 'Начните читать сегодня', blogIntro: 'Ознакомьтесь с практическими гайдами и страницами продукта о чтении текста вслух в браузере, прослушивании PDF и использовании DICTATE для обучения и повторения.', blogTitle: 'BLOGS' },
      'read-notes-aloud': { title: 'Читать заметки вслух в браузере', intro: 'Улучшайте память и удержание, слушая заметки вместо того, чтобы только читать их. DICTATE помогает превратить ключевые идеи в структурированную сессию повторения.', bullets: ['Вставляйте лекционные заметки или черновики в инструмент', 'Слушайте в коротких, сфокусированных группах, чтобы улучшить понимание', 'Повторяйте сложные разделы без ручного перечитывания всего'], faqs: [['Зачем читать заметки вслух?', 'Чтение вслух снижает визуальную усталость, улучшает концентрацию и помогает запоминать информацию через сочетание прослушивания и повторения.'], ['Можно ли использовать во время поездок или прогулок?', 'Да. Инструмент рассчитан на быстрые сессии повторения в браузере и особенно полезен на телефонах и планшетах.'], ['Какие заметки работают лучше всего?', 'Лекционные заметки, конспекты, сценарии повторения, личные напоминания и тексты для чтения работают хорошо.']], start: 'Используйте DICTATE, чтобы превращать заметки и учебный материал в более сфокусированный поток прослушивания.', readArticle: 'Читать статью', tryTool: 'Попробовать инструмент', backBlogs: 'Назад к BLOGS', why: 'Почему люди используют', how: 'Как это работает', faqTitle: 'Часто задаваемые вопросы', startTitle: 'Начните читать сегодня', blogIntro: 'Ознакомьтесь с практическими гайдами и страницами продукта о чтении текста вслух в браузере, прослушивании PDF и использовании DICTATE для обучения и повторения.', blogTitle: 'BLOGS' },
      'student-dictation-tool': { title: 'Инструмент диктанта для студентов', intro: 'Удобный поток диктовки и прослушивания для эссе, заметок для повторения и учебного материала, который помогает эффективнее усваивать информацию.', bullets: ['Создавайте сессию прослушивания из заметок курса или резюме статей', 'Используйте меньшие группы чтения для более спокойного повторения', 'Меняйте язык и темп в соответствии с вашей учебной рутиной'], faqs: [['Что делает его полезным для студентов?', 'Он превращает письмо в озвученный звук, чтобы студенты могли повторять материал на слух, укреплять обучение и снижать визуальную усталость.'], ['Поможет ли при изучении языков?', 'Да. Повтор и короткие аудиоблоки помогают улучшить понимание и осознанность произношения.'], ['Можно ли использовать заметки позже?', 'Да. Проекты сохраняются в браузере, поэтому студенты могут вернуться к той же сессии позже.']], start: 'Используйте DICTATE, чтобы превращать заметки и учебный материал в более спокойный поток повторения.', readArticle: 'Читать статью', tryTool: 'Попробовать инструмент', backBlogs: 'Назад к BLOGS', why: 'Почему люди используют', how: 'Как это работает', faqTitle: 'Часто задаваемые вопросы', startTitle: 'Начните читать сегодня', blogIntro: 'Ознакомьтесь с практическими гайдами и страницами продукта о чтении текста вслух в браузере, прослушивании PDF и использовании DICTATE для обучения и повторения.', blogTitle: 'BLOGS' }
    }
  };
  function getBlogCopy(routeKey) {
    const language = getUiLanguage();
    const pack = BLOG_ARTICLE_COPY[language] || BLOG_ARTICLE_COPY.en;
    return pack[routeKey] || pack['browser-text-to-speech-reader'];
  }
  function sourceMarkup() { return `<label class="file-action" id="browse" for="file-input"><span class="file-icon">□</span><span>${t('home.browse','Click to browse')}</span><small>${t('home.fileType','TXT, PDF, or DOCX')}</small></label><label class="file-action" id="drop-label"><span class="file-icon">↓</span><span>${t('home.drop','Drop a file here')}</span><small>${t('home.drag','or drag and drop')}</small></label><input id="file-input" type="file" accept=".txt,.pdf,.docx,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden>`; }
  async function loadFile(file, input, source) { if (!file) return; const extension = String(file.name || '').split('.').pop().toLowerCase(); try { let result; if (extension === 'txt' || file.type === 'text/plain') result = await extractTXT(file); else if (extension === 'pdf' || file.type === 'application/pdf') result = await extractPDF(await file.arrayBuffer()); else if (extension === 'docx' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') result = await extractDOCX(await file.arrayBuffer()); else throw new Error(`Unsupported file type: ${file.name || 'unknown file'}`); const text = String(result?.text || '').replace(/^\uFEFF/, '').trim(); if (!text) throw new Error(`The file "${file.name}" contains no readable text.`); if (textWordCount(text) > MAX_WORDS) { toast(textLimitMessage(), 'danger'); return; } input.value = text; source.type = extension; source.name = file.name; input.dispatchEvent(new Event('input', { bubbles:true })); toast(formatText('project.fileLoaded', { file: file.name }), 'success'); } catch (error) { toast(error.message || 'Could not read that file.', 'danger'); } }
  async function renderHome(editId = null) {
    const projects = await listProjects(5); const editingProject = editId ? await getProject(editId) : null;
    if (editId && !editingProject) return Router.navigate('projects');
    app().innerHTML = `<div class="page home-page"><div class="hero"><div class="eyebrow">${editingProject ? t('home.hero.edit','Edit saved project') : t('home.hero.new','Listen. Repeat. Learn.')}</div><h1>${editingProject ? t('home.h1.edit','Update your notes.') : t('home.h1.new','Dictate your notes.')}</h1><p>${editingProject ? t('home.p.edit','Save changes to this listening session.') : t('home.p.new','Turn your notes into a focused listening session.')}</p></div><div class="home-grid"><aside class="panel recent-panel"><div class="panel-title"><span>${t('home.recent','Recent projects')}</span><span class="accent-text">${projects.length} / 20</span></div>${projects.length ? projects.map(project => `<button class="mini-project" data-open="${safe(project.id)}"><strong>${safe(project.name)}</strong><small>${t('reader.group','Group')} ${Math.min(project.progress.currentGroupIndex + 1, project.groups.length)} / ${project.groups.length}</small></button>`).join('') : `<p class="empty-note">${t('home.empty','Your saved sessions will appear here.')}</p>`}<button class="button full-button" id="view-projects">${t('home.viewAll','View all projects')}</button></aside><section class="input-section"><div class="input-box" id="input-box"><div class="textarea-wrap"><textarea class="text-input" id="text-input"  placeholder="${t('home.placeholder','Write or paste your text here...')}"></textarea><div class="counter" id="counter">0 / ${MAX_WORDS.toLocaleString()} ${t('home.counter','words')}</div></div><div class="file-zone">${sourceMarkup()}</div></div><button class="start-button" id="start" disabled>${editingProject ? t('home.save','Save changes') : t('home.start','Start to dictate')} <span>→</span></button><p class="privacy-note">${t('home.privacy','Your notes stay on this device.')}</p></section></div><section class="seo-content"><div class="seo-intro"><p class="eyebrow">${t('home.seo.eyebrow','Private browser learning')}</p><h2>${t('home.seo.title','Turn study notes, PDFs, and scripts into spoken audio.')}</h2><p>${t('home.seo.body','DICTATE helps you listen to notes instead of reading every line. Use it for revision, language learning, reading practice, and quiet focus sessions without sending your files to a server.')}</p></div><div class="seo-links"><a href="./browser-text-to-speech-reader" data-route="browser-text-to-speech-reader">${t('home.seo.link.reader','Browser text to speech reader')}</a><a href="./read-pdf-aloud-online" data-route="read-pdf-aloud-online">${t('home.seo.link.pdf','Read PDF aloud online')}</a><a href="./read-notes-aloud" data-route="read-notes-aloud">${t('home.seo.link.notes','Read notes aloud in browser')}</a><a href="./student-dictation-tool" data-route="student-dictation-tool">${t('home.seo.link.student','Student dictation tool')}</a></div><div class="seo-grid"><article class="seo-card"><h3>${t('home.seo.studyTitle','Study faster')}</h3><p>${t('home.seo.studyText','Listen to revision notes, essays, and summaries in short blocks so you can absorb more without screen fatigue.')}</p></article><article class="seo-card"><h3>${t('home.seo.pdfTitle','Read PDFs aloud')}</h3><p>${t('home.seo.pdfText','Upload a PDF or DOCX and turn complex reading material into speech you can follow while doing other tasks.')}</p></article><article class="seo-card"><h3>${t('home.seo.privateTitle','Stay private')}</h3><p>${t('home.seo.privateText','Everything works in the browser with local project storage, making it a practical option for quiet, private learning.')}</p></article></div><div class="seo-faq"><h3>${t('home.seo.questionsTitle','Common questions')}</h3><div class="faq-item"><button class="faq-question">${t('home.seo.question1','Why use a browser text to speech reader?')}</button><div class="faq-answer"><p>${t('home.seo.answer1','It helps you review notes by ear, reduce eye strain, and repeat difficult chapters or concepts in a focused, manageable rhythm.')}</p></div></div><div class="faq-item"><button class="faq-question">${t('home.seo.question2','Can I read documents aloud in my browser?')}</button><div class="faq-answer"><p>${t('home.seo.answer2','Yes. DICTATE supports reading pasted text, browser-local documents, and PDF content directly in the browser.')}</p></div></div><div class="faq-item"><button class="faq-question">${t('home.seo.question3','Is this good for students?')}</button><div class="faq-answer"><p>${t('home.seo.answer3','Yes. It is useful for revision, reading practice, language learning, and quieter study sessions with less screen fatigue.')}</p></div></div></div></section></div>`;
    bindHome(editingProject);
    document.querySelectorAll('.faq-question').forEach(button => button.onclick = () => button.parentElement.classList.toggle('open'));
  }
  function bindHome(editingProject = null) {
    const input = document.querySelector('#text-input'); const counter = document.querySelector('#counter'); const start = document.querySelector('#start'); const box = document.querySelector('#input-box'); const source = { type:'paste', name:null };
    activeInputSource = source;
    let draftWriteTimer = null;
    let saveInFlight = false;
    try { const draft = JSON.parse(localStorage.getItem('dictator_draft') || 'null'); if (draft?.content && (!editingProject || draft.editingProjectId === editingProject.id)) input.value = draft.content; else if (editingProject) input.value = editingProject.rawText; } catch { if (editingProject) input.value = editingProject.rawText; }
    const update = () => {
      const count = countText(input, counter, start);
      if (count > MAX_WORDS) {
        if (draftWriteTimer) clearTimeout(draftWriteTimer);
        return count;
      }
      if (draftWriteTimer) clearTimeout(draftWriteTimer);
      draftWriteTimer = setTimeout(() => {
        try {
          localStorage.setItem('dictator_draft', JSON.stringify({
            content: input.value,
            timestamp: Date.now(),
            source: source.type,
            editingProjectId: editingProject?.id || null
          }));
        } catch (error) {
          console.warn('Draft save skipped because the browser storage is full or blocked.', error);
        }
      }, 250);
      return count;
    };
    input.addEventListener('input', update); update();
    document.querySelector('#view-projects').onclick = () => Router.navigate('projects');
    document.querySelectorAll('[data-open]').forEach(node => node.onclick = () => Router.navigate(`project/${node.dataset.open}`));
    document.querySelectorAll('.seo-links [data-route]').forEach(link => { const route = link.dataset.route.startsWith('blogs/') ? link.dataset.route : `blogs/${link.dataset.route}`; link.href = Router.url(route); link.onclick = event => { event.preventDefault(); Router.navigate(route); }; });
    document.querySelector('#file-input').onchange = event => loadFile(event.target.files[0], input, source);
    ['dragenter','dragover'].forEach(type => box.addEventListener(type, event => { event.preventDefault(); box.classList.add('dragging'); }));
    ['dragleave','drop'].forEach(type => box.addEventListener(type, event => { event.preventDefault(); box.classList.remove('dragging'); }));
    const fileZone = document.querySelector('.file-zone');
    fileZone.addEventListener('dragover', event => { event.preventDefault(); fileZone.classList.add('dragging'); });
    fileZone.addEventListener('dragleave', () => fileZone.classList.remove('dragging'));
    fileZone.addEventListener('drop', event => { event.preventDefault(); fileZone.classList.remove('dragging'); loadFile(event.dataTransfer.files[0], input, source); });
    start.onclick = async () => {
      if (saveInFlight) return;
      const tokens = tokenize(input.value);
      if (!tokens.length) return;
      if (tokens.length > MAX_WORDS) { toast(textLimitMessage(), 'danger'); return; }
      saveInFlight = true;
      start.disabled = true;
      start.dataset.busy = 'true';
      const originalLabel = start.innerHTML;
      start.innerHTML = `${editingProject ? t('home.save','Save changes') : t('home.start','Start to dictate')} <span>…</span>`;
      try {
        const value = settings();
        const language = value.defaultDictationLang === 'auto' ? await detectLanguage(input.value) : value.defaultDictationLang;
        const baseProject = {
          rawText: input.value,
          wordCount: tokens.length,
          sourceType: source.type,
          sourceName: source.name || editingProject?.sourceName || null,
          progress: { currentGroupIndex: 0, currentRepeat: 1, isPlaying: false, lastWordSpoken: '' }
        };
        const payload = {
          ...baseProject,
          config: {
            wordsPerGroup: Number(editingProject?.config.wordsPerGroup || value.defaultWordsPerGroup),
            repetitions: Number(value.defaultRepetitions),
            speed: Number(value.defaultSpeed),
            pauseDuration: Number(value.defaultPauseDuration) || .8,
            language,
            theme: document.documentElement.dataset.theme
          }
        };
        const project = editingProject ? await updateProject(editingProject.id, payload) : await createProject({
          name: tokens.slice(0, 6).join(' '),
          nameLower: tokens.slice(0, 6).join(' ').toLowerCase(),
          ...payload
        });
        localStorage.removeItem('dictator_draft');
        toast(editingProject ? t('project.saved','Project updated.') : t('project.created','Project created.'), 'success');
        Router.navigate(`project/${project.id}`);
      } catch (error) {
        toast(error.message === 'STORAGE_FULL' ? t('project.storageFull','Storage full (20/20 projects).') : t('project.loadFail','Could not save project.'), 'danger');
      } finally {
        saveInFlight = false;
        start.disabled = false;
        start.dataset.busy = 'false';
        start.innerHTML = originalLabel;
      }
    };
  }
  function projectMeta(project) { const progress = project.groups.length ? Math.round((project.progress.currentGroupIndex / project.groups.length) * 100) : 0; return `${t('reader.group','Group')} ${Math.min(project.progress.currentGroupIndex + 1, project.groups.length)} of ${project.groups.length} · ${progress}% complete · Updated ${new Date(project.updatedAt).toLocaleDateString()}`; }
  async function downloadProjectBackup() {
    try {
      const backup = await exportProjects();
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `dictate-projects-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(link.href);
      toast(t('project.exported', 'Backup downloaded.'), 'success');
    } catch { toast(t('project.loadFail', 'Could not save project.'), 'danger'); }
  }
  async function restoreProjectBackup(file) {
    try {
      const backup = JSON.parse(await file.text());
      const count = await importProjects(backup);
      toast(formatText('project.imported', { count }), 'success');
      renderProjects();
    } catch (error) {
      toast(error.message === 'STORAGE_FULL' ? t('project.storageFull', 'Storage full (20/20 projects).') : t('project.invalidBackup', 'That backup file is not valid.'), 'danger');
    }
  }
  function mountProjectBackupControls() {
    const heading = document.querySelector('.projects-page .page-heading');
    if (!heading || heading.querySelector('#export-projects')) return;
    const actions = document.createElement('div');
    actions.className = 'page-actions';
    actions.innerHTML = `<button class="button" id="export-projects">${t('project.export', 'Export backup')}</button><button class="button" id="import-projects">${t('project.import', 'Import backup')}</button><input id="import-projects-input" type="file" accept="application/json,.json" hidden>`;
    heading.append(actions);
    actions.querySelector('#export-projects').onclick = downloadProjectBackup;
    actions.querySelector('#import-projects').onclick = () => actions.querySelector('#import-projects-input').click();
    actions.querySelector('#import-projects-input').onchange = event => { const [file] = event.target.files; if (file) restoreProjectBackup(file); event.target.value = ''; };
  }
  async function renderProjects() { const projects = await listProjects(); const demo = demoProject(); app().innerHTML = `<div class="page projects-page"><div class="page-heading"><div><div class="eyebrow">${t('project.yourLibrary','Your library')}</div><h1>${t('project.title','Your projects.')}</h1><p>${t('project.subtitle','Manage your listening sessions. Maximum 20 projects.')}</p></div><button class="button" id="new-project">${t('project.new','+ New project')}</button></div><div class="project-list"><article class="project-card demo-project-card"><div class="project-info"><h3>${safe(demo.name)}</h3><p>${formatText('project.demoInfo', { count: demo.groups.length })}</p></div><div class="card-actions"><button class="button primary" data-open="${demo.id}">${t('project.openDemo','Open demo')}</button></div></article>${projects.length ? projects.map(project => `<article class="project-card"><div class="project-info"><h3>${safe(project.name)}</h3>${project.image ? `<img class="project-image-thumb" src="${safe(project.image)}" alt="Project preview" />` : ''}<p>${projectMeta(project)}${project.sourceName ? ` · ${safe(project.sourceName)}` : ''}</p></div><div class="card-actions"><button class="button primary" data-open="${safe(project.id)}">${t('project.open','Open')}</button><button class="button" data-rename="${safe(project.id)}">${t('project.rename','Rename')}</button><button class="button danger" data-delete="${safe(project.id)}">${t('project.delete','Delete')}</button></div></article>`).join('') : `<div class="empty-state"><h2>${t('project.emptyTitle','No projects yet.')}</h2><p>${t('project.emptyText','Start with a note from the Home page.')}</p><button class="button primary" id="empty-home">${t('project.emptyAction','Create your first project')}</button></div>`}</div><div class="storage"><p>${formatText('project.storageUsed', { count: projects.length })}</p><div class="progress"><span style="width:${projects.length / 20 * 100}%"></span></div></div></div>`;
    document.querySelector('#new-project')?.addEventListener('click', () => Router.navigate('')); document.querySelector('#empty-home')?.addEventListener('click', () => Router.navigate('')); document.querySelectorAll('[data-open]').forEach(node => node.onclick = () => Router.navigate(`project/${node.dataset.open}`));
    document.querySelectorAll('[data-delete]').forEach(node => node.onclick = async () => { if (!confirm(t('project.deleteConfirm','Delete this project? This cannot be undone.'))) return; const projectId = node.dataset.delete; await deleteProject(projectId); renderProjects(); let finalized = false; const finalize = async () => { if (finalized) return; finalized = true; await purgeProject(projectId); }; toast(t('project.deleted','Project deleted.'), 'success', { label:t('project.undo','Undo'), duration:10000, run:async () => { if (finalized) return; finalized = true; await restoreProject(projectId); toast(t('project.restored','Project restored.'), 'success'); renderProjects(); } }); setTimeout(finalize, 10000); });
    document.querySelectorAll('[data-rename]').forEach(node => node.onclick = async () => { const project = await getProject(node.dataset.rename); const name = prompt('Project name', project.name); if (!name?.trim()) return; await updateProject(project.id, { name:name.trim(), nameLower:name.trim().toLowerCase() }); toast(t('project.renamed','Project renamed.'), 'success'); renderProjects(); });
    mountProjectBackupControls();
  }
  function readerContent(project) {
    const paragraphBlocks = splitIntoParagraphs(project.rawText || '');
    const groups = Array.isArray(project.groups) ? project.groups : [];
    if (!paragraphBlocks.length && !groups.length) return '';
    if (!paragraphBlocks.length) {
      return groups.map(group => {
        if (group.hasTitle || group.hasSubtitle) return `<${group.hasTitle ? 'h2' : 'h3'} class="reader-${group.hasTitle ? 'title' : 'subtitle'}">${safe(group.rawText)}</${group.hasTitle ? 'h2' : 'h3'}>`;
        return `<span class="word-group" data-index="${group.index}">${safe(group.rawText)}</span> `;
      }).join('');
    }
    let cursor = 0;
    return paragraphBlocks.map(paragraphText => {
      const paragraphTokens = tokenize(paragraphText);
      const size = Math.max(1, Number(project.config.wordsPerGroup) || 1);
      const expectedCount = Math.max(1, Math.ceil(paragraphTokens.length / size));
      const chunk = groups.slice(cursor, cursor + expectedCount);
      cursor += chunk.length;
      if (!chunk.length) {
        const fallbackIndex = Math.min(cursor, Math.max(0, groups.length - 1));
        return `<p class="reader-paragraph"><span class="word-group" data-index="${fallbackIndex}">${safe(paragraphText)}</span></p>`;
      }
      const content = chunk.map(group => {
        if (group.hasTitle || group.hasSubtitle) return `<${group.hasTitle ? 'h2' : 'h3'} class="reader-${group.hasTitle ? 'title' : 'subtitle'}">${safe(group.rawText)}</${group.hasTitle ? 'h2' : 'h3'}>`;
        return `<span class="word-group" data-index="${group.index}">${safe(group.rawText)}</span>`;
      }).join(' ');
      return `<p class="reader-paragraph">${content}</p>`;
    }).join('');
  }
  function speedControl(id, value) { return `<label class="speed-control" for="${id}-range">${t('reader.speed','Speed')} <input id="${id}-range" type="range" min="0.25" max="2" step="0.05" value="${Number(value).toFixed(2)}"><input id="${id}-value" class="speed-value" type="number" min="0.25" max="2" step="0.05" value="${Number(value).toFixed(2)}" aria-label="Speed value"><span>x</span></label>`; }
  function pauseControl(value) { const numeric=Number(value); const current=Math.max(0,Math.min(3.5,Number.isFinite(numeric) ? numeric : .8)).toFixed(1); return `<label class="speed-control" for="reader-pause-range">${t('settings.pause','Pause between groups')} <input id="reader-pause-range" type="range" min="0" max="3.5" step="0.1" value="${current}"><input id="reader-pause-value" class="speed-value" type="number" min="0" max="3.5" step="0.1" value="${current}" aria-label="Pause duration in seconds"><span>s</span></label>`; }
  function bindSpeedControl(id, onChange, minimum = .25, maximum = 2, fallback = 1) { const range = document.querySelector(`#${id}-range`); const value = document.querySelector(`#${id}-value`); if (!range || !value) return; const update = next => { const numeric=Number(next); const clamped = Math.max(minimum, Math.min(maximum, Number.isFinite(numeric) ? numeric : fallback)); range.value = clamped.toFixed(id === 'reader-pause' ? 1 : 2); value.value = clamped.toFixed(id === 'reader-pause' ? 1 : 2); onChange(clamped); }; range.oninput = event => update(event.target.value); value.oninput = event => update(event.target.value); }
  function mountPauseFooter() { const footer=document.querySelector('.dictation-footer'); const active=TTS.get?.(); if (!footer || !active || footer.querySelector('#reader-pause-range')) return; const control=document.createElement('span'); control.innerHTML=pauseControl(active.config.pauseDuration ?? settings().defaultPauseDuration); footer.insertBefore(control.firstElementChild, footer.querySelector('#restart')); bindSpeedControl('reader-pause', value => TTS.configChange('pauseDuration', value), 0, 3.5, .8); }
  function bindReaderGroups(project) { document.querySelectorAll('.word-group').forEach(node => node.onclick = () => TTS.jump(Number(node.dataset.index))); }
  function refreshReader(project) { const reader = document.querySelector('#reader'); if (reader) reader.innerHTML = readerContent(project); activeReaderGroup = null; bindReaderGroups(project); updateReaderState(project, 'paused'); }
  async function renderProject(id) { const project = id === 'demo-stress-project' ? demoProject() : await getProject(id); if (!project) return Router.navigate(''); TTS.load(project); activeReaderGroup = null; app().innerHTML = `<div class="reader-page"><div class="reader-header"><button class="back-link" id="back-projects">${t('reader.back','← Back to projects')}</button><div><div class="eyebrow">${project.isDemo ? t('reader.demo','Built-in test project') : t('reader.view','Reader view')}</div><h1>${safe(project.name)}</h1></div>${project.isDemo ? '' : `<button class="button" id="edit-text">${t('reader.edit','Edit text')}</button>`}</div><article class="reader-shell" id="reader">${readerContent(project)}</article></div><div class="dictation-footer"><div class="playback"><button class="icon-button" id="previous" aria-label="Previous group">←</button><button class="play-button" id="play" aria-label="Play">▶</button><button class="icon-button" id="next" aria-label="Next group">→</button></div><label>${t('reader.words','Words')} <select id="reader-words">${Array.from({length:10},(_,i)=>`<option value="${i+1}" ${project.config.wordsPerGroup === i+1 ? 'selected' : ''}>${i+1}</option>`).join('')}</select></label><label>${t('reader.reps','Reps')} <select id="reader-reps">${Array.from({length:10},(_,i)=>`<option value="${i+1}" ${project.config.repetitions === i+1 ? 'selected' : ''}>${i+1}</option>`).join('')}</select></label>${speedControl('reader-speed', project.config.speed)}<label>${t('reader.lang','Lang')} <select id="reader-lang">${['en','pt','es','fr','de','it','ru'].map(value=>`<option value="${value}" ${project.config.language === value ? 'selected' : ''}>${value.toUpperCase()}</option>`).join('')}</select></label><button class="button" id="restart">${t('reader.restart','Restart')}</button><span class="status" id="status"></span></div>`;
    document.querySelector('#back-projects').onclick = () => Router.navigate('projects'); document.querySelector('#edit-text')?.addEventListener('click', () => Router.navigate(`edit/${project.id}`)); document.querySelector('#play').onclick = () => TTS.toggle(); document.querySelector('#previous').onclick = () => TTS.previous(); document.querySelector('#next').onclick = () => TTS.next(); document.querySelector('#restart').onclick = () => TTS.restart(); bindReaderGroups(project); [['reader-words','wordsPerGroup'],['reader-reps','repetitions'],['reader-lang','language']].forEach(([id,key]) => document.querySelector(`#${id}`).onchange = event => TTS.configChange(key, event.target.value)); bindSpeedControl('reader-speed', value => TTS.configChange('speed', value)); bindSpeedControl('reader-pause', value => TTS.configChange('pauseDuration', value)); updateReaderState(project, 'idle'); mountPauseFooter(); }
  function updateReaderState(project, state, voiceName = null) { const nextReaderGroup = document.querySelector(`.word-group[data-index="${project.progress.currentGroupIndex + 1}"]`); if (activeReaderGroup !== nextReaderGroup) { activeReaderGroup?.classList.remove('active'); nextReaderGroup?.classList.add('active'); activeReaderGroup = nextReaderGroup || null; } const status = document.querySelector('#status'); const play = document.querySelector('#play'); const active = ['loading','playing','between_groups','between_repeats'].includes(state); if (status) status.textContent = state === 'loading' ? `${t('reader.loading','Loading browser voice')}${voiceName ? ` · ${voiceName}` : '…'}` : state === 'finished' ? t('reader.finished','Complete · press Restart to begin again') : `${t('reader.group','Group')} ${Math.min(project.progress.currentGroupIndex + 1, project.groups.length)} / ${project.groups.length} · ${t('reader.repeat','Repeat')} ${project.progress.currentRepeat} / ${project.config.repetitions}${voiceName ? ` · ${voiceName}` : ''}`; if (play) { play.textContent = state === 'playing' ? 'Ⅱ' : active ? '■' : '▶'; play.setAttribute('aria-label', active ? t('reader.pause','Pause') : t('reader.play','Play')); } }
  function renderBlogs() {
    const language = getUiLanguage();
    const copy = BLOG_ARTICLE_COPY[language] || BLOG_ARTICLE_COPY.en;
    const items = [
      ['browser-text-to-speech-reader', copy['browser-text-to-speech-reader'].title, 'Use a browser text to speech reader to turn notes, articles, and documents into spoken audio.'],
      ['read-pdf-aloud-online', copy['read-pdf-aloud-online'].title, 'Convert PDFs into spoken audio for study, revision, and more focused reading.'],
      ['read-notes-aloud', copy['read-notes-aloud'].title, 'Turn class notes, writing drafts, and revision material into a listening session.'],
      ['student-dictation-tool', copy['student-dictation-tool'].title, 'Build a calmer, more efficient study flow with repeated listening and revision.']
    ];
    app().innerHTML = `<div class="static-content"><div class="eyebrow">DICTATE</div><h1>${copy['browser-text-to-speech-reader'].blogTitle || 'BLOGS'}</h1><p>${copy['browser-text-to-speech-reader'].blogIntro || 'Browse practical guides and product pages for reading text aloud in the browser, reviewing PDFs, and using DICTATE for study and revision.'}</p><div class="seo-grid">${items.map(([slug, title, summary]) => `<article class="seo-card"><h2>${title}</h2><p>${summary}</p><a href="${Router.url(`blogs/${slug}`)}" class="button primary-link">${copy[slug]?.readArticle || 'Read article'}</a></article>`).join('')}</div><p style="margin-top:25px;"><a href="${Router.url('')}" class="button primary-link">${copy['browser-text-to-speech-reader'].tryTool || 'Try the tool'}</a></p></div>`;
  }
  function renderIntentPage(routeKey) {
    const copy = getBlogCopy(routeKey);
    const page = copy;
    const localizedTitle = copy.title || page.title;
    const localizedIntro = copy.intro || page.intro;
    const localizedBullets = copy.bullets && copy.bullets.length ? copy.bullets : page.bullets;
    const localizedFaqs = copy.faqs && copy.faqs.length ? copy.faqs : page.faqs;
    const localizedStart = copy.start || 'Use DICTATE to turn notes, PDFs, and study material into spoken audio in your browser.';
    const localizedHow = {
      en: ['Paste notes, upload a PDF, or drop in text from a document.', 'Choose the reading group size, pace, repetition, and language.', 'Listen to the text aloud and revise more effectively in focused listening sessions.'],
      pt: ['Cole notas, carregue um PDF ou insira texto de um documento.', 'Escolha o tamanho dos grupos, o ritmo, as repetições e o idioma.', 'Ouça o texto em voz alta e revise com mais eficiência em sessões focadas.'],
      fr: ['Collez vos notes, chargez un PDF ou insérez le texte d’un document.', 'Choisissez la taille des groupes, le rythme, les répétitions et la langue.', 'Écoutez le texte et révisez plus efficacement lors de sessions ciblées.'],
      es: ['Pega notas, sube un PDF o inserta texto de un documento.', 'Elige el tamaño de los grupos, el ritmo, las repeticiones y el idioma.', 'Escucha el texto y repasa con más eficacia en sesiones enfocadas.'],
      de: ['Füge Notizen ein, lade ein PDF hoch oder übernimm Text aus einem Dokument.', 'Wähle Gruppengröße, Tempo, Wiederholungen und Sprache.', 'Höre den Text und wiederhole ihn in fokussierten Sitzungen effektiver.'],
      it: ['Incolla note, carica un PDF o inserisci testo da un documento.', 'Scegli la dimensione dei gruppi, il ritmo, le ripetizioni e la lingua.', 'Ascolta il testo e ripassa in modo più efficace con sessioni mirate.'],
      ru: ['Вставьте заметки, загрузите PDF или добавьте текст из документа.', 'Выберите размер групп, темп, повторы и язык.', 'Слушайте текст и эффективнее повторяйте материал в сфокусированных сессиях.']
    }[getUiLanguage()] || ['Paste notes, upload a PDF, or drop in text from a document.', 'Choose the reading group size, pace, repetition, and language.', 'Listen to the text aloud and revise more effectively in focused listening sessions.'];
    app().innerHTML = `<div class="static-content"><div class="eyebrow">DICTATE</div><h1>${localizedTitle}</h1><p>${localizedIntro}</p><section><h2>${copy.why || 'Why people use it'}</h2><ul>${localizedBullets.map(point => `<li>${point}</li>`).join('')}</ul></section><section><h2>${copy.how || 'How it works'}</h2><ol>${localizedHow.map(step => `<li>${step}</li>`).join('')}</ol></section><section><h2>${copy.faqTitle || 'Frequently asked questions'}</h2>${localizedFaqs.map(([question, answer]) => `<div class="faq-item"><button class="faq-question">${question}</button><div class="faq-answer"><p>${answer}</p></div></div>`).join('')}</section><section><h2>${copy.startTitle || 'Start reading today'}</h2><p>${localizedStart}</p><p><a href="${Router.url('')}" class="button primary-link">${copy.tryTool || 'Try the tool'}</a> <a href="${Router.url('blogs')}" class="button primary-link">${copy.backBlogs || 'Back to BLOGS'}</a></p></section></div>`;
    document.querySelectorAll('.faq-question').forEach(button => button.onclick = () => button.parentElement.classList.toggle('open'));
  }
  function staticPage(title, body) { app().innerHTML = `<div class="static-content"><div class="eyebrow">DICTATE</div><h1>${title}</h1>${body}</div>`; }
  function renderAbout() { staticPage(t('about.title','A calmer way to learn.'), `<p>${t('about.body','DICTATE turns notes, essays, PDFs, and study material into speech so you can listen, repeat, and retain more. It is built for students, language learners, and anyone who wants to dictate notes to a computer and review them by ear in a private browser workflow.')}</p><section><h2>${t('about.section1','Designed for repetition')}</h2><p>${t('about.section1p','Small groups, adjustable pace, and a visible reading highlight help you stay with the sentence instead of racing past it.')}</p></section><section><h2>${t('about.section2','Private by default')}</h2><p>${t('about.section2p','Your saved projects live in this browser using local storage and IndexedDB. DICTATE does not upload your notes to an application server.')}</p></section>`); }
  function renderHowToUse() { staticPage(t('how.title','How to use DICTATE.'), `<p>${t('how.body','Start on Home, paste a note or load a TXT, PDF, or DOCX file, then create a project.')}</p><section><h2>${t('how.build','Build a session')}</h2><ol><li>${t('how.step1','Add your text.')}</li><li>${t('how.step2','Choose your default group size, repetitions, speed, and language in Settings.')}</li><li>${t('how.step3','Start the session and follow the highlighted groups.')}</li></ol></section><section><h2>${t('how.questions','Questions')}</h2><div class="faq-item"><button class="faq-question">${t('how.groupQuestion','What does a group mean?')}</button><div class="faq-answer"><p>${t('how.groupAnswer','A group is the number of words DICTATE speaks together before moving on.')}</p></div></div><div class="faq-item"><button class="faq-question">${t('how.settingsQuestion','Can I change settings while reading?')}</button><div class="faq-answer"><p>${t('how.settingsAnswer','Yes. Reader controls save changes to the current project and reset grouping when necessary.')}</p></div></div></section>`); document.querySelectorAll('.faq-question').forEach(button => button.onclick = () => button.parentElement.classList.toggle('open')); }
  function renderPrivacy() { staticPage(t('privacy.title','Privacy policy.'), `<p>${t('privacy.body','DICTATE is designed to keep your notes on your device. Projects are stored in this browser and speech is produced by the browser Web Speech API.')}</p><section><h2>${t('privacy.whatLeaves','What leaves your device?')}</h2><p>${t('privacy.whatLeavesBody','Nothing is sent to a DICTATE application server. Optional PDF, DOCX, and language-detection libraries may be loaded from their public CDNs when you use those features.')}</p></section><section><h2>${t('privacy.removing','Removing your data')}</h2><p>${t('privacy.removingBody','Delete individual projects from the Projects page, or clear this site’s browser storage to remove all local data.')}</p></section>`); }
  return { renderHome, renderProjects, renderProject, renderAbout, renderHowToUse, renderPrivacy, renderBlogs, renderIntentPage, getBlogCopy, toast, updateReaderState, refreshReader };
})();
