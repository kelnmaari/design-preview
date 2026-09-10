<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		spotlight?: boolean;
		class?: string;
		headerExtra?: Snippet;
		children?: Snippet;
		footer?: Snippet;
	}

	let { title, description, spotlight = false, class: cls = '', headerExtra, children, footer }: Props = $props();
</script>

<div class="card {cls}" class:spotlight>
	{#if title}
		<div class="card-header flex items-center justify-between">
			<div>
				<div class="card-title">{title}</div>
				{#if description}<div class="card-description">{description}</div>{/if}
			</div>
			{@render headerExtra?.()}
		</div>
	{/if}
	<div class="card-body">
		{@render children?.()}
	</div>
	{#if footer}
		<div class="card-footer">
			{@render footer?.()}
		</div>
	{/if}
</div>

