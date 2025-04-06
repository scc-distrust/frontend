<script lang="ts">
	import { debugging } from '../lib/user';

	export let size: string = '1em';
</script>

<h1 style="--size: {size}">
	Distrust
	{#if $debugging}
		<span>Developer Mode</span>
	{/if}
</h1>

<style>
	h1 {
		font-family: 'Henny Penny', serif;
		font-size: var(--size);
		text-align: center;
		margin: 0;
		margin-top: 5%;
		z-index: 10;
		user-select: none;
		width: 100%;
	}

	span {
		font-family: 'Ubuntu Mono', serif;
		font-weight: 300;
		opacity: 0.3;
		font-size: 1.2rem;
		color: red;
		position: absolute;
		width: 10rem;
		top: 1rem;
		right: 0rem;
		z-index: 20;
	}
</style>
