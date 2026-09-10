<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import Icon from './Icon.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { toast } from './toast.svelte.js';
	import type { IconName } from './icons.js';

	interface NavItem {
		section?: string;
		label?: string;
		icon?: IconName;
		href?: string;
		badge?: string;
	}

	interface Props {
		onPalette: () => void;
		children?: Snippet;
	}

	let { onPalette, children }: Props = $props();

	const NAV: NavItem[] = [
		{ section: 'Workspace' },
		{ label: 'Dashboard', icon: 'gauge', href: '/' },
		{ label: 'Chat', icon: 'comments', href: '/chat' },
		{ label: 'API Keys', icon: 'key', href: '/api-keys', badge: '3' },
		{ label: 'Files', icon: 'folder', href: '/files' },
		{ section: 'System' },
		{ label: 'Tokens', icon: 'fire', href: '/tokens' },
		{ label: 'Components', icon: 'cube', href: '/components' },
		{ label: 'Patterns', icon: 'layers', href: '/patterns' },
		{ label: 'Tailwind', icon: 'sparkles', href: '/tailwind' },
		{ section: 'Platform' },
		{ label: 'Models', icon: 'microchip', href: '#' },
		{ label: 'RAG', icon: 'database', href: '#' },
		{ label: 'Monitor', icon: 'chart-line', href: '/monitor' },
		{ section: 'Admin' },
		{ label: 'Users', icon: 'users', href: '/users' },
		{ label: 'Settings', icon: 'gear', href: '#' }
	];

	let mobileOpen = $state(false);
	let bellDot = $state(true);

	function demo(e: MouseEvent, label: string) {
		e.preventDefault();
		mobileOpen = false;
		toast.info('Mockup link', `“${label}” isn’t part of this example.`);
	}

	function isActive(href: string | undefined) {
		if (!href || href === '#') return false;
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<div class="app-shell">
	<div class="mobile-scrim" class:open={mobileOpen} onclick={() => (mobileOpen = false)} role="presentation"></div>
	<aside class="sidebar" class:open={mobileOpen}>
		<a href="/" class="sidebar-brand">
			<div class="logo">E</div>
			<div>
				<div class="brand-name">AIGateway</div>
				<div class="brand-sub">v7.0.0 · ember</div>
			</div>
		</a>
		<nav class="sidebar-nav">
			{#each NAV as item (item.label ?? item.section)}
				{#if item.section}
					<div class="sidebar-section-label">{item.section}</div>
				{:else if item.href === '#'}
					<button class="nav-item" onclick={(e) => demo(e, item.label ?? '')}>
						<span class="nav-icon"><Icon name={item.icon ?? 'arrow-right'} size={15} /></span>
						{item.label}
						{#if item.badge}<span class="nav-badge">{item.badge}</span>{/if}
					</button>
				{:else}
					<a
						href={item.href}
						class="nav-item"
						class:active={isActive(item.href)}
						onclick={() => (mobileOpen = false)}
					>
						<span class="nav-icon"><Icon name={item.icon ?? 'arrow-right'} size={15} /></span>
						{item.label}
						{#if item.badge}<span class="nav-badge">{item.badge}</span>{/if}
					</a>
				{/if}
			{/each}
		</nav>
		<div class="sidebar-footer">
			<button type="button" class="user-chip" onclick={(e) => demo(e, 'Profile')}>
				<span class="avatar">AK</span>
				<div style="min-width:0;text-align:left">
					<div class="u-name truncate">Alex Kim</div>
					<div class="u-role">admin · acme</div>
				</div>
				<Icon name="chevron-right" size={13} class="text-subtle" />
			</button>
		</div>
	</aside>

	<div class="main">
		<header class="topbar">
			<button class="icon-btn burger" onclick={() => (mobileOpen = true)} aria-label="Menu">
				<Icon name="sidebar" size={16} />
			</button>
			<button class="topbar-search" onclick={onPalette} aria-label="Search (Cmd+K)">
				<Icon name="magnifying-glass" size={14} />
				<span>Search or jump to…</span>
				<span class="kbd-hint"><kbd>⌘</kbd><kbd>K</kbd></span>
			</button>
			<div class="topbar-spacer"></div>
			<button class="icon-btn" onclick={onPalette} aria-label="Commands">
				<Icon name="command" size={15} />
			</button>
			<button
				class="icon-btn"
				aria-label="Notifications"
				onclick={() => {
					toast.success('All systems operational', 'p99 latency 1.2s · 0 errors in the last hour.');
					bellDot = false;
				}}
			>
				<Icon name="bell" size={15} />
				{#if bellDot}<span class="dot"></span>{/if}
			</button>
			<div class="divider-vertical" style="height:20px"></div>
			<ThemeToggle />
		</header>
		<main class="content">
			{@render children?.()}
		</main>
	</div>
</div>

<style>
	.app-shell { display: flex; min-height: 100vh; }
	.sidebar {
		width: 232px; flex: none;
		background: rgb(var(--tw-card) / 0.75);
		backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
		border-right: 1px solid var(--color-border);
		display: flex; flex-direction: column;
		position: sticky; top: 0; height: 100vh; z-index: 30;
	}
	.sidebar-brand {
		padding: 0.875rem 1rem; border-bottom: 1px solid var(--color-border);
		display: flex; align-items: center; gap: 0.625rem; text-decoration: none;
	}
	.sidebar-brand .logo {
		width: 30px; height: 30px; border-radius: 8px;
		background-image: linear-gradient(135deg, #f59e0b, #f43f5e);
		display: grid; place-items: center; color: #fff;
		font-weight: 800; font-size: 15px;
		box-shadow: 0 2px 14px rgb(244 63 94 / 0.35); flex: none;
		transition: transform 0.2s var(--ease-spring), box-shadow 0.2s ease;
	}
	.sidebar-brand:hover .logo { transform: rotate(-8deg) scale(1.05); box-shadow: 0 4px 22px rgb(244 63 94 / 0.5); }
	.sidebar-brand .brand-name { font-size: 14px; font-weight: 600; color: var(--color-foreground); }
	.sidebar-brand .brand-sub { font-size: 10px; color: var(--color-subtle); font-family: var(--font-mono); }
	.sidebar-nav { padding: 0.5rem; flex: 1; overflow-y: auto; }
	.sidebar-section-label {
		font-size: 10px; font-weight: 600; text-transform: uppercase;
		letter-spacing: 0.08em; color: var(--color-subtle); padding: 0.875rem 0.5rem 0.375rem;
	}
	:global(.nav-item) {
		display: flex; align-items: center; gap: 0.625rem;
		padding: 0.42rem 0.5rem; border-radius: var(--radius-sm);
		font-size: 13px; color: var(--color-muted-foreground); text-decoration: none;
		transition: background-color 0.12s ease, color 0.12s ease, transform 0.12s ease;
		margin-bottom: 1px; position: relative;
	}
	:global(.nav-item:hover) { background: var(--color-accent); color: var(--color-foreground); }
	:global(.nav-item:active) { transform: scale(0.985); }
	:global(.nav-item.active) { background: rgb(var(--tw-primary) / 0.12); color: var(--color-primary); font-weight: 500; }
	:global(.nav-item .nav-icon) { width: 16px; display: inline-flex; justify-content: center; opacity: 0.85; }
	:global(.nav-badge) {
		margin-left: auto; font-size: 10px; font-family: var(--font-mono);
		padding: 1px 5px; border-radius: 9999px;
		background: var(--color-muted); color: var(--color-muted-foreground);
	}
	:global(.nav-item.active .nav-badge) { background: rgb(var(--tw-primary) / 0.2); color: var(--color-primary); }
	button.nav-item { width: 100%; text-align: left; font-family: var(--font-sans); }
	button.user-chip { width: 100%; font-family: var(--font-sans); }
	.sidebar-footer { padding: 0.625rem; border-top: 1px solid var(--color-border); }
	:global(.user-chip) {
		display: flex; align-items: center; gap: 0.5rem;
		padding: 0.4rem; border-radius: var(--radius-sm);
		text-decoration: none; transition: background-color 0.12s ease;
	}
	:global(.user-chip:hover) { background: var(--color-accent); }
	:global(.user-chip .avatar) { width: 26px; height: 26px; font-size: 10px; }
	:global(.user-chip .u-name) { font-size: 12.5px; font-weight: 500; color: var(--color-foreground); }
	:global(.user-chip .u-role) { font-size: 10.5px; color: var(--color-subtle); }
	:global(.user-chip svg) { margin-left: auto; }
	.main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
	.topbar {
		height: 52px; flex: none;
		background: rgb(var(--tw-card) / 0.72);
		backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-border);
		display: flex; align-items: center; gap: 0.6rem; padding: 0 1rem;
		position: sticky; top: 0; z-index: 10;
	}
	.topbar-search {
		flex: 1; max-width: 360px; height: 32px;
		background: var(--color-background); border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		display: flex; align-items: center; gap: 0.5rem; padding: 0 0.625rem;
		font-size: 12.5px; color: var(--color-subtle); cursor: pointer;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
		font-family: var(--font-sans);
	}
	.topbar-search:hover { border-color: var(--color-border-strong); }
	.topbar-search .kbd-hint { margin-left: auto; display: flex; gap: 2px; }
	.topbar-spacer { flex: 1; }
	:global(.icon-btn) { position: relative; }
	.dot {
		position: absolute; top: 6px; right: 7px;
		width: 7px; height: 7px; border-radius: 50%;
		background: var(--color-primary);
		box-shadow: 0 0 8px rgb(244 63 94 / 0.8);
		border: 1.5px solid var(--color-card);
	}
	.mobile-scrim {
		position: fixed; inset: 0; z-index: 28;
		background: rgb(0 0 0 / 0.5); backdrop-filter: blur(2px);
		opacity: 0; pointer-events: none; transition: opacity 0.25s ease;
	}
	.mobile-scrim.open { opacity: 1; pointer-events: auto; }
	.burger { display: none; }
	.content { flex: 1; padding: 1.5rem; width: 100%; max-width: 1440px; margin: 0 auto; }
	@media (max-width: 880px) {
		.burger { display: inline-grid; }
		.sidebar {
			position: fixed; top: 0; left: 0; bottom: 0; height: 100dvh;
			transform: translateX(-105%);
			transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
			background: var(--color-card);
			box-shadow: 20px 0 60px rgb(0 0 0 / 0.45);
		}
		.sidebar.open { transform: none; }
		.topbar-search { max-width: none; }
		.topbar-search span:not(.kbd-hint) { display: none; }
		.topbar-search .kbd-hint { display: none; }
	}
</style>
