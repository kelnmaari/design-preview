<script lang="ts">
	import {
		Alert,
		Button,
		Card,
		ConfirmDialog,
		EmptyState,
		ErrorState,
		Icon,
		PageHeader,
		Popover,
		SectionTitle,
		Skeleton,
		Spinner,
		Tooltip,
		reveal,
		sleep,
		toast
	} from '$lib/ember/index.js';

	let confirmSimple = $state(false);
	let confirmStrict = $state(false);
	let confirming = $state(false);

	async function destroy() {
		confirming = true;
		await sleep(900);
		confirming = false;
		toast.success('Tenant deleted', 'OldCorp is gone for good.');
	}
</script>

<svelte:head>
	<title>Ember · Overlay & feedback components (SvelteKit)</title>
</svelte:head>

<PageHeader
	eyebrow="Components · Overlays"
	title="Overlays & feedback"
	subtitle="Alerts, tooltips, popovers, confirmations, toasts and async states."
/>

<div class="block" use:reveal>
	<SectionTitle title="Alert" />
	<div class="stack">
		<Alert variant="info" title="New model available" description="Qwen 3 32B finished downloading and passed smoke tests.">
			<Button variant="outline" size="sm">View details</Button>
			<Button variant="ghost" size="sm">Dismiss</Button>
		</Alert>
		<div class="grid grid-3 gap-3">
			<Alert variant="success" title="Deploy finished" description="v2.4.1 · 3 replicas healthy." dismissible />
			<Alert variant="warning" title="VRAM pressure" description="worker-03 at 92% — rebalance soon." dismissible />
			<Alert variant="danger" title="Eval failed" description="faithfulness < 0.7 on 3 cases." dismissible />
		</div>
	</div>
</div>

<div class="block" use:reveal>
	<SectionTitle title="Tooltip · Popover" />
	<div class="grid grid-2 gap-3">
		<Card title="Tooltip" description="CSS-only, 4 positions, focus-visible too">
			<div class="flex gap-2 items-center" style="flex-wrap: wrap;">
				<Tooltip text="Deletes are permanent" position="top"><Button variant="outline" size="sm">Top</Button></Tooltip>
				<Tooltip text="Resolved from live tokens" position="bottom"><Button variant="outline" size="sm">Bottom</Button></Tooltip>
				<Tooltip text="Narrow context hint" position="left"><Button variant="outline" size="sm">Left</Button></Tooltip>
				<Tooltip text="Extra actions live here" position="right"><Button variant="outline" size="sm">Right</Button></Tooltip>
			</div>
		</Card>
		<Card title="Popover" description="click trigger, outside-click + Esc close">
			<div class="flex gap-2 items-center" style="flex-wrap: wrap;">
				<Popover title="Retention policy">
					{#snippet trigger({ toggle })}
						<Button variant="outline" size="sm" onclick={toggle}><Icon name="circle-info" size={13} /> Policy</Button>
					{/snippet}
					Raw prompts are kept for 30 days, embeddings for 90. Nothing leaves the cluster.
				</Popover>
				<Popover title="Keyboard" side="top" align="end">
					{#snippet trigger({ open, toggle })}
						<Button variant="ghost" size="sm" onclick={toggle}>
							{open ? 'Hide' : 'Show'} shortcuts
						</Button>
					{/snippet}
					Press <b>⌘K</b> anywhere to open the command palette.
				</Popover>
			</div>
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<SectionTitle title="ConfirmDialog · Toasts" />
	<div class="grid grid-2 gap-3">
		<Card title="ConfirmDialog" description="destructive by default, type-to-confirm option">
			<div class="flex gap-2" style="flex-wrap: wrap;">
				<Button variant="destructive" size="sm" onclick={() => (confirmSimple = true)}>
					<Icon name="trash" size={13} /> Delete key…
				</Button>
				<Button variant="outline" size="sm" onclick={() => (confirmStrict = true)}>Delete tenant…</Button>
			</div>
			<p class="text-xs text-subtle mt-3">Rule: destructive actions confirm in a dialog, everything else in a toast.</p>
		</Card>
		<Card title="Toasts" description="mounted once in the layout">
			<div class="flex gap-2" style="flex-wrap: wrap;">
				<Button variant="outline" size="sm" onclick={() => toast.success('Saved', 'Preferences updated.')}>Success</Button>
				<Button variant="outline" size="sm" onclick={() => toast.info('Queued', 'Eval #412 will start soon.')}>Info</Button>
				<Button variant="outline" size="sm" onclick={() => toast.warning('Slow lane', 'worker-03 is saturated.')}>Warning</Button>
				<Button variant="outline" size="sm" onclick={() => toast.error('Deploy failed', 'worker-03 out of VRAM.')}>Error</Button>
			</div>
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<SectionTitle title="Empty · Error · Skeleton · Spinner" />
	<div class="grid grid-2 gap-3">
		<Card title="EmptyState / ErrorState" description="with actions">
			<div class="grid grid-2 gap-3">
				<EmptyState icon="server" title="No workers" description="They appear once they check in.">
					<Button variant="primary" size="sm">Add worker</Button>
				</EmptyState>
				<ErrorState
					title="Failed to load"
					description="worker-03 refused the connection."
					onretry={() => toast.info('Retrying…', 'worker-03')}
				/>
			</div>
		</Card>
		<Card title="Skeleton / Spinner" description="loading shapes">
			<div class="stack">
				<Skeleton count={3} />
				<div class="flex gap-3 items-center">
					<span class="flex gap-2 items-center"><Skeleton width="28px" height="28px" radius="50%" /><Skeleton width="120px" /></span>
					<Spinner size={14} /> <Spinner size={20} />
					<Button variant="primary" size="sm" disabled><Spinner size={13} /> Saving…</Button>
				</div>
			</div>
		</Card>
	</div>
</div>

<ConfirmDialog
	bind:open={confirmSimple}
	title="Delete key “nightly-eval”?"
	description="In-flight requests get 60 seconds to drain. This cannot be undone."
	confirmLabel="Delete key"
	onconfirm={() => toast.success('Key deleted', 'nightly-eval')}
/>

<ConfirmDialog
	bind:open={confirmStrict}
	title="Delete tenant “OldCorp”?"
	description="Removes 6 users, 11 keys and all usage history."
	confirmLabel="Delete permanently"
	requireText="oldcorp"
	loading={confirming}
	onconfirm={destroy}
/>

<style>
	.block { margin-bottom: 2.5rem; }
	.block:last-child { margin-bottom: 0; }
</style>
