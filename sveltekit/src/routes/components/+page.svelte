<script lang="ts">
	import {
		AvatarStack,
		Badge,
		Banner,
		Button,
		Card,
		CodeBlock,
		CopyButton,
		Dropdown,
		EmptyState,
		Icon,
		Modal,
		Pagination,
		Progress,
		SearchField,
		Segmented,
		SlidePanel,
		StatCard,
		Switch,
		Tabs,
		TextField,
		reveal,
		spotlight,
		toast
	} from '$lib/ember/index.js';

	let modalOpen = $state(false);
	let panelOpen = $state(false);
	let streaming = $state(true);
	let range = $state('30');
	let activeTab = $state('overview');
	let search = $state('');
	let modelName = $state('');
	let page = $state(1);

	const ROWS = [
		{ name: 'Production · Web', status: 'Active', tone: 'success' as const, req: '48,201', created: '2 days ago' },
		{ name: 'Staging · CI', status: 'Limited', tone: 'amber' as const, req: '1,402', created: '1 week ago' },
		{ name: 'Legacy · Mobile', status: 'Revoked', tone: 'destructive' as const, req: '0', created: '3 months ago' }
	];

	let checked = $state([false, false, false]);
	const selectedCount = $derived(checked.filter(Boolean).length);
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

<div class="grid grid-4 gap-3 mb-4" use:reveal>
	<a href="/components/forms" class="card card-body sub-gallery">
		<div class="sub-gallery-icon"><Icon name="pencil" size={16} /></div>
		<div class="text-sm font-semibold">Forms</div>
		<div class="text-xs text-subtle">Field · Select · Checkbox · Radio · Slider · InputGroup · Dropzone</div>
	</a>
	<a href="/components/data" class="card card-body sub-gallery">
		<div class="sub-gallery-icon"><Icon name="chart-bar" size={16} /></div>
		<div class="text-sm font-semibold">Data</div>
		<div class="text-xs text-subtle">DataTable · ListGroup · Timeline · Presence</div>
	</a>
	<a href="/components/overlays" class="card card-body sub-gallery">
		<div class="sub-gallery-icon"><Icon name="layers" size={16} /></div>
		<div class="text-sm font-semibold">Overlays</div>
		<div class="text-xs text-subtle">Alert · Tooltip · Popover · Confirm · Toasts · States</div>
	</a>
	<a href="/components/content" class="card card-body sub-gallery">
		<div class="sub-gallery-icon"><Icon name="comments" size={16} /></div>
		<div class="text-sm font-semibold">Content</div>
		<div class="text-xs text-subtle">Headers · Breadcrumb · Stepper · Accordion · Chat</div>
	</a>
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
		<CopyButton text="--tw-primary: 244 63 94;" preview="--tw-primary: 244 63 94;" />
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
		<TextField label="Model name" hint="Lowercase, hyphenated." placeholder="gpt-4o-mini" bind:value={modelName} />
		<TextField label="API key (mono)" value="sk-aigw-9f2e••••••••" mono readonly />
		<div>
			<span class="field-label">Switch + Segmented</span>
			<div class="stack">
				<Switch bind:checked={streaming} label="Streaming responses" />
				<Segmented options={[{ value: '7', label: '7d' }, { value: '30', label: '30d' }, { value: '90', label: '90d' }]} bind:value={range} />
			</div>
		</div>
		<div>
			<span class="field-label">Search field</span>
			<SearchField bind:value={search} placeholder="Search models…" kbd />
			<div class="field-hint">Try typing — the clear button appears.</div>
		</div>
		<div>
			<span class="field-label">Dropdown menu</span>
			<Dropdown align="left">
				{#snippet trigger({ toggle })}
					<Button variant="outline" onclick={toggle}>
						<Icon name="filter" size={13} /> Status: All <Icon name="chevron-down" size={11} />
					</Button>
				{/snippet}
				<div class="menu-label">Set status</div>
				<button class="menu-item" onclick={() => toast.success('Status → Active', 'Dropdown demo.')}><Badge variant="success" dot>Active</Badge></button>
				<button class="menu-item" onclick={() => toast.warning('Status → Limited', 'Dropdown demo.')}><Badge variant="amber">Limited</Badge></button>
				<button class="menu-item danger" onclick={() => toast.error('Status → Revoked', 'Dropdown demo.')}><Badge variant="destructive">Revoked</Badge></button>
			</Dropdown>
		</div>
		<div class="flex items-end gap-2">
			<AvatarStack
				avatars={[
					{ initials: 'AK' },
					{ initials: 'JN', gradient: 'linear-gradient(135deg,#10B981,#22D3EE)' },
					{ initials: 'SR', gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)' }
				]}
				extra={5}
			/>
			<span class="text-xs text-muted-foreground">avatar stack</span>
		</div>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Table · selectable ({selectedCount} selected)</div>
	<div class="card" style="overflow:hidden;">
		<table class="table">
			<thead>
				<tr>
					<th style="width:28px;"><input type="checkbox" class="checkbox" checked={selectedCount === ROWS.length} indeterminate={selectedCount > 0 && selectedCount < ROWS.length} onchange={(e) => (checked = ROWS.map(() => e.currentTarget.checked))} aria-label="Select all" /></th>
					<th>Name</th>
					<th>Status</th>
					<th>Requests</th>
					<th>Created</th>
				</tr>
			</thead>
			<tbody>
				{#each ROWS as row, i (row.name)}
					<tr class:selected={checked[i]}>
						<td><input type="checkbox" class="checkbox" bind:checked={checked[i]} aria-label="Select {row.name}" /></td>
						<td><span class="font-medium">{row.name}</span></td>
						<td><Badge variant={row.tone} dot={row.tone === 'success'}>{row.status}</Badge></td>
						<td class="cell-mono">{row.req}</td>
						<td class="cell-subtle">{row.created}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="card-footer flex items-center justify-between">
			<span class="text-xs text-muted-foreground">{selectedCount} selected</span>
			<Pagination total={12} bind:page onchange={(p) => toast.info(`Page ${p}`, 'Pagination demo.')} />
		</div>
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
			<Tabs
				bind:value={activeTab}
				tabs={[
					{ value: 'overview', label: 'Overview' },
					{ value: 'models', label: 'Models', badge: '42' },
					{ value: 'requests', label: 'Requests' },
					{ value: 'settings', label: 'Settings' }
				]}
			/>
			<p class="text-sm text-muted-foreground mt-3">
				{#if activeTab === 'overview'}Active tab gets a primary underline. State lives in one bindable variable.
				{:else if activeTab === 'models'}42 models indexed · 4 providers · all healthy.
				{:else if activeTab === 'requests'}84.2k requests this week · p50 380ms · p99 1.2s.
				{:else}Gateway URL, default model, retention — all tokenized.{/if}
			</p>
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Banners</div>
	<div class="stack">
		<Banner variant="ember" title="A new version is available" subtitle="You're on v7.0.0 — view the changelog to see what's new.">
			<Button size="sm" onclick={() => toast.info('Changelog', 'Banner demo.')}>
				<Icon name="download" size={13} /> View changelog
			</Button>
		</Banner>
		<Banner variant="ghost" icon="circle-info" title="Heads up: staging keys rotate on Friday." subtitle="3 keys affected — no action needed for production.">
			<Button variant="outline" size="sm" onclick={() => toast.info('Rotation plan', 'Banner demo.')}>Details</Button>
		</Banner>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Code Block · Empty State</div>
	<div class="grid grid-2 gap-3">
		<CodeBlock
			title="app.css — tokens"
			language="css"
			code={'/* .dark becomes the Ember palette */\n.dark {\n  --tw-background: 10 10 12;\n  --tw-primary: 244 63 94;  /* rose-500 */\n  --tw-amber: 245 158 11;\n}'}
		/>
		<div class="card">
			<EmptyState icon="key" title="No API keys yet" description="Create your first key to start calling the gateway.">
				<Button variant="primary" size="sm" onclick={() => toast.info('Create key', 'Empty-state demo.')}><Icon name="plus" size={13} /> Create key</Button>
			</EmptyState>
		</div>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Spotlight · Modal · Slide-over · Toasts</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body spotlight spotlight-border" use:spotlight>
			<div class="label">spotlight (move your cursor)</div>
			<div class="text-sm font-medium">Cursor-tracking glow</div>
			<div class="text-xs text-muted-foreground mt-2">One action: <code class="code-chip">use:spotlight</code> — no component needed.</div>
		</div>
		<Card>
			<div class="row">
				<Button variant="outline" size="sm" onclick={() => (modalOpen = true)}><Icon name="cube" size={13} /> Open dialog</Button>
				<Button variant="outline" size="sm" onclick={() => (panelOpen = true)}><Icon name="panel-right" size={13} /> Open slide-over</Button>
				<Button variant="outline" size="sm" onclick={() => toast.success('Deployed', 'gateway v7.0.1 is live on worker-02.')}>Success toast</Button>
				<Button variant="outline" size="sm" onclick={() => toast.warning('Quota at 82%', 'Consider raising the limit before Friday.')}>Warning toast</Button>
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

<SlidePanel bind:open={panelOpen} title="Slide-over panel" description="Same pattern as the create-key flow.">
	<TextField label="Name" placeholder="Something memorable" />
	<div class="mt-3">
		<Switch label="Enable notifications" />
	</div>
	{#snippet footer()}
		<Button variant="ghost" size="sm" onclick={() => (panelOpen = false)}>Cancel</Button>
		<Button variant="ember" size="sm" onclick={() => { panelOpen = false; toast.success('Saved', 'Slide-over demo.'); }}>
			<Icon name="check" size={13} /> Save changes
		</Button>
	{/snippet}
</SlidePanel>

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
	.sub-gallery { text-decoration: none; transition: transform var(--dur-fast) ease, border-color var(--dur-fast) ease; }
	.sub-gallery:hover { transform: translateY(-2px); border-color: var(--color-border-strong); }
	.sub-gallery-icon {
		display: inline-grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background: rgb(var(--tw-primary) / 0.1);
		color: var(--color-primary);
		margin-bottom: 0.6rem;
	}
</style>
