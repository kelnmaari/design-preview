<script lang="ts">
	import {
		AccordionContent,
		AccordionItem,
		AccordionRoot,
		AccordionTrigger,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogRoot,
		AlertDialogTrigger,
		Badge,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbPage,
		BreadcrumbRoot,
		BreadcrumbSeparator,
		Button,
		CarouselButton,
		CarouselContent,
		CarouselItem,
		CarouselRoot,
		Calendar,
		DatePicker,
		CodeBlock,
		CommandInput,
		CommandItem,
		CommandList,
		CommandRoot,
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
		ListBoxItem,
		ListBoxRoot,
		MenubarRoot,
		NavigationMenuLink,
		NavigationMenuRoot,
		PageHeader,
		PaginationNext,
		PaginationNumbers,
		PaginationPrev,
		PaginationRoot,
		PopoverContent,
		PopoverRoot,
		PopoverTrigger,
		ScrollAreaRoot,
		SelectContent,
		SelectItem,
		SelectRoot,
		SelectTrigger,
		Separator,
		SliderRoot,
		SliderTrack,
		SplitterHandle,
		SplitterPanel,
		SplitterRoot,
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
		Tree,
		toast
	} from '$lib/ember/index.js';

	let dialogOpen = $state(false);
	let alertOpen = $state(false);
	let collapsibleOpen = $state(false);
	let tab = $state('overview');
	let bold = $state(false);
	let view = $state('list');
	let env = $state('prod');
	let key = $state('');
	let page = $state(5);
	let sliderVal = $state(68);
	let split = $state([60, 40]);
	let dateVal = $state<Date | undefined>(undefined);
	let rangeVal: [number, number] = $state([30, 70]);
</script>

<svelte:head>
	<title>Headless parts · Ember</title>
</svelte:head>

<PageHeader eyebrow="Headless parts" title="Headless systems"
	subtitle="Композитные компоненты в parts-архитектуре: Root / Trigger / Content / Item — поведение и a11y на нас, стили на Ember. Секции идут сверху вниз в порядке меню; у каждого компонента свой пример и код.">
	{#snippet actions()}
		<Badge variant="primary">Svelte 5</Badge>
	{/snippet}
</PageHeader>

<!-- 01 · DIALOG -->
<section class="mb-4" id="dialog" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">01 · Dialog</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
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
			<p class="text-xs text-muted-foreground mt-2">Esc и клик по скриму закрывают, фокус запирается внутри.</p>
		</div>
		<CodeBlock title="Dialog" language="svelte" code={'<DialogRoot bind:open>\n  <DialogTrigger class="btn btn-outline btn-sm">Open dialog</DialogTrigger>\n  <DialogContent>\n    <div class="card-header">\n      <DialogTitle>Revoke API key</DialogTitle>\n      <DialogDescription>Apps using this key stop working.</DialogDescription>\n    </div>\n    <div class="card-footer flex justify-between">\n      <DialogClose class="btn btn-ghost btn-sm">Cancel</DialogClose>\n      <DialogClose class="btn btn-destructive btn-sm">Revoke</DialogClose>\n    </div>\n  </DialogContent>\n</DialogRoot>'} />
	</div>
</section>

<!-- 02 · ALERT DIALOG -->
<section class="mb-4" id="alert-dialog" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">02 · AlertDialog</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
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
		<CodeBlock title="AlertDialog" language="svelte" code={'<AlertDialogRoot bind:open>\n  <AlertDialogTrigger class="btn btn-destructive btn-sm">Delete</AlertDialogTrigger>\n  <AlertDialogContent>\n    <div class="card-header">\n      <DialogTitle>Delete «acme»?</DialogTitle>\n    </div>\n    <div class="card-footer flex justify-between">\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction onclick={destroy}>Delete forever</AlertDialogAction>\n    </div>\n  </AlertDialogContent>\n</AlertDialogRoot>'} />
	</div>
</section>

<!-- 03 · DROPDOWN MENU -->
<section class="mb-4" id="dropdown-menu" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">03 · DropdownMenu</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<DropdownMenuRoot>
				<DropdownMenuTrigger class="btn btn-outline">Actions <Icon name="chevron-down" size={12} /></DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Key actions</DropdownMenuLabel>
					<DropdownMenuItem onselect={() => toast.info('Renamed', 'prod-api-1')}><i data-icon="pencil" data-size="13"></i> Rename</DropdownMenuItem>
					<DropdownMenuItem onselect={() => toast.info('Rotated')}><i data-icon="refresh" data-size="13"></i> Rotate</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem danger onselect={() => toast.error('Revoked', 'prod-api-1')}><i data-icon="trash" data-size="13"></i> Revoke</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuRoot>
			<p class="text-xs text-muted-foreground mt-2">Стрелки — навигация, Esc — закрыть.</p>
		</div>
		<CodeBlock title="DropdownMenu" language="svelte" code={'<DropdownMenuRoot>\n  <DropdownMenuTrigger class="btn btn-outline">Actions</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuLabel>Key actions</DropdownMenuLabel>\n    <DropdownMenuItem onselect={rename}>Rename</DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem danger onselect={revoke}>Revoke</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenuRoot>'} />
	</div>
</section>

<!-- 04 · CONTEXT MENU -->
<section class="mb-4" id="context-menu" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">04 · ContextMenu</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
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
			<p class="text-xs text-muted-foreground mt-2">Меню открывается у курсора.</p>
		</div>
		<CodeBlock title="ContextMenu" language="svelte" code={'<ContextMenuRoot>\n  <div class="card">Right-click me</div>\n  <ContextMenuContent>\n    <ContextMenuItem onselect={copy}>Copy path</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem danger onselect={del}>Delete</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenuRoot>'} />
	</div>
</section>

<!-- 05 · POPOVER -->
<section class="mb-4" id="popover" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">05 · Popover</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<PopoverRoot>
				<PopoverTrigger class="btn btn-outline btn-sm">Filters</PopoverTrigger>
				<PopoverContent>
					<div class="text-sm font-medium mb-2">Filters</div>
					<label class="field-label" for="ui-pop-status">Status</label>
					<input id="ui-pop-status" class="input" placeholder="active" />
					<div class="flex gap-2 mt-3">
						<Button variant="ember" size="sm" onclick={() => toast.success('Applied')}>Apply</Button>
					</div>
				</PopoverContent>
			</PopoverRoot>
		</div>
		<CodeBlock title="Popover" language="svelte" code={'<PopoverRoot>\n  <PopoverTrigger class="btn btn-outline btn-sm">Filters</PopoverTrigger>\n  <PopoverContent>\n    <TextField label="Status" />\n    <Button variant="ember" size="sm">Apply</Button>\n  </PopoverContent>\n</PopoverRoot>'} />
	</div>
</section>

<!-- 06 · TOOLTIP -->
<section class="mb-4" id="tooltip" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">06 · Tooltip</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<TooltipRoot>
				<TooltipTrigger class="btn btn-outline btn-sm"><Icon name="copy" size={13} /> Hover me</TooltipTrigger>
				<TooltipContent>Copies the key to clipboard</TooltipContent>
			</TooltipRoot>
		</div>
		<CodeBlock title="Tooltip" language="svelte" code={'<TooltipRoot>\n  <TooltipTrigger class="btn btn-outline btn-sm">Hover me</TooltipTrigger>\n  <TooltipContent>Copies the key to clipboard</TooltipContent>\n</TooltipRoot>'} />
	</div>
</section>

<!-- 07 · HOVER CARD -->
<section class="mb-4" id="hover-card" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">07 · HoverCard</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
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
		<CodeBlock title="HoverCard" language="svelte" code={'<HoverCardRoot>\n  <HoverCardTrigger><Avatar initials="AK" /></HoverCardTrigger>\n  <HoverCardContent>\n    <div class="text-sm font-semibold">Alex Kim</div>\n    <div class="text-xs text-subtle">admin · acme</div>\n  </HoverCardContent>\n</HoverCardRoot>'} />
	</div>
</section>

<!-- 08 · COLLAPSIBLE -->
<section class="mb-4" id="collapsible" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">08 · Collapsible</div>
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
		</div>
		<CodeBlock title="Collapsible" language="svelte" code={'<CollapsibleRoot bind:open>\n  <CollapsibleTrigger>\n    <span class="card-title">Details</span>\n  </CollapsibleTrigger>\n  <CollapsibleContent>…</CollapsibleContent>\n</CollapsibleRoot>'} />
	</div>
</section>

<!-- 09 · ACCORDION -->
<section class="mb-4" id="accordion" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">09 · Accordion</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
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
		<CodeBlock title="Accordion" language="svelte" code={'<AccordionRoot openIds={[\'a1\']}>\n  <AccordionItem id="a1" title="What is Ember?" badge="DS">\n    <AccordionTrigger />\n    <AccordionContent>Дизайн-система.</AccordionContent>\n  </AccordionItem>\n</AccordionRoot>'} />
	</div>
</section>

<!-- 10 · SELECT -->
<section class="mb-4" id="select" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">10 · Select</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<div style="max-width:320px">
				<label class="field-label" for="ui-select">Environment</label>
				<SelectRoot bind:value={key} placeholder="Select environment…">
					<SelectTrigger id="ui-select" />
					<SelectContent>
						<SelectItem value="prod">Production</SelectItem>
						<SelectItem value="staging">Staging</SelectItem>
						<SelectItem value="dev">Development</SelectItem>
					</SelectContent>
				</SelectRoot>
				<div class="field-hint">Клик снаружи и Esc закрывают, стрелки — навигация.</div>
			</div>
		</div>
		<CodeBlock title="Select" language="svelte" code={'<SelectRoot bind:value={env} placeholder="Select environment…">\n  <SelectTrigger />\n  <SelectContent>\n    <SelectItem value="prod">Production</SelectItem>\n    <SelectItem value="staging">Staging</SelectItem>\n  </SelectContent>\n</SelectRoot>'} />
	</div>
</section>

<!-- 11 · TABS -->
<section class="mb-4" id="tabs" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">11 · Tabs</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
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
		<CodeBlock title="Tabs" language="svelte" code={'<TabsRoot bind:value={tab}>\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="logs">Logs</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">…</TabsContent>\n  <TabsContent value="logs">…</TabsContent>\n</TabsRoot>'} />
	</div>
</section>

<!-- 12 · TOGGLE -->
<section class="mb-4" id="toggle" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">12 · Toggle</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<div class="flex items-center gap-2">
				<Toggle bind:pressed={bold}>Bold</Toggle>
				<span class="text-xs text-muted-foreground">pressed: {bold}</span>
			</div>
		</div>
		<CodeBlock title="Toggle" language="svelte" code={'<Toggle bind:pressed={bold}>Bold</Toggle>'} />
	</div>
</section>

<!-- 13 · TOGGLE GROUP -->
<section class="mb-4" id="toggle-group" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">13 · ToggleGroup</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<div class="flex items-center gap-2">
				<ToggleGroupRoot bind:value={view}>
					<ToggleGroupItem value="list"><i data-icon="list" data-size="13"></i></ToggleGroupItem>
					<ToggleGroupItem value="grid"><i data-icon="grid" data-size="13"></i></ToggleGroupItem>
				</ToggleGroupRoot>
				<span class="text-xs text-muted-foreground">view: {view}</span>
			</div>
		</div>
		<CodeBlock title="ToggleGroup" language="svelte" code={'<ToggleGroupRoot bind:value={view} type="single">\n  <ToggleGroupItem value="list">List</ToggleGroupItem>\n  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>\n</ToggleGroupRoot>'} />
	</div>
</section>

<!-- 14 · TOOLBAR -->
<section class="mb-4" id="toolbar" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">14 · Toolbar</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<Toolbar>
				<ToggleGroupRoot bind:value={env}>
					<ToggleGroupItem value="prod">Prod</ToggleGroupItem>
					<ToggleGroupItem value="staging">Staging</ToggleGroupItem>
				</ToggleGroupRoot>
				<Separator vertical />
				<button class="btn btn-ghost btn-icon btn-sm" aria-label="Save" onclick={() => toast.info('Saved')}><i data-icon="download" data-size="13"></i></button>
			</Toolbar>
		</div>
		<CodeBlock title="Toolbar" language="svelte" code={'<Toolbar>\n  <ToggleGroupRoot bind:value={env}>…</ToggleGroupRoot>\n  <Separator vertical />\n  <button class="btn btn-ghost btn-icon btn-sm">…</button>\n</Toolbar>'} />
	</div>
</section>

<!-- 15 · BREADCRUMB -->
<section class="mb-4" id="breadcrumb" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">15 · Breadcrumb</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<BreadcrumbRoot>
				<BreadcrumbItem><BreadcrumbLink href="/">Workspace</BreadcrumbLink></BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem><BreadcrumbLink href="/settings">Settings</BreadcrumbLink></BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem><BreadcrumbPage>Keys</BreadcrumbPage></BreadcrumbItem>
			</BreadcrumbRoot>
		</div>
		<CodeBlock title="Breadcrumb" language="svelte" code={'<BreadcrumbRoot>\n  <BreadcrumbItem><BreadcrumbLink href="/">Workspace</BreadcrumbLink></BreadcrumbItem>\n  <BreadcrumbSeparator />\n  <BreadcrumbItem><BreadcrumbPage>Keys</BreadcrumbPage></BreadcrumbItem>\n</BreadcrumbRoot>'} />
	</div>
</section>

<!-- 16 · PAGINATION -->
<section class="mb-4" id="pagination" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">16 · Pagination</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<PaginationRoot bind:page total={42}>
				<PaginationPrev />
				<PaginationNumbers />
				<PaginationNext />
			</PaginationRoot>
			<div class="text-xs text-muted-foreground mt-2 font-mono">page: {page} / 42</div>
		</div>
		<CodeBlock title="Pagination" language="svelte" code={'<PaginationRoot bind:page total={42}>\n  <PaginationPrev />\n  <PaginationNumbers siblings={1} />\n  <PaginationNext />\n</PaginationRoot>'} />
	</div>
</section>

<!-- 17 · SEPARATOR -->
<section class="mb-4" id="separator" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">17 · Separator</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<Separator />
			<Separator label="or" />
			<div class="flex items-center" style="height:20px;"><Separator vertical /></div>
		</div>
		<CodeBlock title="Separator" language="svelte" code={'<Separator />\n<Separator label="or" />\n<Separator vertical />'} />
	</div>
</section>

<!-- 18 · SCROLL AREA -->
<section class="mb-4" id="scroll-area" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">18 · ScrollArea</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<ScrollAreaRoot height="180px">
				{#each Array.from({ length: 12 }, (_, i) => i + 1) as n (n)}
					<div class="text-sm text-muted-foreground" style="padding:4px 0;">Строка {n} — скролл внутри блока.</div>
				{/each}
			</ScrollAreaRoot>
		</div>
		<CodeBlock title="ScrollArea" language="svelte" code={'<ScrollAreaRoot height="240px">\n  …long content…\n</ScrollAreaRoot>'} />
	</div>
</section>

<!-- 19 · MENUBAR -->
<section class="mb-4" id="menubar" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">19 · Menubar</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<MenubarRoot>
				<DropdownMenuRoot>
					<DropdownMenuTrigger class="btn btn-ghost btn-sm">File</DropdownMenuTrigger>
					<DropdownMenuContent align="left">
						<DropdownMenuItem onselect={() => toast.info('New')}><i data-icon="plus" data-size="13"></i> New</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem danger onselect={() => toast.error('Closed')}><i data-icon="xmark" data-size="13"></i> Close</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenuRoot>
				<DropdownMenuRoot>
					<DropdownMenuTrigger class="btn btn-ghost btn-sm">Edit</DropdownMenuTrigger>
					<DropdownMenuContent align="left">
						<DropdownMenuItem onselect={() => toast.info('Undo')}><i data-icon="refresh" data-size="13"></i> Undo</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenuRoot>
			</MenubarRoot>
			<p class="text-xs text-muted-foreground mt-2">Каждый пункт — DropdownMenuRoot внутри MenubarRoot.</p>
		</div>
		<CodeBlock title="Menubar" language="svelte" code={'<MenubarRoot>\n  <DropdownMenuRoot>\n    <DropdownMenuTrigger class="btn btn-ghost btn-sm">File</DropdownMenuTrigger>\n    <DropdownMenuContent align="left">…</DropdownMenuContent>\n  </DropdownMenuRoot>\n  <DropdownMenuRoot>…Edit…</DropdownMenuRoot>\n</MenubarRoot>'} />
	</div>
</section>

<!-- 20 · NAVIGATION MENU -->
<section class="mb-4" id="navigation-menu" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">20 · NavigationMenu</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<NavigationMenuRoot>
				<NavigationMenuLink href="/ui" active>Overview</NavigationMenuLink>
				<NavigationMenuLink href="/ui">Logs</NavigationMenuLink>
				<NavigationMenuLink href="/ui">Settings</NavigationMenuLink>
			</NavigationMenuRoot>
		</div>
		<CodeBlock title="NavigationMenu" language="svelte" code={'<NavigationMenuRoot>\n  <NavigationMenuLink href="/" active>Overview</NavigationMenuLink>\n  <NavigationMenuLink href="/logs">Logs</NavigationMenuLink>\n</NavigationMenuRoot>'} />
	</div>
</section>

<!-- 21 · COMMAND -->
<section class="mb-4" id="command" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">21 · Command</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<CommandRoot placeholder="Type a command or search…">
				<CommandInput />
				<CommandList>
					<CommandItem value="New API key" keywords="create add" onselect={() => toast.success('New key')}><i data-icon="plus" data-size="13"></i> New API key</CommandItem>
					<CommandItem value="Open chat" keywords="messages" onselect={() => toast.info('Chat')}><i data-icon="comments" data-size="13"></i> Open chat</CommandItem>
					<CommandItem value="Deploy build" keywords="release" onselect={() => toast.success('Deploying')}><i data-icon="rocket" data-size="13"></i> Deploy build</CommandItem>
				</CommandList>
			</CommandRoot>
			<p class="text-xs text-muted-foreground mt-2">Печатайте — список фильтруется, пустой результат ловится.</p>
		</div>
		<CodeBlock title="Command" language="svelte" code={'<CommandRoot>\n  <CommandInput />\n  <CommandList>\n    <CommandItem value="New API key" onselect={run}>…</CommandItem>\n  </CommandList>\n</CommandRoot>'} />
	</div>
</section>

<!-- 22 · SLIDER -->
<section class="mb-4" id="slider" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">22 · Slider</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<SliderRoot bind:value={sliderVal} min={0} max={100} step={1}>
				<SliderTrack />
			</SliderRoot>
			<div class="text-xs text-muted-foreground mt-2 font-mono">value: {sliderVal}</div>
			<div class="mt-4">
				<SliderRoot bind:value={rangeVal} min={0} max={100} step={1}>
					<SliderTrack />
				</SliderRoot>
				<div class="text-xs text-muted-foreground mt-2 font-mono">range: {rangeVal[0]} – {rangeVal[1]}</div>
			</div>
		</div>
		<CodeBlock title="Slider" language="svelte" code={'<SliderRoot bind:value={vol} min={0} max={100} step={1}>\n  <SliderTrack />\n</SliderRoot>'} />
	</div>
</section>

<!-- 23 · SPLITTER -->
<section class="mb-4" id="splitter" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">23 · Splitter</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body" style="height:240px;">
			<SplitterRoot bind:sizes={split}>
				<SplitterPanel index={0}>
					<div class="card card-body" style="height:100%"><div class="text-sm font-semibold">Left · {split[0]}%</div></div>
				</SplitterPanel>
				<SplitterHandle index={0} />
				<SplitterPanel index={1}>
					<div class="card card-body" style="height:100%"><div class="text-sm font-semibold">Right · {split[1]}%</div></div>
				</SplitterPanel>
			</SplitterRoot>
			<div class="text-xs text-muted-foreground mt-2 font-mono">потяни разделитель</div>
		</div>
		<CodeBlock title="Splitter" language="svelte" code={'<SplitterRoot bind:sizes={[60, 40]}>\n  <SplitterPanel index={0}>…</SplitterPanel>\n  <SplitterHandle index={0} />\n  <SplitterPanel index={1}>…</SplitterPanel>\n</SplitterRoot>'} />
	</div>
</section>

<!-- 24 · CAROUSEL -->
<section class="mb-4" id="carousel" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">24 · Carousel</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<CarouselRoot>
				<CarouselContent>
					{#each ['Первый', 'Второй', 'Третий', 'Четвёртый'] as t (t)}
						<CarouselItem><div class="text-sm font-semibold" style="padding:24px 0;">{t} слайд</div></CarouselItem>
					{/each}
				</CarouselContent>
				<div class="flex gap-2 mt-2">
					<CarouselButton dir="prev" />
					<CarouselButton dir="next" />
				</div>
			</CarouselRoot>
		</div>
		<CodeBlock title="Carousel" language="svelte" code={'<CarouselRoot>\n  <CarouselContent>\n    <CarouselItem width="260px">…</CarouselItem>\n  </CarouselContent>\n  <CarouselButton dir="prev" />\n  <CarouselButton dir="next" />\n</CarouselRoot>'} />
	</div>
</section>

<!-- 25 · LISTBOX -->
<section class="mb-4" id="listbox" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">25 · ListBox</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<ListBoxRoot value="b" multiple>
				<ListBoxItem value="a"><i data-icon="folder" data-size="13"></i> Проекты</ListBoxItem>
				<ListBoxItem value="b"><i data-icon="key" data-size="13"></i> Ключи</ListBoxItem>
				<ListBoxItem value="c"><i data-icon="database" data-size="13"></i> Corpus</ListBoxItem>
			</ListBoxRoot>
			<p class="text-xs text-muted-foreground mt-2">multiple — Ctrl/клик добавляет.</p>
		</div>
		<CodeBlock title="ListBox" language="svelte" code={'<ListBoxRoot value="b" multiple>\n  <ListBoxItem value="a">Проекты</ListBoxItem>\n  <ListBoxItem value="b">Ключи</ListBoxItem>\n</ListBoxRoot>'} />
	</div>
</section>

<!-- 26 · TREE -->
<section class="mb-4" id="tree" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">26 · Tree</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<Tree
				items={[
					{ label: 'src', icon: 'folder', children: [
						{ label: 'lib', icon: 'folder', children: [
							{ label: 'Button.svelte', icon: 'file' },
							{ label: 'Shell.svelte', icon: 'file' }
						]},
						{ label: 'routes', icon: 'folder', children: [{ label: '+page.svelte', icon: 'file' }] }
					]},
					{ label: 'styles.css', icon: 'file' }
				]}
				defaultExpanded={['src']}
			/>
		</div>
		<CodeBlock title="Tree" language="svelte" code={'<Tree\n  items={[\n    { label: "src", icon: "folder", children: [\n      { label: "Button.svelte", icon: "file" }\n    ]},\n    { label: "styles.css", icon: "file" }\n  ]}\n  defaultExpanded={["src"]}\n/>'} />
	</div>
</section>

<!-- 27 · CALENDAR / DATE PICKER -->
<section class="mb-4" id="calendar" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">27 · Calendar · DatePicker</div>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<Calendar bind:value={dateVal} />
		</div>
		<div class="card card-body" id="date-picker" style="scroll-margin-top:80px;">
			<div style="max-width:320px">
				<label class="field-label" for="ui-dp">Report date</label>
				<DatePicker id="ui-dp" bind:value={dateVal} placeholder="Pick a date…" />
				<div class="field-hint">Calendar в поповере; выбрано: {dateVal ? dateVal.toLocaleDateString('en-GB') : '—'}</div>
			</div>
			<div class="mt-3">
				<CodeBlock title="Calendar · DatePicker" language="svelte" code={'<Calendar bind:value={date} />\nn\nn<DatePicker bind:value={date} placeholder="Pick a date…" min={new Date()} />'} />
			</div>
		</div>
	</div>
</section>

<style>
	.eyebrow {
		letter-spacing: 0.06em;
	}
	/* меню/popover не должны обрезаться демо-карточками */
	.card-body {
		overflow: visible;
	}
	.card-body :global(.menu),
	.card-body :global(.dialog-overlay) {
		overflow: visible;
	}
</style>
