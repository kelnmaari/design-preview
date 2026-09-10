<script lang="ts">
	import type { Snippet } from 'svelte';
	import Field from './Field.svelte';

	interface Props {
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		value?: string;
		type?: string;
		placeholder?: string;
		mono?: boolean;
		left?: string | Snippet;
		right?: string | Snippet;
		id?: string;
		name?: string;
		disabled?: boolean;
		onchange?: (value: string) => void;
		onenter?: (value: string) => void;
	}

	let {
		label,
		hint,
		error,
		required = false,
		value = $bindable(''),
		type = 'text',
		placeholder,
		mono = false,
		left,
		right,
		id,
		name,
		disabled = false,
		onchange,
		onenter
	}: Props = $props();
</script>

<Field {id} {label} {hint} {error} {required}>
	<div class="ember-input-group" class:input-error={!!error}>
		{#if left !== undefined}
			<span class="ember-addon left">
				{#if typeof left === 'string'}{left}{:else}{@render left()}{/if}
			</span>
		{/if}
		<input
			{id}
			{name}
			class="ember-group-input"
			class:input-mono={mono}
			{type}
			{placeholder}
			{disabled}
			aria-invalid={!!error}
			bind:value
			onchange={() => onchange?.(value)}
			onkeydown={(e) => {
				if (e.key === 'Enter') onenter?.(value);
			}}
		/>
		{#if right !== undefined}
			<span class="ember-addon right">
				{#if typeof right === 'string'}{right}{:else}{@render right()}{/if}
			</span>
		{/if}
	</div>
</Field>

<style>
	.ember-input-group {
		display: flex;
		align-items: stretch;
		background: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		transition: border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease;
	}
	.ember-input-group:focus-within {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgb(var(--tw-primary) / 0.15);
	}
	.ember-input-group.input-error { border-color: var(--color-destructive); }
	.ember-input-group.input-error:focus-within {
		border-color: var(--color-destructive);
		box-shadow: 0 0 0 3px rgb(var(--tw-destructive) / 0.15);
	}
	.ember-addon {
		display: inline-flex;
		align-items: center;
		padding: 0 0.65rem;
		font-size: 12.5px;
		color: var(--color-subtle);
		background: var(--color-muted);
		white-space: nowrap;
		flex: none;
	}
	.ember-addon.left { border-right: 1px solid var(--color-border); }
	.ember-addon.right { border-left: 1px solid var(--color-border); }
	.ember-group-input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: none;
		outline: none;
		padding: 0 0.65rem;
		height: 32px;
		font-size: 13px;
		color: var(--color-foreground);
	}
	.ember-group-input::placeholder { color: var(--color-subtle); }
	.ember-group-input:disabled { opacity: 0.55; cursor: not-allowed; }
</style>
