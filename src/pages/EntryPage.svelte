<script lang="ts">
  import Title from "../components/Title.svelte";
  import RoleComponent from "../components/RoleComponent.svelte";
  import { type Role } from "../lib/backend";

  export let role: Role | "Eliminated";
</script>

<div class="main-container">
  <Title size="3rem" />
  <RoleComponent {role} />
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    height: 85%;
    margin: auto;
  }
</style>
