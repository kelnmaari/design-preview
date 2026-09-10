<script lang="ts">
	export interface DonutSegment {
		label: string;
		value: number;
		color: string;
	}

	interface Props {
		segments: DonutSegment[];
		size?: number;
		thickness?: number;
		centerValue?: string;
		centerLabel?: string;
	}

	let { segments, size = 148, thickness = 16, centerValue, centerLabel }: Props = $props();

	const total = $derived(segments.reduce((s, x) => s + x.value, 0));
	const r = $derived((size - thickness) / 2);
	const c = $derived(2 * Math.PI * r);

	const arcs = $derived.by(() => {
		let acc = 0;
		return segments.map((s) => {
			const frac = total ? s.value / total : 0;
			const arc = { ...s, len: frac * c, off: acc * c };
			acc += frac;
			return arc;
		});
	});
</script>

<div class="flex items-center gap-4">
	<svg width={size} height={size} viewBox="0 0 {size} {size}" role="img" aria-label="Donut chart">
		<circle
			cx={size / 2}
			cy={size / 2}
			{r}
			fill="none"
			stroke="var(--color-muted)"
			stroke-width={thickness}
		/>
		{#each arcs as a (a.label)}
			<circle
				cx={size / 2}
				cy={size / 2}
				{r}
				fill="none"
				stroke={a.color}
				stroke-width={thickness}
				stroke-dasharray="{a.len} {c - a.len}"
				stroke-dashoffset={-a.off}
				stroke-linecap="butt"
				transform="rotate(-90 {size / 2} {size / 2})"
			>
				<title>{a.label}: {a.value}%</title>
			</circle>
		{/each}
		{#if centerValue}
			<text
				x={size / 2}
				y={size / 2 - (centerLabel ? 2 : -7)}
				text-anchor="middle"
				fill="var(--color-foreground)"
				font-size="22"
				font-weight="600"
				font-family="var(--font-mono)"
			>
				{centerValue}
			</text>
		{/if}
		{#if centerLabel}
			<text
				x={size / 2}
				y={size / 2 + 18}
				text-anchor="middle"
				fill="var(--color-subtle)"
				font-size="10"
			>
				{centerLabel}
			</text>
		{/if}
	</svg>
	<div class="stack-tight">
		{#each segments as s (s.label)}
			<div class="flex items-center gap-2 text-xs">
				<span style="width:8px;height:8px;border-radius:50%;background:{s.color};flex:none;"></span>
				<span class="text-muted-foreground">{s.label}</span>
				<span class="font-mono" style="margin-left:auto;">{s.value}%</span>
			</div>
		{/each}
	</div>
</div>
