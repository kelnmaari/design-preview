<script lang="ts">
	import type { Snippet } from 'svelte';
	import { handleRovingKeys } from '../internal/utils.js';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: cls = '', children }: Props = $props();
	let bar: HTMLElement | undefined = $state();
</script>

<!--
	Menubar: горизонтальная полоса меню. Внутри используйте композицию
	каждого пункта: DropdownMenuRoot + Trigger + Content (стили уже есть).
	Root даёт role=menubar и roving-навигацию стрелками между триггерами.
-->
<div
	role="menubar"
	class="menubar {cls}"
	bind:this={bar}
	onkeydown={(e) => bar && handleRovingKeys(e, bar)}
>
	{@render children?.()}
</div>

<style>
	.menubar {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		background: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 4px 6px;
	}
</style>
