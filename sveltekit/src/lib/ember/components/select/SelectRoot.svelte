<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		children?: Snippet;
	}

	let { value = $bindable(''), placeholder = 'Select…', children }: Props = $props();
	let open = $state(false);
	let labels = $state<Record<string, string>>({});

	setContext('ember:select', {
		get value() {
			return value;
		},
		setValue: (v: string) => {
			value = v;
			open = false;
		},
		get open() {
			return open;
		},
		setOpen: (v: boolean) => (open = v),
		get labels() {
			return labels;
		},
		register: (v: string, label: string) => {
			labels = { ...labels, [v]: label };
		},
		placeholder
	});
</script>

<div class="dropdown" style="position:relative">
	{@render children?.()}
</div>
