# DICTATE

DICTATE is a private, browser-first text-to-speech and study application. Paste notes, import a document, or create a listening project, then review the material in small spoken groups with adjustable speed, repetition, language, and pauses.

The project is a static web application. It has no application backend, accounts, build pipeline, or required installation. Projects and settings stay in the browser unless an optional external parser or speech fallback is used.

## What It Does

- Turns pasted notes, TXT files, PDFs, and DOCX files into listening sessions.
- Divides text into selectable groups of 1 to 10 words.
- Reads groups through the browser Web Speech API.
- Falls back to online speech audio when no compatible browser voice is available.
- Highlights the active reading group and supports previous, next, play, pause, and restart controls.
- Repeats groups from 1 to 10 times.
- Supports speech speeds from 0.25x to 2x.
- Supports a configurable pause of 0 to 3.5 seconds between groups and repetitions.
- Explains meaningful punctuation, symbols, numbers, times, decimals, and fractions for speech without changing visible text.
- Saves projects locally in IndexedDB and stores settings and drafts in localStorage.
- Exports saved projects to a versioned JSON backup and restores valid backups locally.
- Includes a built-in punctuation and symbol demonstration project.
- Includes a Voice Lab for testing and selecting available browser voices.
- Supports light, dark, and system themes.
- Works responsively on desktop, tablet, and mobile browsers.

## Project Structure

```text
DICTATOR.WEB/
├── index.html                 # SPA shell and metadata
├── README.md                  # Project documentation
├── 404.html                   # GitHub Pages deep-link fallback
├── _redirects                 # Cloudflare Pages SPA rewrite
├── _headers                   # Static security and cache headers
├── robots.txt                 # Crawler policy and sitemap location
├── sitemap.xml                # Public SEO URL inventory
├── favicon.png
├── styles.css                 # Complete responsive visual system
├── app.js                     # Settings, shell controls, and bootstrap
├── db.js                      # IndexedDB persistence
├── parser.js                  # Tokenizing, grouping, speech preparation, imports
├── router.js                  # Dual-mode client-side routing and metadata
├── tts.js                     # Browser speech and fallback audio controller
├── ui.js                      # Rendering, translations, forms, and reader UI
├── voice-lab.js               # Voice selection and preview enhancement
├── fix_routes.py              # One-off maintenance helper for route listeners
├── blogs/                     # SPA-compatible blog entry page
├── browser-text-to-speech-reader/
├── read-pdf-aloud-online/
├── read-notes-aloud/
├── student-dictation-tool/
├── about/
├── how-to-use/
├── privacy/
└── projects/
```

The route directories contain static entry pages for crawlers, direct links, and hosts that serve directory indexes. The main application shell remains `index.html`, and `router.js` renders the interactive route views.

## Run Locally

No dependencies need to be installed for the normal application.

From this directory, start a static server:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

An HTTP origin is recommended over opening the file directly because browser security rules are more reliable for dynamic PDF, DOCX, and language-detection imports.

## Dual URL Routing

DICTATE intentionally supports two URL modes so it is usable on hosts with different static-file behavior.

### Localhost and GitHub Pages: hash URLs

On `localhost`, `127.0.0.1`, and GitHub Pages hostnames, navigation uses hashes:

```text
http://localhost:8000/#/projects
https://account.github.io/DICTATOR/#/projects
```

Hash routes do not require the server to understand SPA paths. Reloading a route therefore does not ask a basic static server for a missing `/projects` file.

### Cloudflare Pages and custom domains: clean URLs

On Cloudflare Pages and other non-local, non-GitHub hosts, navigation uses clean paths:

```text
https://hustler512.github.io/DICTATOR/#/projects
https://hustler512.github.io/DICTATOR/#/blogs/read-pdf-aloud-online
```

When a visitor arrives with a legacy hash URL such as `#/projects`, the router automatically replaces it with `/projects` on a clean-URL host. This keeps the final deployment canonical and removes the hash from the address bar.

### Why both modes exist

The URL mode is selected by `router.js`:

- Localhost and GitHub Pages use `location.hash`.
- Cloudflare Pages and custom domains use `history.pushState` and `location.pathname`.
- All modes render the same UI and route names.

The browser router cannot by itself prevent a server from returning a 404 before JavaScript loads. The hosting fallback files are therefore part of the routing design.

### Language-aware public URLs

The current canonical deployment is GitHub Pages at `https://hustler512.github.io/DICTATOR/`. The `dictator.app` domain is not configured for this project, so it must not be used in canonical tags, sitemap entries, robots directives, or social metadata until it is actually connected to the deployment.

The public UI supports English (`en`), Portuguese (`pt`), French (`fr`), Spanish (`es`), German (`de`), Italian (`it`), and Russian (`ru`). On the canonical clean-URL host, locale paths are supported for shareable language pages:

```text
/pt/
/es/blogs
/fr/blogs/read-notes-aloud
```

An explicit locale in the URL takes precedence over the saved `localStorage` preference. Legacy links such as `?lang=pt` are normalized to the equivalent locale path. Localhost and GitHub Pages keep the hash routing policy, so the same routes use forms such as `/#/pt/blogs` and `/DICTATOR/#/pt/blogs` there.

The runtime updates `<html lang>`, page metadata, canonical URLs, Open Graph data, Twitter data, FAQ structured data, and `hreflang` annotations for the active locale. The indexed production source of truth should be the Cloudflare/custom-domain locale paths after deployment. Every supported locale has static landing and blog entry pages with localized SEO metadata and content; those pages bootstrap the same application shell as the English root so direct visits receive the full header, navigation, settings, editor, upload controls, and reader UI rather than a separate basic HTML experience.

The language selector writes the selected locale into the URL while preserving the current page. An explicit URL locale wins over the saved UI preference. Blog index cards, article calls to action, home SEO links, and navigation links are generated through the router so changing language never sends the visitor back to an English blog URL. On localhost and GitHub Pages the locale is part of the hash route, while Cloudflare/custom domains use the clean locale path.

Localized static entry pages fetch the current root shell with a versioned cache key, preserve the requested locale and route in the URL, and then let `router.js`, `ui.js`, and `app.js` render the interactive application. When changing browser-loaded JavaScript, increment the script query-string version in `index.html` and the static shell loaders so deployed pages do not execute stale routing or translation code.

## Hosting Configuration

### GitHub Pages

Keep `404.html` at the published site root. When GitHub Pages cannot find a deep route, the fallback stores the requested path and redirects to a hash route such as:

```text
/DICTATOR/#/privacy
```

The router restores and renders that route after `index.html` loads. The repository deployment path is currently `/DICTATOR`; change the `base` value in `404.html` and the GitHub Pages base-path logic in `router.js` if the repository name changes.

### Cloudflare Pages

The `_redirects` file contains:

```text
/* /index.html 200
```

This is a rewrite, not a browser redirect. Cloudflare serves the application shell for a clean route while keeping the requested URL visible. `router.js` then renders the correct page.

### Headers

`_headers` applies baseline static-host protections and caching:

- Denies framing with `X-Frame-Options: DENY`.
- Enables `X-Content-Type-Options: nosniff`.
- Uses a strict-origin-when-cross-origin referrer policy.
- Caches normal files for one hour and `/assets/*` for one year when that directory is used.

## Routes and SEO Pages

The application supports these route names:

| Route | Purpose |
| --- | --- |
| `/` | Home writing and import workspace |
| `/projects` | Local project library |
| `/project/<id>` | Reader for a saved project or the demo project |
| `/edit/<id>` | Edit a saved project through the Home editor |
| `/blogs` | Blog and product-guide index |
| `/blogs/browser-text-to-speech-reader` | Canonical browser text-to-speech reader guide |
| `/blogs/read-pdf-aloud-online` | Canonical PDF listening guide |
| `/blogs/read-notes-aloud` | Canonical note-listening and revision guide |
| `/blogs/student-dictation-tool` | Canonical student dictation and study guide |
| `/about` | Product purpose and local-first design |
| `/how-to-use` | Workflow instructions and FAQ content |
| `/privacy` | Storage, network, and privacy explanation |

The four blog pages are SEO-oriented product pages, not placeholder articles. Each has a localized title, introduction, use cases, workflow, FAQ section, and call to the main tool. The blog index links to all four pages.

The legacy root topic paths `/browser-text-to-speech-reader`, `/read-pdf-aloud-online`, `/read-notes-aloud`, and `/student-dictation-tool` redirect to their matching `/blogs/...` pages. This prevents duplicate SEO pages while preserving old links.

The router updates document metadata for the active route, including:

- Page title.
- Description and keyword metadata.
- Open Graph title, description, and URL.
- Twitter title and description.
- Canonical URL.
- FAQ structured data for the Home and blog intent pages.

The public SEO files complement the runtime metadata:

- `sitemap.xml` lists Home, Blogs, all four blog pages, About, Projects, Help, and Privacy.
- `robots.txt` permits crawling and points crawlers to the sitemap.
- `index.html` contains WebApplication structured data and social metadata.

The application interface and blog content support seven locales: English (`en`), Portuguese (`pt`), French (`fr`), Spanish (`es`), German (`de`), Italian (`it`), and Russian (`ru`). Each locale has localized Home, Blogs, and all four blog-page entry points, with locale-aware internal links and route metadata. The sitemap includes the public localized Home, Blogs, and blog-page URL matrix. Private project and edit routes are not included as localized SEO pages.

## Main User Workflow

1. Open Home and paste text or choose TXT, PDF, or DOCX.
2. Review the word count and source information.
3. Choose Start to create a local project.
4. Allow automatic language detection or select a default speech language.
5. Use the reader controls to change group size, repetitions, speed, pause, or voice.
6. Play the session and click a visible group to jump to it.
7. Return to Projects to reopen, rename, or delete saved sessions.

Draft text is periodically saved locally while it is being edited. A draft is restored when the Home editor is reopened and is removed after a project is successfully saved.

## Reader and Speech Behavior

`parser.js` separates visible text from speech preparation. The application keeps the original project text and group boundaries intact while creating speech-only units.

Speech preparation includes:

- Heading and subtitle detection from Markdown-like lines.
- Localized names for symbols such as `@`, `#`, `%`, `+`, `=`, arrows, currencies, and mathematical operators.
- Conservative handling of decimal numbers, clock-like values, and fractions.
- A 300 ms pause before each spoken symbol or punctuation unit.
- Removal of unsupported symbol/control characters from speech without removing them from the visible reader.

The browser voice controller ranks compatible voices by language, locale, natural-voice hints, local/remote availability, and saved voice preference. Voice lists may arrive asynchronously through `voiceschanged`.

During active browser playback, DICTATE uses a guarded ten-second speech keep-alive to reduce long-reading interruptions in browsers with Web Speech API timeout behavior. The timer runs only while the main reader is playing and is cleared whenever playback is paused, canceled, finished, or replaced.

If a compatible browser voice is unavailable, the optional fallback audio path can request speech from the configured external TTS URL. This requires network access and has different privacy characteristics from local browser speech.

## Settings and Localization

Settings are stored under `dictator_settings` in localStorage. Defaults are:

```js
{
  uiLanguage: 'auto',
  defaultDictationLang: 'auto',
  defaultWordsPerGroup: 6,
  defaultRepetitions: 2,
  defaultSpeed: 0.9,
  defaultPauseDuration: 0.8,
  theme: 'system'
}
```

The interface language and project speech language are independent. For example, the UI can be French while a project is spoken in Portuguese.

The translation registry covers navigation, settings, Home SEO copy, project management, reader controls, static pages, blog pages, and the localized built-in demo. Missing keys intentionally fall back to English.

## Storage Model

`db.js` uses IndexedDB database `DictatorDB` version 2.

- `projects` stores saved project records and progress.
- Legacy project `image` fields remain readable for backward compatibility, but the current UI does not create new image data.
- The legacy `voiceModels` IndexedDB store remains in place for existing databases; no active runtime code writes to it.
- Saved projects are normalized when read so older records receive current defaults and derived groups.
- The application allows up to 20 saved projects.
- The built-in demo is generated in memory and does not consume the project limit.
- Projects can be exported from the Projects view as a JSON backup and imported later on the same or another browser. Imported records are validated, normalized, and subject to the 20-project limit; backups do not leave the device unless the user explicitly moves the file.

The visible text, tokens, structure, groups, progress, source metadata, image data, and reader configuration are kept separate so speech improvements do not rewrite the user's content.

## Privacy and Network Model

Normal project creation, storage, and browser speech happen on the user's device. DICTATE has no application server and does not require an account.

Network requests may occur when:

- PDF.js is loaded from jsDelivr for PDF extraction.
- Mammoth is loaded from jsDelivr for DOCX extraction.
- `franc-min` is loaded from jsDelivr for automatic language detection.
- The browser has no compatible voice and the online speech fallback is used.

For the most private and offline-friendly workflow, use TXT input with an installed browser voice. Clearing the site's browser storage removes local projects, drafts, settings, and saved voice preferences.

## Accessibility and Responsive Design

- Native buttons, inputs, selects, labels, and links are used for controls.
- Side panels expose `aria-hidden` state and close through the scrim or Escape.
- Toast messages use an `aria-live` region.
- The document language follows the selected UI locale.
- Reader controls remain keyboard-operable.
- Focus-visible outlines are styled in the application theme.
- The fixed reader footer receives responsive spacing on small screens.
- Reduced-motion preferences are respected in the stylesheet.

## Browser Limitations

- Speech voice availability depends on the browser and operating system.
- Voices may load asynchronously or differ between local and hosted environments.
- Some browsers require a user interaction before speech playback.
- Mobile browsers may pause speech when a tab is backgrounded or the screen locks.
- PDF, DOCX, language detection, and online fallback speech need network access.
- Browser storage quotas vary by device and browser.
- Text grouping is whitespace-based rather than a full linguistic segmentation system.
- Cloud synchronization, accounts, exports, and advanced CJK segmentation are not currently included.

## Validation Checklist

The project has no build step, but it includes a Node test runner. Validate changes with the automated suite, syntax checks, and a browser smoke test:

```bash
node --check app.js
node --check db.js
node --check parser.js
node --check router.js
node --check tts.js
node --check ui.js
node --check voice-lab.js
npm.cmd test
```

Then verify:

1. Home loads at `http://localhost:8000`.
2. Local navigation creates `/#/...` URLs and reloads safely.
3. A GitHub Pages deep link is recovered through `404.html`.
4. A Cloudflare clean route is rewritten to `index.html` and renders correctly after reload.
5. A legacy Cloudflare hash URL is converted to a clean URL.
6. Blog routes preserve the active locale, canonical metadata and `hreflang` values match that locale, FAQ schema is present, sitemap entries exist, and localized copy is rendered.
7. TXT, PDF, and DOCX imports work when their external libraries can load.
8. The demo speaks with symbols, punctuation, repetition, group pauses, and all supported speech languages.
9. Settings, drafts, projects, themes, and voice preferences persist after reload.
10. The browser console contains no runtime exceptions.

## Maintenance Notes

- Keep UI language separate from project speech language.
- Add new translation keys to every locale or provide an intentional fallback.
- Preserve visible text and stored group boundaries when changing speech preparation.
- Keep `404.html`, `_redirects`, `robots.txt`, and `sitemap.xml` synchronized with deployment and public routes.
- Update canonical and structured metadata when adding SEO pages.
- Increment the query-string version on a browser-loaded script after changing it if a deployment serves stale cached code.
- Keep PDF, DOCX, and language-detection imports lazy.
- Test both hash and clean URL modes after routing changes.
- Do not commit user-generated projects or browser storage data; they belong to the local browser profile.
