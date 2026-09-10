<script lang="ts">
	import Icon from './Icon.svelte';
	import { toast, type ToastKind } from './toast.svelte.js';

	const ICONS: Record<ToastKind, 'circle-check' | 'circle-info' | 'triangle-exclamation' | 'xmark'> = {
		success: 'circle-check',
		info: 'circle-info',
		warning: 'triangle-exclamation',
		error: 'xmark'
	};
</script>

<div id="ember-toasts" aria-live="polite">
	{#each toast.items as t (t.id)}
		<div class="toast toast-{t.kind}" class:leaving={t.leaving}>
			<div class="t-icon"><Icon name={ICONS[t.kind]} size={14} /></div>
			<div class="min-w-0">
				<div class="t-title">{t.title}</div>
				{#if t.desc}<div class="t-desc">{t.desc}</div>{/if}
			</div>
		</div>
	{/each}
</div>
