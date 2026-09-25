<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		page?: number;
		total: number;
		children?: Snippet;
	}

	let { page = $bindable(1), total, children }: Props = $props();

	setContext('ember:pagination', {
		get page() {
			return page;
		},
		get total() {
			return total;
		},
		go: (p: number) => {
			page = Math.min(total, Math.max(1, p));
		},
		prev: () => (page = Math.max(1, page - 1)),
		next: () => (page = Math.min(total, page + 1))
	});
</script>

<nav style="display:flex;align-items:center;gap:6px;" aria-label="Pagination">
	{@render children?.()}
</nav>
