<script lang="ts">
	import { get } from 'svelte/store';
	import VictoryPage from './pages/VictoryPage.svelte';
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

	import { role, self, selfId } from './lib/user';
	import { onDestroy, onMount } from 'svelte';
	import type { Role } from './lib/backend.ts';
	import MeetingCalled from './pages/MeetingCalled.svelte';
	import type { MeetingData, MeetingResults } from './lib/backend';
	import LostPage from './pages/LostPage.svelte';

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

	const delay = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	const delayUntil = (predicate: () => boolean) =>
		new Promise((resolve) => {
			const interval = setInterval(() => {
				if (predicate()) {
					clearInterval(interval);
					resolve(null);
				}
			}, 50);
		});

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

			backend.connection().on('win_game', async (winner: Role) => {
				if (page !== 'main') {
					await delayUntil(() => {
						return page === 'main';
					});
				}

				if (get(self).role === winner) {
					goto('won');
				} else {
					goto('lost');
				}

				setTimeout(() => {
					backend.players.update((players) => {
						return players.map((p) => {
							p.state = 'Waiting';
							p.role = 'Worker';
							return p;
						});
					});

					goto('waiting');
				}, 10e3);
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
{:else if page === 'lost'}
	<LostPage />
{:else if page === 'won'}
	<VictoryPage />
{:else if page === ''}{:else if page === 'task'}
	<TaskPage>
		<Wires />
	</TaskPage>
{/if}
