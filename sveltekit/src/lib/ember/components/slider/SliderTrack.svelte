<script lang="ts">
	import { getContext } from 'svelte';

	const ctx = getContext<{
		pct: number;
		down: (e: PointerEvent) => void;
		move: (e: PointerEvent) => void;
		setTrack: (el: HTMLDivElement) => void;
	}>('ember:slider');

	let track: HTMLDivElement | undefined = $state();
	$effect(() => {
		if (track) ctx.setTrack(track);
	});
</script>

<div
	class="kit-slider-track"
	bind:this={track}
	onpointerdown={ctx.down}
	onpointermove={ctx.move}
>
	<div class="kit-slider-range" style="width:{ctx.pct}%"></div>
	<span class="kit-slider-thumb" style="left:{ctx.pct}%"></span>
</div>

<style>
	.kit-slider-track {
		position: relative;
		height: 6px;
		border-radius: 9999px;
		background: var(--color-muted);
		cursor: pointer;
		touch-action: none;
	}
	.kit-slider-range {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		border-radius: 9999px;
		background-image: linear-gradient(135deg, #f59e0b, #f43f5e);
	}
	.kit-slider-thumb {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #fff;
		border: 2px solid var(--color-primary);
		box-shadow: var(--shadow-sm);
	}
</style>
