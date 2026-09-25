<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:alert-dialog');

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: cls = 'btn btn-destructive btn-sm', children, ...rest }: Props = $props();

	function act() {
		ctx.setOpen(false);
	}
</script>

<button type="button" class={cls} onclick={act} {...rest}>
	{@render children?.()}
</button>
