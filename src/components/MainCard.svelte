<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Player } from '../lib/backend';
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';

	const dispatcher = createEventDispatcher<{ action: void }>();

	export let player: Player;

	const handleAction = () => {
		dispatcher('action');
	};
</script>

<div
	class="report-card"
	style="--border: var(--{player.color}-border); --bg: var(--{player.color}-bg);"
>
	<div class="background"></div>
	<div class="report-info">
		<div class="name-container">
			{#if player.state === 'Eliminated'}
				<Icon icon="skull" size={2} />
			{:else}
				<img
					src="https://api.dicebear.com/9.x/pixel-art/svg?seed={player.profile_picture}"
					alt={player.name}
					class="character-image"
				/>
			{/if}
			<p class="username">{player.name}</p>
		</div>
		<p class="status">
			{player.state === 'Eliminated'
				? 'Dead Player!'
				: 'Click the button to kill'}
		</p>
	</div>
	<div class="action">
		<Button
			text={player.state === 'Eliminated' ? 'Report' : 'Kill'}
			type="danger"
			on:click={handleAction}
			countdown={player.state === 'Eliminated' ? null : 120}
			fullWidth={false}
		/>
	</div>
</div>

<style>
	.report-card {
		position: relative;
		margin: 3% 5%;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-left: 10px solid var(--border);
		border-radius: 10px;
		padding: 10px 15px;
		background-color: #fff;
		width: auto;
		font-family: 'Ubuntu Mono', sans-serif;
		z-index: 10;
	}

	.background {
		position: absolute;
		background-color: var(--bg);
		border-radius: 0 10px 10px 0;
		z-index: 10;
		opacity: 0.4;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 20;
	}

	.report-card > *:not(.background) {
		z-index: 30;
	}

	.report-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.username {
		font-size: 1.8rem;
		font-weight: bold;
		margin: 0%;
		color: var(--font-color);
		font-family: 'Ubuntu Mono', serif;
	}
	.name-container {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.status {
		font-size: large;
		color: var(--font-color);
		margin: 0%;
	}

	.character-image {
		margin-left: 0.25rem;
		width: 40px;
		height: 40px;
		padding: 0 0.25rem;
		mix-blend-mode: multiply;
	}
</style>
