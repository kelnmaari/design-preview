<script lang="ts">
	export interface Tab {
		value: string;
		label: string;
		badge?: string;
	}

	interface Props {
		tabs: Tab[];
		value?: string;
		onchange?: (value: string) => void;
	}

	let { tabs, value = $bindable(''), onchange }: Props = $props();

	$effect(() => {
		if (!value && tabs.length) value = tabs[0].value;
	});

	function select(v: string) {
		value = v;
		onchange?.(v);
	}
</script>

<div class="tabs" role="tablist">
	{#each tabs as tab (tab.value)}
		<button
			class="tab"
			class:active={value === tab.value}
			role="tab"
			aria-selected={value === tab.value}
			onclick={() => select(tab.value)}
		>
			{tab.label}
			{#if tab.badge}<span class="badge badge-muted" style="margin-left:.3rem;">{tab.badge}</span>{/if}
		</button>
	{/each}
</div>
