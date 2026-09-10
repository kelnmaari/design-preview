import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { mount, unmount, tick, type Component } from 'svelte';
import TestApp from './TestApp.svelte';
import TestAppKeys from './TestAppKeys.svelte';

// jsdom lacks rAF unless pretendToBeVisual — polyfill so animation helpers don't throw.
if (!('requestAnimationFrame' in window)) {
	(window as any).requestAnimationFrame = (cb: FrameRequestCallback) =>
		setTimeout(() => cb(performance.now()), 16) as unknown as number;
}

async function mountAndExercise(App: Component, label: string) {
	const errors: string[] = [];
	const spy = vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
		errors.push(args.map(String).join(' '));
	});
	try {
		document.documentElement.className = '';
		document.body.innerHTML = '';
		localStorage.clear();

		const app = mount(App, { target: document.body });
		await tick();
		await new Promise((r) => setTimeout(r, 60));

		// 1. Theme button exists.
		const btn = document.querySelector('.topbar button[aria-label^="Theme:"]') as HTMLElement | null;
		expect(btn, `[${label}] theme button exists`).toBeTruthy();

		// 2. Click → menu opens.
		btn!.click();
		await tick();
		expect(document.querySelector('.dropdown.open'), `[${label}] menu opens`).toBeTruthy();

		// 3. Pick Midnight → applied + persisted.
		const items = [...document.querySelectorAll<HTMLButtonElement>('.menu-item')];
		const midnight = items.find((el) => el.textContent?.includes('Midnight'));
		expect(midnight, `[${label}] midnight item exists`).toBeTruthy();
		midnight!.click();
		await tick();
		expect(document.documentElement.className, `[${label}] class applied`).toContain('ember-midnight');
		expect(localStorage.getItem('ember-theme'), `[${label}] persisted`).toBe('midnight');

		// 4. No console errors during mount + interaction.
		expect(errors, `[${label}] console errors`).toEqual([]);

		unmount(app);
	} finally {
		spy.mockRestore();
	}
}

describe('theme picker differential: dashboard vs api-keys', () => {
	beforeEach(() => vi.useRealTimers());
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('works on dashboard', async () => {
		await mountAndExercise(TestApp, 'dashboard');
	});

	it('works on api-keys', async () => {
		await mountAndExercise(TestAppKeys, 'api-keys');
	});
});
