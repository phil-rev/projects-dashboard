# PRD: Magazine Flat Plan Widget

> **Status:** v2 built & verified. Ships as `flat-planner/index.html`, hosted on
> GitHub Pages, embedded via `<iframe>` in a HubSpot dashboard.
> **v2 pivot:** after studying Blinkplan (app.blinkplan.com) in depth — via a
> recorded feature walkthrough + hands-on notes — the widget was rebuilt from a
> single-issue sales-inventory board into a **faithful Blinkplan-style flat-plan
> editor**: multiple issues, per-page templates, per-zone content, workflow
> categories, and archived history. (v1's sales Free/Claimed model is superseded;
> it can be re-layered later — see §8.)

## 1. Goal

A single, self-contained HTML flat-plan editor that mirrors Blinkplan's core
model closely enough to demo to a prospect, running inside a cross-origin HubSpot
dashboard iframe with no backend, build step, or dependencies.

## 2. Blinkplan model being mirrored (source of truth)

From the walkthrough + docs, the three capabilities the prospect cares about:

- **New flatplan per issue** — modal with **Issue** name, **Single pages** toggle,
  **Portrait/Landscape/Square**, and clone choice: *empty / clone layout only /
  clone layout + content*. Creating then adding pages auto-generates print-style
  labels: standalone **Cover**, **IFC**, sequential numbered spreads, **IBC**,
  standalone **Back**.
- **Per-page layout templates** — click a page → **Change template** → a library of
  zone subdivisions; picking one re-splits the page. Each zone independently holds
  **content** (live-previewed in the thumbnail), an **Advert** flag (hatches the
  zone, disables its text field), and a **Category** workflow status.
- **Historicals** — issues live in a picker and can be **archived** (never deleted),
  staying retrievable for history.

## 3. What shipped (v2)

**Data model** (one `localStorage` key, iframe-safe):
```js
{ activeIssueId,
  issues: { <id>: {
    id, title, orientation, singlePages, archived, createdAt,
    pages: [ { id, label, kind, locked, notes, templateId,
               zones: [ { id, label, content, advert, category } ] } ]
  } } }
```
- `kind` ∈ cover | ifc | page | ibc | back (specials get a salmon border).
- Templates are a curated library of 9 zone layouts: Full, 1/2 v, 1/2 h,
  2/3+1/3, 1/3+2/3, 2/3+1/6+1/6, 1/3×3, 1/2+1/4+1/4, 1/4×4 — each zone carries a
  Blinkplan-style size label ("2/3 vertical", "1/4 square", …).
- Categories: In progress (amber) · Approved (blue) · Final (green), with running
  per-category page counts in the toolbar.

**Features**
- **Issue picker** (top-bar dropdown) + **Manage issues** modal listing all issues
  incl. archived, with page/ad counts, Open, Archive/Unarchive, and Reset-demo.
- **New flatplan** modal (name / single-pages / orientation / clone empty|layout|all).
- **+ Pages** and per-page **⋮ menu**: Insert pages, Copy content across next N,
  Lock/Unlock, Delete (specials protected) — with automatic renumbering.
- **Edit Page** dialog (Content + Notes tabs; Tags/Comments stubbed): Change
  Template library, click-a-zone selection, per-zone content field with **live
  thumbnail preview**, Advert checkbox (hatch + disable), Category dropdown, and a
  Move/swap action.
- **Drag** a page onto another to move/swap its template+content (label/kind stay
  with the physical slot).
- **Spread pairing**: Cover standalone, [IFC…IBC] paired 2-by-2, Back standalone;
  Single-pages mode lays every page out standalone.

## 4. Technical constraints (unchanged from v1)

- Single HTML file, inline CSS/JS, no CDN/npm/build/frameworks.
- Must render inside a **cross-origin** iframe — all `localStorage` access wrapped
  in try/catch so a blocked/partitioned storage context still renders (this was
  v1's "zero pages" bug; retained the fix).
- No console errors on any interaction path.

## 5. Verification — all passing ✅

Headless-Chrome harness (`verify2.js`): board populates (16 tiles) · 2 seed issues
in picker · change template (zone count updates) · per-zone content live-preview ·
advert disables field + hatches zone · edit persists (advert+category) · new empty
flatplan (correct page count, no content) · clone-all copies content · clone-layout
keeps templates & drops content · add pages (+N, renumber) · archive toggles &
retains issue · drag swap · reload persistence · **no console errors**. Plus prior
cross-origin-iframe render check.

## 6. Deferred (Blinkplan has; not needed for the core demo)

Ads/Content-to-be-Placed staging pool · Sections calculator · Stitch-ins ·
Notes/Tags/Comments full tabs (Notes is functional; Tags/Comments stubbed) ·
thumbnail image upload · real-time multi-user collaboration.

## 7. Hosting & embedding

GitHub Pages (`projects-dashboard`, `main` root):
```
https://phil-rev.github.io/projects-dashboard/flat-planner/
```
```html
<iframe src="https://phil-rev.github.io/projects-dashboard/flat-planner/"
        style="width:100%;height:900px;border:0;" title="Magazine Flat Plan"></iframe>
```

## 8. Production path (beyond the demo)

`localStorage` is per-browser/per-device and not shared across a team. A real
multi-issue archive should persist server-side — the natural fit is **HubSpot
custom objects** (`Issue` → `Page` → `Zone/Booking`), which also lets the flat plan
tie to real CRM deals and reintroduce the sales-inventory lens (Free/Claimed,
advertiser = company/deal) on top of this production-planning structure.
