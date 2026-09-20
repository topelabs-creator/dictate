function splitIntoParagraphs(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n+/)
    .map(part => part.trim())
    .filter(Boolean);
}
function tokenize(text) { return text.trim().split(/\s+/).filter(Boolean); }
function detectStructure(lines) {
  const markers = []; let tokenIndex = 0;
  lines.forEach((rawLine, index) => {
    const line = rawLine.trim(); const nextEmpty = !lines[index + 1]?.trim();
    if (!line) return;
    let type = 'normal'; let text = line;
    if (line.startsWith('## ')) { type = 'subtitle'; text = line.slice(3).trim(); }
    else if (line.startsWith('# ')) { type = 'title'; text = line.slice(2).trim(); }
    else if ((line.length <= 10 && nextEmpty) || (/\p{Lu}/u.test(line) && !/\p{Ll}/u.test(line) && line.length <= 50)) type = 'title';
    else if (line.endsWith(':') && nextEmpty) type = 'subtitle';
    markers.push({ index: tokenIndex, type, text }); tokenIndex += tokenize(rawLine).length;
  });
  return markers;
}
function createGroups(tokens, wordsPerGroup, structure = []) {
  const size = Math.max(1, Math.min(10, Number(wordsPerGroup) || 3));
  return Array.from({ length: Math.ceil(tokens.length / size) }, (_, index) => {
    const start = index * size; const words = tokens.slice(start, start + size); const end = start + words.length - 1;
    const markers = structure.filter(marker => marker.index >= start && marker.index <= end);
    return { index, words, rawText: words.join(' '), hasTitle: markers.some(marker => marker.type === 'title'), hasSubtitle: markers.some(marker => marker.type === 'subtitle'), startTokenIndex: start, endTokenIndex: end };
  });
}
const SPEECH_SYMBOLS = {
  en: { '@':'at', '#':'hash', '%':'percent', '&':'and', '+':'plus', '=':'equals', '×':'times', '*':'asterisk', '÷':'divided by', '≠':'not equal to', '<':'less than', '>':'greater than', '≤':'less than or equal to', '≥':'greater than or equal to', '±':'plus or minus', '‰':'per mille', '√':'square root', '∞':'infinity', '^':'caret', '$':'dollar', '€':'euro', '£':'pound', '¥':'yen', '₹':'rupee', '₽':'ruble', '₿':'bitcoin', '¢':'cent', '/':'slash', '\\':'backslash', '|':'vertical bar', '•':'bullet', '→':'right arrow', '←':'left arrow', '↑':'up arrow', '↓':'down arrow', '↔':'left right arrow', '⇒':'implies', '⇐':'implied by' },
  pt: { '@':'arroba', '#':'cerquilha', '%':'por cento', '&':'e', '+':'mais', '=':'igual', '×':'vezes', '*':'asterisco', '÷':'dividido por', '≠':'diferente de', '<':'menor que', '>':'maior que', '≤':'menor ou igual a', '≥':'maior ou igual a', '±':'mais ou menos', '‰':'por mil', '√':'raiz quadrada', '∞':'infinito', '^':'acento circunflexo', '$':'dólar', '€':'euro', '£':'libra', '¥':'iene', '₹':'rúpia', '₽':'rublo', '₿':'bitcoin', '¢':'centavo', '/':'barra', '\\':'barra invertida', '|':'barra vertical', '•':'marcador', '→':'seta para a direita', '←':'seta para a esquerda', '↑':'seta para cima', '↓':'seta para baixo', '↔':'seta dupla', '⇒':'implica', '⇐':'é implicado por' },
  fr: { '@':'arobase', '#':'dièse', '%':'pour cent', '&':'et', '+':'plus', '=':'égal', '×':'fois', '*':'astérisque', '÷':'divisé par', '≠':'différent de', '<':'inférieur à', '>':'supérieur à', '≤':'inférieur ou égal à', '≥':'supérieur ou égal à', '±':'plus ou moins', '‰':'pour mille', '√':'racine carrée', '∞':'infini', '^':'accent circonflexe', '$':'dollar', '€':'euro', '£':'livre', '¥':'yen', '₹':'roupie', '₽':'rouble', '₿':'bitcoin', '¢':'centime', '/':'barre oblique', '\\':'barre oblique inversée', '|':'barre verticale', '•':'puce', '→':'flèche droite', '←':'flèche gauche', '↑':'flèche vers le haut', '↓':'flèche vers le bas', '↔':'double flèche', '⇒':'implique', '⇐':'implique inversement' },
  es: { '@':'arroba', '#':'almohadilla', '%':'por ciento', '&':'y', '+':'más', '=':'igual', '×':'por', '*':'asterisco', '÷':'dividido por', '≠':'distinto de', '<':'menor que', '>':'mayor que', '≤':'menor o igual que', '≥':'mayor o igual que', '±':'más o menos', '‰':'por mil', '√':'raíz cuadrada', '∞':'infinito', '^':'acento circunflejo', '$':'dólar', '€':'euro', '£':'libra', '¥':'yen', '₹':'rupia', '₽':'rublo', '₿':'bitcoin', '¢':'centavo', '/':'barra', '\\':'barra invertida', '|':'barra vertical', '•':'viñeta', '→':'flecha derecha', '←':'flecha izquierda', '↑':'flecha arriba', '↓':'flecha abajo', '↔':'flecha doble', '⇒':'implica', '⇐':'implicado por' },
  de: { '@':'at', '#':'Raute', '%':'Prozent', '&':'und', '+':'plus', '=':'gleich', '×':'mal', '*':'Sternchen', '÷':'geteilt durch', '≠':'ungleich', '<':'kleiner als', '>':'größer als', '≤':'kleiner oder gleich', '≥':'größer oder gleich', '±':'plus oder minus', '‰':'Promille', '√':'Quadratwurzel', '∞':'unendlich', '^':'Zirkumflex', '$':'Dollar', '€':'Euro', '£':'Pfund', '¥':'Yen', '₹':'Rupie', '₽':'Rubel', '₿':'Bitcoin', '¢':'Cent', '/':'Schrägstrich', '\\':'umgekehrter Schrägstrich', '|':'senkrechter Strich', '•':'Aufzählungspunkt', '→':'Pfeil rechts', '←':'Pfeil links', '↑':'Pfeil nach oben', '↓':'Pfeil nach unten', '↔':'Doppelpfeil', '⇒':'impliziert', '⇐':'wird impliziert von' },
  it: { '@':'chiocciola', '#':'cancelletto', '%':'percento', '&':'e', '+':'più', '=':'uguale', '×':'per', '*':'asterisco', '÷':'diviso per', '≠':'diverso da', '<':'minore di', '>':'maggiore di', '≤':'minore o uguale a', '≥':'maggiore o uguale a', '±':'più o meno', '‰':'per mille', '√':'radice quadrata', '∞':'infinito', '^':'accento circonflesso', '$':'dollaro', '€':'euro', '£':'sterlina', '¥':'yen', '₹':'rupia', '₽':'rublo', '₿':'bitcoin', '¢':'centesimo', '/':'barra', '\\':'barra inversa', '|':'barra verticale', '•':'punto elenco', '→':'freccia destra', '←':'freccia sinistra', '↑':'freccia su', '↓':'freccia giù', '↔':'doppia freccia', '⇒':'implica', '⇐':'è implicato da' },
  ru: { '@':'собака', '#':'решётка', '%':'процент', '&':'и', '+':'плюс', '=':'равно', '×':'умножить на', '*':'звёздочка', '÷':'делённое на', '≠':'не равно', '<':'меньше', '>':'больше', '≤':'меньше или равно', '≥':'больше или равно', '±':'плюс-минус', '‰':'промилле', '√':'квадратный корень', '∞':'бесконечность', '^':'карет', '$':'доллар', '€':'евро', '£':'фунт', '¥':'йена', '₹':'рупия', '₽':'рубль', '₿':'биткоин', '¢':'цент', '/':'косая черта', '\\':'обратная косая черта', '|':'вертикальная черта', '•':'маркер', '→':'стрелка вправо', '←':'стрелка влево', '↑':'стрелка вверх', '↓':'стрелка вниз', '↔':'двунаправленная стрелка', '⇒':'следует', '⇐':'обратное следствие' }
};
const SPEECH_SYMBOL_PATTERN = /[@#%&+*=×÷≠<>≤≥±‰√∞^$€£¥₹₽₿¢/\\|•→←↑↓↔⇒⇐]/g;
const SPEECH_PUNCTUATION = { en:{',':'comma','.':'period',';':'semicolon',':':'colon','!':'exclamation mark','?':'question mark','…':'ellipsis','"':'quote','(':'open parenthesis',')':'close parenthesis','[':'open bracket',']':'close bracket','{':'open brace','}':'close brace','-':'dash','–':'dash','—':'dash'}, pt:{',':'vírgula','.':'ponto',';':'ponto e vírgula',':':'dois pontos','!':'exclamação','?':'interrogação','…':'reticências','"':'aspas','(':'abre parênteses',')':'fecha parênteses','[':'abre colchete',']':'fecha colchete','{':'abre chave','}':'fecha chave','-':'hífen','–':'travessão','—':'travessão'}, fr:{',':'virgule','.':'point',';':'point-virgule',':':'deux-points','!':'exclamation','?':'interrogation','…':'points de suspension','"':'guillemet','(':'parenthèse ouvrante',')':'parenthèse fermante','[':'crochet ouvrant',']':'crochet fermant','{':'accolade ouvrante','}':'accolade fermante','-':'tiret','–':'tiret','—':'tiret'}, es:{',':'coma','.':'punto',';':'punto y coma',':':'dos puntos','!':'exclamación','?':'interrogación','…':'puntos suspensivos','"':'comillas','(':'paréntesis abierto',')':'paréntesis cerrado','[':'corchete abierto',']':'corchete cerrado','{':'llave abierta','}':'llave cerrada','-':'guion','–':'raya','—':'raya'}, de:{',':'Komma','.':'Punkt',';':'Semikolon',':':'Doppelpunkt','!':'Ausrufezeichen','?':'Fragezeichen','…':'Auslassungspunkte','"':'Anführungszeichen','(':'öffnende Klammer',')':'schließende Klammer','[':'eckige Klammer auf',']':'eckige Klammer zu','{':'geschweifte Klammer auf','}':'geschweifte Klammer zu','-':'Bindestrich','–':'Gedankenstrich','—':'Gedankenstrich'}, it:{',':'virgola','.':'punto',';':'punto e virgola',':':'due punti','!':'esclamativo','?':'interrogativo','…':'puntini di sospensione','"':'virgolette','(':'parentesi aperta',')':'parentesi chiusa','[':'parentesi quadra aperta',']':'parentesi quadra chiusa','{':'graffa aperta','}':'graffa chiusa','-':'trattino','–':'lineetta','—':'lineetta'}, ru:{',':'запятая','.':'точка',';':'точка с запятой',':':'двоеточие','!':'восклицательный знак','?':'вопросительный знак','…':'многоточие','"':'кавычки','(':'открывающая скобка',')':'закрывающая скобка','[':'открывающая квадратная скобка',']':'закрывающая квадратная скобка','{':'открывающая фигурная скобка','}':'закрывающая фигурная скобка','-':'дефис','–':'тире','—':'тире'}};
const SPEECH_PUNCTUATION_PATTERN = /[,.;:!?…"()[\]{}\-–—]/g;
function speechLanguage(language) { return String(language || 'en').toLowerCase().split('-')[0]; }
function normalizeSpeechNumbers(value, language) {
  const locale = speechLanguage(language);
  const decimalSeparator = locale === 'en' ? '.' : ',';
  return value.replace(/\b(\d+)\.(\d+)\b/g, (_, whole, fraction) => `${whole}${decimalSeparator}${fraction}`)
    .replace(/\b(\d{1,2}):(\d{2})\b/g, (_, hour, minute) => `${hour} ${locale === 'en' ? 'oh' : ''} ${minute}`.replace(/\s+/g, ' ').trim())
    .replace(/\b(\d+)\s*\/\s*(\d+)\b/g, (_, numerator, denominator) => `${numerator} ${locale === 'en' ? 'over' : locale === 'pt' ? 'sobre' : locale === 'fr' ? 'sur' : locale === 'es' ? 'sobre' : locale === 'de' ? 'durch' : locale === 'it' ? 'su' : 'делить на'} ${denominator}`);
}
function prepareSpeechUnits(text, isTitle, isSubtitle, language = 'en') {
  const names = SPEECH_SYMBOLS[speechLanguage(language)] || SPEECH_SYMBOLS.en;
  const punctuation = SPEECH_PUNCTUATION[speechLanguage(language)] || SPEECH_PUNCTUATION.en;
  const normalizedText = normalizeSpeechNumbers(text, language);
  const units = []; let lastIndex = 0; let match; const pattern = new RegExp(`${SPEECH_SYMBOL_PATTERN.source}|${SPEECH_PUNCTUATION_PATTERN.source}`, 'g');
  while ((match = pattern.exec(normalizedText))) {
    const before = normalizedText.slice(lastIndex, match.index).replace(/[\p{S}\p{C}]/gu, '').replace(/\s+/g, ' ').trim();
    if (before) units.push({ text: before, pauseBefore: 0 });
    if (names[match[0]] || punctuation[match[0]]) units.push({ text: names[match[0]] || punctuation[match[0]], pauseBefore: 300 });
    lastIndex = match.index + match[0].length;
  }
  const after = normalizedText.slice(lastIndex).replace(/[\p{S}\p{C}]/gu, '').replace(/\s+/g, ' ').trim();
  if (after) units.push({ text: after, pauseBefore: 0 });
  if (!units.length) units.push({ text: text.replace(/\s+/g, ' ').trim(), pauseBefore: 0 });
  return units.map(unit => ({ ...unit, text: unit.text.replace(/\.\.\./g, '...').trim() })).filter(unit => unit.text);
}
function transformForTTS(text, isTitle, isSubtitle, language = 'en') {
  return prepareSpeechUnits(text, isTitle, isSubtitle, language).map(unit => unit.text).join(' ');
}
let languagePromise;
async function detectLanguage(text) {
  if (!languagePromise) languagePromise = import('https://cdn.jsdelivr.net/npm/franc-min@6/+esm').catch(() => null);
  const module = await languagePromise; const code = module?.franc?.(text.slice(0, 200));
  return ({ por:'pt', eng:'en', fra:'fr', spa:'es', deu:'de', ita:'it', rus:'ru' })[code] || (navigator.language || 'en').slice(0,2);
}
async function extractTXT(file) {
  const readWithFileReader = () => new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result || '')); reader.onerror = () => reject(reader.error || new Error('Could not read the text file.')); reader.readAsText(file); });
  let text = typeof file.text === 'function' ? await file.text() : '';
  if (!String(text || '').trim()) text = await readWithFileReader();
  return { text, structure: [] };
}
let pdfPromise; async function extractPDF(arrayBuffer) { if (!pdfPromise) pdfPromise = import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4/+esm'); const pdfjs = await pdfPromise; pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4/build/pdf.worker.min.mjs'; const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise; let text = ''; for (let pageNo=1; pageNo<=pdf.numPages; pageNo++) { const page = await pdf.getPage(pageNo); const content = await page.getTextContent(); text += `${content.items.map(item => item.str).join(' ')}\n`; } return { text, structure: [] }; }
let docxPromise;
function loadDocxLibrary() { if (docxPromise) return docxPromise; docxPromise = new Promise((resolve, reject) => { if (window.mammoth?.extractRawText) return resolve(window.mammoth); const script = document.createElement('script'); script.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.11.0/mammoth.browser.min.js'; script.onload = () => window.mammoth?.extractRawText ? resolve(window.mammoth) : reject(new Error('The DOCX parser loaded without its extraction API.')); script.onerror = () => reject(new Error('Could not load the DOCX parser. Check your internet connection and try again.')); document.head.append(script); }); return docxPromise; }
async function extractDOCX(arrayBuffer) { if (!arrayBuffer?.byteLength) throw new Error('The DOCX file is empty.'); const mammoth = await loadDocxLibrary(); try { const result = await mammoth.extractRawText({ arrayBuffer }); return { text: result?.value || '', structure: [] }; } catch (error) { throw new Error(`Could not read this DOCX file. It may be corrupted or password-protected. ${error.message || ''}`.trim()); } }
