<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { handleRovingKeys, clickOutside } from '../internal/utils.js';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:select');

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
	let list: HTMLElement | undefined = $state();

	$effect(() => {
		if (ctx.open) queueMicrotask(() => list?.querySelector<HTMLElement>('[role="option"]')?.focus());
	});
</script>

<svelte:window onkeydown={(e) => ctx.open && e.key === 'Escape' && ctx.setOpen(false)} />

{#if ctx.open}
	<div
		class="menu {cls}"
		style="visibility:visible;display:block;opacity:1;transform:none;left:0;right:auto;min-width:100%;"
		role="listbox"
		bind:this={list}
		use:clickOutside={() => ctx.setOpen(false)}
		onkeydown={(e) => list && handleRovingKeys(e, list)}
	>
		{@render children?.()}
	</div>
{/if}
