<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		value?: string;
		children?: Snippet;
	}

	let { value = $bindable(''), children }: Props = $props();

	setContext('ember:tabs', {
		get value() {
			return value;
		},
		setValue: (v: string) => (value = v)
	});
</script>

<div>
	{@render children?.()}
</div>
