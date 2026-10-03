import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const languages = ['en', 'pt', 'fr', 'es', 'de', 'it', 'ru'];

async function loadSpeechParser() {
  const source = await fs.readFile(path.join(root, 'parser.js'), 'utf8');
  const context = {};
  vm.runInNewContext(`${source}\nglobalThis.speechParserTestApi = { SPEECH_SYMBOLS, SPEECH_SYMBOL_PATTERN, SPEECH_PUNCTUATION, SPEECH_PUNCTUATION_PATTERN, prepareSpeechUnits };`, context);
  return context.speechParserTestApi;
}

test('every recognized speech symbol has a spoken mapping in all supported languages', async () => {
  const { SPEECH_SYMBOLS, SPEECH_SYMBOL_PATTERN, prepareSpeechUnits } = await loadSpeechParser();
  const symbols = [...new Set([...SPEECH_SYMBOL_PATTERN.source.matchAll(/\\(.)/g)].map(match => match[1]).concat([...SPEECH_SYMBOL_PATTERN.source.replace(/\\./g, '').replace(/[\[\]\\^$.*+?(){}|]/g, '')]))];
  assert.ok(symbols.length > 0);
  for (const language of languages) {
    for (const symbol of symbols) {
      const spoken = SPEECH_SYMBOLS[language][symbol];
      assert.ok(spoken, `${language} is missing a pronunciation for ${symbol}`);
      assert.ok(prepareSpeechUnits(symbol, false, false, language).some(unit => unit.text === spoken), `${language} does not speak ${symbol} as ${spoken}`);
    }
  }
});

test('every punctuation character matched by the parser has a spoken mapping in all supported languages', async () => {
  const { SPEECH_PUNCTUATION, SPEECH_PUNCTUATION_PATTERN, prepareSpeechUnits } = await loadSpeechParser();
  const punctuation = [...new Set([...SPEECH_PUNCTUATION_PATTERN.source.matchAll(/\\(.)/g)].map(match => match[1]).concat([...SPEECH_PUNCTUATION_PATTERN.source.replace(/\\./g, '').replace(/[\[\]\\^$.*+?(){}|]/g, '')]))];
  for (const language of languages) {
    for (const mark of punctuation) {
      const spoken = SPEECH_PUNCTUATION[language][mark];
      assert.ok(spoken, `${language} is missing a pronunciation for punctuation ${mark}`);
      assert.ok(prepareSpeechUnits(mark, false, false, language).some(unit => unit.text === spoken), `${language} does not speak ${mark} as ${spoken}`);
    }
  }
});

test('common symbols formerly omitted from speech are now spoken', async () => {
  const { prepareSpeechUnits } = await loadSpeechParser();
  const checks = [
    ['en', 'mail@example.com', 'at'],
    ['pt', 'nota~_¬©®™°§¶✓✗★', 'negação'],
    ['pt', 'valor `teste`', 'acento grave']
  ];
  for (const [language, input, expected] of checks) {
    assert.ok(prepareSpeechUnits(input, false, false, language).some(unit => unit.text.includes(expected)));
  }
});

test('locale symbol names use natural terms for representative operators', async () => {
  const { SPEECH_SYMBOLS } = await loadSpeechParser();
  assert.equal(SPEECH_SYMBOLS.en['@'], 'at sign');
  assert.equal(SPEECH_SYMBOLS.de['@'], 'At-Zeichen');
  assert.equal(SPEECH_SYMBOLS.pt['¬'], 'negação lógica');
  assert.equal(SPEECH_SYMBOLS.ru['^'], 'знак вставки');
  assert.equal(SPEECH_SYMBOLS.de['⇒'], 'daraus folgt');
});