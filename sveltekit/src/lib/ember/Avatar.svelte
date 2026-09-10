<script lang="ts">
	interface Props {
		initials: string;
		gradient?: string;
		size?: number;
	}

	let { initials, gradient, size = 28 }: Props = $props();
</script>

<span
	class="avatar"
	style="width:{size}px;height:{size}px;font-size:{Math.round(size * 0.36)}px;{gradient
		? `background-image:${gradient};`
		: ''}"
	aria-hidden="true"
>
	{initials}
</span>
