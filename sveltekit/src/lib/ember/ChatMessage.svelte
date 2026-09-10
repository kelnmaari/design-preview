<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';

	export interface ChatSource {
		title: string;
		page?: string | number;
	}

	interface Props {
		role: 'user' | 'assistant' | 'system';
		/** Plain-text content. For rich/markdown output use `children` instead. */
		text?: string;
		streaming?: boolean;
		sources?: ChatSource[];
		model?: string;
		time?: string;
		showActions?: boolean;
		children?: Snippet;
		oncopy?: (text: string) => void;
		onlike?: () => void;
		ondislike?: () => void;
		onsource?: (source: ChatSource) => void;
	}

	let {
		role,
		text = '',
		streaming = false,
		sources = [],
		model,
		time,
		showActions,
		children,
		oncopy,
		onlike,
		ondislike,
		onsource
	}: Props = $props();

	const actions = $derived(showActions ?? (role === 'assistant' && !streaming));
</script>

<div class="ember-msg ember-msg-{role}">
	<div class="ember-msg-avatar" aria-hidden="true">
		{#if role === 'user'}<Icon name="user" size={13} />{:else}<Icon name="sparkles" size={13} />{/if}
	</div>
	<div class="ember-msg-main">
		<div class="ember-msg-head">
			<span class="ember-msg-name">{role === 'user' ? 'You' : role === 'assistant' ? (model ?? 'Assistant') : 'System'}</span>
			{#if time}<span class="ember-msg-time">{time}</span>{/if}
			{#if streaming}<span class="ember-msg-live"><span class="ember-live-dot"></span>live</span>{/if}
		</div>
		<div class="ember-msg-bubble">
			{#if children}{@render children()}{:else}<p>{text}</p>{/if}
			{#if streaming}<span class="ember-caret" aria-hidden="true"></span>{/if}
		</div>
		{#if sources.length}
			<div class="ember-msg-sources">
				{#each sources as s, i (s.title + i)}
					<button class="ember-source-chip" onclick={() => onsource?.(s)}>
						<Icon name="book" size={11} /> {s.title}{#if s.page}<span class="ember-source-page">p.{s.page}</span>{/if}
					</button>
				{/each}
			</div>
		{/if}
		{#if actions}
			<div class="ember-msg-actions">
				<button class="btn btn-ghost btn-icon btn-sm" aria-label="Copy message" onclick={() => oncopy?.(text)}>
					<Icon name="copy" size={12} />
				</button>
				<button class="btn btn-ghost btn-icon btn-sm" aria-label="Good response" onclick={() => onlike?.()}>
					<Icon name="thumbs-up" size={12} />
				</button>
				<button class="btn btn-ghost btn-icon btn-sm" aria-label="Bad response" onclick={() => ondislike?.()}>
					<Icon name="thumbs-down" size={12} />
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.ember-msg { display: flex; gap: 0.65rem; max-width: 100%; }
	.ember-msg-avatar {
		display: inline-grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border-radius: 8px;
		flex: none;
		background: var(--color-muted);
		color: var(--color-muted-foreground);
	}
	.ember-msg-user .ember-msg-avatar { background: rgb(var(--tw-info) / 0.12); color: var(--color-info); }
	.ember-msg-assistant .ember-msg-avatar {
		background-image: linear-gradient(135deg, #f59e0b, #f43f5e);
		color: #fff;
	}
	.ember-msg-main { flex: 1; min-width: 0; }
	.ember-msg-head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
	.ember-msg-name { font-size: 12px; font-weight: 600; }
	.ember-msg-time { font-family: var(--font-mono); font-size: 10.5px; color: var(--color-subtle); }
	.ember-msg-live {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 10.5px;
		font-weight: 600;
		color: var(--color-success);
	}
	.ember-live-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-success);
		animation: ember-msg-blink 1.2s ease-in-out infinite;
	}
	.ember-msg-bubble {
		font-size: 13px;
		line-height: 1.65;
		color: var(--color-foreground);
		overflow-wrap: break-word;
	}
	.ember-msg-user .ember-msg-bubble {
		background: var(--color-muted);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 0.5rem 0.7rem;
		width: fit-content;
		max-width: 100%;
	}
	.ember-msg-bubble p { margin: 0; white-space: pre-wrap; }
	.ember-caret {
		display: inline-block;
		width: 7px;
		height: 13px;
		margin-left: 2px;
		vertical-align: -2px;
		border-radius: 1px;
		background: var(--color-primary);
		animation: ember-caret-blink 1s steps(1) infinite;
	}
	.ember-msg-sources { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.5rem; }
	.ember-source-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 11px;
		font-family: var(--font-mono);
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		background: var(--color-muted);
		border: 1px solid var(--color-border);
		color: var(--color-muted-foreground);
		cursor: pointer;
	}
	.ember-source-chip:hover { border-color: var(--color-primary); color: var(--color-foreground); }
	.ember-source-page { color: var(--color-subtle); }
	.ember-msg-actions { display: flex; gap: 0.15rem; margin-top: 0.35rem; opacity: 0; transition: opacity var(--dur-fast) ease; }
	.ember-msg:hover .ember-msg-actions,
	.ember-msg:focus-within .ember-msg-actions { opacity: 1; }
	@keyframes ember-msg-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
</style>
