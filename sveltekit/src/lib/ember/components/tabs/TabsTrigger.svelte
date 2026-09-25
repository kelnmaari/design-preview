<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ value: string; setValue: (v: string) => void }>('ember:tabs');

	interface Props {
		value: string;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { value, class: cls = '', children, ...rest }: Props = $props();

	const active = $derived(ctx.value === value);
</script>

<button
	type="button"
	role="tab"
	class="tab {cls}"
	class:active
	aria-selected={active}
	tabindex={active ? 0 : -1}
	onclick={() => ctx.setValue(value)}
	{...rest}
>
	{@render children?.()}
</button>
