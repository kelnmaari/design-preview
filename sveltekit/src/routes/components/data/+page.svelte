<script lang="ts">
	import {
		Badge,
		Button,
		Card,
		DataTable,
		Icon,
		ListGroup,
		PageHeader,
		Pagination,
		Presence,
		SearchField,
		SectionTitle,
		Timeline,
		reveal,
		sleep,
		toast,
		type DataTableColumn,
		type ListGroupItem,
		type TimelineItem
	} from '$lib/ember/index.js';

	interface KeyRow {
		id: string;
		name: string;
		requests: number;
		tokens: number;
		status: 'active' | 'paused' | 'expired';
		updated: string;
	}

	const COLUMNS: DataTableColumn[] = [
		{ key: 'name', label: 'Key', sortable: true },
		{ key: 'requests', label: 'Requests', sortable: true, align: 'right' },
		{ key: 'tokens', label: 'Tokens', sortable: true, align: 'right' },
		{ key: 'status', label: 'Status', sortable: true },
		{ key: 'updated', label: 'Updated', sortable: true, align: 'right' }
	];

	const ROWS: KeyRow[] = [
		{ id: 'k1', name: 'prod-gateway', requests: 48210, tokens: 9182033, status: 'active', updated: '2m ago' },
		{ id: 'k2', name: 'web-search', requests: 31204, tokens: 5211880, status: 'active', updated: '9m ago' },
		{ id: 'k3', name: 'mobile-app', requests: 18933, tokens: 3102901, status: 'active', updated: '1h ago' },
		{ id: 'k4', name: 'nightly-eval', requests: 8211, tokens: 1988220, status: 'paused', updated: '3h ago' },
		{ id: 'k5', name: 'partner-acme', requests: 5418, tokens: 804112, status: 'active', updated: '5h ago' },
		{ id: 'k6', name: 'legacy-v1', requests: 1204, tokens: 99012, status: 'expired', updated: '2d ago' },
		{ id: 'k7', name: 'staging', requests: 986, tokens: 120455, status: 'paused', updated: '4d ago' },
		{ id: 'k8', name: 'experiments', requests: 402, tokens: 55901, status: 'active', updated: '6d ago' }
	];

	const STATUS_BADGE = { active: 'success', paused: 'amber', expired: 'muted' } as const;

	let query = $state('');
	let sortKey = $state<string | null>('requests');
	let sortDir = $state<'asc' | 'desc'>('desc');
	let selected = $state<(string | number)[]>([]);
	let page = $state(1);
	let loading = $state(false);
	const PER_PAGE = 5;

	const filtered = $derived(
		ROWS.filter((r) => r.name.toLowerCase().includes(query.toLowerCase().trim()))
	);
	const totalPages = $derived(Math.max(1, Math.ceil(filtered.length / PER_PAGE)));
	const safePage = $derived(Math.min(page, totalPages));
	const paged = $derived(filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE));

	async function reload() {
		loading = true;
		await sleep(900);
		loading = false;
	}

	const NAV_ITEMS: ListGroupItem[] = [
		{ icon: 'gauge', title: 'Dashboard', desc: 'Overview & activity', href: '/', badge: 'live' },
		{ icon: 'comments', title: 'Chat', desc: 'RAG playground', href: '/chat' },
		{ icon: 'key', title: 'API Keys', desc: '156 keys', href: '/api-keys', active: true },
		{ icon: 'users', title: 'Users', desc: 'Disabled in demo', disabled: true }
	];

	const EVENTS: TimelineItem[] = [
		{ time: '09:41', title: 'Deploy v2.4.1 to prod', desc: 'gateway-worker · 3 replicas', tone: 'success' },
		{ time: '09:12', title: 'VRAM pressure on worker-03', desc: '92% — consider rebalancing', tone: 'warning' },
		{ time: '08:55', title: 'RAG index rebuilt', desc: '1,204 chunks · 38 files', tone: 'info' },
		{ time: '08:20', title: 'Nightly eval failed', desc: 'faithfulness < 0.7 on 3 cases', tone: 'danger' },
		{ time: '07:58', title: 'Key rotated: prod-gateway', tone: 'muted' }
	];
</script>

<svelte:head>
	<title>Ember · Data components (SvelteKit)</title>
</svelte:head>

<PageHeader
	eyebrow="Components · Data"
	title="Data"
	subtitle="Tables, lists, timelines and presence — the dense admin toolkit."
/>

<div class="block" use:reveal>
	<SectionTitle title="Recipe · searchable sortable table" />
	<Card>
		{#snippet headerExtra()}
			<div class="flex gap-2 items-center">
				<SearchField placeholder="Filter keys…" bind:value={query} />
				<Button variant="outline" size="sm" onclick={reload}><Icon name="refresh" size={13} /> Reload</Button>
			</div>
		{/snippet}
		{#if selected.length}
			<div class="bulk-bar">
				<span><b>{selected.length}</b> selected</span>
				<Button variant="ghost" size="sm" onclick={() => (selected = [])}>Clear</Button>
				<Button variant="outline" size="sm" onclick={() => toast.success('Paused', `${selected.length} keys paused.`)}>
					<Icon name="pause" size={13} /> Pause
				</Button>
			</div>
		{/if}
		<DataTable
			columns={COLUMNS}
			rows={paged}
			{loading}
			selectable
			bind:sortKey
			bind:sortDir
			bind:selected
			onrowclick={(r) => toast.info(r.name, `${r.requests.toLocaleString()} requests`)}
		>
			{#snippet cell({ column, value })}
				{#if column.key === 'name'}<code class="code-chip">{value}</code>
				{:else if column.key === 'requests' || column.key === 'tokens'}
					<span class="num">{Number(value).toLocaleString()}</span>
				{:else if column.key === 'status'}
					<Badge variant={STATUS_BADGE[value as keyof typeof STATUS_BADGE]} dot>{value}</Badge>
				{:else}{value}{/if}
			{/snippet}
		</DataTable>
		<div class="flex justify-end mt-3">
			<Pagination total={totalPages} bind:page />
		</div>
	</Card>
</div>

<div class="block" use:reveal>
	<SectionTitle title="Lists · Timeline · Presence" />
	<div class="grid grid-3 gap-3">
		<Card title="ListGroup" description="links, active + disabled">
			<ListGroup items={NAV_ITEMS} />
		</Card>
		<Card title="Timeline" description="toned event feed">
			<Timeline items={EVENTS} />
		</Card>
		<Card title="Presence" description="status dots">
			<div class="stack">
				<Presence status="online" />
				<Presence status="idle" />
				<Presence status="busy" label="In a deploy" />
				<Presence status="offline" />
				<Presence status="online" showLabel={false} size={10} />
			</div>
		</Card>
	</div>
</div>

<style>
	.block { margin-bottom: 2.5rem; }
	.block:last-child { margin-bottom: 0; }
	.num { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
	.bulk-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 12.5px;
		color: var(--color-muted-foreground);
		background: rgb(var(--tw-primary) / 0.07);
		border: 1px solid rgb(var(--tw-primary) / 0.25);
		border-radius: var(--radius-md);
		padding: 0.4rem 0.4rem 0.4rem 0.7rem;
		margin-bottom: 0.75rem;
	}
	.bulk-bar span:first-child { margin-right: auto; }
</style>
