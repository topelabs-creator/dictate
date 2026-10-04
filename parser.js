function splitIntoParagraphs(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n+/)
    .map(part => part.trim())
    .filter(Boolean);
}
function tokenize(text) { return text.trim().split(/\s+/).filter(Boolean); }
function normalizeRichTextColor(value) {
  const next = String(value || '').trim().toLowerCase();
  if (!next) return null;
  if (next.startsWith('#')) return next;
  const names = {
    red: '#ff0000',
    blue: '#0000ff',
    green: '#00aa00',
    yellow: '#ffff00',
    orange: '#ff9900',
    purple: '#8000ff',
    pink: '#ff66cc',
    black: '#000000',
    white: '#ffffff',
    gray: '#808080',
    grey: '#808080'
  };
  return names[next] || next;
}
function richTextStyleCue(style = {}) {
  const cues = [];
  const background = normalizeRichTextColor(style.backgroundColor);
  const foreground = normalizeRichTextColor(style.color);
  const underline = Boolean(style.underline);
  if (background || foreground) {
    const color = background || foreground;
    const name = color === '#ff0000' ? 'red' : color === '#0000ff' ? 'blue' : color === '#00aa00' ? 'green' : color === '#ffff00' ? 'yellow' : color === '#ff9900' ? 'orange' : color === '#8000ff' ? 'purple' : color === '#ff66cc' ? 'pink' : color === '#000000' ? 'black' : color === '#ffffff' ? 'white' : color === '#808080' ? 'gray' : String(color).replace(/^#/, '');
    cues.push('highlighted');
    if (name) cues.push(`in ${name}`);
  } else if (foreground && !background) {
    const name = foreground === '#0000ff' ? 'blue' : String(foreground).replace(/^#/, '');
    cues.push('highlighted');
    if (name) cues.push(`in ${name}`);
  }
  if (underline) cues.push('underline');
  if (style.strikethrough) cues.push('strikethrough');
  return cues.join(' ');
}
function convertRichTextToSpeechText(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return '';
  const stripHtml = html => html.replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<script[\s\S]*?<\/script>/gi, ' ');
  const styleName = color => {
    const value = normalizeRichTextColor(color);
    if (!value) return null;
    const map = {
      '#ff0000': 'red',
      '#0000ff': 'blue',
      '#00aa00': 'green',
      '#ffff00': 'yellow',
      '#ff9900': 'orange',
      '#8000ff': 'purple',
      '#ff66cc': 'pink',
      '#000000': 'black',
      '#ffffff': 'white',
      '#808080': 'gray',
      'red': 'red',
      'blue': 'blue'
    };
    return map[value] || String(value).replace(/^#/, '');
  };
  const describeStyle = styleText => {
    const style = {};
    styleText.split(';').forEach(pair => {
      const [key, ...rest] = String(pair).split(':');
      if (!key || !rest.length) return;
      const property = key.trim().toLowerCase();
      const value = rest.join(':').trim();
      if (!value) return;
      if (property === 'background-color') style.backgroundColor = value;
      if (property === 'color') style.color = value;
      if (property === 'text-decoration' || property === 'text-decoration-line') style.underline = /underline/i.test(value);
    });
    const cue = richTextStyleCue(style);
    return cue;
  };
  const html = stripHtml(raw);
  let text = html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?(p|div|li|h[1-6]|tr|table|ul|ol)[^>]*>/gi, '\n').replace(/<\/?(td|th)[^>]*>/gi, ' table cell ');
  text = text.replace(/<img\b[^>]*>/gi, ' diagram omitted ');
  text = text.replace(/<span\b([^>]*)style=(['"])(.*?)\2([^>]*)>([\s\S]*?)<\/span>/gi, (match, before, quote, styleText, after, inner) => {
    const cue = describeStyle(styleText);
    const plain = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return cue ? `${cue} ${plain}` : plain;
  });
  text = text.replace(/<u\b[^>]*>([\s\S]*?)<\/u>/gi, 'underline $1');
  text = text.replace(/<font\b[^>]*color=(['"])(.*?)\1[^>]*>([\s\S]*?)<\/font>/gi, (_, __, color, inner) => `highlighted in ${styleName(color)} ${inner}`);
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/\s+\n/g, '\n').replace(/\n\s+/g, '\n').replace(/\s{2,}/g, ' ').trim();
  return text || raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
function detectStructure(lines) {
  const markers = []; let tokenIndex = 0; let previousLineHadText = false; let blankLinePending = false;
  lines.forEach((rawLine, index) => {
    const line = rawLine.trim(); const nextEmpty = !lines[index + 1]?.trim();
    if (!line) {
      if (previousLineHadText && tokenIndex > 0) blankLinePending = true;
      previousLineHadText = false;
      return;
    }
    if (previousLineHadText) markers.push({ index: tokenIndex, type: 'lineBreak' });
    if (blankLinePending) {
      markers.push({ index: tokenIndex, type: 'paragraphBreak' });
      blankLinePending = false;
    }
    let type = 'normal'; let text = line;
    if (line.startsWith('## ')) { type = 'subtitle'; text = line.slice(3).trim(); }
    else if (line.startsWith('# ')) { type = 'title'; text = line.slice(2).trim(); }
    else if ((line.length <= 10 && nextEmpty) || (/\p{Lu}/u.test(line) && !/\p{Ll}/u.test(line) && line.length <= 50)) type = 'title';
    else if (line.endsWith(':') && nextEmpty) type = 'subtitle';
    markers.push({ index: tokenIndex, type, text }); tokenIndex += tokenize(rawLine).length;
    previousLineHadText = true;
  });
  return markers;
}
function createGroups(tokens, wordsPerGroup, structure = []) {
  const size = Math.max(1, Math.min(10, Number(wordsPerGroup) || 3));
  const lineBreaks = new Set(structure.filter(marker => marker.type === 'lineBreak').map(marker => marker.index));
  const paragraphBreaks = new Set(structure.filter(marker => marker.type === 'paragraphBreak').map(marker => marker.index));
  const boundaries = [...new Set([...lineBreaks, ...paragraphBreaks])].sort((left, right) => left - right);
  const titleMarkers = new Set(structure.filter(marker => marker.type === 'title').map(marker => marker.index));
  const subtitleMarkers = new Set(structure.filter(marker => marker.type === 'subtitle').map(marker => marker.index));
  const groups = [];
  let start = 0;
  while (start < tokens.length) {
    let end = Math.min(start + size, tokens.length);
    const boundary = boundaries.find(index => index > start && index < end);
    if (boundary !== undefined) end = boundary;
    const words = tokens.slice(start, end);
    let hasTitle = false;
    let hasSubtitle = false;
    for (const markerIndex of titleMarkers) {
      if (markerIndex >= start && markerIndex < end) { hasTitle = true; break; }
    }
    for (const markerIndex of subtitleMarkers) {
      if (markerIndex >= start && markerIndex < end) { hasSubtitle = true; break; }
    }
    groups.push({
      index: groups.length,
      words,
      rawText: words.join(' '),
      hasTitle,
      hasSubtitle,
      lineBreakBefore: lineBreaks.has(start),
      paragraphBreakBefore: paragraphBreaks.has(start),
      startTokenIndex: start,
      endTokenIndex: end - 1
    });
    start = end;
  }
  return groups;
}
const SPEECH_SYMBOLS = {
  en: { '@':'at sign', '#':'hash', '%':'percent', '&':'and', '+':'plus', '=':'equals', '×':'times', '*':'asterisk', '÷':'divided by', '≠':'not equal to', '<':'less than', '>':'greater than', '≤':'less than or equal to', '≥':'greater than or equal to', '±':'plus or minus', '‰':'per mille', '√':'square root', '∞':'infinity', '^':'caret', '$':'dollar', '€':'euro', '£':'pound', '¥':'yen', '₹':'rupee', '₽':'ruble', '₿':'bitcoin', '¢':'cent', '/':'slash', '\\':'backslash', '|':'vertical bar', '•':'bullet', '→':'right arrow', '←':'left arrow', '↑':'up arrow', '↓':'down arrow', '↔':'left-right arrow', '⇒':'implies', '⇐':'is implied by' },
  pt: { '@':'arroba', '#':'cerquilha', '%':'por cento', '&':'e', '+':'mais', '=':'igual', '×':'vezes', '*':'asterisco', '÷':'dividido por', '≠':'diferente de', '<':'menor que', '>':'maior que', '≤':'menor ou igual a', '≥':'maior ou igual a', '±':'mais ou menos', '‰':'por mil', '√':'raiz quadrada', '∞':'infinito', '^':'acento circunflexo', '$':'dólar', '€':'euro', '£':'libra', '¥':'iene', '₹':'rúpia', '₽':'rublo', '₿':'bitcoin', '¢':'centavo', '/':'barra', '\\':'barra invertida', '|':'barra vertical', '•':'marcador', '→':'seta para a direita', '←':'seta para a esquerda', '↑':'seta para cima', '↓':'seta para baixo', '↔':'seta dupla', '⇒':'implica', '⇐':'é implicado por' },
  fr: { '@':'arobase', '#':'dièse', '%':'pour cent', '&':'et', '+':'plus', '=':'égal', '×':'fois', '*':'astérisque', '÷':'divisé par', '≠':'différent de', '<':'inférieur à', '>':'supérieur à', '≤':'inférieur ou égal à', '≥':'supérieur ou égal à', '±':'plus ou moins', '‰':'pour mille', '√':'racine carrée', '∞':'infini', '^':'accent circonflexe', '$':'dollar', '€':'euro', '£':'livre', '¥':'yen', '₹':'roupie', '₽':'rouble', '₿':'bitcoin', '¢':'centime', '/':'barre oblique', '\\':'barre oblique inversée', '|':'barre verticale', '•':'puce', '→':'flèche droite', '←':'flèche gauche', '↑':'flèche vers le haut', '↓':'flèche vers le bas', '↔':'double flèche', '⇒':'implique', '⇐':'implique inversement' },
  es: { '@':'arroba', '#':'almohadilla', '%':'por ciento', '&':'y', '+':'más', '=':'igual', '×':'por', '*':'asterisco', '÷':'dividido por', '≠':'distinto de', '<':'menor que', '>':'mayor que', '≤':'menor o igual que', '≥':'mayor o igual que', '±':'más o menos', '‰':'por mil', '√':'raíz cuadrada', '∞':'infinito', '^':'acento circunflejo', '$':'dólar', '€':'euro', '£':'libra', '¥':'yen', '₹':'rupia', '₽':'rublo', '₿':'bitcoin', '¢':'centavo', '/':'barra', '\\':'barra invertida', '|':'barra vertical', '•':'viñeta', '→':'flecha derecha', '←':'flecha izquierda', '↑':'flecha arriba', '↓':'flecha abajo', '↔':'flecha doble', '⇒':'implica', '⇐':'implicado por' },
  de: { '@':'At-Zeichen', '#':'Raute', '%':'Prozent', '&':'und', '+':'plus', '=':'gleich', '×':'mal', '*':'Sternchen', '÷':'geteilt durch', '≠':'ungleich', '<':'kleiner als', '>':'größer als', '≤':'kleiner oder gleich', '≥':'größer oder gleich', '±':'plus oder minus', '‰':'Promille', '√':'Quadratwurzel', '∞':'unendlich', '^':'Zirkumflex', '$':'Dollar', '€':'Euro', '£':'Pfund', '¥':'Yen', '₹':'Rupie', '₽':'Rubel', '₿':'Bitcoin', '¢':'Cent', '/':'Schrägstrich', '\\':'umgekehrter Schrägstrich', '|':'senkrechter Strich', '•':'Aufzählungspunkt', '→':'Pfeil nach rechts', '←':'Pfeil nach links', '↑':'Pfeil nach oben', '↓':'Pfeil nach unten', '↔':'Doppelpfeil', '⇒':'daraus folgt', '⇐':'daraus folgt umgekehrt' },
  it: { '@':'chiocciola', '#':'cancelletto', '%':'percento', '&':'e commerciale', '+':'più', '=':'uguale', '×':'per', '*':'asterisco', '÷':'diviso per', '≠':'diverso da', '<':'minore di', '>':'maggiore di', '≤':'minore o uguale a', '≥':'maggiore o uguale a', '±':'più o meno', '‰':'per mille', '√':'radice quadrata', '∞':'infinito', '^':'accento circonflesso', '$':'dollaro', '€':'euro', '£':'sterlina', '¥':'yen', '₹':'rupia', '₽':'rublo', '₿':'bitcoin', '¢':'centesimo', '/':'barra', '\\':'barra inversa', '|':'barra verticale', '•':'punto elenco', '→':'freccia verso destra', '←':'freccia verso sinistra', '↑':'freccia verso l’alto', '↓':'freccia verso il basso', '↔':'doppia freccia', '⇒':'implica', '⇐':'è implicato da' },
  ru: { '@':'собака', '#':'решётка', '%':'процент', '&':'амперсанд', '+':'плюс', '=':'равно', '×':'умножить на', '*':'звёздочка', '÷':'делённое на', '≠':'не равно', '<':'меньше', '>':'больше', '≤':'меньше или равно', '≥':'больше или равно', '±':'плюс-минус', '‰':'промилле', '√':'квадратный корень', '∞':'бесконечность', '^':'знак вставки', '$':'доллар', '€':'евро', '£':'фунт', '¥':'йена', '₹':'рупия', '₽':'рубль', '₿':'биткоин', '¢':'цент', '/':'косая черта', '\\':'обратная косая черта', '|':'вертикальная черта', '•':'маркер списка', '→':'стрелка вправо', '←':'стрелка влево', '↑':'стрелка вверх', '↓':'стрелка вниз', '↔':'двунаправленная стрелка', '⇒':'отсюда следует', '⇐':'обратное следствие' }
};
const ADDITIONAL_SPEECH_SYMBOLS = {
  en: { '~':'tilde', '_':'underscore', '`':'backtick', '¬':'logical not', '©':'copyright', '®':'registered trademark', '™':'trademark', '°':'degrees', '§':'section sign', '¶':'paragraph sign', '✓':'check mark', '✗':'cross mark', '★':'star' },
  pt: { '~':'til', '_':'sublinhado', '`':'acento grave', '¬':'negação lógica', '©':'direitos autorais', '®':'marca registrada', '™':'marca comercial', '°':'graus', '§':'símbolo de seção', '¶':'símbolo de parágrafo', '✓':'marca de verificação', '✗':'xis', '★':'estrela' },
  fr: { '~':'tilde', '_':'tiret bas', '`':'accent grave', '¬':'négation logique', '©':'droit d’auteur', '®':'marque déposée', '™':'marque commerciale', '°':'degrés', '§':'signe de section', '¶':'signe de paragraphe', '✓':'coche', '✗':'croix', '★':'étoile' },
  es: { '~':'virgulilla', '_':'guion bajo', '`':'acento grave', '¬':'negación lógica', '©':'derechos de autor', '®':'marca registrada', '™':'marca comercial', '°':'grados', '§':'signo de sección', '¶':'signo de párrafo', '✓':'marca de verificación', '✗':'equis', '★':'estrella' },
  de: { '~':'Tilde', '_':'Unterstrich', '`':'Gravis', '¬':'logische Negation', '©':'Urheberrecht', '®':'eingetragenes Warenzeichen', '™':'Markenzeichen', '°':'Grad', '§':'Paragraphenzeichen', '¶':'Absatzzeichen', '✓':'Häkchen', '✗':'Kreuz', '★':'Stern' },
  it: { '~':'tilde', '_':'trattino basso', '`':'accento grave', '¬':'negazione logica', '©':'diritto d’autore', '®':'marchio registrato', '™':'marchio commerciale', '°':'gradi', '§':'simbolo di sezione', '¶':'simbolo di paragrafo', '✓':'segno di spunta', '✗':'croce', '★':'stella' },
  ru: { '~':'тильда', '_':'нижнее подчёркивание', '`':'обратная кавычка', '¬':'логическое отрицание', '©':'авторское право', '®':'зарегистрированный товарный знак', '™':'товарный знак', '°':'градус', '§':'параграф', '¶':'абзац', '✓':'галочка', '✗':'крестик', '★':'звезда' }
};
for (const language of Object.keys(SPEECH_SYMBOLS)) Object.assign(SPEECH_SYMBOLS[language], ADDITIONAL_SPEECH_SYMBOLS[language]);
const SPEECH_SYMBOL_PATTERN = /[@#%&+*=×÷≠<>≤≥±‰√∞^$€£¥₹₽₿¢/\\|•→←↑↓↔⇒⇐~_`¬©®™°§¶✓✗★]/g;
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
let pdfPromise; async function extractPDF(arrayBuffer) { if (!pdfPromise) pdfPromise = import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4/+esm'); const pdfjs = await pdfPromise; pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4/build/pdf.worker.min.mjs'; const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise; let pages = []; for (let pageNo=1; pageNo<=pdf.numPages; pageNo++) { const page = await pdf.getPage(pageNo); const content = await page.getTextContent(); let lines = []; let line = ''; let previousY = null; let previousHeight = 0; for (const item of content.items) { if (typeof item.str !== 'string') continue; const y = item.transform?.[5]; const height = Math.abs(item.height || 0); if (line && Number.isFinite(y) && Number.isFinite(previousY)) { const verticalGap = Math.abs(y - previousY); if (verticalGap > Math.max(4, Math.max(height, previousHeight) * 1.8)) { lines.push(`${line.trim()}\n`); line = ''; } else if (verticalGap > Math.max(2, Math.max(height, previousHeight) * .35)) { lines.push(line.trim()); line = ''; } } line += `${item.str}${item.hasEOL ? '' : ' '}`; previousY = y; previousHeight = height; if (item.hasEOL) { lines.push(line.trim()); line = ''; previousY = null; previousHeight = 0; } } if (line.trim()) lines.push(line.trim()); pages.push(lines.join('\n')); } return { text: pages.join('\n\n'), structure: [] }; }
let docxPromise;
function loadDocxLibrary() { if (docxPromise) return docxPromise; docxPromise = new Promise((resolve, reject) => { if (window.mammoth?.extractRawText) return resolve(window.mammoth); const script = document.createElement('script'); script.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.11.0/mammoth.browser.min.js'; script.onload = () => window.mammoth?.extractRawText ? resolve(window.mammoth) : reject(new Error('The DOCX parser loaded without its extraction API.')); script.onerror = () => reject(new Error('Could not load the DOCX parser. Check your internet connection and try again.')); document.head.append(script); }); return docxPromise; }
async function extractDOCX(arrayBuffer) { if (!arrayBuffer?.byteLength) throw new Error('The DOCX file is empty.'); const mammoth = await loadDocxLibrary(); try { const result = await mammoth.extractRawText({ arrayBuffer }); return { text: result?.value || '', structure: [] }; } catch (error) { throw new Error(`Could not read this DOCX file. It may be corrupted or password-protected. ${error.message || ''}`.trim()); } }
