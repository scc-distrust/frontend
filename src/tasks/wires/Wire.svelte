<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type colors = 'red' | 'green' | 'blue' | 'purple';

	export let color: colors;
	export let interactive: boolean = true;

	let connecting: boolean = false;
	let block: HTMLDivElement;
	let wire: HTMLDivElement;

	const dispatcher = createEventDispatcher<{ completed: void }>();

	const mouseDown = (_) => {
		if (!interactive) return;

		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp, { once: true });
		document.addEventListener('touchmove', mouseMove);
		document.addEventListener('touchend', mouseUp, { once: true });

		connecting = true;
		wire.style.display = 'block';
		wire.style.left =
			block.getBoundingClientRect().left + block.offsetWidth / 2 + 'px';
		wire.style.top =
			block.getBoundingClientRect().top + block.offsetHeight / 2 + 'px';
	};

	const mouseUp = (_) => {
		document.removeEventListener('mousemove', mouseMove);
		document.removeEventListener('touchmove', mouseMove);
		connecting = false;
		wire.style.display = 'none';
	};

	const drawFromDiv = (
		block: HTMLDivElement,
		pos2: { x: number; y: number }
	) => {
		var x1 =
			block.getBoundingClientRect().left +
			window.pageXOffset +
			(block.getBoundingClientRect().height || block.offsetHeight) / 2;

		var y1 =
			block.getBoundingClientRect().top +
			window.pageYOffset +
			(block.getBoundingClientRect().height || block.offsetHeight) / 2;

		draw({ x: x1, y: y1 }, pos2);
	};

	const drawFromDivs = (block: HTMLDivElement, pos2: HTMLDivElement) => {
		var x2 =
			pos2.getBoundingClientRect().left +
			window.pageXOffset +
			(pos2.getBoundingClientRect().height || pos2.offsetHeight) / 2;

		var y2 =
			pos2.getBoundingClientRect().top +
			window.pageYOffset +
			(pos2.getBoundingClientRect().height || pos2.offsetHeight) / 2;

		drawFromDiv(block, { x: x2, y: y2 });
	};

	const draw = (
		pos1: { x: number; y: number },
		pos2: { x: number; y: number }
	) => {
		var length = Math.sqrt(
			(pos2.x - pos1.x) * (pos2.x - pos1.x) +
				(pos2.y - pos1.y) * (pos2.y - pos1.y)
		);
		var cx = (pos1.x + pos2.x) / 2 - length / 2;
		var cy = (pos1.y + pos2.y) / 2 - 0.5;

		var angle = Math.atan2(pos1.y - pos2.y, pos1.x - pos2.x) * (180 / Math.PI);

		wire.style.width = length + 'px';
		wire.style.lineHeight = '1px';
		wire.style.left = cx + 'px';
		wire.style.top = cy + 'px';
		wire.style.width = length + 'px';
		wire.style.transform = 'rotate(' + angle + 'deg)';
	};

	const mouseMove = (event: MouseEvent | TouchEvent) => {
		let clientX: number;
		let clientY: number;

		if (event instanceof MouseEvent) {
			clientX = event.clientX;
			clientY = event.clientY;
		} else {
			clientX = event.touches[0].clientX;
			clientY = event.touches[0].clientY;
		}

		drawFromDiv(block, { x: clientX, y: clientY });

		// Check if the mouse is over another block with the same color
		const over = document
			.elementsFromPoint(clientX, clientY)
			.find((el) => el.classList.contains('block'));
		if (over) {
			if (over === block || !(over instanceof HTMLDivElement)) return;

			const color = over.style.getPropertyValue('--color');
			if (color === wire.style.getPropertyValue('--color')) {
				interactive = false;
				connecting = false;

				document.removeEventListener('mousemove', mouseMove);
				document.removeEventListener('mouseup', mouseUp);
				document.removeEventListener('touchmove', mouseMove);
				document.removeEventListener('touchend', mouseUp);

				wire.style.display = 'block';
				drawFromDivs(block, over);
				dispatcher('completed');
			}
		}
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="block"
	on:mousedown={mouseDown}
	on:touchstart={mouseDown}
	bind:this={block}
	style="--color: {color}"
></div>

<div class="wire" bind:this={wire} style="--color: {color}"></div>

<style>
	.block {
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 8px;
		background-color: var(--color);
	}

	.wire {
		display: none;
		background-color: var(--color);
		top: 50%;
		left: 50%;
		width: 10px;
		height: 10px;
		position: absolute;
		z-index: 100;
	}
</style>
