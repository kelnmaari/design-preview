<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<li style="display:flex;align-items:center;gap:7px;">{@render children?.()}</li>
