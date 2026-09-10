<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import type { IconName } from './icons.js';

	interface Props {
		variant?: 'ember' | 'ghost';
		icon?: IconName;
		title: string;
		subtitle?: string;
		children?: Snippet;
	}

	let { variant = 'ember', icon = 'wand-sparkles', title, subtitle, children }: Props = $props();
</script>

<div class="banner banner-{variant}" class:noise={variant === 'ember'}>
	<div class="banner-icon"><Icon name={icon} size={variant === 'ember' ? 18 : 17} /></div>
	<div class="flex-1 min-w-0">
		<div class="text-sm font-semibold">{title}</div>
		{#if subtitle}
			<div class="text-xs {variant === 'ember' ? 'banner-sub' : 'text-muted-foreground'}">{subtitle}</div>
		{/if}
	</div>
	{@render children?.()}
</div>
