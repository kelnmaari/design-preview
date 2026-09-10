<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'ember' | 'secondary' | 'outline' | 'ghost' | 'destructive';
	type Size = 'sm' | 'md' | 'lg';

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		iconOnly?: boolean;
		href?: HTMLAnchorAttributes['href'];
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		iconOnly = false,
		href,
		children,
		class: cls = '',
		...rest
	}: Props = $props();

	const clsx = $derived(
		['btn', `btn-${variant}`, size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '', iconOnly ? 'btn-icon' : '', cls]
			.filter(Boolean)
			.join(' ')
	);
</script>

{#if href}
	<a {href} class={clsx}>
		{@render children?.()}
	</a>
{:else}
	<button class={clsx} {...rest}>
		{@render children?.()}
	</button>
{/if}
