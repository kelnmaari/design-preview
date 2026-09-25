<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { handleRovingKeys } from '../internal/utils.js';

	const ctx = getContext<{ visible: number }>('ember:command');

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
	let list: HTMLElement | undefined = $state();
</script>

<div
	class="cmdk-list {cls}"
	role="listbox"
	bind:this={list}
	onkeydown={(e) => list && handleRovingKeys(e, list)}
>
	{@render children?.()}
	{#if ctx.visible === 0}
		<p class="text-sm text-muted-foreground" style="padding:14px 10px;">No results found.</p>
	{/if}
</div>
