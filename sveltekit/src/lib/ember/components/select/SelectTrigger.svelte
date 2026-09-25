<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const ctx = getContext<{
		value: string;
		open: boolean;
		setOpen: (v: boolean) => void;
		labels: Record<string, string>;
		placeholder: string;
	}>('ember:select');

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: cls = '', children, ...rest }: Props = $props();

	const label = $derived(ctx.labels[ctx.value] ?? ctx.placeholder);
</script>

<button
	type="button"
	class="input pointer {cls}"
	style="display:flex;align-items:center;justify-content:space-between;width:100%;"
	aria-haspopup="listbox"
	aria-expanded={ctx.open}
	onclick={() => ctx.setOpen(!ctx.open)}
	{...rest}
>
	<span style="color:{ctx.value ? 'var(--color-foreground)' : 'var(--color-subtle)'};">{label}</span>
	<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-subtle)"><path d="m6 9 6 6 6-6" /></svg>
</button>
