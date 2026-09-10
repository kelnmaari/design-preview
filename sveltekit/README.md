# Ember · SvelteKit Example

Reference implementation of the **Ember Design System v2** in **SvelteKit + Svelte 5**
(runes, TypeScript, zero component dependencies). It mirrors the static mockups in
`design-preview/` — same tokens, same class names, same look — so you can lift
patterns straight into `web-svelte/`.

## Run it

```bash
npm install
npm run dev      # → http://localhost:5173
```

Other scripts: `npm run build`, `npm run preview`, `npm run check` (svelte-check).

## What's inside

| Path | What it is |
|---|---|
| `src/lib/ember/ember.css` | **Generated copy** of `../styles.css` — every token + component class. Re-copy after design changes, don't hand-edit. |
| `src/lib/ember/theme.svelte.ts` | Theme store (runes): `theme.value`, `theme.toggle()`, `localStorage` persistence, `.ember` / `.ember-light` on `<html>`. |
| `src/lib/ember/actions.svelte.ts` | Svelte actions: `use:spotlight`, `use:reveal`, `use:count`, `use:clickOutside`. |
| `src/lib/ember/toast.svelte.ts` | Toast store: `toast.success/info/warning/error(title, desc)`. |
| `src/lib/ember/icons.ts` + `Icon.svelte` | Inline SVG set, 1:1 with `../icons.js`. |
| `src/lib/ember/*.svelte` | `Shell`, `Button`, `Card`, `Badge`, `StatCard`, `Switch`, `Segmented`, `Progress`, `Modal`, `Toasts`, `CommandPalette` (⌘K), `TokenBars`, `Sparkline`, `ThemeToggle`, `TextField`, `Tabs`, `Dropdown`, `SlidePanel`, `Banner`, `CodeBlock`, `Avatar` + `AvatarStack`, `EmptyState`, `Pagination`, `SearchField`, `CopyButton`. |
| `src/lib/ember/utils.ts` | `sleep()`, `copyText()`, `seededRandom()` — clipboard + timing + SSR-safe demo data. |
| `src/routes/` | `/` dashboard, `/tokens`, `/components`, `/chat` (streaming), `/api-keys` (create-key slide-over), `/users` (admin table + invite). |
| `src/app.html` | Inline pre-paint theme script (no dark-mode flash). |

## Porting to `web-svelte/`

1. Copy the `:root` / `.ember-light` token blocks from `src/lib/ember/ember.css`
   into `web-svelte/src/app.css` (see `../SVELTE-INTEGRATION.md` for the exact diff).
2. Copy whichever `src/lib/ember/*` components you need — they're self-contained
   and only depend on the token classes.
3. Keep the `data-icon` names: they match the FontAwesome solids prod already uses,
   so `<Icon name="key">` ↔ `<i class="fa-solid fa-key">` is a 1:1 swap.

## Conventions

- Styling is **class-first** (`btn btn-ember btn-sm`), not prop-soup — new variants
  are new classes in `ember.css`, exactly like the static system.
- Motion/effects come from **actions** (`use:spotlight`, `use:reveal`), never from
  component internals — any element can opt in.
- Stores are rune classes (`.svelte.ts`), shared across routes without context.
