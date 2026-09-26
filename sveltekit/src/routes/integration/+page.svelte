<script lang="ts">
	import { Badge, Button, CodeBlock, Icon, PageHeader } from '$lib/ember/index.js';

	const STEP1 = `# вся библиотека — одна папка, ноль зависимостей
cp -r design-preview/sveltekit/src/lib/ember ./src/lib/ember`;
	const STEP2 = `// src/routes/+layout.svelte
import '$lib/ember/ember.css';
import '$lib/ember/tailwind.css'; // опционально: утилиты Tailwind v4`;
	const STEP3 = `// app.html · <head> — выполняется до первой отрисовки
// (оберни в <" + "script> при вставке)
try {
	var t = localStorage.getItem('ember-theme') || 'dark';
	document.documentElement.classList.toggle('ember-light', t === 'light');
	document.documentElement.classList.toggle('ember', t !== 'light');
	document.documentElement.style.colorScheme = t === 'light' ? 'light' : 'dark';
} catch (e) {}`;
	const STEP4 = `// src/routes/+layout.svelte
import { CommandPalette, Shell, Toasts } from '$lib/ember/index.js';
let paletteOpen = $state(false);

<Shell onPalette={() => (paletteOpen = true)}>
	{@render children()}
</Shell>
<CommandPalette bind:open={paletteOpen} />
<Toasts />`;
	const STEP5 = `// импорт через баррель:
import { Button, PageHeader, StatCard } from '$lib/ember/index.js';

<PageHeader eyebrow="Overview" title="Моя страница">
	{#snippet actions()}
		<Button variant="ember" size="sm">Действие</Button>
	{/snippet}
</PageHeader>
<StatCard label="Requests" value={84210} delta="2.1%" deltaTone="up" />`;
	const AGENT_PROMPT = `Интегрируй дизайн-систему Ember UI в этот проект (Svelte 5 / SvelteKit).

Источник: репозиторий design-preview, папка sveltekit/src/lib/ember —
скопируй её целиком в мой проект как src/lib/ember.

Шаги:
1. Подключи в root layout: import '$lib/ember/ember.css'
   и (если используешь Tailwind v4) '$lib/ember/tailwind.css'.
2. Добавь в app.html пре-пейнт скрипт темы из ember-репозитория
   (класс .ember / .ember-light на <html> до первой отрисовки).
3. Оберни приложение: <Shell> + <CommandPalette> + <Toasts> в root layout.
4. Пиши страницы только на компонентах и токенах из $lib/ember:
   импорт через баррель '$lib/ember/index.js', новые примитивы не
   изобретать, hex-цвета запрещены — только токены/классы системы.
5. Проверь тёмную и светлую темы на каждой странице.

Полный свод правил и каталог: src/lib/ember/AGENTS.md — читай первым.
Живые примеры: /components/catalog (демо + код) и /ui (headless-системы).`;
	const CHECKLIST = [
		'Прочитал src/lib/ember/AGENTS.md — правила, каталог, рецепты',
		'Импортирует только через баррель $lib/ember/index.js',
		'Не создаёт новых примитивов — собирает из существующих',
		'Ни одного hex-цвета: только var(--color-*) и классы',
		'Проверил .ember-light на каждой новой поверхности',
		'Интерактив по клавиатуре: Esc, стрелки, фокус-ловушки'
	];
</script>

<svelte:head>
	<title>Integration · Ember UI</title>
</svelte:head>

<PageHeader eyebrow="Getting started" title="Integration"
	subtitle="Пошаговое подключение Ember UI в свой проект. Слева — как делать руками, ниже — готовый промпт для агента.">
	{#snippet actions()}
		<Badge variant="success" dot>zero dependencies</Badge>
	{/snippet}
</PageHeader>

<div class="flex gap-2 mb-4 flex-wrap">
	<a href="#human" class="badge badge-muted">Человеку · 6 шагов</a>
	<a href="#agent" class="badge badge-ember">Агенту · промпт + чеклист</a>
	<a href="#non-svelte" class="badge badge-muted">Не Svelte?</a>
</div>

<!-- A. ЧЕЛОВЕКУ -->
<section class="mb-4" id="human" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">A · Для человека</div>

	{#each [{ n: '01', t: 'Скопируй библиотеку', d: 'Одна папка — все компоненты, токены, иконки и поведение.', code: STEP1, lang: 'bash' },
		{ n: '02', t: 'Подключи стили в root layout', d: 'ember.css — токены и классы; tailwind.css — только если используешь Tailwind v4.', code: STEP2, lang: 'svelte' },
		{ n: '03', t: 'Тема до первой отрисовки', d: 'Прe-пейнт скрипт в app.html — чтобы не мигало при загрузке.', code: STEP3, lang: 'html' },
		{ n: '04', t: 'Каркас приложения', d: 'Shell (сайдбар + топбар + мобильное меню), CommandPalette (⌘K) и хост тостов.', code: STEP4, lang: 'svelte' },
		{ n: '05', t: 'Первая страница', d: 'Собирай из готовых компонентов — импорт только через баррель.', code: STEP5, lang: 'svelte' },
		{ n: '06', t: 'Проверь', d: 'npm run dev → /components/catalog: всё интерактивно, консоль чистая, темы переключаются.', code: 'npm run dev\n# → http://localhost:5173/components/catalog', lang: 'bash' }
	] as step (step.n)}
		<div class="card card-body mb-3">
			<div class="flex items-center gap-3 mb-2">
				<span class="step-num font-mono">{step.n}</span>
				<div class="text-sm font-semibold">{step.t}</div>
				<span class="badge badge-muted" style="margin-left:auto;font-size:9px;">{step.lang}</span>
			</div>
			<p class="text-xs text-muted-foreground mb-2" style="line-height:1.55">{step.d}</p>
			<CodeBlock title={step.lang === 'bash' ? 'terminal' : step.lang === 'html' ? 'app.html' : 'layout.svelte'} language={step.lang} code={step.code} />
		</div>
	{/each}
</section>

<!-- B. АГЕНТУ -->
<section class="mb-4" id="agent" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">Б · Для агента</div>
	<p class="sec-sub">Отдай агенту этот промпт — он содержит задачу, шаги и правила. До кучи дай ему файл src/lib/ember/AGENTS.md из этого репозитория: это свод правил библиотеки, написанный для ИИ.</p>
	<div class="grid grid-2 gap-3">
		<div class="card card-body">
			<div class="text-sm font-semibold mb-2"><i data-icon="robot" data-size="14" class="text-primary"></i> Промпт для агента</div>
			<CodeBlock title="agent-prompt.txt" language="txt" code={AGENT_PROMPT} />
			<div class="flex gap-2 mt-3">
				<Button variant="ember" size="sm" href="/components/catalog">Каталог — демо + код</Button>
				<Button variant="outline" size="sm" href="/ui">Headless parts</Button>
			</div>
		</div>
		<div class="card card-body">
			<div class="text-sm font-semibold mb-2"><i data-icon="shield" data-size="14" class="text-success"></i> Чеклист приёмки</div>
			<ul class="check-list">
				{#each CHECKLIST as c (c)}
					<li><i data-icon="circle-check" data-size="13" class="text-success"></i><span>{c}</span></li>
				{/each}
			</ul>
			<div class="mt-3 p-2" style="background:rgb(var(--tw-amber) / .07);border:1px solid rgb(var(--tw-amber) / .3);border-radius:var(--radius-md);font-size:12px;color:var(--color-muted-foreground);">
				Если агент предлагает свой компонент вместо готового или hex-цвет — это отход от системы. Останови и сошлись на AGENTS.md.
			</div>
		</div>
	</div>
</section>

<!-- C. НЕ SVELTE -->
<section class="mb-4" id="non-svelte" style="scroll-margin-top:80px;">
	<div class="eyebrow mb-2">В · Не Svelte?</div>
	<div class="card card-body">
		<p class="text-sm text-muted-foreground" style="line-height:1.6;max-width:90ch;">
			Тот же дизайн существует как статические HTML-макеты в корне репозитория:
			открой <code class="code-chip">index.html</code> (хаб), <code class="code-chip">tokens.html</code> (токены),
			<code class="code-chip">components.html</code> (компоненты), <code class="code-chip">ember-kit.html</code>
			(интерактивный playground с генерацией кода). Ноль сборки — просто открой файл в браузере и копируй HTML с классами.
		</p>
		<div class="flex gap-2 mt-3 flex-wrap">
			<Button variant="outline" size="sm" href="/tokens"><i data-icon="fire" data-size="13"></i> Токены</Button>
			<Button variant="ghost" size="sm" href="/nav/landing"><i data-icon="home" data-size="13"></i> Навигация</Button>
		</div>
	</div>
</section>

<style>
	.step-num {
		width: 34px;
		height: 34px;
		flex: none;
		display: grid;
		place-items: center;
		border-radius: 10px;
		background-image: linear-gradient(135deg, #f59e0b, #f43f5e);
		color: #fff;
		font-weight: 700;
		font-size: 13px;
		box-shadow: 0 2px 14px rgb(244 63 94 / 0.35);
	}
	.sec-sub {
		font-size: 13px;
		color: var(--color-muted-foreground);
		margin: -4px 0 14px;
		line-height: 1.6;
		max-width: 90ch;
	}
	.check-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 9px;
	}
	.check-list li {
		display: flex;
		gap: 9px;
		align-items: flex-start;
		font-size: 13px;
		color: var(--color-muted-foreground);
		line-height: 1.5;
	}
	.check-list li i {
		color: var(--color-success);
		flex: none;
		margin-top: 2px;
	}
</style>
