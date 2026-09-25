<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { clickOutside } from '../internal/utils.js';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:popover');

	interface Props {
		class?: string;
		align?: 'left' | 'right';
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: cls = '', align = 'left', children, ...rest }: Props = $props();
</script>

<svelte:window onkeydown={(e) => ctx.open && e.key === 'Escape' && ctx.setOpen(false)} />

{#if ctx.open}
	<div
		class="card card-body {cls}"
		style="visibility:visible;position:absolute;top:calc(100% + 8px);{align === 'left' ? 'left:0' : 'right:0'};z-index:var(--z-dropdown);min-width:240px;box-shadow:var(--shadow-lg);" {...rest}
		use:clickOutside={() => ctx.setOpen(false)}
	>
		{@render children?.()}
	</div>
{/if}
