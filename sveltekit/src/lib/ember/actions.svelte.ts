// Ember Svelte actions — 1:1 with ember.js behaviours.
// Usage: <div class="spotlight" use:spotlight> … </div>
import type { Action } from 'svelte/action';

/** Cursor-tracking glow: writes --mx / --my for .spotlight / .spotlight-border. */
export const spotlight: Action<HTMLElement> = (node) => {
	const onMove = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		node.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
		node.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
	};
	node.addEventListener('pointermove', onMove);
	return {
		destroy: () => node.removeEventListener('pointermove', onMove)
	};
};

interface RevealParams {
	delay?: number;
}

/** Scroll reveal: adds .in when the node enters the viewport. */
export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params) => {
	node.classList.add('reveal');
	if (params?.delay) node.style.setProperty('--reveal-delay', `${params.delay}ms`);
	if (!('IntersectionObserver' in window)) {
		node.classList.add('in');
		return {};
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};

type CountFormat = 'int' | 'compact' | 'plain';

interface CountParams {
	to: number;
	format?: CountFormat;
	duration?: number;
}

function formatNum(v: number, fmt: CountFormat): string {
	if (fmt === 'compact') {
		if (v >= 1e6) return `${(v / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
		if (v >= 1e3) return `${(v / 1e3).toFixed(1).replace(/\.0$/, '')}k`;
		return String(Math.round(v));
	}
	if (fmt === 'plain') return String(Math.round(v));
	return Math.round(v).toLocaleString('en-US');
}

/** Animated counter: <div class="stat-value" use:count={{ to: 2418 }}>0</div> */
export const count: Action<HTMLElement, CountParams> = (node, params) => {
	let done = false;
	const run = () => {
		if (done) return;
		done = true;
		const target = params.to;
		const fmt = params.format ?? 'int';
		const dur = params.duration ?? 1100;
		const t0 = performance.now();
		const tick = (t: number) => {
			const p = Math.min(1, (t - t0) / dur);
			const eased = 1 - Math.pow(1 - p, 3);
			node.textContent = formatNum(target * eased, fmt);
			if (p < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	};
	if (!('IntersectionObserver' in window)) {
		run();
		return {};
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					run();
					io.disconnect();
				}
			}
		},
		{ threshold: 0.4 }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};

/** Click-outside: <div class="dropdown" use:clickOutside={close}> */
export const clickOutside: Action<HTMLElement, () => void> = (node, onOutside) => {
	const onClick = (e: MouseEvent) => {
		if (!node.contains(e.target as Node)) onOutside();
	};
	// Defer so the opening click doesn't immediately close.
	const t = setTimeout(() => document.addEventListener('click', onClick), 0);
	return {
		destroy: () => {
			clearTimeout(t);
			document.removeEventListener('click', onClick);
		}
	};
};
