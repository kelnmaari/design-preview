<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		children?: Snippet;
	}

	let { open = $bindable(false), children }: Props = $props();
	let timer: ReturnType<typeof setTimeout> | undefined;

	setContext('ember:hover-card', {
		get open() {
			return open;
		},
		show() {
			clearTimeout(timer);
			timer = setTimeout(() => (open = true), 200);
		},
		hide() {
			clearTimeout(timer);
			timer = setTimeout(() => (open = false), 120);
		},
		cancelHide() {
			clearTimeout(timer);
		}
	});
</script>

<span style="position:relative;display:inline-flex;" onmouseleave={() => {}}>
	{@render children?.()}
</span>
