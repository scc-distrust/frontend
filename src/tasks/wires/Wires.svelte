<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Wire from './Wire.svelte';

	const colors = ['red', 'green', 'blue', 'purple'];
	const shuffled = colors.sort(() => Math.random() - 0.5);

	let completed = 0;
	const dispatcher = createEventDispatcher<{ completed: void }>();

	const inc = () => {
		completed++;
		if (completed === 4) {
			dispatcher('completed');
		}
	};

	const cancel = (e: Event) => e.preventDefault();

	onMount(() => {
		document.addEventListener('contextmenu', cancel);
		document.addEventListener('dragstart', cancel);
		document.addEventListener('select', cancel);
		document.addEventListener('selection', cancel);
		document.addEventListener('selectstart', cancel);
	});

	onDestroy(() => {
		document.removeEventListener('contextmenu', cancel);
		document.removeEventListener('dragstart', cancel);
		document.removeEventListener('select', cancel);
		document.removeEventListener('selection', cancel);
		document.removeEventListener('selectstart', cancel);
	});
</script>

<div class="container">
	<div class="lhs">
		<Wire color="red" on:completed={inc} />
		<Wire color="green" on:completed={inc} />
		<Wire color="blue" on:completed={inc} />
		<Wire color="purple" on:completed={inc} />
	</div>
	<div class="rhs">
		{#each shuffled as color}
			<Wire color={color as any} interactive={false} />
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
		padding-left: 10px;
		padding-right: 10px;
	}

	.container > * {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
