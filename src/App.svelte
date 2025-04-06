<script lang="ts">
	import MeetingConclusion from './pages/MeetingConclusion.svelte';
	import MeetingRoom from './pages/MeetingRoom.svelte';
	import Wires from './tasks/wires/Wires.svelte';
	import TaskPage from './pages/TaskPage.svelte';
	import Waiting from './pages/Waiting.svelte';
	import Login from './pages/Login.svelte';
	import EntryPage from './pages/EntryPage.svelte';
	import MainPage from './pages/MainPage.svelte';

	import * as backend from './lib/backend';
	import * as capacitor from './lib/capacitor';

	import { role, selfId } from './lib/user';
	import { get } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';
	import MeetingCalled from './pages/MeetingCalled.svelte';
	import type { MeetingData, MeetingResults } from './lib/backend';

	let page = 'login';
	let error: string | null = null;

	let meetingData: MeetingData | null = null;
	let meetingResults: MeetingResults | null = null;

	onDestroy(() => {
		backend.disconnect();
	});

	const goto = (newPage: string) => {
		error = null;
		page = newPage;
	};

	const handleLogin = (
		event: CustomEvent<{
			username: string;
			address: string;
			picture: string;
		}>
	) => {
		error = null;
		backend.connect(event.detail.address).then(async (result) => {
			if (result !== null) {
				error = result;
				return;
			}

			const hasPermissions = await capacitor.requestPermissions();
			if (!hasPermissions) {
				error =
					'Location permissions are required to play, please enable them in the settings.';
				return;
			}

			backend.login(event.detail.username, get(selfId), event.detail.picture);

			// Attach extra listeners
			backend.connection().on('role', (assigned: backend.Role) => {
				role.set(assigned);
				goto('role');
				setTimeout(() => {
					goto('main');
				}, 3e3);
			});

			goto('waiting');

			backend.connection().on('meeting', (data: MeetingData) => {
				meetingData = data;
				goto('meeting-splash');

				setTimeout(() => {
					goto('meeting');
				}, 5e3);
			});

			backend.connection().on('meeting_ended', (results: MeetingResults) => {
				meetingResults = results;
				goto('meeting-results');

				setTimeout(() => {
					goto('main');
				}, 8e3);
			});
		});
	};

	const handleStart = () => {
		backend.start();
	};
</script>

{#if page === 'login'}
	<Login on:login={handleLogin} {error} />
{:else if page === 'waiting'}
	<Waiting on:start={handleStart} />
{:else if page === 'role'}
	<EntryPage role={$role} />
{:else if page === 'main'}
	<MainPage role={$role} />
{:else if page === 'meeting-splash'}
	<MeetingCalled />
{:else if page === 'meeting'}
	<MeetingRoom data={meetingData!} />
{:else if page === 'meeting-results'}
	<MeetingConclusion results={meetingResults!} />
{:else if page === ''}{:else if page === 'task'}
	<TaskPage>
		<Wires />
	</TaskPage>
{/if}
