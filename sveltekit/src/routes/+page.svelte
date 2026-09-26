<script lang="ts">
	import { Badge, Button, Icon } from '$lib/ember/index.js';

	const FEATURES: { icon: 'list' | 'flask' | 'palette' | 'fire' | 'wifi' | 'robot' | 'home' | 'panel-right'; title: string; desc: string; href: string }[] = [
		{ icon: 'list', title: 'Каталог с кодом', desc: 'Каждый компонент — живой пример и готовый код интеграции. Один пункт меню = один компонент.', href: '/components/catalog' },
		{ icon: 'flask', title: 'Headless parts', desc: '28 систем в parts-архитектуре: Dialog, DropdownMenu, Command, Select… Поведение и a11y — наши, стили — Ember.', href: '/ui' },
		{ icon: 'palette', title: '6 тем из коробки', desc: '3 тёмных + 3 светлых на одном контракте --tw-*. Переключаются мгновенно, без мигания.', href: '/tokens' },
		{ icon: 'fire', title: 'Токены и брейкпоинты', desc: 'Плотная сетка 13px, tier-контейнеры под ноутбук / 2K / 4K, живой индикатор вьюпорта.', href: '/tokens' },
		{ icon: 'robot', title: 'Дружелюбно к агентам', desc: 'AGENTS.md с правилами и пошаговый /integration: промпт, чеклист приёмки, сноска для не-Svelte.', href: '/integration' },
		{ icon: 'wifi', title: 'Ноль зависимостей', desc: 'Только Svelte 5. Никаких UI-библиотек, иконки — инлайн-SVG, всё работает офлайн.', href: '/components' }
	];
	const NAV_CARDS: { title: string; desc: string; href: string }[] = [
		{ title: 'Navigation · landing', desc: '4 варианта меню лендинга', href: '/nav/landing' },
		{ title: 'Navigation · internal', desc: 'Топбары и сайдбары', href: '/nav/internal' }
	];
</script>

<svelte:head>
	<title>Ember UI · Svelte component library</title>
</svelte:head>

<!-- HERO -->
<header class="hero noise">
	<div class="orb orb-amber" style="width:480px;height:480px;top:-180px;left:-140px;"></div>
	<div class="orb orb-rose" style="width:420px;height:420px;top:-140px;right:-120px;"></div>
	<div class="reveal in">
		<span class="badge badge-primary"><i data-icon="bolt" data-size="11"></i> Svelte 5 · zero dependencies</span>
	</div>
	<h1 class="reveal in" style="margin-top:14px;">
		<span class="text-gradient-animated">Ember UI</span> — дизайн-система,<br />которую можно забрать с собой
	</h1>
	<p class="reveal in">
		57 компонентов каталога, 28 headless-систем в parts-архитектуре, 6 тем и пошаговая
		интеграция — для человека и для агента. Токены, плотность и характер — из Ember.
	</p>
	<div class="ctas reveal in">
		<Button variant="ember" size="lg" href="/components"><Icon name="cube" size={15} /> Component library</Button>
		<Button variant="outline" size="lg" href="/integration"><Icon name="rocket" size={15} /> Integration guide</Button>
		<Button variant="ghost" size="lg" href="/ui"><Icon name="flask" size={15} /> Headless parts</Button>
	</div>
	<div class="meta reveal in">
		<span>● 57+ компонентов</span><span>● 28 headless-систем</span><span>● 6 тем</span><span>● 0 зависимостей</span><span>● Svelte 5 runes</span>
	</div>
</header>

<!-- FEATURES -->
<div class="features reveal in">
	{#each FEATURES as f (f.title)}
		<a href={f.href} class="card card-body feat">
			<div class="feat-icon"><Icon name={f.icon} size={18} /></div>
			<div class="text-sm font-semibold">{f.title}</div>
			<p class="text-xs text-muted-foreground mt-2" style="line-height:1.55">{f.desc}</p>
			<span class="go"><Icon name="arrow-up-right" size={15} /></span>
		</a>
	{/each}
</div>

<!-- NAV CARDS -->
<div class="sec-head reveal in">
	<div>
		<h2>Навигация — варианты</h2>
		<p>Готовые решения для лендинга и внутренних страниц: живые превью + код.</p>
	</div>
</div>
<div class="grid grid-2 gap-3 reveal in">
	{#each NAV_CARDS as n (n.href)}
		<a href={n.href} class="card card-body nav-card">
			<div class="flex items-center gap-2">
				<i data-icon="home" data-size={15} class="text-primary"></i>
				<span class="text-sm font-semibold">{n.title}</span>
				<span style="margin-left:auto;display:inline-flex"><Icon name="arrow-up-right" size={14} class="text-subtle" /></span>
			</div>
			<p class="text-xs text-muted-foreground mt-2">{n.desc}</p>
		</a>
	{/each}
</div>

<footer class="land-footer reveal in">
	<span class="font-mono">Ember UI · static-first · копируй и используй</span>
	<span class="font-mono"><a href="/tokens" class="text-primary">tokens →</a> · <a href="/patterns" class="text-primary">patterns →</a> · <a href="/tailwind" class="text-primary">tailwind →</a></span>
</footer>

<style>
	.hero {
		position: relative;
		text-align: center;
		padding: 64px 24px 48px;
		overflow: visible;
	}
	.hero h1 {
		position: relative;
		font-size: clamp(36px, 5.4vw, 62px);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.05;
	}
	.hero p {
		position: relative;
		color: var(--color-muted-foreground);
		font-size: 15px;
		max-width: 64ch;
		margin: 16px auto 0;
		line-height: 1.65;
	}
	.ctas {
		position: relative;
		display: flex;
		gap: 10px;
		justify-content: center;
		margin-top: 26px;
		flex-wrap: wrap;
	}
	.meta {
		position: relative;
		display: flex;
		gap: 16px;
		justify-content: center;
		margin-top: 22px;
		font-size: 12px;
		color: var(--color-subtle);
		font-family: var(--font-mono);
		flex-wrap: wrap;
	}
	.features {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}
	@media (max-width: 1024px) {
		.features { grid-template-columns: repeat(2, 1fr); }
	}
	@media (max-width: 640px) {
		.features { grid-template-columns: 1fr; }
	}
	.feat {
		position: relative;
		color: inherit;
		text-decoration: none;
		display: block;
		transition: all 0.2s var(--ease-out);
	}
	.feat:hover {
		transform: translateY(-3px);
		border-color: var(--color-border-strong);
		box-shadow: var(--shadow-md);
	}
	.feat-icon {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		display: grid;
		place-items: center;
		background: rgb(var(--tw-primary) / 0.1);
		color: var(--color-primary);
		margin-bottom: 10px;
	}
	.go {
		position: absolute;
		top: 14px;
		right: 14px;
		color: var(--color-subtle);
		opacity: 0;
		transform: translate(-4px, 4px);
		transition: all 0.2s ease;
	}
	.feat:hover .go {
		opacity: 1;
		transform: none;
		color: var(--color-primary);
	}
	.sec-head {
		display: flex;
		align-items: baseline;
		gap: 12px;
		margin: 36px 0 12px;
	}
	.sec-head h2 {
		font-size: 20px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.sec-head p {
		font-size: 13px;
		color: var(--color-muted-foreground);
	}
	.nav-card {
		color: inherit;
		text-decoration: none;
		transition: all 0.2s var(--ease-out);
	}
	.nav-card:hover {
		border-color: var(--color-border-strong);
		transform: translateY(-2px);
	}
	.land-footer {
		border-top: 1px solid var(--color-border);
		margin-top: 44px;
		padding-top: 20px;
		display: flex;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
		font-size: 12px;
		color: var(--color-subtle);
	}
</style>
