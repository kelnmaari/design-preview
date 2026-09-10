<script lang="ts">
	import { Badge, THEMES, reveal, theme, toast, type EmberTheme } from '$lib/ember/index.js';

	interface Swatch {
		name: string;
		hex: string;
		token: string;
		bg: string;
		fg?: string;
	}

	const ACCENTS: Swatch[] = [
		{ name: 'Primary · Rose', hex: '#F43F5E', token: '--tw-primary', bg: '#F43F5E' },
		{ name: 'Amber', hex: '#F59E0B', token: '--tw-amber', bg: '#F59E0B' },
		{ name: 'Destructive', hex: '#DC2626', token: '--tw-destructive', bg: '#DC2626' },
		{ name: 'Success', hex: '#10B981', token: '--tw-success', bg: '#10B981' },
		{ name: 'Info', hex: '#22D3EE', token: '--tw-info', bg: '#22D3EE' },
		{ name: 'Secondary', hex: '#27272A', token: '--tw-secondary', bg: 'var(--color-muted)' }
	];

	const STATS: Swatch[] = [
		{ name: 'Conversations', hex: '#FBBF24', token: '--tw-stat-conversations', bg: '#FBBF24' },
		{ name: 'API Keys', hex: '#FB7185', token: '--tw-stat-apikeys', bg: '#FB7185' },
		{ name: 'Models', hex: '#E879F9', token: '--tw-stat-models', bg: '#E879F9' },
		{ name: 'Requests', hex: '#FB923C', token: '--tw-stat-requests', bg: '#FB923C' }
	];

	const SURFACES = [
		{ name: 'Background', token: '--tw-background', bg: 'var(--color-background)' },
		{ name: 'Card', token: '--tw-card', bg: 'var(--color-card)' },
		{ name: 'Card Elevated', token: '--tw-card-elevated', bg: 'var(--color-card-elevated)' },
		{ name: 'Muted', token: '--tw-muted', bg: 'var(--color-muted)' }
	];

	const THEME_DESC: Record<EmberTheme, string> = {
		ember: 'Signature warm dark · rose accent',
		midnight: 'Cool slate dark · blue accent',
		forest: 'Deep green dark · emerald accent',
		light: 'Neutral light · rose accent',
		frost: 'Cool slate light · blue accent',
		sand: 'Warm paper light · rose accent'
	};

	function copy(text: string) {
		navigator.clipboard?.writeText(text).catch(() => {});
		toast.success('Copied to clipboard', text);
	}
</script>

<svelte:head>
	<title>Ember · Tokens (SvelteKit)</title>
</svelte:head>

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">Design System · v2.0</div>
		<h1 class="page-title">Design Tokens <span class="text-gradient-ember">in Svelte</span></h1>
		<p class="page-subtitle">
			Same <code class="code-chip">--tw-*</code> triples as the static preview — rendered from typed data.
			Click any swatch to copy.
		</p>
	</div>
	<Badge variant="success" dot>SvelteKit</Badge>
</div>

<div class="section-title" use:reveal>Themes — 3 dark + 3 light</div>
<p class="text-sm text-muted-foreground" style="max-width:70ch;margin:0 0 1rem;" use:reveal>
	Every theme implements the same <code class="code-chip">--tw-*</code> contract — gradients,
	shadows and charts re-skin automatically. Click a card to preview it live.
</p>
<div class="theme-cards mb-4" use:reveal>
	{#each THEMES as t (t.id)}
		<button class="theme-card" class:active={theme.value === t.id} onclick={() => theme.set(t.id)}>
			<span class="theme-card-swatches">
				<span style="background:{t.swatch[0]}"></span>
				<span style="background:{t.swatch[1]}"></span>
				<span style="background:{t.swatch[2]}"></span>
			</span>
			<span class="theme-card-name">
				{t.label}
				<Badge variant={t.mode === 'dark' ? 'info' : 'amber'}>{t.mode}</Badge>
			</span>
			<span class="theme-card-desc">{THEME_DESC[t.id]}</span>
		</button>
	{/each}
</div>

<div class="section-title" use:reveal>Surfaces</div>
<div class="surf-row mb-4" use:reveal>
	{#each SURFACES as s (s.token)}
		<button class="surf" style="background:{s.bg};text-align:left" onclick={() => copy(s.token)}>
			<div class="s-name">{s.name}</div>
			<div class="s-tok">{s.token}</div>
		</button>
	{/each}
</div>

<div class="section-title" use:reveal>Accents — signature warm spectrum</div>
<div class="swatch-row mb-4" use:reveal>
	{#each ACCENTS as s (s.token)}
		<button class="swatch" onclick={() => copy(s.hex)}>
			<div class="chip" style="background:{s.bg};"><span class="copy-hint">copy</span></div>
			<div class="meta" style="text-align:left">
				<div class="name">{s.name}</div>
				<div class="hex">{s.hex}</div>
				<div class="tok">{s.token}</div>
			</div>
		</button>
	{/each}
</div>

<div class="section-title" use:reveal>Signature Gradient</div>
<div class="grid grid-2 gap-3 mb-4" use:reveal>
	<button
		class="grad-strip bg-gradient-animated noise"
		onclick={() => copy('linear-gradient(135deg, #F59E0B → #F43F5E)')}
		style="cursor:pointer"
	>
		<span class="grad-label">animated · 135° · #F59E0B → #F43F5E → #E879F9</span>
	</button>
	<div class="grad-strip" style="background:var(--color-card); align-items:center; justify-content:center;">
		<span class="text-gradient-animated" style="font-size:26px; font-weight:800;">text-gradient-animated</span>
	</div>
</div>

<div class="section-title" use:reveal>Stat Colors</div>
<div class="swatch-row mb-4" use:reveal>
	{#each STATS as s (s.token)}
		<button class="swatch" onclick={() => copy(s.hex)}>
			<div class="chip" style="background:{s.bg};"><span class="copy-hint">copy</span></div>
			<div class="meta" style="text-align:left">
				<div class="name">{s.name}</div>
				<div class="hex">{s.hex}</div>
				<div class="tok">{s.token}</div>
			</div>
		</button>
	{/each}
</div>

<div class="section-title" use:reveal>Typography — Inter + JetBrains Mono</div>
<div class="card mb-4" style="padding: 0 1.25rem;" use:reveal>
	<div class="type-row"><span class="type-label">page-title / 18 600</span><span class="type-sample" style="font-size:18px;font-weight:600;">Dashboard Overview</span></div>
	<div class="type-row"><span class="type-label">body / 13 400</span><span class="type-sample" style="font-size:13px;">The quick brown fox jumps over the lazy dog.</span></div>
	<div class="type-row"><span class="type-label">stat-value / mono 24</span><span class="type-sample font-mono tabular" style="font-size:24px;font-weight:600;">2,418,902</span></div>
	<div class="type-row"><span class="type-label">eyebrow / 11 UPPER</span><span class="eyebrow">SECTION HEADER</span></div>
</div>

<div class="section-title" use:reveal>Elevation</div>
<div class="grid grid-4 gap-3" use:reveal>
	<div class="elev-demo" style="box-shadow:var(--shadow-xs);"><span>--shadow-xs</span></div>
	<div class="elev-demo" style="box-shadow:var(--shadow-md);"><span>--shadow-md</span></div>
	<div class="elev-demo" style="box-shadow:var(--shadow-lg);"><span>--shadow-lg</span></div>
	<div class="elev-demo" style="box-shadow:var(--shadow-ember);"><span>--shadow-ember</span></div>
</div>

<style>
	.section-title {
		font-size: 11px; font-weight: 600; text-transform: uppercase;
		letter-spacing: 0.08em; color: var(--color-muted-foreground);
		margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;
	}
	.section-title::after { content: ''; flex: 1; height: 1px; background: var(--color-border); }
	.swatch-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem; }
	.swatch {
		border: 1px solid var(--color-border); border-radius: var(--radius-lg);
		overflow: hidden; background: var(--color-card);
		transition: transform 0.2s var(--ease-out), box-shadow 0.2s ease;
		cursor: pointer; padding: 0; font-family: inherit; color: inherit;
	}
	.swatch:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
	.swatch .chip { height: 64px; position: relative; }
	.swatch .copy-hint {
		position: absolute; right: 8px; top: 8px;
		font-size: 10px; font-family: var(--font-mono);
		background: rgb(0 0 0 / 0.45); color: #fff;
		padding: 2px 7px; border-radius: 9999px;
		opacity: 0; transition: opacity 0.15s ease;
	}
	.swatch:hover .copy-hint { opacity: 1; }
	.swatch .meta { padding: 0.625rem 0.75rem; }
	.swatch .name { font-size: 12px; font-weight: 600; }
	.swatch .hex { font-family: var(--font-mono); font-size: 11px; color: var(--color-muted-foreground); margin-top: 2px; }
	.swatch .tok { font-family: var(--font-mono); font-size: 10px; color: var(--color-subtle); margin-top: 2px; }
	.surf-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.75rem; }
	.surf {
		padding: 1.25rem; border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		transition: transform 0.2s var(--ease-out);
		cursor: pointer; font-family: inherit; color: inherit;
	}
	.surf:hover { transform: translateY(-2px); }
	.surf .s-name { font-size: 12px; font-weight: 600; }
	.surf .s-tok { font-family: var(--font-mono); font-size: 10.5px; color: var(--color-muted-foreground); margin-top: 2px; }
	.grad-strip {
		height: 96px; border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		display: flex; align-items: flex-end; padding: 0.75rem;
		position: relative; overflow: hidden; font-family: inherit;
	}
	.grad-label { font-family: var(--font-mono); font-size: 11px; color: #fff; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); }
	.type-row { display: flex; align-items: baseline; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); }
	.type-row:last-child { border-bottom: none; }
	.type-label { width: 180px; flex: none; font-family: var(--font-mono); font-size: 11px; color: var(--color-muted-foreground); }
	.elev-demo {
		height: 84px; border-radius: var(--radius-lg);
		background: var(--color-card); border: 1px solid var(--color-border);
		display: flex; align-items: flex-end; padding: 0.625rem;
	}
	.elev-demo span { font-family: var(--font-mono); font-size: 10.5px; color: var(--color-muted-foreground); }
</style>
