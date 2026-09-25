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

<nav
	class="navmenu {cls}"
	bind:this={bar}
	onkeydown={(e) => bar && handleRovingKeys(e, bar)}
>
	<ul style="display:flex;align-items:center;gap:2px;list-style:none;margin:0;padding:0;">
		{@render children?.()}
	</ul>
</nav>

<style>
	.navmenu {
		display: inline-flex;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 4px 6px;
	}
</style>
