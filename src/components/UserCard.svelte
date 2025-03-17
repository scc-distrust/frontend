<script lang="ts">
  import type { Color } from "../lib/user";
  import Icon from "./Icon.svelte";

  export let username: string = "Username";
  export let image: string =
    "https://cdn.vectorstock.com/i/preview-2x/31/01/pixel-art-character-vector-28943101.webp";
  export let color: Color;
  export let type: String;
  export let voted: boolean = false;
  export let clicked: boolean = false;

  // Function to handle voting
  function handleVote(isRight: boolean) {
    if (!voted) {
      voted = true;
      clicked = true;
      // You can add your logic here to handle the vote
      console.log(`Voted ${isRight ? "right" : "wrong"} for ${username}`);
    }
  }
</script>

<div
  class="user-card"
  style="border-left-color: var(--{color}-border); --bg: var(--{color}-bg);"
>
  <div class="background" />
  {#if image}
    <img src={image} alt={username} class="character-image" />
  {:else}
    <div class="user-image placeholder">No Image</div>
  {/if}

  <p class="username">
    {username}<span class="thumbs-up"
      ><Icon color="var(--green)" icon="thumb-up-filled" /></span
    >
  </p>

  <div class="vote-buttons">
    <button
      class="vote-button right"
      on:click={() => handleVote(true)}
      disabled={voted}
    >
      <Icon color="var(--green)" icon="check" />
    </button>
    <button
      class="vote-button wrong"
      on:click={() => handleVote(false)}
      disabled={voted}
    >
      <Icon color="var(--red)" icon="x" />
    </button>
  </div>
</div>

<style>
  .user-card {
    margin: 3% 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* gap: px; */
    border-radius: 10px;
    background-color: #fff;
    width: auto;
    text-align: center;
    border-left: 10px solid;
    position: relative;
    z-index: 0;
  }

  .background {
    position: absolute;
    background-color: var(--bg);
    border-radius: 0 10px 10px 0;
    z-index: 10;
    opacity: 0.4;
    width: 100%;
    height: 100%;
  }

  .user-card > *:not(.background) {
    z-index: 20;
  }

  .character-image {
    margin-left: 1%;
    width: 60px;
    height: 60px;
    mix-blend-mode: multiply;
  }

  .username {
    font-family: "Ubuntu Mono", serif;
    font-size: 2.2rem;
    color: var(--font-color);
    margin: 0%;
  }

  .thumbs-up {
    padding-left: 0.5rem;
    font-size: 2rem;
  }

  .vote-buttons {
    display: flex;
    gap: 8px;
    margin-left: auto;
    margin-right: 1rem;
  }

  .vote-button {
    padding: 2px 6px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 2rem;
    font-family: "Ubuntu Mono", serif;
  }

  .vote-button.right {
    background-color: var(--green-bg);
    color: white;
    stroke-width: 10;
  }

  .vote-button.wrong {
    background-color: var(--red-bg);
    color: white;
  }

  /* .vote-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  } */
</style>
