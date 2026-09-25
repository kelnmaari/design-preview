<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ show: () => void; hide: () => void; cancelHide: () => void }>(
		'ember:hover-card'
	);

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: cls = '', children, ...rest }: Props = $props();
</script>

<span
	onmouseenter={() => ctx.show()}
	onmouseleave={() => ctx.hide()}
	onfocus={() => ctx.show()}
	onblur={() => ctx.hide()}
	style="display:inline-flex;"
>
	<button type="button" class={cls} style="all:unset;cursor:pointer;display:inline-flex;" {...rest}>
		{@render children?.()}
	</button>
</span>
