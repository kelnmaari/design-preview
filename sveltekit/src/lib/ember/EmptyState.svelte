<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import type { IconName } from './icons.js';

	interface Props {
		icon?: IconName;
		title: string;
		description?: string;
		children?: Snippet;
	}

	let { icon = 'inbox', title, description, children }: Props = $props();
</script>

<div class="empty-state">
	<div class="empty-icon"><Icon name={icon} size={20} /></div>
	<p class="text-sm font-medium">{title}</p>
	{#if description}<p class="text-xs text-muted-foreground mt-2">{description}</p>{/if}
	{#if children}<div class="mt-3">{@render children()}</div>{/if}
</div>
