<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{
		toggle: (v: string) => void;
		isOn: (v: string) => boolean;
	}>('ember:toggle-group');

	interface Props {
		value: string;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { value, class: cls = 'btn btn-outline btn-sm', children, ...rest }: Props = $props();

	const on = $derived(ctx.isOn(value));
</script>

<button
	type="button"
	aria-pressed={on}
	class="{cls} kit-toggle-item"
	style="{on ? 'background:rgb(var(--tw-primary) / .14);border-color:rgb(var(--tw-primary) / .4);color:var(--color-primary);' : ''}"
	onclick={() => ctx.toggle(value)}
	{...rest}
>
	{@render children?.()}
</button>
