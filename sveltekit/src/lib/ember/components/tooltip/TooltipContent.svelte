<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{ open: boolean; position: 'top' | 'bottom' }>('ember:tooltip');

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
</script>

{#if ctx.open}
	<span
		class="ember-tip {cls}"
		data-pos={ctx.position}
		style="visibility:visible;opacity:1;position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);{ctx.position === 'bottom' ? 'bottom:auto;top:calc(100% + 8px);' : ''}"
	>
		{@render children?.()}
	</span>
{/if}
