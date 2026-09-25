<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		children?: Snippet;
	}

	let { open = $bindable(false), children }: Props = $props();

	setContext('ember:dialog', {
		get open() {
			return open;
		},
		setOpen: (v: boolean) => (open = v)
	});
</script>

{@render children?.()}
