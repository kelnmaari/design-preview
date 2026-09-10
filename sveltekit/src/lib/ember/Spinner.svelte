<script lang="ts">
	interface Props {
		size?: number;
		label?: string;
		class?: string;
	}

	let { size = 16, label = 'Loading…', class: cls = '' }: Props = $props();
</script>

<span class="ember-spinner {cls}" style="width: {size}px; height: {size}px;" role="status" aria-label={label}>
	<span class="sr-only">{label}</span>
</span>

<style>
	.ember-spinner {
		display: inline-block;
		border-radius: 50%;
		border: 2px solid var(--color-border-strong);
		border-top-color: var(--color-primary);
		animation: ember-spinner-rotate 0.7s linear infinite;
		vertical-align: -3px;
		flex: none;
	}
	@keyframes ember-spinner-rotate {
		to { transform: rotate(360deg); }
	}
</style>
