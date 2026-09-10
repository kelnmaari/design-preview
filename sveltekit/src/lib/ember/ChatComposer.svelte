<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		sending?: boolean;
		hint?: string;
		autofocus?: boolean;
		onsend?: (text: string) => void;
	}

	let {
		value = $bindable(''),
		placeholder = 'Ask anything…  (Enter to send, Shift+Enter for a new line)',
		disabled = false,
		sending = false,
		hint,
		autofocus = false,
		onsend
	}: Props = $props();

	let area: HTMLTextAreaElement | null = $state(null);

	$effect(() => {
		if (autofocus && area) area.focus();
	});

	// Autogrow up to ~6 rows.
	$effect(() => {
		void value;
		if (!area) return;
		area.style.height = 'auto';
		area.style.height = `${Math.min(area.scrollHeight, 148)}px`;
	});

	function send() {
		const text = value.trim();
		if (!text || disabled || sending) return;
		value = '';
		onsend?.(text);
	}
</script>

<div>
	<div class="ember-composer">
		<textarea
			class="ember-composer-input"
			rows="1"
			{placeholder}
			disabled={disabled || sending}
			aria-label="Message"
			bind:this={area}
			bind:value
			onkeydown={(e) => {
				if (e.key === 'Enter' && !e.shiftKey) {
					e.preventDefault();
					send();
				}
			}}
		></textarea>
		<button
			class="btn btn-ember btn-icon"
			aria-label="Send message"
			disabled={disabled || sending || !value.trim()}
			onclick={send}
		>
			<Icon name={sending ? 'dots' : 'paper-plane'} size={14} />
		</button>
	</div>
	{#if hint}<div class="field-hint">{hint}</div>{/if}
</div>

<style>
	.ember-composer {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		padding: 0.5rem 0.5rem 0.5rem 0.8rem;
		background: var(--color-card);
		border: 1px solid var(--color-border-strong);
		border-radius: var(--radius-lg);
		transition: border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease;
	}
	.ember-composer:focus-within {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgb(var(--tw-primary) / 0.15);
	}
	.ember-composer-input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: none;
		outline: none;
		resize: none;
		font: inherit;
		font-size: 13px;
		line-height: 1.55;
		color: var(--color-foreground);
		padding: 0.3rem 0;
		max-height: 148px;
	}
	.ember-composer-input::placeholder { color: var(--color-subtle); }
	.ember-composer-input:disabled { opacity: 0.55; }
</style>
