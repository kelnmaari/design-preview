<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		placeholder?: string;
		children?: Snippet;
	}

	let { placeholder = 'Type a command or search…', children }: Props = $props();
	let query = $state('');
	let visible = $state(0);

	setContext('ember:command', {
		get query() {
			return query;
		},
		setQuery: (v: string) => (query = v),
		get placeholder() {
			return placeholder;
		},
		get visible() {
			return visible;
		},
		setVisible: (v: number) => (visible = v)
	});
</script>

<div class="card" style="overflow:hidden;">
	{@render children?.()}
</div>
