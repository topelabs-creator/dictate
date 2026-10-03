import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function loadTTS({ voices: providedVoices, onAudioPlay, audioUrls = [], settings = {} } = {}) {
  const script = await fs.readFile(path.join(root, 'tts.js'), 'utf8');
  const voices = providedVoices || [
    { name: 'Samsung Portuguese', lang: 'pt_BR', localService: true },
    { name: 'Google English', lang: 'en-US', localService: false },
    { name: 'Generic PT voice', lang: 'pt', localService: false },
    { name: 'Google French', lang: 'fr-FR', localService: false }
  ];

  const context = {
    window: {
      DictateI18n: { getSettings: () => settings, t: key => key },
      UI: { updateReaderState() {}, toast(message) { settings.lastToast = message; } },
      Router: { navigate() {} },
      speechSynthesis: { getVoices: () => voices, cancel() {}, addEventListener() {}, speaking: false, paused: false },
      localStorage: { setItem() {}, getItem() { return null; } },
      Audio: function Audio(src = '') { return { src, play() { onAudioPlay?.(); audioUrls.push(this.src); setImmediate(() => this.onended?.()); return Promise.resolve(); }, pause() {}, onended: null, onerror: null }; },
      matchMedia: () => ({ matches: false }),
      navigator: { language: 'en-US' },
      performance: { now: () => 0 }
    },
    console,
    localStorage: { setItem() {}, getItem() { return null; } },
    navigator: { language: 'en-US' },
    performance: { now: () => 0 },
    URLSearchParams,
    prepareSpeechUnits: text => [{ text, pauseBefore: 0 }],
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    speechSynthesis: { getVoices: () => voices, cancel() {}, addEventListener() {}, speaking: false, paused: false },
    Audio: function Audio(src = '') { return { src, play() { onAudioPlay?.(); audioUrls.push(this.src); setImmediate(() => this.onended?.()); return Promise.resolve(); }, pause() {}, onended: null, onerror: null }; }
  };

  vm.runInNewContext(script, context);
  return context.window.TTS;
}

test('tts normalizes locale tags and picks valid Android voice matches', async () => {
  const TTS = await loadTTS();
  assert.equal(typeof TTS.normalizeLanguageTag, 'function');
  assert.equal(TTS.normalizeLanguageTag('pt_BR'), 'pt-br');
  assert.equal(TTS.normalizeLanguageTag('PT-BR'), 'pt-br');
  assert.equal(TTS.normalizeLanguageTag('pt'), 'pt');
  assert.ok(TTS.matchesLanguage('pt_BR', 'pt'));
  assert.ok(TTS.matchesLanguage('pt', 'pt_BR'));
  assert.ok(TTS.voiceFor('pt')?.lang?.startsWith('pt'));
  assert.ok(TTS.listVoices('pt').some(voice => voice.lang === 'pt_BR' || voice.lang === 'pt'));
});

test('missing local voice requires explicit online voice selection before network playback', async () => {
  let userActivation = false;
  let activationObservedByAudio = false;
  const audioUrls = [];
  const settings = {};
  const TTS = await loadTTS({ voices: [], audioUrls, settings, onAudioPlay() { activationObservedByAudio = userActivation; } });
  TTS.load({
    isDemo: true,
    config: { language: 'pt', speed: 0.9, repetitions: 1, pauseDuration: 0 },
    progress: { currentGroupIndex: 0, currentRepeat: 1, isPlaying: false },
    groups: [{ rawText: 'Olá, mundo.', hasTitle: false, hasSubtitle: false }]
  });
  userActivation = true;
  TTS.play();
  userActivation = false;
  assert.equal(activationObservedByAudio, false);
  assert.equal(audioUrls.length, 0);
  assert.equal(settings.lastToast, 'reader.onlineVoiceConsentRequired');

  TTS.selectVoice(TTS.fallbackVoiceURI);
  userActivation = true;
  TTS.play();
  userActivation = false;
  assert.equal(activationObservedByAudio, true);
  assert.ok(audioUrls.length > 0);
});

test('online voice preview uses network audio even when device voices are available', async () => {
  const audioUrls = [];
  const TTS = await loadTTS({ audioUrls });
  TTS.selectVoice(TTS.fallbackVoiceURI);
  assert.equal(TTS.previewLanguage('pt', 0.9, 'Prévia online'), true);
  assert.equal(audioUrls.length, 1);
  const requestUrl = new URL(audioUrls[0], 'https://dictate.test');
  assert.equal(requestUrl.searchParams.get('language'), 'pt');
  assert.equal(requestUrl.searchParams.get('text'), 'Prévia online');
});

test('network fallback chunks unbroken text below the provider request limit', async () => {
  const requestedUrls = [];
  const TTS = await loadTTS({ voices: [], audioUrls: requestedUrls });
  TTS.load({
    isDemo: true,
    config: { language: 'pt', speed: 0.9, repetitions: 1, pauseDuration: 0 },
    progress: { currentGroupIndex: 0, currentRepeat: 1, isPlaying: false },
    groups: [{ rawText: 'a'.repeat(450), hasTitle: false, hasSubtitle: false }]
  });
  TTS.selectVoice(TTS.fallbackVoiceURI);
  TTS.play();
  await new Promise(resolve => setTimeout(resolve, 10));
  assert.equal(requestedUrls.length, 3);
  for (const requestUrl of requestedUrls) {
    assert.ok(new URL(requestUrl, 'https://dictate.test').searchParams.get('text').length <= 200);
  }
});
