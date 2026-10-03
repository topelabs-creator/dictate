(() => {
  const TTS = window.TTS;
  const Router = window.Router;
  const UI = window.UI;
  const settingsKey = 'dictator_settings'; const defaults = { uiLanguage:'auto', defaultDictationLang:'auto', defaultWordsPerGroup:6, defaultRepetitions:2, defaultSpeed:.9, defaultPauseDuration:.8, theme:'system' };
  const settingsState = (() => { try { return { ...defaults, ...JSON.parse(localStorage.getItem(settingsKey) || '{}') }; } catch { return { ...defaults }; } })();
  const uiLanguageOptions = ['auto','pt','en','fr','es','de','it','ru'];
  const UI_TEXT = {
    en: {
      'nav.title': 'Navigate',
      'nav.home': 'Home',
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.howto': 'How to use',
      'nav.privacy': 'Privacy',
      'settings.title': 'Settings',
      'settings.uiLanguage': 'UI language',
      'settings.defaultLanguage': 'Default language',
      'settings.wordsPerGroup': 'Words per group',
      'settings.repetitions': 'Repetitions',
      'settings.speed': 'Speed',
      'settings.auto': 'Auto',
      'settings.voiceLab': 'Voice Lab',
      'settings.uiLanguageNote': 'Choose and preview the clearest voice available for each language.',
    },
    pt: {
      'nav.title': 'Navegar',
      'nav.home': 'Início',
      'nav.projects': 'Projetos',
      'nav.about': 'Sobre',
      'nav.howto': 'Como usar',
      'nav.privacy': 'Privacidade',
      'settings.title': 'Configurações',
      'settings.uiLanguage': 'Idioma da interface',
      'settings.defaultLanguage': 'Idioma padrão',
      'settings.wordsPerGroup': 'Palavras por grupo',
      'settings.repetitions': 'Repetições',
      'settings.speed': 'Velocidade',
      'settings.auto': 'Automático',
      'settings.voiceLab': 'Laboratório de voz',
      'settings.uiLanguageNote': 'Escolha e pré-visualize a voz mais clara disponível para cada idioma.',
    },
    fr: {
      'nav.title': 'Naviguer',
      'nav.home': 'Accueil',
      'nav.projects': 'Projets',
      'nav.about': 'À propos',
      'nav.howto': 'Comment utiliser',
      'nav.privacy': 'Confidentialité',
      'settings.title': 'Paramètres',
      'settings.uiLanguage': 'Langue de l’interface',
      'settings.defaultLanguage': 'Langue par défaut',
      'settings.wordsPerGroup': 'Mots par groupe',
      'settings.repetitions': 'Répétitions',
      'settings.speed': 'Vitesse',
      'settings.auto': 'Auto',
      'settings.voiceLab': 'Laboratoire vocal',
      'settings.uiLanguageNote': 'Choisissez et prévisualisez la voix la plus claire disponible pour chaque langue.',
    },
    es: {
      'nav.title': 'Navegar',
      'nav.home': 'Inicio',
      'nav.projects': 'Proyectos',
      'nav.about': 'Acerca de',
      'nav.howto': 'Cómo usar',
      'nav.privacy': 'Privacidad',
      'settings.title': 'Ajustes',
      'settings.uiLanguage': 'Idioma de la interfaz',
      'settings.defaultLanguage': 'Idioma predeterminado',
      'settings.wordsPerGroup': 'Palabras por grupo',
      'settings.repetitions': 'Repeticiones',
      'settings.speed': 'Velocidad',
      'settings.auto': 'Automático',
      'settings.voiceLab': 'Laboratorio de voz',
      'settings.uiLanguageNote': 'Elija y previsualice la voz más clara disponible para cada idioma.',
    },
    de: {
      'nav.title': 'Navigation',
      'nav.home': 'Start',
      'nav.projects': 'Projekte',
      'nav.about': 'Über uns',
      'nav.howto': 'Anleitung',
      'nav.privacy': 'Datenschutz',
      'settings.title': 'Einstellungen',
      'settings.uiLanguage': 'Sprache der Oberfläche',
      'settings.defaultLanguage': 'Standardsprache',
      'settings.wordsPerGroup': 'Wörter pro Gruppe',
      'settings.repetitions': 'Wiederholungen',
      'settings.speed': 'Geschwindigkeit',
      'settings.auto': 'Automatisch',
      'settings.voiceLab': 'Sprachlabor',
      'settings.uiLanguageNote': 'Wählen Sie die klarste verfügbare Stimme für jede Sprache aus und hören Sie eine Vorschau.',
    },
    it: {
      'nav.title': 'Navigazione',
      'nav.home': 'Home',
      'nav.projects': 'Progetti',
      'nav.about': 'Informazioni',
      'nav.howto': 'Come usare',
      'nav.privacy': 'Privacy',
      'settings.title': 'Impostazioni',
      'settings.uiLanguage': 'Lingua dell’interfaccia',
      'settings.defaultLanguage': 'Lingua predefinita',
      'settings.wordsPerGroup': 'Parole per gruppo',
      'settings.repetitions': 'Ripetizioni',
      'settings.speed': 'Velocità',
      'settings.auto': 'Automatico',
      'settings.voiceLab': 'Laboratorio voce',
      'settings.uiLanguageNote': 'Scegli e ascolta l’anteprima della voce più chiara disponibile per ogni lingua.',
    },
    ru: {
      'nav.title': 'Навигация',
      'nav.home': 'Главная',
      'nav.projects': 'Проекты',
      'nav.about': 'О проекте',
      'nav.howto': 'Как пользоваться',
      'nav.privacy': 'Конфиденциальность',
      'settings.title': 'Настройки',
      'settings.uiLanguage': 'Язык интерфейса',
      'settings.defaultLanguage': 'Язык по умолчанию',
      'settings.wordsPerGroup': 'Слов в группе',
      'settings.repetitions': 'Повторы',
      'settings.speed': 'Скорость',
      'settings.auto': 'Авто',
      'settings.voiceLab': 'Голосовая лаборатория',
      'settings.uiLanguageNote': 'Выберите и прослушайте наиболее чистый голос для каждого языка.',
    }
  };
  function getSettings() { return settingsState; }
  function saveSettings() { localStorage.setItem(settingsKey, JSON.stringify(settingsState)); return settingsState; }
  function getSystemUiLanguage() {
    const browserLanguage = (navigator.language || navigator.languages?.[0] || 'en').toLowerCase();
    const code = browserLanguage.split('-')[0];
    return uiLanguageOptions.includes(code) ? code : 'en';
  }
  function getUrlUiLanguage() {
    const queryLanguage = new URLSearchParams(location.search).get('lang')?.toLowerCase();
    if (uiLanguageOptions.includes(queryLanguage)) return queryLanguage;
    const source = location.hash.startsWith('#/') ? location.hash.slice(2) : location.pathname.replace(/^\/+/, '');
    const pathLanguage = source.split('/')[0]?.toLowerCase();
    return uiLanguageOptions.includes(pathLanguage) ? pathLanguage : null;
  }
  function resolveUiLanguage(value) {
    const urlLanguage = getUrlUiLanguage();
    if (urlLanguage) return urlLanguage;
    const saved = (value || 'auto').toLowerCase();
    if (saved === 'auto') return getSystemUiLanguage();
    return uiLanguageOptions.includes(saved) ? saved : 'en';
  }
  function currentUiText() {
    const language = resolveUiLanguage(getSettings().uiLanguage);
    return UI_TEXT[language] || UI_TEXT.en;
  }
  function t(key, fallback = key) {
    return currentUiText()[key] || UI_TEXT.en[key] || fallback;
  }
  window.DictateI18n = { t, resolveUiLanguage, getSystemUiLanguage, getUrlUiLanguage, getSettings, saveSettings, options: uiLanguageOptions };
  function applyTheme(theme) { const dark=theme==='dark'||(theme==='system'&&matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.dataset.theme=dark?'dark':'light'; document.querySelector('#theme-toggle').textContent=dark?'☀':'☾'; }
  function applyUiLanguage() {
    const language = resolveUiLanguage(getSettings().uiLanguage);
    document.documentElement.lang = language;
    document.documentElement.dataset.uiLanguage = language;
  }
  function panel(id, open) { const node=document.querySelector(id); node.classList.toggle('open',open); node.setAttribute('aria-hidden',String(!open)); document.querySelector('#scrim').hidden=!open; }
  function renderMenu() {
    const nav = [
      ['','nav.home'],
      ['projects','nav.projects'],
      ['blogs','BLOGS'],
      ['about','nav.about'],
      ['how-to-use','nav.howto'],
      ['privacy','nav.privacy']
    ];
      document.querySelector('#page-menu').innerHTML='<div class="panel-header"><strong>' + t('nav.title', 'Navigate') + '</strong><button class="icon-button" data-close>×</button></div>' + nav.map(([path,label]) => `<a class="nav-link" data-route="${path}" href="${Router.url(path)}">${typeof label === 'string' && label.startsWith('nav.') ? t(label, label.replace('nav.','').replace(/^[a-z]/, c => c.toUpperCase())) : label}</a>`).join(''); document.querySelectorAll('a[data-route]').forEach(link=>link.onclick=event=>{if(event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();panel('#page-menu',false);Router.navigate(link.dataset.route);}});
    document.querySelector('#home-link').onclick=()=>Router.navigate(''); document.querySelectorAll('[data-header-route]').forEach(link=>{link.href=Router.url(link.dataset.headerRoute);link.onclick=event=>{if(event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();Router.navigate(link.dataset.headerRoute);}};}); 
  }
  function renderPauseSetting() { const panelNode=document.querySelector('#settings-panel'); if (!panelNode || panelNode.querySelector('#setting-pause-range')) return; const value=getSettings(); const labels={en:'Pause between groups',pt:'Pausa entre grupos',fr:'Pause entre les groupes',es:'Pausa entre grupos',de:'Pause zwischen Gruppen',it:'Pausa tra i gruppi',ru:'Пауза между группами'}; const language=resolveUiLanguage(value.uiLanguage); const wrapper=document.createElement('label'); wrapper.className='setting speed-setting'; const initial=Math.max(0,Math.min(3.5,Number(value.defaultPauseDuration) || .8)).toFixed(1); wrapper.innerHTML=`${labels[language] || labels.en} <input id="setting-pause-range" type="range" min="0" max="3.5" step="0.1" value="${initial}"><input id="setting-pause-value" type="number" min="0" max="3.5" step="0.1" value="${initial}" aria-label="Pause duration in seconds"><span>s</span>`; panelNode.append(wrapper); const range=wrapper.querySelector('#setting-pause-range'); const number=wrapper.querySelector('#setting-pause-value'); const update=next=>{const clamped=Math.max(0,Math.min(3.5,Number(next) || 0));range.value=clamped.toFixed(1);number.value=clamped.toFixed(1);const settings=getSettings();settings.defaultPauseDuration=clamped;localStorage.setItem(settingsKey,JSON.stringify(settings));}; range.oninput=event=>update(event.target.value); number.oninput=event=>update(event.target.value); }
  function renderSettings() { const value=getSettings(); const normalizedLanguage=(value.defaultDictationLang || 'auto').toLowerCase(); const uiLanguage=(value.uiLanguage || 'auto').toLowerCase(); document.querySelector('#settings-panel').innerHTML='<div class="panel-header"><strong>' + t('settings.title', 'Settings') + '</strong><button class="icon-button" data-close>×</button></div>' + `<label class="setting">${t('settings.uiLanguage', 'UI language')}<select id="ui-language"><option value="auto" ${uiLanguage==='auto'?'selected':''}>${t('settings.auto', 'Auto')}</option>${['pt','en','fr','es','de','it','ru'].map(code=>`<option value="${code}" ${uiLanguage===code?'selected':''}>${code.toUpperCase()}</option>`).join('')}</select></label><label class="setting">${t('settings.defaultLanguage', 'Default language')}<select id="setting-language"><option value="auto" ${normalizedLanguage==='auto'?'selected':''}>${t('settings.auto', 'Auto')}</option>${['pt','en','fr','es','de','it','ru'].map(code=>`<option value="${code}" ${normalizedLanguage===code?'selected':''}>${code.toUpperCase()}</option>`).join('')}</select></label><label class="setting">${t('settings.wordsPerGroup', 'Words per group')}<select id="setting-words">${Array.from({length:10},(_,i)=>`<option value="${i+1}" ${value.defaultWordsPerGroup===i+1?'selected':''}>${i+1}</option>`).join('')}</select></label><label class="setting">${t('settings.repetitions', 'Repetitions')}<select id="setting-reps">${Array.from({length:10},(_,i)=>`<option value="${i+1}" ${value.defaultRepetitions===i+1?'selected':''}>${i+1}</option>`).join('')}</select></label><label class="setting speed-setting">${t('settings.speed', 'Speed')} <input id="setting-speed-range" type="range" min="0.25" max="2" step="0.05" value="${Number(value.defaultSpeed).toFixed(2)}"><input id="setting-speed-value" type="number" min="0.25" max="2" step="0.05" value="${Number(value.defaultSpeed).toFixed(2)}" aria-label="Default speed value"><span>x</span></label>`; const save=()=>{const next=getSettings();next.defaultDictationLang=(document.querySelector('#setting-language').value || 'auto').toLowerCase();next.uiLanguage=(document.querySelector('#ui-language').value || 'auto').toLowerCase();next.defaultWordsPerGroup=Number(document.querySelector('#setting-words').value) || 6;next.defaultRepetitions=Number(document.querySelector('#setting-reps').value) || 2;next.defaultSpeed=Math.max(.25,Math.min(2,Number(document.querySelector('#setting-speed-value').value)||1));localStorage.setItem(settingsKey,JSON.stringify(next));applyUiLanguage();}; const range=document.querySelector('#setting-speed-range'); const speed=document.querySelector('#setting-speed-value'); const updateSpeed=next=>{const clamped=Math.max(.25,Math.min(2,Number(next)||1));range.value=clamped.toFixed(2);speed.value=clamped.toFixed(2);save();}; range.oninput=event=>updateSpeed(event.target.value); speed.oninput=event=>updateSpeed(event.target.value); document.querySelector('#setting-words').onchange=save; document.querySelector('#setting-reps').onchange=save; document.querySelector('#setting-language').onchange=save; document.querySelector('#ui-language').onchange=event => { const next=getSettings(); next.uiLanguage=(event.target.value || 'auto').toLowerCase(); localStorage.setItem(settingsKey, JSON.stringify(next)); Router.setLanguage(next.uiLanguage); applyUiLanguage(); const settingsPanelOpen=document.querySelector('#settings-panel')?.classList.contains('open'); renderMenu(); renderSettings(); renderPauseSetting(); if (settingsPanelOpen) document.querySelector('#settings-toggle')?.dispatchEvent(new Event('click')); }; const close=document.querySelector('[data-close]'); if (close) close.onclick=()=>panel('#settings-panel',false); }
  const initialSettings=getSettings(); let migrated=false; if (initialSettings.defaultSpeed === .6 || initialSettings.defaultSpeed === .7) { initialSettings.defaultSpeed=.9; migrated=true; } if (initialSettings.defaultWordsPerGroup === 3) { initialSettings.defaultWordsPerGroup=6; migrated=true; } if (typeof initialSettings.defaultDictationLang === 'string') { const normalizedLanguage=initialSettings.defaultDictationLang.toLowerCase(); if (normalizedLanguage !== initialSettings.defaultDictationLang) { initialSettings.defaultDictationLang=normalizedLanguage; migrated=true; } } if (typeof initialSettings.uiLanguage !== 'string') { initialSettings.uiLanguage='auto'; migrated=true; } else { const normalizedUiLanguage=initialSettings.uiLanguage.toLowerCase(); if (!uiLanguageOptions.includes(normalizedUiLanguage)) { initialSettings.uiLanguage='auto'; migrated=true; } else if (normalizedUiLanguage !== initialSettings.uiLanguage) { initialSettings.uiLanguage=normalizedUiLanguage; migrated=true; } } if (migrated) localStorage.setItem(settingsKey,JSON.stringify(initialSettings)); applyUiLanguage(); renderMenu(); renderSettings(); applyTheme(getSettings().theme); document.querySelector('#menu-toggle').onclick=()=>panel('#page-menu',true); document.querySelector('#settings-toggle').onclick=()=>panel('#settings-panel',true); document.querySelector('#scrim').onclick=()=>{panel('#page-menu',false);panel('#settings-panel',false);}; document.querySelector('#home-link').onclick=()=>Router.navigate('');  document.querySelector('#theme-toggle').onclick=()=>{const next=getSettings();next.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';localStorage.setItem(settingsKey,JSON.stringify(next));applyTheme(next.theme);}; addEventListener('keydown',event=>{if(event.key==='Escape'){panel('#page-menu',false);panel('#settings-panel',false);}}); addEventListener('popstate',()=>{panel('#page-menu',false);panel('#settings-panel',false);}); TTS.init(); Router.init();
  renderPauseSetting();
})();
