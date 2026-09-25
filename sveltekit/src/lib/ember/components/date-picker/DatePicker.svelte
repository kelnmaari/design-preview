<script lang="ts">
	import { setContext } from 'svelte';
	import Calendar from '../calendar/Calendar.svelte';
	import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover/index.js';
	import Icon from '../../Icon.svelte';

	interface Props {
		/** выбранная дата */
		value?: Date;
		min?: Date;
		max?: Date;
		placeholder?: string;
		id?: string;
	}

	let { value = $bindable(undefined), min, max, placeholder = 'Pick a date…', id }: Props = $props();
	let open = $state(false);

	const fmt = $derived(value ? value.toLocaleDateString('en-GB') : placeholder);
	setContext('ember:date-picker', { setOpen: (v: boolean) => (open = v) });
</script>

<PopoverRoot bind:open>
	<PopoverTrigger class="input pointer" {id} style="display:flex;align-items:center;justify-content:space-between;width:100%;color:{value ? 'var(--color-foreground)' : 'var(--color-subtle)'};">
		<span>{fmt}</span>
		<Icon name="clock" size={13} class="text-subtle" />
	</PopoverTrigger>
	<PopoverContent align="left" style="min-width:0;">
		<Calendar bind:value {min} {max} />
	</PopoverContent>
</PopoverRoot>
