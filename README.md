# Ember · Design System v2

**Ember** — standalone, dependency-free design system for my projects: Premium
Dark surfaces, a warm **Amber → Rose** signature gradient, and a dense,
data-focused rhythm. Zero build step, zero runtime deps — open a file and it
just works.

The repo ships three layers of the same system:

| Layer | Where | What |
|---|---|---|
| Tokens + classes | [`styles.css`](./styles.css) | Single source of truth: §1–§7 = v1 core, §8+ = v2 wow-layer. |
| Interactions | [`ember.js`](./ember.js) + [`icons.js`](./icons.js) + [`_shell.js`](_shell.js) | Theme, ⌘K palette, toasts, reveal/spotlight/counters, app shell, inline SVG icons. |
| Live previews | `*.html` | Mockup screens for visual approval (below). |
| Svelte port | [`sveltekit/`](./sveltekit/) | Working **SvelteKit + Svelte 5** reference app — 57 components. See `sveltekit/README.md`. |

## Open the mockups

No build step, no server. Just open the files in a browser (double-click, or `file://`):

| File | What it shows |
|---|---|
| **`index.html`** | Start here. Hub + hero: links to every mockup, live component marquee, Svelte teaser. |
| **`tokens.html`** | The full palette, typography scale, gradient, radii, density rhythm — plus motion, elevation, z-index. Click-to-copy + persisted dark/light toggle. |
| **`components.html`** | The component library: buttons, stat cards, badges, table, inputs, tabs, progress, modal, skeletons, empty states — plus switch, segmented, dropdowns, tooltips, toasts, dialog, code blocks. Everything clickable. |
| **`dashboard.html`** | Main dashboard — animated counters, token bar chart with 7/30/90d ranges, top models, recent conversations, available models, activity feed, system health. |
| **`chat.html`** | Three-pane chat shell — simulated streaming, working composer, model switcher, RAG toggle, context panel. Mobile-ready. |
| **`api-keys.html`** | Dense key table (live filter, status filter, bulk-select) + a slide-in create-key panel with a real create → one-time reveal flow. |
| **`admin-users.html`** | Admin users table with roles, presence dots, live search + role/status filters, bulk-select bar, invite dialog, pagination. |
| **`admin-models-before-after.html`** | Side-by-side: a hardcoded "dirty" component vs the tokenized Ember version. Flip the theme toggle to prove dark mode is fixed. |

Supporting files (not meant to be opened directly):

- `styles.css` — the single source of truth for all tokens + component classes (§1–§7 = v1, §8+ = v2 wow-layer).
- `ember.js` — zero-dependency interaction library: theme, ⌘K palette, toasts, spotlight, reveal, counters, tabs, dropdowns, table select/filter, dialogs.
- `icons.js` — inline SVG icon set (names mirror FontAwesome solid names, so a later FA swap is 1:1). Loaded automatically by each page.
- `_shell.js` — shared sidebar + topbar app chrome (theme toggle, palette trigger, mobile off-canvas nav), mounted by the page mockups.
- `SVELTE-INTEGRATION.md` — the integration contract: token mapping, class ↔ component map, behaviour ports, app checklist.
- `AGENTS.md` — orientation guide for AI agents working in this repo.
- `sveltekit/` — working **SvelteKit + Svelte 5** reference app (dashboard, tokens, components). `npm --prefix sveltekit install && npm --prefix sveltekit run dev`.

## The design at a glance

**Mood:** Premium Dark admin/dashboard aesthetic — dark-first, accents "glow"
against warm-neutral near-black surfaces.

**Signature:** the Ember gradient `linear-gradient(135deg, #F59E0B → #F43F5E)` — used on the logo, hero/update banners, featured CTAs, active nav, and progress accents.

**Palette (dark, the default):**
| Role | Hex | Token |
|---|---|---|
| Background | `#0A0A0C` | `--tw-background` |
| Card | `#121214` | `--tw-card` |
| Border | `#26262B` | `--tw-border` |
| Primary | `#F43F5E` (rose-500) | `--tw-primary` |
| Amber | `#F59E0B` | `--tw-amber` |
| Success | `#10B981` | `--tw-success` |
| Info | `#22D3EE` | `--tw-info` |
| Destructive | `#DC2626` | `--tw-destructive` (distinct from rose primary) |

**Density:** `p-4` cards (was `p-6`), `gap-2/3` grids (was `gap-4/8`), 6px radii, 32px control height, minimal shadows (1px borders + subtle ember focus glow instead).

**Type:** Inter (body) + **JetBrains Mono** (numbers, metrics, code) — the mono additions give the dense, technical feel.

---

## Using Ember in your own project

The work is almost entirely in your global CSS — because 94% of components ride
on semantic tokens, changing the token values re-skins them automatically.
Full details in [`SVELTE-INTEGRATION.md`](./SVELTE-INTEGRATION.md); the short version:

1. **Copy the token blocks** — `:root`/`.ember` + `.ember-light` triples from
   [`styles.css`](./styles.css) §1 + §8 into your `app.css`:

   ```css
   .dark {
     --tw-background: 10 10 12;
     --tw-foreground: 250 250 250;
     --tw-card: 18 18 20;
     --tw-card-elevated: 24 24 27;
     --tw-muted: 24 24 27;
     --tw-muted-foreground: 161 161 170;
     --tw-subtle: 113 113 122;
     --tw-border: 38 38 43;
     --tw-border-strong: 58 58 64;
     --tw-primary: 244 63 94;         /* rose-500 */
     --tw-primary-foreground: 255 255 255;
     --tw-amber: 245 158 11;
     --tw-destructive: 220 38 38;
     --tw-success: 16 185 129;
     --tw-info: 34 211 238;
     --tw-ring: 244 63 94;
   }
   ```

2. **Tailwind v4?** Register the new aliases in `@theme` so utilities like
   `bg-success` / `text-amber` / `bg-card-elevated` / `border-border-strong`
   get generated (or copy `sveltekit/src/lib/ember/tailwind.css` as-is).

3. **Fix the radii** — explicit values, no derived formulas:
   `--radius-lg: 6px; --radius-md: 6px; --radius-sm: 4px; :root { --radius: 6px; }`

4. **Add the signature gradient utilities:**

   ```css
   .bg-gradient-ember { background-image: linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%); }
   .text-gradient-ember {
     background-image: linear-gradient(135deg, #FBBF24 0%, #F43F5E 100%);
     -webkit-background-clip: text; background-clip: text; color: transparent;
   }
   ```

5. **Load the fonts** — Inter (400–700) + JetBrains Mono (400–600) via Google Fonts.

6. **Scope theme transitions** — never `* { transition: … }`; use a `.theme-transition`
   class only where wanted (avoids global jank).

7. **Audit for hardcoded hex / phantom vars** (`--card-bg`, `--color-blue`, JS color
   maps) and replace them with semantic tokens —
   [`admin-models-before-after.html`](./admin-models-before-after.html) is the
   before/after proof of what "fixed" looks like.

---

## Notes

- **Dark is primary.** The mockups are dark-first because that's the signature look. Light variant tokens are documented in `styles.css` (`.ember-light`) and `tokens.html`; every surface must work in both.
- **No new runtime deps.** The mockups deliberately use only inline SVG icons and CSS — no FontAwesome kit, no chart library. The bar charts are pure CSS. This keeps the preview zero-dependency and offline-capable. `icons.js` names mirror FA solid names for a 1:1 swap if you use FontAwesome.
- **Coverage:** 6 representative screens cover every recurring UI pattern (stat cards, tables, chat shell, create flows, admin row-actions, before/after). Everything else rebuilds by composition from `components.html`.
