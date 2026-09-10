<script lang="ts">
	interface Props {
		label?: string;
		hint?: string;
		error?: string;
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		showValue?: boolean;
		format?: (v: number) => string;
		disabled?: boolean;
		id?: string;
		name?: string;
		onchange?: (value: number) => void;
	}

	let {
		label,
		hint,
		error,
		value = $bindable(50),
		min = 0,
		max = 100,
		step = 1,
		showValue = true,
		format = (v: number) => String(v),
		disabled = false,
		id,
		name,
		onchange
	}: Props = $props();

	const pct = $derived(((value - min) / Math.max(1, max - min)) * 100);
</script>

<div>
	{#if label || showValue}
		<div class="ember-slider-head">
			{#if label}<label class="field-label" for={id}>{label}</label>{/if}
			{#if showValue}<span class="ember-slider-value">{format(value)}</span>{/if}
		</div>
	{/if}
	<input
		type="range"
		class="ember-slider"
		{id}
		{name}
		{min}
		{max}
		{step}
		{disabled}
		style="--fill: {pct}%"
		aria-invalid={!!error}
		bind:value
		onchange={() => onchange?.(value)}
	/>
	{#if error}
		<div class="field-error" role="alert">{error}</div>
	{:else if hint}
		<div class="field-hint">{hint}</div>
	{/if}
</div>

<style>
	.ember-slider-head { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
	.ember-slider-head .field-label { margin-bottom: 0; }
	.ember-slider-value {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--color-muted-foreground);
		font-variant-numeric: tabular-nums;
	}
	.ember-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 22px;
		background: transparent;
		cursor: pointer;
		margin: 0.15rem 0 0;
	}
	.ember-slider:disabled { opacity: 0.5; cursor: not-allowed; }
	.ember-slider::-webkit-slider-runnable-track {
		height: 4px;
		border-radius: 999px;
		background: linear-gradient(
			to right,
			var(--color-primary) 0%,
			var(--color-primary) var(--fill),
			var(--color-border) var(--fill),
			var(--color-border) 100%
		);
	}
	.ember-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: #fff;
		border: 4px solid var(--color-primary);
		margin-top: -5px;
		box-shadow: var(--shadow-sm);
	}
	.ember-slider::-moz-range-track { height: 4px; border-radius: 999px; background: var(--color-border); }
	.ember-slider::-moz-range-progress { height: 4px; border-radius: 999px; background: var(--color-primary); }
	.ember-slider::-moz-range-thumb {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #fff;
		border: 4px solid var(--color-primary);
		box-shadow: var(--shadow-sm);
	}
</style>
