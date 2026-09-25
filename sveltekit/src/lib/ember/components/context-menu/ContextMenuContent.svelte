<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { handleRovingKeys, clickOutside } from '../internal/utils.js';

	const ctx = getContext<{
		open: boolean;
		x: number;
		y: number;
		setOpen: (v: boolean) => void;
	}>('ember:context-menu');

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
	let menu: HTMLElement | undefined = $state();
	let vw = $state(0);
	let vh = $state(0);

	$effect(() => {
		if (ctx.open) queueMicrotask(() => menu?.querySelector<HTMLElement>('[role="menuitem"]')?.focus());
	});

	function clamp(v: number, max: number) {
		return Math.min(v, Math.max(0, max - 8));
	}
</script>

<svelte:window bind:innerWidth={vw} bind:innerHeight={vh} onkeydown={(e) => {
	if (ctx.open && e.key === 'Escape') ctx.setOpen(false);
}} />

{#if ctx.open}
	<div
		class="menu {cls}"
		style="visibility:visible;display:block;opacity:1;transform:none;position:fixed;top:{clamp(ctx.y, vh)}px;left:{clamp(ctx.x, vw)}px;z-index:var(--z-dropdown);"
		role="menu"
		bind:this={menu}
		use:clickOutside={() => ctx.setOpen(false)}
		onkeydown={(e) => menu && handleRovingKeys(e, menu)}
	>
		{@render children?.()}
	</div>
{/if}
