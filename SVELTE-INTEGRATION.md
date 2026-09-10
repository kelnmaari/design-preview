# Ember v2 → Svelte Integration Guide

How to lift the Ember design system from these static mockups into your Svelte
frontend (`web-svelte/` or any SvelteKit app) without losing the look.

Three sources, one contract:

| Source | Role |
|---|---|
| `styles.css` (§1–§7 = v1, §8+ = v2) | Token + class reference. Copy values, not files. |
| `ember.js` | Behaviour reference (theme, palette, toasts…). Port logic to runes/actions. |
| `sveltekit/` | **Working Svelte 5 reference** — copy components verbatim. |

> Start the example: `npm --prefix sveltekit install && npm --prefix sveltekit run dev`

---

## 1. Tokens → `app.css`

Copy the `:root`/`.ember` and `.ember-light` blocks from `styles.css` §1 + §8 into
your app's global CSS. If you use Tailwind v4, register the aliases in `@theme`
(see root `README.md` for the exact snippet). Minimum viable set:

```css
/* app.css */
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
  --tw-primary: 244 63 94;
  --tw-amber: 245 158 11;
  --tw-destructive: 220 38 38;
  --tw-success: 16 185 129;
  --tw-info: 34 211 238;
  --tw-ring: 244 63 94;
}
```

v2 extras worth taking on day one: `--ease-out/spring`, `--dur-*`,
`--shadow-*`, `--z-*`, `--chart-1..6` (see `styles.css` §8).

## 2. Theme: one store, one class

The whole system keys off a single class on `<html>`: `.ember` (dark, default)
or `.ember-light`. Port `sveltekit/src/lib/ember/theme.svelte.ts` as-is:

```svelte
<script>
  import { theme } from '$lib/ember/theme.svelte.js';
</script>

<button onclick={() => theme.toggle()}>
  {theme.value === 'light' ? 'Dark' : 'Light'} mode
</button>
```

And keep the pre-paint script from `sveltekit/src/app.html` so the persisted
theme applies before first render (no dark-mode flash).

## 3. Effects are actions, not components

Spotlight, reveal-on-scroll and counters work on **any element** via Svelte actions
(`sveltekit/src/lib/ember/actions.svelte.ts`):

```svelte
<script>
  import { count, reveal, spotlight } from '$lib/ember/actions.svelte.js';
</script>

<div class="stat-card spotlight" use:spotlight use:reveal={{ delay: 80 }}>
  <div class="stat-label">Requests</div>
  <div class="stat-value" use:count={{ to: 84200, format: 'compact' }}>0</div>
</div>
```

## 4. Components: class-first, prop-thin

Components in `sveltekit/src/lib/ember/` are thin typed wrappers over the same
class names the mockups use. Styling stays in CSS — props only switch variants:

```svelte
<script>
  import { Badge, Button, Card, Modal, StatCard } from '$lib/ember/index.js';
  let open = $state(false);
</script>

<Card title="Top models" description="By token usage" spotlight>
  {#snippet headerExtra()}<Badge variant="primary">live</Badge>{/snippet}
  <StatCard label="Requests" value={84200} format="compact" delta="2.1% wk" deltaTone="down" />
  <Button variant="ember" size="sm" onclick={() => (open = true)}>Open dialog</Button>
</Card>

<Modal bind:open title="Revoke API Key">…</Modal>
```

Class ↔ component map:

| Static class | Svelte twin | Notes |
|---|---|---|
| `.btn .btn-*` | `Button.svelte` | `variant`, `size`, `href` → renders `<a>` |
| `.card` | `Card.svelte` | `title`, `description`, `headerExtra`/`footer` snippets |
| `.badge` | `Badge.svelte` | `variant`, `dot` |
| `.stat-card` | `StatCard.svelte` | numeric `value` auto-animates via `use:count` |
| `.switch` | `Switch.svelte` | `bind:checked` |
| `.segmented` | `Segmented.svelte` | `bind:value` + `options` |
| `.progress` | `Progress.svelte` | animated `value`, `tone` |
| `.dialog-overlay` | `Modal.svelte` | `bind:open`, Esc + scrim close |
| `#ember-toasts` | `toast` store + `Toasts.svelte` | `toast.success/info/warning/error()` |
| `.cmdk-*` | `CommandPalette.svelte` | ⌘K built in, `goto()` navigation |
| `.bars` | `TokenBars.svelte` | seeded data — SSR-safe |
| `.input` / `.field-*` | `TextField.svelte` | `bind:value`, `mono`, `multiline`, `hint` |
| `.tabs` | `Tabs.svelte` | `bind:value` + `tabs` (+ optional badges) |
| `.dropdown` / `.menu` | `Dropdown.svelte` | render-prop `trigger` snippet, click-outside close |
| `.slide-panel` | `SlidePanel.svelte` | `bind:open`, Esc + scrim close |
| `.banner` | `Banner.svelte` | `ember` / `ghost` variants |
| `.codeblock` | `CodeBlock.svelte` | title + copy button built in |
| `.avatar` | `Avatar.svelte` / `AvatarStack.svelte` | initials + gradient, `+N` overflow |
| `.empty-state` | `EmptyState.svelte` | icon + title + action snippet |
| `.pagination` | `Pagination.svelte` | `bind:page`, ellipsis window |
| `.search-field` | `SearchField.svelte` | `bind:value`, clear button, ⌘K hint |
| copy buttons | `CopyButton.svelte` | clipboard + toast built in |
| app shell | `Shell.svelte` | sidebar + topbar + mobile nav |

Example routes in `sveltekit/src/routes/`: `/` dashboard (bars, sparklines,
activity), `/chat` (word-by-word streaming, composer, model switcher, RAG panel),
`/api-keys` (filters, bulk-select, create-key slide-over with one-time reveal),
`/files` (RAG corpus browser, dropzone, preview slide-over), `/monitor` (live
telemetry: ticking stats, latency line, throughput, donut, event log),
`/users` (tabs, role/presence filters, bulk bar, invite modal), `/tokens`
(data-driven swatches), `/components` (every component, live), `/patterns`
(validation, async states, confirmations, shortcuts), `/tailwind`
(utility-first twin of the same tokens).

| Static class | Svelte twin | Notes |
|---|---|---|
| `.spark` (big) | `LineChart.svelte` | SVG line + area, `id`-prefixed gradients (SSR-safe) |
| — | `Donut.svelte` | share-of-total ring + legend |
| `.input` + error | `TextField` `error` prop | red ring + message, `aria-invalid` |

## 8. Tailwind v4 (optional dialect)

Prefer utilities? `sveltekit/src/lib/ember/tailwind.css` maps `@theme` straight
onto the runtime `--tw-*` variables — `bg-card`, `text-muted-foreground`,
`border-border` follow `.ember` / `.ember-light` automatically, and the scale
overrides (`--text-sm: 13px`, `--radius-md: 6px`) keep utilities pixel-identical
to the class-first components. Preflight is deliberately **off** (Ember has its
own reset). See the live side-by-side at `/tailwind`.

## 5. Icons

`src/lib/ember/icons.ts` + `Icon.svelte` are a 1:1 port of `icons.js`. Names match
the FontAwesome solids prod uses, so migration is mechanical:

```svelte
<Icon name="key" size={14} />
<!-- ⇔ <i class="fa-solid fa-key"></i> -->
```

## 6. Behaviour ports (`ember.js` → runes)

| `ember.js` | Svelte equivalent |
|---|---|
| `Ember.theme` | `theme.svelte.ts` |
| `Ember.toast` | `toast.svelte.ts` + `<Toasts />` |
| `EmberPalette` | `CommandPalette.svelte` (⌘K listener included) |
| spotlight / reveal / counters | `actions.svelte.ts` |
| tabs / dropdowns / table-select / filters | local `$state` (see `components/+page.svelte` for the table pattern) |
| dialogs / slide-panels | `Modal.svelte` / `bind:open` + `.slide-panel` classes |

## 7. Checklist for `web-svelte/`

- [ ] Paste token blocks into `app.css` (+ `@theme` aliases if Tailwind v4)
- [ ] Copy `theme.svelte.ts` + pre-paint script in `app.html`
- [ ] Copy `actions.svelte.ts`, `toast.svelte.ts`, `icons.ts`, `Icon.svelte`
- [ ] Copy components as needed from `sveltekit/src/lib/ember/`
- [ ] Replace hardcoded hex / phantom vars (see `admin-models-before-after.html`
      for the before/after proof)
- [ ] Verify `.ember-light` — every surface must use semantic tokens, never hex
