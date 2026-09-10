<script lang="ts">
	interface Props {
		checked?: boolean;
		label?: string;
		onchange?: (value: boolean) => void;
	}

	let { checked = $bindable(false), label, onchange }: Props = $props();
</script>

<label class="flex items-center gap-2 pointer">
	<span class="switch">
		<input type="checkbox" bind:checked onchange={() => onchange?.(checked)} />
		<span class="track"></span>
	</span>
	{#if label}<span class="text-sm">{label}</span>{/if}
</label>
