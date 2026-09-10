<script lang="ts">
	interface Props {
		/** Unique id — prefixes the SVG gradient defs (required, SSR-safe). */
		id: string;
		/** Raw values; normalized against min/max. */
		data: number[];
		/** Fixed scale (falls back to data min/max with padding). */
		min?: number;
		max?: number;
		height?: number;
		/** Formats the headline value. */
		format?: (v: number) => string;
		label?: string;
	}

	let { id, data, min, max, height = 180, format = (v) => v.toFixed(0), label }: Props = $props();

	const W = 600;
	const H = 180;
	const PAD = 8;

	const lo = $derived(min ?? Math.min(...data) * 0.9);
	const hi = $derived(max ?? Math.max(...data) * 1.1);
	const span = $derived(Math.max(hi - lo, 1e-6));

	const xy = $derived(
		data.map((v, i) => {
			const x = PAD + (i / Math.max(data.length - 1, 1)) * (W - PAD * 2);
			const y = PAD + (1 - (v - lo) / span) * (H - PAD * 2);
			return [x, y] as const;
		})
	);
	const line = $derived(xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '));
	const area = $derived(`${line} L${(W - PAD).toFixed(1)} ${H - PAD} L${PAD} ${H - PAD} Z`);
	const last = $derived(xy[xy.length - 1] ?? [0, 0]);
	const current = $derived(data[data.length - 1] ?? 0);
</script>

<div>
	{#if label}
		<div class="flex items-baseline justify-between mb-2">
			<span class="text-sm font-medium">{label}</span>
			<span class="font-mono text-sm font-semibold text-gradient-ember">{format(current)}</span>
		</div>
	{/if}
	<svg
		viewBox="0 0 {W} {H}"
		{height}
		style="width:100%;display:block;"
		preserveAspectRatio="none"
		role="img"
		aria-label={label ?? 'Line chart'}
	>
		<defs>
			<linearGradient id="{id}-line" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0" stop-color="#F59E0B" />
				<stop offset="1" stop-color="#F43F5E" />
			</linearGradient>
			<linearGradient id="{id}-area" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0" stop-color="#F43F5E" stop-opacity="0.28" />
				<stop offset="1" stop-color="#F43F5E" stop-opacity="0" />
			</linearGradient>
		</defs>
		{#each [0.25, 0.5, 0.75] as f (f)}
			<line
				x1={PAD}
				x2={W - PAD}
				y1={PAD + f * (H - PAD * 2)}
				y2={PAD + f * (H - PAD * 2)}
				stroke="var(--color-border)"
				stroke-width="1"
				vector-effect="non-scaling-stroke"
				stroke-dasharray="3 4"
				opacity="0.7"
			/>
		{/each}
		<path d={area} fill="url(#{id}-area)" />
		<path
			d={line}
			fill="none"
			stroke="url(#{id}-line)"
			stroke-width="2"
			vector-effect="non-scaling-stroke"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<circle cx={last[0]} cy={last[1]} r="4" fill="#F43F5E" stroke="var(--color-card)" stroke-width="2" />
		<circle cx={last[0]} cy={last[1]} r="8" fill="#F43F5E" opacity="0.25" />
	</svg>
</div>
