<script lang="ts">
	interface Props {
		points: string;
		width?: number;
		height?: number;
		class?: string;
	}

	let { points, width = 120, height = 36, class: cls = '' }: Props = $props();

	const area = $derived(`${points} L${width} ${height} L0 ${height} Z`);
</script>

<svg
	class="spark animate {cls}"
	{width}
	{height}
	viewBox="0 0 {width} {height}"
	preserveAspectRatio="none"
	aria-hidden="true"
>
	<path class="area" d={area} />
	<path class="line" pathLength="1" d={points} />
</svg>
