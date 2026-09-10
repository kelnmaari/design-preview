<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import type { IconName } from './icons.js';

	interface Props {
		icon?: IconName;
		title?: string;
		description?: string;
		retryLabel?: string;
		onretry?: () => void;
		children?: Snippet;
	}

	let {
		icon = 'triangle-exclamation',
		title = 'Something went wrong',
		description,
		retryLabel = 'Try again',
		onretry,
		children
	}: Props = $props();
</script>

<div class="empty-state" role="alert">
	<div class="empty-icon ember-error-icon"><Icon name={icon} size={20} /></div>
	<p class="text-sm font-medium">{title}</p>
	{#if description}<p class="text-xs text-muted-foreground mt-2">{description}</p>{/if}
	<div class="mt-3 flex gap-2 justify-center">
		{#if onretry}
			<button class="btn btn-outline btn-sm" onclick={onretry}>
				<Icon name="refresh" size={13} /> {retryLabel}
			</button>
		{/if}
		{#if children}{@render children()}{/if}
	</div>
</div>

<style>
	.ember-error-icon {
		background: rgb(var(--tw-destructive) / 0.1);
		color: var(--color-destructive);
	}
	.justify-center { justify-content: center; }
</style>
