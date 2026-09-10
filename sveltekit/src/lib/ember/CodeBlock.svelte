<script lang="ts">
	import Icon from './Icon.svelte';
	import { toast } from './toast.svelte.js';
	import { copyText } from './utils.js';

	interface Props {
		title?: string;
		code: string;
		language?: string;
	}

	let { title = 'code', code, language }: Props = $props();

	async function copy() {
		await copyText(code);
		toast.success('Copied to clipboard', title);
	}
</script>

<div class="codeblock">
	<div class="codeblock-head">
		<span class="dots"><span></span><span></span><span></span></span>
		<span>{title}</span>
		{#if language}<span class="badge badge-muted" style="font-size:9px;">{language}</span>{/if}
		<span style="margin-left:auto"></span>
		<button class="btn btn-ghost btn-icon btn-sm" onclick={copy} aria-label="Copy code">
			<Icon name="copy" size={12} />
		</button>
	</div>
	<pre><code>{code}</code></pre>
</div>
