<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ value: string }>('ember:tabs');

	interface Props {
		value: string;
		class?: string;
		children?: Snippet;
	}

	let { value, class: cls = '', children }: Props = $props();

	const active = $derived(ctx.value === value);
</script>

{#if active}
	<div role="tabpanel" class={cls}>
		{@render children?.()}
	</div>
{/if}
