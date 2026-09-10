// Ember theme store — Svelte 5 runes. Persists to localStorage, toggles
// the `.ember` / `.ember-light` class on <html> (same contract as ember.js).
import { browser } from '$app/environment';

export type EmberTheme = 'dark' | 'light';

const KEY = 'ember-theme';

function read(): EmberTheme {
	if (!browser) return 'dark';
	try {
		return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark';
	} catch {
		return 'dark';
	}
}

function apply(theme: EmberTheme) {
	if (!browser) return;
	const root = document.documentElement;
	root.classList.toggle('ember-light', theme === 'light');
	root.classList.toggle('ember', theme !== 'light');
	root.style.colorScheme = theme === 'light' ? 'light' : 'dark';
}

class ThemeStore {
	value = $state<EmberTheme>('dark');

	constructor() {
		if (browser) {
			this.value = read();
			apply(this.value);
		}
	}

	set(theme: EmberTheme) {
		this.value = theme;
		try {
			localStorage.setItem(KEY, theme);
		} catch {
			/* private mode */
		}
		apply(theme);
	}

	toggle() {
		this.set(this.value === 'light' ? 'dark' : 'light');
	}
}

export const theme = new ThemeStore();
