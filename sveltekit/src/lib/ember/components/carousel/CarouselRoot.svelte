<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
	let viewport: HTMLElement | undefined = $state();

	function scroll(dir: 1 | -1) {
		viewport?.scrollBy({ left: dir * viewport.clientWidth * 0.8, behavior: 'smooth' });
	}

	setContext('ember:carousel', {
		prev: () => scroll(-1),
		next: () => scroll(1),
		setViewport: (el: HTMLElement) => (viewport = el)
	});
</script>

<div style="display:flex;flex-direction:column;gap:10px;">
	{@render children?.()}
</div>
