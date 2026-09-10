<script lang="ts">
	import type { Snippet } from 'svelte';
	import { clickOutside } from './actions.svelte.js';

	interface TriggerApi {
		open: boolean;
		toggle: () => void;
		close: () => void;
	}

	interface Props {
		/** Render-prop for the trigger (usually a Button). */
		trigger: Snippet<[TriggerApi]>;
		children: Snippet;
		align?: 'left' | 'right';
	}

	let { trigger, children, align = 'right' }: Props = $props();
	let open = $state(false);

	function toggle() {
		open = !open;
	}
	function close() {
		open = false;
	}
</script>

<div class="dropdown" class:open use:clickOutside={close}>
	{@render trigger({ open, toggle, close })}
	<div
		class="menu"
		style={align === 'left' ? 'left:0;right:auto;' : ''}
		onclick={close}
		onkeydown={(e) => {
			if (e.key === 'Escape') close();
		}}
		role="menu"
		tabindex="-1"
	>
		{@render children()}
	</div>
</div>
