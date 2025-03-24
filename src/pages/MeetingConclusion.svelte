<script lang="ts">
  import Title from "../components/Title.svelte";
  import { onMount } from "svelte";

  export let username: string = "Devanshu";
  export let totalTraitors: number = 3;
  export let isUserTraitor: boolean = false;

  let isSelectedUserTraitor: boolean = false;
  let remainingTraitors = totalTraitors;

  onMount(() => {
    isSelectedUserTraitor = Math.random() < 0.5; //50% chance of selecting the user as a traitor

    // Adjust the number of remaining traitors
    remainingTraitors = isUserTraitor ? totalTraitors - 1 : totalTraitors;
  });
</script>

<div class="main-content">
  <Title size="3rem" />
  <div class="message">
    <p class="user-message">
      {username} was {isSelectedUserTraitor ? "A Traitor" : "not A Traitor"}
    </p>
    <p>
      There are <span class="traitor-count">{remainingTraitors}</span> traitors remaining
    </p>
  </div>
</div>

<style>
  .message {
    font-family: "Ubuntu Mono", serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
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
</style>
