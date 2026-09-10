<script lang="ts">
	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		options: Option[];
		value?: string;
		onchange?: (value: string) => void;
	}

	let { options, value = $bindable(''), onchange }: Props = $props();

	$effect(() => {
		if (!value && options.length) value = options[0].value;
	});

	function select(v: string) {
		value = v;
		onchange?.(v);
	}
</script>

<div class="segmented" role="tablist">
	{#each options as opt (opt.value)}
		<button class:active={value === opt.value} onclick={() => select(opt.value)} role="tab" aria-selected={value === opt.value}>
			{opt.label}
		</button>
	{/each}
</div>
