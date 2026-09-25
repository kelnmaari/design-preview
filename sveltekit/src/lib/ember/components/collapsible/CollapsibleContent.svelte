<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ open: boolean }>('ember:collapsible');

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
</script>

{#if ctx.open}
	<div class="card-body {cls}">{@render children?.()}</div>
{/if}
