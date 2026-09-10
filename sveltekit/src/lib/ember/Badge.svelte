<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'amber' | 'success' | 'info' | 'destructive' | 'muted';

	interface Props {
		variant?: Variant;
		dot?: boolean;
		children?: Snippet;
	}

	let { variant = 'muted', dot = false, children }: Props = $props();
</script>

<span class="badge badge-{variant}" class:badge-dot={dot}>
	{@render children?.()}
</span>
