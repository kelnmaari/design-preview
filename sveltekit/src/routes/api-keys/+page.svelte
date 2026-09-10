<script lang="ts">
	import {
		Avatar,
		Badge,
		Button,
		Dropdown,
		Icon,
		Pagination,
		SearchField,
		SlidePanel,
		StatCard,
		TextField,
		reveal,
		sleep,
		spotlight,
		toast
	} from '$lib/ember/index.js';

	type Status = 'Active' | 'Rate-limited' | 'Revoked';

	interface KeyRow {
		id: number;
		name: string;
		created: string;
		secret: string;
		status: Status;
		scopes: string[];
		lastUsed: string;
		requests: string;
	}

	const KEYS: KeyRow[] = [
		{ id: 1, name: 'Production · Web', created: 'created Jul 2', secret: 'sk-aigw-9f2e••••4c1b', status: 'Active', scopes: ['chat', 'models'], lastUsed: '2 min ago', requests: '48,201' },
		{ id: 2, name: 'Staging · CI pipeline', created: 'created Jun 18', secret: 'sk-aigw-3b7c••••9a02', status: 'Rate-limited', scopes: ['chat'], lastUsed: '1 hour ago', requests: '1,402' },
		{ id: 3, name: 'Mobile app · iOS', created: 'created May 30', secret: 'sk-aigw-7d1f••••2e5c', status: 'Active', scopes: ['chat', 'vision'], lastUsed: '3 hours ago', requests: '22,889' },
		{ id: 4, name: 'Analytics export', created: 'created Apr 12', secret: 'sk-aigw-5a8e••••1f3d', status: 'Active', scopes: ['read'], lastUsed: 'yesterday', requests: '3,144' },
		{ id: 5, name: 'Legacy · Webhooks', created: 'created Jan 5', secret: 'sk-aigw-2c4b••••8a91', status: 'Revoked', scopes: [], lastUsed: '3 months ago', requests: '0' },
		{ id: 6, name: 'Dev · Local testing', created: 'created Jul 19', secret: 'sk-aigw-8e2a••••5b7f', status: 'Active', scopes: ['chat', 'admin'], lastUsed: '5 min ago', requests: '812' }
	];

	const STATUS_TONE: Record<Status, 'success' | 'amber' | 'destructive'> = {
		Active: 'success',
		'Rate-limited': 'amber',
		Revoked: 'destructive'
	};

	let query = $state('');
	let statusFilter = $state<'all' | Status>('all');
	let checked = $state<Record<number, boolean>>({});
	let page = $state(1);

	const filtered = $derived(
		KEYS.filter((k) => {
			const q = query.trim().toLowerCase();
			const hitQ = !q || k.name.toLowerCase().includes(q) || k.secret.toLowerCase().includes(q);
			const hitS = statusFilter === 'all' || k.status === statusFilter;
			return hitQ && hitS;
		})
	);
	const selectedIds = $derived(filtered.filter((k) => checked[k.id]).map((k) => k.id));
	const allChecked = $derived(filtered.length > 0 && filtered.every((k) => checked[k.id]));
	const someChecked = $derived(filtered.some((k) => checked[k.id]));

	function toggleAll(v: boolean) {
		for (const k of filtered) checked[k.id] = v;
	}

	function copySecret(secret: string) {
		navigator.clipboard?.writeText(secret).catch(() => {});
		toast.success('Copied to clipboard', secret);
	}

	/* ---- create-key panel ---- */
	let panelOpen = $state(false);
	let creating = $state(false);
	let createdKey = $state<string | null>(null);
	let keyName = $state('Production · API');
	let keyDesc = $state('');
	let scopes = $state([
		{ name: 'chat', on: true },
		{ name: 'models', on: true },
		{ name: 'vision', on: false },
		{ name: 'embeddings', on: false },
		{ name: 'admin', on: false },
		{ name: 'read', on: false }
	]);
	let expiry = $state('90 days');
	let rate = $state(100);

	const activeScopes = $derived(scopes.filter((s) => s.on).map((s) => s.name));

	function resetPanel() {
		createdKey = null;
		creating = false;
	}

	async function createKey() {
		if (creating) return;
		creating = true;
		await sleep(800);
		const hex = Array.from({ length: 16 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
		createdKey = `sk-aigw-${hex}`;
		creating = false;
		toast.success('Key created', 'One-time secret is ready — copy it now.');
	}
</script>

<svelte:head>
	<title>Ember · API Keys (SvelteKit)</title>
</svelte:head>

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">Workspace</div>
		<h1 class="page-title">API Keys</h1>
		<p class="page-subtitle">Manage credentials for accessing the gateway. Keys inherit your role permissions.</p>
	</div>
	<div class="flex gap-2">
		<Button variant="outline" size="sm" onclick={() => toast.success('Exported', '156 keys written to keys.csv.')}>
			<Icon name="download" size={13} /> Export
		</Button>
		<Button variant="ember" size="sm" onclick={() => { resetPanel(); panelOpen = true; }}>
			<Icon name="plus" size={13} /> Create key
		</Button>
	</div>
</div>

<div class="grid grid-4 mb-4">
	<div use:reveal><StatCard label="Active" value={142} icon="circle-check" iconClass="bg-success/10 text-success" /></div>
	<div use:reveal={{ delay: 70 }}><StatCard label="Expiring soon" value={8} icon="circle-info" iconClass="bg-amber/10 text-amber" /></div>
	<div use:reveal={{ delay: 140 }}><StatCard label="Revoked" value={6} icon="xmark" iconClass="bg-destructive/10 text-destructive" /></div>
	<div use:reveal={{ delay: 210 }}><StatCard label="Requests today" value={12400} format="compact" icon="chart-line" iconClass="bg-primary/10 text-stat-requests" /></div>
</div>

<div class="card" style="overflow:hidden;" use:reveal>
	<div class="card-body-compact toolbar">
		<div style="max-width:280px;flex:1;min-width:180px;">
			<SearchField bind:value={query} placeholder="Filter by name or key…" />
		</div>
		<Dropdown align="left">
			{#snippet trigger({ toggle })}
				<Button variant="outline" size="sm" onclick={toggle}>
					<Icon name="filter" size={13} /> Status: {statusFilter === 'all' ? 'All' : statusFilter}
					<Icon name="chevron-down" size={11} />
				</Button>
			{/snippet}
			<button class="menu-item" onclick={() => (statusFilter = 'all')}>All statuses</button>
			<button class="menu-item" onclick={() => (statusFilter = 'Active')}><Badge variant="success" dot>Active</Badge></button>
			<button class="menu-item" onclick={() => (statusFilter = 'Rate-limited')}><Badge variant="amber">Rate-limited</Badge></button>
			<button class="menu-item" onclick={() => (statusFilter = 'Revoked')}><Badge variant="destructive">Revoked</Badge></button>
		</Dropdown>
		<div class="topbar-spacer"></div>
		{#if selectedIds.length > 0}
			<Badge variant="primary">{selectedIds.length} selected</Badge>
			<Button variant="outline" size="sm" onclick={() => toast.success('Keys revoked', 'Bulk action applied in this example.')}>
				<Icon name="trash" size={12} /> Revoke
			</Button>
		{/if}
		<span class="text-xs text-muted-foreground font-mono">{filtered.length} shown</span>
	</div>

	<div style="overflow-x:auto;">
		<table class="table">
			<thead>
				<tr>
					<th style="width:28px;">
						<input
							type="checkbox"
							class="checkbox"
							checked={allChecked}
							indeterminate={someChecked && !allChecked}
							onchange={(e) => toggleAll(e.currentTarget.checked)}
							aria-label="Select all"
						/>
					</th>
					<th>Name</th>
					<th>Key</th>
					<th>Status</th>
					<th>Scopes</th>
					<th>Last used</th>
					<th>Requests</th>
					<th style="width:60px;"></th>
				</tr>
			</thead>
			<tbody>
				{#each filtered as k (k.id)}
					<tr class:selected={checked[k.id]}>
						<td><input type="checkbox" class="checkbox" bind:checked={checked[k.id]} aria-label="Select {k.name}" /></td>
						<td>
							<div class="flex items-center gap-2">
								<Icon name="key" size={13} class="text-muted-foreground" />
								<div>
									<div class="font-medium" class:text-muted-foreground={k.status === 'Revoked'}>{k.name}</div>
									<div class="text-xs text-subtle">{k.created}</div>
								</div>
							</div>
						</td>
						<td>
							<code class="cell-mono" class:text-subtle={k.status === 'Revoked'}>{k.secret}</code>
							<button class="btn btn-ghost btn-icon" style="width:22px;height:22px;" onclick={() => copySecret(k.secret)} aria-label="Copy {k.name}">
								<Icon name="copy" size={11} />
							</button>
						</td>
						<td>
							<Badge variant={STATUS_TONE[k.status]} dot={k.status === 'Active'}>{k.status}</Badge>
						</td>
						<td>
							{#if k.scopes.length}
								{#each k.scopes as s (s)}<Badge>{s}</Badge>{' '}{/each}
							{:else}
								<Badge>—</Badge>
							{/if}
						</td>
						<td class="cell-subtle">{k.lastUsed}</td>
						<td class="cell-mono" class:cell-subtle={k.requests === '0'}>{k.requests}</td>
						<td>
							<Dropdown>
								{#snippet trigger({ toggle })}
									<button class="btn btn-ghost btn-icon btn-sm" onclick={toggle} aria-label="Row actions"><Icon name="dots" size={14} /></button>
								{/snippet}
								<button class="menu-item" onclick={() => toast.info('Rename', `${k.name} (demo).`)}><Icon name="pencil" size={13} /> Rename</button>
								<button class="menu-item" onclick={() => copySecret(k.secret)}><Icon name="copy" size={13} /> Copy secret</button>
								<div class="menu-sep"></div>
								{#if k.status === 'Revoked'}
									<button class="menu-item" onclick={() => toast.success('Key restored', k.name)}><Icon name="refresh" size={13} /> Restore</button>
								{:else}
									<button class="menu-item danger" onclick={() => toast.success('Key revoked', `${k.name} no longer accepts traffic.`)}><Icon name="trash" size={13} /> Revoke</button>
								{/if}
							</Dropdown>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="8">
							<div class="empty-state">
								<div class="empty-icon"><Icon name="key" size={20} /></div>
								<p class="text-sm">No keys match “{query || statusFilter}”</p>
								<Button variant="outline" size="sm" class="mt-3" onclick={() => { query = ''; statusFilter = 'all'; }}>Clear filters</Button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="card-body-compact flex items-center justify-between" style="border-top:1px solid var(--color-border);">
		<span class="text-xs text-muted-foreground">Showing 1–{filtered.length} of 156</span>
		<Pagination total={26} bind:page onchange={(p) => toast.info(`Page ${p}`, 'Pagination is a visual demo in this example.')} />
	</div>
</div>

<SlidePanel bind:open={panelOpen} title="Create API key" description="Keys are shown once — store securely." onclose={resetPanel}>
	{#if !createdKey}
		<div class="stack">
			<TextField label="Name" placeholder="e.g. Production · Web" bind:value={keyName} />
			<TextField label="Description (optional)" placeholder="What is this key used for?" multiline rows={2} bind:value={keyDesc} />
			<div>
				<span class="field-label">Scopes</span>
				<div class="flex gap-2" style="flex-wrap:wrap;">
					{#each scopes as s (s.name)}
						<button class="scope-chip" class:active={s.on} onclick={() => (s.on = !s.on)}>{s.name}</button>
					{/each}
				</div>
			</div>
			<div>
				<span class="field-label">Expiration</span>
				<Dropdown align="left">
					{#snippet trigger({ toggle })}
						<button class="input pointer w-full" style="display:flex;align-items:center;justify-content:space-between;" onclick={toggle}>
							<span class="text-sm">{expiry}</span>
							<Icon name="chevron-down" size={14} class="text-muted-foreground" />
						</button>
					{/snippet}
					{#each ['7 days', '30 days', '90 days', 'Never'] as e (e)}
						<button class="menu-item" onclick={() => (expiry = e)}>{e}</button>
					{/each}
				</Dropdown>
			</div>
			<div>
				<span class="field-label">Rate limit <span class="text-subtle">(req/min)</span></span>
				<div class="flex items-center gap-3">
					<input type="range" min="10" max="1000" bind:value={rate} style="flex:1;" aria-label="Rate limit" />
					<span class="font-mono text-sm" style="width:50px;text-align:right;">{rate}</span>
				</div>
			</div>
		</div>
	{:else}
		<div class="new-key-box revealed">
			<div class="flex items-center gap-2 mb-2">
				<Icon name="circle-check" size={15} class="text-success" />
				<span class="text-sm font-semibold">Key created</span>
			</div>
			<div class="flex items-center gap-2">
				<code class="font-mono text-xs flex-1 key-secret">{createdKey}</code>
				<Button variant="outline" size="sm" onclick={() => copySecret(createdKey ?? '')}>
					<Icon name="copy" size={13} /> Copy
				</Button>
			</div>
			<div class="text-xs text-amber mt-2 flex items-center gap-1">
				<Icon name="triangle-exclamation" size={12} /> Copy now — it won't be shown again.
			</div>
		</div>
		<div class="card mt-3 success-note">
			<div class="text-xs text-muted-foreground">{keyName || 'Untitled'} · {activeScopes.join(' + ') || 'no scopes'} · {expiry}</div>
		</div>
	{/if}
	{#snippet footer()}
		{#if !createdKey}
			<Button variant="ghost" size="sm" onclick={() => (panelOpen = false)}>Cancel</Button>
			<Button variant="ember" size="sm" onclick={createKey} disabled={creating}>
				{#if creating}
					<span class="spin" style="display:inline-flex"><Icon name="refresh" size={13} /></span> Creating…
				{:else}
					<Icon name="check" size={13} /> Create key
				{/if}
			</Button>
		{:else}
			<Button variant="ghost" size="sm" onclick={resetPanel}><Icon name="plus" size={13} /> Create another</Button>
			<Button variant="primary" size="sm" onclick={() => (panelOpen = false)}><Icon name="check" size={13} /> Done</Button>
		{/if}
	{/snippet}
</SlidePanel>

<style>
	.toolbar {
		border-bottom: 1px solid var(--color-border);
		display: flex; align-items: center; gap: 0.5rem;
		padding: 0.625rem 0.75rem; flex-wrap: wrap;
	}
	:global(.scope-chip) {
		font-size: 12px; padding: 0.3rem 0.55rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border);
		color: var(--color-muted-foreground);
		cursor: pointer; transition: all 0.12s ease;
		user-select: none; font-family: var(--font-sans); background: transparent;
	}
	:global(.scope-chip.active) {
		background: rgb(var(--tw-primary) / 0.12);
		border-color: rgb(var(--tw-primary) / 0.4);
		color: var(--color-primary);
	}
	:global(.scope-chip:hover) { border-color: var(--color-border-strong); transform: translateY(-1px); }
	.new-key-box {
		background: var(--color-background);
		border: 1px solid var(--color-border-strong);
		border-radius: var(--radius-lg);
		padding: 1rem; position: relative; overflow: hidden;
	}
	.new-key-box::before {
		content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
		background-image: linear-gradient(90deg, #f59e0b, #f43f5e);
	}
	.new-key-box.revealed {
		animation: ember-scale-in 0.35s var(--ease-spring);
		border-color: rgb(var(--tw-success) / 0.5);
		box-shadow: 0 0 30px rgb(16 185 129 / 0.15);
	}
	.key-secret {
		background: var(--color-muted); padding: 0.5rem 0.625rem;
		border-radius: var(--radius-sm); display: block;
		overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
	}
	.success-note {
		background: rgb(var(--tw-success) / 0.06);
		border-color: rgb(var(--tw-success) / 0.25);
		padding: 0.625rem 0.75rem;
	}
	input[type='range'] { accent-color: var(--color-primary); }
</style>
