# Ember Design System — Agent Guide

> **For AI agents:** this is the single source of truth for building UI in this
> project. Import from the barrel, use the tokens, follow the recipes. Do not
> invent new primitives (buttons, inputs, modals, toasts) — they already exist.

- **What:** 57 typed Svelte 5 components + Tailwind v4 theme + design tokens.
- **Style:** premium dark-first admin/RAG aesthetic, Amber→Rose signature
  gradient, dense 13px rhythm, Inter + JetBrains Mono.
- **Themes:** 6 first-class themes, 3 dark (`ember`, `midnight`, `forest`) + 3 light
  (`light`, `frost`, `sand`). Same `--tw-*` contract — gradients, shadows,
  focus rings and orbs re-skin automatically. Brand moments (logo, animated
  hero gradient) intentionally stay Ember in every theme.
- **Portability:** every component is **one `.svelte` file** (logic + scoped
  styles). The only shared dependency is the tokens file `ember.css`.

## 1. File map

```
src/lib/ember/
  AGENTS.md            <- you are here
  index.ts             <- ONLY import through this barrel
  ember.css            <- tokens + base classes (import once in root layout)
  tailwind.css         <- Tailwind v4 @theme bound to the same tokens
  *.svelte             <- the 57 components (one file each)
  icons.ts             <- stroke icon set (IconName type)
  theme.svelte.ts      <- theme store (6 themes, THEMES meta, persisted)
  toast.svelte.ts      <- toast store
  actions.svelte.ts    <- spotlight, reveal, count, clickOutside
  utils.ts             <- sleep, copyText, seededRandom, timeAgo, formatBytes
```

Live demos (run `npm run dev`, open these to see every state):

| Route | Shows |
|---|---|
| `/components` | gallery hub — primitives |
| `/components/forms` | all form controls + validated-form recipe |
| `/components/data` | searchable/sortable table recipe, lists, timeline |
| `/components/overlays` | alerts, tooltips, popovers, confirms, toasts, states |
| `/components/content` | headers, stepper, accordion, chat UI |
| `/patterns` | validation, async states, confirmations, shortcuts |
| `/chat`, `/api-keys`, `/users`, `/files`, `/monitor` | full example pages |

## 2. Setup (new app)

```ts
// 1. copy src/lib/ember/* into your project
// 2. root layout:
import '$lib/ember/ember.css';
import '$lib/ember/tailwind.css'; // if you use Tailwind v4
```

```svelte
<!-- 3. layout shell (toast host + command palette live here) -->
<script>
  import { CommandPalette, Shell, Toasts } from '$lib/ember/index.js';
  let palette = $state(false);
</script>

<Shell onPalette={() => (palette = true)}>
  {@render children()}
</Shell>
<Toasts />
<CommandPalette bind:open={palette} />
```

```ts
// 4. vite.config.ts — Tailwind v4 plugin (optional but recommended)
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [tailwindcss(), sveltekit()] });
```

**Rules:** never import a component file directly — always
`from '$lib/ember/index.js'`. Never edit `ember.css` tokens to restyle one
page — use props, then utilities, then a scoped `<style>` block.

## 3. Tokens

Colors are `R G B` triples (`--tw-*`) + resolved aliases (`--color-*`).
Both class-first and utility-first styles read the same values, and both
follow `.ember` / `.ember-light` automatically.

| Token | Class / utility | Use for |
|---|---|---|
| `--color-background` | `bg-background` | page base |
| `--color-card` | `bg-card` | cards, panels |
| `--color-card-elevated` | `bg-card-elevated` | popovers, tooltips |
| `--color-muted` | `bg-muted` | wells, user bubbles, hovers |
| `--color-border` / `-strong` | `border-border` | hairlines |
| `--color-foreground` | `text-foreground` | primary text |
| `--color-muted-foreground` | `text-muted-foreground` | secondary text |
| `--color-subtle` | `text-subtle` | hints, meta, mono |
| `--color-primary` | `bg-primary` / `text-primary` | brand ember |
| `--color-amber` | `bg-amber` | warning, stars |
| `--color-destructive` | `text-destructive` | errors, danger |
| `--color-success` / `--color-info` | `bg-success` / `bg-info` | status |
| `--font-sans` / `--font-mono` | `font-mono` | Inter / JetBrains Mono |
| type scale | `text-xs/sm/base` = 11/13/14px | dense admin type |
| `--radius-sm/md/lg` | `rounded-sm/md/lg` = 4/6/6px | corners |

Gradient signature: `text-gradient-ember`, `bg-gradient-ember`,
`btn-ember`. Elevation: `var(--shadow-sm/md/lg)`. Motion:
`var(--dur-fast/normal/slow)`, `var(--ease-out)`.

## 4. Component catalog

`bind:` = two-way prop. `→` = callback prop. Snippets: `children` (default
slot), plus named ones listed.

### Forms — every control: `label` `hint` `error` `required`

| Component | One-liner | Key props |
|---|---|---|
| `Field` | label + hint/error wrapper for custom inputs | `id` `label` `hint` `error` `required` `children` |
| `TextField` | text / password / textarea / mono / readonly | `bind:value` `type` `multiline` `rows` `mono` `readonly` `disabled` `autocomplete` `→onchange` `→onenter` |
| `Select` | styled native select (a11y-first) | `bind:value` `options: SelectOption[]` `placeholder` `disabled` `→onchange` |
| `Checkbox` | box + indeterminate (bulk select) | `bind:checked` `label` `hint` `error` `indeterminate` `→onchange` |
| `RadioGroup` | vertical / horizontal options | `bind:value` `options: RadioOption[]` `name` `orientation` `→onchange` |
| `Slider` | range with formatted value | `bind:value` `min` `max` `step` `format` `showValue` `→onchange` |
| `Switch` | binary toggle | `bind:checked` `label` `→onchange` |
| `InputGroup` | input with prefix/suffix addons | `bind:value` `left` / `right` (string or snippet) |
| `Dropzone` | drag-drop upload + managed file list | `bind:files` `accept` `multiple` `showList` `→onfiles` |
| `SearchField` | search box with icon + ⌘K hint | `bind:value` `placeholder` `kbd` `→oninput` |

### Data

| Component | One-liner | Key props |
|---|---|---|
| `DataTable` | sortable, selectable table + loading/empty | `columns: DataTableColumn[]` `rows` `rowId` `bind:sortKey` `bind:sortDir` `sortMode` (`client`\|`manual`) `selectable` `bind:selected` `loading` `cell` snippet `→onrowclick` `→onsort` `→onselection` |
| `ListGroup` | icon rows (links or action buttons) | `items: ListGroupItem[]` (`icon` `title` `desc` `badge` `href` `active` `disabled`) `→onselect` |
| `Timeline` | toned vertical event feed | `items: TimelineItem[]` (`time` `title` `desc` `tone`) |
| `Presence` | status dot + label | `status` (`online`\|`idle`\|`busy`\|`offline`) `label` `size` `pulse` `showLabel` |
| `Pagination` | compact pages with ellipsis | `bind:page` `total` `→onchange` |

### Overlays & feedback

| Component | One-liner | Key props |
|---|---|---|
| `Modal` | centered dialog, Esc + overlay close | `bind:open` `title` `description` `footer` snippet `→onclose` |
| `ConfirmDialog` | destructive confirm, optional type-to-confirm | `bind:open` `title` `description` `confirmLabel` `danger` `requireText` `loading` `→onconfirm` `→oncancel` |
| `SlidePanel` | right-side drawer | `bind:open` `title` `description` `footer` `→onclose` |
| `Dropdown` | trigger + floating menu | `trigger` snippet `align` `children` |
| `Popover` | rich click bubble | `trigger` snippet (`{open,toggle}`) `title` `side` `align` `bind:open` |
| `Tooltip` | CSS-only hint, 4 positions | `text` `position` `delay` `children` |
| `Alert` | inline banner, 4 tones | `variant` (`info`\|`success`\|`warning`\|`danger`) `title` `description` `dismissible` `bind:open` |
| `Banner` | promo/feature strip | `variant` (`ember`\|`ghost`) `icon` `title` `subtitle` |
| `Toasts` + `toast` | global notifications (host in layout!) | `toast.success/info/warning/error(title, desc?, ms?)` |
| `CommandPalette` | ⌘K fuzzy navigation | `bind:open` (commands are data inside; extend there) |
| `EmptyState` | icon + title + action | `icon` `title` `description` `children` |
| `ErrorState` | error + retry button | `title` `description` `retryLabel` `→onretry` |
| `Skeleton` | shimmer placeholder lines/blocks | `width` `height` `radius` `count` `gap` |
| `Spinner` | inline loader | `size` `label` |
| `Progress` | bar with tone + animation | `value` `tone` (`ember`\|`primary`\|`success`) `animate` |

### Content & navigation

| Component | One-liner | Key props |
|---|---|---|
| `PageHeader` | eyebrow + title + subtitle + actions | `eyebrow` `title` `subtitle` `actions` snippet |
| `SectionTitle` | uppercase micro-label + rule + extras | `title` `children` |
| `Breadcrumb` | home-led path | `items: Crumb[]` (`label` `href`) `→onnavigate` |
| `Stepper` | wizard steps, h/v, clickable | `steps: Step[]` `bind:current` `orientation` `clickable` `→ongoto` |
| `Accordion` | single/multi disclosure, animated | `items: AccordionItem[]` (`title` `badge` `body`) `bind:openIds` `multiple` `detail` snippet |
| `Tabs` | underline tabs with badges | `tabs: Tab[]` `bind:value` `→onchange` |
| `Segmented` | iOS-style option switch | `options` `bind:value` `→onchange` |
| `Kbd` | `<kbd>` single or chord | `keys` (string or array) |
| `Divider` | hairline, optional centered label | `label` `spacing` |
| `Rating` | interactive/read-only stars | `bind:value` `max` `readonly` `→onchange` |
| `ChatMessage` | RAG bubble: sources, votes, streaming caret | `role` `text` (or rich `children`) `streaming` `sources: ChatSource[]` `model` `time` `→oncopy` `→onlike` `→ondislike` `→onsource` |
| `ChatComposer` | autogrow input, Enter-send | `bind:value` `placeholder` `sending` `hint` `→onsend` |

### Cards, buttons, display

| Component | One-liner | Key props |
|---|---|---|
| `Card` | surface + header/body/footer | `title` `description` `spotlight` `headerExtra` `footer` |
| `StatCard` | animated metric + delta | `label` `value` `format` (`int`\|`compact`\|`plain`) `delta` `deltaTone` `icon` |
| `Button` | 6 variants × 3 sizes, link mode | `variant` (`primary`\|`ember`\|`secondary`\|`outline`\|`ghost`\|`destructive`) `size` (`sm`\|`md`\|`lg`) `href` + all native button attrs |
| `Badge` | status pill, optional dot | `variant` (`primary`\|`amber`\|`success`\|`info`\|`destructive`\|`muted`) `dot` |
| `Avatar` / `AvatarStack` | initials tiles + overlap group | `initials` `gradient` `size` / `avatars` `extra` |
| `CopyButton` | copy-to-clipboard with check morph | `text` `label` `size` `preview` |
| `CodeBlock` | titled code card + copy | `title` `language` `code` |
| `Shell` | app frame: sidebar, topbar, theme | `→onPalette` `children` |
| `ThemeToggle` | theme picker dropdown (persisted) | `THEMES` meta + `theme.set(id)` |
| `Icon` | 90+ stroke icons | `name: IconName` `size` — see `icons.ts` for names |

### Charts (zero dependencies, SSR-safe SVG)

| Component | One-liner | Key props |
|---|---|---|
| `LineChart` | line + area + headline | `id` (required, unique) `data: number[]` `min` `max` `label` `format` |
| `Donut` | share ring + legend | `segments: DonutSegment[]` (`label` `value` `color`) `size` `thickness` `centerValue` `centerLabel` |
| `Sparkline` | tiny trend polyline | `points` (svg points string) `width` `height` |
| `TokenBars` | 7-day usage bars | `days` |

### Actions, stores, utils

```ts
import {
  clickOutside, count, reveal, spotlight,   // actions: use:clickOutside={fn} etc.
  theme, THEMES,                             // theme.value: EmberTheme id; theme.set(id); theme.toggle() cycles
  toast,                                     // toast.success/info/warning/error(title, desc?, ms?)
  sleep, copyText, seededRandom, timeAgo, formatBytes
} from '$lib/ember/index.js';
```

- `use:spotlight` — cursor glow on `.card` (writes `--mx/--my`).
- `use:reveal` / `use:reveal={{ delay }}` — fade-up on scroll into view.
- `use:count={{ to, format, duration }}` — animated number (`int`/`compact`/`plain`).
- `use:clickOutside={close}` — close popovers/menus.
- `seededRandom(seed)` — deterministic demo data that matches between SSR
  and client (never `Math.random()` in rendered output).

## 5. Recipes (copy-paste)

### Validated form

```svelte
<script>
  import { Button, Select, TextField, Checkbox, toast } from '$lib/ember/index.js';
  let email = $state(''), role = $state(''), ok = $state(false);
  let emailError = $state(''), roleError = $state(''), okError = $state('');
  function submit() {
    emailError = /.+@.+\..+/.test(email) ? '' : 'Enter a valid email address.';
    roleError = role ? '' : 'Pick a role.';
    okError = ok ? '' : 'Required.';
    if (!emailError && !roleError && !okError) toast.success('Invited', email);
  }
</script>

<TextField label="Email" required bind:value={email} error={emailError} />
<Select label="Role" required options={ROLES} placeholder="Choose…" bind:value={role} error={roleError} />
<Checkbox label="I agree" required bind:checked={ok} error={okError} />
<Button variant="ember" onclick={submit}>Invite</Button>
```

### Search + sort + select + paginate table

```svelte
<script>
  import { Badge, DataTable, Pagination, SearchField } from '$lib/ember/index.js';
  const columns = [
    { key: 'name', label: 'Key', sortable: true },
    { key: 'requests', label: 'Requests', sortable: true, align: 'right' },
    { key: 'status', label: 'Status' }
  ];
  let query = $state(''), page = $state(1), selected = $state([]);
  let sortKey = $state('requests'), sortDir = $state('desc');
  const filtered = $derived(rows.filter((r) => r.name.includes(query)));
  const paged = $derived(filtered.slice((page - 1) * 8, page * 8));
</script>

<SearchField bind:value={query} placeholder="Filter…" />
<DataTable {columns} rows={paged} selectable bind:selected bind:sortKey bind:sortDir>
  {#snippet cell({ column, value })}
    {#if column.key === 'status'}<Badge variant="success" dot>{value}</Badge>
    {:else}{value}{/if}
  {/snippet}
</DataTable>
<Pagination bind:page total={Math.ceil(filtered.length / 8)} />
```

### Destructive confirm (always this, never `confirm()`)

```svelte
<script>
  import { Button, ConfirmDialog, toast } from '$lib/ember/index.js';
  let open = $state(false);
</script>

<Button variant="destructive" onclick={() => (open = true)}>Delete…</Button>
<ConfirmDialog
  bind:open
  title="Delete tenant “OldCorp”?"
  description="Removes 6 users and 11 keys."
  confirmLabel="Delete permanently"
  requireText="oldcorp"
  onconfirm={() => toast.success('Deleted', 'OldCorp is gone.')}
/>
```

### Chat UI

```svelte
<script>
  import { ChatComposer, ChatMessage, sleep } from '$lib/ember/index.js';
  let messages = $state([{ id: 0, role: 'assistant', text: 'Ask me anything.' }]);
  let thinking = $state(false);
  async function ask(text) {
    messages = [...messages, { id: crypto.randomUUID(), role: 'user', text }];
    thinking = true;
    const reply = await queryRag(text); // your endpoint
    messages = [...messages, { id: crypto.randomUUID(), role: 'assistant', ...reply }];
    thinking = false;
  }
</script>

{#each messages as m (m.id)}
  <ChatMessage role={m.role} text={m.text} sources={m.sources ?? []} />
{/each}
{#if thinking}<ChatMessage role="assistant" text="" streaming />{/if}
<ChatComposer onsend={ask} sending={thinking} />
```

### Async states (loading → data / empty / error)

```svelte
<script>
  import { DataTable, EmptyState, ErrorState, Skeleton } from '$lib/ember/index.js';
  let state = $state('loading'); // 'loading' | 'data' | 'empty' | 'error'
</script>

{#if state === 'loading'}<Skeleton count={4} />
{:else if state === 'error'}<ErrorState description="worker-03 refused." onretry={reload} />
{:else if !rows.length}<EmptyState title="No results" description="Adjust filters." />
{:else}<DataTable {columns} {rows} />{/if}
```

### Modal / drawer / popover / tooltip / toast

```svelte
<Modal bind:open title="Invite" description="…" onclose={reset}>
  …form…  {#snippet footer()}<Button …>Cancel</Button><Button …>Send</Button>{/snippet}
</Modal>

<Tooltip text="Permanent action" position="top"><Button>Delete</Button></Tooltip>

<Popover title="Retention">
  {#snippet trigger({ toggle })}<Button onclick={toggle}>Policy</Button>{/snippet}
  Prompts kept 30 days…
</Popover>

toast.success('Saved', 'Preferences updated.');
toast.error('Deploy failed', 'worker-03 out of VRAM.');
```

### Page scaffold

```svelte
<PageHeader eyebrow="Admin" title="Users" subtitle="…">
  {#snippet actions()}<Button variant="ember">Invite</Button>{/snippet}
</PageHeader>
<Breadcrumb items={[{ label: 'Admin', href: '/users' }, { label: 'Invite' }]} />
<SectionTitle title="Details" />
<Card title="…" description="…">…</Card>
```

## 6. Rules (read before writing UI)

1. **Barrel only.** `from '$lib/ember/index.js'`. Never deep-import files.
2. **Labels on everything.** Every input gets `label`; errors go in `error`
   (never `alert()` / `confirm()` / `prompt()`).
3. **Destructive = `ConfirmDialog`.** Everything else confirms with a toast.
4. **Async = 4 states.** `Skeleton` → data / `EmptyState` / `ErrorState` with
   retry. Never a blank card, never an unhandled rejection.
5. **Icons = `Icon name="…"`.** Browse names in `icons.ts`. No emojis in UI.
6. **No `href="#"`.** Links need real hrefs; otherwise use `<Button>`.
7. **Dark-first, tokens only.** No hardcoded hex in components — use
   `var(--color-*)` / utilities. Preview all 6 themes (`/tokens`) if you
   touch colors — never hardcode per-theme hex, use the tokens.
8. **SSR-safe.** No `Math.random()`/`Date.now()` in rendered output — use
   `seededRandom()`. Browser APIs only in event handlers or `$effect`.
9. **A11y is enforced** (`svelte-check` must stay 0/0): real `<button>`s,
   `aria-label` on icon-only buttons, `role="alert"` comes free with `error`.
10. **One concern per file.** Page routes compose components; shared UI goes
    in `src/lib/ember/` as a single portable `.svelte` file.

## 7. Bootstrap → Ember map

| You know (Bootstrap) | Use (Ember) | Notes |
|---|---|---|
| Alert | `Alert` | 4 tones + dismiss |
| Badge | `Badge` | + dot mode |
| Breadcrumb | `Breadcrumb` | data-driven |
| Buttons / Button group | `Button` / `Segmented` | 6 variants |
| Card | `Card` | + spotlight, header/footer |
| Close button | built into `Modal`/`Alert`/`Toast` | — |
| Collapse / Accordion | `Accordion` | animated grid-rows |
| Dropdowns | `Dropdown` / `Popover` | menu vs rich bubble |
| Forms / Floating labels | `Field` + controls | label/hint/error built in |
| Input group | `InputGroup` | string or snippet addons |
| List group | `ListGroup` | data-driven |
| Modal | `Modal` / `ConfirmDialog` | + `SlidePanel` (offcanvas) |
| Navs / Tabs | `Tabs` | badge support |
| Navbar | `Shell` | full app frame |
| Offcanvas | `SlidePanel` | right drawer |
| Pagination | `Pagination` | ellipsis logic built in |
| Placeholders | `Skeleton` | shimmer |
| Popovers / Tooltips | `Popover` / `Tooltip` | — |
| Progress | `Progress` | tones + animate |
| Spinners | `Spinner` | + in-button pattern |
| Toasts | `toast` + `<Toasts/>` | 4 kinds, host in layout |
| Tables | `DataTable` | sort/select/async |
| Carousel | — (intentional) | admin UI rarely needs one; ask before adding |
| Scrollspy | — (intentional) | use `use:reveal` for scroll effects |

## 8. Verification

After changing UI code, all three must pass:

```bash
npm run check    # svelte-check: 0 errors, 0 warnings (a11y enforced)
npm run build    # vite build must succeed
# + open the touched routes, confirm 200 and eyeball the states
```

Component checklist for new additions: typed `Props` interface, `label`/
`hint`/`error` on inputs, `aria-label` on icon-only buttons, no emojis,
scoped styles with `ember-` prefix, barrel export, demo in the matching
`/components/*` gallery, catalog row in this file.
