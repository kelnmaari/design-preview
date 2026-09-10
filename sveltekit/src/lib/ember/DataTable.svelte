<script lang="ts">
	import type { Snippet } from 'svelte';
	import EmptyState from './EmptyState.svelte';
	import Icon from './Icon.svelte';

	export interface DataTableColumn {
		key: string;
		label: string;
		sortable?: boolean;
		align?: 'left' | 'center' | 'right';
		width?: string;
	}

	interface Props {
		columns: DataTableColumn[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		rows: any[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		rowId?: (row: any) => string | number;
		sortKey?: string | null;
		sortDir?: 'asc' | 'desc';
		/** 'client' sorts rows internally; 'manual' leaves order to you (server-side). */
		sortMode?: 'client' | 'manual';
		selectable?: boolean;
		selected?: (string | number)[];
		loading?: boolean;
		loadingRows?: number;
		emptyTitle?: string;
		emptyDescription?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		cell?: Snippet<[{ row: any; column: DataTableColumn; value: unknown }]>;
		empty?: Snippet;
		onsort?: (key: string, dir: 'asc' | 'desc') => void;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onrowclick?: (row: any) => void;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onselection?: (rows: any[]) => void;
	}

	let {
		columns,
		rows,
		rowId = (r) => r.id,
		sortKey = $bindable(null),
		sortDir = $bindable('asc'),
		sortMode = 'client',
		selectable = false,
		selected = $bindable([]),
		loading = false,
		loadingRows = 5,
		emptyTitle = 'No results',
		emptyDescription = 'Try adjusting the filters.',
		cell,
		empty,
		onsort,
		onrowclick,
		onselection
	}: Props = $props();

	function compare(a: unknown, b: unknown): number {
		if (typeof a === 'number' && typeof b === 'number') return a - b;
		return String(a ?? '').localeCompare(String(b ?? ''), undefined, { numeric: true });
	}

	const view = $derived.by(() => {
		const key: string | null = sortKey;
		if (sortMode !== 'client' || !key) return rows;
		const dir = sortDir === 'asc' ? 1 : -1;
		return [...rows].sort((a, b) => compare(a?.[key], b?.[key]) * dir);
	});

	const ids = $derived(view.map(rowId));
	const allChecked = $derived(ids.length > 0 && ids.every((id) => selected.includes(id)));
	const someChecked = $derived(ids.some((id) => selected.includes(id)));

	let headBox: HTMLInputElement | null = $state(null);
	$effect(() => {
		if (headBox) headBox.indeterminate = someChecked && !allChecked;
	});

	function toggleSort(col: DataTableColumn) {
		if (!col.sortable) return;
		let dir: 'asc' | 'desc' = 'asc';
		if (sortKey === col.key) dir = sortDir === 'asc' ? 'desc' : 'asc';
		sortKey = col.key;
		sortDir = dir;
		onsort?.(col.key, dir);
	}

	function toggleAll() {
		const next = allChecked ? selected.filter((id) => !ids.includes(id)) : [...new Set([...selected, ...ids])];
		selected = next;
		onselection?.(rows.filter((r) => next.includes(rowId(r))));
	}

	function toggleOne(id: string | number) {
		const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
		selected = next;
		onselection?.(rows.filter((r) => next.includes(rowId(r))));
	}

	function maybeRowClick(row: (typeof rows)[number], e: MouseEvent) {
		if (!onrowclick) return;
		if ((e.target as HTMLElement).closest('button, a, input, select, textarea')) return;
		onrowclick(row);
	}
</script>

<div class="ember-table-wrap">
	<table class="table ember-data-table">
		<thead>
			<tr>
				{#if selectable}
					<th class="ember-check-cell">
						<input
							type="checkbox"
							class="checkbox"
							aria-label="Select all rows"
							checked={allChecked}
							bind:this={headBox}
							onchange={toggleAll}
						/>
					</th>
				{/if}
				{#each columns as col (col.key)}
					<th
						class:sortable={col.sortable}
						style="text-align: {col.align ?? 'left'}; {col.width ? `width: ${col.width};` : ''}"
						aria-sort={sortKey === col.key
							? sortDir === 'asc'
								? 'ascending'
								: 'descending'
							: undefined}
					>
						{#if col.sortable}
							<button class="ember-sort-btn" onclick={() => toggleSort(col)}>
								{col.label}
								<span class="ember-sort-icon" class:active={sortKey === col.key}>
									<Icon
										name={sortKey === col.key && sortDir === 'desc' ? 'arrow-down' : 'arrow-up'}
										size={11}
									/>
								</span>
							</button>
						{:else}
							{col.label}
						{/if}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if loading}
				{#each Array.from({ length: loadingRows }, (_, i) => i) as i (i)}
					<tr class="ember-loading-row">
						<td colspan={columns.length + (selectable ? 1 : 0)}>
							<div class="skeleton" style="height: 13px; width: {92 - (i % 3) * 9}%;"></div>
						</td>
					</tr>
				{/each}
			{:else if !view.length}
				<tr>
					<td colspan={columns.length + (selectable ? 1 : 0)}>
						{#if empty}{@render empty()}{:else}
							<EmptyState icon="filter" title={emptyTitle} description={emptyDescription} />
						{/if}
					</td>
				</tr>
			{:else}
				{#each view as row (rowId(row))}
					{@const id = rowId(row)}
					<tr
						class:clickable={!!onrowclick}
						class:selected={selected.includes(id)}
						role={onrowclick ? 'button' : undefined}
						tabindex={onrowclick ? 0 : undefined}
						onclick={(e) => maybeRowClick(row, e)}
						onkeydown={(e) => {
							if (onrowclick && (e.key === 'Enter' || e.key === ' ')) {
								e.preventDefault();
								onrowclick(row);
							}
						}}
					>
						{#if selectable}
							<td class="ember-check-cell">
								<input
									type="checkbox"
									class="checkbox"
									aria-label="Select row"
									checked={selected.includes(id)}
									onchange={() => toggleOne(id)}
								/>
							</td>
						{/if}
						{#each columns as col (col.key)}
							<td style="text-align: {col.align ?? 'left'};">
								{#if cell}{@render cell({ row, column: col, value: row?.[col.key] })}{:else}{row?.[col.key] ?? '—'}{/if}
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
	.ember-table-wrap { overflow-x: auto; }
	.ember-data-table :global(th.sortable) { padding: 0; }
	.ember-sort-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		background: none;
		border: none;
		padding: 0.55rem 0.7rem;
		font: inherit;
		color: inherit;
		cursor: pointer;
		border-radius: var(--radius-sm);
	}
	.ember-sort-btn:hover { color: var(--color-foreground); }
	.ember-sort-icon { display: inline-flex; opacity: 0.35; }
	.ember-sort-icon.active { opacity: 1; color: var(--color-primary); }
	.ember-check-cell { width: 34px; }
	.ember-data-table :global(tr.clickable) { cursor: pointer; }
	.ember-data-table :global(tr.selected td) { background: rgb(var(--tw-primary) / 0.05); }
	.ember-data-table :global(tr.ember-loading-row td) { padding-top: 0.7rem; padding-bottom: 0.7rem; }
</style>
