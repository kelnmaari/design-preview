<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		kbd?: boolean;
		oninput?: (value: string) => void;
	}

	let { value = $bindable(''), placeholder = 'Search…', kbd = false, oninput }: Props = $props();
</script>

<div class="search-field">
	<Icon name="magnifying-glass" size={14} class="text-muted-foreground" />
	<input {placeholder} bind:value oninput={() => oninput?.(value)} aria-label={placeholder} />
	{#if value}
		<button class="btn btn-ghost btn-icon" style="width:20px;height:20px;" onclick={() => { value = ''; oninput?.(''); }} aria-label="Clear search">
			<Icon name="xmark" size={11} />
		</button>
	{:else if kbd}
		<kbd>⌘K</kbd>
	{/if}
</div>
