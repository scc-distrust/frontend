<script lang="ts">
	import { onDestroy, onMount, createEventDispatcher } from 'svelte';
	import Button from '../../components/Button.svelte';

	let interval: NodeJS.Timeout;
	let speedDiff = Math.random() * 2;
	let rot = Math.floor(Math.random() * 360);
	let isOver = false;
	let wasCompleted = false;

	const dispatcher = createEventDispatcher<{
		completed: void;
		failed: void;
	}>();

	export let completed: boolean;
	export let canClick: boolean;
	export let color: string;

	onMount(() => {
		interval = setInterval(() => {
			if (completed) {
				rot = 0;
				wasCompleted = true;
			} else if (wasCompleted) {
				rot = Math.floor(Math.random() * 360);
				wasCompleted = false;
			} else {
				rot = (rot + 3 + speedDiff) % 360;
				isOver = Math.abs(rot - 0) <= 20;
			}
		}, 50);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const handleClick = () => {
		if (isOver) dispatcher('completed');
		else dispatcher('failed');
	};
</script>

<div class="content">
	<div class="wheel" style="--color: var(--{color});">
		<div class="hook" style="--rot: {rot}deg;"></div>
		<div class="target" class:over={isOver}></div>
	</div>

	<div class="button">
		<Button
			text="Connect"
			type="default"
			fullWidth={true}
			small={true}
			disabled={!canClick}
			on:click={handleClick}
		/>
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 2rem;
	}

	.button {
		display: flex;
		margin: auto 0;
		height: 3rem;
		width: 10rem;
	}

	.wheel::before {
		content: '';
		width: 5rem;
		height: 5rem;
		background-color: var(--background);
		transform: translate(0.5rem, 0.5rem);
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.wheel {
		width: 6rem;
		height: 6rem;
		background-color: #eeeeee;
		border-radius: 50%;
		z-index: 20;
		position: relative;
	}

	.hook {
		width: 3.5rem;
		height: 1rem;
		background-color: var(--color);
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 5;
		transform: translateY(-50%) rotate(var(--rot));
		/* transition: linear transform 0.2s; */
		transform-origin: left;
	}

	.target {
		width: 2rem;
		height: 1rem;
		border: 1px dashed var(--color);
		position: absolute;
		top: 50%;
		right: -25%;
		transform: translateY(-50%);
		z-index: 1;
	}

	.target.over {
		border: 1px solid var(--color);
		background-color: var(--color);
	}
</style>
