<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		height?: string;
		class?: string;
		children?: Snippet;
	}

	let { height = '240px', class: cls = '', children }: Props = $props();
</script>

<div
	class="scroll-area {cls}"
	style="height:{height};overflow-y:auto;overscroll-behavior:contain;"
>
	{@render children?.()}
</div>

<style>
	.scroll-area {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-card);
		padding: 0.75rem 1rem;
	}
	.scroll-area::-webkit-scrollbar {
		width: 8px;
	}
	.scroll-area::-webkit-scrollbar-thumb {
		background: var(--color-border-strong);
		border-radius: 9999px;
	}
	.scroll-area::-webkit-scrollbar-track {
		background: transparent;
	}
</style>
