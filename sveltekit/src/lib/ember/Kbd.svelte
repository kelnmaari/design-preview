<script lang="ts">
	interface Props {
		keys: string | string[];
		class?: string;
	}

	let { keys, class: cls = '' }: Props = $props();
	const list = $derived(Array.isArray(keys) ? keys : [keys]);
</script>

<span class="ember-kbd {cls}">
	{#each list as k, i (k + i)}
		{#if i > 0}<span class="ember-kbd-plus" aria-hidden="true">+</span>{/if}
		<kbd>{k}</kbd>
	{/each}
</span>

<style>
	.ember-kbd { display: inline-flex; align-items: center; gap: 0.25rem; }
	.ember-kbd-plus { font-size: 10px; color: var(--color-subtle); }
</style>
