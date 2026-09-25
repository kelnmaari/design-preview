<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{
		value: string;
		setValue: (v: string) => void;
		register: (v: string, label: string) => void;
	}>('ember:select');

	interface Props {
		value: string;
		label?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { value, label, children, ...rest }: Props = $props();

	const selected = $derived(ctx.value === value);

	$effect(() => {
		ctx.register(value, label ?? '');
	});
</script>

<button
	type="button"
	role="option"
	aria-selected={selected}
	class="menu-item kit-select-item {selected ? 'active' : ''}"
	onclick={() => ctx.setValue(value)}
	{...rest}
>
	{@render children?.()}
	{#if selected}<i data-icon="check" data-size="12" style="margin-left:auto;color:var(--color-primary)"></i>{/if}
</button>

<style>
	.kit-select-item.active {
		background: rgb(var(--tw-primary) / 0.1);
		color: var(--color-primary);
	}
</style>
