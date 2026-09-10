<script lang="ts">
	import type { Snippet } from 'svelte';
	import '$lib/ember/ember.css';
	import '$lib/ember/tailwind.css';
	import { CommandPalette, Shell, Toasts } from '$lib/ember/index.js';

	let { children }: { children: Snippet } = $props();
	let paletteOpen = $state(false);
</script>

<svelte:head>
	<title>Ember · SvelteKit Example</title>
</svelte:head>

<Shell onPalette={() => (paletteOpen = true)}>
	{@render children()}
</Shell>
<CommandPalette bind:open={paletteOpen} />
<Toasts />
