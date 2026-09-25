<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:dropdown-menu');

	interface Props {
		class?: string;
		danger?: boolean;
		children?: Snippet;
		onselect?: () => void;
		[key: string]: unknown;
	}

	let { class: cls = '', danger = false, children, onselect, ...rest }: Props = $props();
</script>

<button
	type="button"
	role="menuitem"
	class="menu-item {cls}"
	class:danger
	onclick={() => {
		ctx.setOpen(false);
		onselect?.();
	}}
	{...rest}
>
	{@render children?.()}
</button>
