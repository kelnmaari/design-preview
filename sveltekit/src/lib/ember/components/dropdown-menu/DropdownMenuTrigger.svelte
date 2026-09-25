<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:dropdown-menu');

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: cls = '', children, ...rest }: Props = $props();
</script>

<button
	type="button"
	class={cls}
	data-menu-btn
	onclick={() => ctx.setOpen(!ctx.open)}
	aria-haspopup="menu"
	aria-expanded={ctx.open}
	{...rest}
>
	{@render children?.()}
</button>
