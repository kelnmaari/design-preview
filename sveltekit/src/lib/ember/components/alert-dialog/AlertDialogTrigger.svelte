<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:alert-dialog');

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: cls = '', children, ...rest }: Props = $props();
</script>

<button type="button" class={cls} onclick={() => ctx.setOpen(true)} {...rest}>
	{@render children?.()}
</button>
