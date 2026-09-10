<script lang="ts">
	import Field from './Field.svelte';
	import Icon from './Icon.svelte';

	export interface SelectOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		value?: string;
		options: SelectOption[];
		placeholder?: string;
		id?: string;
		name?: string;
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
		placeholder,
		id,
		name,
		disabled = false,
		onchange
	}: Props = $props();
</script>

<Field {id} {label} {hint} {error} {required}>
	<div class="ember-select">
		<select
			{id}
			{name}
			class="select"
			class:input-error={!!error}
			{disabled}
			aria-invalid={!!error}
			bind:value
			onchange={() => onchange?.(value)}
		>
			{#if placeholder}<option value="" disabled>{placeholder}</option>{/if}
			{#each options as o (o.value)}
				<option value={o.value} disabled={o.disabled}>{o.label}</option>
			{/each}
		</select>
		<Icon name="chevron-down" size={13} class="ember-select-chevron" />
	</div>
</Field>

<style>
	.ember-select { position: relative; }
	.ember-select .select {
		appearance: none;
		-webkit-appearance: none;
		width: 100%;
		padding-right: 2rem;
		cursor: pointer;
	}
	.ember-select .select:disabled { opacity: 0.55; cursor: not-allowed; }
	.ember-select :global(.ember-select-chevron) {
		position: absolute;
		right: 0.65rem;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: var(--color-subtle);
	}
</style>
