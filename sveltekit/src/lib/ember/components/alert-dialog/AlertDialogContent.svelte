<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { trapTab } from '../internal/utils.js';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:alert-dialog');

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
	let panel: HTMLElement | undefined = $state();

	$effect(() => {
		if (ctx.open) queueMicrotask(() => panel?.focus());
	});
</script>

<svelte:window onkeydown={(e) => {
	if (!ctx.open) return;
	if (e.key === 'Escape') ctx.setOpen(false);
	if (panel) trapTab(e, panel);
}} />

{#if ctx.open}
	<!-- overlay click intentionally does NOT close (alert pattern) -->
	<div class="dialog-overlay">
		<div
			role="alertdialog"
			aria-modal="true"
			tabindex="-1"
			class="dialog card {cls}"
			bind:this={panel}
		>
			{@render children?.()}
		</div>
	</div>
{/if}
