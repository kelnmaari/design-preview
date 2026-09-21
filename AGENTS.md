# AGENTS.md — Ember Design Preview

> Orientation for AI agents (and humans) landing in this repo. Read this first.

## What this repo is

**Ember** — a standalone, dependency-free design system for the user's projects:
static HTML **mockups** + a SvelteKit reference app. Everything here exists for
**visual approval and copy-paste reuse** — it is not production code for any
single product, and no app depends on this repo.

- **Zero build step.** Mockups are plain HTML/CSS/vanilla JS: open any file
  directly in a browser (`file://`), no server, no npm, no framework.
- `sveltekit/` is the one exception — a working Svelte 5 / SvelteKit reference
  app that mirrors the design (see the bottom of this file).
- Demo content (chat, API keys, models…) is intentionally generic sample data
  for the mockups — it is not a product spec.

## The design language (the contract)

- **Dark-first.** `<html class="ember">` = dark (default), `.ember-light` = light.
  Every surface must go through semantic tokens so **both themes work**.
- **Signature:** Amber→Rose gradient `linear-gradient(135deg, #F59E0B, #F43F5E)`
  — `.bg-gradient-ember`, `.text-gradient-ember`, plus animated variants (§10).
- **Tokens** are RGB triples (`--tw-background: 10 10 12`) in `styles.css` §1+§8.
  Consume them via the `var(--color-*)` aliases (§4). **Never hardcode hex** —
  `admin-models-before-after.html` shows exactly what "dirty" vs tokenized looks like.
- **Density:** 13px base text, 32px control height, `p-4` cards, `gap-2/3`,
  6px radii, 1px borders + subtle ember focus glow (no heavy shadows).
- **Type:** Inter (UI) + JetBrains Mono for numbers/code/metrics (`--font-mono`,
  `.font-mono`, `kbd`, `.code-chip`).
- **Icons:** `<i data-icon="name" data-size="14"></i>` rendered by `icons.js`.
  Names mirror FontAwesome solid names, so swapping to real FA later is 1:1.

## File map

| File | Role |
|---|---|
| `index.html` | Hub/landing — links to every mockup. |
| `tokens.html` | Palette/type/motion gallery, click-to-copy, 6-theme switcher. |
| `components.html` | Full component library, everything clickable. |
| `dashboard.html`, `chat.html`, `api-keys.html`, `admin-users.html` | Product screens. |
| `admin-models-before-after.html` | Before/after proof of tokenizing a "dirty" page. |
| `styles.css` | **Single source of truth.** §1–7 = v1 (tokens, reset, primitives, components, app-shell layout) — frozen; §8–15 = v2 wow-layer (motion/effect tokens, keyframes, atmosphere/orbs, glass/spotlight, new components, responsive, reduced-motion) — additive only. |
| `ember.js` | Zero-dep interactions: `Ember.theme`, `Ember.toast`, `Ember.palette` (⌘K), reveal/spotlight/counters, tabs, dropdowns, table select/filter, dialogs. |
| `icons.js` | Inline SVG icon set for `<i data-icon>`. |
| `_shell.js` | Shared app chrome — sidebar + topbar + mobile off-canvas nav (`EmberShell.mount()`). |
| `SVELTE-INTEGRATION.md` | Token mapping + class ↔ Svelte component contract. |
| `sveltekit/` | Svelte 5 reference app, 57 components — has its own deeper guide: `sveltekit/src/lib/ember/AGENTS.md`. |
| `_drafts/` | Git-ignored scratch area for throwaway pages (menu variants, experiments). Delete freely. |

## Anatomy of a mockup page

Copy this skeleton for new pages:

```html
<!DOCTYPE html>
<html lang="en" class="ember">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="styles.css?v=2.2" />
  <style> /* page-scoped classes only; shared styling belongs in styles.css */ </style>
</head>
<body data-page="dashboard">   <!-- _shell.js highlights the nav item with this id -->
  <div id="page-root">
    <!-- page content; EmberShell.mount() wraps it in sidebar + topbar -->
  </div>
  <script src="icons.js?v=2.2"></script>
  <script src="ember.js?v=2.2"></script>
  <script src="_shell.js?v=2.2"></script> <!-- only for app-chrome pages -->
  <script> EmberShell.mount(); </script>
</body>
</html>
```

Behaviour is declarative via data-attributes handled by `ember.js`:
`data-theme-toggle`, `data-palette-open` (⌘K), `data-copy="text"`,
`data-count` + `data-format` (animated counters), `data-reveal-delay` /
`data-reveal-group` (scroll reveal), `data-table-filter`, `data-range-btn`,
`data-menu-btn`, `data-dialog-open` / `data-dialog-close`, `data-theme-pill`,
`data-icon` + `data-size`. Dead demo links get `data-demo-nav` → toast instead
of a dead end (in `_shell.js` pages).

## Rules of the house

1. **Mockups stay zero-dependency** — no npm, no framework, no FontAwesome kit,
   no chart library in the HTML pages. Pure CSS + inline SVG + vanilla JS only.
2. **`styles.css` is additive.** §1–7 (v1) are a frozen reference; new styles go
   into §8+ or the page's own `<style>`. Never renumber or rework v1 blocks.
3. **Copy values, not files.** Porting a pattern to Svelte = tokens + class names
   + behaviour per `SVELTE-INTEGRATION.md`. Keep `sveltekit/src/lib/ember/` in
   sync: one component = one `.svelte` file, import only via the `index.ts` barrel.
4. **Dark is primary, light is mandatory.** Check `.ember-light` on every new
   surface; semantic tokens only.
5. **Version-bust** shared assets with `?v=` (bump when you change them and want
   pages to reload them).
6. **Scratch pages go in `_drafts/`** (git-ignored), not the repo root. Draft
   pages must look clearly non-production (e.g. a "DRAFT" banner).

## Running things

- Mockups: just open the HTML file in a browser (e.g. `start index.html`).
- SvelteKit app: `npm --prefix sveltekit install && npm --prefix sveltekit run dev`
- No tests, no CI, no linters here — this is a design-preview repo. Don't add
  build/test tooling unless explicitly asked.
