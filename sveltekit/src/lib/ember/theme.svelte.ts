// Ember theme store — Svelte 5 runes. Persists to localStorage, applies the
// theme class on <html> (same contract as ember.js).
import { browser } from '$app/environment';

export type EmberTheme = 'ember' | 'midnight' | 'forest' | 'light' | 'frost' | 'sand';

export interface ThemeMeta {
	id: EmberTheme;
	label: string;
	mode: 'dark' | 'light';
	/** [background, card, primary] hex for swatch previews. */
	swatch: [string, string, string];
}

export const THEMES: ThemeMeta[] = [
	{ id: 'ember', label: 'Ember', mode: 'dark', swatch: ['#0A0A0C', '#121214', '#F43F5E'] },
	{ id: 'midnight', label: 'Midnight', mode: 'dark', swatch: ['#0D1117', '#161B22', '#60A5FA'] },
	{ id: 'forest', label: 'Forest', mode: 'dark', swatch: ['#090E0C', '#0F1713', '#34D399'] },
	{ id: 'light', label: 'Light', mode: 'light', swatch: ['#FFFFFF', '#FFFFFF', '#E11D48'] },
	{ id: 'frost', label: 'Frost', mode: 'light', swatch: ['#F8FAFC', '#FFFFFF', '#2563EB'] },
	{ id: 'sand', label: 'Sand', mode: 'light', swatch: ['#FAF7F2', '#FFFFFF', '#E11D48'] }
];

const ORDER: EmberTheme[] = ['ember', 'midnight', 'forest', 'light', 'frost', 'sand'];
const CLASSES = ['ember', 'ember-midnight', 'ember-forest', 'ember-light', 'ember-frost', 'ember-sand'];
const MODES: Record<EmberTheme, 'dark' | 'light'> = {
	ember: 'dark',
	midnight: 'dark',
	forest: 'dark',
	light: 'light',
	frost: 'light',
	sand: 'light'
};

const KEY = 'ember-theme';

function normalize(raw: string | null): EmberTheme {
	if (raw === 'dark') return 'ember'; // legacy value
	return (ORDER as string[]).includes(raw ?? '') ? (raw as EmberTheme) : 'ember';
}

function apply(theme: EmberTheme) {
	if (!browser) return;
	const root = document.documentElement;
	for (const c of CLASSES) root.classList.remove(c);
	root.classList.add(theme === 'ember' ? 'ember' : `ember-${theme}`);
	root.style.colorScheme = MODES[theme];
}

class ThemeStore {
	value = $state<EmberTheme>('ember');

	constructor() {
		if (browser) {
			this.value = this.read();
			apply(this.value);
		}
	}

	read(): EmberTheme {
		if (!browser) return 'ember';
		try {
			return normalize(localStorage.getItem(KEY));
		} catch {
			return 'ember';
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

	/** Next theme in the cycle (used by the palette action). */
	toggle() {
		const i = ORDER.indexOf(this.value);
		this.set(ORDER[(i + 1) % ORDER.length]);
	}
}

export const theme = new ThemeStore();
