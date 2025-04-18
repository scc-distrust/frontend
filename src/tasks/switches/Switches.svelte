<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Switch from './Switch.svelte';

	const dispatcher = createEventDispatcher<{ completed: void }>();
	let completedSwitches: number = 0;

	const inc = () => {
		completedSwitches++;
		if (completedSwitches === 4) {
			dispatcher('completed');
		}
	};
</script>

<div>
	<Switch color="red" on:completed={inc} />
	<Switch color="green" on:completed={inc} />
	<Switch color="blue" on:completed={inc} />
	<Switch color="purple" on:completed={inc} />
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 90%;
		width: 90%;
		margin: auto;
	}
</style>
