<script lang="ts">
	interface Props {
		days?: number;
	}

	let { days = 30 }: Props = $props();

	interface Bar {
		h: number;
		hot: boolean;
		delay: number;
		tip: string;
	}

	// Deterministic seeded heights so SSR and client render identically.
	const bars = $derived.by<Bar[]>(() => {
		let seed = days * 7919 + 13;
		const rnd = () => {
			seed = (seed * 1103515245 + 12345) & 0x7fffffff;
			return seed / 0x7fffffff;
		};
		return Array.from({ length: days }, (_, i) => {
			const wave = Math.sin((i / days) * Math.PI * 2.2) * 12;
			const h = Math.max(14, Math.min(100, Math.round(52 + wave + rnd() * 40)));
			return {
				h,
				hot: h >= 92,
				delay: Math.min(i * (days > 30 ? 8 : 26), 900),
				tip: `${(h * 1.9).toFixed(1)}k tok`
			};
		});
	});

	// Retrigger the grow animation when the range changes.
	let animKey = $state(0);
	$effect(() => {
		void days;
		animKey++;
	});
</script>

{#key animKey}
	<div class="bars animate">
		{#each bars as bar (bar.delay)}
			<div
				class="bar"
				style="height:{bar.h}%;opacity:{bar.hot ? 1 : bar.h > 70 ? 0.75 : 0.55};{bar.hot
					? 'box-shadow:0 0 12px rgb(244 63 94 / .5);'
					: ''}animation-delay:{bar.delay}ms"
			>
				<span class="bar-tip">{bar.tip}</span>
			</div>
		{/each}
	</div>
{/key}
