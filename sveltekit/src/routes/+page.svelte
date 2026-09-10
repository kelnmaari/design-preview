<script lang="ts">
	import {
		Badge,
		Button,
		Card,
		Icon,
		Progress,
		Segmented,
		Sparkline,
		StatCard,
		TokenBars,
		reveal,
		spotlight,
		toast
	} from '$lib/ember/index.js';

	let showBanner = $state(true);
	let refreshing = $state(false);
	let days = $state('30');

	const AXES: Record<string, string[]> = {
		'7': ['Sep 3', 'Sep 5', 'Sep 7', 'Sep 9'],
		'30': ['Jul 23', 'Aug 2', 'Aug 12', 'Aug 22'],
		'90': ['Jun 12', 'Jul 12', 'Aug 12', 'Sep 9']
	};
	const TOTALS: Record<string, string> = { '7': '612k', '30': '2.4M', '90': '7.1M' };

	const MODELS = [
		{ name: 'gpt-4o-mini', meta: '842k · 1.2k req', w: 92, o: 1 },
		{ name: 'claude-3.5-sonnet', meta: '610k · 880 req', w: 67, o: 0.85 },
		{ name: 'llama-3.1-70b', meta: '421k · 2.4k req', w: 46, o: 0.7 },
		{ name: 'qwen2.5-coder', meta: '198k · 540 req', w: 22, o: 0.55 }
	];

	const CONVS = [
		{ title: 'Refactoring auth middleware', meta: '2m ago · 12 messages' },
		{ title: 'SQL query optimization for analytics', meta: '1h ago · 8 messages' },
		{ title: 'Draft API documentation for v2', meta: '3h ago · 24 messages' },
		{ title: 'Debug WebSocket reconnection logic', meta: 'yesterday · 31 messages' }
	];

	const AVAILABLE = [
		{ name: 'gpt-4o-mini', status: 'STABLE', tone: 'success' as const, tags: ['128k ctx', 'vision'] },
		{ name: 'claude-3.5-sonnet', status: 'STABLE', tone: 'success' as const, tags: ['200k ctx', 'vision'] },
		{ name: 'llama-3.1-70b', status: 'EXPERIMENTAL', tone: 'amber' as const, tags: ['128k ctx'] },
		{ name: 'qwen2.5-coder', status: 'STABLE', tone: 'success' as const, tags: ['32k ctx', 'code'] }
	];

	function refresh() {
		if (refreshing) return;
		refreshing = true;
		setTimeout(() => {
			refreshing = false;
			toast.success('Dashboard refreshed', 'Metrics updated just now.');
		}, 900);
	}
</script>

<svelte:head>
	<title>Ember · Dashboard (SvelteKit)</title>
</svelte:head>

<!-- shared sparkline gradients -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
	<defs>
		<linearGradient id="emberSpark" x1="0" y1="0" x2="1" y2="0">
			<stop offset="0" stop-color="#F59E0B" /><stop offset="1" stop-color="#F43F5E" />
		</linearGradient>
		<linearGradient id="emberSparkArea" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#F43F5E" stop-opacity=".25" />
			<stop offset="1" stop-color="#F43F5E" stop-opacity="0" />
		</linearGradient>
	</defs>
</svg>

{#if showBanner}
	<div class="banner banner-ember noise mb-4">
		<div class="banner-icon"><Icon name="wand-sparkles" size={18} /></div>
		<div class="flex-1 min-w-0">
			<div class="text-sm font-semibold">
				A new version is available
				<span class="font-mono text-xs" style="background:rgb(255 255 255 / .2);padding:1px 7px;border-radius:9999px;">v6.20.0</span>
			</div>
			<div class="text-xs banner-sub">You're on v7.0.0 — view the changelog to see what's new.</div>
		</div>
		<Button size="sm" onclick={() => toast.info('Changelog', 'Example link — nothing to open here.')}>
			<Icon name="download" size={13} /> View changelog
		</Button>
		<button class="icon-btn" style="color:#fff" onclick={() => (showBanner = false)} aria-label="Dismiss">
			<Icon name="xmark" size={14} />
		</button>
	</div>
{/if}

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">Overview</div>
		<h1 class="page-title">Welcome back, Alex</h1>
		<p class="page-subtitle">Here's what's happening across your gateway today. <Badge variant="success">SvelteKit</Badge></p>
	</div>
	<div class="flex gap-2">
		<Button variant="outline" size="sm" onclick={refresh} disabled={refreshing}>
			<span class:spin={refreshing} style="display:inline-flex"><Icon name="refresh" size={13} /></span> Refresh
		</Button>
		<Button variant="ember" size="sm" onclick={() => toast.info('New chat', 'Chat route isn’t part of this example.')}>
			<Icon name="plus" size={13} /> New chat
		</Button>
	</div>
</div>

<div class="grid grid-4 mb-4">
	<div use:reveal>
		<StatCard label="Conversations" value={2418} delta="12.4% vs last wk" deltaTone="up" icon="comments" iconClass="bg-amber/10 text-stat-conversations" />
	</div>
	<div use:reveal={{ delay: 70 }}>
		<StatCard label="API Keys" value={156} delta="3 new this wk" deltaTone="up" icon="key" iconClass="bg-primary/10 text-stat-apikeys" />
	</div>
	<div use:reveal={{ delay: 140 }}>
		<StatCard label="Models" value={42} delta="— unchanged" icon="microchip" iconClass="bg-primary/10 text-stat-models" />
	</div>
	<div class="stat-card spotlight" use:spotlight use:reveal={{ delay: 210 }}>
		<div class="stat-icon bg-amber/10 text-stat-requests"><Icon name="chart-line" size={15} /></div>
		<div class="stat-label">Requests</div>
		<div class="stat-value">84.2k</div>
		<div class="stat-delta text-destructive"><Icon name="arrow-down" size={10} /> 2.1% <span class="text-subtle">vs last wk</span></div>
		<Sparkline class="stat-spark" points="M0 12 L15 14 L30 12 L45 18 L60 17 L75 22 L90 21 L105 26 L120 25" />
	</div>
</div>

<div class="grid grid-2 mb-4">
	<div class="card spotlight" use:spotlight use:reveal>
		<div class="card-header flex items-center justify-between">
			<div>
				<div class="card-title">Tokens per day</div>
				<div class="card-description">Last {days} days · <span class="font-mono text-foreground">{TOTALS[days]}</span> total</div>
			</div>
			<Segmented options={[{ value: '7', label: '7d' }, { value: '30', label: '30d' }, { value: '90', label: '90d' }]} bind:value={days} />
		</div>
		<div class="card-body">
			<TokenBars days={parseInt(days)} />
			<div class="flex justify-between mt-2 text-xs text-subtle font-mono">
				{#each AXES[days] as label (label)}<span>{label}</span>{/each}
			</div>
		</div>
	</div>

	<Card title="Top models" description="By token usage" spotlight>
		{#snippet headerExtra()}
			<button class="text-xs text-primary" onclick={() => toast.info('Mockup link', 'Full catalog isn’t part of this example.')}>View all →</button>
		{/snippet}
		<div class="stack">
			{#each MODELS as m (m.name)}
				<div>
					<div class="flex justify-between mb-2">
						<code class="code-chip">{m.name}</code>
						<span class="text-xs text-muted-foreground font-mono">{m.meta}</span>
					</div>
					<div style="opacity:{m.o}"><Progress value={m.w} /></div>
				</div>
			{/each}
		</div>
	</Card>
</div>

<div class="grid grid-2">
	<Card title="Recent conversations">
		{#snippet headerExtra()}
			<button class="text-xs text-primary" onclick={() => toast.info('Mockup link', 'Chat isn’t part of this example.')}>View all →</button>
		{/snippet}
		{#each CONVS as c (c.title)}
			<button class="conv-row w-full" onclick={() => toast.info(c.title, c.meta)}>
				<Icon name="comments" size={15} class="text-muted-foreground" />
				<div class="flex-1 min-w-0" style="text-align:left">
					<div class="text-sm font-medium truncate">{c.title}</div>
					<div class="text-xs text-muted-foreground">{c.meta}</div>
				</div>
				<Icon name="arrow-right" size={13} class="text-subtle go-arrow" />
			</button>
		{/each}
	</Card>

	<Card title="Available models">
		{#snippet headerExtra()}
			<Badge>42 total</Badge>
		{/snippet}
		<div class="grid grid-2 gap-2">
			{#each AVAILABLE as m (m.name)}
				<div class="card card-body-compact model-mini" style="padding:.625rem;">
					<div class="flex items-center justify-between mb-2">
						<div class="flex items-center gap-2 min-w-0">
							<Icon name="microchip" size={13} class="text-primary" />
							<span class="text-xs font-semibold truncate">{m.name}</span>
						</div>
						<Badge variant={m.tone}>{m.status}</Badge>
					</div>
					<div class="flex gap-1">
						{#each m.tags as t (t)}<Badge>{t}</Badge>{/each}
					</div>
				</div>
			{/each}
		</div>
	</Card>
</div>

<style>
	.conv-row {
		display: flex; align-items: center; gap: 12px;
		padding: 8px; border-radius: var(--radius-md);
		transition: background 0.12s ease;
	}
	.conv-row:hover { background: var(--color-accent); }
	.conv-row:hover :global(.go-arrow) { color: var(--color-primary); }
	.model-mini { transition: all 0.18s var(--ease-out); cursor: pointer; }
	.model-mini:hover {
		transform: translateY(-2px);
		border-color: var(--color-border-strong);
		box-shadow: var(--shadow-sm);
	}
</style>
