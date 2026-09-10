<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import Icon from './Icon.svelte';
	import { THEMES, theme, type ThemeMeta } from './theme.svelte.js';

	const current: ThemeMeta = $derived(THEMES.find((t) => t.id === theme.value) ?? THEMES[0]);
	const darks = $derived(THEMES.filter((t) => t.mode === 'dark'));
	const lights = $derived(THEMES.filter((t) => t.mode === 'light'));

	function dot(t: ThemeMeta): string {
		return `background: linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[2]} 50%);`;
	}
</script>

<Dropdown>
	{#snippet trigger({ toggle })}
		<button
			class="icon-btn"
			onclick={toggle}
			aria-label="Theme: {current.label}. Change theme"
			title="Theme: {current.label}"
		>
			<span class="theme-dot" style={dot(current)} aria-hidden="true"></span>
		</button>
	{/snippet}
	<div class="menu-label">Dark</div>
	{#each darks as t (t.id)}
		<button class="menu-item" onclick={() => theme.set(t.id)}>
			<span class="theme-dot" style={dot(t)} aria-hidden="true"></span>
			{t.label}
			{#if t.id === theme.value}
				<span class="theme-check"><Icon name="check" size={12} /></span>
			{/if}
		</button>
	{/each}
	<div class="menu-sep"></div>
	<div class="menu-label">Light</div>
	{#each lights as t (t.id)}
		<button class="menu-item" onclick={() => theme.set(t.id)}>
			<span class="theme-dot" style={dot(t)} aria-hidden="true"></span>
			{t.label}
			{#if t.id === theme.value}
				<span class="theme-check"><Icon name="check" size={12} /></span>
			{/if}
		</button>
	{/each}
</Dropdown>

<style>
	.theme-dot {
		display: block;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 1px solid var(--color-border-strong);
		flex: none;
	}
	.theme-check {
		margin-left: auto;
		color: var(--color-primary);
		display: inline-flex;
	}
</style>
