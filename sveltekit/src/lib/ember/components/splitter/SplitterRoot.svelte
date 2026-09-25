<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** проценты ширины панелей, например [60, 40] */
		sizes?: number[];
		direction?: 'horizontal' | 'vertical';
		children?: Snippet;
	}

	let { sizes = $bindable([50, 50]), direction = 'horizontal', children }: Props = $props();
	let container: HTMLElement | undefined = $state();

	setContext('ember:splitter', {
		get sizes() {
			return sizes;
		},
		get vertical() {
			return direction === 'vertical';
		},
		setContainer: (el: HTMLElement) => (container = el),
		startDrag: (e: PointerEvent, index: number) => {
			(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
			const start = direction === 'vertical' ? e.clientY : e.clientX;
			const a = sizes[index];
			const b = sizes[index + 1];
			const move = (ev: PointerEvent) => {
				const box = container?.getBoundingClientRect();
				if (!box) return;
				const span = direction === 'vertical' ? box.height : box.width;
				let delta = ((direction === 'vertical' ? ev.clientY : ev.clientX) - start) * (100 / span);
				let na = Math.min(90, Math.max(10, a + delta));
				let nb = a + b - na;
				if (nb < 10) {
					nb = 10;
					na = a + b - 10;
				}
				sizes = sizes.map((v, i) => (i === index ? na : i === index + 1 ? nb : v));
			};
			const up = () => {
				window.removeEventListener('pointermove', move);
				window.removeEventListener('pointerup', up);
			};
			window.addEventListener('pointermove', move);
			window.addEventListener('pointerup', up);
		}
	});
</script>

<div
	class="kit-splitter"
	style="display:flex;{direction === 'vertical' ? 'flex-direction:column;' : ''}width:100%;height:100%;min-height:160px;"
	bind:this={container}
>
	{@render children?.()}
</div>

<style>
	.kit-splitter > :global(*) {
		min-width: 0;
		min-height: 0;
	}
</style>
