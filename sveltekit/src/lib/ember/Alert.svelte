<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';
	import type { IconName } from './icons.js';

	export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

	interface Props {
		variant?: AlertVariant;
		title: string;
		description?: string;
		icon?: IconName;
		dismissible?: boolean;
		open?: boolean;
		children?: Snippet;
		ondismiss?: () => void;
	}

	let {
		variant = 'info',
		title,
		description,
		icon,
		dismissible = false,
		open = $bindable(true),
		children,
		ondismiss
	}: Props = $props();

	const FALLBACK: Record<AlertVariant, IconName> = {
		info: 'circle-info',
		success: 'circle-check',
		warning: 'triangle-exclamation',
		danger: 'xmark'
	};

	function dismiss() {
		open = false;
		ondismiss?.();
	}
</script>

{#if open}
	<div class="ember-alert ember-alert-{variant}" role={variant === 'danger' ? 'alert' : 'status'}>
		<div class="ember-alert-icon"><Icon name={icon ?? FALLBACK[variant]} size={15} /></div>
		<div class="ember-alert-body">
			<div class="ember-alert-title">{title}</div>
			{#if description}<div class="ember-alert-desc">{description}</div>{/if}
			{#if children}<div class="ember-alert-actions">{@render children()}</div>{/if}
		</div>
		{#if dismissible}
			<button class="btn btn-ghost btn-icon btn-sm" onclick={dismiss} aria-label="Dismiss">
				<Icon name="xmark" size={13} />
			</button>
		{/if}
	</div>
{/if}

<style>
	.ember-alert {
		display: flex;
		gap: 0.65rem;
		align-items: flex-start;
		padding: 0.7rem 0.8rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-card);
	}
	.ember-alert-icon { flex: none; margin-top: 1px; }
	.ember-alert-body { flex: 1; min-width: 0; }
	.ember-alert-title { font-size: 13px; font-weight: 600; color: var(--color-foreground); }
	.ember-alert-desc { font-size: 12.5px; color: var(--color-muted-foreground); margin-top: 2px; line-height: 1.5; }
	.ember-alert-actions { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
	.ember-alert-info { border-color: rgb(var(--tw-info) / 0.3); background: rgb(var(--tw-info) / 0.06); }
	.ember-alert-info .ember-alert-icon { color: var(--color-info); }
	.ember-alert-success { border-color: rgb(var(--tw-success) / 0.3); background: rgb(var(--tw-success) / 0.06); }
	.ember-alert-success .ember-alert-icon { color: var(--color-success); }
	.ember-alert-warning { border-color: rgb(var(--tw-amber) / 0.35); background: rgb(var(--tw-amber) / 0.07); }
	.ember-alert-warning .ember-alert-icon { color: var(--color-amber); }
	.ember-alert-danger { border-color: rgb(var(--tw-destructive) / 0.35); background: rgb(var(--tw-destructive) / 0.06); }
	.ember-alert-danger .ember-alert-icon { color: var(--color-destructive); }
</style>
