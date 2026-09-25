<script lang="ts">
	interface Props {
		href: string;
		active?: boolean;
		[key: string]: unknown;
	}

	let { href, active = false, ...rest }: Props = $props();
</script>

<li>
	<a
		{href}
		class="navmenu-link"
		class:active
		style="display:inline-flex;align-items:center;padding:6px 11px;border-radius:var(--radius-sm);font-size:13px;text-decoration:none;color:{active ? 'var(--color-primary)' : 'var(--color-muted-foreground)'};background:{active ? 'rgb(var(--tw-primary) / 0.1)' : 'transparent'};"
		aria-current={active ? 'page' : undefined}
		{...rest}
	/>
</li>

<style>
	.navmenu-link:hover {
		color: var(--color-foreground);
		background: var(--color-accent);
	}
</style>
