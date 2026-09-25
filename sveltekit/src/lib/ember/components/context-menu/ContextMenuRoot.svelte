<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
	let open = $state(false);
	let x = $state(0);
	let y = $state(0);

	setContext('ember:context-menu', {
		get open() {
			return open;
		},
		get x() {
			return x;
		},
		get y() {
			return y;
		},
		setOpen: (v: boolean) => (open = v),
		openAt: (px: number, py: number) => {
			x = px;
			y = py;
			open = true;
		}
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_no_static_element_interactions -->
<div
	oncontextmenu={(e) => {
		e.preventDefault();
		x = e.clientX;
		y = e.clientY;
		open = true;
	}}
>
	{@render children?.()}
</div>
