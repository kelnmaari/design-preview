<script lang="ts">
	export type PresenceStatus = 'online' | 'idle' | 'busy' | 'offline';

	interface Props {
		status?: PresenceStatus;
		label?: string;
		size?: number;
		pulse?: boolean;
		showLabel?: boolean;
	}

	let { status = 'online', label, size = 8, pulse = true, showLabel = true }: Props = $props();

	const LABELS: Record<PresenceStatus, string> = {
		online: 'Online',
		idle: 'Idle',
		busy: 'Busy',
		offline: 'Offline'
	};
</script>

<span class="ember-presence">
	<span
		class="ember-presence-dot {status}"
		class:pulse={pulse && status === 'online'}
		style="width: {size}px; height: {size}px;"
		aria-hidden="true"
	></span>
	{#if showLabel}
		<span class="ember-presence-label">{label ?? LABELS[status]}</span>
	{/if}
	<span class="sr-only">{LABELS[status]}</span>
</span>

<style>
	.ember-presence { display: inline-flex; align-items: center; gap: 0.4rem; }
	.ember-presence-dot { border-radius: 50%; flex: none; }
	.ember-presence-dot.online { background: var(--color-success); }
	.ember-presence-dot.online.pulse { animation: ember-presence-pulse 2s ease-in-out infinite; }
	.ember-presence-dot.idle { background: var(--color-amber); }
	.ember-presence-dot.busy { background: var(--color-destructive); }
	.ember-presence-dot.offline { background: var(--color-border-strong); }
	.ember-presence-label { font-size: 12px; color: var(--color-muted-foreground); }
	@keyframes ember-presence-pulse {
		0%, 100% { box-shadow: 0 0 0 0 rgb(var(--tw-success) / 0.45); }
		50% { box-shadow: 0 0 0 4px rgb(var(--tw-success) / 0); }
	}
</style>
