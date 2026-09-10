<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Badge,
		Button,
		Dropdown,
		Icon,
		Progress,
		reveal,
		sleep,
		toast
	} from '$lib/ember/index.js';

	type Block = { kind: 'text'; text: string } | { kind: 'code'; code: string };
	interface Msg {
		id: number;
		role: 'user' | 'assistant';
		blocks: Block[];
		meta?: string;
	}

	interface Conv {
		id: number;
		title: string;
		meta: string;
	}

	const CONVS: Conv[] = [
		{ id: 1, title: 'Refactoring auth middleware', meta: '12 msgs · 2m ago' },
		{ id: 2, title: 'SQL query optimization', meta: '8 msgs · 1h ago' },
		{ id: 3, title: 'Draft API docs for v2', meta: '24 msgs · 3h ago' },
		{ id: 4, title: 'Debug WebSocket reconnect', meta: '31 msgs · yesterday' },
		{ id: 5, title: 'K8s deployment manifest', meta: '6 msgs · yesterday' }
	];

	const MODELS = [
		{ name: 'gpt-4o-mini', ctx: '128k', latency: '1.2s', tag: 'STABLE', tone: 'success' as const },
		{ name: 'claude-3.5-sonnet', ctx: '200k', latency: '2.1s', tag: 'STABLE', tone: 'success' as const },
		{ name: 'llama-3.1-70b', ctx: '128k', latency: '0.8s', tag: 'EXP', tone: 'amber' as const },
		{ name: 'qwen2.5-coder', ctx: '32k', latency: '0.9s', tag: 'CODE', tone: 'primary' as const }
	];

	const INTRO: Block[] = [
		{
			kind: 'text',
			text: 'Good instinct — single-responsibility will make each piece testable in isolation. Here is a clean three-layer split:'
		},
		{
			kind: 'code',
			code: '// 1. Extraction — pulls the raw token from the request\nfunc extractToken(r *http.Request) (string, error) {\n    auth := r.Header.Get("Authorization")\n    if !strings.HasPrefix(auth, "Bearer ") {\n        return "", ErrNoToken\n    }\n    return strings.TrimPrefix(auth, "Bearer "), nil\n}'
		},
		{
			kind: 'text',
			text: 'The key insight: each function returns an error, so the middleware becomes a short pipeline where any stage can short-circuit with a typed error. Want me to sketch the verifier and loader layers too?'
		}
	];

	const REPLIES = [
		'Layer two is the verifier — it takes the raw token string and returns typed claims. Keep crypto options (issuer, audience, clock skew) in one config struct so rotation is a single diff.',
		'For the loader, cache the user row by subject for ~60s. That turns every authenticated request into one cache hit instead of a DB round-trip, and revocation stays fast enough for most products.',
		'One more tip: log extraction failures at debug level but verification failures at warn — the second bucket is where credential-stuffing attempts show up in your dashboards.'
	];

	let activeConv = $state(1);
	let model = $state(MODELS[0]);
	let ragOn = $state(true);
	let composer = $state('');
	let streaming = $state(false);
	let typing = $state(false);
	let listOpen = $state(false);
	let ctxOpen = $state(false);
	let usage = $state(4218);
	let replyIdx = 0;
	let msgId = 100;

	let messages = $state<Msg[]>([
		{
			id: 1,
			role: 'user',
			blocks: [
				{
					kind: 'text',
					text: 'I\u2019m refactoring our JWT auth middleware. Right now it does three things in one function — extracts the token, verifies it, and loads the user. I want to split these into separate concerns. What\u2019s a clean structure?'
				}
			]
		}
	]);

	let threadEl: HTMLDivElement | undefined = $state();
	let textareaEl: HTMLTextAreaElement | undefined = $state();

	const activeTitle = $derived(CONVS.find((c) => c.id === activeConv)?.title ?? 'New chat');

	function scrollDown() {
		requestAnimationFrame(() => {
			threadEl?.scrollTo({ top: threadEl.scrollHeight, behavior: 'smooth' });
		});
	}

	async function streamReply(blocks: Block[]) {
		streaming = true;
		const msg: Msg = { id: ++msgId, role: 'assistant', blocks: [], meta: 'streaming…' };
		messages.push(msg);
		const t0 = performance.now();
		for (const b of blocks) {
			if (b.kind === 'code') {
				msg.blocks.push({ kind: 'code', code: b.code });
				scrollDown();
				await sleep(350);
			} else {
				const tb: Block = { kind: 'text', text: '' };
				msg.blocks.push(tb);
				// word-by-word stream (client-only: runs from onMount / send)
				for (const word of b.text.split(' ')) {
					if (tb.kind === 'text') tb.text += (tb.text ? ' ' : '') + word;
					if (Math.random() < 0.3) scrollDown();
					await sleep(12 + Math.random() * 26);
				}
				scrollDown();
				await sleep(220);
			}
		}
		msg.meta = `${((performance.now() - t0) / 1000).toFixed(1)}s · ${380 + Math.floor(Math.random() * 220)} tok`;
		usage += 240 + Math.floor(Math.random() * 200);
		streaming = false;
	}

	async function send() {
		const text = composer.trim();
		if (!text || streaming || typing) return;
		composer = '';
		if (textareaEl) textareaEl.style.height = 'auto';
		messages.push({ id: ++msgId, role: 'user', blocks: [{ kind: 'text', text }] });
		usage += Math.round(text.length / 4) + 120;
		scrollDown();
		typing = true;
		await sleep(900);
		typing = false;
		await streamReply([{ kind: 'text', text: REPLIES[replyIdx++ % REPLIES.length] }]);
	}

	function copyMsg(m: Msg) {
		const text = m.blocks.map((b) => (b.kind === 'text' ? b.text : b.code)).join('\n\n');
		navigator.clipboard?.writeText(text).catch(() => {});
		toast.success('Copied to clipboard', text.slice(0, 48));
	}

	function switchConv(c: Conv) {
		activeConv = c.id;
		listOpen = false;
		toast.info(c.title, 'Thread switching is a visual demo in this example.');
	}

	function switchModel(m: (typeof MODELS)[number]) {
		model = m;
		toast.info('Model switched', `${m.name} attached to this thread.`);
	}

	function autoresize() {
		if (!textareaEl) return;
		textareaEl.style.height = 'auto';
		textareaEl.style.height = Math.min(textareaEl.scrollHeight, 200) + 'px';
	}

	onMount(() => {
		streamReply(INTRO);
	});
</script>

<svelte:head>
	<title>Ember · Chat (SvelteKit)</title>
</svelte:head>

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">Workspace</div>
		<h1 class="page-title">Chat</h1>
		<p class="page-subtitle">Streaming thread, working composer, model switcher, RAG panel.</p>
	</div>
	<div class="flex gap-2">
		<span class="only-narrow">
			<Button variant="outline" size="sm" onclick={() => (listOpen = !listOpen)}>
				<Icon name="sidebar" size={13} /> Threads
			</Button>
		</span>
		<span class="only-mid">
			<Button variant="outline" size="sm" onclick={() => (ctxOpen = !ctxOpen)}>
				<Icon name="panel-right" size={13} /> Context
			</Button>
		</span>
	</div>
</div>

<div class="chat-card card" use:reveal>
	<!-- threads -->
	<aside class="pane threads" class:open={listOpen}>
		<div class="pane-head">
			<span class="eyebrow">Threads</span>
			<Button
				variant="ember"
				size="sm"
				iconOnly
				onclick={() => toast.success('New chat started', `Blank thread · ${model.name} attached.`)}
			>
				<Icon name="plus" size={13} />
			</Button>
		</div>
		<div class="threads-body">
			{#each CONVS as c (c.id)}
				<button class="conv-item" class:active={activeConv === c.id} onclick={() => switchConv(c)}>
					<div class="conv-title">{c.title}</div>
					<div class="conv-meta"><Icon name="comments" size={10} /> {c.meta}</div>
				</button>
			{/each}
		</div>
	</aside>

	<!-- thread -->
	<section class="pane thread">
		<div class="thread-head">
			<div class="thread-title">{activeTitle}</div>
			<Dropdown align="left">
				{#snippet trigger({ toggle })}
					<button class="thread-model-pill" onclick={toggle}>
						{model.name} <Icon name="chevron-down" size={10} />
					</button>
				{/snippet}
				<div class="menu-label">Switch model</div>
				{#each MODELS as m (m.name)}
					<button class="menu-item" onclick={() => switchModel(m)}>
						<Icon name="microchip" size={13} class="text-primary" />
						{m.name}
						<span style="margin-left:auto"><Badge variant={m.tone}>{m.tag}</Badge></span>
					</button>
				{/each}
			</Dropdown>
		</div>

		<div class="thread-body" bind:this={threadEl}>
			{#each messages as m (m.id)}
				<div class="msg">
					<div class="msg-avatar" class:user={m.role === 'user'} class:assistant={m.role === 'assistant'}>
						{m.role === 'user' ? 'AK' : 'E'}
					</div>
					<div class="msg-content">
						<div class="msg-role">
							{m.role === 'user' ? 'You' : 'Assistant'}
							{#if m.meta}<span class="msg-meta">· {m.meta}</span>{/if}
						</div>
						<div class="msg-body">
							{#each m.blocks as b, i (`${m.id}-${i}`)}
								{#if b.kind === 'text'}<p>{b.text}</p>{:else}<pre><code>{b.code}</code></pre>{/if}
							{/each}
							{#if m.role === 'assistant' && m.meta === 'streaming…'}<span class="stream-caret"></span>{/if}
						</div>
						<div class="msg-actions">
							<button onclick={() => copyMsg(m)} title="Copy" aria-label="Copy message"><Icon name="copy" size={13} /></button>
							{#if m.role === 'assistant'}
								<button onclick={() => toast.info('Regenerating', 'A fresh completion would stream here.')} title="Regenerate" aria-label="Regenerate"><Icon name="refresh" size={13} /></button>
								<button onclick={() => toast.success('Feedback saved', 'Thanks — this helps tune routing.')} title="Good response" aria-label="Good response"><Icon name="thumbs-up" size={13} /></button>
								<button onclick={() => toast.warning('Feedback saved', 'This thread was flagged for review.')} title="Bad response" aria-label="Bad response"><Icon name="thumbs-down" size={13} /></button>
							{/if}
						</div>
					</div>
				</div>
			{/each}
			{#if typing}
				<div class="msg">
					<div class="msg-avatar assistant">E</div>
					<div class="msg-content"><div class="typing-dots"><span></span><span></span><span></span></div></div>
				</div>
			{/if}
		</div>

		<div class="composer">
			<div class="composer-input">
				<textarea
					bind:this={textareaEl}
					bind:value={composer}
					oninput={autoresize}
					onkeydown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							send();
						}
					}}
					placeholder="Send a message…  (Enter to send · Shift+Enter for newline)"
					rows="1"
					aria-label="Message"
				></textarea>
				<div class="composer-bar">
					<button class="composer-tool" onclick={() => toast.info('Attachments', 'File picker isn’t wired in this example.')}>
						<Icon name="paperclip" size={14} /> Attach
					</button>
					<button
						class="composer-tool"
						class:on={ragOn}
						onclick={() => {
							ragOn = !ragOn;
							toast.info(ragOn ? 'RAG enabled' : 'RAG disabled', ragOn ? '3 sources attached.' : 'Chatting without retrieval.');
						}}
					>
						<Icon name="database" size={14} /> RAG
					</button>
					<button class="composer-tool" onclick={() => toast.info('Tools', 'MCP servers: GitLab · filesystem · search.')}>
						<Icon name="plug" size={14} /> Tools
					</button>
					<Button variant="ember" size="sm" class="composer-send" onclick={send} disabled={streaming || typing}>
						<Icon name="paper-plane" size={13} /> Send
					</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- context -->
	<aside class="pane ctx" class:open={ctxOpen}>
		<div class="ctx-section">
			<div class="eyebrow mb-2">Model</div>
			<div class="card card-body-compact" style="padding:.625rem;">
				<div class="flex items-center justify-between mb-2">
					<div class="flex items-center gap-2">
						<Icon name="microchip" size={14} class="text-primary" />
						<span class="text-sm font-semibold">{model.name}</span>
					</div>
					<Badge variant={model.tone}>{model.tag}</Badge>
				</div>
				<div class="grid grid-2 gap-1 text-xs">
					<div><span class="text-subtle">Context</span><br /><span class="font-mono">{model.ctx}</span></div>
					<div><span class="text-subtle">Latency</span><br /><span class="font-mono">{model.latency}</span></div>
				</div>
			</div>
		</div>
		<div class="ctx-section">
			<div class="flex items-center justify-between mb-2"><span class="eyebrow">Sources (RAG)</span><Badge variant="info">3</Badge></div>
			<div class="stack">
				{#each [['file', 'auth_middleware.go', '0.94 match'], ['file', 'token_service.go', '0.81 match'], ['book', 'JWT RFC 7519', '0.72 match']] as [icon, name, match] (name)}
					<div class="card card-body-compact" style="padding:.5rem .625rem;">
						<div class="flex items-center gap-2">
							<Icon name={icon} size={13} class="text-muted-foreground" />
							<span class="text-xs truncate">{name}</span>
						</div>
						<div class="text-xs text-subtle font-mono">{match}</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="ctx-section">
			<div class="eyebrow mb-2">Usage this thread</div>
			<div class="flex justify-between text-xs mb-2">
				<span class="text-muted-foreground">Tokens</span>
				<span class="font-mono">{usage.toLocaleString('en-US')} / 128k</span>
			</div>
			<Progress value={Math.max(2, usage / 1280)} animate={false} />
		</div>
	</aside>
</div>

<style>
	.chat-card {
		display: grid;
		grid-template-columns: 230px minmax(0, 1fr) 250px;
		height: calc(100dvh - 52px - 3rem - 110px);
		min-height: 520px;
		overflow: hidden;
		padding: 0;
	}
	.pane { min-height: 0; display: flex; flex-direction: column; }
	.threads { border-right: 1px solid var(--color-border); background: var(--color-card); }
	.pane-head {
		padding: 0.75rem; border-bottom: 1px solid var(--color-border);
		display: flex; align-items: center; justify-content: space-between;
	}
	.threads-body { flex: 1; overflow-y: auto; padding: 0.375rem; }
	.conv-item {
		display: block; width: 100%; text-align: left;
		padding: 0.5rem 0.625rem; border-radius: var(--radius-sm);
		margin-bottom: 1px; cursor: pointer;
		border: 1px solid transparent; font-family: var(--font-sans);
		transition: background-color 0.12s ease;
	}
	.conv-item:hover { background: var(--color-accent); }
	.conv-item.active { background: rgb(var(--tw-primary) / 0.1); border-color: rgb(var(--tw-primary) / 0.2); }
	.conv-item.active .conv-title { color: var(--color-primary); }
	.conv-title { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.conv-meta { font-size: 11px; color: var(--color-subtle); margin-top: 2px; display: flex; align-items: center; gap: 4px; }
	.thread { background: var(--color-background); min-width: 0; }
	.thread-head {
		height: 52px; flex: none; border-bottom: 1px solid var(--color-border);
		display: flex; align-items: center; gap: 0.6rem; padding: 0 1rem;
	}
	.thread-title { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.thread-model-pill {
		font-family: var(--font-mono); font-size: 11px;
		background: var(--color-muted); padding: 2px 7px;
		border-radius: var(--radius-sm); color: var(--color-muted-foreground);
		display: inline-flex; align-items: center; gap: 4px;
		border: 1px solid transparent; transition: all 0.15s ease;
	}
	.thread-model-pill:hover { border-color: var(--color-border-strong); color: var(--color-foreground); }
	.thread-body { flex: 1; overflow-y: auto; padding: 1.5rem 0; }
	.msg { max-width: 680px; margin: 0 auto 1.75rem; padding: 0 1.5rem; display: flex; gap: 0.875rem; }
	.msg-avatar {
		width: 30px; height: 30px; border-radius: 8px; flex: none;
		display: grid; place-items: center; font-size: 12px; font-weight: 600;
	}
	.msg-avatar.user { background: var(--color-secondary); color: var(--color-foreground); }
	.msg-avatar.assistant {
		background-image: linear-gradient(135deg, #f59e0b, #f43f5e);
		color: #fff; box-shadow: 0 2px 10px rgb(244 63 94 / 0.35);
	}
	.msg-content { flex: 1; min-width: 0; padding-top: 3px; }
	.msg-role { font-size: 12px; font-weight: 600; margin-bottom: 0.3rem; display: flex; align-items: center; gap: 0.5rem; }
	.msg-meta { font-size: 11px; color: var(--color-subtle); font-family: var(--font-mono); font-weight: 400; }
	.msg-body { font-size: 13.5px; line-height: 1.6; }
	.msg-body :global(p) { margin-bottom: 0.6rem; }
	.msg-body :global(pre) {
		font-family: var(--font-mono); font-size: 12px;
		background: var(--color-background); border: 1px solid var(--color-border);
		border-radius: var(--radius-sm); padding: 0.75rem;
		overflow-x: auto; margin: 0.6rem 0;
	}
	.msg-actions { display: flex; gap: 0.25rem; margin-top: 0.5rem; opacity: 0; transition: opacity 0.15s ease; }
	.msg:hover .msg-actions { opacity: 1; }
	.msg-actions button {
		width: 26px; height: 26px; border-radius: var(--radius-sm);
		display: grid; place-items: center; color: var(--color-subtle);
		transition: all 0.12s ease;
	}
	.msg-actions button:hover { background: var(--color-accent); color: var(--color-foreground); }
	.composer { flex: none; border-top: 1px solid var(--color-border); padding: 0.875rem 1.5rem 1rem; }
	.composer-input {
		background: var(--color-card); border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}
	.composer-input:focus-within {
		border-color: rgb(var(--tw-ring) / 0.5);
		box-shadow: 0 0 0 3px rgb(var(--tw-ring) / 0.12);
	}
	.composer-input textarea {
		width: 100%; background: transparent; border: none; outline: none;
		color: var(--color-foreground); font-family: var(--font-sans);
		font-size: 13.5px; line-height: 1.5;
		padding: 0.75rem 1rem; resize: none; min-height: 44px; max-height: 200px;
		display: block;
	}
	.composer-bar { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.5rem; flex-wrap: wrap; }
	.composer-tool {
		height: 28px; padding: 0 0.5rem; border-radius: var(--radius-sm);
		display: inline-flex; align-items: center; gap: 0.3rem;
		font-size: 12px; color: var(--color-muted-foreground);
		transition: all 0.12s ease; font-family: var(--font-sans);
	}
	.composer-tool:hover { background: var(--color-accent); color: var(--color-foreground); }
	.composer-tool.on { background: rgb(var(--tw-primary) / 0.12); color: var(--color-primary); }
	:global(.composer-send) { margin-left: auto; }
	.ctx { border-left: 1px solid var(--color-border); background: var(--color-card); overflow-y: auto; }
	.ctx-section { padding: 0.875rem 1rem; border-bottom: 1px solid var(--color-border); }
	.only-mid, .only-narrow { display: none; }
	@media (max-width: 1200px) {
		.chat-card { grid-template-columns: 230px minmax(0, 1fr); }
		.ctx {
			position: fixed; top: 0; right: 0; bottom: 0; width: 280px; z-index: 45;
			transform: translateX(105%); transition: transform 0.28s var(--ease-out);
			box-shadow: var(--shadow-lg);
		}
		.ctx.open { transform: none; }
		.only-mid { display: inline-flex; }
	}
	@media (max-width: 820px) {
		.chat-card { grid-template-columns: minmax(0, 1fr); }
		.threads {
			position: fixed; top: 0; left: 0; bottom: 0; width: 260px; z-index: 45;
			transform: translateX(-105%); transition: transform 0.28s var(--ease-out);
			box-shadow: var(--shadow-lg);
		}
		.threads.open { transform: none; }
		.only-narrow { display: inline-flex; }
		.msg { padding: 0 1rem; }
		.composer { padding: 0.75rem 1rem 1rem; }
	}
</style>
