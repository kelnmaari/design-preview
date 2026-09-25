<script lang="ts">
	interface Props {
		/** выбранная дата */
		value?: Date;
		min?: Date;
		max?: Date;
	}

	let { value = $bindable(undefined), min, max }: Props = $props();

	const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const WD = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

	function startOfMonth(d: Date) {
		return new Date(d.getFullYear(), d.getMonth(), 1);
	}
	function sameDay(a: Date | undefined, b: Date) {
		return !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
	}

	// SSR-безопасно: сетка строится только на клиенте
	let view = $state<Date | null>(value ? startOfMonth(value) : null);
	$effect(() => {
		if (!view) view = startOfMonth(new Date());
	});

	const cells = $derived.by(() => {
		if (!view) return [];
		const first = new Date(view.getFullYear(), view.getMonth(), 1);
		const startIdx = (first.getDay() + 6) % 7; // Monday = 0
		const out: { date: Date; other: boolean }[] = [];
		for (let i = 0; i < 42; i++) {
			const d = new Date(view.getFullYear(), view.getMonth(), 1 - startIdx + i);
			out.push({ date: d, other: d.getMonth() !== view.getMonth() });
		}
		return out;
	});

	function disabled(d: Date) {
		if (min && d < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
		if (max && d > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
		return false;
	}
</script>

<div class="kit-calendar card card-body" style="width:280px;">
	<div class="kit-cal-head">
		<button class="btn btn-ghost btn-icon btn-sm" aria-label="Previous month" onclick={() => view && (view = new Date(view.getFullYear(), view.getMonth() - 1, 1))}>
			<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 6-6 6 6 6" /></svg>
		</button>
		<span class="text-sm font-semibold">{view ? MONTHS[view.getMonth()] : ''} {view ? view.getFullYear() : ''}</span>
		<button class="btn btn-ghost btn-icon btn-sm" aria-label="Next month" onclick={() => view && (view = new Date(view.getFullYear(), view.getMonth() + 1, 1))}>
			<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 6 6 6-6 6" /></svg>
		</button>
	</div>
	{#if view}
		<div class="kit-cal-grid">
			{#each WD as w (w)}
				<span class="kit-cal-wd">{w}</span>
			{/each}
			{#each cells as c (c.date.getTime())}
				{@const other = c.other}
				{@const selected = sameDay(value, c.date)}
				{@const today = sameDay(new Date(), c.date)}
				{@const off = disabled(c.date)}
				<button
					type="button"
					class="kit-cal-day"
					class:other
					class:selected
					class:today={!selected && today}
					disabled={off}
					onclick={() => (value = c.date)}
				>
					{c.date.getDate()}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.kit-cal-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 8px;
	}
	.kit-cal-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
		text-align: center;
	}
	.kit-cal-wd {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-subtle);
		padding: 4px 0;
	}
	.kit-cal-day {
		appearance: none;
		background: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		color: var(--color-foreground);
		font-size: 12px;
		font-family: var(--font-sans);
		padding: 5px 0;
		cursor: pointer;
	}
	.kit-cal-day:hover:not(:disabled) {
		background: var(--color-accent);
	}
	.kit-cal-day.other {
		color: var(--color-subtle);
		opacity: 0.55;
	}
	.kit-cal-day.today {
		border-color: var(--color-border-strong);
	}
	.kit-cal-day.selected {
		background: rgb(var(--tw-primary) / 0.9);
		border-color: transparent;
		color: #fff;
		font-weight: 600;
	}
	.kit-cal-day:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
</style>
