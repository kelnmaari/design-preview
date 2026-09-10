<script lang="ts">
	import {
		Button,
		Card,
		Checkbox,
		Dropzone,
		Icon,
		InputGroup,
		PageHeader,
		RadioGroup,
		SectionTitle,
		Select,
		Slider,
		Switch,
		TextField,
		reveal,
		toast,
		type RadioOption,
		type SelectOption
	} from '$lib/ember/index.js';

	const ROLES: SelectOption[] = [
		{ value: 'viewer', label: 'Viewer' },
		{ value: 'developer', label: 'Developer' },
		{ value: 'admin', label: 'Admin' },
		{ value: 'owner', label: 'Owner', disabled: true }
	];

	const PLANS: RadioOption[] = [
		{ value: 'hobby', label: 'Hobby', hint: 'For side projects' },
		{ value: 'pro', label: 'Pro', hint: 'For production workloads' },
		{ value: 'scale', label: 'Scale', hint: 'Dedicated capacity', disabled: true }
	];

	let sliderTemp = $state(0.7);
	let indeterminateDemo = $state(false);

	/* ---- validation recipe ---- */
	let name = $state('');
	let email = $state('');
	let role = $state('');
	let terms = $state(false);
	let nameError = $state('');
	let emailError = $state('');
	let roleError = $state('');
	let termsError = $state('');

	function submit() {
		nameError = name.trim() ? '' : 'Please enter a display name.';
		emailError = /.+@.+\..+/.test(email) ? '' : 'Enter a valid email address.';
		roleError = role ? '' : 'Pick a role.';
		termsError = terms ? '' : 'You must accept the terms.';
		if (!nameError && !emailError && !roleError && !termsError) {
			toast.success('Teammate invited', `${name} · ${role}`);
			name = '';
			email = '';
			role = '';
			terms = false;
		}
	}
</script>

<svelte:head>
	<title>Ember · Form components (SvelteKit)</title>
</svelte:head>

<PageHeader
	eyebrow="Components · Forms"
	title="Forms"
	subtitle="Every control ships with label, hint and error states. Compose with Field for custom inputs."
/>

<div class="block" use:reveal>
	<SectionTitle title="Text inputs" />
	<div class="grid grid-2 gap-3">
		<Card title="TextField" description="text · password · mono · readonly · disabled">
			<div class="stack">
				<TextField label="Workspace name" placeholder="acme-prod" hint="Lowercase, no spaces." />
				<TextField label="API secret" type="password" value="sk-aigw-hidden" />
				<TextField label="Key prefix" value="sk-aigw-9f2e" mono readonly />
				<TextField label="Disabled" value="cannot edit" disabled />
			</div>
		</Card>
		<Card title="Textarea + error state" description="aria-invalid, red ring, alert message">
			<div class="stack">
				<TextField label="System prompt" multiline rows={3} placeholder="You are a helpful…" />
				<TextField
					label="Slug"
					value=" AC ME "
					error="Slugs must be lowercase, no spaces."
					required
				/>
			</div>
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<SectionTitle title="Select · Checkbox · Radio" />
	<div class="grid grid-3 gap-3">
		<Card title="Select" description="styled native, keyboard-first">
			<div class="stack">
				<Select label="Role" options={ROLES} placeholder="Choose a role…" hint="Owner is disabled in demo." />
				<Select label="Model" options={[{ value: 'q3', label: 'Qwen 3 32B' }]} value="q3" disabled />
			</div>
		</Card>
		<Card title="Checkbox" description="incl. indeterminate">
			<div class="stack">
				<Checkbox label="Stream responses" hint="Token-by-token rendering." checked />
				<Checkbox
					label="Select all (indeterminate)"
					indeterminate={indeterminateDemo}
					onchange={(v) => (indeterminateDemo = v)}
				/>
				<Checkbox label="Disabled" disabled />
			</div>
		</Card>
		<Card title="RadioGroup" description="vertical · horizontal">
			<div class="stack">
				<RadioGroup name="plan" options={PLANS} value="pro" />
				<RadioGroup
					name="density"
					orientation="horizontal"
					value="cozy"
					options={[
						{ value: 'compact', label: 'Compact' },
						{ value: 'cozy', label: 'Cozy' }
					]}
				/>
			</div>
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<SectionTitle title="Slider · Switch · InputGroup" />
	<div class="grid grid-3 gap-3">
		<Card title="Slider" description="custom format">
			<div class="stack">
				<Slider label="Temperature" min={0} max={2} step={0.1} bind:value={sliderTemp} format={(v) => v.toFixed(1)} />
				<Slider label="Max tokens" min={256} max={8192} step={256} value={2048} format={(v) => v.toLocaleString()} />
				<Slider label="Disabled" value={30} disabled showValue={false} />
			</div>
		</Card>
		<Card title="Switch" description="binary settings">
			<div class="stack">
				<Switch label="RAG retrieval" checked />
				<Switch label="Nightly evals" />
				<div class="flex items-center gap-2 text-sm text-subtle">
					<Icon name="bolt" size={13} /> Pair with Field for hint text.
				</div>
			</div>
		</Card>
		<Card title="InputGroup" description="string or snippet addons">
			<div class="stack">
				<InputGroup label="Budget" left="$" right=".00" placeholder="500" mono />
				<InputGroup label="Endpoint" right="/v1/chat" value="https://api.acme.io" mono>
					{#snippet left()}<Icon name="globe" size={13} />{/snippet}
				</InputGroup>
				<InputGroup label="Invalid" left="sk-" value="!!!" error="Unknown key prefix." mono />
			</div>
		</Card>
	</div>
</div>

<div class="block" use:reveal>
	<SectionTitle title="Dropzone" />
	<Card title="File upload" description="drag & drop or browse, with file list">
		<Dropzone accept=".md,.txt,.pdf" hint="Markdown, text or PDF. Stored locally in this demo." />
	</Card>
</div>

<div class="block" use:reveal>
	<SectionTitle title="Recipe · validated form" />
	<Card title="Invite teammate" description="manual errors + toast on success">
		<div class="grid grid-2 gap-3">
			<TextField label="Display name" placeholder="Ada Lovelace" required bind:value={name} error={nameError} />
			<TextField label="Email" placeholder="ada@company.io" required bind:value={email} error={emailError} />
		</div>
		<div class="grid grid-2 gap-3 mt-3">
			<Select label="Role" options={ROLES} placeholder="Choose…" required bind:value={role} error={roleError} />
			<div class="flex items-end pb-1">
				<Checkbox label="Accept the terms of service" required bind:checked={terms} error={termsError} />
			</div>
		</div>
		<div class="flex justify-end mt-3">
			<Button variant="ember" onclick={submit}><Icon name="user-plus" size={13} /> Send invite</Button>
		</div>
	</Card>
</div>

<style>
	.block { margin-bottom: 2.5rem; }
	.block:last-child { margin-bottom: 0; }
</style>
