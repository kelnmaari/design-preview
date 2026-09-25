<script lang="ts">
	import type { Snippet } from 'svelte';
	import { handleRovingKeys } from '../internal/utils.js';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
	let list: HTMLElement | undefined = $state();
</script>

<div
	class="tabs {cls}"
	role="tablist"
	bind:this={list}
	onkeydown={(e) => list && handleRovingKeys(e, list)}
>
	{@render children?.()}
</div>
