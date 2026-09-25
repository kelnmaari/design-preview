<script lang="ts">
	import { slide } from 'svelte/transition';

	export interface TreeNode {
		label: string;
		icon?: string;
		href?: string;
		children?: TreeNode[];
	}

	interface Props {
		items: TreeNode[];
		defaultExpanded?: string[];
	}

	let { items, defaultExpanded = [] }: Props = $props();
	let expanded = $state<string[]>([...defaultExpanded]);

	function toggle(label: string) {
		expanded = expanded.includes(label)
			? expanded.filter((x) => x !== label)
			: [...expanded, label];
	}
</script>

<ul class="kit-tree" role="tree">
	{#each items as item (item.label)}
		{@render node(item, 0)}
	{/each}
</ul>

{#snippet node(item: TreeNode, depth: number)}
	<li role="treeitem" aria-expanded={item.children ? expanded.includes(item.label) : undefined}>
		<div
			class="kit-tree-row"
			style="padding-left:{depth * 16 + 8}px;"
			role="button"
			tabindex="0"
			onclick={() => (item.children ? toggle(item.label) : item.href && location.assign(item.href))}
			onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (item.children ? toggle(item.label) : item.href && location.assign(item.href))}
		>
			{#if item.children?.length}
				<svg
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					style="flex:none;transition:transform .15s var(--ease-out);transform:rotate({expanded.includes(item.label) ? 90 : 0}deg);color:var(--color-subtle);"
				>
					<path d="m9 6 6 6-6 6" />
				</svg>
			{:else}
				<span style="width:12px;flex:none;"></span>
			{/if}
			{#if item.icon}
				<i data-icon={item.icon} data-size="14" class="text-muted-foreground"></i>
			{/if}
			<span class="kit-tree-label">{item.label}</span>
			{#if item.children?.length}
				<span class="kit-tree-count">{item.children.length}</span>
			{/if}
		</div>
		{#if item.children?.length && expanded.includes(item.label)}
			<ul class="kit-tree" role="group" transition:slide={{ duration: 150 }}>
				{#each item.children as child (child.label)}
					{@render node(child, depth + 1)}
				{/each}
			</ul>
		{/if}
	</li>
{/snippet}

<style>
	.kit-tree {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.kit-tree-row {
		display: flex;
		align-items: center;
		gap: 7px;
		padding-top: 5px;
		padding-bottom: 5px;
		padding-right: 8px;
		border-radius: var(--radius-sm);
		font-size: 13px;
		color: var(--color-foreground);
		cursor: pointer;
		user-select: none;
	}
	.kit-tree-row:hover {
		background: var(--color-accent);
	}
	.kit-tree-label {
		min-width: 0;
	}
	.kit-tree-count {
		margin-left: auto;
		font-size: 10px;
		font-family: var(--font-mono);
		color: var(--color-subtle);
	}
</style>
