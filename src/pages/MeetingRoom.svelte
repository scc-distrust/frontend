<script lang="ts">
	import Title from '../components/Title.svelte';
	import Subtitle from '../components/Subtitle.svelte';
	import Button from '../components/Button.svelte';
	import {
		type Player,
		players,
		type MeetingData,
		type Color
	} from '../lib/backend';
	import UserCard from '../components/UserCard.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { debugging, self, toggleDevPage } from '../lib/user';
	import * as backend from '../lib/backend';

	export let data: MeetingData;
	let timer = data.length;
	let interval: NodeJS.Timeout | null = null;

	let whoVoted: Color[] = [];
	let voted: boolean = false;

	const handleVote = (player: Player) => {
		if (voted) return;
		voted = true;

		backend.vote(player.color);
	};

	const skipVote = () => {
		if (voted) return;
		voted = true;
		backend.skipVote();
	};

	onMount(() => {
		interval = setInterval(() => {
			timer = Math.max(
				0,
				data.length - Math.floor((Date.now() - data.started) / 1000)
			);

			if (timer <= 0 && interval !== null) {
				clearInterval(interval!);
			}
		}, 500);

		backend.connection().on('voted', (player: Player) => {
			whoVoted = [...whoVoted, player.color];
		});
	});

	onDestroy(() => {
		if (interval !== null) {
			clearInterval(interval!);
		}

		backend.connection().off('voted');
	});
</script>

<div class="main-content">
	<Title size="3rem" />
	<Subtitle size="1.76rem" subtitle="Meeting Room" />
	<div class="user-list">
		{#each $players as player}
			<UserCard
				{player}
				editable={player.color !== $self.color &&
					!voted &&
					player.state === 'Playing'}
				voted={whoVoted.includes(player.color)}
				speaker={data.player.color === player.color}
				isDead={player.state === 'Eliminated'}
				on:vote={() => handleVote(player)}
			/>
		{/each}
	</div>
	<div class="timer">
		<div class="time-left">
			{timer}s
		</div>
		<p class="time-message">left for voting!</p>
	</div>
	<div class="button-container">
		<Button
			on:click={skipVote}
			text="Skip Vote"
			type="default"
			disabled={voted}
		/>
		{#if $debugging}
			<Button text="Developer Mode" type="warning" on:click={toggleDevPage} />
		{/if}
	</div>
</div>

<style>
	.button-container {
		width: 100%;
		position: absolute;
		padding-left: 5%;
		padding-right: 5%;
		margin-bottom: 0.5rem;
		bottom: 10px;
	}

	.timer {
		position: absolute;
		font-family: 'Ubuntu Mono', serif;
		width: 100%;
		text-align: center;
		font-size: 1.5rem;
		bottom: 95px;
		margin: 0;
	}

	.time-left {
		font-family: 'Ubuntu Mono', serif;
		font-weight: 600;
		color: var(--green);
		margin: 0;
		font-size: 3.4rem;
	}

	.time-message {
		margin: 0;
		font-weight: lighter;
	}
</style>
