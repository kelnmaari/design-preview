<script lang="ts">
	import Avatar from './Avatar.svelte';

	interface StackAvatar {
		initials: string;
		gradient?: string;
	}

	interface Props {
		avatars: StackAvatar[];
		extra?: number;
		size?: number;
	}

	let { avatars, extra = 0, size = 28 }: Props = $props();
</script>

<div class="avatar-stack">
	{#each avatars as a (a.initials)}
		<Avatar initials={a.initials} gradient={a.gradient} {size} />
	{/each}
	{#if extra > 0}<span class="more" style="width:{size}px;height:{size}px;">+{extra}</span>{/if}
</div>
