<script lang="ts">
	import { getContext } from 'svelte';

	const ctx = getContext<{ page: number; total: number; go: (p: number) => void }>(
		'ember:pagination'
	);

	interface Props {
		/** how many page buttons around the current one */
		siblings?: number;
	}

	let { siblings = 1 }: Props = $props();

	const list = $derived.by(() => {
		const total = ctx.total;
		const cur = ctx.page;
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
		const out: (number | '…')[] = [1];
		const start = Math.max(2, cur - siblings);
		const end = Math.min(total - 1, cur + siblings);
		if (start > 2) out.push('…');
		for (let i = start; i <= end; i++) out.push(i);
		if (end < total - 1) out.push('…');
		out.push(total);
		return out;
	});
</script>

{#each list as p, i (i)}
	{#if p === '…'}
		<span class="text-xs text-subtle px-1">…</span>
	{:else}
		<button class="page-btn" class:active={p === ctx.page} onclick={() => ctx.go(p)}>{p}</button>
	{/if}
{/each}
