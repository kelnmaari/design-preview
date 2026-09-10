<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		value?: number;
		max?: number;
		readonly?: boolean;
		size?: number;
		label?: string;
		onchange?: (value: number) => void;
	}

	let {
		value = $bindable(0),
		max = 5,
		readonly = false,
		size = 16,
		label = 'Rating',
		onchange
	}: Props = $props();

	let hover = $state(0);
	const shown = $derived(hover || value);

	function pick(n: number) {
		if (readonly) return;
		value = n;
		onchange?.(n);
	}
</script>

<div class="ember-rating" class:readonly role="group" aria-label={label}>
	{#each Array.from({ length: max }, (_, i) => i + 1) as n (n)}
		<button
			type="button"
			class="ember-star"
			class:active={n <= shown}
			aria-label="Rate {n} of {max} stars"
			disabled={readonly}
			onclick={() => pick(n)}
			onmouseenter={() => {
				if (!readonly) hover = n;
			}}
			onmouseleave={() => (hover = 0)}
			onfocus={() => {
				if (!readonly) hover = n;
			}}
			onblur={() => (hover = 0)}
		>
			<Icon name="star" size={size} />
		</button>
	{/each}
</div>

<style>
	.ember-rating { display: inline-flex; gap: 2px; }
	.ember-star {
		background: none;
		border: none;
		padding: 2px;
		cursor: pointer;
		color: var(--color-border-strong);
		line-height: 0;
		border-radius: var(--radius-sm);
	}
	.ember-star:hover { color: var(--color-amber); }
	.ember-star.active { color: var(--color-amber); }
	.ember-star.active :global(svg) { fill: currentColor; }
	.ember-star:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 1px; }
	.ember-rating.readonly .ember-star { cursor: default; }
</style>
