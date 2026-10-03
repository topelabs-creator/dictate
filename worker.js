export function normalizeLanguage(language) {
  const value = String(language || 'en').trim().toLowerCase().replace(/_/g, '-');
  return value || 'en';
}

export function mapVoiceForLanguage(language) {
  const normalized = normalizeLanguage(language);
  const base = normalized.split('-')[0] || 'en';
  const languageMap = {
    en: 'en-US',
    pt: 'pt-BR',
    fr: 'fr-FR',
    es: 'es-ES',
    de: 'de-DE',
    it: 'it-IT',
    ru: 'ru-RU'
  };
  return languageMap[base] || 'en-US';
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

async function fetchPublicTts(text, language) {
  const targetLanguage = mapVoiceForLanguage(language);
  const url = new URL('https://translate.google.com/translate_tts');
  url.searchParams.set('ie', 'UTF-8');
  url.searchParams.set('client', 'tw-ob');
  url.searchParams.set('tl', targetLanguage);
  url.searchParams.set('q', text);

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'audio/mpeg,*/*;q=0.8'
    }
  });

  if (!response.ok) return null;
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('audio') && !contentType.includes('mpeg')) {
    return null;
  }

  return await response.arrayBuffer();
}

async function handleTts(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Request body must be valid JSON.' }, 400);
  }

  const text = String(payload?.text || '').trim();
  const language = String(payload?.language || 'en');

  if (!text) {
    return jsonResponse({ error: 'Missing text input.' }, 400);
  }

  const audioBuffer = await fetchPublicTts(text, language);
  if (!audioBuffer) {
    return jsonResponse({
      error: 'No free public TTS fallback is available for this language right now. Browser speech remains the primary path.'
    }, 502);
  }

  return new Response(audioBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/tts') {
      return handleTts(request, env);
    }

    if (url.pathname === '/api/health') {
      return jsonResponse({ ok: true, freeFallback: true }, 200);
    }

    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  }
};
