<script lang="ts">
	import { getContext } from 'svelte';

	const ctx = getContext<{ query: string; setQuery: (v: string) => void; placeholder: string }>(
		'ember:command'
	);
</script>

<div class="cmdk-input-row">
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-subtle)"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
	<input
		{...{ placeholder: ctx.placeholder }}
		value={ctx.query}
		oninput={(e) => ctx.setQuery((e.currentTarget as HTMLInputElement).value)}
	/>
	<kbd>Esc</kbd>
</div>
