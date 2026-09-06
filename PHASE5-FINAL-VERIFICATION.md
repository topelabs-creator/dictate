# Phase 5: Final Verification

Status: ready to execute
Date prepared: 2026-09-04
Canonical deployment: `https://hustler512.github.io/DICTATOR/`

## Automated Checks

- [x] Run `npm.cmd test` from `DICTATOR.WEB`: 45 passed, 0 failed.
- [x] Run all four JavaScript syntax checks: 4 passed.
- [x] Confirm all route, locale, canonical, hreflang, sitemap, and robots tests pass.
- [x] Confirm no `dictator.app` references remain in public application/static HTML.
- [x] Confirm no Phase 4 social-image files or metadata are required by the test suite.
- [x] Confirm tested hreflang targets map to real static locale files.

## Local Browser Checks

- [x] Open the home page on `http://localhost:8000`.
- [x] Smoke-check a localized article: title, `lang`, article canonical, eight hreflang links, visible FAQ, and FAQ JSON-LD all match.
- [ ] Complete manual checks for every locale/article combination.
- [ ] Change language from each article and confirm the route remains the same article.
- [ ] Reload every localized hash route and confirm the locale is preserved.
- [ ] Check Projects, About, How to use, and Privacy routes.
- [ ] Check browser console for errors and failed asset requests.

## Deployment Checks

Use a cache-busting query after deployment:

`https://hustler512.github.io/DICTATOR/?verify=20260904`

- [x] Confirm the deployed home page returns HTTP 200.
- [x] Confirm the deployed home page has the expected canonical and eight hreflang links.
- [ ] Redeploy the current source, then repeat the localized article check.
- [ ] Publish the current shell versions (`ui.js?v=32`, `router.js?v=24`) and localized loader version (`index.html?v=32`).
- [ ] Confirm deployed localized static entry pages return HTTP 200 with current metadata.
- [ ] Confirm deployed `/DICTATOR/` asset paths resolve.
- [ ] Confirm deployed sitemap and robots reference only the active GitHub Pages host.

## Scope Note

Phase 4, the dedicated social-sharing image and its metadata, was intentionally removed from the project scope. Favicon metadata remains separate and is not treated as a social-card requirement.

## Current Blocker

The live GitHub Pages site is reachable, but it serves an older bundle. The deployed Portuguese article route currently reports the Blogs title/canonical instead of the article title/canonical. Publish the current `DICTATOR.WEB` source, then repeat the deployment checks above.
