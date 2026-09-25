<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const root = getContext<{ openIds: string[]; toggle: (id: string) => void }>('ember:accordion');
	const item = getContext<{ id: string; title: string; badge?: string }>('ember:accordion-item');

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: cls = '', children, ...rest }: Props = $props();

	const isOpen = $derived(root.openIds.includes(item.id));
</script>

<button
	type="button"
	class="card-header flex items-center justify-between {cls}"
	style="width:100%;cursor:pointer;gap:.5rem;background:none;"
	aria-expanded={isOpen}
	onclick={() => root.toggle(item.id)}
	{...rest}
>
	<span class="card-title">{item.title}
		{#if item.badge}<span class="badge badge-muted" style="font-size:9px;margin-left:6px;">{item.badge}</span>{/if}
	</span>
	<svg
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		style="transition:transform .2s var(--ease-out);transform:rotate({isOpen ? 180 : 0}deg);color:var(--color-subtle);"
	>
		<path d="m6 9 6 6 6-6" />
	</svg>
</button>
