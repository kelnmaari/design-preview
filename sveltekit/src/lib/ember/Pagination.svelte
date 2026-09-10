<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		page?: number;
		total: number;
		onchange?: (page: number) => void;
	}

	let { page = $bindable(1), total, onchange }: Props = $props();

	/** Compact page list with ellipsis: 1 … 4 5 6 … 42 */
	const items = $derived.by<(number | '…')[]>(() => {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
		const set = new Set<number>([1, 2, page - 1, page, page + 1, total - 1, total]);
		const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
		const out: (number | '…')[] = [];
		let prev = 0;
		for (const n of nums) {
			if (n - prev > 1) out.push('…');
			out.push(n);
			prev = n;
		}
		return out;
	});

	function go(n: number) {
		const next = Math.min(total, Math.max(1, n));
		page = next;
		onchange?.(next);
	}
</script>

<div class="pagination">
	<button class="page-btn" onclick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous page">
		<Icon name="chevron-left" size={12} />
	</button>
	{#each items as item, i (`${item}-${i}`)}
		{#if item === '…'}
			<span class="text-xs text-subtle px-1">…</span>
		{:else}
			<button class="page-btn" class:active={page === item} onclick={() => go(item)}>{item}</button>
		{/if}
	{/each}
	<button class="page-btn" onclick={() => go(page + 1)} disabled={page >= total} aria-label="Next page">
		<Icon name="chevron-right" size={12} />
	</button>
</div>
