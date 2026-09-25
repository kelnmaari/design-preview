/* Svelte-идиома asChild: триггер-экшены. Вызываются при инициализации
   компонента (внутри Root), возвращают Svelte-action для ЛЮБОГО элемента:
     const dialogTrigger = createDialogTrigger();
     <button use:dialogTrigger>Открыть</button> */
import { getContext } from 'svelte';

function fireOn(node: HTMLElement, fn: () => void) {
	const onClick = (e: MouseEvent) => {
		e.preventDefault();
		fn();
	};
	const onKey = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			fn();
		}
	};
	node.addEventListener('click', onClick);
	node.addEventListener('keydown', onKey);
	return {
		destroy() {
			node.removeEventListener('click', onClick);
			node.removeEventListener('keydown', onKey);
		}
	};
}

export function createDialogTrigger() {
	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:dialog');
	return (node: HTMLElement) => fireOn(node, () => ctx.setOpen(!ctx.open));
}

export function createDialogClose() {
	const ctx = getContext<{ setOpen: (v: boolean) => void }>('ember:dialog');
	return (node: HTMLElement) => fireOn(node, () => ctx.setOpen(false));
}

export function createCollapsibleTrigger() {
	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:collapsible');
	return (node: HTMLElement) => fireOn(node, () => ctx.setOpen(!ctx.open));
}

export function createPopoverTrigger() {
	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:popover');
	return (node: HTMLElement) => fireOn(node, () => ctx.setOpen(!ctx.open));
}

export function createDropdownMenuTrigger() {
	const ctx = getContext<{ open: boolean; setOpen: (v: boolean) => void }>('ember:dropdown-menu');
	return (node: HTMLElement) => fireOn(node, () => ctx.setOpen(!ctx.open));
}
