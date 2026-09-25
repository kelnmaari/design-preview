<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		children?: Snippet;
	}

	let { value = $bindable(0), min = 0, max = 100, step = 1, children }: Props = $props();
	let track: HTMLDivElement | undefined = $state();

	function posToValue(clientX: number) {
		if (!track) return value;
		const r = track.getBoundingClientRect();
		const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
		return Math.round((min + ratio * (max - min)) / step) * step;
	}
	function down(e: PointerEvent) {
		try {
			(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		} catch {
			/* synthetic events have no active pointer */
		}
		value = posToValue(e.clientX);
	}
	function move(e: PointerEvent) {
		if (e.buttons === 1) value = posToValue(e.clientX);
	}

	const pct = $derived(((value - min) / (max - min)) * 100);

	setContext('ember:slider', {
		get pct() {
			return pct;
		},
		down,
		move,
		setTrack: (el: HTMLDivElement) => (track = el)
	});
</script>

<div style="width:100%;max-width:340px;">
	{@render children?.()}
</div>
