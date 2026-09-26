/* Shared behavior helpers for headless parts (behavior + Ember skin). */

export function getFocusable(container: HTMLElement): HTMLElement[] {
	return Array.from(
		container.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="menuitem"], [role="option"]'
		)
	).filter((el) => el.offsetParent !== null);
}

/** ArrowUp/ArrowDown/Home/End roving among focusable elements inside container. */
export function handleRovingKeys(e: KeyboardEvent, container: HTMLElement) {
	const items = getFocusable(container);
	if (!items.length) return;
	const i = items.indexOf(document.activeElement as HTMLElement);
	if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
		e.preventDefault();
		items[Math.min(items.length - 1, i + 1)]?.focus();
	} else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
		e.preventDefault();
		items[Math.max(0, i - 1)]?.focus();
	} else if (e.key === 'Home') {
		e.preventDefault();
		items[0]?.focus();
	} else if (e.key === 'End') {
		e.preventDefault();
		items[items.length - 1]?.focus();
	}
}

/** Minimal focus trap: keeps Tab cycling inside container. */
export function trapTab(e: KeyboardEvent, container: HTMLElement) {
	if (e.key !== 'Tab') return;
	const items = getFocusable(container);
	if (!items.length) return;
	const first = items[0];
	const last = items[items.length - 1];
	if (e.shiftKey && document.activeElement === first) {
		e.preventDefault();
		last.focus();
	} else if (!e.shiftKey && document.activeElement === last) {
		e.preventDefault();
		first.focus();
	}
}

export function clickOutside(node: HTMLElement, handler: () => void) {
	const onPointerDown = (e: PointerEvent) => {
		if (!node.contains(e.target as Node)) handler();
	};
	document.addEventListener('pointerdown', onPointerDown, true);
	return {
		destroy() {
			document.removeEventListener('pointerdown', onPointerDown, true);
		}
	};
}
