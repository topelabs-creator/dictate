import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeLanguage, mapVoiceForLanguage } from '../worker.js';

test('worker normalizes language tags for free TTS fallback', () => {
  assert.equal(normalizeLanguage('pt_BR'), 'pt-br');
  assert.equal(normalizeLanguage('PT-BR'), 'pt-br');
  assert.equal(normalizeLanguage('en'), 'en');
  assert.equal(mapVoiceForLanguage('pt_BR'), 'pt-BR');
  assert.equal(mapVoiceForLanguage('fr-FR'), 'fr-FR');
  assert.equal(mapVoiceForLanguage('unknown-lang'), 'en-US');
});
