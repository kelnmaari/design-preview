<script lang="ts">
	import { ICONS, type IconName } from './icons.js';

	interface Props {
		name: IconName;
		size?: number | string;
		class?: string;
	}

	let { name, size = 14, class: cls = '' }: Props = $props();
</script>

<span class={cls} style="display:inline-flex;align-items:center;justify-content:center;">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.6"
		stroke-linecap="round"
		stroke-linejoin="round"
		style="display:block"
		aria-hidden="true"
	>
		{@html ICONS[name] ?? ''}
	</svg>
</span>
