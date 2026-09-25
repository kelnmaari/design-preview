<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		delay?: number;
		position?: 'top' | 'bottom';
		children?: Snippet;
	}

	let { delay = 250, position = 'top', children }: Props = $props();
	let open = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	setContext('ember:tooltip', {
		get open() {
			return open;
		},
		get position() {
			return position;
		},
		show() {
			clearTimeout(timer);
			timer = setTimeout(() => (open = true), delay);
		},
		hide() {
			clearTimeout(timer);
			open = false;
		}
	});
</script>

<span class="ember-tooltip-root" style="position:relative;display:inline-flex;">
	{@render children?.()}
</span>
