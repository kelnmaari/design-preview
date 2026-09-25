<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{
		query: string;
		setVisible: (n: number) => void;
		visible: number;
	}>('ember:command');

	interface Props {
		value: string;
		keywords?: string;
		onselect?: () => void;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { value, keywords = '', onselect, children, ...rest }: Props = $props();

	const q = $derived(ctx.query.trim().toLowerCase());
	const hay = $derived((value + ' ' + keywords).toLowerCase());
	const matches = $derived(!q || hay.includes(q));

	let reported = $state(false);
	$effect(() => {
		if (matches && !reported) {
			reported = true;
			ctx.setVisible(ctx.visible + 1);
		} else if (!matches && reported) {
			reported = false;
			ctx.setVisible(Math.max(0, ctx.visible - 1));
		}
	});
</script>

{#if matches}
	<button
		type="button"
		role="option"
		class="cmdk-item"
		onclick={() => onselect?.()}
		{...rest}
	>
		{@render children?.()}
	</button>
{/if}
