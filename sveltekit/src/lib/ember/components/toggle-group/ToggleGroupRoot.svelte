<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		value?: string | string[];
		type?: 'single' | 'multiple';
		children?: Snippet;
	}

	let { value = $bindable(''), type = 'single', children }: Props = $props();

	setContext('ember:toggle-group', {
		get value() {
			return value;
		},
		get type() {
			return type;
		},
		toggle(v: string) {
			if (type === 'multiple') {
				const arr = Array.isArray(value) ? value : [];
				value = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
			} else {
				value = v;
			}
		},
		isOn: (v: string) => (type === 'multiple' ? Array.isArray(value) && value.includes(v) : value === v)
	});
</script>

<div style="display:inline-flex;gap:6px;flex-wrap:wrap;" role="group">
	{@render children?.()}
</div>
