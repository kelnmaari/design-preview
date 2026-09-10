<script lang="ts">
	import {
		Badge,
		Button,
		CopyButton,
		Dropdown,
		Icon,
		Progress,
		SearchField,
		Segmented,
		SlidePanel,
		reveal,
		toast,
		type IconName
	} from '$lib/ember/index.js';

	type FileType = 'pdf' | 'md' | 'go' | 'csv' | 'png' | 'txt';
	type Folder = 'all' | 'docs' | 'code' | 'data';

	interface RagFile {
		id: number;
		name: string;
		size: string;
		type: FileType;
		folder: Exclude<Folder, 'all'>;
		chunks: number;
		status: 'indexed' | 'indexing';
		updated: string;
	}

	const FOLDERS: Array<{ id: Folder; label: string; count: number }> = [
		{ id: 'all', label: 'All files', count: 8 },
		{ id: 'docs', label: 'Documents', count: 4 },
		{ id: 'code', label: 'Code', count: 3 },
		{ id: 'data', label: 'Datasets', count: 1 }
	];

	const FILES: RagFile[] = [
		{ id: 1, name: 'auth_middleware.go', size: '18 KB', type: 'go', folder: 'code', chunks: 24, status: 'indexed', updated: '2h ago' },
		{ id: 2, name: 'JWT RFC 7519.pdf', size: '2.4 MB', type: 'pdf', folder: 'docs', chunks: 182, status: 'indexed', updated: 'yesterday' },
		{ id: 3, name: 'runbook.md', size: '46 KB', type: 'md', folder: 'docs', chunks: 38, status: 'indexed', updated: '3h ago' },
		{ id: 4, name: 'token_service.go', size: '12 KB', type: 'go', folder: 'code', chunks: 16, status: 'indexed', updated: '2h ago' },
		{ id: 5, name: 'analytics_export.csv', size: '88 MB', type: 'csv', folder: 'data', chunks: 1240, status: 'indexing', updated: '10m ago' },
		{ id: 6, name: 'architecture.png', size: '1.1 MB', type: 'png', folder: 'docs', chunks: 6, status: 'indexed', updated: 'last week' },
		{ id: 7, name: 'migration_notes.txt', size: '9 KB', type: 'txt', folder: 'docs', chunks: 11, status: 'indexed', updated: '4d ago' },
		{ id: 8, name: 'router_test.go', size: '22 KB', type: 'go', folder: 'code', chunks: 29, status: 'indexing', updated: '24m ago' }
	];

	const TYPE_ICON: Record<FileType, IconName> = {
		pdf: 'file',
		md: 'book',
		go: 'terminal',
		csv: 'chart-bar',
		png: 'image',
		txt: 'file'
	};
	const TYPE_TONE: Record<FileType, string> = {
		pdf: 'bg-destructive/10 text-destructive',
		md: 'bg-info/10 text-info',
		go: 'bg-primary/10 text-primary',
		csv: 'bg-success/10 text-success',
		png: 'bg-amber/10 text-amber',
		txt: 'bg-muted text-muted-foreground'
	};

	let folder = $state<Folder>('all');
	let query = $state('');
	let view = $state('grid');
	let dragOver = $state(false);
	let preview = $state<RagFile | null>(null);

	const filtered = $derived(
		FILES.filter((f) => {
			const hitF = folder === 'all' || f.folder === folder;
			const hitQ = !query.trim() || f.name.toLowerCase().includes(query.trim().toLowerCase());
			return hitF && hitQ;
		})
	);

	const totalChunks = $derived(filtered.reduce((s, f) => s + f.chunks, 0));

	function onDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		const n = e.dataTransfer?.files.length ?? 0;
		if (n > 0) toast.success(`${n} file${n > 1 ? 's' : ''} queued`, 'Indexing will start automatically (demo).');
	}
</script>

<svelte:head>
	<title>Ember · Files (SvelteKit)</title>
</svelte:head>

<div class="page-header" use:reveal>
	<div>
		<div class="eyebrow mb-2">Platform · RAG</div>
		<h1 class="page-title">Files</h1>
		<p class="page-subtitle">Corpus browser — {totalChunks.toLocaleString('en-US')} chunks across {filtered.length} files.</p>
	</div>
	<div class="flex gap-2 items-center">
		<Segmented options={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }]} bind:value={view} />
		<Button variant="ember" size="sm" onclick={() => toast.success('Upload started', 'Drop files anywhere or use the picker (demo).')}>
			<Icon name="upload" size={13} /> Upload
		</Button>
	</div>
</div>

<div class="grid files-layout mb-4">
	<div class="card card-body" use:reveal>
		<div class="eyebrow mb-3">Storage</div>
		<div class="font-mono text-2xl font-semibold">34.2 <span class="text-sm text-subtle">/ 50 GB</span></div>
		<div class="mt-3"><Progress value={68} /></div>
		<div class="stack-tight mt-4 text-xs">
			<div class="flex justify-between"><span class="text-muted-foreground">Documents</span><span class="font-mono">12.1 GB</span></div>
			<div class="flex justify-between"><span class="text-muted-foreground">Datasets</span><span class="font-mono">19.4 GB</span></div>
			<div class="flex justify-between"><span class="text-muted-foreground">Code</span><span class="font-mono">2.7 GB</span></div>
		</div>
		<div class="divider my-3" style="height:1px;background:var(--color-border);"></div>
		<div class="eyebrow mb-2">Folders</div>
		<div class="stack-tight">
			{#each FOLDERS as f (f.id)}
				<button class="folder-row" class:active={folder === f.id} onclick={() => (folder = f.id)}>
					<Icon name="folder" size={14} class="text-muted-foreground" />
					<span class="text-sm">{f.label}</span>
					<span class="badge badge-muted" style="margin-left:auto;">{f.count}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="min-w-0">
		<div
			class="dropzone mb-3"
			class:over={dragOver}
			ondragover={(e) => {
				e.preventDefault();
				dragOver = true;
			}}
			ondragleave={() => (dragOver = false)}
			ondrop={onDrop}
			role="button"
			tabindex="0"
			aria-label="Drop files to upload"
			onclick={() => toast.info('File picker', 'Native picker isn’t wired in this example.')}
			onkeydown={(e) => e.key === 'Enter' && toast.info('File picker', 'Native picker isn’t wired in this example.')}
			use:reveal
		>
			<Icon name="upload" size={18} class="text-primary" />
			<div class="text-sm font-medium">{dragOver ? 'Drop to index…' : 'Drag & drop files to index'}</div>
			<div class="text-xs text-subtle">pdf · md · txt · csv · code — chunked automatically</div>
		</div>

		<div class="flex gap-2 mb-3 items-center" use:reveal>
			<div style="max-width:300px;flex:1;">
				<SearchField bind:value={query} placeholder="Search files…" />
			</div>
			<div class="topbar-spacer"></div>
			<span class="text-xs text-muted-foreground font-mono">{filtered.length} files</span>
		</div>

		{#if view === 'grid'}
			<div class="grid grid-3">
				{#each filtered as f (f.id)}
					<button class="card card-body file-card" onclick={() => (preview = f)} use:reveal>
						<div class="flex items-start justify-between mb-3">
							<div class="file-icon {TYPE_TONE[f.type]}"><Icon name={TYPE_ICON[f.type]} size={18} /></div>
							{#if f.status === 'indexed'}
								<Badge variant="success">indexed</Badge>
							{:else}
								<Badge variant="amber"><span class="spin" style="display:inline-flex"><Icon name="refresh" size={10} /></span> indexing</Badge>
							{/if}
						</div>
						<div class="text-sm font-medium truncate" style="text-align:left;">{f.name}</div>
						<div class="flex justify-between text-xs text-subtle mt-2">
							<span>{f.size}</span><span class="font-mono">{f.chunks} chunks</span>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<div class="card" style="overflow:hidden;" use:reveal>
				<table class="table">
					<thead><tr><th>Name</th><th>Size</th><th>Chunks</th><th>Status</th><th>Updated</th><th style="width:60px;"></th></tr></thead>
					<tbody>
						{#each filtered as f (f.id)}
							<tr class="pointer" onclick={() => (preview = f)}>
								<td>
									<div class="flex items-center gap-2">
										<div class="file-icon sm {TYPE_TONE[f.type]}"><Icon name={TYPE_ICON[f.type]} size={13} /></div>
										<span class="font-medium">{f.name}</span>
									</div>
								</td>
								<td class="cell-mono">{f.size}</td>
								<td class="cell-mono">{f.chunks}</td>
								<td>
									{#if f.status === 'indexed'}<Badge variant="success" dot>indexed</Badge>{:else}<Badge variant="amber">indexing</Badge>{/if}
								</td>
								<td class="cell-subtle">{f.updated}</td>
								<td>
									<Dropdown>
										{#snippet trigger({ toggle })}
											<button
												class="btn btn-ghost btn-icon btn-sm"
												onclick={(e) => {
													e.stopPropagation();
													toggle();
												}}
												aria-label="File actions"
											>
												<Icon name="dots" size={14} />
											</button>
										{/snippet}
										<button class="menu-item" onclick={() => (preview = f)}><Icon name="eye" size={13} /> Preview</button>
										<button class="menu-item" onclick={() => toast.info('Reindex queued', f.name)}><Icon name="refresh" size={13} /> Reindex</button>
										<div class="menu-sep"></div>
										<button class="menu-item danger" onclick={() => toast.warning('File deleted', f.name)}><Icon name="trash" size={13} /> Delete</button>
									</Dropdown>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>

<SlidePanel open={!!preview} title={preview?.name ?? ''} description="Indexed document · click outside to close." onclose={() => (preview = null)}>
	{#if preview}
		<div class="stack">
			<div class="flex items-center gap-3">
				<div class="file-icon {TYPE_TONE[preview.type]}"><Icon name={TYPE_ICON[preview.type]} size={20} /></div>
				<div>
					<div class="text-sm font-semibold">{preview.name}</div>
					<div class="text-xs text-subtle">{preview.size} · {preview.chunks} chunks · {preview.updated}</div>
				</div>
				<span style="margin-left:auto;">
					{#if preview.status === 'indexed'}<Badge variant="success" dot>indexed</Badge>{:else}<Badge variant="amber">indexing</Badge>{/if}
				</span>
			</div>
			<div>
				<span class="field-label">Top chunks</span>
				<div class="stack-tight">
					{#each [['§4.2 Token verification flow', '0.94'], ['§2.1 Key rotation policy', '0.88'], ['Appendix B · Error codes', '0.81']] as [title, match] (title)}
						<div class="card" style="padding:.5rem .625rem;">
							<div class="flex items-center gap-2">
								<Icon name="file" size={13} class="text-muted-foreground" />
								<span class="text-xs truncate">{title}</span>
							</div>
							<div class="text-xs text-subtle font-mono">{match} match</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex gap-2">
				<CopyButton text="doc_{preview.id}_{preview.name}" label="Copy doc ID" />
				<Button variant="outline" size="sm" onclick={() => toast.info('Reindex queued', preview?.name ?? '')}>
					<Icon name="refresh" size={13} /> Reindex
				</Button>
			</div>
		</div>
	{/if}
	{#snippet footer()}
		<Button variant="ghost" size="sm" onclick={() => (preview = null)}>Close</Button>
		<Button variant="primary" size="sm" onclick={() => toast.info('Open in Chat', 'RAG attach flow (demo).')}>
			<Icon name="comments" size={13} /> Ask about this file
		</Button>
	{/snippet}
</SlidePanel>

<style>
	.files-layout {
		grid-template-columns: 250px minmax(0, 1fr);
		align-items: start;
	}
	@media (max-width: 960px) {
		.files-layout {
			grid-template-columns: 1fr;
		}
	}
	.folder-row {
		display: flex; align-items: center; gap: 8px;
		padding: 7px 8px; border-radius: var(--radius-sm);
		transition: background 0.12s ease;
		font-family: var(--font-sans);
	}
	.folder-row:hover { background: var(--color-accent); }
	.folder-row.active { background: rgb(var(--tw-primary) / 0.1); }
	.folder-row.active :global(svg) { color: var(--color-primary); }
	.dropzone {
		border: 1.5px dashed var(--color-border-strong);
		border-radius: var(--radius-lg);
		padding: 1.1rem;
		display: flex; flex-direction: column; align-items: center; gap: 6px;
		text-align: center; cursor: pointer;
		transition: all 0.18s ease;
		background: var(--color-card);
		font-family: var(--font-sans);
	}
	.dropzone:hover, .dropzone.over {
		border-color: rgb(var(--tw-primary) / 0.6);
		background: rgb(var(--tw-primary) / 0.04);
	}
	.file-card {
		text-align: left; cursor: pointer; font-family: var(--font-sans);
		transition: transform 0.18s var(--ease-out), border-color 0.15s ease, box-shadow 0.18s ease;
	}
	.file-card:hover {
		transform: translateY(-2px);
		border-color: var(--color-border-strong);
		box-shadow: var(--shadow-md);
	}
	.file-icon {
		width: 40px; height: 40px; border-radius: 10px;
		display: grid; place-items: center; flex: none;
	}
	.file-icon.sm { width: 28px; height: 28px; border-radius: 7px; }
</style>
