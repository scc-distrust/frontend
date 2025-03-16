<script lang="ts">
  import type { Role } from "../lib/game";

  export let role: Role ;
  export let numOfTraitor: number = 0;

  $: info =
    role === "dead"
      ? "You may continue your tasks after a meeting is called."
      : `There are <span class="traitor-count">${numOfTraitor}</span> traitors.`;
</script>

<div>
  <p>You are a</p>
  <p class="role {role}">{role}</p>
  <p class="info">{@html info}</p>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-family: "Ubuntu Mono", serif;
    font-size: 3rem;
  }

  p {
    margin: 0;
  }

  .info {
    font-family: "Ubuntu Mono", serif;
    font-size: 2rem;
    margin: 0;
  }

  .role {
    font-family: "Bungee", serif;
    font-size: 4rem;
    /* text-shadow: 0px 0px 15px rgba(74, 144, 226, 0.8); */
  }

  .role.worker {
    color: var(--cyan);
  }

  .role.traitor {
    color: var(--red);
  }

  .traitor-count {
    color: var(--red);
  }
</style>
