<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import * as drag from '../../lib/drag';

	export let color: string;
	export const dispatcher = createEventDispatcher<{ completed: void }>();

	let switchElement: HTMLDivElement;
	let squareElement: HTMLDivElement;

	let y: number;
	let pixels: number;
	let expected: number;

	onMount(() => {
		y = Math.random() * 100 + 1;
		const maxY = switchElement.clientHeight - squareElement.clientHeight - 40;
		pixels = (y / 100) * maxY;
		expected = Math.abs((1 - Math.round(y / 100)) * (maxY + 25) - 19);

		const draggable = drag
			.mount(squareElement, (event) => {
				pixels = event.element.y;
				if (Math.abs(pixels - expected) < 20) {
					dispatcher('completed');
					draggable.cancel();
					pixels = expected;
					return;
				}
			})
			.addConstraint({ element: switchElement, padding: 50 })
			.offsetElement(switchElement);
	});
</script>

<div class="switch" style="--color: {color}" bind:this={switchElement}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="square" style="--y: {pixels}px;" bind:this={squareElement}></div>
	<div class="expected" style="--y: {expected}px;"></div>
</div>

<style>
	.switch {
		height: 100%;
		padding: 2rem;
		background-color: #ddd;
		position: relative;
	}

	.square,
	.expected {
		position: absolute;
		width: 3rem;
		height: 3rem;
		left: 0.5rem;
		top: calc(var(--y));
	}

	.square {
		background-color: var(--color);
		z-index: 20;
	}

	.expected {
		border: 2px dashed var(--color);
		opacity: 0.5;
		z-index: 10;
	}
</style>
