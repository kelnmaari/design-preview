<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		openIds?: string[];
		multiple?: boolean;
		children?: Snippet;
	}

	let { openIds = $bindable([]), multiple = false, children }: Props = $props();

	setContext('ember:accordion', {
		get openIds() {
			return openIds;
		},
		get multiple() {
			return multiple;
		},
		toggle(id: string) {
			if (openIds.includes(id)) {
				openIds = openIds.filter((x) => x !== id);
			} else {
				openIds = multiple ? [...openIds, id] : [id];
			}
		}
	});
</script>

<div class="card" style="overflow:hidden">
	{@render children?.()}
</div>
