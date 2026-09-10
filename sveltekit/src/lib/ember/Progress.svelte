<script lang="ts">
	interface Props {
		value: number;
		tone?: 'ember' | 'primary' | 'success';
		animate?: boolean;
	}

	let { value, tone = 'ember', animate = true }: Props = $props();

	let width = $state(0);
	$effect(() => {
		const target = value;
		if (!animate) {
			width = target;
			return;
		}
		width = 0;
		const t = setTimeout(() => (width = target), 120);
		return () => clearTimeout(t);
	});
</script>

<div class="progress">
	<div class="progress-bar {tone}" style="width:{width}%"></div>
</div>
