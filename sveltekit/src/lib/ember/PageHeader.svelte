<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		eyebrow?: string;
		title: string;
		subtitle?: string;
		actions?: Snippet;
		children?: Snippet;
	}

	let { eyebrow, title, subtitle, actions, children }: Props = $props();
</script>

<div class="page-header">
	<div>
		{#if eyebrow}<div class="eyebrow mb-2">{eyebrow}</div>{/if}
		<h1 class="page-title">{title}</h1>
		{#if subtitle}<p class="page-subtitle">{subtitle}</p>{/if}
		{#if children}{@render children()}{/if}
	</div>
	{#if actions}
		<div class="ember-page-actions">{@render actions()}</div>
	{/if}
</div>

<style>
	.ember-page-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: none;
		flex-wrap: wrap;
		justify-content: flex-end;
	}
</style>
