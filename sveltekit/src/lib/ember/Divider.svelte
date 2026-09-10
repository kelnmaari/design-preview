<script lang="ts">
	interface Props {
		label?: string;
		spacing?: string;
	}

	let { label, spacing = '1.25rem' }: Props = $props();
</script>

<div
	class="ember-divider"
	class:labeled={!!label}
	role="separator"
	style="margin-top: {spacing}; margin-bottom: {spacing};"
>
	{#if label}<span class="ember-divider-label">{label}</span>{/if}
</div>

<style>
	.ember-divider { height: 1px; background: var(--color-border); }
	.ember-divider.labeled {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		height: auto;
		background: none;
	}
	.ember-divider.labeled::before,
	.ember-divider.labeled::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--color-border);
	}
	.ember-divider-label {
		font-size: 10.5px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-subtle);
		white-space: nowrap;
	}
</style>
