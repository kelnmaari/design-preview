<script lang="ts">
	interface Props {
		width?: string;
		height?: string;
		radius?: string;
		count?: number;
		gap?: string;
		class?: string;
	}

	let {
		width = '100%',
		height = '14px',
		radius,
		count = 1,
		gap = '0.5rem',
		class: cls = ''
	}: Props = $props();
</script>

<div class="ember-skeleton-stack {cls}" style="gap: {gap}" aria-hidden="true">
	{#each Array.from({ length: count }, (_, i) => i) as i (i)}
		<div
			class="skeleton"
			style="width: {width}; height: {height}; {radius
				? `border-radius: ${radius};`
				: ''}"
		></div>
	{/each}
</div>

<style>
	.ember-skeleton-stack { display: flex; flex-direction: column; }
</style>
