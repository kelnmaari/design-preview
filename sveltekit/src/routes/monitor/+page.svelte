<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import {
		Badge,
		Button,
		Card,
		Donut,
		Icon,
		LineChart,
		Progress,
		Segmented,
		StatCard,
		reveal,
		seededRandom,
		toast,
		type IconName
	} from '$lib/ember/index.js';

	interface Worker {
		name: string;
		models: number;
		vram: number;
		vramLabel: string;
		status: 'Healthy' | 'Degraded';
		requests: string;
	}

	const WORKERS: Worker[] = [
		{ name: 'worker-01', models: 14, vram: 62, vramLabel: '30 / 48 GB', status: 'Healthy', requests: '31.2k' },
		{ name: 'worker-02', models: 18, vram: 79, vramLabel: '38 / 48 GB', status: 'Healthy', requests: '40.8k' },
		{ name: 'worker-03', models: 10, vram: 91, vramLabel: '44 / 48 GB', status: 'Degraded', requests: '12.2k' }
	];

	interface LogEvent {
		id: number;
		icon: IconName;
		tone: 'success' | 'primary' | 'amber';
		html: string;
		time: string;
	}

	const EVENT_POOL: Array<Omit<LogEvent, 'id' | 'time'>> = [
		{ icon: 'key', tone: 'success', html: '<b>Alex Kim</b> created key <code>Staging · E2E</code>' },
		{ icon: 'microchip', tone: 'primary', html: '<b>Jordan Ng</b> deployed <code>qwen2.5-coder</code>' },
		{ icon: 'triangle-exclamation', tone: 'amber', html: 'Rate limit hit on <code>Staging · CI</code> — throttled' },
		{ icon: 'upload', tone: 'primary', html: '<b>Sasha Rivera</b> uploaded <code>runbook.pdf</code> to RAG' },
		{ icon: 'refresh', tone: 'primary', html: 'Model <code>llama-3.1-70b</code> reloaded on worker-02' },
		{ icon: 'circle-check', tone: 'success', html: 'Nightly eval suite passed <code>96.4%</code>' }
	];

	// Deterministic initial state — SSR and client render identically.
	const rnd = seededRandom(42);
	const seedLatency = () =>
		Array.from({ length: 40 }, (_, i) => 340 + Math.sin(i / 5) * 60 + rnd() * 90);
	const seedBars = () => Array.from({ length: 24 }, () => 24 + Math.round(rnd() * 68));

	let live = $state(true);
	let range = $state('5m');
	let tps = $state(142);
	let p99 = $state(1.18);
	let errRate = $state(0.02);
	let latency = $state<number[]>(seedLatency());
	let bars = $state<number[]>(seedBars());
	let events = $state<LogEvent[]>([
		{ id: 1, ...EVENT_POOL[0], time: '09:12:41' },
		{ id: 2, ...EVENT_POOL[2], time: '09:11:03' },
		{ id: 3, ...EVENT_POOL[1], time: '09:08:57' },
		{ id: 4, ...EVENT_POOL[4], time: '09:04:12' }
	]);
	let eventId = 100;
	let poolIdx = 0;

	const TONE_VAR: Record<LogEvent['tone'], string> = {
		success: 'success',
		primary: 'primary',
		amber: 'amber'
	};

	let timers: ReturnType<typeof setInterval>[] = [];

	function tick() {
		if (!live) return;
		tps = Math.max(60, Math.round(tps + (rnd() - 0.48) * 22));
		p99 = Math.min(4, Math.max(0.4, p99 + (rnd() - 0.5) * 0.14));
		errRate = Math.min(2, Math.max(0, errRate + (rnd() - 0.52) * 0.02));
		latency = [...latency.slice(1), 340 + Math.sin(Date.now() / 9000) * 60 + rnd() * 90];
		bars = [...bars.slice(1), 24 + Math.round(rnd() * 68)];
	}

	function pushEvent() {
		if (!live) return;
		const tpl = EVENT_POOL[poolIdx++ % EVENT_POOL.length];
		events = [{ id: ++eventId, ...tpl, time: new Date().toLocaleTimeString('en-GB') }, ...events].slice(0, 7);
	}

	onMount(() => {
		timers = [setInterval(tick, 1000), setInterval(pushEvent, 3200)];
	});
	onDestroy(() => timers.forEach(clearInterval));
</script>

<svelte:head>
	<title>Ember · Monitor (SvelteKit)</title>
</svelte:head>

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">Platform</div>
		<h1 class="page-title">Monitor</h1>
		<p class="page-subtitle">Live gateway telemetry — simulated client-side, seeded for SSR.</p>
	</div>
	<div class="flex gap-2 items-center">
		<span class="flex items-center gap-2 text-xs text-muted-foreground">
			<span class="pulse-dot" style={live ? '' : 'animation:none;opacity:.4;'}></span> {live ? 'live' : 'paused'}
		</span>
		<Segmented options={[{ value: '1m', label: '1m' }, { value: '5m', label: '5m' }, { value: '15m', label: '15m' }]} bind:value={range} />
		<Button variant="outline" size="sm" onclick={() => (live = !live)}>
			<Icon name={live ? 'pause' : 'play'} size={13} /> {live ? 'Pause' : 'Resume'}
		</Button>
	</div>
</div>

<div class="grid grid-4 mb-4">
	<div use:reveal><StatCard label="Throughput" value="{tps} rps" icon="activity" iconClass="bg-primary/10 text-primary" /></div>
	<div use:reveal={{ delay: 70 }}><StatCard label="p99 latency" value="{p99.toFixed(2)}s" icon="timer" iconClass="bg-amber/10 text-amber" /></div>
	<div use:reveal={{ delay: 140 }}><StatCard label="Error rate" value="{errRate.toFixed(2)}%" icon="triangle-exclamation" iconClass="bg-destructive/10 text-destructive" /></div>
	<div use:reveal={{ delay: 210 }}><StatCard label="Active workers" value="3 / 3" icon="server" iconClass="bg-success/10 text-success" /></div>
</div>

<div class="grid grid-2 mb-4">
	<Card title="Latency p50" description="Milliseconds · updates every second" spotlight>
		<LineChart id="lat" data={latency} label="p50 latency" format={(v) => `${Math.round(v)}ms`} />
	</Card>
	<Card title="Throughput" description="Requests per minute · {range} window" spotlight>
		<div class="bars">
			{#each bars as h, i (i)}
				<div class="bar" style="height:{h}%;opacity:{h > 70 ? 0.8 : 0.55};"></div>
			{/each}
		</div>
		<div class="flex justify-between mt-2 text-xs text-subtle font-mono">
			<span>-{range}</span><span>now</span>
		</div>
	</Card>
</div>

<div class="grid grid-2 mb-4">
	<Card title="Traffic by model" description="Share of requests · last hour">
		<Donut
			segments={[
				{ label: 'gpt-4o-mini', value: 46, color: '#F43F5E' },
				{ label: 'claude-3.5-sonnet', value: 27, color: '#F59E0B' },
				{ label: 'llama-3.1-70b', value: 17, color: '#E879F9' },
				{ label: 'qwen2.5-coder', value: 10, color: '#22D3EE' }
			]}
			centerValue="84k"
			centerLabel="requests"
		/>
	</Card>
	<Card title="Workers" description="3 nodes · 42 models loaded">
		{#snippet headerExtra()}
			<Badge variant="success" dot>Operational</Badge>
		{/snippet}
		<div class="stack">
			{#each WORKERS as w (w.name)}
				<div class="worker-row">
					<div class="flex items-center justify-between mb-2">
						<div class="flex items-center gap-2">
							<Icon name="server" size={13} class="text-muted-foreground" />
							<code class="code-chip">{w.name}</code>
							<span class="text-xs text-subtle">{w.models} models</span>
						</div>
						<Badge variant={w.status === 'Healthy' ? 'success' : 'amber'} dot={w.status === 'Healthy'}>{w.status}</Badge>
					</div>
					<div class="flex justify-between text-xs mb-2">
						<span class="text-muted-foreground">VRAM · {w.vramLabel}</span>
						<span class="font-mono">{w.requests} req</span>
					</div>
					<Progress value={w.vram} tone={w.vram > 85 ? 'primary' : 'ember'} />
				</div>
			{/each}
		</div>
	</Card>
</div>

<Card title="Event log" description="Deployments, keys, limits — streaming">
	{#snippet headerExtra()}
		<Button variant="ghost" size="sm" onclick={() => toast.info('Exported', 'events.json downloaded (demo).')}>
			<Icon name="download" size={13} /> Export
		</Button>
	{/snippet}
	<div class="feed">
		{#each events as e (e.id)}
			<div class="feed-item">
				<div
					class="feed-dot"
					style="background:rgb(var(--tw-{e.tone === 'primary' ? 'primary' : e.tone === 'success' ? 'success' : 'amber'}) / .12);color:var(--color-{e.tone === 'primary' ? 'primary' : e.tone});border-color:rgb(var(--tw-{e.tone === 'primary' ? 'primary' : e.tone === 'success' ? 'success' : 'amber'}) / .25);"
				>
					<Icon name={e.icon} size={12} />
				</div>
				<div class="min-w-0 flex-1">
					<div class="text-sm">{@html e.html}</div>
					<div class="text-xs text-subtle font-mono">{e.time}</div>
				</div>
			</div>
		{/each}
	</div>
</Card>

<style>
	.bars {
		animation: none;
	}
	.bar {
		transition: height 0.8s var(--ease-out);
	}
	.worker-row {
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-card);
	}
</style>
