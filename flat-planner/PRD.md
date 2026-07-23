# PRD: Magazine Flat Plan Demo Widget

> **Status:** Built & verified (v2). Ships as `flat-planner/index.html`, hosted on
> GitHub Pages, embedded via `<iframe>` in a HubSpot dashboard.
> Revised from the original PRD after comparing against the reference screenshot
> (`Dance Magazine July/August 2026 Flat Plan`) and the prior broken attempt.
> Changes from the original are called out in **_Revision notes_**.

## 1. Background

A prospect currently uses Magazine Manager to run their flat plan — a visual,
page-by-page layout of an upcoming magazine issue showing which pages are booked
by which advertiser, and which are still open. They are evaluating HubSpot to add
sales structure to their ad-booking process, but HubSpot has no native flat-plan
visualization. This widget recreates that specific tool as a standalone demo,
embedded via `<iframe>` in a HubSpot dashboard for a sales demo.

A reference screenshot of the real tool defines the exact visual layout this must
match. Company/advertiser names in the reference are redacted — all names in this
demo are placeholder-safe.

## 2. Goal

Ship a single, self-contained, working HTML demo that:
- Visually matches the reference flat plan layout (Section 4).
- Lets a sales rep claim a free page for an advertiser, free a claimed page, and
  drag-and-drop move/swap bookings — mirroring how reps use Magazine Manager today.
- Runs reliably inside a **cross-origin** iframe with no backend, no build step,
  no external dependencies.

This is a sales demo artifact, not a production app. Correctness and visual
fidelity to the reference matter more than code architecture.

## 3. Users

- **Sales rep (only editor):** claims pages, frees pages, drags bookings.
- **Production (view-only in the real product):** out of scope for v1.

## 4. Layout Spec (matches reference screenshot)

- **Header:** bold title "Dance Magazine July/August 2026 Flat Plan", left-aligned,
  **plain sans-serif, black on white**. Utilitarian, not branded.
  **_Revision note:_** the prior attempt used a Georgia serif title with an em-dash
  and an uppercase subtitle — wrong. Now plain bold sans-serif, exact reference text.
- **Grid structure:** a **wrapping contact-sheet grid**. Spread units (left page +
  right page pairs) flow left-to-right and **wrap** to a new line based on container
  width, like a printed contact sheet.
  **_Revision note (most important fix):_** the prior attempt rendered **one spread
  per row**, producing ~40 stacked lines down the page — nothing like the reference.
  Now a single `flex-wrap` container of fixed-width spreads.
- **Each page tile** is a bordered box containing, top to bottom:
  1. **Size label, top-left, bold** ("Full Page", "2 Page Spread", "2/3 Page",
     "1/3", "1/2", "1/6").
  2. A content/advertiser block (advertiser name, or an editorial note like "TOC").
  3. **Page number as a caption BELOW the box, outside the border** ("Page 41",
     "0-1", "72-1").
  **_Revision note:_** the prior attempt put the page number *inside* the tile at
  the top. It is now a caption underneath, per the reference.
- **Special / cover pages:** front cover (0-1), inside-front-cover spread (0-2),
  inside back cover (72-1), outside back cover (72-2) get a **salmon/pink border**,
  independent of sold/available status.
- **Split pages within one page slot** (share one page-number caption):
  - `2/3 + 1/3` → wide + narrow tile, side by side (Page 41, Page 69).
  - `1/2 + 1/2` → equal-width tiles side by side (Page 43).
  - `2/3 + 1/6 + 1/6` → one wide tile plus two small tiles stacked vertically
    beside it (Page 67).
  **_Revision note:_** splits are modeled as sub-tiles of one page slot so they
  share a single caption and keep correct width proportions. The prior attempt
  flattened splits into the row (breaking proportions and captions) and put the
  stacked-1/6 split on the wrong page.
- **Color coding — exactly two states plus special accents:**
  - **White** = Free (editorial/unsold).
  - **Teal** = Claimed.
  - **Salmon border** = cover/special position (independent of status).
  - **Yellow fill** = outside back cover (72-2) accent only.
  **_Revision note:_** the reference shows a second fill color (light blue); per the
  original PRD's own instruction we collapse to exactly **Free / Claimed**. The prior
  attempt used dark green for claimed and gold *fill* for all specials — wrong;
  specials are a border, and only the back cover is yellow.
- **Legend:** key in the header showing Free / Claimed / Cover-special / Back cover.
- **Inventory stat:** running count of claimed vs. free vs. total page slots in the
  toolbar, so a rep sees inventory at a glance.

The grid is generated from a data structure (Section 6), not hand-coded DOM.

## 5. Interactions

1. **Click a Free tile** → popover: advertiser name input + size select (defaults to
   the tile's current size) → Save sets it to Claimed, fills the advertiser, recolors,
   closes. Enter key also saves; empty name is rejected.
2. **Click a Claimed tile** → popover shows advertiser + size and a "Free this page"
   button that resets it to Free.
3. **Drag a Claimed tile onto a Free tile** → the booking (advertiser + status) moves
   to the target; the origin becomes Free.
4. **Drag a Claimed tile onto another Claimed tile** → the two bookings swap.
5. All changes persist immediately via `localStorage` (no save button).
6. **Reset button** restores the original seed data.
7. **Escape / click-outside** closes the popover.

**_Revision note — size stays with the physical slot:_** dragging moves the
*advertiser + status*, not the size. A page's printed geometry (a 1/3 slot, a 1/6
slot) is fixed — Section 8 explicitly excludes runtime re-splitting — so a booking
cannot carry its size into a differently-shaped slot without breaking the layout.
The size selector on the claim form updates that slot's own label only.

## 6. Data Model

State is a map of page-slot objects (a slot renders as one tile, or several
side-by-side/stacked tiles sharing a page number):

```js
{
  id: "41-2/3",        // unique per tile
  pageNumber: "41",     // shared across tiles that split one page
  size: "2/3",          // "Full Page" | "2-Page Spread" | "2/3" | "1/2" | "1/3" | "1/6"
  status: "Free",       // "Free" | "Claimed"
  advertiser: "",        // empty when Free
  note: "",              // editorial label, e.g. "TOC", "Cover"
  special: false,        // salmon border (cover positions), independent of status
  backcover: false       // yellow fill (outside back cover only)
}
```

A separate **layout** array (built from the seed, not hand-maintained) describes how
slots group into the printed grid: singles (0-1, 72-2), the inside-front-cover
2-page spread (0-2, captioned "0-2 / Page 1" — page 1 is absorbed into this spread
and is not a separate slot), normal facing-page pairs (2-3 … 70-71, then 72 / 72-1),
and the four splits (41, 43, 67, 69).

Seeded with **80 page slots** mirroring the reference: split patterns at pages 41,
43, 67, 69; salmon-bordered covers; a yellow outside back cover; and ~19 pre-claimed
tiles with placeholder advertiser names so the board isn't empty on load.

## 7. Technical Constraints

- **Single HTML file.** Inline `<style>` and `<script>`. No CDN, no npm, no build,
  no frameworks.
- **Must render correctly inside a cross-origin `<iframe>`.** No full-viewport
  assumptions. **All `localStorage` access is wrapped in try/catch** — a HubSpot
  cross-origin embed can partition/block storage and throw on access; the grid must
  still render (degrading to in-memory state).
  **_Revision note:_** this was the root cause of the "zero visible pages" bug. The
  prior version's boot threw a `SecurityError` on `localStorage.getItem` inside the
  iframe before any tile rendered.
- **State persistence via `localStorage` only** (best-effort), no backend, no network.
- **No console errors under any interaction path.** Verified with a headless-Chrome
  harness covering: grid populates, click-claim, click-free, drag claimed→free, drag
  claimed↔claimed, refresh persistence, reset, and cross-origin iframe embedding.

## 8. Out of Scope for v1

- HubSpot API / real CRM data
- Separate read-only production view
- Multi-issue switching / issue selector
- Runtime re-splitting of a page's configuration
- Auth, multi-user real-time sync
- Print/PDF export

## 9. Acceptance Checklist — all verified ✅

- [x] Opens rendering a full grid immediately, no blank page, no console errors.
- [x] Layout matches the reference: size label in tile, page number caption below
      the tile, spreads in a wrapping grid, splits (2/3+1/3, 1/2+1/2, stacked 1/6s)
      correct.
- [x] Cover/special pages show a distinct border independent of claimed status;
      outside back cover is yellow.
- [x] Clicking a Free tile opens a working claim form that updates the tile.
- [x] Clicking a Claimed tile opens a working free/release action.
- [x] Dragging Claimed→Free moves the booking; origin frees.
- [x] Dragging Claimed↔Claimed swaps both.
- [x] Refresh preserves state via localStorage (where storage is available).
- [x] Reset restores the original seed data.
- [x] Works opened directly **and** embedded via a cross-origin `<iframe>`.

## 10. Hosting & Embedding

Hosted on the existing **GitHub Pages** site (`projects-dashboard`, `main` branch,
root). Live URL:

```
https://phil-rev.github.io/projects-dashboard/flat-planner/
```

Embed in a HubSpot dashboard (single-object "iframe" / rich-text module):

```html
<iframe src="https://phil-rev.github.io/projects-dashboard/flat-planner/"
        style="width:100%;height:900px;border:0;" title="Magazine Flat Plan"></iframe>
```
