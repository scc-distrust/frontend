<script lang="ts">
  import Title from "../components/Title.svelte";
  import Subtitle from "../components/Subtitle.svelte";
  import UserCard from "../components/UserCard.svelte";
  import Button from "../components/Button.svelte";
  import { players } from "../lib/backend";
  import { debugging, isHost } from "../lib/user";
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher<{ start: void }>();

  const handleStart = () => {
    dispatcher("start");
  };
</script>

<div class="main-content">
  <Title size="3rem" />
  <Subtitle size="1.76rem" subtitle="Waiting room" />
  <div class="user-list">
    {#each $players as player}
      <UserCard {player} />
    {/each}
  </div>

  {#if ($isHost && $players.length >= 2) || $debugging}
    <div class="button-container">
      <Button text="Start Game" type="primary" on:click={handleStart} />
    </div>
  {/if}
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
</style>
