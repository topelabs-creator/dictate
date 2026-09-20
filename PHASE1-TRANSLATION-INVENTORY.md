# Phase 1: Translation Inventory

Date: 2026-09-04
Project root: `DICTATOR.WEB`
Canonical host: `https://hustler512.github.io/DICTATOR`

## Scope

Supported locales are `en`, `pt`, `fr`, `es`, `de`, `it`, and `ru`.
The public indexable matrix is:

- Home
- Blogs index
- `browser-text-to-speech-reader`
- `read-pdf-aloud-online`
- `read-notes-aloud`
- `student-dictation-tool`

The project has two localization surfaces that must remain consistent:

1. Runtime JavaScript translations and SEO metadata.
2. Static HTML entry pages used before the application shell loads.

## Translation Surface Map

| Surface | Owner | Classification | Phase 1 status |
| --- | --- | --- | --- |
| Navigation and settings | `app.js` `UI_TEXT` | UI, CTA, navigation | Present for all seven locales |
| Home, projects, reader, about, help, privacy | `ui.js` `UI_TEXT` | UI and workflow | Present for all seven locales, with English fallback behavior |
| Blog article copy | `ui.js` `BLOG_ARTICLE_COPY` | Blog title, intro, bullets, FAQ, CTA | Present for all seven locales and four articles |
| Blog article fallback | `ui.js` `BLOG_ARTICLE_COPY` | SEO/blog fallback content | Shared localized article source |
| Workflow steps | `ui.js` `localizedHow` | Blog workflow content | Present for all seven locales |
| FAQ structured data | `router.js` `injectFaqSchema` | FAQ/schema SEO | Article schema now shares localized article FAQs |
| Voice Lab | `voice-lab.js` | Settings UI and technical voice labels | Present for all seven UI locales |
| Static entry pages | locale directories and root blog directories | Pre-JavaScript SEO/content | Present, but duplicated independently from runtime copy |
| Root shell metadata | `index.html` | SEO/technical | English baseline only; social-image metadata is intentionally out of scope |

## Static Page Matrix

Each non-English locale contains six static pages: home, blogs index, and four articles. The English tree contains the root plus English route entry pages and legacy topic entries. Static localized pages contain canonical and alternate metadata, with the expected eight alternate targets (`en`, six locale codes, and `x-default`) observed on the locale home entries.

Static entry pages bootstrap the root shell with a `fetch()` loader and preserve the requested locale/route in the URL. This means both the pre-JavaScript HTML and the runtime-rendered application are part of the translation contract.

## Confirmed Findings

### Resolved: Duplicate English fallback registry

The obsolete `INTENT_CONTENT` registry was removed. Article rendering now uses `BLOG_ARTICLE_COPY`, and the router can consume its localized FAQs.

### Resolved: FAQ schema/content mismatch

The router now derives article FAQ schema from the same localized article copy used by rendering.

### P1: Static/runtime parity is unverified

Static HTML and runtime copy are maintained separately. A localized static page can appear translated before JavaScript while the runtime page renders different wording after boot. No automated parity check currently exists.

### P2: Social metadata is intentionally out of scope

Social-image metadata and dedicated social-card assets are intentionally out of scope for Phase 1 and are not part of the translation or route-quality gate.

### Resolved: Active-host contact reference

The unapproved `hello@dictator.app` contact section was removed from the runtime About page.

### Resolved: Supported-locale boundary inconsistency

The Arabic preview string and public reader selector entry were removed. The project remains scoped to seven supported locales.

### Resolved: Russian terminology issue

The Russian Voice Lab label now uses `Голосовая лаборатория`.

### P3: Untranslated technical labels need policy

The following are candidates for an intentional technical allowlist rather than translation defects:

- `DICTATE`
- Locale codes such as `EN`, `PT`, and `RU`
- File extensions `TXT`, `PDF`, and `DOCX`
- `Web Speech API`
- `IndexedDB`
- `CDN`
- Browser and operating-system product names
- Email address syntax

Visible product actions, navigation, explanatory text, FAQs, metadata, and schema content are not allowlisted merely because they occur in technical pages.

## Phase 1 Classification Rules

- UI: controls, labels, status text, settings, navigation, dialogs, and empty states.
- SEO metadata: title, description, keywords, canonical, Open Graph, Twitter metadata, and `html[lang]`.
- Blog content: article title, intro, benefits, workflow, FAQ, and CTA copy.
- FAQ/schema: JSON-LD questions and answers; must match visible localized FAQ content.
- CTA/navigation: links and actions that must preserve the active locale.
- Technical fallback: browser/API/file terminology that is intentionally shared across locales.

## Required Phase 2 Gates

1. Every supported locale has the same runtime key and article-route coverage.
2. No localized runtime page uses English fallback content for user-facing copy.
3. Static entry content and runtime content use an approved shared source or a verified parity contract.
4. Visible FAQ content and FAQ JSON-LD contain the same localized questions and answers.
5. `dictator.app` references are explicitly approved or removed from public copy and metadata.
6. Arabic is either formally added to the supported speech contract or removed from unsupported public selectors/copy.
7. Static and runtime pages expose the same canonical route and locale mapping.
8. Social-image metadata is intentionally out of scope and is not a required gate.

## Validation Baseline

- `node --check app.js` passes.
- `node --check ui.js` passes.
- `node --check router.js` passes.
- `node --check voice-lab.js` passes.
- No `package.json`, test directory, Playwright setup, or CI configuration exists yet.

## Phase 1 Conclusion

The locale directories and primary runtime article translations exist. The controlling quality risk is duplicated localization data: runtime UI/article copy, runtime SEO/FAQ copy, and static HTML copy can drift independently. Phase 2 should begin by consolidating or mechanically validating those sources before correcting individual translations.
