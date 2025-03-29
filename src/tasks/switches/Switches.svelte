<script lang="ts">
	import Title from '../../components/Title.svelte';
	import Switch from './Switch.svelte';
	import Button from '../../components/Button.svelte';
</script>

<div>
	<Switch color="red" />
	<Switch color="green" />
	<Switch color="blue" />
	<Switch color="purple" />
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 90%;
		width: 90%;
		margin: auto;
	}
</style>
