<script lang="ts">
	export interface RadioOption {
		value: string;
		label: string;
		hint?: string;
		disabled?: boolean;
	}

	interface Props {
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		value?: string;
		options: RadioOption[];
		name: string;
		orientation?: 'vertical' | 'horizontal';
		disabled?: boolean;
		onchange?: (value: string) => void;
	}

	let {
		label,
		hint,
		error,
		required = false,
		value = $bindable(''),
		options,
		name,
		orientation = 'vertical',
		disabled = false,
		onchange
	}: Props = $props();
</script>

<div role="radiogroup" aria-label={label} aria-invalid={!!error}>
	{#if label}<div class="field-label" class:field-label-required={required}>{label}</div>{/if}
	<div class="ember-radio-group" class:horizontal={orientation === 'horizontal'}>
		{#each options as o (o.value)}
			<label class="ember-radio" class:disabled={disabled || o.disabled}>
				<input
					type="radio"
					class="radio"
					{name}
					value={o.value}
					disabled={disabled || o.disabled}
					bind:group={value}
					onchange={() => onchange?.(value)}
				/>
				<span>
					<span class="ember-radio-label">{o.label}</span>
					{#if o.hint}<span class="ember-radio-hint">{o.hint}</span>{/if}
				</span>
			</label>
		{/each}
	</div>
	{#if error}
		<div class="field-error" role="alert">{error}</div>
	{:else if hint}
		<div class="field-hint">{hint}</div>
	{/if}
</div>

<style>
	.ember-radio-group { display: flex; flex-direction: column; gap: 0.45rem; }
	.ember-radio-group.horizontal { flex-direction: row; flex-wrap: wrap; gap: 0.45rem 1.25rem; }
	.ember-radio { display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer; width: fit-content; }
	.ember-radio.disabled { opacity: 0.55; cursor: not-allowed; }
	.ember-radio .radio { margin-top: 1px; }
	.ember-radio-label { font-size: 13px; color: var(--color-foreground); line-height: 1.45; display: block; }
	.ember-radio-hint { font-size: 11px; color: var(--color-subtle); display: block; margin-top: 1px; }
</style>
