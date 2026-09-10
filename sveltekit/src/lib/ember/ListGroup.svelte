<script lang="ts">
	import type { Snippet } from 'svelte';
	import Badge from './Badge.svelte';
	import Icon from './Icon.svelte';
	import type { IconName } from './icons.js';

	export interface ListGroupItem {
		icon?: IconName;
		title: string;
		desc?: string;
		badge?: string;
		href?: string;
		active?: boolean;
		disabled?: boolean;
	}

	interface Props {
		items: ListGroupItem[];
		onselect?: (item: ListGroupItem, index: number) => void;
	}

	let { items, onselect }: Props = $props();

	function activate(item: ListGroupItem, i: number, e: MouseEvent) {
		if (item.disabled) return;
		if (onselect) {
			e.preventDefault();
			onselect(item, i);
		}
	}
</script>

{#snippet rowInner(item: ListGroupItem)}
	{#if item.icon}<span class="ember-list-icon"><Icon name={item.icon} size={15} /></span>{/if}
	<span class="ember-list-text">
		<span class="ember-list-title">{item.title}</span>
		{#if item.desc}<span class="ember-list-desc">{item.desc}</span>{/if}
	</span>
	{#if item.badge}<Badge>{item.badge}</Badge>{/if}
	{#if item.href}<Icon name="chevron-right" size={13} class="ember-list-go" />{/if}
{/snippet}

<ul class="ember-list-group">
	{#each items as item, i (item.title + i)}
		<li>
			{#if item.href && !onselect}
				<a
					class="ember-list-row"
					class:active={item.active}
					class:disabled={item.disabled}
					href={item.href}
				>
					{@render rowInner(item)}
				</a>
			{:else}
				<button
					type="button"
					class="ember-list-row"
					class:active={item.active}
					disabled={item.disabled}
					onclick={(e: MouseEvent) => activate(item, i, e)}
				>
					{@render rowInner(item)}
				</button>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.ember-list-group {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-card);
		overflow: hidden;
	}
	.ember-list-group :global(.ember-list-row) {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		width: 100%;
		padding: 0.6rem 0.75rem;
		background: none;
		border: none;
		color: var(--color-foreground);
		font-size: 13px;
		text-align: left;
		text-decoration: none;
		cursor: pointer;
	}
	.ember-list-group li + li { border-top: 1px solid var(--color-border); }
	.ember-list-group :global(button.ember-list-row:hover),
	.ember-list-group :global(a.ember-list-row:hover) {
		background: var(--color-muted);
	}
	.ember-list-group :global(.ember-list-row.active) {
		background: rgb(var(--tw-primary) / 0.08);
		box-shadow: inset 2px 0 0 var(--color-primary);
	}
	.ember-list-group :global(.ember-list-row.disabled) { opacity: 0.5; cursor: not-allowed; }
	.ember-list-icon {
		display: inline-grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: var(--radius-sm);
		background: var(--color-muted);
		color: var(--color-muted-foreground);
		flex: none;
	}
	.ember-list-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
	.ember-list-title { font-weight: 500; }
	.ember-list-desc {
		font-size: 11.5px;
		color: var(--color-subtle);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.ember-list-group :global(.ember-list-go) { color: var(--color-subtle); flex: none; }
</style>
