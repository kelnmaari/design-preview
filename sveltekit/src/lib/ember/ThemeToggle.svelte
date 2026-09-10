<script lang="ts">
	import Icon from './Icon.svelte';
	import { theme } from './theme.svelte.js';
</script>

<button class="icon-btn" onclick={() => theme.toggle()} aria-label="Toggle theme">
	{#if theme.value === 'light'}
		<Icon name="moon" size={15} />
	{:else}
		<Icon name="sun" size={15} />
	{/if}
</button>
