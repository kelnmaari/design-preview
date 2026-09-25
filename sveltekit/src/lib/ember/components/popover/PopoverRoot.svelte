<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		children?: Snippet;
	}

	let { open = $bindable(false), children }: Props = $props();

	setContext('ember:popover', {
		get open() {
			return open;
		},
		setOpen: (v: boolean) => (open = v)
	});
</script>

<div class="dropdown" style="position:relative">
	{@render children?.()}
</div>
