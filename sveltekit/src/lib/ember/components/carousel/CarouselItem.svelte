<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		width?: string;
		class?: string;
		children?: Snippet;
	}

	let { width = '260px', class: cls = '', children }: Props = $props();
</script>

<div class="card card-body {cls}" style="width:{width};">
	{@render children?.()}
</div>
