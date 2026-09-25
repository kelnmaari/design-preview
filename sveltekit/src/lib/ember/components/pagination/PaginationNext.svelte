<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ page: number; total: number; next: () => void }>('ember:pagination');

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: cls = 'page-btn', children, ...rest }: Props = $props();

	const disabled = $derived(ctx.page >= ctx.total);
</script>

<button type="button" class={cls} {disabled} onclick={() => ctx.next()} {...rest}>
	{#if children}{@render children?.()}{:else}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 6 6 6-6 6" /></svg>{/if}
</button>
