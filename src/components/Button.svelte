<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { ButtonStyle } from '../lib/buttons';
	import { debugging } from '../lib/user';

	export let text: string;
	export let fullWidth: boolean = true;
	export let type: ButtonStyle = 'primary';
	export let disabled: boolean = false;
	export let countdown: number | null = null;

	let timer: NodeJS.Timeout | null = null;

	onMount(() => {
		if (disabled) countdown = null;
		if (!countdown) return;

		timer = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				clearInterval(timer!);
				timer = null;
			}
		}, 1000);
	});

	onDestroy(() => {
		if (timer !== null) {
			clearInterval(timer);
		}
	});
</script>

<button
	on:click
	class:disabled={disabled || (!!countdown && !$debugging)}
	class={`${type} ${fullWidth ? 'fullWidth' : ''}`}
>
	{text}
	{#if !!countdown}
		{' '}({countdown}s)
	{/if}
</button>

<style>
	button {
		min-width: 8rem;
		outline: none;
		border: none;
		background-color: #fff;
		color: #fff;
		padding: 0.75rem 1rem;
		margin: 0.5rem 0;
		border-radius: 4px;
		transition: all 0.2s ease-in-out;
		font-family: 'Ubuntu Mono', serif;
		font-size: 1.2rem;
	}

	button:hover {
		filter: brightness(0.8);
	}

	button:active {
		scale: 0.95;
	}

	button.primary {
		background-color: var(--purple);
	}

	button.danger {
		background-color: var(--red);
	}

	button.default {
		background-color: var(--gray);
		color: #000000;
	}

	button.fullWidth {
		width: 100%;
		width: -moz-available;
		width: -webkit-fill-available;
	}

	button.disabled::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
		cursor: not-allowed;
	}

	button.disabled {
		position: relative;
		pointer-events: none;
		cursor: not-allowed;
	}
</style>
