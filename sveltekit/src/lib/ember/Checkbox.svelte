<script lang="ts">
	interface Props {
		checked?: boolean;
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		indeterminate?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
		onchange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(false),
		label,
		hint,
		error,
		required = false,
		indeterminate = false,
		disabled = false,
		id,
		name,
		onchange
	}: Props = $props();

	let box: HTMLInputElement | null = $state(null);

	$effect(() => {
		if (box) box.indeterminate = indeterminate && !checked;
	});
</script>

<div>
	<label class="ember-check" class:disabled for={id}>
		<input
			type="checkbox"
			class="checkbox"
			{id}
			{name}
			{disabled}
			bind:this={box}
			bind:checked
			onchange={() => onchange?.(checked)}
		/>
		{#if label}<span class="ember-check-label">{label}{#if required}<span class="ember-req" aria-hidden="true"> *</span>{/if}</span>{/if}
	</label>
	{#if error}
		<div class="field-error" role="alert">{error}</div>
	{:else if hint}
		<div class="field-hint">{hint}</div>
	{/if}
</div>

<style>
	.ember-check { display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer; width: fit-content; }
	.ember-check.disabled { opacity: 0.55; cursor: not-allowed; }
	.ember-check .checkbox { margin-top: 1px; }
	.ember-check-label { font-size: 13px; color: var(--color-foreground); line-height: 1.45; }
	.ember-req { color: var(--color-destructive); }
</style>
