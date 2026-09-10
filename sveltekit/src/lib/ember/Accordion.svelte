<script lang="ts">
	import type { Snippet } from 'svelte';
	import Badge from './Badge.svelte';
	import Icon from './Icon.svelte';

	export interface AccordionItem {
		id?: string;
		title: string;
		badge?: string;
		body?: string;
	}

	interface Props {
		items: AccordionItem[];
		openIds?: string[];
		multiple?: boolean;
		detail?: Snippet<[AccordionItem]>;
		ontoggle?: (id: string, open: boolean) => void;
	}

	let { items, openIds = $bindable([]), multiple = false, detail, ontoggle }: Props = $props();

	function keyOf(item: AccordionItem, i: number): string {
		return item.id ?? `${item.title}-${i}`;
	}

	function toggle(item: AccordionItem, i: number) {
		const k = keyOf(item, i);
		const isOpen = openIds.includes(k);
		if (multiple) {
			openIds = isOpen ? openIds.filter((x) => x !== k) : [...openIds, k];
		} else {
			openIds = isOpen ? [] : [k];
		}
		ontoggle?.(k, !isOpen);
	}
</script>

<div class="ember-accordion">
	{#each items as item, i (keyOf(item, i))}
		{@const k = keyOf(item, i)}
		{@const isOpen = openIds.includes(k)}
		<div class="ember-acc-item" class:open={isOpen}>
			<button
				class="ember-acc-head"
				aria-expanded={isOpen}
				aria-controls="acc-{k}"
				onclick={() => toggle(item, i)}
			>
				<span class="ember-acc-title">{item.title}</span>
				{#if item.badge}<Badge>{item.badge}</Badge>{/if}
				<Icon name="chevron-down" size={13} class="ember-acc-chevron" />
			</button>
			<div class="ember-acc-panel" id="acc-{k}" role="region">
				<div class="ember-acc-body">
					{#if detail}{@render detail(item)}{:else if item.body}{item.body}{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.ember-accordion {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-card);
		overflow: hidden;
	}
	.ember-acc-item + .ember-acc-item { border-top: 1px solid var(--color-border); }
	.ember-acc-head {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
		padding: 0.65rem 0.8rem;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-foreground);
		font-size: 13px;
		font-weight: 500;
		text-align: left;
	}
	.ember-acc-head:hover { background: var(--color-muted); }
	.ember-acc-title { flex: 1; }
	.ember-acc-head :global(.ember-acc-chevron) {
		color: var(--color-subtle);
		transition: transform var(--dur-fast) ease;
		flex: none;
	}
	.ember-acc-item.open .ember-acc-head :global(.ember-acc-chevron) { transform: rotate(180deg); }
	.ember-acc-panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows var(--dur-normal) var(--ease-out);
	}
	.ember-acc-item.open .ember-acc-panel { grid-template-rows: 1fr; }
	.ember-acc-body {
		overflow: hidden;
		min-height: 0;
		font-size: 12.5px;
		line-height: 1.6;
		color: var(--color-muted-foreground);
	}
	.ember-acc-item.open .ember-acc-body { padding: 0 0.8rem 0.75rem; }
</style>
