<script lang="ts">
	import Title from '../components/Title.svelte';
	import { debugging, toggleDevPage } from '../lib/user';
	import Button from '../components/Button.svelte';
</script>

<div class="main-container">
	<Title size="3rem" />

	<div class="container">
		<p>You are currently</p>
		<p class="title">ELIMINATED</p>
		<p class="info">You may continue your tasks after a meeting is called</p>
	</div>

	{#if $debugging}
		<div class="actions">
			<Button text="Developer Mode" type="warning" on:click={toggleDevPage} />
		</div>
	{/if}
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 80%;
		height: 85%;
		margin: auto;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		font-family: 'Ubuntu Mono', serif;
		font-size: 3rem;
	}

	p {
		margin: 0;
		text-align: center;
	}

	.info {
		font-family: 'Ubuntu Mono', serif;
		font-size: 2rem;
		margin: 0;
		text-align: center;
	}

	.title {
		font-family: 'Bungee', serif;
		font-size: 4rem;
		position: relative;
		z-index: 20;
		color: var(--red);
	}

	.title::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 20rem;
		transform: translateY(-40%);
		background: radial-gradient(
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 255, 255, 0) 40%
		);
		z-index: 10;
	}

	.actions {
		margin-top: auto;
	}
</style>
