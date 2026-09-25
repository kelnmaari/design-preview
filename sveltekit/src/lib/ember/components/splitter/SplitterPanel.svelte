<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ sizes: number[]; vertical: boolean }>('ember:splitter');

	interface Props {
		index: number;
		class?: string;
		children?: Snippet;
	}

	let { index, class: cls = '', children }: Props = $props();

	const size = $derived(ctx.sizes[index] ?? 50);
</script>

<div
	class="kit-splitter-panel {cls}"
	style="flex:0 0 {size}%;overflow:auto;"
>
	{@render children?.()}
</div>
