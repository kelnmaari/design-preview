<script lang="ts">
	import { Badge, Button, Icon, PageHeader } from '$lib/ember/index.js';

	const SECTIONS: { title: string; desc: string; href: string; icon: 'cube' | 'pencil' | 'chart-bar' | 'layers' | 'comments' | 'home' | 'panel-right' | 'flask' | 'list' | 'fire' | 'sparkles' }[] = [
		{ title: 'Primitives', desc: 'Кнопки, карточки, бейджи, инпуты — базовая библиотека.', href: '/components', icon: 'cube' },
		{ title: 'Forms', desc: 'Поля, селекты, чекбоксы, дропзоны — всё с валидацией.', href: '/components/forms', icon: 'pencil' },
		{ title: 'Data', desc: 'Таблицы, списки, таймлайны, пагинация.', href: '/components/data', icon: 'chart-bar' },
		{ title: 'Overlays', desc: 'Модалки, тосты, дропдауны, палитра ⌘K.', href: '/components/overlays', icon: 'layers' },
		{ title: 'Content', desc: 'Заголовки, чат, аккордеон, код-блоки.', href: '/components/content', icon: 'comments' },
		{ title: 'Navigation · landing', desc: '4 варианта верхнего меню для лендинга.', href: '/nav/landing', icon: 'home' },
		{ title: 'Navigation · internal', desc: 'Топбары A1–A3 и сайдбары Б1–Б3.', href: '/nav/internal', icon: 'panel-right' },
		{ title: 'Reka parts', desc: 'Headless-системы в архитектуре reka-ui.', href: '/ui', icon: 'flask' },
		{ title: 'Catalog', desc: 'Все компоненты списком — с примером кода.', href: '/components/catalog', icon: 'list' },
		{ title: 'Tokens', desc: 'Палитра, типографика, motion, брейкпоинты.', href: '/tokens', icon: 'fire' },
		{ title: 'Patterns', desc: 'Валидация, async-состояния, подтверждения.', href: '/patterns', icon: 'sparkles' }
	];
</script>

<svelte:head>
	<title>Ember UI · Svelte component library</title>
</svelte:head>

<PageHeader eyebrow="Ember · Svelte 5"
	title="Component library"
	subtitle="Компоненты дизайн-системы Ember на Svelte 5: классы и токены из styles.css, headless-поведение в духе reka-ui. В сайдбаре один пункт меню = один компонент, полный каталог с кодом на странице Components.">
	{#snippet actions()}
		<Badge variant="success" dot>57+ компонентов</Badge>
	{/snippet}
</PageHeader>

<div class="grid grid-3 gap-3 mb-4">
	{#each SECTIONS as s (s.href + s.title)}
		<a href={s.href} class="card card-body sec-card">
			<div class="sec-icon"><Icon name={s.icon} size={17} /></div>
			<div class="text-sm font-semibold">{s.title}</div>
			<p class="text-xs text-muted-foreground mt-2" style="line-height:1.55">{s.desc}</p>
			<span class="go"><Icon name="arrow-up-right" size={15} /></span>
		</a>
	{/each}
</div>

<div class="flex gap-2 mt-4 flex-wrap">
	<Button variant="ember" href="/components"><Icon name="cube" size={14} /> Открыть библиотеку</Button>
	<Button variant="outline" href="/tokens"><Icon name="fire" size={14} /> Дизайн-токены</Button>
	<Button variant="ghost" href="/ui"><Icon name="flask" size={14} /> Headless parts</Button>
</div>

<style>
	.sec-card {
		position: relative;
		color: inherit;
		text-decoration: none;
		transition: all 0.2s var(--ease-out);
		display: block;
	}
	.sec-card:hover {
		transform: translateY(-3px);
		border-color: var(--color-border-strong);
		box-shadow: var(--shadow-md);
	}
	.sec-icon {
		width: 34px;
		height: 34px;
		border-radius: 9px;
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
	.sec-card:hover .go {
		opacity: 1;
		transform: none;
		color: var(--color-primary);
	}
</style>
