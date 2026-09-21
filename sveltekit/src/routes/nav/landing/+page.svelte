<script lang="ts">
	import '../nav.css';
	import { Badge, Button, CodeBlock, Icon, ThemeToggle, toast } from '$lib/ember/index.js';

	function demo(e: MouseEvent) {
		e.preventDefault();
		toast.info('Demo', 'Демонстрационная ссылка варианта навигации.');
	}

	const CODE_V1 = `<nav class="lnav">
  <a class="brand" href="/">
    <span class="logo">E</span> <span class="name">Ember</span>
    <span class="badge badge-primary">v2.2</span>
  </a>
  <div class="links">
    <a class="btn btn-ghost btn-sm" href="#product">Product</a>
    <a class="btn btn-ghost btn-sm" href="#features">Features</a>
    <a class="btn btn-ghost btn-sm" href="#pricing">Pricing</a>
    <a class="btn btn-ghost btn-sm" href="#docs">Docs</a>
  </div>
  <ThemeToggle />
  <a class="btn btn-ember btn-sm" href="#start">Get started</a>
</nav>

<style>
  .lnav { display:flex; align-items:center; gap:8px; height:60px; padding:0 20px;
    background:rgb(var(--tw-background) / .72);   /* glass blur */
    backdrop-filter:blur(12px);
    border-bottom:1px solid var(--color-border); }
  .links { margin-left:auto; }
</style>`;

	const CODE_V2 = `<nav class="lnav">
  <a class="brand" href="/">…Ember…</a>
  <div class="links">
    {#each ['Product', 'Features', 'Pricing', 'Docs', 'Changelog'] as link, i}
      <a class="link" class:active={i === 0} href="/">{link}</a>
    {/each}
  </div>
  <div class="right">
    <a class="btn btn-ghost btn-sm" href="#signin">Sign in</a>
    <a class="btn btn-ember btn-sm" href="#start">Get started</a>
  </div>
</nav>

<style>
  .lnav { display:grid; grid-template-columns:1fr auto 1fr; align-items:center;
    height:64px; padding:0 20px; }
  .links { justify-self:center; display:flex; gap:4px; }
  .link { padding:7px 13px; border-radius:9999px; font-size:13px; font-weight:500;
    color:var(--color-muted-foreground); border:1px solid transparent; }
  .link:hover { color:var(--color-foreground); background:rgb(var(--tw-muted) / .7); }
  .link.active { color:var(--color-foreground); background:var(--color-card);
    border-color:var(--color-border); box-shadow:var(--shadow-xs); }
  .right { justify-self:end; display:flex; align-items:center; gap:8px; }
</style>`;

	const CODE_V3 = `<header class="hero noise">
  <div class="orb orb-amber"></div>
  <div class="orb orb-rose"></div>

  <nav class="pill">
    <a class="brand" href="/">…Ember…</a>
    <div class="links">
      <a class="link active" href="#product">Product</a>
      <a class="link" href="#features">Features</a>
      <a class="link" href="#pricing">Pricing</a>
      <a class="link" href="#docs">Docs</a>
    </div>
    <ThemeToggle />
    <a class="btn btn-ember btn-sm" href="#start">Get started</a>
  </nav>

  <!-- hero content -->
</header>

<style>
  .pill { display:flex; align-items:center; gap:12px; max-width:880px;
    margin:22px auto 0; padding:8px 10px 8px 16px; border-radius:18px;
    background:rgb(var(--tw-card) / .55);       /* floating glass */
    backdrop-filter:blur(16px);
    border:1px solid var(--color-border-strong);
    box-shadow:var(--shadow-lg); }
  .links { display:flex; gap:2px; margin:0 auto; }
  .link { padding:7px 12px; border-radius:10px; font-size:13px; font-weight:500;
    color:var(--color-muted-foreground); text-decoration:none; }
  .link.active { color:var(--color-primary); background:rgb(var(--tw-primary) / .1); }
</style>`;

	const CODE_V4 = `<div class="hairline bg-gradient-animated"></div>
<nav class="lnav">
  <a class="brand" href="/">…Ember…</a>
  <div class="tabs">
    <a class="tab active" href="#product">Product</a>
    <a class="tab" href="#features">Features</a>
    <a class="tab" href="#pricing">Pricing</a>
    <a class="tab" href="#docs">Docs</a>
  </div>
  <ThemeToggle />
  <a class="btn btn-ember btn-sm" href="#start">Get started</a>
</nav>

<style>
  .hairline { height:2px; }  /* animated Amber→Rose signature gradient */
  .lnav { display:flex; align-items:center; height:58px; padding:0 22px;
    background:rgb(var(--tw-background) / .85);
    border-bottom:1px solid var(--color-border); }
  .tabs { display:flex; align-items:stretch; height:100%; margin-left:26px; }
  .tab { position:relative; display:flex; align-items:center; margin:0 12px;
    font-size:13px; font-weight:500; color:var(--color-muted-foreground); }
  .tab.active { color:var(--color-foreground); }
  .tab.active::after { content:""; position:absolute; left:0; right:0; bottom:-1px;
    height:2px; border-radius:2px 2px 0 0;
    background-image:linear-gradient(90deg, #f59e0b, #f43f5e);
    box-shadow:0 0 12px rgb(244 63 94 / .55); }
</style>`;
</script>

<svelte:head>
	<title>Nav · Landing variants · Ember</title>
</svelte:head>

<div class="nv-lead">
	<p>Четыре варианта верхнего меню для лендинга на общих токенах Ember. Живое превью + код под каждым вариантом — точка в меню переключает тему (6 тем), ссылки показывают toast-заглушку.</p>
</div>

{#snippet brand(withBadge = false)}
	<a href="/nav/landing" class="nv-brand" onclick={demo}>
		<span class="logo">E</span><span class="name">Ember</span>
		{#if withBadge}<Badge variant="primary">v2.2</Badge>{/if}
	</a>
{/snippet}

{#snippet hero()}
	<span class="nv-announce"><span class="n">NEW</span> Ember v2.2 — motion system + Svelte kit</span>
	<h1>Build your product on <span class="text-gradient-animated">Ember</span></h1>
	<p>Premium dark surfaces, one warm signature gradient and a dense, data-first rhythm — a design system that ships as plain CSS.</p>
	<div class="ctas">
		<Button variant="ember" size="lg" onclick={demo}><Icon name="fire" size={15} /> Get started</Button>
		<Button variant="outline" size="lg" onclick={demo}><Icon name="gauge" size={15} /> Live demo</Button>
	</div>
	<div class="meta"><span>● dark-first</span><span>● 32px density</span><span>● Inter + JetBrains Mono</span></div>
{/snippet}

<!-- ============================== V1 ============================== -->
<div class="nv-head">
	<span class="num">V1</span><h3>Classic hub</h3>
	<p>Бренд слева, ghost-ссылки справа, аккуратный CTA. Стеклянный blur, нижняя граница. Самый «спокойный» и знакомый вариант.</p>
</div>
<div class="nv-frame"><div class="nv-frame-inner">
	<nav class="v1-nav">
		{@render brand(true)}
		<div class="v1-links">
			<Button variant="ghost" size="sm" onclick={demo}>Product</Button>
			<Button variant="ghost" size="sm" onclick={demo}>Features</Button>
			<Button variant="ghost" size="sm" onclick={demo}>Pricing</Button>
			<Button variant="ghost" size="sm" onclick={demo}>Docs</Button>
		</div>
		<div class="v1-right">
			<ThemeToggle />
			<div class="divider-vertical" style="height:20px"></div>
			<Button variant="ember" size="sm" onclick={demo}>Get started</Button>
		</div>
	</nav>
	<header class="nv-hero noise">
		<div class="orb orb-amber" style="width:380px;height:380px;top:-140px;left:-110px;"></div>
		<div class="orb orb-rose" style="width:340px;height:340px;top:-110px;right:-90px;"></div>
		{@render hero()}
	</header>
</div></div>
<div class="nv-example"><CodeBlock title="nav/landing-v1-classic.svelte" language="svelte" code={CODE_V1} /></div>

<!-- ============================== V2 ============================== -->
<div class="nv-head">
	<span class="num">V2</span><h3>Centered pills</h3>
	<p>Ссылки по центру в виде «пилюль», активный пункт — карточка с рамкой. Справа — пара Sign in / Get started. Прозрачный фон, максимальная воздушность.</p>
</div>
<div class="nv-frame"><div class="nv-frame-inner">
	<nav class="v2-nav">
		{@render brand()}
		<div class="v2-center">
			{#each ['Product', 'Features', 'Pricing', 'Docs', 'Changelog'] as link, i (link)}
				<a href="/nav/landing" class="v2-link" class:active={i === 0} onclick={demo}>{link}</a>
			{/each}
		</div>
		<div class="v2-right">
			<Button variant="ghost" size="sm" onclick={demo}>Sign in</Button>
			<Button variant="ember" size="sm" onclick={demo}>Get started</Button>
		</div>
	</nav>
	<header class="nv-hero noise">
		<div class="orb orb-amber" style="width:380px;height:380px;top:-140px;left:-110px;"></div>
		<div class="orb orb-rose" style="width:340px;height:340px;top:-110px;right:-90px;"></div>
		{@render hero()}
	</header>
</div></div>
<div class="nv-example"><CodeBlock title="nav/landing-v2-centered.svelte" language="svelte" code={CODE_V2} /></div>

<!-- ============================== V3 ============================== -->
<div class="nv-head">
	<span class="num">V3</span><h3>Floating glass pill</h3>
	<p>Меню — отдельная «плавающая» стеклянная капсула над хиро, с тенями и blur 16. Активный пункт подсвечен фирменным градиентом. Самый «премиальный» вариант.</p>
</div>
<div class="nv-frame"><div class="nv-frame-inner">
	<header class="nv-hero noise" style="padding-top:0;">
		<div class="orb orb-amber" style="width:420px;height:420px;top:-160px;left:-120px;"></div>
		<div class="orb orb-rose" style="width:380px;height:380px;top:-120px;right:-100px;"></div>
		<nav class="v3-wrap">
			<div class="v3-pill">
				{@render brand()}
				<div class="v3-links">
					<a href="/nav/landing" class="v3-link active" onclick={demo}>Product</a>
					<a href="/nav/landing" class="v3-link" onclick={demo}>Features</a>
					<a href="/nav/landing" class="v3-link" onclick={demo}>Pricing</a>
					<a href="/nav/landing" class="v3-link" onclick={demo}>Docs</a>
				</div>
				<div class="v3-right">
					<ThemeToggle />
					<Button variant="ember" size="sm" onclick={demo}>Get started</Button>
				</div>
			</div>
		</nav>
		<div style="position:relative;padding-top:30px;">
			{@render hero()}
		</div>
	</header>
</div></div>
<div class="nv-example"><CodeBlock title="nav/landing-v3-glass-pill.svelte" language="svelte" code={CODE_V3} /></div>

<!-- ============================== V4 ============================== -->
<div class="nv-head">
	<span class="num">V4</span><h3>Gradient hairline + underline</h3>
	<p>Анимированная градиентная линия поверх меню и подчёркивание активного пункта фирменным Amber→Rose градиентом со свечением. Меню как «рабочий инструмент».</p>
</div>
<div class="nv-frame"><div class="nv-frame-inner">
	<div class="bg-gradient-animated" style="height:2px;"></div>
	<nav class="v4-nav">
		{@render brand()}
		<div class="v4-links">
			{#each ['Product', 'Features', 'Pricing', 'Docs', 'Changelog'] as link, i (link)}
				<a href="/nav/landing" class="v4-link" class:active={i === 0} onclick={demo}>{link}</a>
			{/each}
		</div>
		<div class="v4-right">
			<ThemeToggle />
			<div class="divider-vertical" style="height:20px"></div>
			<Button variant="ember" size="sm" onclick={demo}>Get started</Button>
		</div>
	</nav>
	<header class="nv-hero noise">
		<div class="orb orb-amber" style="width:380px;height:380px;top:-140px;left:-110px;"></div>
		<div class="orb orb-rose" style="width:340px;height:340px;top:-110px;right:-90px;"></div>
		{@render hero()}
	</header>
</div></div>
<div class="nv-example"><CodeBlock title="nav/landing-v4-hairline.svelte" language="svelte" code={CODE_V4} /></div>

<footer class="nv-footer">
	<span>Ember design system · navigation variants — landing</span>
	<span class="font-mono"><a href="/nav/internal" class="text-primary">внутренние страницы →</a></span>
</footer>

<style>
	/* ---- shared brand + hero ---- */
	.nv-brand { display:flex; align-items:center; gap:10px; text-decoration:none; }
	.nv-brand .logo { width:28px; height:28px; border-radius:8px; background-image:linear-gradient(135deg,#f59e0b,#f43f5e);
		display:grid; place-items:center; color:#fff; font-weight:800; font-size:14px;
		box-shadow:0 2px 14px rgb(244 63 94 / .4); flex:none;
		transition:transform .2s var(--ease-spring), box-shadow .2s ease; }
	.nv-brand:hover .logo { transform:rotate(-8deg) scale(1.05); }
	.nv-brand .name { font-weight:600; font-size:14px; color:var(--color-foreground); }
	.nv-hero { position:relative; text-align:center; padding:56px 32px 48px; overflow:hidden; }
	.nv-hero h1 { position:relative; font-size:clamp(26px, 3.6vw, 40px); font-weight:800; letter-spacing:-.03em; line-height:1.05; }
	.nv-hero p { position:relative; color:var(--color-muted-foreground); font-size:14px; max-width:58ch; margin:14px auto 0; line-height:1.6; }
	.nv-hero .ctas { position:relative; display:flex; gap:10px; justify-content:center; margin-top:24px; flex-wrap:wrap; }
	.nv-hero .meta { position:relative; display:flex; gap:16px; justify-content:center; margin-top:22px; font-size:11px;
		color:var(--color-subtle); font-family:var(--font-mono); flex-wrap:wrap; }
	.nv-announce { position:relative; display:inline-flex; align-items:center; gap:8px; font-size:12px; padding:5px 12px 5px 6px;
		border-radius:9999px; background:rgb(var(--tw-primary) / .08); border:1px solid rgb(var(--tw-primary) / .25);
		color:var(--color-foreground); margin-bottom:20px; }
	.nv-announce .n { font-family:var(--font-mono); font-size:10.5px; background-image:linear-gradient(135deg,#f59e0b,#f43f5e);
		color:#fff; padding:2px 8px; border-radius:9999px; font-weight:600; }

	/* ---- V1 classic hub ---- */
	.v1-nav { position:relative; z-index:5; display:flex; align-items:center; gap:8px; height:60px; padding:0 20px;
		background:rgb(var(--tw-background) / .72); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
		border-bottom:1px solid var(--color-border); }
	.v1-links { display:flex; align-items:center; gap:2px; margin-left:auto; }
	.v1-links :global(.btn) { color:var(--color-muted-foreground); }
	.v1-right { display:flex; align-items:center; gap:8px; margin-left:10px; }

	/* ---- V2 centered pills ---- */
	.v2-nav { position:relative; z-index:5; display:grid; grid-template-columns:1fr auto 1fr; align-items:center;
		height:64px; padding:0 20px; }
	.v2-center { display:flex; gap:4px; justify-content:center; }
	.v2-link { padding:7px 13px; border-radius:9999px; font-size:13px; font-weight:500; color:var(--color-muted-foreground);
		text-decoration:none; transition:all .15s ease; border:1px solid transparent; }
	.v2-link:hover { color:var(--color-foreground); background:rgb(var(--tw-muted) / .7); }
	.v2-link.active { color:var(--color-foreground); background:var(--color-card); border-color:var(--color-border); box-shadow:var(--shadow-xs); }
	.v2-right { display:flex; align-items:center; gap:8px; justify-content:flex-end; }

	/* ---- V3 floating glass pill ---- */
	.v3-wrap { position:relative; z-index:5; display:flex; justify-content:center; padding:22px 24px 0; }
	.v3-pill { display:flex; align-items:center; gap:12px; width:100%; max-width:880px; padding:8px 10px 8px 16px;
		border-radius:18px; background:rgb(var(--tw-card) / .55); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
		border:1px solid var(--color-border-strong); box-shadow:var(--shadow-lg); }
	.v3-links { display:flex; gap:2px; margin:0 auto; }
	.v3-link { padding:7px 12px; border-radius:10px; font-size:13px; font-weight:500; color:var(--color-muted-foreground);
		text-decoration:none; transition:all .15s ease; }
	.v3-link:hover { color:var(--color-foreground); background:rgb(var(--tw-muted) / .8); }
	.v3-link.active { color:var(--color-primary); background:rgb(var(--tw-primary) / .1); }
	.v3-right { display:flex; align-items:center; gap:6px; }

	/* ---- V4 gradient hairline + underline ---- */
	.v4-nav { position:relative; z-index:5; display:flex; align-items:center; height:58px; padding:0 22px;
		background:rgb(var(--tw-background) / .85); border-bottom:1px solid var(--color-border); }
	.v4-links { display:flex; align-items:stretch; height:100%; margin-left:26px; }
	.v4-link { position:relative; display:flex; align-items:center; padding:0 4px; margin:0 12px; font-size:13px; font-weight:500;
		color:var(--color-muted-foreground); text-decoration:none; transition:color .15s ease; }
	.v4-link:hover { color:var(--color-foreground); }
	.v4-link.active { color:var(--color-foreground); }
	.v4-link.active::after { content:""; position:absolute; left:0; right:0; bottom:-1px; height:2px; border-radius:2px 2px 0 0;
		background-image:linear-gradient(90deg,#f59e0b,#f43f5e); box-shadow:0 0 12px rgb(244 63 94 / .55); }
	.v4-right { display:flex; align-items:center; gap:8px; margin-left:auto; }
</style>
