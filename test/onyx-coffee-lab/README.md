> ## REFUSED — 20 of 29 checks pass · 9 fail · 0 unproven
>
> This build did **not** pass the gate and was never packaged for delivery. It is kept here as evidence of
> what the tool refuses and why. Every failing check below is read from `reports/gate.json`.

- **FAIL C02** — 1982 urls left unqueued at --max 20
- **FAIL C05** — 6 page(s) likely JS-rendered and captured statically: https://onyxcoffeelab.com/en-int/products/gift-card, https://onyxcoffeelab.com/en-int/products/kalita-wave-dripper-ceramic, https://onyxcoffeelab.com/en-int/products/
- **FAIL C10** — CROSS-ORIGIN CSS UNREADABLE (1 sheet) — keyframes inside them were not captured; fetch them with sr-assets.mjs and re-run.
- **FAIL C18** — 1 SEO loss finding(s): h1-missing
- **FAIL C19** — 6 finding(s): Phone number missing from rebuild | Phone number missing from rebuild | Form has no action
- **FAIL C20** — 0 blocker + 19 major unsourced claims
- **FAIL C22** — worst drift 80.957% on en-int_products_gift-card.390.png
- **FAIL C23** — 0 blocker + 71 major introduced across 390/768/1024/1440px · 27 blocker/major inherited from the source
- **FAIL C24** — 5 unresolved failure(s): assets:data

# onyx-coffee-lab — site-reforge test site

Clean static clone of **https://onyxcoffeelab.com**, built by the site-reforge skill. Captured 2026-09-17T22:27:28.291Z.
Static, no build step. This folder is a TEST OUTPUT of the skill, not the client's official site.

## Verified — every number below is read from `reports/`

| | |
|---|---|
| Definition of Done (`sr-gate`) | **20 of 29 PASS** — 9 FAIL, 0 UNPROVEN |
| Pages | 19 crawled, 19/19 mapped, 99.8% content recall |
| Clone verification | 20 passed · 0 failed |
| Platform traces | CLEAN |
| Pixel diff | 76 full-height screenshot pairs at 390/768/1024/1440px · worst drift 80.957% on en-int_products_gift-card.390.png |
| Responsive / a11y sweep | 0 introduced by the build · 27 inherited identically from the live site |
| SEO | emitted robots.txt, sitemap.xml, llms.txt · repaired 232 empty field(s) · migration blockers: 0 |
| Third-party hosts kept | content.9gtb.com, config.gorgias.help, fast.wistia.com, cdn.amcharts.com |

## Preview locally

```bash
npx serve .        # or any static server rooted at this folder
```

## Reports

`reports/gate.json` is the verdict. The others are the artifacts it read.
