<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ setViewport: (el: HTMLElement) => void }>('ember:carousel');

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
	let vp: HTMLElement | undefined = $state();
	$effect(() => {
		if (vp) ctx.setViewport(vp);
	});
</script>

<div class="kit-carousel-viewport {cls}" bind:this={vp}>
	{@render children?.()}
</div>

<style>
	.kit-carousel-viewport {
		display: flex;
		gap: 12px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		padding-bottom: 4px;
	}
	.kit-carousel-viewport::-webkit-scrollbar {
		display: none;
	}
	.kit-carousel-viewport > :global(*) {
		scroll-snap-align: start;
		flex: none;
	}
</style>
