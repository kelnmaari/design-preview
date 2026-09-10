<script lang="ts">
	import Icon from './Icon.svelte';
	import { count, spotlight } from './actions.svelte.js';
	import type { IconName } from './icons.js';

	interface Props {
		label: string;
		value: number | string;
		format?: 'int' | 'compact' | 'plain';
		delta?: string;
		deltaTone?: 'up' | 'down' | 'flat';
		icon?: IconName;
		iconClass?: string;
	}

	let {
		label,
		value,
		format = 'int',
		delta,
		deltaTone = 'flat',
		icon = 'activity',
		iconClass = 'bg-primary/10 text-primary'
	}: Props = $props();
</script>

<div class="stat-card spotlight" use:spotlight>
	<div class="stat-icon {iconClass}"><Icon name={icon} size={15} /></div>
	<div class="stat-label">{label}</div>
	{#if typeof value === 'number'}
		<div class="stat-value" use:count={{ to: value, format }}>0</div>
	{:else}
		<div class="stat-value">{value}</div>
	{/if}
	{#if delta}
		<div
			class="stat-delta"
			class:text-success={deltaTone === 'up'}
			class:text-destructive={deltaTone === 'down'}
			class:text-muted-foreground={deltaTone === 'flat'}
		>
			{#if deltaTone === 'up'}<Icon name="arrow-up" size={10} />{/if}
			{#if deltaTone === 'down'}<Icon name="arrow-down" size={10} />{/if}
			{delta}
		</div>
	{/if}
</div>
