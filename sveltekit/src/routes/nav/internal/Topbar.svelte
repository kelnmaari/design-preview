<script lang="ts">
	import { Badge, Icon, Segmented, ThemeToggle, toast } from '$lib/ember/index.js';

	interface Props {
		variant: 'baseline' | 'breadcrumb' | 'workspace';
	}
	let { variant }: Props = $props();

	let env = $state('prod');
	const envOptions = [
		{ value: 'prod', label: 'Production' },
		{ value: 'staging', label: 'Staging' }
	];

	function demo(e: MouseEvent, what: string) {
		e.preventDefault();
		toast.info('Demo', `«${what}» — демонстрационная ссылка варианта навигации.`);
	}
</script>

{#if variant === 'baseline'}
	<header class="topbar">
		<button class="icon-btn" aria-label="Menu" onclick={(e) => demo(e, 'Menu')}><Icon name="sidebar" size={16} /></button>
		<button class="topbar-search" onclick={(e) => demo(e, 'Search')} aria-label="Search (Cmd+K)">
			<Icon name="magnifying-glass" size={14} />
			<span>Search or jump to…</span>
			<span class="kbd-hint"><kbd>⌘</kbd><kbd>K</kbd></span>
		</button>
		<div class="topbar-spacer"></div>
		<button class="icon-btn" aria-label="Commands" onclick={(e) => demo(e, 'Commands')}><Icon name="command" size={15} /></button>
		<button class="icon-btn" aria-label="Notifications" onclick={(e) => demo(e, 'Notifications')}>
			<Icon name="bell" size={15} />
			<span class="bell-dot"></span>
		</button>
		<div class="divider-vertical" style="height:20px"></div>
		<ThemeToggle />
	</header>
{:else if variant === 'breadcrumb'}
	<header class="topbar">
		<button class="icon-btn" aria-label="Menu" onclick={(e) => demo(e, 'Menu')}><Icon name="sidebar" size={16} /></button>
		<div class="crumbs">
			<a href="/nav/internal" onclick={(e) => demo(e, 'Workspace')} style="text-decoration:none;color:inherit;">Workspace</a>
			<span class="sep"><Icon name="chevron-right" size={12} /></span>
			<span class="current">Dashboard</span>
			<Badge variant="success" dot>live</Badge>
		</div>
		<div class="topbar-spacer"></div>
		<button class="icon-btn" aria-label="Search" data-tip="Search ⌘K" onclick={(e) => demo(e, 'Search')}><Icon name="magnifying-glass" size={15} /></button>
		<button class="icon-btn" aria-label="Commands" data-tip="Commands ⌘K" onclick={(e) => demo(e, 'Commands')}><Icon name="command" size={15} /></button>
		<button class="icon-btn" aria-label="Notifications" data-tip="Notifications" onclick={(e) => demo(e, 'Notifications')}><Icon name="bell" size={15} /></button>
		<div class="divider-vertical" style="height:20px"></div>
		<ThemeToggle />
		<span class="avatar chip">AK</span>
	</header>
{:else}
	<header class="topbar">
		<button class="ws-pill" onclick={(e) => demo(e, 'Workspace switcher')}>
			<span class="ws-logo">A</span>
			<span class="truncate">Acme Inc</span>
			<span class="ws-sub">/ production</span>
			<Icon name="chevron-down" size={12} class="text-subtle" />
		</button>
		<div class="topbar-spacer"></div>
		<Segmented options={envOptions} bind:value={env} />
		<button class="icon-btn" aria-label="Help" data-tip="Docs &amp; support" onclick={(e) => demo(e, 'Help')}><Icon name="book" size={15} /></button>
		<button class="icon-btn" aria-label="Notifications" data-tip="Notifications" onclick={(e) => demo(e, 'Notifications')}><Icon name="bell" size={15} /></button>
		<div class="divider-vertical" style="height:20px"></div>
		<ThemeToggle />
		<span class="avatar chip">AK</span>
	</header>
{/if}

<style>
	.crumbs { display:flex; align-items:center; gap:7px; font-size:13px; color:var(--color-subtle); }
	.crumbs .current { color:var(--color-foreground); font-weight:500; }
	.crumbs .sep { opacity:.55; display:inline-flex; }
	.crumbs :global(.badge) { margin-left:4px; }

	.avatar.chip { width:26px; height:26px; font-size:10px; margin-left:2px; }

	.ws-pill { display:flex; align-items:center; gap:8px; height:32px; padding:0 8px 0 6px; border-radius:var(--radius-md);
		border:1px solid var(--color-border); background:var(--color-background); font-size:12.5px; font-weight:600;
		color:var(--color-foreground); cursor:pointer; transition:border-color .15s ease; font-family:var(--font-sans); }
	.ws-pill:hover { border-color:var(--color-border-strong); }
	.ws-pill .ws-logo { width:22px; height:22px; border-radius:6px; background-image:linear-gradient(135deg,#f59e0b,#f43f5e);
		display:grid; place-items:center; color:#fff; font-weight:800; font-size:11px; flex:none; }
	.ws-pill .ws-sub { font-weight:400; color:var(--color-subtle); font-size:11px; font-family:var(--font-mono); }

	.bell-dot { position:absolute; top:6px; right:7px; width:7px; height:7px; border-radius:50%;
		background:var(--color-primary); box-shadow:0 0 8px rgb(244 63 94 / .8); border:1.5px solid var(--color-card); }
</style>
