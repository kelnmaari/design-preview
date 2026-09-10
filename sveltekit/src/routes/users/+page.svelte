<script lang="ts">
	import {
		Avatar,
		Badge,
		Button,
		Dropdown,
		Icon,
		Modal,
		Pagination,
		SearchField,
		StatCard,
		Tabs,
		TextField,
		reveal,
		toast
	} from '$lib/ember/index.js';

	type Role = 'admin' | 'maintainer' | 'member';
	type Presence = 'Online' | 'Idle' | 'Offline' | 'Suspended';

	interface User {
		id: number;
		name: string;
		email: string;
		initials: string;
		gradient: string;
		role: Role;
		tenant: string;
		tenantNote?: string;
		presence: Presence;
		lastActive: string;
		requests: string;
	}

	const USERS: User[] = [
		{ id: 1, name: 'Alex Kim', email: 'alex.kim@acme.io', initials: 'AK', gradient: 'linear-gradient(135deg,#F59E0B,#F43F5E)', role: 'admin', tenant: 'Acme', tenantNote: 'default', presence: 'Online', lastActive: 'now', requests: '48,201' },
		{ id: 2, name: 'Jordan Ng', email: 'jordan.n@acme.io', initials: 'JN', gradient: 'linear-gradient(135deg,#10B981,#22D3EE)', role: 'member', tenant: 'Acme', presence: 'Online', lastActive: '2 min ago', requests: '12,440' },
		{ id: 3, name: 'Sasha Rivera', email: 'sasha.r@acme.io', initials: 'SR', gradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)', role: 'maintainer', tenant: 'Acme', tenantNote: 'platform', presence: 'Idle', lastActive: '18 min ago', requests: '31,902' },
		{ id: 4, name: 'Taylor Morgan', email: 'taylor.m@northwind.dev', initials: 'TM', gradient: 'linear-gradient(135deg,#F59E0B,#F43F5E)', role: 'admin', tenant: 'Northwind', presence: 'Offline', lastActive: '3 days ago', requests: '8,771' },
		{ id: 5, name: 'Priya Chen', email: 'priya.c@acme.io', initials: 'PC', gradient: 'linear-gradient(135deg,#06B6D4,#3B82F6)', role: 'member', tenant: 'Acme', presence: 'Online', lastActive: '5 min ago', requests: '4,029' },
		{ id: 6, name: 'Dana Booth', email: 'dana.b@oldcorp.com', initials: 'DB', gradient: 'linear-gradient(135deg,#71717A,#A1A1AA)', role: 'member', tenant: 'OldCorp', presence: 'Suspended', lastActive: '2 months ago', requests: '0' }
	];

	let tab = $state('users');
	let query = $state('');
	let roleFilter = $state<'all' | Role>('all');
	let presenceFilter = $state<'all' | 'Online' | 'Idle' | 'Offline'>('all');
	let checked = $state<Record<number, boolean>>({});
	let page = $state(1);
	let inviteOpen = $state(false);
	let inviteEmail = $state('');
	let inviteRole = $state<Role>('member');
	let inviteTenant = $state('Acme');

	const filtered = $derived(
		USERS.filter((u) => {
			const q = query.trim().toLowerCase();
			const hitQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
			const hitR = roleFilter === 'all' || u.role === roleFilter;
			const hitP = presenceFilter === 'all' || u.presence === presenceFilter;
			return hitQ && hitP && hitR;
		})
	);
	const selectedCount = $derived(filtered.filter((u) => checked[u.id]).length);
	const allChecked = $derived(filtered.length > 0 && filtered.every((u) => checked[u.id]));
	const someChecked = $derived(filtered.some((u) => checked[u.id]));

	function toggleAll(v: boolean) {
		for (const u of filtered) checked[u.id] = v;
	}

	function presenceLabel(p: Presence): string {
		return p;
	}
</script>

<svelte:head>
	<title>Ember · Users (SvelteKit)</title>
</svelte:head>

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">Administration</div>
		<h1 class="page-title">Users</h1>
		<p class="page-subtitle">Manage members, roles, and access across all tenants.</p>
	</div>
	<div class="flex gap-2">
		<Button variant="outline" size="sm" onclick={() => toast.success('Import queued', 'users.csv · 12 rows will be processed.')}>
			<Icon name="upload" size={13} /> Import CSV
		</Button>
		<Button variant="ember" size="sm" onclick={() => (inviteOpen = true)}>
			<Icon name="user-plus" size={13} /> Invite user
		</Button>
	</div>
</div>

<div class="mb-4" use:reveal>
	<Tabs
		bind:value={tab}
		tabs={[
			{ value: 'overview', label: 'Overview' },
			{ value: 'users', label: 'Users', badge: '248' },
			{ value: 'tenants', label: 'Tenants' },
			{ value: 'roles', label: 'Roles & Permissions' },
			{ value: 'audit', label: 'Audit Log' },
			{ value: 'settings', label: 'Settings' }
		]}
		onchange={(v) => v !== 'users' && toast.info('Mockup tab', `“${v}” isn’t part of this example.`)}
	/>
</div>

<div class="grid grid-4 mb-4">
	<div use:reveal><StatCard label="Total users" value={248} delta="12 this month" deltaTone="up" icon="users" iconClass="bg-primary/10 text-stat-apikeys" /></div>
	<div use:reveal={{ delay: 70 }}><StatCard label="Active now" value={34} delta="across 6 tenants" icon="circle-dot" iconClass="bg-success/10 text-success" /></div>
	<div use:reveal={{ delay: 140 }}><StatCard label="Pending invites" value={7} icon="envelope" iconClass="bg-amber/10 text-stat-conversations" /></div>
	<div use:reveal={{ delay: 210 }}><StatCard label="Suspended" value={3} icon="lock" iconClass="bg-destructive/10 text-destructive" /></div>
</div>

<div class="card" style="overflow:hidden;" use:reveal>
	<div class="card-body-compact toolbar">
		<div style="max-width:260px;flex:1;min-width:180px;">
			<SearchField bind:value={query} placeholder="Search users…" />
		</div>
		<Dropdown align="left">
			{#snippet trigger({ toggle })}
				<Button variant="outline" size="sm" onclick={toggle}>
					<Icon name="filter" size={13} /> Role: {roleFilter === 'all' ? 'All' : roleFilter}
					<Icon name="chevron-down" size={11} />
				</Button>
			{/snippet}
			<button class="menu-item" onclick={() => (roleFilter = 'all')}>All roles</button>
			<button class="menu-item" onclick={() => (roleFilter = 'admin')}><span class="badge role-admin">admin</span></button>
			<button class="menu-item" onclick={() => (roleFilter = 'maintainer')}><span class="badge role-maintainer">maintainer</span></button>
			<button class="menu-item" onclick={() => (roleFilter = 'member')}><span class="badge role-member">member</span></button>
		</Dropdown>
		<Dropdown align="left">
			{#snippet trigger({ toggle })}
				<Button variant="outline" size="sm" onclick={toggle}>
					<Icon name="circle-dot" size={13} /> Status: {presenceFilter === 'all' ? 'All' : presenceFilter}
					<Icon name="chevron-down" size={11} />
				</Button>
			{/snippet}
			<button class="menu-item" onclick={() => (presenceFilter = 'all')}>All statuses</button>
			<button class="menu-item" onclick={() => (presenceFilter = 'Online')}><span class="status-dot online"></span> Online</button>
			<button class="menu-item" onclick={() => (presenceFilter = 'Idle')}><span class="status-dot idle"></span> Idle</button>
			<button class="menu-item" onclick={() => (presenceFilter = 'Offline')}><span class="status-dot offline"></span> Offline</button>
		</Dropdown>
		<div class="topbar-spacer"></div>
		{#if selectedCount > 0}
			<Badge variant="primary">{selectedCount} selected</Badge>
			<Button variant="outline" size="sm" onclick={() => toast.success('Roles updated', 'Bulk role change applied in this example.')}>
				<Icon name="tag" size={12} /> Change role
			</Button>
			<Button variant="outline" size="sm" onclick={() => toast.warning('Users suspended', 'Bulk suspend applied in this example.')}>
				<Icon name="lock" size={12} /> Suspend
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
					<th>User</th>
					<th>Role</th>
					<th>Tenant</th>
					<th>Status</th>
					<th>Last active</th>
					<th>Requests</th>
					<th style="width:60px;"></th>
				</tr>
			</thead>
			<tbody>
				{#each filtered as u (u.id)}
					<tr class:selected={checked[u.id]} style={u.presence === 'Suspended' ? 'opacity:.6;' : ''}>
						<td><input type="checkbox" class="checkbox" bind:checked={checked[u.id]} aria-label="Select {u.name}" /></td>
						<td>
							<div class="flex items-center gap-2">
								<Avatar initials={u.initials} gradient={u.gradient} />
								<div>
									<div class="font-medium" class:text-muted-foreground={u.presence === 'Suspended'}>{u.name}</div>
									<div class="text-xs text-subtle">{u.email}</div>
								</div>
							</div>
						</td>
						<td><span class="badge role-{u.role}">{u.role}</span></td>
						<td>
							<span class="text-sm" class:text-muted-foreground={u.presence === 'Suspended'}>{u.tenant}</span>
							{#if u.tenantNote}<span class="text-xs text-subtle"> · {u.tenantNote}</span>{/if}
						</td>
						<td>
							{#if u.presence === 'Suspended'}
								<Badge variant="destructive">SUSPENDED</Badge>
							{:else}
								<span class="flex items-center gap-2">
									<span class="status-dot {u.presence.toLowerCase()}"></span>
									<span class="text-sm" class:text-muted-foreground={u.presence === 'Offline'}>{presenceLabel(u.presence)}</span>
								</span>
							{/if}
						</td>
						<td class="cell-subtle">{u.lastActive}</td>
						<td class="cell-mono" class:cell-subtle={u.requests === '0'}>{u.requests}</td>
						<td>
							<Dropdown>
								{#snippet trigger({ toggle })}
									<button class="btn btn-ghost btn-icon btn-sm" onclick={toggle} aria-label="Row actions"><Icon name="dots" size={14} /></button>
								{/snippet}
								{#if u.presence === 'Suspended'}
									<button class="menu-item" onclick={() => toast.success('User restored', u.name)}><Icon name="refresh" size={13} /> Restore</button>
									<div class="menu-sep"></div>
									<button class="menu-item danger" onclick={() => toast.warning('User deleted', u.name)}><Icon name="trash" size={13} /> Delete</button>
								{:else}
									<button class="menu-item" onclick={() => toast.info('Edit user', `${u.name} (demo).`)}><Icon name="pencil" size={13} /> Edit</button>
									<button class="menu-item" onclick={() => toast.success('Role changed', `${u.name} (demo).`)}><Icon name="tag" size={13} /> Change role</button>
									<div class="menu-sep"></div>
									<button class="menu-item danger" onclick={() => toast.warning('User suspended', u.name)}><Icon name="lock" size={13} /> Suspend</button>
								{/if}
							</Dropdown>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="8">
							<div class="empty-state">
								<div class="empty-icon"><Icon name="users" size={20} /></div>
								<p class="text-sm">No users match the current filters</p>
								<Button variant="outline" size="sm" class="mt-3" onclick={() => { query = ''; roleFilter = 'all'; presenceFilter = 'all'; }}>Clear filters</Button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="card-body-compact flex items-center justify-between" style="border-top:1px solid var(--color-border);">
		<span class="text-xs text-muted-foreground">1–{filtered.length} of 248</span>
		<Pagination total={42} bind:page onchange={(p) => toast.info(`Page ${p}`, 'Pagination is a visual demo in this example.')} />
	</div>
</div>

<Modal bind:open={inviteOpen} title="Invite user" description="They'll receive an email with a setup link.">
	<div class="stack">
		<TextField label="Email" placeholder="teammate@company.io" bind:value={inviteEmail} />
		<div class="grid grid-2 gap-3">
			<div>
				<span class="field-label">Role</span>
				<Dropdown align="left">
					{#snippet trigger({ toggle })}
						<button class="input pointer w-full" style="display:flex;align-items:center;justify-content:space-between;" onclick={toggle}>
							<span class="text-sm">{inviteRole}</span>
							<Icon name="chevron-down" size={13} class="text-muted-foreground" />
						</button>
					{/snippet}
					<button class="menu-item" onclick={() => (inviteRole = 'admin')}><span class="badge role-admin">admin</span></button>
					<button class="menu-item" onclick={() => (inviteRole = 'maintainer')}><span class="badge role-maintainer">maintainer</span></button>
					<button class="menu-item" onclick={() => (inviteRole = 'member')}><span class="badge role-member">member</span></button>
				</Dropdown>
			</div>
			<div>
				<span class="field-label">Tenant</span>
				<Dropdown align="left">
					{#snippet trigger({ toggle })}
						<button class="input pointer w-full" style="display:flex;align-items:center;justify-content:space-between;" onclick={toggle}>
							<span class="text-sm">{inviteTenant}</span>
							<Icon name="chevron-down" size={13} class="text-muted-foreground" />
						</button>
					{/snippet}
					{#each ['Acme', 'Northwind', 'OldCorp'] as t (t)}
						<button class="menu-item" onclick={() => (inviteTenant = t)}>{t}</button>
					{/each}
				</Dropdown>
			</div>
		</div>
	</div>
	{#snippet footer()}
		<Button variant="ghost" size="sm" onclick={() => (inviteOpen = false)}>Cancel</Button>
		<Button
			variant="ember"
			size="sm"
			onclick={() => {
				inviteOpen = false;
				toast.success('Invite sent', inviteEmail || 'Check pending invites for status.');
			}}
		>
			<Icon name="envelope" size={13} /> Send invite
		</Button>
	{/snippet}
</Modal>

<style>
	.toolbar {
		border-bottom: 1px solid var(--color-border);
		display: flex; align-items: center; gap: 0.5rem;
		padding: 0.625rem 0.75rem; flex-wrap: wrap;
	}
	:global(.role-admin) {
		background: rgb(var(--tw-primary) / 0.12);
		color: var(--color-primary);
		border-color: rgb(var(--tw-primary) / 0.2);
	}
	:global(.role-maintainer) {
		background: rgb(var(--tw-amber) / 0.12);
		color: var(--color-amber);
		border-color: rgb(var(--tw-amber) / 0.2);
	}
	:global(.role-member) {
		background: var(--color-muted);
		color: var(--color-muted-foreground);
	}
	:global(.status-dot) { width: 7px; height: 7px; border-radius: 50%; flex: none; }
	:global(.status-dot.online) {
		background: var(--color-success);
		box-shadow: 0 0 8px rgb(16 185 129 / 0.6);
		animation: ember-pulse-dot 2.4s ease-in-out infinite;
		--pulse-rgb: 16 185 129;
	}
	:global(.status-dot.idle) { background: var(--color-amber); }
	:global(.status-dot.offline) { background: var(--color-subtle); }
</style>
