<script lang="ts">
	import { getContext } from 'svelte';

	const ctx = getContext<{ startDrag: (e: PointerEvent, index: number) => void; vertical: boolean }>(
		'ember:splitter'
	);

	interface Props {
		/** индекс ЛЕВОЙ (верхней) панели пары */
		index: number;
	}

	let { index }: Props = $props();
</script>

<div
	class="kit-splitter-handle"
	role="separator"
	aria-orientation={ctx.vertical ? 'horizontal' : 'vertical'}
	onpointerdown={(e) => ctx.startDrag(e, index)}
></div>

<style>
	.kit-splitter-handle {
		flex: none;
		background: var(--color-border);
		transition: background-color 0.15s ease;
	}
	.kit-splitter-handle:hover {
		background: var(--color-primary);
	}
</style>
