<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="ember-section-title">
	<span>{title}</span>
	{#if children}<span class="ember-section-extra">{@render children()}</span>{/if}
</div>

<style>
	.ember-section-title {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-muted-foreground);
		margin-bottom: 1rem;
	}
	.ember-section-title::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--color-border);
	}
	.ember-section-extra {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		order: 2;
		text-transform: none;
		letter-spacing: normal;
	}
</style>
