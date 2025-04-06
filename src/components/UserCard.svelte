<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cardClicked } from '../store/ui';

	import Icon from './Icon.svelte';
	import { get } from 'svelte/store';
	import { type Player } from '../lib/backend';

	export let player: Player;
	export let voted: boolean = false;
	export let editable: boolean = false;
	export let speaker: boolean = false;
	export let isDead: boolean = false;

	let degrees = Math.random() * 1.5 - 0.75;

	let clicked: boolean = false;
	const dispatcher = createEventDispatcher<{ vote: void }>();

	// Function to handle voting
	function handleVote(vote: boolean) {
		if (!vote) return;
		dispatcher('vote');
	}

	function unclickAll() {
		const isOtherClicked = get(cardClicked);
		if (isOtherClicked !== null) {
			isOtherClicked();
		}
	}

	function handleClick() {
		const isCurrentlyClicked = clicked;
		unclickAll();

		if (!editable) return;
		if (!isCurrentlyClicked) {
			cardClicked.set(() => {
				clicked = false;
			});

			clicked = true;
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="user-card"
	class:isDead
	style="border-left-color: var(--{player.color}-border); --bg: var(--{player.color}-bg); --deg: {degrees}deg;"
	on:click={handleClick}
>
	<div class="background"></div>
	{#if isDead}
		<div class="character-image">
			<Icon size={2.5} color="var(--red)" icon="skull" />
		</div>
	{:else if player.profile_picture}
		<img
			src="https://api.dicebear.com/9.x/pixel-art/svg?seed={player.profile_picture}"
			alt={player.name}
			class="character-image"
		/>
	{:else}
		<div class="user-image placeholder">No Image</div>
	{/if}

	<p class="username">
		{player.name}
	</p>

	{#if speaker}
		<span class="speaker">
			<Icon color="var(--black)" icon="speakerphone" />
		</span>
	{/if}

	{#if voted}
		<span class="thumbs-up">
			<Icon color="var(--green)" icon="thumb-up-filled" />
		</span>
	{/if}

	{#if clicked}
		<div class="vote-buttons">
			<button class="vote-button right" on:click={() => handleVote(true)}>
				<Icon color="var(--green)" icon="check" />
			</button>
			<button class="vote-button wrong" on:click={() => handleVote(false)}>
				<Icon color="var(--red)" icon="x" />
			</button>
		</div>
	{/if}
</div>

<style>
	.user-card {
		margin: 3% 5%;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* gap: px; */
		border-radius: 10px;
		background-color: #fff;
		width: auto;
		height: 3rem;
		text-align: center;
		border-left: 10px solid;
		position: relative;
		z-index: 0;
	}

	.user-card.isDead {
		transform: rotate(var(--deg));
	}

	.user-card.isDead::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.95);
		z-index: 1;
		cursor: not-allowed;
	}

	.background {
		position: absolute;
		background-color: var(--bg);
		border-radius: 0 10px 10px 0;
		z-index: 10;
		opacity: 0.4;
		width: 100%;
		height: 100%;
	}

	.user-card > *:not(.background) {
		z-index: 20;
	}

	.character-image {
		margin-left: 0.25rem;
		width: 50px;
		height: 50px;
		padding: 0.25rem;
		mix-blend-mode: multiply;
	}

	.username {
		font-family: 'Ubuntu Mono', serif;
		font-size: 1.8rem;
		color: var(--font-color);
		margin: 0%;
		user-select: none;
	}

	.thumbs-up,
	.speaker {
		padding-left: 0.5rem;
		font-size: 1.75rem;
	}

	.vote-buttons {
		display: flex;
		gap: 8px;
		margin-left: auto;
		margin-right: 1rem;
	}

	.vote-button {
		padding: 2px 6px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 2rem;
		font-family: 'Ubuntu Mono', serif;
	}

	.vote-button.right {
		background-color: var(--green-bg);
		color: white;
		stroke-width: 10;
	}

	.vote-button.wrong {
		background-color: var(--red-bg);
		color: white;
	}
</style>
