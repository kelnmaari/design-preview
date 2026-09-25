<script lang="ts">
	import {
		AccordionRoot,
		AccordionItem,
		AccordionTrigger,
		AccordionContent,
		Alert,
		Avatar,
		AvatarStack,
		Badge,
		Banner,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbPage,
		BreadcrumbRoot,
		BreadcrumbSeparator,
		Button,
		Calendar,
		Card,
		ChatComposer,
		ChatMessage,
		Checkbox,
		CodeBlock,
		ConfirmDialog,
		CopyButton,
		DataTable,
		DatePicker,
		Divider,
		Donut,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuRoot,
		DropdownMenuTrigger,
		DropdownMenuSeparator,
		Dropzone,
		EmptyState,
		ErrorState,
		Field,
		Icon,
		InputGroup,
		LineChart,
		ListGroup,
		ListBoxItem,
		ListBoxRoot,
		Modal,
		PageHeader,
		PaginationNext,
		PaginationNumbers,
		PaginationPrev,
		PaginationRoot,
		PopoverContent,
		PopoverRoot,
		PopoverTrigger,
		Presence,
		Progress,
		RadioGroup,
		Rating,
		SearchField,
		Select,
		SectionTitle,
		SelectContent,
		SelectItem,
		SelectRoot,
		SelectTrigger,
		Separator,
		Skeleton,
		Segmented,
		Kbd,
		SliderRoot,
		SliderTrack,
		Sparkline,
		Spinner,
		SlidePanel,
		StatCard,
		Stepper,
		Switch,
		Tabs,
		TextField,
		ThemeToggle,
	 Timeline,
		TokenBars,
		Tooltip,
		Tree,
		toast
	} from '$lib/ember/index.js';

	interface Item {
		name: string;
		desc: string;
		code: string;
		demo?: boolean;
	}
	interface Section {
		id: string;
		title: string;
		items: Item[];
	}

	/* ---- локальное состояние живых демо ---- */
	let cat = $state({
		text: 'worker-02',
		group: 'sk-live-abc123',
		role: 'editor',
		mfa: true,
		plan: 'free',
		temp: 0.7,
		stream: true,
		search: '',
		tab: 'overview',
		env: 'prod',
		page: 5,
		rating: 4,
		panel: false,
		modal: false,
		confirm: false,
		pop: false,
		drop: false,
		files: [] as File[],
		list: 'b' as string,
		date: undefined as Date | undefined,
		toggle: 'grid'
	});

	const ROLES = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' }
	];
	const PLANS = [
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' }
	];
	const TABLE_ROWS = [
		{ id: 'r1', name: 'prod-api-1', requests: 48210, status: 'active' },
		{ id: 'r2', name: 'ci-runner', requests: 1402, status: 'limited' }
	];
	const TREE_ITEMS = [
		{
			label: 'src',
			icon: 'folder' as const,
			children: [{ label: 'Button.svelte', icon: 'file' as const }, { label: 'Shell.svelte', icon: 'file' as const }]
		},
		{ label: 'styles.css', icon: 'file' as const }
	];

	const CATALOG: Section[] = [
		{
			id: 'forms',
			title: 'Forms',
			items: [
				{ name: 'Field', desc: 'Обёртка поля: label / hint / error / required', demo: true,
					code: '<Field label="Workspace" hint="Видно всей команде" required>\n  <TextField placeholder="acme" />\n</Field>' },
				{ name: 'TextField', desc: 'Текстовое поле: mono, multiline, error', demo: true,
					code: '<TextField label="Model" bind:value={model} placeholder="ember-large" mono />' },
				{ name: 'InputGroup', desc: 'Поле с приставкой/суффиксом', demo: true,
					code: '<InputGroup label="API key" left="sk-live-" bind:value={key} mono />' },
				{ name: 'Select', desc: 'Нативный select в стилях Ember', demo: true,
					code: '<Select label="Role" options={[{value:"admin",label:"Admin"}]} bind:value={role} />' },
				{ name: 'Checkbox', desc: 'Чекбокс с label / hint / indeterminate', demo: true,
					code: '<Checkbox label="Require MFA" bind:checked={mfa} />' },
				{ name: 'RadioGroup', desc: 'Группа радио-кнопок', demo: true,
					code: '<RadioGroup label="Plan" name="plan" options={plans} bind:value={plan} />' },
				{ name: 'Slider', desc: 'Слайдер с min/max/step', demo: true,
					code: '<SliderRoot bind:value={temp} min={0} max={2} step={0.1}>\n  <SliderTrack />\n</SliderRoot>' },
				{ name: 'Switch', desc: 'Тумблер', demo: true,
					code: '<Switch label="Streaming" bind:checked={stream} />' },
				{ name: 'SearchField', desc: 'Поиск с очисткой и ⌘K-подсказкой', demo: true,
					code: '<SearchField placeholder="Filter keys…" bind:value={q} kbd />' },
				{ name: 'Dropzone', desc: 'Зона загрузки файлов', demo: true,
					code: '<Dropzone label="Upload corpus" accept=".pdf,.md" multiple bind:files={docs} />' },
				{ name: 'Calendar', desc: 'Месячная сетка: сегодня, min/max', demo: true,
					code: '<Calendar bind:value={date} min={new Date()} />' },
				{ name: 'DatePicker', desc: 'Инпут + Popover + Calendar', demo: true,
					code: '<DatePicker bind:value={date} placeholder="Pick a date…" />' }
			]
		},
		{
			id: 'data',
			title: 'Data',
			items: [
				{ name: 'DataTable', desc: 'Таблица: сортировка, выбор строк', demo: true,
					code: '<DataTable columns={[{key:"name",label:"Name",sortable:true}]} {rows} selectable bind:selected={ids} />' },
				{ name: 'ListGroup', desc: 'Список с иконками и активным элементом', demo: true,
					code: '<ListGroup items={[{icon:"key",title:"prod-api-1",badge:"live",active:true}]} onselect={open} />' },
				{ name: 'Timeline', desc: 'Лента событий с тоном точки', demo: true,
					code: '<Timeline items={[{time:"09:41",title:"Deploy v2.4.1",tone:"success"}]} />' },
				{ name: 'Presence', desc: 'Индикатор присутствия', demo: true,
					code: '<Presence status="online" label="Alex" />\n<Presence status="online" pulse />' },
				{ name: 'Pagination', desc: 'Компактный пагинатор', demo: true,
					code: '<PaginationRoot bind:page={page} total={42}>\n  <PaginationPrev />\n  <PaginationNumbers />\n  <PaginationNext />\n</PaginationRoot>' },
				{ name: 'Tree', desc: 'Рекурсивное дерево с раскрытием', demo: true,
					code: '<Tree items={[{ label: "src", icon: "folder", children: [...] }]} defaultExpanded={["src"]} />' }
			]
		},
		{
			id: 'overlays',
			title: 'Overlays',
			items: [
				{ name: 'Modal', desc: 'Диалог: Esc + скрим, footer-сниппет', demo: true,
					code: '<Modal bind:open={open} title="Revoke API Key">\n  {#snippet footer()}\n    <Button variant="destructive">Revoke</Button>\n  {/snippet}\n</Modal>' },
				{ name: 'ConfirmDialog', desc: 'Подтверждение опасного действия', demo: true,
					code: '<ConfirmDialog bind:open={open} title="Delete?" danger onconfirm={destroy} />' },
				{ name: 'Popover', desc: 'Привязанный поповер', demo: true,
					code: '<PopoverRoot>\n  <PopoverTrigger>Filters</PopoverTrigger>\n  <PopoverContent>…</PopoverContent>\n</PopoverRoot>' },
				{ name: 'Tooltip', desc: 'Тултип вокруг любого элемента', demo: true,
					code: '<Tooltip text="Copy to clipboard">\n  <Button iconOnly size="sm"><Icon name="copy" /></Button>\n</Tooltip>' },
				{ name: 'Alert', desc: 'Инлайн-уведомление: info/success/warning/danger', demo: true,
					code: '<Alert variant="success" title="Deployed" description="v2.4.1 is live." dismissible />' },
				{ name: 'Banner', desc: 'Баннер обновления: ember / ghost', demo: true,
					code: '<Banner variant="ember" title="A new version is available" subtitle="You are on v2.2." />' },
				{ name: 'Toasts', desc: 'Тосты из JS: toast.success/info/warning/error', demo: true,
					code: "toast.success('Deployed', 'v2.4.1 is live on worker-02.');" },
				{ name: 'Dropdown', desc: 'Меню; trigger-сниппет с {toggle}', demo: true,
					code: '<Dropdown>\n  {#snippet trigger({ toggle })}\n    <Button onclick={toggle}>Actions</Button>\n  {/snippet}\n  <button class="menu-item">Rename</button>\n</Dropdown>' },
				{ name: 'SlidePanel', desc: 'Выезжающая панель', demo: true,
					code: '<SlidePanel bind:open={panel} title="Create API key">…</SlidePanel>' },
				{ name: 'CommandPalette', desc: '⌘K-палитра; слушает хоткей сама', demo: false,
					code: '<!-- в root layout -->\n<CommandPalette bind:open={paletteOpen} />' }
			]
		},
		{
			id: 'content',
			title: 'Content',
			items: [
				{ name: 'PageHeader', desc: 'Заголовок страницы: eyebrow / title / actions', demo: true,
					code: '<PageHeader eyebrow="Overview" title="Dashboard">\n  {#snippet actions()}\n    <Button variant="ember" size="sm">New</Button>\n  {/snippet}\n</PageHeader>' },
				{ name: 'SectionTitle', desc: 'Заголовок секции', demo: true,
					code: '<SectionTitle title="Top models" />' },
				{ name: 'Breadcrumb', desc: 'Хлебные крошки (parts)', demo: true,
					code: '<BreadcrumbRoot>\n  <BreadcrumbItem><BreadcrumbLink href="/">Workspace</BreadcrumbLink></BreadcrumbItem>\n  <BreadcrumbSeparator />\n  <BreadcrumbItem><BreadcrumbPage>Keys</BreadcrumbPage></BreadcrumbItem>\n</BreadcrumbRoot>' },
				{ name: 'Stepper', desc: 'Шаги мастера', demo: true,
					code: '<Stepper steps={[{label:"Create"},{label:"Configure"},{label:"Reveal"}]} current={1} />' },
				{ name: 'Accordion', desc: 'Аккордеон с бейджами', demo: true,
					code: '<AccordionRoot openIds={[\'a1\']}>\n  <AccordionItem id="a1" title="What is Ember?">\n    <AccordionTrigger />\n    <AccordionContent>A design system.</AccordionContent>\n  </AccordionItem>\n</AccordionRoot>' },
				{ name: 'ChatMessage', desc: 'Сообщение чата: streaming, sources', demo: true,
					code: '<ChatMessage role="assistant" text="Сводка по запросам…" streaming model="ember-large" />' },
				{ name: 'ChatComposer', desc: 'Композер: Enter — отправка', demo: true,
					code: '<ChatComposer bind:value={draft} onsend={send} />' },
				{ name: 'Card', desc: 'Карточка с header/footer и spotlight', demo: true,
					code: '<Card title="Top models" description="By usage" spotlight>\n  {#snippet headerExtra()}<Badge variant="primary" dot>live</Badge>{/snippet}\n</Card>' },
				{ name: 'Badge', desc: 'Плашка: 6 вариантов + dot', demo: true,
					code: '<Badge variant="success" dot>Operational</Badge>\n<Badge variant="primary">streaming</Badge>' },
				{ name: 'Kbd', desc: 'Клавиша / сочетание', demo: true,
					code: '<Kbd keys="⌘K" />' },
				{ name: 'Divider', desc: 'Разделитель', demo: true,
					code: '<Divider />\n<Divider label="or" />' },
				{ name: 'Rating', desc: 'Звёзды', demo: true,
					code: '<Rating value={4} readonly />' },
				{ name: 'EmptyState', desc: 'Пустое состояние с действием', demo: true,
					code: '<EmptyState icon="inbox" title="Nothing here yet">\n  <Button variant="ember" size="sm">Create</Button>\n</EmptyState>' },
				{ name: 'ErrorState', desc: 'Ошибка загрузки с retry', demo: true,
					code: '<ErrorState title="Failed to load" onretry={reload} />' },
				{ name: 'Skeleton', desc: 'Скелетон-заглушка', demo: true,
					code: '<Skeleton width="100%" height="12px" count={3} />' },
				{ name: 'Spinner', desc: 'Спиннер', demo: true,
					code: '<Spinner size={16} />' },
				{ name: 'Progress', desc: 'Прогресс-бар', demo: true,
					code: '<Progress value={68} tone="ember" />' },
				{ name: 'Avatar', desc: 'Аватар с инициалами', demo: true,
					code: '<Avatar initials="AK" size={28} />' },
				{ name: 'AvatarStack', desc: 'Стопка аватаров + «+N»', demo: true,
					code: '<AvatarStack avatars={[{initials:"AK"},{initials:"SR"}]} extra={4} />' },
				{ name: 'CodeBlock', desc: 'Блок кода с копированием', demo: true,
					code: '<CodeBlock title="install.sh" language="bash" code={script} />' },
				{ name: 'CopyButton', desc: 'Кнопка копирования с тостом', demo: true,
					code: '<CopyButton text="sk-live-…" label="Copy key" />' }
			]
		},
		{
			id: 'charts',
			title: 'Charts',
			items: [
				{ name: 'LineChart', desc: 'SVG-линия с областью', demo: true,
					code: '<LineChart id="latency" data={[380, 412, 360, 390]} height={120} />' },
				{ name: 'Donut', desc: 'Кольцевая диаграмма + легенда', demo: true,
					code: '<Donut segments={[{label:"large",value:62},{label:"small",value:38}]} centerValue="9.1M" />' },
				{ name: 'Sparkline', desc: 'Мини-спарклайн', demo: true,
					code: '<Sparkline points="M0,30 L15,26 L30,27 L45,20" width={120} height={36} />' },
				{ name: 'TokenBars', desc: 'Столбики токенов по дням', demo: true,
					code: '<TokenBars days={30} />' }
			]
		},
		{
			id: 'system',
			title: 'System',
			items: [
				{ name: 'Shell', desc: 'Каркас приложения: сайдбар + топбар', demo: false,
					code: '<!-- root layout -->\n<Shell onPalette={() => (paletteOpen = true)}>\n  {@render children()}\n</Shell>' },
				{ name: 'Button', desc: 'Кнопка: 6 вариантов, 3 размера', demo: true,
					code: '<Button variant="ember" size="sm">Get started</Button>\n<Button variant="outline" size="lg" href="/docs">Docs</Button>' },
				{ name: 'Tabs', desc: 'Табы с бейджами', demo: true,
					code: '<Tabs tabs={[{value:"overview",label:"Overview"}]} bind:value={tab} />' },
				{ name: 'Segmented', desc: 'Сегментный переключатель', demo: true,
					code: '<Segmented options={[{value:"prod",label:"Production"}]} bind:value={env} />' },
				{ name: 'StatCard', desc: 'Метрика с анимацией', demo: true,
					code: '<StatCard label="Requests" value={84210} delta="2.1%" deltaTone="up" icon="activity" />' },
				{ name: 'ThemeToggle', desc: 'Дропдаун переключения 6 тем', demo: true,
					code: '<ThemeToggle />' },
				{ name: 'Icon', desc: '90+ инлайн-SVG иконок (имена = FontAwesome)', demo: true,
					code: '<Icon name="fire" size={14} />' }
			]
		},
		{
			id: 'navigation',
			title: 'Navigation patterns',
			items: [
				{ name: 'Nav · Landing V1–V4', desc: '4 варианта верхнего меню лендинга', demo: false,
					code: '<!-- живые превью + код: -->\n<a href="/nav/landing">/nav/landing</a>' },
				{ name: 'Topbar A1–A3', desc: 'Baseline / breadcrumbs / workspace switcher', demo: false,
					code: '<!-- живые превью + код: -->\n<a href="/nav/internal">/nav/internal</a>' },
				{ name: 'Sidebar Б1–Б3', desc: 'Baseline / icon rail 60px / workspace card', demo: false,
					code: '<!-- живые превью + код: -->\n<a href="/nav/internal">/nav/internal</a>' }
			]
		}
	];

	let query = $state('');
	const filtered = $derived.by(() => {
		const qq = query.trim().toLowerCase();
		if (!qq) return CATALOG;
		return CATALOG.map((s) => ({
			...s,
			items: s.items.filter((i) => i.name.toLowerCase().includes(qq) || i.desc.toLowerCase().includes(qq))
		})).filter((s) => s.items.length > 0);
	});
	const totalItems = $derived(CATALOG.reduce((n, s) => n + s.items.length, 0));

	function fireToast() {
		toast.success('Deployed', 'v2.4.1 is live on worker-02.');
	}
	function retryDemo() {
		toast.info('Retrying…', 'Демо-действие компонента ErrorState.');
	}
</script>

<svelte:head>
	<title>Component catalog · Ember</title>
</svelte:head>

<PageHeader eyebrow="Library" title="Component catalog"
	subtitle={'Все ' + totalItems + ' компонентов с живым примером и кодом интеграции. Наведи на карточку — превью интерактивно.'}>
	{#snippet actions()}
		<div style="width:260px">
			<SearchField placeholder="Фильтр по названию…" bind:value={query} />
		</div>
	{/snippet}
</PageHeader>

<div class="flex gap-2 mb-4" style="flex-wrap:wrap">
	{#each CATALOG as section (section.id)}
		<a href="#{section.id}" class="badge badge-muted">{section.title}</a>
	{/each}
	<a href="/nav/landing" class="badge badge-primary">/nav</a>
	<a href="/ui" class="badge badge-primary">/ui</a>
</div>

{#each filtered as section (section.id)}
	<div class="nv-sec" id={section.id}>
		<div class="eyebrow mb-2">{section.title}</div>
		<div class="catalog-grid">
			{#each section.items as item (item.name)}
				<article class="catalog-card" id={item.name} style="scroll-margin-top:80px;">
					<header>
						<h3 class="catalog-name">{item.name}</h3>
						<p class="catalog-desc">{item.desc}</p>
					</header>
					{#if item.demo}
						<div class="catalog-demo">
							{@render demoFor(item.name)}
						</div>
					{/if}
					<CodeBlock title={item.name} language="svelte" code={item.code} />
				</article>
			{/each}
		</div>
	</div>
{/each}

{#snippet demoFor(name: string)}
	{#if name === 'Field'}
		<Field label="Workspace" hint="Видно всей команде" required><TextField placeholder="acme" /></Field>
	{:else if name === 'TextField'}
		<TextField label="Model" placeholder="ember-large" value={cat.text} mono />
	{:else if name === 'InputGroup'}
		<InputGroup label="API key" left="sk-live-" bind:value={cat.group} mono />
	{:else if name === 'Select'}
		<Select label="Role" options={ROLES} bind:value={cat.role} />
	{:else if name === 'Checkbox'}
		<Checkbox label="Require MFA" bind:checked={cat.mfa} />
	{:else if name === 'RadioGroup'}
		<RadioGroup label="Plan" name="cat-plan" options={PLANS} bind:value={cat.plan} />
	{:else if name === 'Slider'}
		<SliderRoot bind:value={cat.temp} min={0} max={2} step={0.1}>
			<SliderTrack />
		</SliderRoot>
	{:else if name === 'Switch'}
		<Switch label="Streaming" bind:checked={cat.stream} />
	{:else if name === 'SearchField'}
		<SearchField placeholder="Filter keys…" bind:value={cat.search} kbd />
	{:else if name === 'Dropzone'}
		<Dropzone label="Upload corpus" accept=".pdf,.md" bind:files={cat.files} />
	{:else if name === 'DataTable'}
		<DataTable
			columns={[
				{ key: 'name', label: 'Name', sortable: true },
				{ key: 'requests', label: 'Requests', align: 'right' }
			]}
			rows={TABLE_ROWS}
		/>
	{:else if name === 'ListGroup'}
		<ListGroup items={[{ icon: 'key', title: 'prod-api-1', desc: '2m ago', badge: 'live', active: true }, { icon: 'key', title: 'ci-runner' }]} />
	{:else if name === 'Timeline'}
		<Timeline items={[{ time: '09:41', title: 'Deploy v2.4.1', desc: 'api-worker × 3', tone: 'success' }, { time: '07:58', title: 'Key rotated', tone: 'muted' }]} />
	{:else if name === 'Presence'}
		<div class="flex items-center gap-3">
			<Presence status="online" label="Alex" />
			<Presence status="online" pulse />
		</div>
	{:else if name === 'Pagination'}
		<PaginationRoot bind:page={cat.page} total={42}>
			<PaginationPrev />
			<PaginationNumbers />
			<PaginationNext />
		</PaginationRoot>
	{:else if name === 'Modal'}
		<Button variant="outline" size="sm" onclick={() => (cat.modal = true)}>Open modal</Button>
		<Modal bind:open={cat.modal} title="Revoke API key">
			<p class="text-sm text-muted-foreground">Ключ будет удалён навсегда.</p>
			{#snippet footer()}
				<Button variant="destructive" size="sm" onclick={() => (cat.modal = false)}>Revoke</Button>
			{/snippet}
		</Modal>
	{:else if name === 'ConfirmDialog'}
		<Button variant="outline" size="sm" onclick={() => (cat.confirm = true)}>Delete…</Button>
		<ConfirmDialog bind:open={cat.confirm} title="Delete «acme»?" danger onconfirm={() => toast.error('Deleted')} />
	{:else if name === 'Popover'}
		<PopoverRoot bind:open={cat.pop}>
			<PopoverTrigger class="btn btn-outline btn-sm">Filters</PopoverTrigger>
			<PopoverContent>
				<div class="text-sm font-medium">Filters</div>
				<input class="input mt-2" placeholder="status = active" />
			</PopoverContent>
		</PopoverRoot>
	{:else if name === 'Tooltip'}
		<Tooltip text="Copies the key to clipboard">
			<Button iconOnly size="sm" onclick={() => {}}><Icon name="copy" size={13} /></Button>
		</Tooltip>
	{:else if name === 'Alert'}
		<Alert variant="success" title="Deployed" description="v2.4.1 is live on worker-02." dismissible />
	{:else if name === 'Banner'}
		<Banner variant="ember" title="A new version is available" subtitle="You're on v2.2 — view the changelog." />
	{:else if name === 'Toasts'}
		<Button variant="outline" size="sm" onclick={fireToast}><i data-icon="bell" data-size="13"></i> Fire toast</Button>
	{:else if name === 'Dropdown'}
		<DropdownMenuRoot>
			<DropdownMenuTrigger class="btn btn-outline btn-sm">Actions</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onselect={() => toast.info('Renamed')}><i data-icon="pencil" data-size="13"></i> Rename</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem danger onselect={() => toast.error('Revoked')}><i data-icon="trash" data-size="13"></i> Revoke</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuRoot>
	{:else if name === 'SlidePanel'}
		<Button variant="outline" size="sm" onclick={() => (cat.panel = true)}>Open panel</Button>
		<SlidePanel bind:open={cat.panel} title="Create API key" description="Панель выезжает справа.">
			<p class="text-sm text-muted-foreground">Форма здесь.</p>
		</SlidePanel>
	{:else if name === 'CommandPalette'}
		<p class="text-xs text-muted-foreground">Нажми ⌘K или кнопку в топбаре — палитра уже смонтирована в layout.</p>
	{:else if name === 'PageHeader'}
		<PageHeader eyebrow="Overview" title="Dashboard">
			{#snippet actions()}
				<Button variant="ember" size="sm">New key</Button>
			{/snippet}
		</PageHeader>
	{:else if name === 'SectionTitle'}
		<SectionTitle title="Top models" />
	{:else if name === 'Breadcrumb'}
		<BreadcrumbRoot>
			<BreadcrumbItem><BreadcrumbLink href="/">Workspace</BreadcrumbLink></BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem><BreadcrumbPage>Keys</BreadcrumbPage></BreadcrumbItem>
		</BreadcrumbRoot>
	{:else if name === 'Stepper'}
		<Stepper steps={[{ label: 'Create' }, { label: 'Configure' }, { label: 'Reveal' }]} current={1} />
	{:else if name === 'Accordion'}
		<AccordionRoot openIds={['a1']}>
			<AccordionItem id="a1" title="What is Ember?" badge="DS">
				<AccordionTrigger />
				<AccordionContent>Токены + классы + Svelte-компоненты.</AccordionContent>
			</AccordionItem>
		</AccordionRoot>
	{:else if name === 'ChatMessage'}
		<ChatMessage role="assistant" text="Сводка по запросам за неделю…" streaming model="ember-large" time="now" />
	{:else if name === 'ChatComposer'}
		<ChatComposer placeholder="Ask anything…" />
	{:else if name === 'Card'}
		<Card title="Top models" description="By token usage" spotlight>
			{#snippet headerExtra()}
				<Badge variant="primary" dot>live</Badge>
			{/snippet}
			<p class="text-sm text-muted-foreground">gpt-4o-mini · 842k tokens</p>
		</Card>
	{:else if name === 'Badge'}
		<div class="flex gap-2 flex-wrap">
			<Badge variant="success" dot>Operational</Badge>
			<Badge variant="primary">streaming</Badge>
			<Badge variant="amber">limited</Badge>
		</div>
	{:else if name === 'Kbd'}
		<Kbd keys="⌘K" />
	{:else if name === 'Divider'}
		<div style="width:100%">
			<Divider label="or" />
		</div>
	{:else if name === 'Rating'}
		<Rating bind:value={cat.rating} max={5} />
	{:else if name === 'EmptyState'}
		<EmptyState icon="inbox" title="Nothing here yet" description="Создай первый проект.">
			<Button variant="ember" size="sm">Create</Button>
		</EmptyState>
	{:else if name === 'ErrorState'}
		<ErrorState title="Failed to load" onretry={retryDemo} />
	{:else if name === 'Skeleton'}
		<div style="width:100%">
			<Skeleton width="100%" height="12px" count={3} />
		</div>
	{:else if name === 'Spinner'}
		<Spinner size={16} />
	{:else if name === 'Progress'}
		<Progress value={68} tone="ember" />
	{:else if name === 'Avatar'}
		<Avatar initials="AK" size={28} />
	{:else if name === 'AvatarStack'}
		<AvatarStack avatars={[{ initials: 'AK' }, { initials: 'SR' }]} extra={4} />
	{:else if name === 'CodeBlock'}
		<CodeBlock title="hello.sh" language="bash" code={'echo "hello ember"'} />
	{:else if name === 'CopyButton'}
		<CopyButton text="sk-live-9f2e4c1b" label="Copy key" />
	{:else if name === 'LineChart'}
		<LineChart id="cat-line" data={[380, 412, 360, 390, 350]} height={90} />
	{:else if name === 'Donut'}
		<Donut segments={[{ label: 'large', value: 62, color: 'rgb(var(--chart-1))' }, { label: 'small', value: 38, color: 'rgb(var(--chart-2))' }]} size={110} centerValue="9.1M" />
	{:else if name === 'Sparkline'}
		<Sparkline points="M0,30 L15,26 L30,27 L45,20 L60,22 L75,14" width={120} height={36} />
	{:else if name === 'TokenBars'}
		<TokenBars days={30} />
	{:else if name === 'Button'}
		<div class="flex gap-2 flex-wrap items-center">
			<Button variant="ember" size="sm">Get started</Button>
			<Button variant="outline" size="sm">Docs</Button>
			<Button variant="ghost" size="sm">Cancel</Button>
		</div>
	{:else if name === 'Tabs'}
		<Tabs tabs={[{ value: 'overview', label: 'Overview' }, { value: 'logs', label: 'Logs', badge: '12' }]} bind:value={cat.tab} />
	{:else if name === 'Segmented'}
		<Segmented options={[{ value: 'prod', label: 'Production' }, { value: 'staging', label: 'Staging' }]} bind:value={cat.env} />
	{:else if name === 'StatCard'}
		<StatCard label="Requests" value={84210} delta="2.1% vs last wk" deltaTone="up" icon="activity" />
	{:else if name === 'ThemeToggle'}
		<ThemeToggle />
	{:else if name === 'Icon'}
		<div class="flex gap-3 items-center text-primary">
			<Icon name="fire" size={16} />
			<Icon name="bolt" size={16} />
			<Icon name="sparkles" size={16} />
		</div>
	{/if}
{/snippet}

{#if filtered.length === 0}
	<div class="text-sm text-muted-foreground" style="padding:2rem 0">
		Ничего не найдено по запросу «{query}».
	</div>
{/if}

<style>
	.catalog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 0.75rem;
	}
	.catalog-card {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-card);
		padding: 0.875rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}
	.catalog-name {
		font-family: var(--font-mono);
		font-size: 13.5px;
		font-weight: 600;
		color: var(--color-primary);
	}
	.catalog-desc {
		font-size: 12px;
		color: var(--color-muted-foreground);
		margin-top: 2px;
		line-height: 1.5;
	}
	.catalog-demo {
		border: 1px dashed var(--color-border-strong);
		border-radius: var(--radius-md);
		background: var(--color-background);
		padding: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: left;
		min-height: 64px;
		overflow: visible;
	}
	.nv-sec {
		margin: 2rem 0;
		scroll-margin-top: 70px;
	}
</style>
