<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ select: (v: string) => void; isOn: (v: string) => boolean }>(
		'ember:listbox'
	);

	interface Props {
		value: string;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { value, class: cls = '', children, ...rest }: Props = $props();

	const on = $derived(ctx.isOn(value));
</script>

<li
	role="option"
	aria-selected={on}
	class="kit-listbox-item {cls}"
	class:active={on}
	onclick={() => ctx.select(value)}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && ctx.select(value)}
	tabindex="0"
	{...rest}
>
	{@render children?.()}
</li>

<style>
	.kit-listbox-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 10px;
		border-radius: var(--radius-sm);
		font-size: 13px;
		color: var(--color-foreground);
		cursor: pointer;
	}
	.kit-listbox-item:hover {
		background: var(--color-accent);
	}
	.kit-listbox-item.active {
		background: rgb(var(--tw-primary) / 0.1);
		color: var(--color-primary);
	}
</style>
