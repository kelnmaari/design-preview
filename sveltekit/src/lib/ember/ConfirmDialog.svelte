<script lang="ts">
	import Icon from './Icon.svelte';
	import Modal from './Modal.svelte';
	import TextField from './TextField.svelte';

	interface Props {
		open?: boolean;
		title: string;
		description?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		danger?: boolean;
		/** When set, the user must type this exact text to confirm. */
		requireText?: string;
		loading?: boolean;
		onconfirm?: () => void;
		oncancel?: () => void;
	}

	let {
		open = $bindable(false),
		title,
		description,
		confirmLabel = 'Confirm',
		cancelLabel = 'Cancel',
		danger = true,
		requireText,
		loading = false,
		onconfirm,
		oncancel
	}: Props = $props();

	let typed = $state('');
	const canConfirm = $derived(!requireText || typed.trim() === requireText);

	function cancel() {
		open = false;
		typed = '';
		oncancel?.();
	}

	function confirm() {
		if (!canConfirm || loading) return;
		open = false;
		typed = '';
		onconfirm?.();
	}
</script>

<Modal {open} {title} {description} onclose={cancel}>
	{#if requireText}
		<TextField
			label="Type {requireText} to confirm"
			placeholder={requireText}
			mono
			bind:value={typed}
			onenter={confirm}
		/>
	{/if}
	{#snippet footer()}
		<button class="btn btn-ghost btn-sm" onclick={cancel} disabled={loading}>{cancelLabel}</button>
		<button
			class="btn {danger ? 'btn-destructive' : 'btn-primary'} btn-sm"
			onclick={confirm}
			disabled={!canConfirm || loading}
		>
			{#if danger && !loading}<Icon name="trash" size={13} />{/if}
			{loading ? 'Working…' : confirmLabel}
		</button>
	{/snippet}
</Modal>
