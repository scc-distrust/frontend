<script lang="ts">
	import Title from '../components/Title.svelte';
	import Subtitle from '../components/Subtitle.svelte';
	import Button from '../components/Button.svelte';
	import Task from '../components/Task.svelte';
	import MainCard from '../components/MainCard.svelte';
	import { type Player, playersNearby, bodies } from '../lib/backend';
	import { calledMeeting, debugging, self, toggleDevPage } from '../lib/user';
	import * as backend from '../lib/backend';
	import * as capacitor from '../lib/capacitor';

	$: bodiesNearby = $playersNearby.filter((p) =>
		$bodies.find((b) => b.color === p.color)
	);

	const callMeeting = () => {
		calledMeeting.set(true);
		backend.callMeeting();
	};

	const scanTask = async () => {
		const result = await capacitor.scanQr();
		backend.scanQr(result);
	};

	const kill = (player: Player) => {
		backend.eliminate(player.color);
	};

	const report = () => {
		backend.callMeeting();
	};
</script>

<div class="main-content">
	<Title size="3rem" />
	<Subtitle size="1.76rem" subtitle="Tasks" />
	<div class="tasks-list">
		{#if $self.role === 'Traitor'}
			<Task size="1.6rem" task="Eliminate Workers" />
			<Task size="1.6rem" task="Act Innocent" />
		{:else}
			{#each $self.tasks as [task, count]}
				<Task size="1.6rem" task="{task} x{count}" />
			{/each}
		{/if}
	</div>
	{#if $self.role == 'Traitor' && $playersNearby.length > 0}
		<Subtitle size="1.76rem" subtitle="Kill Nearby" />
		<div class="nearby-list">
			{#each $playersNearby as nearby}
				<MainCard player={nearby} on:action={() => kill(nearby)} />
			{/each}
		</div>
	{/if}
	<Subtitle size="1.76rem" subtitle="Bodies Nearby" />
	<div class="nearby-list">
		{#each bodiesNearby as player}
			<MainCard {player} on:action={report} />
		{/each}
	</div>
	<div class="button-container">
		{#if $debugging}
			<Button text="Developer Mode" type="warning" on:click={toggleDevPage} />
		{/if}
		<Button
			text="Call Meeting"
			type="danger"
			disabled={$calledMeeting && !$debugging}
			on:click={callMeeting}
			countdown={10}
		/>
		<Button
			text="Scan Task"
			type="primary"
			on:click={scanTask}
			disabled={$self.role === 'Traitor' && !$debugging}
		/>
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

	.tasks-list {
		margin-bottom: 5rem;
	}
</style>
