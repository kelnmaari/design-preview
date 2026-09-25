<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label?: string;
		children?: Snippet;
	}

	let { label = 'Breadcrumb', children }: Props = $props();
</script>

<nav class="ember-crumbs" aria-label={label}>
	<ol style="display:flex;align-items:center;gap:7px;list-style:none;margin:0;padding:0;">
		{@render children?.()}
	</ol>
</nav>
