import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://dictate.rakimrakim41.workers.dev';
const locales = ['en', 'pt', 'fr', 'es', 'de', 'it', 'ru'];
const articles = ['browser-text-to-speech-reader', 'read-pdf-aloud-online', 'read-notes-aloud', 'student-dictation-tool'];
const publicRoutes = ['', 'blogs', ...articles.map(slug => `blogs/${slug}`)];

function staticPath(locale, route) {
  const localePath = locale === 'en' ? [] : [locale];
  const routePath = route ? route.split('/') : [];
  return path.join(root, ...localePath, ...routePath, 'index.html');
}

function routeUrl(locale, route) {
  const prefix = locale === 'en' ? '' : `${locale}/`;
  return `${origin}/${prefix}${route}`.replace(/([^:])\/\/+/g, '$1/');
}

function links(html, pattern) {
  return [...html.matchAll(pattern)].map(match => match.slice(1));
}

for (const locale of locales) {
  for (const route of publicRoutes) {
    test(`static metadata: ${locale || 'en'} ${route || '/'}`, async () => {
      const html = await fs.readFile(staticPath(locale, route), 'utf8');
      assert.match(html, new RegExp(`<html[^>]*lang=["']${locale}["']`));
      assert.deepEqual(
        links(html, /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi),
        [[routeUrl(locale, route)]]
      );
      assert.equal(
        links(html, /<link\b(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["']([^"']+)["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi).length,
        8
      );
      assert.doesNotMatch(html, /dictator\.app/i);
    });
  }
}

test('sitemap and robots use the active canonical host', async () => {
  const sitemap = await fs.readFile(path.join(root, 'sitemap.xml'), 'utf8');
  const robots = await fs.readFile(path.join(root, 'robots.txt'), 'utf8');
  assert.doesNotMatch(sitemap, /dictator\.app/i);
  assert.match(robots, new RegExp(`Sitemap:\\s*${origin.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\/sitemap\\.xml`));
  assert.doesNotMatch(sitemap, /\/projects(?:<|\/)/i);
});

test('locale route matrix is reciprocal', async () => {
  for (const route of publicRoutes) {
    for (const locale of locales) {
      const html = await fs.readFile(staticPath(locale, route), 'utf8');
      const hrefs = links(html, /<link\b(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["']([^"']+)["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi);
      assert.equal(hrefs.length, 8);
      const hrefMap = new Map(hrefs);
      for (const targetLocale of locales) {
        assert.equal(hrefMap.get(targetLocale), routeUrl(targetLocale, route));
        await fs.access(staticPath(targetLocale, route));
      }
      assert.equal(hrefMap.get('x-default'), routeUrl('en', route));
    }
  }
});

test('localized loaders use the active index version', async () => {
  for (const locale of locales.filter(locale => locale !== 'en')) {
    const localeRoot = path.join(root, locale);
    const entries = await fs.readdir(localeRoot, { recursive: true, withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile() || entry.name !== 'index.html') continue;
      const filePath = path.join(entry.parentPath, entry.name);
      const html = await fs.readFile(filePath, 'utf8');
      if (html.includes('fetch(')) assert.match(html, /index\.html\?v=32/);
    }
  }
});

 test('runtime source has no public Arabic selector or Russian grammar defect', async () => {
  const ui = await fs.readFile(path.join(root, 'ui.js'), 'utf8');
  const app = await fs.readFile(path.join(root, 'app.js'), 'utf8');
  assert.doesNotMatch(ui, /\['en','pt','es','fr','de','it','ar','ru'\]/);
  assert.match(app, /Голосовая лаборатория/);
});

test('text input uses one enforced word limit', async () => {
  const ui = await fs.readFile(path.join(root, 'ui.js'), 'utf8');
  assert.match(ui, /const MAX_WORDS = 5000;/);
  assert.doesNotMatch(ui, /const MAX_WORDS = Infinity/);
  assert.doesNotMatch(ui, /maxlength="100000"/);
  assert.match(ui, /if \(count > MAX_WORDS\)/);
  assert.match(ui, /if \(count > MAX_WORDS\)[\s\S]*?return count;/);
  assert.match(ui, /textWordCount\(text\) > MAX_WORDS/);
});

test('reader rendering keeps fallback navigation and active state efficient', async () => {
  const ui = await fs.readFile(path.join(root, 'ui.js'), 'utf8');
  assert.doesNotMatch(ui, /data-index="0"/);
  assert.match(ui, /const fallbackIndex = Math\.min\(cursor/);
  assert.match(ui, /let activeReaderGroup = null/);
  assert.match(ui, /activeReaderGroup\?\.classList\.remove\('active'\)/);
  assert.doesNotMatch(ui, /document\.querySelectorAll\('\.word-group'\)\.forEach\(node => node\.classList\.toggle\('active'/);
});

test('shell navigation uses semantic links and clean locale text', async () => {
  const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  const app = await fs.readFile(path.join(root, 'app.js'), 'utf8');
  assert.equal((html.match(/<a data-header-route=/g) || []).length, 5);
  assert.doesNotMatch(app, /document\.querySelectorAll\('\[data-header-route\]'\)\.forEach\(button=>button\.onclick/);
  assert.match(app, /event\.button===0&&!event\.metaKey&&!event\.ctrlKey&&!event\.shiftKey&&!event\.altKey/);
  assert.doesNotMatch(app, /Ã|Ð|â/);
});

test('render lifecycle mounts controls explicitly', async () => {
  const ui = await fs.readFile(path.join(root, 'ui.js'), 'utf8');
  assert.doesNotMatch(ui, /new MutationObserver\(\(\) => \{ mountPauseFooter\(\); mountProjectBackupControls\(\); \}\)/);
  assert.equal((ui.match(/mountProjectBackupControls\(\);/g) || []).length, 1);
  assert.equal((ui.match(/mountPauseFooter\(\);/g) || []).length, 1);
});

test('runtime settings readers use the in-memory cache', async () => {
  const app = await fs.readFile(path.join(root, 'app.js'), 'utf8');
  const ui = await fs.readFile(path.join(root, 'ui.js'), 'utf8');
  const voiceLab = await fs.readFile(path.join(root, 'voice-lab.js'), 'utf8');
  const tts = await fs.readFile(path.join(root, 'tts.js'), 'utf8');
  assert.match(app, /const settingsState = \(\(\) =>/);
  assert.match(app, /window\.DictateI18n = \{[\s\S]*getSettings/);
  assert.match(ui, /window\.DictateI18n\?\.getSettings\?\./);
  assert.match(voiceLab, /window\.DictateI18n\?\.getSettings\?\./);
  assert.match(tts, /window\.DictateI18n\?\.getSettings\?\./);
  assert.doesNotMatch(ui, /JSON\.parse\(localStorage\.getItem\('dictator_settings'\)/);
  assert.doesNotMatch(voiceLab, /JSON\.parse\(localStorage\.getItem\(settingsKey\)/);
  assert.doesNotMatch(tts, /JSON\.parse\(localStorage\.getItem\('dictator_settings'\)/);
});

test('inactive feature paths stay removed without breaking legacy storage', async () => {
  const ui = await fs.readFile(path.join(root, 'ui.js'), 'utf8');
  const db = await fs.readFile(path.join(root, 'db.js'), 'utf8');
  const readme = await fs.readFile(path.join(root, 'README.md'), 'utf8');
  assert.doesNotMatch(ui, /currentProjectImageData|clearProjectImageSelection/);
  assert.doesNotMatch(ui, /image:\s*currentProjectImageData/);
  assert.doesNotMatch(db, /getVoiceModel|saveVoiceModel/);
  assert.match(db, /voices:\s*'voiceModels'/);
  assert.doesNotMatch(readme, /piper-worker\.js/);
});

test('project deletion uses soft-delete and undo retention', async () => {
  const db = await fs.readFile(path.join(root, 'db.js'), 'utf8');
  const ui = await fs.readFile(path.join(root, 'ui.js'), 'utf8');
  assert.match(db, /deletedAt: Number\(project\?\.deletedAt\) \|\| null/);
  assert.match(db, /updateProject\(id, \{ deletedAt: Date\.now\(\) \}\)/);
  assert.match(db, /async function restoreProject\(id\)/);
  assert.match(db, /async function purgeProject\(id\)/);
  assert.match(db, /filter\(project => !project\.deletedAt\)/);
  assert.match(ui, /duration:10000/);
  assert.match(ui, /restoreProject\(projectId\)/);
  assert.ok((ui.match(/project\.undo/g) || []).length >= 7);
  assert.ok((ui.match(/project\.restored/g) || []).length >= 7);
});
