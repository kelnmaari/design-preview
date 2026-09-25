<script lang="ts">
	import { Badge, CodeBlock, PageHeader, SearchField } from '$lib/ember/index.js';

	interface Item {
		name: string;
		desc: string;
		code: string;
	}
	interface Section {
		id: string;
		title: string;
		items: Item[];
	}

	// All snippets assume the barrel import at the top of the file:
	// import { Button, Badge, … } from '$lib/ember/index.js';
	const CATALOG: Section[] = [
		{
			id: 'forms',
			title: 'Forms',
			items: [
				{
					name: 'Field',
					desc: 'Обёртка поля: label / hint / error / required',
					code: `<Field label="Workspace" hint="Видно всей команде" required>
  <TextField placeholder="acme" />
</Field>`
				},
				{
					name: 'TextField',
					desc: 'Текстовое поле: mono, multiline, error-состояние',
					code: `<TextField
  label="Model"
  bind:value={model}
  placeholder="ember-large"
  mono
  error={errors.model}
/>`
				},
				{
					name: 'InputGroup',
					desc: 'Поле с приставкой/суффиксом (префиксы ключей, единицы)',
					code: `<InputGroup
  label="API key"
  left="sk-live-"
  right="copy"
  bind:value={key}
  mono
/>`
				},
				{
					name: 'Select',
					desc: 'Нативный select в стилях Ember',
					code: `<Select
  label="Role"
  options={[
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' }
  ]}
  bind:value={role}
/>`
				},
				{
					name: 'Checkbox',
					desc: 'Чекбокс с label / hint / indeterminate',
					code: `<Checkbox label="Require MFA" bind:checked={mfa} />
<Checkbox label="Parent" indeterminate />`
				},
				{
					name: 'RadioGroup',
					desc: 'Группа радио-кнопок, vertical/horizontal',
					code: `<RadioGroup
  label="Plan"
  name="plan"
  orientation="horizontal"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' }
  ]}
  bind:value={plan}
/>`
				},
				{
					name: 'Slider',
					desc: 'Слайдер с min/max/step и значением',
					code: `<Slider label="Temperature" min={0} max={2} step={0.1}
  bind:value={temp} showValue />`
				},
				{
					name: 'Switch',
					desc: 'Тумблер',
					code: `<Switch label="Streaming" bind:checked={stream} />`
				},
				{
					name: 'SearchField',
					desc: 'Поиск с очисткой и ⌘K-подсказкой',
					code: `<SearchField placeholder="Filter keys…" bind:value={q} kbd />`
				},
				{
					name: 'Dropzone',
					desc: 'Зона загрузки файлов со списком',
					code: `<Dropzone
  label="Upload corpus"
  hint="PDF, MD up to 20 MB"
  accept=".pdf,.md"
  multiple
  bind:files={docs}
/>`
				}
			]
		},
		{
			id: 'data',
			title: 'Data',
			items: [
				{
					name: 'DataTable',
					desc: 'Таблица: сортировка, выбор строк, loading/empty',
					code: `<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'requests', label: 'Requests', align: 'right', mono: true },
    { key: 'status', label: 'Status' }
  ]}
  {rows}
  selectable
  bind:selected={ids}
  sortMode="client"
/>`
				},
				{
					name: 'ListGroup',
					desc: 'Список с иконками, бейджами и активным элементом',
					code: `<ListGroup
  items={[
    { icon: 'key', title: 'prod-api-1', desc: '2m ago', badge: 'live', active: true },
    { icon: 'key', title: 'ci-runner', href: '/keys/ci' }
  ]}
  onselect={(item) => open(item)}
/>`
				},
				{
					name: 'Timeline',
					desc: 'Лента событий с тоном точки',
					code: `<Timeline
  items={[
    { time: '09:41', title: 'Deploy v2.4.1', desc: 'api-worker · 3 replicas', tone: 'success' },
    { time: '07:58', title: 'Key rotated: prod-api', tone: 'muted' }
  ]}
/>`
				},
				{
					name: 'Presence',
					desc: 'Индикатор присутствия (online/away/offline)',
					code: `<Presence status="online" label="Alex" />
<Presence status="away" size={10} pulse />`
				},
				{
					name: 'Pagination',
					desc: 'Компактный пагинатор с многоточием',
					code: `<Pagination bind:page={page} total={42} />`
				}
			]
		},
		{
			id: 'overlays',
			title: 'Overlays',
			items: [
				{
					name: 'Modal',
					desc: 'Диалог: Esc + скрим-закрытие, footer-сниппет',
					code: `<Modal bind:open={open} title="Revoke API Key"
  description="Это действие нельзя отменить.">
  <p>Ключ «prod-api-1» будет удалён навсегда.</p>
  {#snippet footer()}
    <Button variant="ghost" size="sm" onclick={() => (open = false)}>Cancel</Button>
    <Button variant="destructive" size="sm">Revoke</Button>
  {/snippet}
</Modal>`
				},
				{
					name: 'ConfirmDialog',
					desc: 'Подтверждение опасного действия, requireText — ввод названия',
					code: `<ConfirmDialog
  bind:open={confirm}
  title="Delete workspace?"
  danger
  requireText="acme"
  onconfirm={destroy}
/>`
				},
				{
					name: 'Popover',
					desc: 'Привязанный поповер; trigger — сниппет с {toggle}',
					code: `<Popover title="Filters" side="bottom">
  {#snippet trigger({ open, toggle })}
    <Button variant="outline" size="sm" onclick={toggle}>
      Filters {open ? '▲' : '▼'}
    </Button>
  {/snippet}
  <Filters />
</Popover>`
				},
				{
					name: 'Tooltip',
					desc: 'Тултип вокруг любого элемента',
					code: `<Tooltip text="Copy to clipboard">
  <Button iconOnly size="sm"><Icon name="copy" /></Button>
</Tooltip>`
				},
				{
					name: 'Alert',
					desc: 'Инлайн-уведомление: info / success / warning / danger',
					code: `<Alert variant="success" title="Deployed"
  description="v2.4.1 is live on worker-02." dismissible />`
				},
				{
					name: 'Banner',
					desc: 'Баннер обновления: ember (градиент) / ghost',
					code: `<Banner variant="ember" title="A new version is available"
  subtitle="You're on v2.2 — view the changelog." />`
				},
				{
					name: 'Toasts',
					desc: 'Хост тостов + стор: toast.success/info/warning/error',
					code: `<!-- один раз в root layout -->
<Toasts />

<!-- где угодно -->
import { toast } from '$lib/ember/index.js';
toast.success('Saved', 'Settings updated just now.');`
				},
				{
					name: 'Dropdown',
					desc: 'Меню; trigger-сниппет получает {toggle}',
					code: `<Dropdown>
  {#snippet trigger({ toggle })}
    <Button variant="ghost" size="sm" onclick={toggle}>
      Actions <Icon name="chevron-down" size={12} />
    </Button>
  {/snippet}
  <button class="menu-item" onclick={rename}>Rename</button>
  <button class="menu-item" onclick={remove}>Delete</button>
</Dropdown>`
				},
				{
					name: 'SlidePanel',
					desc: 'Выезжающая панель (как create-key flow)',
					code: `<SlidePanel bind:open={panel} title="Create API key"
  description="Ключ показывается один раз.">
  <CreateKeyForm />
</SlidePanel>`
				},
				{
					name: 'CommandPalette',
					desc: '⌘K-палитра; слушает хоткей сама',
					code: `<!-- в root layout -->
let paletteOpen = $state(false);
<CommandPalette bind:open={paletteOpen} />`
				}
			]
		},
		{
			id: 'content',
			title: 'Content',
			items: [
				{
					name: 'PageHeader',
					desc: 'Заголовок страницы: eyebrow / title / actions',
					code: `<PageHeader eyebrow="Overview" title="Dashboard"
  subtitle="Что происходит в воркспейсе сегодня.">
  {#snippet actions()}
    <Button variant="ember" size="sm">New key</Button>
  {/snippet}
</PageHeader>`
				},
				{
					name: 'SectionTitle',
					desc: 'Заголовок секции внутри страницы',
					code: `<SectionTitle title="Top models" />`
				},
				{
					name: 'Breadcrumb',
					desc: 'Хлебные крошки',
					code: `<Breadcrumb items={[
  { label: 'Workspace', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Keys' }
]} />`
				},
				{
					name: 'Stepper',
					desc: 'Шаги мастера, horizontal/vertical',
					code: `<Stepper
  steps={[{ label: 'Create' }, { label: 'Configure' }, { label: 'Reveal' }]}
  current={1}
  clickable
/>`
				},
				{
					name: 'Accordion',
					desc: 'Аккордеон с бейджами; контент — body или detail-сниппет',
					code: `<Accordion
  items={[
    { title: 'What is Ember?', body: 'A design system.' },
    { title: 'Themes?', badge: '6' }
  ]}
  multiple
/>`
				},
				{
					name: 'ChatMessage',
					desc: 'Сообщение чата: роли, streaming, sources, actions',
					code: `<ChatMessage
  role="assistant"
  text="Смотри, вот сводка по запросам…"
  streaming
  model="ember-large"
  time="now"
  sources={[{ title: 'q4-report.pdf', snippet: '…' }]}
/>`
				},
				{
					name: 'ChatComposer',
					desc: 'Композер: Enter — отправка, Shift+Enter — перенос',
					code: `<ChatComposer bind:value={draft} sending={busy}
  onsend={send} />`
				},
				{
					name: 'Card',
					desc: 'Карточка с header/footer-сниппетами и spotlight',
					code: `<Card title="Top models" description="By token usage" spotlight>
  {#snippet headerExtra()}
    <Badge variant="primary" dot>live</Badge>
  {/snippet}
  <TokenBars days={30} />
  {#snippet footer()}
    <a class="text-sm text-primary" href="/monitor">Details →</a>
  {/snippet}
</Card>`
				},
				{
					name: 'Badge',
					desc: 'Плашка: primary/amber/success/info/destructive/muted + dot',
					code: `<Badge variant="success" dot>Operational</Badge>
<Badge variant="primary">streaming</Badge>`
				},
				{
					name: 'Kbd',
					desc: 'Клавиша / сочетание',
					code: `<Kbd keys="⌘K" />
<Kbd keys={['Ctrl', 'Shift', 'P']} />`
				},
				{
					name: 'Divider',
					desc: 'Разделитель, с подписью или без',
					code: `<Divider />
<Divider label="or" />`
				},
				{
					name: 'Rating',
					desc: 'Звёзды, readonly-режим',
					code: `<Rating value={4} readonly />
<Rating bind:value={score} max={5} />`
				},
				{
					name: 'EmptyState',
					desc: 'Пустое состояние с действием',
					code: `<EmptyState icon="inbox" title="Nothing here yet"
  description="Create your first project to get started.">
  <Button variant="ember" size="sm">Create project</Button>
</EmptyState>`
				},
				{
					name: 'ErrorState',
					desc: 'Ошибка загрузки с retry',
					code: `<ErrorState
  title="Failed to load keys"
  description="Gateway timeout after 3 attempts."
  onretry={reload}
/>`
				},
				{
					name: 'Skeleton',
					desc: 'Скелетон-заглушка',
					code: `<Skeleton width="100%" height="12px" count={3} />`
				},
				{
					name: 'Spinner',
					desc: 'Спиннер загрузки',
					code: `<Spinner size={16} />`
				},
				{
					name: 'Progress',
					desc: 'Прогресс-бар с тоном',
					code: `<Progress value={68} tone="ember" />
<Progress value={92} tone="success" />`
				},
				{
					name: 'Avatar',
					desc: 'Аватар с инициалами и градиентом',
					code: `<Avatar initials="AK" size={28} />`
				},
				{
					name: 'AvatarStack',
					desc: 'Стопка аватаров + «+N»',
					code: `<AvatarStack avatars={[{ initials: 'AK' }, { initials: 'SR' }]} extra={4} />`
				},
				{
					name: 'CodeBlock',
					desc: 'Блок кода с копированием',
					code: `<CodeBlock title="install.sh" language="bash" code={script} />`
				},
				{
					name: 'CopyButton',
					desc: 'Кнопка копирования с тостом',
					code: `<CopyButton text="sk-live-…" label="Copy key" />`
				}
			]
		},
		{
			id: 'charts',
			title: 'Charts',
			items: [
				{
					name: 'LineChart',
					desc: 'SVG-линия с областью (SSR-safe)',
					code: `<LineChart id="latency" data={[380, 412, 360, 390]}
  height={120} format={(v) => v + ' ms'} />`
				},
				{
					name: 'Donut',
					desc: 'Кольцевая диаграмма + легенда',
					code: `<Donut
  segments={[
    { label: 'ember-large', value: 62, color: 'rgb(var(--chart-1))' },
    { label: 'ember-small', value: 38, color: 'rgb(var(--chart-2))' }
  ]}
  centerValue="9.1M"
  centerLabel="tokens"
/>`
				},
				{
					name: 'Sparkline',
					desc: 'Мини-спарклайн в стат-карточки',
					code: `<Sparkline points="0,30 15,26 30,27 45,20 60,22" width={120} height={36} />`
				},
				{
					name: 'TokenBars',
					desc: 'Столбики токенов по дням (данные сеяные, SSR-safe)',
					code: `<TokenBars days={30} />`
				}
			]
		},
		{
			id: 'system',
			title: 'System',
			items: [
				{
					name: 'Shell',
					desc: 'Каркас приложения: сайдбар + топбар + мобильное меню',
					code: `<!-- root layout -->
<Shell onPalette={() => (paletteOpen = true)}>
  {@render children()}
</Shell>`
				},
				{
					name: 'Button',
					desc: 'Кнопка: 6 вариантов, 3 размера, href → <a>',
					code: `<Button variant="ember" size="sm">Get started</Button>
<Button variant="outline" size="lg" href="/docs">Docs</Button>
<Button variant="ghost" iconOnly onclick={close}>
  <Icon name="xmark" size={13} />
</Button>`
				},
				{
					name: 'Tabs',
					desc: 'Табы с бейджами',
					code: `<Tabs
  tabs={[
    { value: 'overview', label: 'Overview' },
    { value: 'logs', label: 'Logs', badge: '12' }
  ]}
  bind:value={tab}
/>`
				},
				{
					name: 'Segmented',
					desc: 'Сегментный переключатель (environments, ranges)',
					code: `<Segmented
  options={[
    { value: 'prod', label: 'Production' },
    { value: 'staging', label: 'Staging' }
  ]}
  bind:value={env}
/>`
				},
				{
					name: 'StatCard',
					desc: 'Метрика: счётчик анимируется, дельта, иконка, spotlight',
					code: `<StatCard label="Requests" value={84210}
  delta="2.1% vs last wk" deltaTone="up" icon="activity" />`
				},
				{
					name: 'ThemeToggle',
					desc: 'Дропдаун переключения 6 тем',
					code: `<ThemeToggle />`
				},
				{
					name: 'Icon',
					desc: '57 инлайн-SVG иконок (имена = FontAwesome solids)',
					code: `<Icon name="fire" size={14} />`
				}
			]
		},
		{
			id: 'navigation',
			title: 'Navigation patterns',
			items: [
				{
					name: 'Nav · Landing V1–V4',
					desc: '4 варианта верхнего меню лендинга: classic hub / centered pills / glass pill / gradient hairline',
					code: `<!-- живые превью + полный код каждого варианта -->
<a href="/nav/landing">/nav/landing</a>`
				},
				{
					name: 'Topbar A1–A3',
					desc: 'Варианты внутреннего топбара: baseline / breadcrumbs / workspace switcher + env',
					code: `<Topbar variant="breadcrumb" />

<!-- код вариантов: /nav/internal, секция A -->`
				},
				{
					name: 'Sidebar Б1–Б3',
					desc: 'Варианты сайдбара: baseline / icon rail 60px / workspace card + usage footer',
					code: `<Sidebar variant="rail" />

<!-- код вариантов: /nav/internal, секция Б -->`
				}
			]
		}
	];

	let query = $state('');
	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return CATALOG;
		return CATALOG.map((s) => ({
			...s,
			items: s.items.filter(
				(i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
			)
		})).filter((s) => s.items.length > 0);
	});
	const totalItems = $derived(CATALOG.reduce((n, s) => n + s.items.length, 0));
</script>

<svelte:head>
	<title>Component catalog · Ember</title>
</svelte:head>

<PageHeader eyebrow="Library" title="Component catalog"
	subtitle={'Все ' + totalItems + ' компонентов дизайн-системы с примером кода. Живые демо — в галереях /components и /nav.'}>
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
					<CodeBlock title={item.name} language="svelte" code={item.code} />
				</article>
			{/each}
		</div>
	</div>
{/each}

{#if filtered.length === 0}
	<div class="text-sm text-muted-foreground" style="padding:2rem 0">
		Ничего не найдено по запросу «{query}».
	</div>
{/if}

<style>
	.catalog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
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
	.nv-sec {
		margin: 2rem 0;
		scroll-margin-top: 70px;
	}
</style>
