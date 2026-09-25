<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label?: string;
		vertical?: boolean;
		class?: string;
	}

	let { label, vertical = false, class: cls = '' }: Props = $props();
</script>

{#if vertical}
	<div class="divider-vertical {cls}" style="align-self:stretch;"></div>
{:else if label}
	<div style="display:flex;align-items:center;gap:12px;">
		<span class="divider" style="flex:1;"></span>
		<span class="text-xs text-subtle">{label}</span>
		<span class="divider" style="flex:1;"></span>
	</div>
{:else}
	<hr class="divider {cls}" />
{/if}
