<script lang="ts">
	import { Icon, Progress, toast } from '$lib/ember/index.js';
	import type { IconName } from '$lib/ember/icons.js';

	interface Props {
		variant: 'baseline' | 'rail' | 'workspace';
	}
	let { variant }: Props = $props();

	interface NavItem {
		label: string;
		icon: IconName;
		active?: boolean;
		badge?: string;
	}
	const GROUPS: { label?: string; items: NavItem[] }[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Dashboard', icon: 'gauge', active: true },
				{ label: 'Chat', icon: 'comments' },
				{ label: 'History', icon: 'history' },
				{ label: 'API Keys', icon: 'key', badge: '3' },
				{ label: 'Files', icon: 'folder' }
			]
		},
		{
			label: 'Platform',
			items: [
				{ label: 'Models', icon: 'microchip' },
				{ label: 'RAG', icon: 'database' },
				{ label: 'GitLab', icon: 'code-branch' },
				{ label: 'Monitor', icon: 'chart-line' }
			]
		},
		{
			label: 'Admin',
			items: [
				{ label: 'Users', icon: 'users' },
				{ label: 'Settings', icon: 'gear' }
			]
		}
	];
	const FLAT: NavItem[] = GROUPS.flatMap((g) => g.items);

	function demo(e: MouseEvent, what: string) {
		e.preventDefault();
		toast.info('Demo', `«${what}» — демонстрационная ссылка варианта навигации.`);
	}
</script>

{#if variant === 'baseline'}
	<aside class="sidebar">
		<a href="/nav/internal" class="sidebar-brand" onclick={(e) => demo(e, 'Home')}>
			<div class="logo">E</div>
			<div>
				<div class="brand-name">Ember</div>
				<div class="brand-sub">design system · v2.2</div>
			</div>
		</a>
		<nav class="sidebar-nav">
			{#each GROUPS as group (group.label)}
				{#if group.label}<div class="sidebar-section-label">{group.label}</div>{/if}
				{#each group.items as item (item.label)}
					<a href="/nav/internal" class="nav-item" class:active={item.active} onclick={(e) => demo(e, item.label)}>
						<span class="nav-icon"><Icon name={item.icon} size={15} /></span>
						{item.label}
						{#if item.badge}<span class="nav-badge">{item.badge}</span>{/if}
					</a>
				{/each}
			{/each}
		</nav>
		<div class="sidebar-footer">
			<a href="/nav/internal" class="user-chip" onclick={(e) => demo(e, 'Profile')}>
				<span class="avatar">AK</span>
				<div style="min-width:0">
					<div class="u-name truncate">Alex Kim</div>
					<div class="u-role">admin · acme</div>
				</div>
				<Icon name="chevron-right" size={13} class="text-subtle" />
			</a>
		</div>
	</aside>
{:else if variant === 'rail'}
	<aside class="sidebar sb-rail">
		<a href="/nav/internal" class="sidebar-brand" onclick={(e) => demo(e, 'Home')}><div class="logo">E</div></a>
		<nav class="sidebar-nav">
			{#each GROUPS as group, gi (group.label ?? gi)}
				{#if gi > 0}<div class="rail-sep"></div>{/if}
				{#each group.items as item (item.label)}
					<a
						href="/nav/internal"
						class="rail-item"
						class:active={item.active}
						data-tip={item.label}
						onclick={(e) => demo(e, item.label)}
					>
						<Icon name={item.icon} size={16} />
						{#if item.badge}<span class="rail-badge">{item.badge}</span>{/if}
					</a>
				{/each}
			{/each}
		</nav>
		<div class="sidebar-footer">
			<button class="icon-btn" style="margin-bottom:6px" aria-label="Help" onclick={(e) => demo(e, 'Help')}>
				<Icon name="circle-info" size={15} />
			</button>
			<a href="/nav/internal" class="avatar" style="width:28px;height:28px;font-size:10px" onclick={(e) => demo(e, 'Profile')}>AK</a>
		</div>
	</aside>
{:else}
	<aside class="sidebar sb-s3">
		<a href="/nav/internal" class="sidebar-brand" onclick={(e) => demo(e, 'Home')}>
			<div class="logo">E</div>
			<div>
				<div class="brand-name">Ember</div>
				<div class="brand-sub">design system · v2.2</div>
			</div>
		</a>
		<button class="ws-card" onclick={(e) => demo(e, 'Workspace')}>
			<span class="ws-logo">A</span>
			<span style="min-width:0;text-align:left">
				<span class="ws-name truncate">Acme Inc</span>
				<span class="ws-plan">PRO PLAN</span>
			</span>
			<Icon name="chevron-down" size={13} class="text-subtle" />
		</button>
		<nav class="sidebar-nav">
			{#each FLAT as item (item.label)}
				<a href="/nav/internal" class="nav-item" class:active={item.active} onclick={(e) => demo(e, item.label)}>
					<span class="nav-icon"><Icon name={item.icon} size={15} /></span>
					{item.label}
					{#if item.badge}<span class="nav-badge">{item.badge}</span>{/if}
				</a>
			{/each}
		</nav>
		<div class="sidebar-footer">
			<div class="storage">
				<div class="storage-label"><span>Requests today</span><b>68%</b></div>
				<Progress value={68} tone="ember" />
			</div>
			<a href="/nav/internal" class="btn btn-ember btn-sm w-full" style="margin-top:.5rem" onclick={(e) => demo(e, 'Upgrade')}>
				Upgrade plan
			</a>
		</div>
	</aside>
{/if}

<style>
	/* ---- rail (Б2) ---- */
	.sb-rail { width:60px !important; align-items:center; }
	.sb-rail .sidebar-brand { width:100%; justify-content:center; padding:0.75rem 0; }
	.sb-rail .sidebar-nav { display:flex; flex-direction:column; align-items:center; padding:0.5rem 0; width:100%; scrollbar-width:none; }
	.sb-rail .sidebar-nav::-webkit-scrollbar { display:none; }
	.rail-sep { width:28px; height:1px; background:var(--color-border); margin:8px 0; flex:none; }
	.rail-item { position:relative; width:36px; height:36px; display:grid; place-items:center; border-radius:var(--radius-sm);
		color:var(--color-muted-foreground); margin:2px 0; text-decoration:none; flex:none;
		transition:background-color .12s ease, color .12s ease; }
	.rail-item:hover { background:var(--color-accent); color:var(--color-foreground); }
	.rail-item.active { background:rgb(var(--tw-primary) / .12); color:var(--color-primary); }
	.rail-item.active::before { content:""; position:absolute; left:-12px; top:7px; bottom:7px; width:3px; border-radius:3px;
		background-image:linear-gradient(180deg,#f59e0b,#f43f5e); box-shadow:0 0 10px rgb(244 63 94 / .6); }
	.rail-badge { position:absolute; top:2px; right:2px; min-width:14px; height:14px; padding:0 3px; border-radius:9999px;
		background:var(--color-primary); color:#fff; font-size:9px; font-weight:700; font-family:var(--font-mono);
		display:grid; place-items:center; border:2px solid var(--color-card); box-sizing:content-box; }
	.sb-rail .sidebar-footer { width:100%; display:flex; flex-direction:column; align-items:center; padding:0.625rem 0; }

	/* ---- workspace card + usage footer (Б3) ---- */
	.ws-card { margin:0.625rem 0.625rem 0; padding:0.55rem 0.625rem; border:1px solid var(--color-border); border-radius:var(--radius-md);
		display:flex; align-items:center; gap:0.55rem; background:var(--color-background); cursor:pointer;
		transition:border-color .15s ease; width:calc(100% - 1.25rem); font-family:var(--font-sans); }
	.ws-card:hover { border-color:var(--color-border-strong); }
	.ws-card .ws-logo { width:28px; height:28px; border-radius:7px; background-image:linear-gradient(135deg,#f59e0b,#f43f5e);
		display:grid; place-items:center; color:#fff; font-weight:800; font-size:12px; flex:none; }
	.ws-name { display:block; font-size:12.5px; font-weight:600; color:var(--color-foreground); line-height:1.2; }
	.ws-plan { display:block; font-size:10px; color:var(--color-subtle); font-family:var(--font-mono); }
	.ws-card :global(svg:last-child) { margin-left:auto; }
	.sb-s3 .sidebar-footer { padding:0.625rem; }
	.storage { padding:0 0.25rem 0.5rem; }
	.storage-label { display:flex; justify-content:space-between; font-size:11px; color:var(--color-muted-foreground); padding-bottom:0.375rem; }
	.storage-label b { font-family:var(--font-mono); color:var(--color-foreground); font-weight:600; }
</style>
