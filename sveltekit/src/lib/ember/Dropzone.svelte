<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		label?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		files?: File[];
		accept?: string;
		multiple?: boolean;
		disabled?: boolean;
		showList?: boolean;
		onfiles?: (files: File[]) => void;
	}

	let {
		label,
		hint,
		error,
		required = false,
		files = $bindable([]),
		accept,
		multiple = true,
		disabled = false,
		showList = true,
		onfiles
	}: Props = $props();

	let dragging = $state(false);
	let input: HTMLInputElement | null = $state(null);

	function add(list: FileList | null | undefined) {
		if (!list || disabled) return;
		const next = multiple ? [...files, ...Array.from(list)] : Array.from(list).slice(0, 1);
		files = next;
		onfiles?.(next);
		if (input) input.value = '';
	}

	function removeAt(i: number) {
		const next = files.filter((_, k) => k !== i);
		files = next;
		onfiles?.(next);
	}

	function fmt(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}
</script>

<div>
	{#if label}<div class="field-label" class:field-label-required={required}>{label}</div>{/if}
	<button
		type="button"
		class="ember-dropzone"
		class:dragging
		class:input-error={!!error}
		{disabled}
		onclick={() => input?.click()}
		ondragover={(e) => {
			e.preventDefault();
			if (!disabled) dragging = true;
		}}
		ondragleave={() => (dragging = false)}
		ondrop={(e) => {
			e.preventDefault();
			dragging = false;
			add(e.dataTransfer?.files);
		}}
	>
		<Icon name="upload" size={18} />
		<span class="ember-dropzone-title">
			{#if dragging}Drop files to add them{:else}Drag & drop files, or <u>browse</u>{/if}
		</span>
		{#if accept}<span class="ember-dropzone-sub">{accept}</span>{/if}
	</button>
	<input
		type="file"
		class="sr-only"
		tabindex="-1"
		{accept}
		{multiple}
		{disabled}
		bind:this={input}
		onchange={(e) => add(e.currentTarget.files)}
	/>
	{#if showList && files.length}
		<ul class="ember-file-list">
			{#each files as f, i (f.name + i)}
				<li>
					<Icon name="file" size={13} />
					<span class="ember-file-name">{f.name}</span>
					<span class="ember-file-size">{fmt(f.size)}</span>
					<button
						type="button"
						class="btn btn-ghost btn-icon btn-sm"
						aria-label="Remove {f.name}"
						onclick={() => removeAt(i)}
					>
						<Icon name="xmark" size={12} />
					</button>
				</li>
			{/each}
		</ul>
	{/if}
	{#if error}
		<div class="field-error" role="alert">{error}</div>
	{:else if hint}
		<div class="field-hint">{hint}</div>
	{/if}
</div>

<style>
	.ember-dropzone {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		width: 100%;
		padding: 1.4rem 1rem;
		border: 1.5px dashed var(--color-border-strong);
		border-radius: var(--radius-md);
		background: var(--color-background);
		color: var(--color-muted-foreground);
		cursor: pointer;
		transition: border-color var(--dur-fast) ease, background var(--dur-fast) ease;
	}
	.ember-dropzone:hover:not(:disabled) { border-color: var(--color-primary); }
	.ember-dropzone.dragging {
		border-color: var(--color-primary);
		background: rgb(var(--tw-primary) / 0.06);
		color: var(--color-foreground);
	}
	.ember-dropzone:disabled { opacity: 0.55; cursor: not-allowed; }
	.ember-dropzone.input-error { border-color: var(--color-destructive); }
	.ember-dropzone-title { font-size: 13px; }
	.ember-dropzone-title u { color: var(--color-primary); }
	.ember-dropzone-sub { font-family: var(--font-mono); font-size: 11px; color: var(--color-subtle); }
	.ember-file-list {
		list-style: none;
		margin: 0.5rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.ember-file-list li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 12.5px;
		padding: 0.35rem 0.35rem 0.35rem 0.6rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-card);
		color: var(--color-muted-foreground);
	}
	.ember-file-name {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--color-foreground);
	}
	.ember-file-size { font-family: var(--font-mono); font-size: 11px; color: var(--color-subtle); flex: none; }
</style>
