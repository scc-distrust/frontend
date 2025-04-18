<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Wheel from './Wheel.svelte';

	let step: number = 0;
	const dispatcher = createEventDispatcher<{ completed: void }>();

	const handleFail = () => {
		step = 0;
	};

	const handleCompleted = () => {
		step++;
		if (step == 3) dispatcher('completed');
	};
</script>

<div class="content">
	<Wheel
		color={'green'}
		canClick={step == 0}
		completed={step > 0}
		on:failed={handleFail}
		on:completed={handleCompleted}
	/>
	<Wheel
		color={'red'}
		canClick={step == 1}
		completed={step > 1}
		on:failed={handleFail}
		on:completed={handleCompleted}
	/>
	<Wheel
		color={'cyan'}
		canClick={step == 2}
		completed={step > 2}
		on:failed={handleFail}
		on:completed={handleCompleted}
	/>
</div>

<style>
	.content {
		width: 100%;
		height: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1.5rem;
	}
</style>
