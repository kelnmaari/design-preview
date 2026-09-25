<script lang="ts">
	import { getContext } from 'svelte';

	const ctx = getContext<{
		pcts: number[];
		down: (e: PointerEvent) => void;
		move: (e: PointerEvent) => void;
		setTrack: (el: HTMLDivElement) => void;
	}>('ember:slider');

	let track: HTMLDivElement | undefined = $state();
	$effect(() => {
		if (track) ctx.setTrack(track);
	});

	const from = $derived(Math.min(...ctx.pcts));
	const to = $derived(Math.max(...ctx.pcts));
</script>

<div
	class="kit-slider-track"
	bind:this={track}
	onpointerdown={ctx.down}
	onpointermove={ctx.move}
>
	<div class="kit-slider-range" style="left:{from}%;width:{to - from}%"></div>
	{#each ctx.pcts as p, i (i)}
		<span class="kit-slider-thumb" style="left:{p}%"></span>
	{/each}
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
