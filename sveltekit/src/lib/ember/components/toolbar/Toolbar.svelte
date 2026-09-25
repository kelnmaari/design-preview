<script lang="ts">
	import type { Snippet } from 'svelte';
	import { handleRovingKeys } from '../internal/utils.js';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
	let bar: HTMLElement | undefined = $state();
</script>

<div
	role="toolbar"
	class="card {cls}"
	style="display:inline-flex;align-items:center;gap:6px;padding:6px 8px;"
	bind:this={bar}
	onkeydown={(e) => bar && handleRovingKeys(e, bar)}
>
	{@render children?.()}
</div>
