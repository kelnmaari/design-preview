<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		pressed?: boolean;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { pressed = $bindable(false), class: cls = 'btn btn-outline btn-sm', children, ...rest }: Props = $props();
</script>

<button
	type="button"
	aria-pressed={pressed}
	class="{cls}"
	style="{pressed ? 'background:rgb(var(--tw-primary) / .14);border-color:rgb(var(--tw-primary) / .4);color:var(--color-primary);' : ''}"
	onclick={() => (pressed = !pressed)}
	{...rest}
>
	{@render children?.()}
</button>
