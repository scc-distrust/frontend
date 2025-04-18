<script lang="ts">
	import Title from '../components/Title.svelte';
</script>

<div class="main-container">
	<Title size="3rem" />
	<div class="info">
		<p>A user has called a</p>
		<p class="big">Meeting</p>
		<p class="sub">Meet up in a centralized spot to discuss.</p>
	</div>
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 400px;
		height: 85%;
		margin: auto;
	}

	.info {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		font-family: 'Ubuntu Mono', serif;
		font-size: 2rem;
	}

	p {
		margin: 0;
	}

	.big {
		font-family: 'Bungee', serif;
		font-size: 4rem;
		position: relative;
		z-index: 20;
		text-shadow: 0px 0px 15px rgba(74, 144, 226, 0.8);
	}

	.sub {
		font-size: 1rem;
	}
</style>
