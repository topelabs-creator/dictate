window.TTS = (() => {
  let project = null;
  let state = 'idle';
  let timerId = null;
  let utterance = null;
  let generation = 0;
  let configVersion = 0;
  let selectedVoice = null;
  let fallbackAudio = null;
  let speechKeepAliveTimer = null;
  const FALLBACK_VOICE_URI = 'dictate-online-fallback';

  const PREFERRED_VOICE_PATTERNS = {
    en: [/online.*natural/i, /natural/i, /google us english/i, /samantha/i, /daniel/i, /alex/i],
    pt: [/online.*natural/i, /natural/i, /google.*portugu/i, /joana/i, /luciana/i],
    es: [/online.*natural/i, /natural/i, /google.*espa/i, /elvira/i, /jorge/i],
    fr: [/online.*natural/i, /natural/i, /google.*fran/i, /denise/i, /amelie/i],
    de: [/online.*natural/i, /natural/i, /google.*deutsch/i, /katja/i, /anna/i],
    it: [/online.*natural/i, /natural/i, /google.*ital/i],
    ar: [/online.*natural/i, /natural/i, /google.*arab/i],
    ru: [/online.*natural/i, /natural/i, /google.*russ/i]
  };
  const BAD_VOICE_PATTERNS = [/\bdavid\b/i, /\bzira\b/i, /\bhazel\b/i, /desktop/i, /espeak/i, /festival/i];

  function normalizeLanguageTag(language) {
    const value = String(language || 'en').trim();
    if (!value) return 'en';
    return value.toLowerCase().replace(/_/g, '-').replace(/\s+/g, '');
  }

  function matchesLanguage(voiceLanguage, targetLanguage) {
    const voice = normalizeLanguageTag(voiceLanguage);
    const target = normalizeLanguageTag(targetLanguage);
    if (!voice || !target) return false;
    if (voice === target) return true;
    const voiceBase = voice.split('-')[0];
    const targetBase = target.split('-')[0];
    return voiceBase === targetBase || voice.startsWith(`${targetBase}-`) || target.startsWith(`${voiceBase}-`);
  }

  const get = () => project;
  const defaultPauseDuration = () => { const value=Number(window.DictateI18n?.getSettings?.().defaultPauseDuration); return Number.isFinite(value) ? value : .8; };
  const languageKey = language => normalizeLanguageTag(language).split('-')[0];
  const localeScore = (voice, language) => {
    const target = normalizeLanguageTag(language || 'en');
    const locale = normalizeLanguageTag(voice.lang || '');
    if (!locale || !target) return 0;
    if (locale === target) return 100;
    if (locale.startsWith(`${target}-`)) return 70;
    if (locale.startsWith(languageKey(target))) return 35;
    if (matchesLanguage(locale, target)) return 30;
    return 0;
  };

  function rankVoice(voice, language) {
    const patterns = PREFERRED_VOICE_PATTERNS[languageKey(language)] || [];
    const preferredIndex = patterns.findIndex(pattern => pattern.test(String(voice.name || '')));
    let score = localeScore(voice, language);
    if (preferredIndex >= 0) score += 100 - preferredIndex * 10;
    if (voice.localService === false) score += 45;
    if (voice.default) score += 5;
    if (BAD_VOICE_PATTERNS.some(pattern => pattern.test(String(voice.name || '')))) score -= 150;
    return score;
  }

  function availableVoices() {
    return 'speechSynthesis' in window ? speechSynthesis.getVoices() : [];
  }

  function voiceFor(language) {
    const normalizedLanguage = normalizeLanguageTag(language || 'en');
    selectedVoice = availableVoices()
      .map(voice => ({ voice, score: rankVoice(voice, normalizedLanguage) }))
      .filter(item => matchesLanguage(item.voice.lang, normalizedLanguage) || localeScore(item.voice, normalizedLanguage) > 0)
      .sort((left, right) => right.score - left.score)[0]?.voice || null;
    return selectedVoice;
  }

  function listVoices(language = 'en') {
    const normalizedLanguage = normalizeLanguageTag(language || 'en');
    return availableVoices()
      .map(voice => ({ voice, score: rankVoice(voice, normalizedLanguage), localeScore: localeScore(voice, normalizedLanguage) }))
      .filter(item => matchesLanguage(item.voice.lang, normalizedLanguage) || item.localeScore > 0)
      .sort((left, right) => right.score - left.score)
      .map(item => item.voice);
  }

  function savedVoice() { return window.DictateI18n?.getSettings?.().voiceURI || ''; }

  function selectVoice(voiceURI) {
    try {
      const settings = window.DictateI18n?.getSettings?.() || {};
      if (voiceURI) settings.voiceURI = voiceURI;
      else delete settings.voiceURI;
      localStorage.setItem('dictator_settings', JSON.stringify(settings));
    } catch {}
  }

  function previewVoice(voice, speed = 0.9, text = 'A, B, C. "Clear words, careful pauses, and easy listening." Number 2.5.') {
    if (!voice || !('speechSynthesis' in window)) return false;
    speechSynthesis.cancel();
    const preview = new SpeechSynthesisUtterance(text);
    preview.voice = voice;
    preview.lang = voice.lang;
    preview.rate = Math.max(0.1, Math.min(2, Number(speed) || 0.9));
    speechSynthesis.speak(preview);
    return true;
  }

  function fallbackAudioUrl(text, language) {
    const query = new URLSearchParams({ text, language: languageKey(language) });
    return `/api/tts?${query}`;
  }

  function splitFallbackUnits(units, maximumLength = 200) {
    return units.flatMap(unit => {
      const words = unit.text.split(/\s+/);
      const chunks = [];
      let chunk = '';
      for (const word of words) {
        if (word.length > maximumLength) {
          if (chunk) chunks.push(chunk);
          for (let offset = 0; offset < word.length; offset += maximumLength) {
            chunks.push(word.slice(offset, offset + maximumLength));
          }
          chunk = '';
          continue;
        }
        const next = chunk ? `${chunk} ${word}` : word;
        if (next.length > maximumLength && chunk) {
          chunks.push(chunk);
          chunk = word;
        } else {
          chunk = next;
        }
      }
      if (chunk) chunks.push(chunk);
      return chunks.map((text, index) => ({ text, pauseBefore: index === 0 ? unit.pauseBefore : 0 }));
    });
  }

  function fallbackAudioForPlayback(unit, language, speed) {
    if (!fallbackAudio) fallbackAudio = new Audio();
    const audio = fallbackAudio;
    audio.pause();
    audio.src = fallbackAudioUrl(unit.text, language);
    audio.playbackRate = Math.max(0.25, Math.min(2, Number(speed) || 0.9));
    return new Promise((resolve, reject) => {
      audio.onended = resolve;
      audio.onerror = () => reject(new Error(`No ${language.toUpperCase()} browser voice is available, and the online fallback could not play.`));
      audio.play().catch(reject);
    });
  }

  function previewLanguage(language, speed = 0.9, text) {
    if (savedVoice() !== FALLBACK_VOICE_URI && 'speechSynthesis' in window && voiceFor(language)) return previewVoice(voiceFor(language), speed, text);
    const audio = new Audio(fallbackAudioUrl(text, language));
    audio.playbackRate = Math.max(0.25, Math.min(2, Number(speed) || 0.9));
    audio.play().catch(() => {});
    return true;
  }

  function init() {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
  }

  function startKeepAlive() {
    if (speechKeepAliveTimer || !('speechSynthesis' in window)) return;
    speechKeepAliveTimer = setInterval(() => {
      if (state === 'playing' && speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
        speechSynthesis.resume();
      }
    }, 10000);
  }

  function stopKeepAlive() {
    if (!speechKeepAliveTimer) return;
    clearInterval(speechKeepAliveTimer);
    speechKeepAliveTimer = null;
  }

  function clear() {
    generation += 1;
    clearTimeout(timerId);
    timerId = null;
    stopKeepAlive();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (fallbackAudio) {
      try { fallbackAudio.pause(); } catch {}
    }
    utterance = null;
  }

  function sync() {
    if (project) window.UI.updateReaderState(project, state, selectedVoice?.name || null);
  }

  function load(value) {
    clear();
    project = value;
    state = 'idle';
    const preferredURI = savedVoice();
    selectedVoice = listVoices(project.config.language).find(voice => voice.voiceURI === preferredURI) || voiceFor(project.config.language);
    sync();
  }

  function scheduleNext(callback, durationMs, currentGeneration) {
    const pauseMs = Math.max(0, Math.min(3500, Number(project?.config.pauseDuration ?? defaultPauseDuration()) * 1000));
    state = 'between_groups';
    sync();
    timerId = setTimeout(() => {
      if (currentGeneration === generation && state !== 'paused') callback();
    }, pauseMs);
  }

  function finishSpeech(durationMs, currentGeneration) {
    if (!project || state !== 'playing' || currentGeneration !== generation) return;
    const group = project.groups[project.progress.currentGroupIndex];
    if (project.progress.currentRepeat < project.config.repetitions) {
      state = 'between_repeats';
      project.progress.currentRepeat += 1;
      sync();
      scheduleNext(speak, durationMs, currentGeneration);
    } else if (project.progress.currentGroupIndex < project.groups.length - 1) {
      project.progress.currentGroupIndex += 1;
      project.progress.currentRepeat = 1;
      project.progress.lastWordSpoken = group.rawText;
      persist();
      scheduleNext(speak, durationMs, currentGeneration);
    } else {
      state = 'finished';
      project.progress.isPlaying = false;
      project.progress.lastWordSpoken = group.rawText;
      persist();
      sync();
      window.UI.toast('Dictation complete. Click Restart to begin again.', 'success');
    }
  }

  async function speakBrowser(group, currentGeneration, voice) {
    state = 'playing';
    project.progress.isPlaying = true;
    project.progress.currentRepeat = project.progress.currentRepeat || 1;
    sync();
    const startedAt = performance.now();
    const units = prepareSpeechUnits(group.rawText, group.hasTitle, group.hasSubtitle, project.config.language);
    startKeepAlive();
    for (const unit of units) {
      if (currentGeneration !== generation) throw new Error('Playback canceled.');
      if (unit.pauseBefore) await new Promise(resolve => setTimeout(resolve, unit.pauseBefore));
      await new Promise((resolve, reject) => {
        if (currentGeneration !== generation) return reject(new Error('Playback canceled.'));
        utterance = new SpeechSynthesisUtterance(unit.text);
        utterance.rate = Math.max(0.1, Math.min(2, Number(project.config.speed) || 1));
        utterance.lang = voice?.lang || project.config.language;
        utterance.voice = voice;
        utterance.onend = resolve;
        utterance.onerror = event => reject(new Error(event.error === 'canceled' ? 'Playback canceled.' : 'Speech playback stopped.'));
        speechSynthesis.speak(utterance);
      });
    }
    stopKeepAlive();
    if (currentGeneration === generation) finishSpeech(Math.max(250, performance.now() - startedAt), currentGeneration);
  }

  async function speakFallback(group, currentGeneration) {
    const language = languageKey(project.config.language);
    const units = splitFallbackUnits(prepareSpeechUnits(group.rawText, group.hasTitle, group.hasSubtitle, language));
    const startedAt = performance.now();
    state = 'playing';
    project.progress.isPlaying = true;
    project.progress.currentRepeat = project.progress.currentRepeat || 1;
    sync();
    for (const [index, unit] of units.entries()) {
      if (currentGeneration !== generation) throw new Error('Playback canceled.');
      if (unit.pauseBefore && index > 0) await new Promise(resolve => setTimeout(resolve, unit.pauseBefore));
      await fallbackAudioForPlayback(unit, language, project.config.speed);
    }
    if (currentGeneration === generation) finishSpeech(Math.max(250, performance.now() - startedAt), currentGeneration);
  }

  function speak() {
    if (!project || !project.groups.length) return;
    const currentGeneration = generation;
    const group = project.groups[project.progress.currentGroupIndex];
    const preferredURI = savedVoice();
    const voice = preferredURI === FALLBACK_VOICE_URI ? null : listVoices(project.config.language).find(item => item.voiceURI === preferredURI) || voiceFor(project.config.language);
    selectedVoice = voice;
    state = voice ? 'loading' : 'playing';
    sync();
    const playback = voice ? speakBrowser(group, currentGeneration, voice) : speakFallback(group, currentGeneration);
    playback.catch(error => {
      if (currentGeneration !== generation || error.message === 'Playback canceled.') return;
      clear();
      state = 'paused';
      if (project) project.progress.isPlaying = false;
      sync();
      window.UI.toast(error.message || 'Speech playback stopped. Try Play again.', 'danger');
    });
  }

  async function persist() {
    if (project && !project.isDemo) {
      try { project = await updateProject(project.id, { progress: { ...project.progress } }); }
      catch { window.UI.toast('Could not save playback progress.', 'danger'); }
    }
  }

  function restart() {
    clear();
    if (!project) return;
    project.progress.currentGroupIndex = 0;
    project.progress.currentRepeat = 1;
    project.progress.isPlaying = false;
    state = 'idle';
    sync();
    persist();
  }

  function stop() {
    clear();
    if (project) project.progress.isPlaying = false;
    project = null;
    state = 'idle';
  }

  return {
    init, load, get, stop, restart, listVoices, savedVoice, selectVoice, previewVoice, previewLanguage,
    normalizeLanguageTag,
    fallbackVoiceURI: FALLBACK_VOICE_URI,
    matchesLanguage,
    voiceFor,
    toggle() {
      if (['playing', 'loading', 'between_groups', 'between_repeats'].includes(state)) return this.pause();
      return this.play();
    },
    play() {
      if (state === 'finished') restart();
      if (state === 'playing' || state === 'loading') return;
      speak();
    },
    pause() {
      clear();
      if (project) project.progress.isPlaying = false;
      state = 'paused';
      sync();
      persist();
    },
    next() {
      clear();
      if (project && project.progress.currentGroupIndex < project.groups.length - 1) project.progress.currentGroupIndex += 1;
      if (project) project.progress.currentRepeat = 1;
      state = 'idle';
      sync();
      persist();
      speak();
    },
    previous() {
      clear();
      if (project) project.progress.currentGroupIndex = Math.max(0, project.progress.currentGroupIndex - 1);
      if (project) project.progress.currentRepeat = 1;
      state = 'idle';
      sync();
      persist();
      speak();
    },
    jump(index) {
      clear();
      if (project) {
        project.progress.currentGroupIndex = index;
        project.progress.currentRepeat = 1;
      }
      state = 'paused';
      sync();
      persist();
    },
    async configChange(key, value) {
      if (!project) return;
      clear();
      const version = ++configVersion;
      if (key === 'wordsPerGroup') {
        project.config.wordsPerGroup = Number(value);
        project.groups = createGroups(project.tokens, project.config.wordsPerGroup, project.structure);
        project.progress.currentGroupIndex = 0;
        project.progress.currentRepeat = 1;
        window.UI.refreshReader(project);
      } else {
        project.config[key] = key === 'speed' || key === 'repetitions' || key === 'pauseDuration' ? Math.max(0, Math.min(key === 'pauseDuration' ? 3.5 : 10, Number(value))) : value;
        if (key === 'language') selectedVoice = voiceFor(value);
      }
      if (project.isDemo) {
        sync();
        return;
      }
      const updated = await updateProject(project.id, { config: project.config, groups: project.groups, progress: project.progress });
      if (version === configVersion) {
        project = updated;
        sync();
      }
    }
  };
})();
