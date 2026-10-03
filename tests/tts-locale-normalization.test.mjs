import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function loadTTS() {
  const script = await fs.readFile(path.join(root, 'tts.js'), 'utf8');
  const voices = [
    { name: 'Samsung Portuguese', lang: 'pt_BR', localService: true },
    { name: 'Google English', lang: 'en-US', localService: false },
    { name: 'Generic PT voice', lang: 'pt', localService: false },
    { name: 'Google French', lang: 'fr-FR', localService: false }
  ];

  const context = {
    window: {
      DictateI18n: { getSettings: () => ({}) },
      UI: { updateReaderState() {}, toast() {} },
      Router: { navigate() {} },
      speechSynthesis: { getVoices: () => voices, cancel() {}, addEventListener() {}, speaking: false, paused: false },
      localStorage: { setItem() {}, getItem() { return null; } },
      Audio: function Audio() { return { play() { return Promise.resolve(); }, pause() {}, onended: null, onerror: null }; },
      matchMedia: () => ({ matches: false }),
      navigator: { language: 'en-US' },
      performance: { now: () => 0 }
    },
    console,
    localStorage: { setItem() {}, getItem() { return null; } },
    navigator: { language: 'en-US' },
    performance: { now: () => 0 },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    speechSynthesis: { getVoices: () => voices, cancel() {}, addEventListener() {}, speaking: false, paused: false },
    Audio: function Audio() { return { play() { return Promise.resolve(); }, pause() {}, onended: null, onerror: null }; }
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
