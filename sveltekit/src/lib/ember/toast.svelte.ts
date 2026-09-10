// Ember toast store — Svelte 5 runes. Pair with <Toasts /> in the layout.
import { browser } from '$app/environment';

export type ToastKind = 'success' | 'info' | 'warning' | 'error';

export interface Toast {
	id: number;
	kind: ToastKind;
	title: string;
	desc?: string;
	leaving?: boolean;
}

let nextId = 1;

class ToastStore {
	items = $state<Toast[]>([]);

	show(kind: ToastKind, title: string, desc?: string, ms = 3400) {
		const id = nextId++;
		this.items.push({ id, kind, title, desc });
		if (!browser) return;
		setTimeout(() => {
			const t = this.items.find((x) => x.id === id);
			if (t) t.leaving = true;
			setTimeout(() => {
				this.items = this.items.filter((x) => x.id !== id);
			}, 280);
		}, ms);
	}

	success(title: string, desc?: string, ms?: number) {
		this.show('success', title, desc, ms);
	}
	info(title: string, desc?: string, ms?: number) {
		this.show('info', title, desc, ms);
	}
	warning(title: string, desc?: string, ms?: number) {
		this.show('warning', title, desc, ms);
	}
	error(title: string, desc?: string, ms?: number) {
		this.show('error', title, desc, ms);
	}
}

export const toast = new ToastStore();
