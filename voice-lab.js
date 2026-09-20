(() => {
  const settingsKey = 'dictator_settings';
  const languages = [
    ['en', 'English'],
    ['pt', 'Portuguese'],
    ['es', 'Spanish'],
    ['fr', 'French'],
    ['de', 'German'],
    ['it', 'Italian'],
    ['ru', 'Russian']
  ];
  const previewText = {
    en: 'A, B, C. Clear words, careful pauses, and easy listening. Number 2.5.',
    pt: 'A, B, C. Palavras claras, pausas cuidadosas e uma leitura fácil de compreender. Número 2,5.',
    es: 'A, B, C. Palabras claras, pausas cuidadosas y una lectura fácil de entender. Número 2,5.',
    fr: 'A, B, C. Des mots clairs, des pauses attentives et une lecture facile à comprendre. Nombre 2,5.',
    de: 'A, B, C. Klare Wörter, sorgfältige Pausen und ein leicht verständlicher Text. Zahl 2,5.',
    it: 'A, B, C. Parole chiare, pause attente e una lettura facile da capire. Numero 2,5.',
    ru: 'А, Б, В. Чёткие слова, внимательные паузы и простой для понимания текст. Число 2,5.'
  };
  const labels = {
    en: ['Voice Lab', 'Choose and preview the clearest voice available for each language.', 'Test language', 'Voice', 'Preview', 'Refresh voices', 'compatible voices found.', 'No {lang} voice is exposed by this browser. Install one in the operating system, then refresh.', 'Voice saved for future sessions.', 'No {lang} preview is available.'],
    pt: ['Laboratório de voz', 'Escolha e pré-visualize a voz mais clara disponível para cada idioma.', 'Idioma de teste', 'Voz', 'Pré-visualizar', 'Atualizar vozes', 'vozes compatíveis encontradas.', 'Nenhuma voz em {lang} está disponível neste navegador. Instale uma voz no sistema operacional e atualize.', 'Voz salva para futuras sessões.', 'Nenhuma prévia em {lang} está disponível.'],
    fr: ['Laboratoire vocal', 'Choisissez et prévisualisez la voix la plus claire disponible pour chaque langue.', 'Langue de test', 'Voix', 'Aperçu', 'Actualiser les voix', 'voix compatibles trouvées.', 'Aucune voix {lang} n’est disponible dans ce navigateur. Installez-en une dans le système puis actualisez.', 'Voix enregistrée pour les prochaines sessions.', 'Aucun aperçu en {lang} n’est disponible.'],
    es: ['Laboratorio de voz', 'Elige y previsualiza la voz más clara disponible para cada idioma.', 'Idioma de prueba', 'Voz', 'Vista previa', 'Actualizar voces', 'voces compatibles encontradas.', 'Este navegador no ofrece ninguna voz en {lang}. Instala una en el sistema operativo y actualiza.', 'Voz guardada para futuras sesiones.', 'No hay una vista previa en {lang}.'],
    de: ['Sprachlabor', 'Wähle die klarste verfügbare Stimme für jede Sprache aus und höre eine Vorschau.', 'Testsprache', 'Stimme', 'Vorschau', 'Stimmen aktualisieren', 'kompatible Stimmen gefunden.', 'Dieser Browser bietet keine {lang}-Stimme. Installiere eine im Betriebssystem und aktualisiere.', 'Stimme für zukünftige Sitzungen gespeichert.', 'Keine {lang}-Vorschau verfügbar.'],
    it: ['Laboratorio voce', 'Scegli e ascolta l’anteprima della voce più chiara disponibile per ogni lingua.', 'Lingua di prova', 'Voce', 'Anteprima', 'Aggiorna voci', 'voci compatibili trovate.', 'Questo browser non offre una voce {lang}. Installane una nel sistema operativo e aggiorna.', 'Voce salvata per le sessioni future.', 'Nessuna anteprima in {lang} disponibile.'],
    ru: ['Голосовая лаборатория', 'Выберите и прослушайте наиболее чистый голос для каждого языка.', 'Язык проверки', 'Голос', 'Прослушать', 'Обновить голоса', 'совместимых голосов найдено.', 'В этом браузере нет голоса {lang}. Установите его в операционной системе и обновите список.', 'Голос сохранён для будущих сессий.', 'Предпросмотр на языке {lang} недоступен.']
  };
  const copy = () => labels[window.DictateI18n?.resolveUiLanguage?.(getSettings().uiLanguage || 'auto') || 'en'] || labels.en;
  const text = (template, lang) => template.replace('{lang}', lang.toUpperCase());

  const getSettings = () => window.DictateI18n?.getSettings?.() || {};
  const escape = value => String(value ?? '').replace(/[&<>\"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;' }[character]));
  const languageOptions = selected => languages.map(([code, name]) => `<option value="${code}" ${code === selected ? 'selected' : ''}>${name} (${code.toUpperCase()})</option>`).join('');

  function voiceOptions(language) {
    const voices = TTS.listVoices(language);
    const selected = TTS.savedVoice();
    const options = voices.length ? voices.map(voice => `<option value="${escape(voice.voiceURI)}" ${voice.voiceURI === selected ? 'selected' : ''}>${escape(voice.name)} - ${escape(voice.lang)}${voice.localService === false ? ' - online hint' : ' - device'}</option>`).join('') : `<option value="">No ${language.toUpperCase()} voice available</option>`;
    return { voices, options };
  }

  function render() {
    const panel = document.querySelector('#settings-panel');
    if (!panel || !window.TTS?.listVoices || panel.querySelector('#voice-lab')) return;
    const settings = getSettings();
    const language = languages.some(([code]) => code === settings.defaultDictationLang) ? settings.defaultDictationLang : 'en';
    const result = voiceOptions(language);
    const section = document.createElement('section');
    section.id = 'voice-lab';
    section.className = 'voice-lab';
    const ui = copy(); section.innerHTML = `<strong>${ui[0]}</strong><p class="setting-note">${ui[1]}</p><label class="setting">${ui[2]}<select id="voice-language">${languageOptions(language)}</select></label><label class="setting">${ui[3]}<select id="voice-choice">${result.options}</select></label><div class="voice-actions"><button class="button" id="voice-preview" type="button">${ui[4]}</button><button class="button" id="voice-refresh" type="button">${ui[5]}</button></div><p class="setting-note" id="voice-status">${result.voices.length ? `${result.voices.length} ${ui[6]}` : text(ui[7], language)}</p>`;
    panel.append(section);

    const languageSelect = section.querySelector('#voice-language');
    const voiceSelect = section.querySelector('#voice-choice');
    const status = section.querySelector('#voice-status');
    const updateVoices = () => {
      const next = voiceOptions(languageSelect.value);
      voiceSelect.innerHTML = next.options;
      const ui = copy(); status.textContent = next.voices.length ? `${next.voices.length} ${ui[6]}` : text(ui[7], languageSelect.value);
    };
    languageSelect.onchange = updateVoices;
    voiceSelect.onchange = event => { TTS.selectVoice(event.target.value); status.textContent = copy()[8]; };
    section.querySelector('#voice-preview').onclick = () => { const next = voiceOptions(languageSelect.value); const voice = next.voices.find(item => item.voiceURI === voiceSelect.value) || next.voices[0]; const played = voice ? TTS.previewVoice(voice, settings.defaultSpeed, previewText[languageSelect.value]) : TTS.previewLanguage(languageSelect.value, settings.defaultSpeed, previewText[languageSelect.value]); if (!played) status.textContent = text(copy()[9], languageSelect.value); };
    section.querySelector('#voice-refresh').onclick = () => { section.remove(); render(); };
  }

  function renderFooter() {
    const footer = document.querySelector('.dictation-footer');
    if (!footer || !window.TTS?.listVoices) return;
    const language = document.querySelector('#reader-lang')?.value || 'en';
    const existing = footer.querySelector('#reader-voice-tools');
    if (existing?.dataset.language === language) return;
    existing?.remove();
    const settings = getSettings();
    const result = voiceOptions(language);
    const tools = document.createElement('span');
    tools.id = 'reader-voice-tools';
    tools.dataset.language = language;
    tools.className = 'footer-voice-tools';
    tools.innerHTML = `<label class="footer-voice">Voice <select id="reader-voice">${result.options}</select></label><button class="button" id="reader-voice-preview" type="button">Preview</button>`;
    const restart = footer.querySelector('#restart');
    footer.insertBefore(tools, restart);
    tools.querySelector('#reader-voice').onchange = event => TTS.selectVoice(event.target.value);
    tools.querySelector('#reader-voice-preview').onclick = () => { const voice = result.voices.find(item => item.voiceURI === tools.querySelector('#reader-voice').value) || result.voices[0]; if (voice) TTS.previewVoice(voice, settings.defaultSpeed, previewText[language]); else TTS.previewLanguage(language, settings.defaultSpeed, previewText[language]); };
  }

  function removeUnsupportedLanguageOptions() {
    ['#setting-language', '#reader-lang'].forEach(selector => {
      const select = document.querySelector(selector);
      if (!select) return;
      select.querySelector('option[value="ar"]')?.remove();
      if (select.value === 'ar') {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
      }
    });
  }

  document.querySelector('#settings-toggle')?.addEventListener('click', () => setTimeout(render, 0));
  if ('speechSynthesis' in window) speechSynthesis.addEventListener('voiceschanged', () => { render(); renderFooter(); });
  render();
  setTimeout(render, 250);
  addEventListener('popstate', () => setTimeout(renderFooter, 0));
  setTimeout(renderFooter, 300);
  new MutationObserver(renderFooter).observe(document.querySelector('#app'), { childList:true, subtree:true });
  new MutationObserver(removeUnsupportedLanguageOptions).observe(document.body, { childList:true, subtree:true });
  removeUnsupportedLanguageOptions();
})();
