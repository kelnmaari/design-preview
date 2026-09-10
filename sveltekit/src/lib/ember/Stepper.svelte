<script lang="ts">
	import Icon from './Icon.svelte';

	export interface Step {
		label: string;
		desc?: string;
	}

	interface Props {
		steps: Step[];
		current?: number;
		orientation?: 'horizontal' | 'vertical';
		clickable?: boolean;
		ongoto?: (index: number) => void;
	}

	let {
		steps,
		current = $bindable(0),
		orientation = 'horizontal',
		clickable = false,
		ongoto
	}: Props = $props();

	function go(i: number) {
		if (!clickable) return;
		current = i;
		ongoto?.(i);
	}
</script>

<ol class="ember-steps" class:vertical={orientation === 'vertical'} aria-label="Progress">
	{#each steps as s, i (s.label + i)}
		{@const state = i < current ? 'done' : i === current ? 'current' : 'todo'}
		<li class="ember-step {state}">
			<button
				class="ember-step-btn"
				disabled={!clickable}
				aria-current={state === 'current' ? 'step' : undefined}
				onclick={() => go(i)}
			>
				<span class="ember-step-dot">
					{#if state === 'done'}<Icon name="check" size={11} />{:else}{i + 1}{/if}
				</span>
				<span class="ember-step-text">
					<span class="ember-step-label">{s.label}</span>
					{#if s.desc}<span class="ember-step-desc">{s.desc}</span>{/if}
				</span>
			</button>
			{#if i < steps.length - 1}<span class="ember-step-line" aria-hidden="true"></span>{/if}
		</li>
	{/each}
</ol>

<style>
	.ember-steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: flex-start;
	}
	.ember-step { display: flex; align-items: flex-start; flex: 1; min-width: 0; }
	.ember-step:last-child { flex: none; }
	.ember-step-btn {
		display: flex;
		align-items: flex-start;
		gap: 0.55rem;
		background: none;
		border: none;
		padding: 0;
		text-align: left;
		color: var(--color-foreground);
	}
	.ember-step-btn:not(:disabled) { cursor: pointer; }
	.ember-step-dot {
		display: inline-grid;
		place-items: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		font-size: 11px;
		font-weight: 600;
		font-family: var(--font-mono);
		flex: none;
		background: var(--color-muted);
		color: var(--color-subtle);
		border: 1px solid var(--color-border-strong);
	}
	.ember-step.current .ember-step-dot {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: #fff;
		box-shadow: 0 0 0 3px rgb(var(--tw-primary) / 0.18);
	}
	.ember-step.done .ember-step-dot {
		background: rgb(var(--tw-success) / 0.12);
		border-color: var(--color-success);
		color: var(--color-success);
	}
	.ember-step-text { display: flex; flex-direction: column; min-width: 0; padding-top: 1px; }
	.ember-step-label { font-size: 12.5px; font-weight: 500; }
	.ember-step.todo .ember-step-label { color: var(--color-subtle); font-weight: 400; }
	.ember-step-desc { font-size: 11px; color: var(--color-subtle); margin-top: 1px; }
	.ember-step-line {
		flex: 1;
		height: 1px;
		background: var(--color-border-strong);
		margin: 11px 0.6rem 0;
		min-width: 12px;
	}
	.ember-step.done .ember-step-line { background: var(--color-success); }
	.ember-steps.vertical { flex-direction: column; align-items: stretch; }
	.ember-steps.vertical .ember-step { flex-direction: column; }
	.ember-steps.vertical .ember-step:last-child { flex-direction: column; }
	.ember-steps.vertical .ember-step-line {
		width: 1px;
		height: 18px;
		flex: none;
		margin: 0.3rem 0 0.3rem 11px;
	}
</style>
