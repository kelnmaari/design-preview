<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ open: boolean; cancelHide: () => void; hide: () => void }>(
		'ember:hover-card'
	);

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
</script>

{#if ctx.open}
	<div
		class="card card-body {cls}"
		style="position:absolute;bottom:calc(100% + 10px);left:0;z-index:var(--z-dropdown);min-width:280px;box-shadow:var(--shadow-lg);"
		onmouseenter={() => ctx.cancelHide()}
		onmouseleave={() => ctx.hide()}
	>
		{@render children?.()}
	</div>
{/if}
