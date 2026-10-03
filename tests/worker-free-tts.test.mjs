import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import worker, { normalizeLanguage, mapVoiceForLanguage } from '../worker.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('worker normalizes language tags for free TTS fallback', () => {
  assert.equal(normalizeLanguage('pt_BR'), 'pt-br');
  assert.equal(normalizeLanguage('PT-BR'), 'pt-br');
  assert.equal(normalizeLanguage('en'), 'en');
  assert.equal(mapVoiceForLanguage('pt_BR'), 'pt-BR');
  assert.equal(mapVoiceForLanguage('fr-FR'), 'fr-FR');
  assert.equal(mapVoiceForLanguage('unknown-lang'), 'en-US');
});

test('worker serves same-origin GET audio URLs for mobile tap playback', async () => {
  const originalFetch = globalThis.fetch;
  let requestedUrl;
  globalThis.fetch = async url => {
    requestedUrl = new URL(url);
    return new Response('audio-bytes', { headers: { 'Content-Type': 'audio/mpeg' } });
  };
  try {
    const request = new Request('https://dictate.test/api/tts?text=Ol%C3%A1&language=pt');
    const response = await worker.fetch(request, {});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'audio/mpeg');
    assert.equal(requestedUrl.searchParams.get('q'), 'Olá');
    assert.equal(requestedUrl.searchParams.get('tl'), 'pt-BR');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('worker preserves POST fallback requests', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('audio-bytes', { headers: { 'Content-Type': 'audio/mpeg' } });
  try {
    const request = new Request('https://dictate.test/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Hello', language: 'en' })
    });
    const response = await worker.fetch(request, {});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'audio/mpeg');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('Cloudflare routes API requests through the Worker entry point', async () => {
  const config = JSON.parse(await fs.readFile(path.join(root, 'wrangler.json'), 'utf8'));
  assert.equal(config.main, 'worker.js');
  assert.equal(config.assets.binding, 'ASSETS');
  assert.ok(config.assets.run_worker_first.includes('/api/*'));
});

test('worker limits fallback text to the provider request size', async () => {
  const response = await worker.fetch(new Request('https://dictate.test/api/tts?text=' + 'x'.repeat(201) + '&language=en'), {});
  assert.equal(response.status, 413);
});
