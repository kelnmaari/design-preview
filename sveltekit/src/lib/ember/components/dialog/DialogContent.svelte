<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { trapTab } from '../internal/utils.js';

	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:dialog');

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
	let panel: HTMLElement | undefined = $state();
	let restore: HTMLElement | null = null;

	$effect(() => {
		if (ctx.open) {
			restore = document.activeElement as HTMLElement;
			queueMicrotask(() => panel?.focus());
			return () => restore?.focus?.();
		}
	});
</script>

<svelte:window onkeydown={(e) => {
	if (!ctx.open) return;
	if (e.key === 'Escape') ctx.setOpen(false);
	if (panel) trapTab(e, panel);
}} />

{#if ctx.open}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions, a11y_no_static_element_interactions -->
	<div class="dialog-overlay" onclick={() => ctx.setOpen(false)}>
		<div
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			class="dialog card {cls}"
			bind:this={panel}
			onclick={(e) => e.stopPropagation()}
		>
			{@render children?.()}
		</div>
	</div>
{/if}
