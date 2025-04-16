<script lang="ts">
	import Button from '../components/Button.svelte';
	import Subtitle from '../components/Subtitle.svelte';
	import Title from '../components/Title.svelte';
	import { self, toggleDevPage } from '../lib/user';
	import * as backend from '../lib/backend';
	import {
		players,
		playersNearby,
		nearbyRaw,
		isBody,
		bodies
	} from '../lib/backend';
	import { lastLocation, watchID } from '../lib/capacitor';
	import * as capacitor from '../lib/capacitor';

	$: socket = backend.socket;
	$: nearbyData = $nearbyRaw.map((data) => ({
		...data,
		player: $players.find((p) => p.color === data.color)
	}));

	const eliminateOthers = () => {
		for (const player of $players) {
			if (player.color !== $self.color) {
				backend.eliminate(player.color);
				break;
			}
		}
	};

	const selfEliminate = () => {
		backend.eliminate($self.color);
	};

	const callMeeting = () => {
		backend.callMeeting();
	};

	const skipMeeting = () => {
		backend.forceSkipMeeting();
	};

	const toggleBody = () => {
		isBody.set(!$isBody);
	};

	const kickSelf = () => {
		backend.kick($self.color);
	};

	const kickOthers = () => {
		for (const player of $players) {
			if (player.color !== $self.color) {
				backend.kick(player.color);
				break;
			}
		}
	};

	const kickAll = () => {
		for (const player of $players) {
			backend.kick(player.color);
		}
	};

	const teleport = (x: number, y: number) => {
		return (event: Event) => capacitor.fakeLocation(x, y);
	};
</script>

<main>
	<Title size="3rem" />
	<h2>Developer Mode</h2>
	<Subtitle size="1.25rem" subtitle="Client Data" />

	<div class="info">
		<p class="key">Socket connected:</p>
		<p class="value">{$socket !== null && $socket.connected ? 'Yes' : 'No'}</p>
	</div>
	<div class="info">
		<p class="key">Location Tracking:</p>
		<p class="value">{$watchID !== null ? 'Enabled' : 'Disabled'}</p>
	</div>
	{#if $lastLocation !== null}
		<div class="info">
			<p class="key">Last Location:</p>
			{#each Object.entries($lastLocation.coords) as [key, value]}
				<div class="sub">
					<p class="key">{key}:</p>
					<p class="value">{value}</p>
				</div>
			{/each}
		</div>
	{/if}

	{#if $self !== null}
		<div class="info">
			<p class="key">User Data:</p>
			{#each Object.entries($self) as [key, value]}
				<div class="sub">
					<p class="key">{key}:</p>
					<p class="value">{value}</p>
				</div>
			{/each}
		</div>
	{/if}
	<div class="info">
		<p class="key">Is Body:</p>
		<p class="value">{$isBody ? 'Yes' : 'No'}</p>
	</div>

	<Subtitle size="1.25rem" subtitle="Network Data" />
	<div class="info">
		<p class="key">Players ({$players.length}):</p>
		{#each $players as player}
			<div class="sub">
				<p class="key">
					<img
						src="https://api.dicebear.com/9.x/pixel-art/svg?seed={player.profile_picture}"
						alt="{player.name} Profile"
						width="30em"
						height="30em"
					/>
					{player.name}:
				</p>
				<p class="value">{player.color}</p>
			</div>
		{/each}
	</div>
	<div class="info">
		<p class="key">Bodies ({$bodies.length}):</p>
		{#each $bodies as player}
			<div class="sub">
				<p class="key">
					<img
						src="https://api.dicebear.com/9.x/pixel-art/svg?seed={player.profile_picture}"
						alt="{player.name} Profile"
						width="30em"
						height="30em"
					/>
					{player.name}:
				</p>
				<p class="value">{player.state}</p>
			</div>
		{/each}
	</div>
	<div class="info">
		<p class="key">Nearby ({$playersNearby.length}):</p>
		{#each nearbyData as data}
			<div class="sub">
				<p class="key">
					<img
						src="https://api.dicebear.com/9.x/pixel-art/svg?seed={data.player
							.profile_picture}"
						alt="{data.player.name} Profile"
						width="30em"
						height="30em"
					/>
					{data.player.name}:
				</p>
				<p class="value">{((data.distance * 10000) / 11) * 10}m</p>
			</div>
		{/each}
	</div>

	<Subtitle size="1.25rem" subtitle="Teleportation" />
	<div class="actions">
		<Button text="Bedroom" on:click={teleport(100, 100)} small={true} />
		<Button text="Kitchen" on:click={teleport(200, 100)} small={true} />
		<Button text="Living Room" on:click={teleport(300, 100)} small={true} />
		<Button text="Office" on:click={teleport(400, 100)} small={true} />
	</div>

	<Subtitle size="1.25rem" subtitle="Actions" />
	<div class="actions">
		<Button
			text="Change Role"
			on:click={() => backend.changeRole()}
			small={true}
		/>
		<Button
			text="Bring Here"
			on:click={() => backend.bringHere()}
			small={true}
		/>
		<Button text="Eliminate Others" on:click={eliminateOthers} small={true} />
		<Button text="Self Eliminate" on:click={selfEliminate} small={true} />
		<Button text="Call Meeting" on:click={callMeeting} small={true} />
		<Button text="Force Skip Meeting" on:click={skipMeeting} small={true} />
		<Button text="Toggle Body Status" on:click={toggleBody} small={true} />
		<Button text="Kick Self" on:click={kickSelf} small={true} />
		<Button text="Kick Others" on:click={kickOthers} small={true} />
		<Button text="Kick All" on:click={kickAll} small={true} />
	</div>

	<div class="buttons">
		<Button text="Go back" type="danger" on:click={toggleDevPage} />
	</div>
</main>

<style>
	main {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: var(--background);
		display: flex;
		flex-direction: column;
		padding: 1rem;
		z-index: 10000;
	}

	h2 {
		font-family: 'Bungee', serif;
		font-size: 1rem;
		text-align: center;
		padding: 0;
		margin-top: 0;
		margin-bottom: 0.5rem;
		transform: translateY(-0.5rem);
		color: var(--red);
	}

	.info,
	.sub {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.15rem;
		padding: 0 5%;
	}

	.info:has(> .sub) {
		display: block;
	}

	.sub {
		padding-left: 2rem;
		display: flex;
		flex-direction: row;
	}

	.info > *,
	.sub > * {
		margin: 0;
	}

	.key {
		font-family: 'Ubuntu Mono', serif;
		font-size: 1rem;
		color: var(--text-color);
		min-width: 8rem;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.value {
		font-family: 'Ubuntu Mono', serif;
		font-size: 1rem;
		color: var(--purple);
	}

	.buttons {
		padding-top: 3rem;
		margin-top: auto;
	}

	.actions {
		width: 80%;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 1rem;
	}
</style>
