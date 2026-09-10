<script lang="ts">
	import Icon from './Icon.svelte';

	export interface Crumb {
		label: string;
		href?: string;
	}

	interface Props {
		items: Crumb[];
		onnavigate?: (item: Crumb) => void;
	}

	let { items, onnavigate }: Props = $props();
</script>

<nav class="ember-crumbs" aria-label="Breadcrumb">
	<ol>
		{#each items as item, i (item.label + i)}
			{@const last = i === items.length - 1}
			<li>
				{#if i > 0}<span class="ember-crumb-sep" aria-hidden="true">/</span>{/if}
				{#if last || !item.href}
					<span class="ember-crumb-current" aria-current="page">{item.label}</span>
				{:else}
					<a
						class="ember-crumb-link"
						href={item.href}
						onclick={(e) => {
							if (onnavigate) {
								e.preventDefault();
								onnavigate(item);
							}
						}}
					>
						{#if i === 0}<Icon name="home" size={12} />{/if}
						{item.label}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.ember-crumbs ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.35rem;
		font-size: 12.5px;
	}
	.ember-crumbs li { display: inline-flex; align-items: center; gap: 0.35rem; }
	.ember-crumb-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--color-subtle);
		text-decoration: none;
		border-radius: var(--radius-sm);
	}
	.ember-crumb-link:hover { color: var(--color-primary); }
	.ember-crumb-sep { color: var(--color-border-strong); }
	.ember-crumb-current { color: var(--color-foreground); font-weight: 500; }
</style>
