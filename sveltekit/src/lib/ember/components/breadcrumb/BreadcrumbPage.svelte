<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<span aria-current="page" style="color:var(--color-foreground);font-weight:500;">{@render children?.()}</span>
