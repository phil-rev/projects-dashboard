# Working on: Magazine Flat Planner

## What this is
A single self-contained HTML flat-plan editor (models Blinkplan) embedded via `<iframe>` in a
HubSpot dashboard for a prospect demo. The actual app lives at the **repo root** in
`flat-planner/index.html` (so GitHub Pages serves it at a stable `/flat-planner/` URL). This
`projects/flat-planner/` folder is **metadata only** for the projects dashboard.

## Golden rules (both are from real bugs that shipped)
1. **No native dialogs.** `prompt()` / `confirm()` / `alert()` are silently suppressed in
   cross-origin iframes (HubSpot). Use the in-page `askNumber` / `confirmModal` / `infoModal`
   helpers instead.
2. **Guard all `localStorage`.** It can throw / be partitioned in a cross-origin iframe. All
   access is wrapped (`lsGet`/`lsSet`); never call `localStorage` directly, or the grid renders blank.
3. **Verify in a real cross-origin iframe, not just a direct tab.** A direct-window test will pass
   while the iframe is broken. Use the puppeteer harness pattern (system Chrome via `puppeteer-core`),
   loading the app inside an `<iframe>` from a different origin, and click every control.

## Architecture
- State: `{ activeIssueId, issues{}, categories[], pool[], display{} }` in one `localStorage` key
  (bump the key when the shape changes).
- Each issue: `pages[]`, each page has `templateId` + `zones[]` (content / advert / category).
- Templates: curated `TEMPLATES` array of zone geometries. Categories/pool/display are editable state.
- `window.__flatplan` is exposed for test harnesses.

## Deploying
Pages serves from `main` root. The repo's local `main` has a pre-existing unpushed `daily-planner`
commit that conflicts with the bot-generated `dashboard.html`. **Deploy by cherry-picking your
commit onto `origin/main` via a throwaway branch**, then push to `main` — don't rebase local `main`.
Don't hand-edit `dashboard.html`; the CI workflow regenerates it on push.

## Definition of done for a change
Re-run the iframe button/feature harness against the live URL; all controls pass, zero native
dialogs fire, no console errors.
