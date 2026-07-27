# Magazine Flat Planner

A self-contained, single-file HTML **magazine flat-plan editor**, built to model the
[Blinkplan](https://app.blinkplan.com) tool a prospect uses today, so it can be embedded
via `<iframe>` in a HubSpot dashboard for a sales demo — no backend, no build step, no deps.

## Live

- **Tool:** https://phil-rev.github.io/projects-dashboard/flat-planner/
- **Source:** [`flat-planner/index.html`](../../flat-planner/index.html) (kept at repo root so the
  Pages iframe URL stays stable; this `projects/` folder is metadata only)
- **Spec:** [`flat-planner/PRD.md`](../../flat-planner/PRD.md)

## Embed in HubSpot

```html
<iframe src="https://phil-rev.github.io/projects-dashboard/flat-planner/"
        style="width:100%;height:900px;border:0;" title="Magazine Flat Plan"></iframe>
```

## What it does

- **Multiple issues** with a picker + archived history; New-flatplan with clone modes
  (empty / layout only / layout + content).
- **Per-page templates** — a library of zone layouts; each zone holds content (live preview),
  an Advert flag, and a workflow Category.
- **Cover / IFC / IBC / Back** auto-naming + spread pairing.
- **Setup menu:** editable Categories, Ads/Content-to-be-Placed pool, Sections calculator,
  display settings, Print/PDF.
- State persists in `localStorage`.

## Two hard constraints (both caused real bugs — see CLAUDE.md)

1. Cross-origin iframes can **block/partition `localStorage`** → wrap all access in try/catch.
2. Cross-origin iframes **silently suppress native `prompt`/`confirm`/`alert`** → use in-page
   modals only, and verify in an actual cross-origin iframe.

## Next steps / blockers

- [ ] "Open in new tab to print" fallback — `window.print()` may be blocked in HubSpot's sandboxed iframe.
- [ ] Optional Blinkplan parity: richer ad-placement flow, Stitch-ins, Tags/Comments tabs.
- [ ] Production path: HubSpot custom objects (Issue → Page → Zone) for shared, cross-device data
      (localStorage is per-browser only).

## Status

Live and demo-ready. All controls verified working inside a cross-origin iframe against the
production URL (headless-Chrome harness).
