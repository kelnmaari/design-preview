<script lang="ts">
	interface Props {
		href: string;
		[key: string]: unknown;
	}

	let { href, ...rest }: Props = $props();
</script>

<a {href} style="text-decoration:none;color:inherit;" {...rest} />
