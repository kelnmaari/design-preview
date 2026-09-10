# Ember Design Preview · v2

Static HTML mockups for the **Ember** redesign of `web-svelte/`: Premium Dark surfaces, a warm **Amber → Rose** signature gradient, and a dense, data-focused rhythm. These mockups exist for **visual approval only** — they do not touch production code.

> Spec: [`../docs/superpowers/specs/2026-07-22-web-redesign-ember-design.md`](../docs/superpowers/specs/2026-07-22-web-redesign-ember-design.md)

**v2 adds:** a motion system (easings, durations, reveal-on-scroll), glow/spotlight/glass effects, an animated signature gradient, a working **⌘K command palette**, toasts, dropdowns, dialogs, switches, segmented controls, animated counters + charts, light-theme polish, responsive + mobile nav — and a **SvelteKit reference app** in `sveltekit/`. Still zero build step for the mockups.

## Open the mockups

No build step, no server. Just open the files in a browser (double-click, or `file://`):

| File | What it shows |
|---|---|
| **`index.html`** | Start here. Hub + hero: links to every mockup, live component marquee, Svelte teaser. |
| **`tokens.html`** | The full palette, typography scale, gradient, radii, density rhythm — plus motion, elevation, z-index. Click-to-copy + persisted dark/light toggle. |
| **`components.html`** | The component library: buttons, stat cards, badges, table, inputs, tabs, progress, modal, skeletons, empty states — plus switch, segmented, dropdowns, tooltips, toasts, dialog, code blocks. Everything clickable. |
| **`dashboard.html`** | Main dashboard — animated counters, token bar chart with 7/30/90d ranges, top models, recent conversations, available models, activity feed, gateway health. |
| **`chat.html`** | Three-pane chat shell — simulated streaming, working composer, model switcher, RAG toggle, context panel. Mobile-ready. |
| **`api-keys.html`** | Dense key table (live filter, status filter, bulk-select) + a slide-in create-key panel with a real create → one-time reveal flow. |
| **`admin-users.html`** | Admin users table with roles, presence dots, live search + role/status filters, bulk-select bar, invite dialog, pagination. |
| **`admin-models-before-after.html`** | Side-by-side: the current hardcoded "dirty" component vs the tokenized Ember version. Flip the theme toggle to prove dark mode is fixed. |

Supporting files (not meant to be opened directly):
- `styles.css` — the single source of truth for all tokens + component classes (§1–§7 = v1, §8+ = v2 wow-layer).
- `ember.js` — zero-dependency interaction library: theme, ⌘K palette, toasts, spotlight, reveal, counters, tabs, dropdowns, table select/filter, dialogs.
- `icons.js` — inline SVG icon set (mirrors FontAwesome solid names used in prod, so migration is 1:1). Loaded automatically by each page.
- `_shell.js` — shared sidebar + topbar app chrome (theme toggle, palette trigger, mobile off-canvas nav), mounted by the page mockups.
- `SVELTE-INTEGRATION.md` — the integration contract: token mapping, class ↔ component map, behaviour ports, `web-svelte/` checklist.
- `sveltekit/` — working **SvelteKit + Svelte 5** reference app (dashboard, tokens, components). `npm --prefix sveltekit install && npm --prefix sveltekit run dev`.

## The design at a glance

**Mood:** Premium Dark «AI-продукт» — dark-first, accents "glow" against warm-neutral near-black surfaces.

**Signature:** the Ember gradient `linear-gradient(135deg, #F59E0B → #F43F5E)` — used on the logo, hero/update banners, featured CTAs, active nav, and progress accents.

**Palette (dark, the default):**
| Role | Hex | Token |
|---|---|---|
| Background | `#0A0A0C` | `--tw-background` |
| Card | `#121214` | `--tw-card` |
| Border | `#26262B` | `--tw-border` |
| Primary | `#F43F5E` (rose-500) | `--tw-primary` |
| Amber | `#F59E0B` | `--tw-amber` *(new)* |
| Success | `#10B981` | `--tw-success` *(new)* |
| Info | `#22D3EE` | `--tw-info` *(new)* |
| Destructive | `#DC2626` | `--tw-destructive` (distinct from rose primary) |

**Density:** `p-4` cards (was `p-6`), `gap-2/3` grids (was `gap-4/8`), 6px radii, 32px control height, minimal shadows (1px borders + subtle ember focus glow instead).

**Type:** Inter (body) + **JetBrains Mono** (numbers, metrics, code) — the mono additions give the dense, technical feel.

---

## Migration into `web-svelte/` (next phase)

These mockups are the reference. When you're ready to apply the design to the real app, the work is almost entirely in `web-svelte/src/app.css` — because 94% of components already use semantic tokens, changing the token values re-skins them automatically.

### Step 1 — Replace the token values in `app.css`

In `web-svelte/src/app.css`, replace the `:root` (light) and `.dark` triples with the values from [`styles.css`](./styles.css) §1. Concretely:

```css
/* app.css — .dark becomes the Ember dark palette */
.dark {
  --tw-background: 10 10 12;
  --tw-foreground: 250 250 250;
  --tw-card: 18 18 20;
  --tw-card-elevated: 24 24 27;   /* NEW token */
  --tw-muted: 24 24 27;
  --tw-muted-foreground: 161 161 170;
  --tw-subtle: 113 113 122;        /* NEW token */
  --tw-border: 38 38 43;
  --tw-border-strong: 58 58 64;    /* NEW token */
  --tw-primary: 244 63 94;         /* rose-500 (was indigo) */
  --tw-primary-foreground: 255 255 255;
  --tw-amber: 245 158 11;          /* NEW */
  --tw-destructive: 220 38 38;
  --tw-success: 16 185 129;        /* NEW */
  --tw-info: 34 211 238;           /* NEW */
  --tw-ring: 244 63 94;
  --tw-stat-conversations: 251 191 36;
  --tw-stat-apikeys: 251 113 133;
  --tw-stat-models: 232 121 249;
  --tw-stat-requests: 251 146 60;
}
```

### Step 2 — Register the new tokens in `@theme`

Add the new color aliases to the `@theme {}` block so Tailwind v4 generates the `bg-success` / `text-amber` / `bg-card-elevated` / `border-border-strong` utilities:

```css
@theme {
  /* …existing aliases… */
  --color-card-elevated: rgb(var(--tw-card-elevated));
  --color-subtle: rgb(var(--tw-subtle));
  --color-border-strong: rgb(var(--tw-border-strong));
  --color-amber: rgb(var(--tw-amber));
  --color-success: rgb(var(--tw-success));
  --color-info: rgb(var(--tw-info));
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

### Step 3 — Fix the radius formulas

Replace the derived (and mismatch-prone) radius formulas with explicit values:

```css
@theme {
  --radius-lg: 6px;     /* was calc(var(--radius))      */
  --radius-md: 6px;     /* was calc(var(--radius) - 2px) */
  --radius-sm: 4px;     /* was calc(var(--radius) - 4px) */
}
:root { --radius: 6px; }  /* was 0.5rem */
```

### Step 4 — Add the signature gradient utilities

Drop these into `app.css` (after the `@theme` block):

```css
.bg-gradient-ember { background-image: linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%); }
.text-gradient-ember {
  background-image: linear-gradient(135deg, #FBBF24 0%, #F43F5E 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
```

### Step 5 — Load JetBrains Mono

In `web-svelte/src/routes/+layout.svelte`, extend the existing Google Fonts `<link>` to include JetBrains Mono (Inter stays):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

### Step 6 — Fix the global transition anti-pattern

The current `app.css` applies `transition` to **every** element (`*`), which causes jank. Scope it:

```css
/* REMOVE: *, *::before, *::after { transition: ... } */
/* REPLACE with a class applied only where theme transitions are wanted: */
.theme-transition, .theme-transition::before, .theme-transition::after {
  transition: background-color .2s ease, border-color .2s ease, color .1s ease;
}
```

### Step 7 — Fix the 7 dirty files

These files bypass tokens with hardcoded hex + phantom CSS variables (`--card-bg`, `--color-blue`) and JS color maps. Replace them with semantic tokens — the [`admin-models-before-after.html`](./admin-models-before-after.html) mockup is the reference for what "fixed" looks like.

Files to fix (from the audit):
- `routes/(protected)/gitlab/jobs/+page.svelte`
- `lib/components/gitlab/JobProgressCard.svelte`
- `lib/components/gitlab/ActiveJobsIndicator.svelte`
- `routes/(protected)/admin/models/+page.svelte`
- `routes/(protected)/resources/+page.svelte`
- `routes/(protected)/gitlab/+page.svelte`
- `routes/(protected)/gitlab/[id]/+page.svelte`

For each: delete the scoped `<style>` block, replace `var(--card-bg)/var(--color-blue)` with the real tokens (`bg-card`, `text-primary`), and replace JS `C = { gray, red, ... }` color maps with the `success`/`destructive`/`amber`/`info` tokens or `badge-*` classes.

### Step 8 — Minor token/literal drift

- In `app.html` and `theme.svelte.ts`: the meta `theme-color` is hardcoded to `#0f172a` (slate). Change to `#0A0A0C` (the actual background token) for dark, `#FFFFFF` for light.
- In `icon-button.svelte`: `text-green-500` → `text-success` (the new token).

---

## Notes

- **Dark is primary.** The mockups are dark-first because that's the signature look. Light variant tokens are documented in `styles.css` (`.ember-light`) and `tokens.html` but the page mockups target dark.
- **No new runtime deps.** The mockups deliberately use only inline SVG icons and CSS — no FontAwesome kit, no chart library. The bar charts are pure CSS. This keeps the preview zero-dependency and offline-capable. In production, keep using FontAwesome (the icon names in `icons.js` mirror FA solid names for a 1:1 swap).
- **Coverage:** 6 representative pages cover every recurring UI pattern (stat cards, tables, chat shell, create flows, admin row-actions, before/after). The remaining ~35 routes rebuild by composition from `components.html`.
# design-preview
