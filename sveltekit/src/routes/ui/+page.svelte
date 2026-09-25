<script lang="ts">
	import {
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogRoot,
		AlertDialogTrigger,
		Badge,
		Button,
		CodeBlock,
		ContextMenuContent,
		ContextMenuRoot,
		ContextMenuSeparator,
		ContextMenuItem,
		CollapsibleContent,
		CollapsibleRoot,
		CollapsibleTrigger,
		DialogClose,
		DialogContent,
		DialogDescription,
		DialogRoot,
		DialogTitle,
		DialogTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuRoot,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
		HoverCardContent,
		HoverCardRoot,
		HoverCardTrigger,
		Icon,
		SelectContent,
		SelectItem,
		SelectRoot,
		SelectTrigger,
		AccordionContent,
		AccordionItem,
		AccordionRoot,
		AccordionTrigger,
		PopoverContent,
		PopoverRoot,
		PopoverTrigger,
		TabsContent,
		TabsList,
		TabsRoot,
		TabsTrigger,
		Toolbar,
		TooltipContent,
		TooltipRoot,
		TooltipTrigger,
		Toggle,
		ToggleGroupItem,
		ToggleGroupRoot,
		toast,
		PageHeader
	} from '$lib/ember/index.js';

	let dialogOpen = $state(false);
	let alertOpen = $state(false);
	let collapsibleOpen = $state(false);
	let tab = $state('overview');
	let bold = $state(false);
	let view = $state('list');
	let env = $state('prod');
	let key = $state('');
	const DIALOG_CODE = `<DialogRoot bind:open>
  <DialogTrigger class="btn btn-outline btn-sm">Open dialog</DialogTrigger>
  <DialogContent>
    <div class="card-header">
      <DialogTitle>Revoke API key</DialogTitle>
      <DialogDescription>Apps using this key stop working.</DialogDescription>
    </div>
    <div class="card-body text-sm text-muted-foreground">…</div>
    <div class="card-footer flex justify-between">
      <DialogClose class="btn btn-ghost btn-sm">Cancel</DialogClose>
      <DialogClose class="btn btn-destructive btn-sm">Revoke</DialogClose>
    </div>
  </DialogContent>
</DialogRoot>`;
	const MENU_CODE = `<DropdownMenuRoot>
  <DropdownMenuTrigger class="btn btn-outline">Actions ▾</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Key actions</DropdownMenuLabel>
    <DropdownMenuItem onselect={() => rename()}>Rename</DropdownMenuItem>
    <DropdownMenuItem onselect={() => rotate()}>Rotate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem danger onselect={() => revoke()}>Revoke</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenuRoot>`;
	const POPOVER_CODE = `<PopoverRoot>
  <PopoverTrigger class="btn btn-outline btn-sm">Filters</PopoverTrigger>
  <PopoverContent>
    <TextField label="Status" />
    <Button variant="ember" size="sm">Apply</Button>
  </PopoverContent>
</PopoverRoot>`;
	const TABS_CODE = `<TabsRoot bind:value={tab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="logs">Logs</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="logs">…</TabsContent>
</TabsRoot>`;
	const MISC_CODE = `<CollapsibleRoot bind:open>
  <CollapsibleTrigger><span class="card-title">Details</span></CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</CollapsibleRoot>

<AccordionRoot openIds={['a1']}>
  <AccordionItem id="a1" title="What is Ember?">
    <AccordionTrigger />
    <AccordionContent>A design system.</AccordionContent>
  </AccordionItem>
</AccordionRoot>

<SelectRoot bind:value={env} placeholder="Select env">
  <SelectTrigger />
  <SelectContent>
    <SelectItem value="prod">Production</SelectItem>
    <SelectItem value="staging">Staging</SelectItem>
  </SelectContent>
</SelectRoot>`;
	const SMALL_CODE = `<TooltipRoot><TooltipTrigger class="btn btn-outline btn-sm">Hover</TooltipTrigger>
  <TooltipContent>Copies the key to clipboard</TooltipContent></TooltipRoot>

<ContextMenuRoot><ContextMenuContent>
  <ContextMenuItem>Open</ContextMenuItem>
</ContextMenuContent></ContextMenuRoot>

<HoverCardRoot><HoverCardTrigger><Avatar initials="AK" /></HoverCardTrigger>
  <HoverCardContent>…profile…</HoverCardContent></HoverCardRoot>

<Toggle bind:pressed={bold}>Bold</Toggle>
<ToggleGroupRoot bind:value={view} type="single">
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroupRoot>

<Toolbar>
  <ToggleGroupRoot bind:value={env}><ToggleGroupItem value="prod">Prod</ToggleGroupItem>…</ToggleGroupRoot>
</Toolbar>`;
</script>

<svelte:head>
	<title>Reka UI · Ember</title>
</svelte:head>

<PageHeader eyebrow="Headless parts" title="Reka UI on Ember"
	subtitle="Композитные компоненты в архитектуре reka-ui: Root / Trigger / Content / Item — поведение и a11y на нас, стили на Ember. 14 систем первой волны.">
	{#snippet actions()}
		<Badge variant="primary">Svelte 5</Badge>
	{/snippet}
</PageHeader>

<!-- DIALOG + ALERT DIALOG -->
<section class="mb-4">
	<div class="eyebrow mb-2">Dialog · AlertDialog</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<div class="flex items-center gap-2 mb-3">
				<DialogRoot bind:open={dialogOpen}>
					<DialogTrigger class="btn btn-outline btn-sm">Open dialog</DialogTrigger>
					<DialogContent>
						<div class="card-header">
							<DialogTitle>Revoke API key</DialogTitle>
							<DialogDescription>Apps using this key stop working immediately.</DialogDescription>
						</div>
						<div class="card-body"><p class="text-sm text-muted-foreground">Ключ «prod-api-1» будет удалён навсегда.</p></div>
						<div class="card-footer flex justify-between">
							<DialogClose class="btn btn-ghost btn-sm">Cancel</DialogClose>
							<DialogClose class="btn btn-destructive btn-sm" onclick={() => toast.success('Key revoked', 'prod-api-1')}>Revoke</DialogClose>
						</div>
					</DialogContent>
				</DialogRoot>
				<AlertDialogRoot bind:open={alertOpen}>
					<AlertDialogTrigger class="btn btn-destructive btn-sm">Delete workspace</AlertDialogTrigger>
					<AlertDialogContent>
						<div class="card-header">
							<DialogTitle>Delete «acme»?</DialogTitle>
							<DialogDescription>Overlay click не закрывает — только явный выбор.</DialogDescription>
						</div>
						<div class="card-footer flex justify-between">
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onclick={() => toast.error('Workspace deleted', 'acme')}>Delete forever</AlertDialogAction>
						</div>
					</AlertDialogContent>
				</AlertDialogRoot>
			</div>
			<CodeBlock title="dialog" language="svelte" code={DIALOG_CODE} />
		</div>
		<div class="card card-body">
			<div class="eyebrow mb-2">DropdownMenu · ContextMenu</div>
			<div class="flex items-center gap-3 mb-3 flex-wrap">
				<DropdownMenuRoot>
					<DropdownMenuTrigger class="btn btn-outline">Actions <Icon name="chevron-down" size={12} /></DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Key actions</DropdownMenuLabel>
						<DropdownMenuItem onselect={() => toast.info('Renamed', 'prod-api-1')}><i data-icon="pencil" data-size="13"></i> Rename</DropdownMenuItem>
						<DropdownMenuItem onselect={() => toast.info('Rotated', 'new secret generated')}><i data-icon="refresh" data-size="13"></i> Rotate</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem danger onselect={() => toast.error('Revoked', 'prod-api-1')}><i data-icon="trash" data-size="13"></i> Revoke</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenuRoot>
				<ContextMenuRoot>
					<div class="card card-body" style="border-style:dashed;cursor:context-menu;font-size:12.5px;color:var(--color-muted-foreground);padding:.75rem 1rem;">
						Правый клик по этой карточке
					</div>
					<ContextMenuContent>
						<ContextMenuItem onselect={() => toast.info('Copied', 'path copied')}>Copy path</ContextMenuItem>
						<ContextMenuItem onselect={() => toast.info('Downloaded', 'logs.txt')}><i data-icon="download" data-size="13"></i> Download logs</ContextMenuItem>
						<ContextMenuSeparator />
						<ContextMenuItem danger onselect={() => toast.error('Deleted')}><i data-icon="trash" data-size="13"></i> Delete</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenuRoot>
			</div>
			<CodeBlock title="dropdown-menu" language="svelte" code={MENU_CODE} />
		</div>
	</div>
</section>

<!-- POPOVER + TOOLTIP + HOVER CARD -->
<section class="mb-4">
	<div class="eyebrow mb-2">Popover · Tooltip · HoverCard</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<div class="flex items-center gap-4 mb-3 flex-wrap">
				<PopoverRoot>
					<PopoverTrigger class="btn btn-outline btn-sm">Filters</PopoverTrigger>
					<PopoverContent>
						<div class="text-sm font-medium mb-2">Filters</div>
						<label class="field-label">Status</label>
						<input class="input" placeholder="active" />
						<div class="flex gap-2 mt-3">
							<Button variant="ember" size="sm" onclick={() => toast.success('Applied')}>Apply</Button>
						</div>
					</PopoverContent>
				</PopoverRoot>
				<TooltipRoot>
					<TooltipTrigger class="btn btn-outline btn-sm"><Icon name="copy" size={13} /> Hover me</TooltipTrigger>
					<TooltipContent>Copies the key to clipboard</TooltipContent>
				</TooltipRoot>
				<HoverCardRoot>
					<HoverCardTrigger><span class="avatar" style="cursor:pointer;">AK</span></HoverCardTrigger>
					<HoverCardContent>
						<div class="flex items-center gap-3">
							<span class="avatar" style="width:40px;height:40px;">AK</span>
							<div>
								<div class="text-sm font-semibold">Alex Kim</div>
								<div class="text-xs text-subtle">admin · acme · online</div>
							</div>
						</div>
						<div class="text-xs text-muted-foreground mt-2">12 keys · last seen 2m ago</div>
					</HoverCardContent>
				</HoverCardRoot>
			</div>
			<CodeBlock title="popover · tooltip · hover-card" language="svelte" code={POPOVER_CODE} />
		</div>
		<div class="card card-body">
			<div class="eyebrow mb-2">Tabs · Toggle · ToggleGroup · Toolbar</div>
			<div class="mb-3">
				<TabsRoot bind:value={tab}>
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="logs">Logs</TabsTrigger>
						<TabsTrigger value="settings">Settings</TabsTrigger>
					</TabsList>
					<TabsContent value="overview"><p class="text-sm text-muted-foreground mt-2">Overview panel.</p></TabsContent>
					<TabsContent value="logs"><p class="text-sm text-muted-foreground mt-2">Logs panel — стрелки листают табы.</p></TabsContent>
					<TabsContent value="settings"><p class="text-sm text-muted-foreground mt-2">Settings panel.</p></TabsContent>
				</TabsRoot>
			</div>
			<div class="flex items-center gap-3 flex-wrap mb-3">
				<Toggle bind:pressed={bold}>Bold</Toggle>
				<ToggleGroupRoot bind:value={view}>
					<ToggleGroupItem value="list"><i data-icon="list" data-size="13"></i></ToggleGroupItem>
					<ToggleGroupItem value="grid"><i data-icon="grid" data-size="13"></i></ToggleGroupItem>
				</ToggleGroupRoot>
				<Toolbar>
					<ToggleGroupRoot bind:value={env}>
						<ToggleGroupItem value="prod">Prod</ToggleGroupItem>
						<ToggleGroupItem value="staging">Staging</ToggleGroupItem>
					</ToggleGroupRoot>
					<div class="divider-vertical" style="height:18px"></div>
					<button class="btn btn-ghost btn-icon btn-sm" onclick={() => toast.info('Saved')}><i data-icon="download" data-size="13"></i></button>
				</Toolbar>
			</div>
			<CodeBlock title="tabs · toggle · toolbar" language="svelte" code={TABS_CODE + '\n\n' + SMALL_CODE} />
		</div>
	</div>
</section>

<!-- COLLAPSIBLE + ACCORDION + SELECT -->
<section class="mb-4">
	<div class="eyebrow mb-2">Collapsible · Accordion · Select</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<CollapsibleRoot bind:open={collapsibleOpen}>
				<CollapsibleTrigger>
					<span class="card-title">Deployment details</span>
					<Icon name="chevron-down" size={14} class="text-subtle" />
				</CollapsibleTrigger>
				<CollapsibleContent>
					<p class="text-sm text-muted-foreground">v2.4.1 · api-worker × 3 · region eu-central · 4m 12s</p>
				</CollapsibleContent>
			</CollapsibleRoot>
			<div class="mt-3">
				<AccordionRoot openIds={['a1']}>
					<AccordionItem id="a1" title="What is Ember?" badge="DS">
						<AccordionTrigger />
						<AccordionContent>Дизайн-система: токены + классы + Svelte-компоненты.</AccordionContent>
					</AccordionItem>
					<AccordionItem id="a2" title="Сколько тем?" badge="6">
						<AccordionTrigger />
						<AccordionContent>3 тёмных и 3 светлых, один --tw-* контракт.</AccordionContent>
					</AccordionItem>
				</AccordionRoot>
			</div>
		</div>
		<div class="card card-body">
			<div style="max-width:320px">
				<label class="field-label">Environment</label>
				<SelectRoot bind:value={key} placeholder="Select environment…">
					<SelectTrigger />
					<SelectContent>
						<SelectItem value="prod">Production</SelectItem>
						<SelectItem value="staging">Staging</SelectItem>
						<SelectItem value="dev">Development</SelectItem>
					</SelectContent>
				</SelectRoot>
				<div class="field-hint">Клик снаружи и Esc закрывают, стрелки — навигация.</div>
			</div>
			<div class="mt-3">
				<CodeBlock title="collapsible · accordion · select" language="svelte" code={MISC_CODE} />
			</div>
		</div>
	</div>
</section>

<style>
	.eyebrow {
		letter-spacing: 0.06em;
	}
	/* меню/popover не должны обрезаться демо-карточками */
	.card-body :global(.menu),
	.card-body :global(.dialog-overlay) {
		overflow: visible;
	}
	.card-body {
		overflow: visible;
	}
</style>
