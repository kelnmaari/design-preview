<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { handleRovingKeys, clickOutside } from '../internal/utils.js';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:dropdown-menu');

	interface Props {
		class?: string;
		align?: 'left' | 'right';
		children?: Snippet;
	}

	let { class: cls = '', align = 'right', children }: Props = $props();
	let menu: HTMLElement | undefined = $state();

	$effect(() => {
		if (ctx.open) queueMicrotask(() => menu?.querySelector<HTMLElement>('[role="menuitem"]')?.focus());
	});
</script>

<svelte:window onkeydown={(e) => {
	if (!ctx.open) return;
	if (e.key === 'Escape') ctx.setOpen(false);
}} />

{#if ctx.open}
	<div
		class="menu {cls}"
		style="visibility:visible;display:block;opacity:1;transform:none;{align === 'left' ? 'left:0;right:auto;' : 'right:0;'}"
		role="menu"
		bind:this={menu}
		use:clickOutside={() => ctx.setOpen(false)}
		onkeydown={(e) => menu && handleRovingKeys(e, menu)}
	>
		{@render children?.()}
	</div>
{/if}
