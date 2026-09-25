<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		title: string;
		badge?: string;
		children?: Snippet;
	}

	let { id, title, badge, children }: Props = $props();

	setContext('ember:accordion-item', { id, title, badge });
</script>

<div class="ember-accordion-item" style="border-bottom:1px solid var(--color-border);">
	{@render children?.()}
</div>
