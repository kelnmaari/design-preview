<script lang="ts">
	import '../nav.css';
	import { Badge, Button, CodeBlock, Icon, StatCard } from '$lib/ember/index.js';
	import Topbar from './Topbar.svelte';
	import Sidebar from './Sidebar.svelte';

	type TopbarVariant = 'baseline' | 'breadcrumb' | 'workspace';
	type SidebarVariant = 'baseline' | 'rail' | 'workspace';

	interface Frame {
		num: string;
		title: string;
		desc: string;
		tb: TopbarVariant;
		sb: SidebarVariant;
		code: string;
		codeTitle: string;
	}

	const CODE_A1 = `<!-- A1 — топбар по умолчанию. Это ровно то, что рисует Shell.svelte:
     поиск с ⌘K слева, справа команды / уведомления / тема. -->
<Shell onPalette={() => (paletteOpen = true)}>
  <main class="content">
    <PageHeader title="Dashboard" subtitle="…">
      {#snippet actions()}
        <Button variant="outline" size="sm">Export</Button>
        <Button variant="ember" size="sm">New key</Button>
      {/snippet}
    </PageHeader>
  </main>
</Shell>`;

	const CODE_A2 = `<header class="topbar">
  <div class="crumbs">
    <a href="/">Workspace</a>
    <Icon name="chevron-right" size={12} />
    <span class="current">Dashboard</span>
    <Badge variant="success" dot>live</Badge>
  </div>
  <div class="topbar-spacer"></div>
  <button class="icon-btn" data-tip="Search ⌘K" onclick={openPalette}>
    <Icon name="magnifying-glass" size={15} />
  </button>
  <button class="icon-btn" data-tip="Notifications"><Icon name="bell" size={15} /></button>
  <ThemeToggle />
  <span class="avatar chip">AK</span>
</header>

<style>
  .crumbs { display:flex; align-items:center; gap:7px; font-size:13px;
    color:var(--color-subtle); }
  .crumbs .current { color:var(--color-foreground); font-weight:500; }
  .avatar.chip { width:26px; height:26px; font-size:10px; margin-left:2px; }
</style>`;

	const CODE_A3 = `<script lang="ts">
  let env = $state('prod');
  const envOptions = [
    { value: 'prod', label: 'Production' },
    { value: 'staging', label: 'Staging' }
  ];
<\/script>

<header class="topbar">
  <button class="ws-pill">
    <span class="ws-logo">A</span> Acme Inc
    <span class="ws-sub">/ production</span>
    <Icon name="chevron-down" size={12} />
  </button>
  <div class="topbar-spacer"></div>
  <Segmented options={envOptions} bind:value={env} />
  <button class="icon-btn" data-tip="Docs &amp; support"><Icon name="book" size={15} /></button>
  <ThemeToggle />
  <span class="avatar chip">AK</span>
</header>

<style>
  .ws-pill { display:flex; align-items:center; gap:8px; height:32px;
    padding:0 8px 0 6px; border-radius:var(--radius-md);
    border:1px solid var(--color-border); background:var(--color-background);
    font-size:12.5px; font-weight:600; }
  .ws-pill:hover { border-color:var(--color-border-strong); }
  .ws-logo { width:22px; height:22px; border-radius:6px;
    background-image:linear-gradient(135deg, #f59e0b, #f43f5e);
    display:grid; place-items:center; color:#fff; font-weight:800; font-size:11px; }
  .ws-sub { color:var(--color-subtle); font-size:11px; font-family:var(--font-mono); }
</style>`;

	const CODE_B1 = `<!-- Б1 — сайдбар по умолчанию: секции Workspace / Platform / Admin
     + карточка пользователя в подвале. Это Shell.svelte из $lib/ember. -->
<Shell onPalette={() => (paletteOpen = true)}>
  {@render children()}
</Shell>`;

	const CODE_B2 = `<aside class="sidebar sb-rail">
  <a class="sidebar-brand" href="/"><div class="logo">E</div></a>
  <nav class="sidebar-nav">
    {#each items as it (it.label)}
      <a class="rail-item" class:active={it.active} data-tip={it.label} href={it.href}>
        <Icon name={it.icon} size={16} />
        {#if it.badge}<span class="rail-badge">{it.badge}</span>{/if}
      </a>
    {/each}
  </nav>
</aside>

<style>
  .sb-rail { width:60px !important; }        /* 224px → 60px, +164px контенту */
  .sb-rail .sidebar-nav { display:flex; flex-direction:column; align-items:center; }
  .rail-item { position:relative; width:36px; height:36px; display:grid;
    place-items:center; border-radius:var(--radius-sm);
    color:var(--color-muted-foreground); }
  .rail-item:hover { background:var(--color-accent); color:var(--color-foreground); }
  .rail-item.active { background:rgb(var(--tw-primary) / .12); color:var(--color-primary); }
  .rail-item.active::before { content:""; position:absolute; left:-12px; top:7px; bottom:7px;
    width:3px; border-radius:3px;                            /* gradient active bar */
    background-image:linear-gradient(180deg, #f59e0b, #f43f5e);
    box-shadow:0 0 10px rgb(244 63 94 / .6); }
  .rail-badge { position:absolute; top:2px; right:2px; min-width:14px; height:14px;
    border-radius:9999px; background:var(--color-primary); color:#fff;
    font-size:9px; font-weight:700; font-family:var(--font-mono);
    display:grid; place-items:center; border:2px solid var(--color-card); }
</style>`;

	const CODE_B3 = `<aside class="sidebar">
  <a class="sidebar-brand" href="/">…Ember…</a>

  <!-- workspace switcher instead of section labels -->
  <button class="ws-card">
    <span class="ws-logo">A</span>
    <span style="min-width:0">
      <span class="ws-name truncate">Acme Inc</span>
      <span class="ws-plan">PRO PLAN</span>
    </span>
    <Icon name="chevron-down" size={13} />
  </button>

  <nav class="sidebar-nav">
    {#each flatItems as it (it.label)}
      <a class="nav-item" class:active={it.active} href={it.href}>
        <span class="nav-icon"><Icon name={it.icon} size={15} /></span>
        {it.label}
      </a>
    {/each}
  </nav>

  <div class="sidebar-footer">
    <div class="storage-label"><span>Requests today</span><b>68%</b></div>
    <Progress value={68} tone="ember" />
    <a class="btn btn-ember btn-sm w-full" href="#upgrade">Upgrade plan</a>
  </div>
</aside>`;

	const TOPBAR_FRAMES: Frame[] = [
		{
			num: 'A1',
			title: 'Baseline',
			desc: 'Текущий топбар из Shell как точка отсчёта: поиск слева, справа команды/уведомления/тема.',
			tb: 'baseline',
			sb: 'baseline',
			code: CODE_A1,
			codeTitle: 'nav/topbar-a1-baseline.svelte'
		},
		{
			num: 'A2',
			title: 'Breadcrumb context',
			desc: 'Вместо поля поиска — breadcrumbs с названием страницы и live-бейджем; поиск свёрнут в иконку с тултипом. Освобождает место, топбар становится «навигационным».',
			tb: 'breadcrumb',
			sb: 'baseline',
			code: CODE_A2,
			codeTitle: 'nav/topbar-a2-breadcrumb.svelte'
		},
		{
			num: 'A3',
			title: 'Workspace switcher + env',
			desc: 'Слева — переключатель воркспейса (название + окружение), справа — segmented Production/Staging и помощь. Удобно, если продуктов несколько или есть среды.',
			tb: 'workspace',
			sb: 'baseline',
			code: CODE_A3,
			codeTitle: 'nav/topbar-a3-workspace.svelte'
		}
	];

	const SIDEBAR_FRAMES: Frame[] = [
		{
			num: 'Б1',
			title: 'Baseline',
			desc: 'Текущий сайдбар из Shell: секции Workspace / Platform / Admin + карточка пользователя в подвале.',
			tb: 'baseline',
			sb: 'baseline',
			code: CODE_B1,
			codeTitle: 'nav/sidebar-b1-baseline.svelte'
		},
		{
			num: 'Б2',
			title: 'Icon rail — 60px',
			desc: 'Узкий рельс: только иконки с тултипами, активный пункт — градиентная полка со свечением, бейджи — точкой с цифрой. Контент получает ~164px ширины.',
			tb: 'baseline',
			sb: 'rail',
			code: CODE_B2,
			codeTitle: 'nav/sidebar-b2-rail.svelte'
		},
		{
			num: 'Б3',
			title: 'Workspace card + usage footer',
			desc: 'Вместо секционных заголовков — плоский список под карточкой воркспейса (Acme Inc · PRO), в подвале — счётчик использования и апгрейд. Хорошо для SaaS-монетизации.',
			tb: 'baseline',
			sb: 'workspace',
			code: CODE_B3,
			codeTitle: 'nav/sidebar-b3-workspace.svelte'
		}
	];
</script>

<svelte:head>
	<title>Nav · Internal variants · Ember</title>
</svelte:head>

<div class="nv-lead">
	<p>Варианты верхнего бара (A) и бокового меню (Б) для внутренних страниц. Все фреймы собраны из живых компонентов — сегменты, тултипы, темы и тосты работают. Под каждым вариантом — код для переноса.</p>
</div>

{#snippet demoContent()}
	<div class="page-header">
		<div>
			<div class="eyebrow mb-2">Overview</div>
			<h1 class="page-title">Dashboard</h1>
			<p class="page-subtitle">Демо-контент — чтобы сравнивать меню в реальном окружении.</p>
		</div>
		<div class="flex gap-2">
			<Button variant="outline" size="sm"><Icon name="download" size={13} /> Export</Button>
			<Button variant="ember" size="sm"><Icon name="plus" size={13} /> New key</Button>
		</div>
	</div>
	<div class="grid grid-4 mb-4">
		<StatCard label="Requests" value={84210} delta="2.1% vs last wk" deltaTone="up" icon="activity" />
		<StatCard label="Conversations" value={2418} delta="12.4% vs last wk" deltaTone="up" icon="comments" iconClass="bg-amber/10 text-amber" />
		<StatCard label="Tokens used" value={9100000} format="compact" delta="4.8% vs last wk" deltaTone="up" icon="coins" iconClass="bg-info/10 text-info" />
		<StatCard label="Errors" value="0.02%" delta="0.6% vs last wk" deltaTone="down" icon="triangle-exclamation" iconClass="bg-success/10 text-success" />
	</div>
	<div class="card">
		<div class="card-header flex items-center justify-between">
			<div class="card-title">Recent requests</div>
			<Badge variant="success" dot>live</Badge>
		</div>
		<div class="card-body" style="padding:0">
			<table class="table">
				<thead>
					<tr><th>Key</th><th>Model</th><th>Status</th><th>Latency</th><th style="text-align:right">When</th></tr>
				</thead>
				<tbody>
					<tr>
						<td class="cell-mono">prod-api-1</td><td>ember-large</td>
						<td><Badge variant="success" dot>200</Badge></td>
						<td class="cell-mono">412 ms</td><td class="cell-subtle" style="text-align:right">2m ago</td>
					</tr>
					<tr>
						<td class="cell-mono">ci-runner</td><td>ember-small</td>
						<td><Badge variant="success" dot>200</Badge></td>
						<td class="cell-mono">180 ms</td><td class="cell-subtle" style="text-align:right">6m ago</td>
					</tr>
					<tr>
						<td class="cell-mono">alex-dev</td><td>ember-large</td>
						<td><Badge variant="primary">streaming</Badge></td>
						<td class="cell-mono">—</td><td class="cell-subtle" style="text-align:right">now</td>
					</tr>
					<tr>
						<td class="cell-mono">staging-key</td><td>ember-small</td>
						<td><Badge variant="amber">429</Badge></td>
						<td class="cell-mono">—</td><td class="cell-subtle" style="text-align:right">14m ago</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
{/snippet}

<div class="nv-group-head">
	<h2><span class="grp">A</span> Верхний бар — topbar</h2>
	<p>Все три варианта показаны в одном и том же окружении (базовый сайдбар + одинаковый контент), чтобы сравнивать только верхнюю полосу.</p>
</div>
{#each TOPBAR_FRAMES as frame (frame.num)}
	<div class="nv-head">
		<span class="num">{frame.num}</span><h3>{frame.title}</h3><p>{frame.desc}</p>
	</div>
	<div class="nv-frame"><div class="nv-frame-inner">
		<div class="app-shell">
			<Sidebar variant={frame.sb} />
			<div class="main">
				<Topbar variant={frame.tb} />
				<main class="content">{@render demoContent()}</main>
			</div>
		</div>
	</div></div>
	<div class="nv-example"><CodeBlock title={frame.codeTitle} language="svelte" code={frame.code} /></div>
{/each}

<div class="nv-group-head">
	<h2><span class="grp">Б</span> Боковое меню — sidebar</h2>
	<p>Три варианта сайдбара в паре с базовым топбаром (A). Варианты Б и В меняют не только вид, но и плотность: 224px → 60px.</p>
</div>
{#each SIDEBAR_FRAMES as frame (frame.num)}
	<div class="nv-head">
		<span class="num">{frame.num}</span><h3>{frame.title}</h3><p>{frame.desc}</p>
	</div>
	<div class="nv-frame"><div class="nv-frame-inner">
		<div class="app-shell">
			<Sidebar variant={frame.sb} />
			<div class="main">
				<Topbar variant={frame.tb} />
				<main class="content">{@render demoContent()}</main>
			</div>
		</div>
	</div></div>
	<div class="nv-example"><CodeBlock title={frame.codeTitle} language="svelte" code={frame.code} /></div>
{/each}

<footer class="nv-footer">
	<span>Ember design system · navigation variants — internal pages</span>
	<span class="font-mono"><a href="/nav/landing" class="text-primary">лендинг →</a></span>
</footer>
