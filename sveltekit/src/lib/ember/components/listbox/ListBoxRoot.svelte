<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { handleRovingKeys } from '../internal/utils.js';

	interface Props {
		value?: string | string[];
		multiple?: boolean;
		children?: Snippet;
	}

	let { value = $bindable(''), multiple = false, children }: Props = $props();
	let list: HTMLElement | undefined = $state();

	function select(v: string) {
		if (multiple) {
			const arr = Array.isArray(value) ? value : [];
			value = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
		} else {
			value = v;
		}
	}
	function isOn(v: string) {
		return multiple ? Array.isArray(value) && value.includes(v) : value === v;
	}

	setContext('ember:listbox', { select, isOn });
</script>

<ul
	class="card"
	style="list-style:none;margin:0;padding:6px;overflow:auto;max-height:280px;"
	role="listbox"
	aria-multiselectable={multiple}
	bind:this={list}
	onkeydown={(e) => list && handleRovingKeys(e, list)}
>
	{@render children?.()}
</ul>
