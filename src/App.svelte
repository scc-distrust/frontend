<script>
	import TaskPage from './pages/TaskPage.svelte';
	import Switches from './tasks/switches/Switches.svelte';
</script>

<TaskPage>
	<Switches on:completed={() => console.log('yay done')} />
</TaskPage>
