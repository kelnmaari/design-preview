<script lang="ts">
	import type { Snippet } from 'svelte';
	import { clickOutside } from './actions.svelte.js';

	interface Props {
		title?: string;
		side?: 'bottom' | 'top';
		align?: 'start' | 'end';
		open?: boolean;
		trigger: Snippet<[{ open: boolean; toggle: () => void }]>;
		children: Snippet;
		onToggle?: (open: boolean) => void;
	}

	let { title, side = 'bottom', align = 'start', open = $bindable(false), trigger, children, onToggle }: Props = $props();

	function toggle() {
		open = !open;
		onToggle?.(open);
	}

	function close() {
		if (!open) return;
		open = false;
		onToggle?.(false);
	}
</script>

<div class="ember-popover" use:clickOutside={close}>
	{@render trigger({ open, toggle })}
	{#if open}
		<div
			class="ember-popover-panel"
			class:top={side === 'top'}
			class:end={align === 'end'}
			role="dialog"
			aria-label={title ?? 'Details'}
		>
			{#if title}<div class="ember-popover-title">{title}</div>{/if}
			<div class="ember-popover-body">{@render children()}</div>
		</div>
	{/if}
</div>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') close();
	}}
/>

<style>
	.ember-popover { position: relative; display: inline-flex; }
	.ember-popover-panel {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		z-index: 60;
		min-width: 220px;
		max-width: 320px;
		background: var(--color-card-elevated);
		border: 1px solid var(--color-border-strong);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		padding: 0.7rem 0.8rem;
		animation: ember-popover-in var(--dur-fast) var(--ease-out);
	}
	.ember-popover-panel.top { top: auto; bottom: calc(100% + 8px); }
	.ember-popover-panel.end { left: auto; right: 0; }
	.ember-popover-title { font-size: 12.5px; font-weight: 600; margin-bottom: 0.3rem; }
	.ember-popover-body { font-size: 12.5px; color: var(--color-muted-foreground); line-height: 1.55; }
	@keyframes ember-popover-in {
		from { opacity: 0; transform: translateY(-3px); }
		to { opacity: 1; transform: none; }
	}
</style>
