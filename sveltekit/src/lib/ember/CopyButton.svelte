<script lang="ts">
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { toast } from './toast.svelte.js';
	import { copyText } from './utils.js';

	interface Props {
		text: string;
		label?: string;
		size?: 'sm' | 'md';
		preview?: string;
	}

	let { text, label = 'Copy', size = 'sm', preview }: Props = $props();

	async function copy() {
		await copyText(text);
		toast.success('Copied to clipboard', preview ?? text.slice(0, 42));
	}
</script>

<Button variant="outline" {size} onclick={copy}>
	<Icon name="copy" size={13} /> {label}
</Button>
