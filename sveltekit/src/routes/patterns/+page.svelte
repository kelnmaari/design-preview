<script lang="ts">
	import {
		Badge,
		Button,
		Card,
		EmptyState,
		Icon,
		Modal,
		Switch,
		TextField,
		reveal,
		sleep,
		toast
	} from '$lib/ember/index.js';

	/* ---- validation demo ---- */
	let email = $state('');
	let emailError = $state('');
	let password = $state('');
	let passwordError = $state('');

	function validate() {
		emailError = /.+@.+\..+/.test(email) ? '' : 'Enter a valid email address.';
		passwordError = password.length >= 8 ? '' : 'Password must be at least 8 characters.';
		if (!emailError && !passwordError) {
			toast.success('Account created', email);
			email = '';
			password = '';
		}
	}

	/* ---- async-state machine demo ---- */
	type AsyncState = 'loading' | 'data' | 'empty' | 'error';
	let asyncState = $state<AsyncState>('data');
	const DEMO_ROWS = [
		{ name: 'gateway-worker-01', meta: 'healthy · 14 models' },
		{ name: 'gateway-worker-02', meta: 'healthy · 18 models' },
		{ name: 'gateway-worker-03', meta: 'degraded · 10 models' }
	];

	async function reload() {
		asyncState = 'loading';
		await sleep(1200);
		asyncState = 'data';
	}

	/* ---- confirm demo ---- */
	let confirmOpen = $state(false);

	const SHORTCUTS: Array<[string[], string]> = [
		[['⌘', 'K'], 'Open command palette'],
		[['esc'], 'Close dialog / palette / panel'],
		[['↵'], 'Run selected command'],
		[['↑', '↓'], 'Move in palette / lists'],
		[['Shift', '↵'], 'Newline in chat composer']
	];
</script>

<svelte:head>
	<title>Ember · Patterns (SvelteKit)</title>
</svelte:head>

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">System</div>
		<h1 class="page-title">Patterns</h1>
		<p class="page-subtitle">Recurring recipes: validation, async states, confirmations, feedback, shortcuts.</p>
	</div>
	<Badge variant="info">guide</Badge>
</div>

<div class="block" use:reveal>
	<div class="block-title">Forms & Validation</div>
	<div class="grid grid-2 gap-3">
		<Card title="Invite form" description="Inline errors, no page reload.">
			<div class="stack">
				<TextField label="Email" placeholder="teammate@company.io" bind:value={email} error={emailError} />
				<TextField label="Password" type="password" placeholder="••••••••" bind:value={password} error={passwordError} hint={passwordError ? '' : 'Min. 8 characters.'} />
				<div class="flex items-center gap-3">
					<Switch label="Send welcome email" checked />
					<span style="margin-left:auto;"></span>
					<Button variant="ember" size="sm" onclick={validate}>
						<Icon name="check" size={13} /> Create account
					</Button>
				</div>
				<p class="text-xs text-subtle">Try submitting empty fields to see error states.</p>
			</div>
		</Card>
		<Card title="Field states" description="Every TextField prop, side by side.">
			<div class="stack">
				<TextField label="Default" placeholder="Placeholder text…" hint="Helper hint lives here." />
				<TextField label="Error" value="not-an-email" error="Enter a valid email address." />
				<TextField label="Mono + readonly" value="sk-aigw-9f2e••••••••" mono readonly />
				<TextField label="Textarea" multiline rows={2} placeholder="Multi-line input…" />
			</div>
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<div class="block-title">Async States · loading / data / empty / error</div>
	<Card>
		{#snippet headerExtra()}
			<div class="flex gap-2">
				<Button variant="outline" size="sm" onclick={reload}><Icon name="refresh" size={13} /> Reload</Button>
				<Button variant="ghost" size="sm" onclick={() => (asyncState = 'empty')}>Empty</Button>
				<Button variant="ghost" size="sm" onclick={() => (asyncState = 'error')}>Error</Button>
			</div>
		{/snippet}
		{#if asyncState === 'loading'}
			<div class="stack" aria-busy="true">
				<div class="skeleton" style="height:14px;width:60%"></div>
				<div class="skeleton" style="height:14px;width:90%"></div>
				<div class="skeleton" style="height:14px;width:40%"></div>
			</div>
		{:else if asyncState === 'data'}
			<div class="stack">
				{#each DEMO_ROWS as r (r.name)}
					<div class="flex items-center gap-2 card" style="padding:.5rem .625rem;">
						<Icon name="server" size={13} class="text-muted-foreground" />
						<code class="code-chip">{r.name}</code>
						<span class="text-xs text-subtle" style="margin-left:auto;">{r.meta}</span>
					</div>
				{/each}
			</div>
		{:else if asyncState === 'empty'}
			<EmptyState icon="server" title="No workers registered" description="Workers appear here once they check in.">
				<Button variant="primary" size="sm" onclick={reload}><Icon name="refresh" size={13} /> Check again</Button>
			</EmptyState>
		{:else}
			<div class="empty-state">
				<div class="empty-icon" style="background:rgb(var(--tw-destructive) / .12);color:var(--color-destructive);">
					<Icon name="triangle-exclamation" size={20} />
				</div>
				<p class="text-sm font-medium">Failed to load workers</p>
				<p class="text-xs text-muted-foreground mt-2">worker-03 refused the connection · retry in a bit</p>
				<Button variant="outline" size="sm" class="mt-3" onclick={reload}><Icon name="refresh" size={13} /> Retry</Button>
			</div>
		{/if}
	</Card>
</div>

<div class="block" use:reveal>
	<div class="block-title">Confirmations & Feedback</div>
	<div class="grid grid-2 gap-3">
		<Card title="Destructive confirm" description="Modal + explicit action verb.">
			<div class="row">
				<Button variant="destructive" size="sm" onclick={() => (confirmOpen = true)}>
					<Icon name="trash" size={13} /> Delete tenant…
				</Button>
				<Button variant="outline" size="sm" onclick={() => toast.success('Saved', 'Preferences updated.')}>Toast: success</Button>
				<Button variant="outline" size="sm" onclick={() => toast.error('Deploy failed', 'worker-03 out of VRAM.')}>Toast: error</Button>
			</div>
			<div class="card mt-3 note-success">
				<div class="text-xs"><b>Rule:</b> destructive actions always confirm in a dialog; everything else confirms with a toast.</div>
			</div>
		</Card>
		<Card title="Keyboard shortcuts" description="The contract every page follows.">
			<div class="stack-tight">
				{#each SHORTCUTS as [keys, desc] (desc)}
					<div class="flex items-center gap-2 text-sm">
						<span class="flex gap-1" style="min-width:110px;">
							{#each keys as k (k)}<kbd>{k}</kbd>{/each}
						</span>
						<span class="text-muted-foreground">{desc}</span>
					</div>
				{/each}
			</div>
		</Card>
	</div>
</div>

<Modal bind:open={confirmOpen} title="Delete tenant “OldCorp”?" description="This permanently removes 6 users, 11 keys and all usage history.">
	<div class="card" style="background:rgb(var(--tw-destructive) / .06);border-color:rgb(var(--tw-destructive) / .25);padding:.625rem .75rem;">
		<div class="text-xs text-muted-foreground">Type <code class="code-chip">oldcorp</code> in production to confirm — skipped in this demo.</div>
	</div>
	{#snippet footer()}
		<Button variant="ghost" size="sm" onclick={() => (confirmOpen = false)}>Cancel</Button>
		<Button
			variant="destructive"
			size="sm"
			onclick={() => {
				confirmOpen = false;
				toast.success('Tenant deleted', 'OldCorp and its data are gone.');
			}}
		>
			<Icon name="trash" size={13} /> Delete permanently
		</Button>
	{/snippet}
</Modal>

<style>
	.block { margin-bottom: 2.5rem; }
	.block:last-child { margin-bottom: 0; }
	.block-title {
		font-size: 11px; font-weight: 600; text-transform: uppercase;
		letter-spacing: 0.08em; color: var(--color-muted-foreground);
		margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;
	}
	.block-title::after { content: ''; flex: 1; height: 1px; background: var(--color-border); }
	.row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
	.note-success {
		background: rgb(var(--tw-success) / 0.06);
		border-color: rgb(var(--tw-success) / 0.25);
		padding: 0.625rem 0.75rem;
	}
</style>
