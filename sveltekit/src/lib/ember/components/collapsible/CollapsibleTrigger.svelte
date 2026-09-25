<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:collapsible');

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: cls = '', children, ...rest }: Props = $props();
</script>

<button
	type="button"
	class="card-header flex items-center justify-between {cls}"
	style="width:100%;cursor:pointer;gap:.5rem;"
	aria-expanded={ctx.open}
	onclick={() => ctx.setOpen(!ctx.open)}
	{...rest}
>
	{@render children?.()}
</button>
