<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const root = getContext<{ openIds: string[] }>('ember:accordion');
	const item = getContext<{ id: string }>('ember:accordion-item');

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();

	const isOpen = $derived(root.openIds.includes(item.id));
</script>

{#if isOpen}
	<div class="card-body {cls}">{@render children?.()}</div>
{/if}
