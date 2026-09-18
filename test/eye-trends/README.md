# eye-trends — site-reforge test site

Clean static clone of **https://eyetrendsclearlake.com/**, built by the site-reforge skill. Captured 2026-09-17T20:38:57.116Z.
Static, no build step. This folder is a TEST OUTPUT of the skill, not the client's official site.

## Verified — every number below is read from `reports/`

| | |
|---|---|
| Definition of Done (`sr-gate`) | **29 of 29 PASS** — 0 FAIL, 0 UNPROVEN |
| Pages | 43 crawled, 43/43 mapped, 100.0% content recall |
| Clone verification | 20 passed · 0 failed |
| Platform traces | CLEAN |
| Pixel diff | 172 full-height screenshot pairs at 390/768/1024/1440px · worst drift 0.791% on patient-forms.390.png |
| Responsive / a11y sweep | 0 introduced by the build · 60 inherited identically from the live site |
| SEO | emitted robots.txt, sitemap.xml, llms.txt · repaired 129 empty field(s) · migration blockers: 0 |
| Third-party hosts kept | www.google.com |

## What this PUBLISHED copy changes from the graded build

The clone under `reports/` was graded as built. Three things are different in the copy served here,
because a faithful copy of a live site on a public host competes with that site for its own terms:

- `<meta name="robots">` is **noindex, nofollow** on all 43 pages (the build inherits the original's `index, follow`)
- `<link rel="canonical">` points at the **absolute url of the page it was cloned from** (43 pages)
- `robots.txt` is **Disallow: /**, and carries no sitemap

Nothing else — no content, markup, styling or asset differs from the graded build.

## Preview locally

```bash
npx serve .        # or any static server rooted at this folder
```

## Reports

`reports/gate.json` is the verdict. The others are the artifacts it read.
