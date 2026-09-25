<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ prev: () => void; next: () => void }>('ember:carousel');

	interface Props {
		dir?: 'prev' | 'next';
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { dir = 'prev', class: cls = 'btn btn-outline btn-sm', children, ...rest }: Props = $props();
</script>

<button type="button" class={cls} onclick={() => ctx[dir === 'prev' ? 'prev' : 'next']()} {...rest}>
	{#if children}
		{@render children?.()}
	{:else}
		<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			{#if dir === 'prev'}<path d="m15 6-6 6 6 6" />{:else}<path d="m9 6 6 6-6 6" />{/if}
		</svg>
	{/if}
</button>
