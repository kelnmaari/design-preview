<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** число — одиночный режим; [from, to] — range-режим */
		value?: number | [number, number];
		min?: number;
		max?: number;
		step?: number;
		children?: Snippet;
	}

	let { value = $bindable(0), min = 0, max = 100, step = 1, children }: Props = $props();
	let track: HTMLDivElement | undefined = $state();
	let active = $state(-1);

	const vals = $derived(Array.isArray(value) ? value : [value]);

	function raw(clientX: number) {
		if (!track) return min;
		const r = track.getBoundingClientRect();
		const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
		return Math.round((min + ratio * (max - min)) / step) * step;
	}
	function clamp(v: number) {
		return Math.min(max, Math.max(min, v));
	}
	function set(idx: number, v: number) {
		if (Array.isArray(value)) {
			const a = [vals[0] ?? min, vals[1] ?? max];
			a[idx] = clamp(v);
			value = [Math.min(a[0], a[1]), Math.max(a[0], a[1])];
		} else {
			value = clamp(v);
		}
	}
	function down(e: PointerEvent) {
		const v = raw(e.clientX);
		active = Array.isArray(value) ? (Math.abs(vals[0] - v) <= Math.abs(vals[1] - v) ? 0 : 1) : 0;
		try {
			(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		} catch {
			/* synthetic events have no active pointer */
		}
		set(active, v);
	}
	function move(e: PointerEvent) {
		if (e.buttons === 1 && active >= 0) set(active, raw(e.clientX));
	}

	const pcts = $derived(vals.map((v) => ((v - min) / (max - min)) * 100));

	setContext('ember:slider', {
		get pcts() {
			return pcts;
		},
		down,
		move,
		setTrack: (el: HTMLDivElement) => (track = el)
	});
</script>

<div style="width:100%;max-width:340px;">
	{@render children?.()}
</div>
