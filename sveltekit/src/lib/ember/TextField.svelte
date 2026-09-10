<script lang="ts">
	interface Props {
		label?: string;
		hint?: string;
		value?: string;
		placeholder?: string;
		mono?: boolean;
		multiline?: boolean;
		rows?: number;
		type?: string;
		id?: string;
		readonly?: boolean;
	}

	let {
		label,
		hint,
		value = $bindable(''),
		placeholder,
		mono = false,
		multiline = false,
		rows = 3,
		type = 'text',
		id,
		readonly = false
	}: Props = $props();
</script>

<div>
	{#if label}<label class="field-label" for={id}>{label}</label>{/if}
	{#if multiline}
		<textarea {id} class="textarea" class:input-mono={mono} {placeholder} {rows} {readonly} bind:value></textarea>
	{:else}
		<input {id} class="input" class:input-mono={mono} {type} {placeholder} {readonly} bind:value />
	{/if}
	{#if hint}<div class="field-hint">{hint}</div>{/if}
</div>
