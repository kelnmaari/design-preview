<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		text: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		delay?: number;
		children: Snippet;
	}

	let { text, position = 'top', delay = 250, children }: Props = $props();
</script>

<span class="ember-tip" data-pos={position} style="--tip-delay: {delay}ms">
	{@render children()}
	<span class="ember-tip-bubble" role="tooltip">{text}</span>
</span>

<style>
	.ember-tip { position: relative; display: inline-flex; }
	.ember-tip-bubble {
		position: absolute;
		z-index: 60;
		max-width: 240px;
		padding: 0.35rem 0.55rem;
		font-size: 11.5px;
		line-height: 1.45;
		white-space: normal;
		text-align: center;
		color: var(--color-foreground);
		background: var(--color-card-elevated);
		border: 1px solid var(--color-border-strong);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		opacity: 0;
		pointer-events: none;
		transition: opacity var(--dur-fast) ease;
		transition-delay: 0ms;
		width: max-content;
	}
	.ember-tip:hover .ember-tip-bubble,
	.ember-tip:focus-within .ember-tip-bubble {
		opacity: 1;
		transition-delay: var(--tip-delay);
	}
	.ember-tip[data-pos='top'] .ember-tip-bubble {
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}
	.ember-tip[data-pos='bottom'] .ember-tip-bubble {
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}
	.ember-tip[data-pos='left'] .ember-tip-bubble {
		right: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}
	.ember-tip[data-pos='right'] .ember-tip-bubble {
		left: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}
</style>
