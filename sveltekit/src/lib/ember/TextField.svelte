<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Field from './Field.svelte';

	interface Props {
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		value?: string;
		placeholder?: string;
		mono?: boolean;
		multiline?: boolean;
		rows?: number;
		type?: string;
		id?: string;
		name?: string;
		readonly?: boolean;
		disabled?: boolean;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		onchange?: (value: string) => void;
		onenter?: (value: string) => void;
	}

	let {
		label,
		hint,
		error,
		required = false,
		value = $bindable(''),
		placeholder,
		mono = false,
		multiline = false,
		rows = 3,
		type = 'text',
		id,
		name,
		readonly = false,
		disabled = false,
		autocomplete,
		onchange,
		onenter
	}: Props = $props();
</script>

<Field {id} {label} {hint} {error} {required}>
	{#if multiline}
		<textarea
			{id}
			{name}
			class="textarea"
			class:input-mono={mono}
			class:input-error={!!error}
			{placeholder}
			{rows}
			{readonly}
			{disabled}
			{autocomplete}
			aria-invalid={!!error}
			bind:value
			onchange={() => onchange?.(value)}
			onkeydown={(e) => {
				if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onenter?.(value);
			}}
		></textarea>
	{:else}
		<input
			{id}
			{name}
			class="input"
			class:input-mono={mono}
			class:input-error={!!error}
			{type}
			{placeholder}
			{readonly}
			{disabled}
			{autocomplete}
			aria-invalid={!!error}
			bind:value
			onchange={() => onchange?.(value)}
			onkeydown={(e) => {
				if (e.key === 'Enter') onenter?.(value);
			}}
		/>
	{/if}
</Field>
