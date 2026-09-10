<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';

	interface Props {
		open?: boolean;
		title: string;
		description?: string;
		children?: Snippet;
		footer?: Snippet;
		onclose?: () => void;
	}

	let { open = $bindable(false), title, description, children, footer, onclose }: Props = $props();

	function close() {
		open = false;
		onclose?.();
	}

	$effect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	});
</script>

<div
	class="panel-overlay"
	class:open
	onclick={(e) => e.target === e.currentTarget && close()}
	role="presentation"
></div>
<aside class="slide-panel" class:open aria-label={title} aria-hidden={!open}>
	<div class="card-header flex items-center justify-between">
		<div>
			<div class="card-title">{title}</div>
			{#if description}<div class="card-description">{description}</div>{/if}
		</div>
		<button class="btn btn-ghost btn-icon btn-sm" onclick={close} aria-label="Close panel">
			<Icon name="xmark" size={14} />
		</button>
	</div>
	<div class="card-body" style="flex:1; overflow-y:auto;">
		{@render children?.()}
	</div>
	{#if footer}
		<div class="card-footer flex justify-between">
			{@render footer?.()}
		</div>
	{/if}
</aside>
