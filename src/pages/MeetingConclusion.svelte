<script lang="ts">
	import { players, type MeetingResults } from '../lib/backend';
	import Title from '../components/Title.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let results: MeetingResults;
	$: topVoted = $players.find((p) => p.color === results.topVoted);

	let text: string = '';
	let delay: NodeJS.Timeout | null = null;
	let done = false;

	const typeLetter = (expected: string) => {
		if (delay !== null) {
			clearTimeout(delay);
			delay = null;
		}

		delay = setTimeout(
			() => {
				text = text + expected.substring(text.length, text.length + 1);

				if (text.length === expected.length) {
					delay = null;
					done = true;
					return;
				}

				typeLetter(expected);
			},
			Math.random() * 100 + 100
		);
	};

	onMount(() => {
		let expected: string;
		if (results.skip) {
			expected = 'The meeting was skipped';
		} else {
			expected = `${topVoted.name} was ${
				topVoted.role === 'Traitor' ? 'A Traitor' : 'not A Traitor'
			}`;
		}

		// Typing animation
		typeLetter(expected);
	});
</script>

<div class="main-content">
	<Title size="3rem" />
	<div class="message">
		<p class="user-message">
			{text}
		</p>
		<p>
			{#if done}
				<!-- svelte-ignore node_invalid_placement_ssr -->
				<div in:fade={{ duration: 300, delay: 1e3 }}>
					{#if results.traitors === 1}
						There is <span class="traitor-count">{results.traitors}</span>
						 traitor remaining
					{:else}
						There are <span class="traitor-count">{results.traitors}</span>
						traitors remaining
					{/if}
				</div>
			{/if}
		</p>
	</div>
</div>

<style>
	.message {
		font-family: 'Ubuntu Mono', serif;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 4rem;
		height: 80vh;
		width: 100%;
		font-size: 1.5rem;
	}

	.user-message {
		font-size: 2.5rem;
		margin: 0 10% 0 10%;
		text-align: center;
	}

	.traitor-count {
		color: var(--red);
	}

	p {
		height: 1em;
		width: 60%;
		margin: 0 auto;
	}
</style>
