<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{
		show: () => void;
		hide: () => void;
	}>('ember:tooltip');

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
	onmouseenter={() => ctx.show()}
	onmouseleave={() => ctx.hide()}
	onfocus={() => ctx.show()}
	onblur={() => ctx.hide()}
	{...rest}
>
	{@render children?.()}
</button>
