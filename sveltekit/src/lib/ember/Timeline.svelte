<script lang="ts">
	export interface TimelineItem {
		time?: string;
		title: string;
		desc?: string;
		tone?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';
	}

	interface Props {
		items: TimelineItem[];
	}

	let { items }: Props = $props();
</script>

<ol class="ember-timeline">
	{#each items as item, i (item.title + i)}
		<li class="ember-tl-item">
			<span class="ember-tl-dot tone-{item.tone ?? 'primary'}" aria-hidden="true"></span>
			{#if i < items.length - 1}<span class="ember-tl-line" aria-hidden="true"></span>{/if}
			<div class="ember-tl-body">
				{#if item.time}<div class="ember-tl-time">{item.time}</div>{/if}
				<div class="ember-tl-title">{item.title}</div>
				{#if item.desc}<div class="ember-tl-desc">{item.desc}</div>{/if}
			</div>
		</li>
	{/each}
</ol>

<style>
	.ember-timeline { list-style: none; margin: 0; padding: 0; }
	.ember-tl-item { position: relative; padding: 0 0 1.1rem 1.4rem; }
	.ember-tl-item:last-child { padding-bottom: 0; }
	.ember-tl-dot {
		position: absolute;
		left: 0;
		top: 3px;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--color-primary);
		box-shadow: 0 0 0 3px rgb(var(--tw-primary) / 0.15);
	}
	.ember-tl-dot.tone-success { background: var(--color-success); box-shadow: 0 0 0 3px rgb(var(--tw-success) / 0.15); }
	.ember-tl-dot.tone-info { background: var(--color-info); box-shadow: 0 0 0 3px rgb(var(--tw-info) / 0.15); }
	.ember-tl-dot.tone-warning { background: var(--color-amber); box-shadow: 0 0 0 3px rgb(var(--tw-amber) / 0.15); }
	.ember-tl-dot.tone-danger { background: var(--color-destructive); box-shadow: 0 0 0 3px rgb(var(--tw-destructive) / 0.15); }
	.ember-tl-dot.tone-muted { background: var(--color-border-strong); box-shadow: none; }
	.ember-tl-line {
		position: absolute;
		left: 4px;
		top: 16px;
		bottom: 2px;
		width: 1px;
		background: var(--color-border-strong);
	}
	.ember-tl-time { font-family: var(--font-mono); font-size: 10.5px; color: var(--color-subtle); }
	.ember-tl-title { font-size: 13px; font-weight: 500; margin-top: 1px; }
	.ember-tl-desc { font-size: 12.5px; color: var(--color-muted-foreground); margin-top: 2px; line-height: 1.55; }
</style>
