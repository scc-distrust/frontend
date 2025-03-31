<script lang="ts">
  import { fade } from "svelte/transition";
  import { get } from "svelte/store";
  import { players, type Role } from "../lib/backend";

  export let role: Role | "Eliminated";
  let numOfTraitor: number = Math.floor(get(players).length / 5) + 1;
</script>

<div>
  {#if role === "Eliminated"}
    <p class="info">You may continue your tasks after a meeting is called.</p>
  {:else}
    <p>You are a</p>
    <p class="role {role.toLowerCase()}">{role}</p>
    <p class="info" in:fade={{ duration: 300 }}>
      There {numOfTraitor == 1 ? "is" : "are"}
      <span class="traitor-count">{numOfTraitor}</span>
      traitor{numOfTraitor == 1 ? "" : "s"}
    </p>
  {/if}
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
    position: relative;
    z-index: 20;
    /* text-shadow: 0px 0px 15px rgba(74, 144, 226, 0.8); */
  }

  .role::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20rem;
    transform: translateY(-40%);
    background: radial-gradient(
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 40%
    );
    z-index: 10;
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
