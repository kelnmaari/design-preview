<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id?: string;
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		children: Snippet;
	}

	let { id, label, hint, error, required = false, children }: Props = $props();
</script>

<div>
	{#if label}
		<label class="field-label" class:field-label-required={required} for={id}>{label}</label>
	{/if}
	{@render children()}
	{#if error}
		<div class="field-error" role="alert">{error}</div>
	{:else if hint}
		<div class="field-hint">{hint}</div>
	{/if}
</div>
