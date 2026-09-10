<script lang="ts">
	import {
		Badge,
		Button,
		Card,
		Icon,
		Modal,
		Progress,
		Segmented,
		StatCard,
		Switch,
		reveal,
		spotlight,
		toast
	} from '$lib/ember/index.js';

	let modalOpen = $state(false);
	let streaming = $state(true);
	let range = $state('30');
	let activeTab = $state(0);

	const TABS = ['Overview', 'Models', 'Requests', 'Settings'];

	const ROWS = [
		{ name: 'Production · Web', status: 'Active', tone: 'success' as const, req: '48,201', created: '2 days ago' },
		{ name: 'Staging · CI', status: 'Limited', tone: 'amber' as const, req: '1,402', created: '1 week ago' },
		{ name: 'Legacy · Mobile', status: 'Revoked', tone: 'destructive' as const, req: '0', created: '3 months ago' }
	];

	let checked = $state([false, false, false]);
	const selectedCount = $derived(checked.filter(Boolean).length);

	function copyText(text: string) {
		navigator.clipboard?.writeText(text).catch(() => {});
		toast.success('Copied to clipboard', text.slice(0, 42));
	}
</script>

<svelte:head>
	<title>Ember · Components (SvelteKit)</title>
</svelte:head>

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">Library</div>
		<h1 class="page-title">Components <span class="text-gradient-ember">in Svelte</span></h1>
		<p class="page-subtitle">Same classes as the static system — wrapped in typed Svelte 5 components.</p>
	</div>
	<Badge variant="success" dot>SvelteKit</Badge>
</div>

<div class="block" use:reveal>
	<div class="block-title">Buttons</div>
	<div class="row">
		<Button><Icon name="plus" size={13} /> Primary</Button>
		<Button variant="ember"><Icon name="bolt" size={13} /> Ember CTA</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="destructive"><Icon name="trash" size={13} /> Destructive</Button>
		<Button disabled>Disabled</Button>
	</div>
	<div class="row mt-3">
		<Button size="sm">Small</Button>
		<Button>Default</Button>
		<Button size="lg">Large</Button>
		<Button variant="outline" iconOnly size="sm"><Icon name="pencil" size={13} /></Button>
		<Button variant="outline" iconOnly><Icon name="copy" size={14} /></Button>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Badges & Status</div>
	<div class="row">
		<Badge variant="primary"><Icon name="bolt" size={11} /> Active</Badge>
		<Badge variant="success" dot>Online</Badge>
		<Badge variant="amber">Experimental</Badge>
		<Badge variant="info">Streaming</Badge>
		<Badge variant="destructive">Deprecated</Badge>
		<Badge>Draft</Badge>
		<span class="flex items-center gap-2 ml-2"><span class="pulse-dot"></span><span class="text-xs text-muted-foreground">live pulse</span></span>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Stat Cards · animated counters</div>
	<div class="grid grid-4">
		<StatCard label="Conversations" value={2418} delta="12.4% wk" deltaTone="up" icon="comments" iconClass="bg-amber/10 text-stat-conversations" />
		<StatCard label="API Keys" value={156} delta="3 new" deltaTone="up" icon="key" iconClass="bg-primary/10 text-stat-apikeys" />
		<StatCard label="Models" value={42} delta="— unchanged" icon="microchip" iconClass="bg-primary/10 text-stat-models" />
		<StatCard label="Requests" value={84200} format="compact" delta="2.1% wk" deltaTone="down" icon="chart-line" iconClass="bg-amber/10 text-stat-requests" />
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Form Controls</div>
	<div class="grid grid-3">
		<div>
			<label class="field-label" for="f-model">Model name</label>
			<input id="f-model" class="input" placeholder="gpt-4o-mini" />
			<div class="field-hint">Lowercase, hyphenated.</div>
		</div>
		<div>
			<label class="field-label" for="f-key">API key (mono)</label>
			<input id="f-key" class="input input-mono" value="sk-aigw-9f2e••••••••" readonly />
		</div>
		<div>
			<span class="field-label">Switch + Segmented</span>
			<div class="stack">
				<Switch bind:checked={streaming} label="Streaming responses" />
				<Segmented options={[{ value: '7', label: '7d' }, { value: '30', label: '30d' }, { value: '90', label: '90d' }]} bind:value={range} />
			</div>
		</div>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Table · selectable ({selectedCount} selected)</div>
	<div class="card" style="overflow:hidden;">
		<table class="table">
			<thead>
				<tr>
					<th style="width:28px;"><input type="checkbox" class="checkbox" checked={selectedCount === ROWS.length} indeterminate={selectedCount > 0 && selectedCount < ROWS.length} onchange={(e) => (checked = ROWS.map(() => e.currentTarget.checked))} /></th>
					<th>Name</th>
					<th>Status</th>
					<th>Requests</th>
					<th>Created</th>
				</tr>
			</thead>
			<tbody>
				{#each ROWS as row, i (row.name)}
					<tr class:selected={checked[i]}>
						<td><input type="checkbox" class="checkbox" bind:checked={checked[i]} /></td>
						<td><span class="font-medium">{row.name}</span></td>
						<td><Badge variant={row.tone} dot={row.tone === 'success'}>{row.status}</Badge></td>
						<td class="cell-mono">{row.req}</td>
						<td class="cell-subtle">{row.created}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Progress · Tabs</div>
	<div class="grid grid-2 gap-3">
		<Card>
			<div class="flex justify-between mb-2"><span class="text-sm font-medium">Quota usage</span><span class="font-mono text-xs text-muted-foreground">68%</span></div>
			<Progress value={68} />
			<div class="flex justify-between mb-2 mt-4"><span class="text-sm font-medium">Health</span><span class="font-mono text-xs text-success">92%</span></div>
			<Progress value={92} tone="success" />
		</Card>
		<Card>
			<div class="tabs mb-3" role="tablist">
				{#each TABS as tab, i (tab)}
					<button class="tab" class:active={activeTab === i} onclick={() => (activeTab = i)} role="tab" aria-selected={activeTab === i}>{tab}</button>
				{/each}
			</div>
			<p class="text-sm text-muted-foreground">
				{#if activeTab === 0}Active tab gets a primary underline. Click — state lives in one $state variable.
				{:else if activeTab === 1}42 models indexed · 4 providers · all healthy.
				{:else if activeTab === 2}84.2k requests this week · p50 380ms · p99 1.2s.
				{:else}Gateway URL, default model, retention — all tokenized.{/if}
			</p>
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Spotlight · Modal · Toasts</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body spotlight spotlight-border" use:spotlight>
			<div class="label">spotlight (move your cursor)</div>
			<div class="text-sm font-medium">Cursor-tracking glow</div>
			<div class="text-xs text-muted-foreground mt-2">One action: <code class="code-chip">use:spotlight</code> — no component needed.</div>
		</div>
		<Card>
			<div class="row">
				<Button variant="outline" size="sm" onclick={() => (modalOpen = true)}><Icon name="cube" size={13} /> Open dialog</Button>
				<Button variant="outline" size="sm" onclick={() => toast.success('Deployed', 'gateway v7.0.1 is live on worker-02.')}>Success toast</Button>
				<Button variant="outline" size="sm" onclick={() => toast.warning('Quota at 82%', 'Consider raising the limit before Friday.')}>Warning toast</Button>
				<Button variant="outline" size="sm" onclick={() => copyText('--tw-primary: 244 63 94;')}><Icon name="copy" size={13} /> Copy token</Button>
			</div>
			<div class="mt-3"><div class="typing-dots"><span></span><span></span><span></span></div></div>
		</Card>
	</div>
</div>

<Modal bind:open={modalOpen} title="Revoke API Key" description="This action cannot be undone.">
	<div class="card" style="background:var(--color-muted); padding:.625rem;">
		<code class="text-xs">sk-aigw-9f2e4c1b•••</code>
	</div>
	{#snippet footer()}
		<Button variant="ghost" size="sm" onclick={() => (modalOpen = false)}>Cancel</Button>
		<Button
			variant="destructive"
			size="sm"
			onclick={() => {
				modalOpen = false;
				toast.success('Key revoked', 'sk-aigw-9f2e4c1b••• no longer accepts traffic.');
			}}
		>
			<Icon name="trash" size={13} /> Revoke permanently
		</Button>
	{/snippet}
</Modal>

<style>
	.block { margin-bottom: 2.5rem; }
	.block:last-child { margin-bottom: 0; }
	.block-title {
		font-size: 11px; font-weight: 600; text-transform: uppercase;
		letter-spacing: 0.08em; color: var(--color-muted-foreground);
		margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;
	}
	.block-title::after { content: ''; flex: 1; height: 1px; background: var(--color-border); }
	.row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
	.label { font-size: 11px; color: var(--color-subtle); font-family: var(--font-mono); margin-bottom: 0.4rem; }
</style>
