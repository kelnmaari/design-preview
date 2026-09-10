<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from './Icon.svelte';
	import { theme } from './theme.svelte.js';
	import type { IconName } from './icons.js';

	export interface Command {
		group: string;
		label: string;
		hint?: string;
		icon?: IconName;
		href?: string;
		action?: 'theme';
	}

	interface Props {
		open?: boolean;
		commands?: Command[];
	}

	const DEFAULTS: Command[] = [
		{ group: 'Pages', label: 'Dashboard', hint: 'overview', icon: 'gauge', href: '/' },
		{ group: 'Pages', label: 'Chat', hint: 'thread', icon: 'comments', href: '/chat' },
		{ group: 'Pages', label: 'API Keys', hint: '156 keys', icon: 'key', href: '/api-keys' },
		{ group: 'Pages', label: 'Files', hint: 'RAG corpus', icon: 'folder', href: '/files' },
		{ group: 'Pages', label: 'Monitor', hint: 'live', icon: 'chart-line', href: '/monitor' },
		{ group: 'Pages', label: 'Users', hint: 'admin', icon: 'users', href: '/users' },
		{ group: 'Pages', label: 'Design Tokens', hint: 'system', icon: 'fire', href: '/tokens' },
		{ group: 'Pages', label: 'Components', hint: 'library', icon: 'cube', href: '/components' },
		{ group: 'Pages', label: 'Forms', hint: 'components', icon: 'pencil', href: '/components/forms' },
		{ group: 'Pages', label: 'Data', hint: 'components', icon: 'chart-bar', href: '/components/data' },
		{ group: 'Pages', label: 'Overlays', hint: 'components', icon: 'layers', href: '/components/overlays' },
		{ group: 'Pages', label: 'Content', hint: 'components', icon: 'comments', href: '/components/content' },
		{ group: 'Pages', label: 'Patterns', hint: 'guide', icon: 'layers', href: '/patterns' },
		{ group: 'Pages', label: 'Tailwind', hint: 'utilities', icon: 'sparkles', href: '/tailwind' },
		{ group: 'Actions', label: 'Cycle theme', hint: '6 themes', icon: 'sun', action: 'theme' }
	];

	let { open = $bindable(false), commands = DEFAULTS }: Props = $props();

	let query = $state('');
	let selected = $state(0);
	let inputEl: HTMLInputElement | undefined = $state();

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		const list = !q
			? commands
			: commands.filter(
					(c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
				);
		return list;
	});

	$effect(() => {
		if (open) {
			query = '';
			selected = 0;
			setTimeout(() => inputEl?.focus(), 30);
		}
	});

	$effect(() => {
		// reset selection whenever the query changes
		void query;
		selected = 0;
	});

	function close() {
		open = false;
	}

	function run(cmd: Command | undefined) {
		if (!cmd) return;
		close();
		if (cmd.action === 'theme') theme.toggle();
		else if (cmd.href) goto(cmd.href);
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selected = filtered.length ? (selected + 1) % filtered.length : 0;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selected = filtered.length ? (selected - 1 + filtered.length) % filtered.length : 0;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			run(filtered[selected]);
		} else if (e.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			open = !open;
		} else if (e.key === 'Escape' && open) close();
	}}
/>

<div class="cmdk-overlay" class:open onclick={(e) => e.target === e.currentTarget && close()} role="presentation">
	<div class="cmdk" role="dialog" aria-label="Command palette">
		<div class="cmdk-input-row">
			<Icon name="magnifying-glass" size={15} class="text-muted-foreground" />
			<input
				bind:this={inputEl}
				bind:value={query}
				onkeydown={onKey}
				placeholder="Type a command or search pages…"
				aria-label="Search commands"
			/>
			<kbd>esc</kbd>
		</div>
		<div class="cmdk-list">
			{#each filtered as cmd, i (cmd.label)}
				{#if i === 0 || filtered[i - 1].group !== cmd.group}
					<div class="cmdk-group">{cmd.group}</div>
				{/if}
				<button
					class="cmdk-item"
					class:selected={selected === i}
					onclick={() => run(cmd)}
					onmousemove={() => (selected = i)}
					role="option"
					aria-selected={selected === i}
				>
					<span class="cmdk-icon"><Icon name={cmd.icon ?? 'arrow-right'} size={14} /></span>
					<span>{cmd.label}</span>
					{#if cmd.hint}<span class="cmdk-hint">{cmd.hint}</span>{/if}
				</button>
			{:else}
				<div class="empty-state" style="padding:1.5rem;">
					<p class="text-sm">No results for “{query}”</p>
				</div>
			{/each}
		</div>
		<div class="cmdk-footer">
			<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> select</span><span><kbd>esc</kbd> close</span>
		</div>
	</div>
</div>

<style>
	.cmdk-item {
		width: 100%;
		text-align: left;
		font-family: var(--font-sans);
	}
</style>
