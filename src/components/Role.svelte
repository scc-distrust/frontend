<script lang="ts">
  import type { Role } from "../lib/game";

  export let role: Role;
</script>

<div>
  <p>You are a</p>
  <p class="role {role}">{role}</p>
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

  .role {
    font-family: "Bungee", serif;
    font-size: 4rem;
  }

  .role.worker {
    color: var(--cyan);
  }

  .role.traitor {
    color: var(--red);
  }
</style>
