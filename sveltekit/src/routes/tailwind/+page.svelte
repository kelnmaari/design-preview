<script lang="ts">
	import { Badge, Card, CodeBlock, reveal } from '$lib/ember/index.js';

	const THEME_SNIPPET = `@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
/* no preflight — Ember brings its own reset */

@theme {
  --color-card: rgb(var(--tw-card));
  --color-border: rgb(var(--tw-border));
  --color-primary: rgb(var(--tw-primary));
  --color-muted-foreground: rgb(var(--tw-muted-foreground));
  --text-sm: 13px;   /* Ember scale, not Tailwind's 14px */
  --radius-md: 6px;
}`;

	const USAGE_SNIPPET = `<!-- utility-first, same tokens, theme-aware -->
<div class="rounded-md border border-border bg-card p-4">
  <div class="text-xs font-medium uppercase text-muted-foreground">
    Requests
  </div>
  <div class="font-mono text-2xl font-semibold text-foreground">
    84.2k
  </div>
</div>`;

	const CHIPS = [
		{ label: 'bg-primary', cls: 'bg-primary text-white' },
		{ label: 'bg-amber', cls: 'bg-amber text-white' },
		{ label: 'bg-success', cls: 'bg-success text-white' },
		{ label: 'bg-info', cls: 'bg-info text-white' },
		{ label: 'bg-destructive', cls: 'bg-destructive text-white' },
		{ label: 'bg-muted', cls: 'bg-muted text-muted-foreground' }
	];
</script>

<svelte:head>
	<title>Ember · Tailwind (SvelteKit)</title>
</svelte:head>

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">System</div>
		<h1 class="page-title">Tailwind v4 <span class="text-gradient-ember">same tokens</span></h1>
		<p class="page-subtitle">
			Utilities bound to the live <code class="code-chip">--tw-*</code> variables — flip the theme,
			utilities follow. No preflight, zero conflicts.
		</p>
	</div>
	<Badge variant="info">tailwindcss v4</Badge>
</div>

<div class="block" use:reveal>
	<div class="block-title">Same card, two dialects</div>
	<div class="grid grid-2 gap-3">
		<div>
			<div class="label">class-first · .stat-card</div>
			<div class="stat-card">
				<div class="stat-label">Requests</div>
				<div class="stat-value">84.2k</div>
				<div class="stat-delta text-destructive">↓ 2.1% <span class="text-subtle">vs last wk</span></div>
			</div>
		</div>
		<div>
			<div class="label">utility-first · bg-card border-border …</div>
			<div class="rounded-md border border-border bg-card p-4">
				<div class="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Requests</div>
				<div class="font-mono text-2xl font-semibold tabular-nums text-foreground">84.2k</div>
				<div class="font-mono text-[11px] text-destructive">↓ 2.1% <span class="text-subtle">vs last wk</span></div>
			</div>
		</div>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Theme palette · live utilities</div>
	<div class="flex gap-2" style="flex-wrap:wrap;">
		{#each CHIPS as c (c.label)}
			<span class="rounded-md px-3 py-1.5 font-mono text-xs font-semibold {c.cls}">{c.label}</span>
		{/each}
	</div>
	<p class="text-xs text-subtle mt-3">
		Every chip above is a single utility (<code class="code-chip">bg-primary</code>,
		<code class="code-chip">text-muted-foreground</code>…) resolved from
		<code class="code-chip">src/lib/ember/tailwind.css</code>.
	</p>
</div>

<div class="block" use:reveal>
	<div class="block-title">Copy-paste into web-svelte</div>
	<div class="grid grid-2 gap-3">
		<CodeBlock title="tailwind.css — @theme" language="css" code={THEME_SNIPPET} />
		<CodeBlock title="usage" language="html" code={USAGE_SNIPPET} />
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">When to use which</div>
	<Card>
		<table class="table">
			<thead><tr><th>Situation</th><th>Use</th><th>Why</th></tr></thead>
			<tbody>
				<tr>
					<td><span class="font-medium">Shared primitives</span></td>
					<td><code class="code-chip">.btn .card .badge</code></td>
					<td class="cell-subtle">One definition, every page identical.</td>
				</tr>
				<tr>
					<td><span class="font-medium">One-off layout</span></td>
					<td><code class="code-chip">flex gap-3 mt-4</code></td>
					<td class="cell-subtle">Faster than a scoped class.</td>
				</tr>
				<tr>
					<td><span class="font-medium">Theme-aware color</span></td>
					<td><code class="code-chip">bg-card text-primary</code></td>
					<td class="cell-subtle">Follows .ember / .ember-light automatically.</td>
				</tr>
				<tr>
					<td><span class="font-medium">Effects & motion</span></td>
					<td><code class="code-chip">use:spotlight</code></td>
					<td class="cell-subtle">Actions beat utilities for behaviour.</td>
				</tr>
			</tbody>
		</table>
	</Card>
</div>

<style>
	.block { margin-bottom: 2.5rem; }
	.block:last-child { margin-bottom: 0; }
	.block-title {
		font-size: 11px; font-weight: 600; text-transform: uppercase;
		letter-spacing: 0.08em; color: var(--color-muted-foreground);
		margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;
	}
	.block-title::after { content: ''; flex: 1; height: 1px; background: var(--color-border); }
	.label { font-size: 11px; color: var(--color-subtle); font-family: var(--font-mono); margin-bottom: 0.4rem; }
</style>
