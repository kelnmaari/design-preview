<script lang="ts">
	import {
		Accordion,
		Breadcrumb,
		Button,
		Card,
		ChatComposer,
		ChatMessage,
		Divider,
		Icon,
		Kbd,
		PageHeader,
		Rating,
		SectionTitle,
		Stepper,
		reveal,
		sleep,
		type AccordionItem,
		type ChatSource,
		type Crumb,
		type Step
	} from '$lib/ember/index.js';

	const CRUMBS: Crumb[] = [
		{ label: 'Components', href: '/components' },
		{ label: 'Content', href: '/components/content' },
		{ label: 'Headers & sections' }
	];

	const STEPS: Step[] = [
		{ label: 'Connect', desc: 'Pick a provider' },
		{ label: 'Index', desc: 'Upload documents' },
		{ label: 'Tune', desc: 'Prompts & evals' },
		{ label: 'Ship', desc: 'Go live' }
	];
	let step = $state(1);

	const FAQ: AccordionItem[] = [
		{ title: 'Which models are supported?', badge: 'new', body: 'Any OpenAI-compatible endpoint, plus local GGUF via the sidecar. Streaming works everywhere.' },
		{ title: 'Where is data stored?', body: 'Chunks live in Postgres + pgvector inside your cluster. Nothing is sent anywhere unless you configure a remote provider.' },
		{ title: 'How do evals run?', body: 'Nightly, on a sampled slice. Failures open an incident with the offending cases attached.' }
	];

	let rating = $state(4);

	/* ---- mini chat demo ---- */
	interface Msg {
		id: number;
		role: 'user' | 'assistant';
		text: string;
		sources?: ChatSource[];
	}
	let mid = 0;
	let messages = $state<Msg[]>([
		{ id: mid++, role: 'assistant', text: 'Hey! I can search your 1,204 indexed chunks. Ask me anything.' }
	]);
	let thinking = $state(false);

	async function ask(text: string) {
		messages = [...messages, { id: mid++, role: 'user', text }];
		thinking = true;
		await sleep(500);
		const reply: Msg = {
			id: mid++,
			role: 'assistant',
			text: `Found 3 chunks relevant to “${text.length > 48 ? text.slice(0, 48) + '…' : text}”. This is a demo reply — wire onsend to your RAG endpoint.`,
			sources: [
				{ title: 'architecture.md', page: 2 },
				{ title: 'runbook.md', page: 7 }
			]
		};
		messages = [...messages, reply];
		thinking = false;
	}
</script>

<svelte:head>
	<title>Ember · Content components (SvelteKit)</title>
</svelte:head>

<PageHeader
	eyebrow="Components · Content"
	title="Content"
	subtitle="Headers, navigation, disclosure, chat — everything composes from these blocks."
/>

<div class="block" use:reveal>
	<SectionTitle title="PageHeader · SectionTitle · Breadcrumb" />
	<Card>
		<Breadcrumb items={CRUMBS} />
		<Divider />
		<PageHeader eyebrow="Live demo" title="Headers everywhere" subtitle="PageHeader renders the eyebrow/title/subtitle row plus actions.">
			{#snippet actions()}
				<Button variant="outline" size="sm"><Icon name="copy" size={13} /> Copy</Button>
				<Button variant="ember" size="sm"><Icon name="rocket" size={13} /> Ship</Button>
			{/snippet}
		</PageHeader>
		<Divider label="sections" />
		<SectionTitle title="SectionTitle pattern">
			<Button variant="ghost" size="sm">Extra action →</Button>
		</SectionTitle>
		<p class="text-sm text-muted-foreground">Uppercase micro-label, hairline rule, optional trailing actions.</p>
	</Card>
</div>

<div class="block" use:reveal>
	<SectionTitle title="Stepper · Accordion" />
	<div class="grid grid-2 gap-3">
		<Card title="Stepper" description="clickable + Back/Next">
			<Stepper steps={STEPS} bind:current={step} clickable />
			<div class="flex gap-2 mt-3">
				<Button variant="outline" size="sm" disabled={step === 0} onclick={() => (step -= 1)}>Back</Button>
				<Button variant="primary" size="sm" disabled={step === STEPS.length - 1} onclick={() => (step += 1)}>Next</Button>
			</div>
		</Card>
		<Card title="Accordion" description="single-open + badges">
			<Accordion items={FAQ} />
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<SectionTitle title="Kbd · Divider · Rating" />
	<div class="grid grid-3 gap-3">
		<Card title="Kbd" description="single or chord">
			<div class="stack">
				<span class="text-sm text-muted-foreground"><Kbd keys={['⌘', 'K']} /> open palette</span>
				<span class="text-sm text-muted-foreground"><Kbd keys="esc" /> close dialog</span>
			</div>
		</Card>
		<Card title="Divider" description="plain or labeled">
			<p class="text-sm font-medium">Above</p>
			<Divider label="or" />
			<p class="text-sm font-medium">Below</p>
			<Divider />
			<p class="text-xs text-subtle">Plain hairline.</p>
		</Card>
		<Card title="Rating" description="interactive + readonly">
			<div class="stack">
				<Rating bind:value={rating} />
				<Rating value={3} readonly />
				<span class="text-xs text-subtle font-mono">current: {rating}/5</span>
			</div>
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<SectionTitle title="ChatMessage · ChatComposer" />
	<Card title="Mini RAG chat" description="send a message, get a demo reply with sources">
		<div class="stack">
			{#each messages as m (m.id)}
				<ChatMessage role={m.role} text={m.text} sources={m.sources ?? []} model="Qwen 3 32B" />
			{/each}
			{#if thinking}
				<ChatMessage role="assistant" text="" streaming model="Qwen 3 32B" />
			{/if}
		</div>
		<div class="mt-3">
			<ChatComposer onsend={ask} sending={thinking} hint="Demo only — replies are canned." />
		</div>
	</Card>
</div>

<style>
	.block { margin-bottom: 2.5rem; }
	.block:last-child { margin-bottom: 0; }
</style>
