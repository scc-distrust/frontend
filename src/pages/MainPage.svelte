<script lang="ts">
  import Title from "../components/Title.svelte";
  import Subtitle from "../components/Subtitle.svelte";
  import Button from "../components/Button.svelte";
  import Task from "../components/Task.svelte";
  import ReportCard from "../components/ReportCard.svelte";
  import { type Role } from "../lib/backend";
  import { self } from "../lib/user";

  export let role: Role | "Eliminated";
</script>

<div class="main-content">
  <Title size="3rem" />
  <Subtitle size="1.76rem" subtitle="Tasks" />
  <div class="tasks-list">
    {#if role === "Traitor"}
      <Task size="1.6rem" task="Eliminate Workers" />
      <Task size="1.6rem" task="Act Innocent" />
    {:else}
      {#each $self.tasks as [task, count]}
        <Task size="1.6rem" task="{task} x{count}" />
      {/each}
    {/if}
  </div>
  {#if role == "Traitor"}
    <Subtitle size="1.76rem" subtitle="Kill Nearby" />
    <div class="nearby-list">
      <ReportCard reportname="Devanshu" color="purple" />
    </div>
  {/if}
  <Subtitle size="1.76rem" subtitle="Bodies Nearby" />
  <div class="nearby-list">
    <ReportCard reportname="Devanshu" color="purple" />
  </div>
  <div class="button-container">
    <Button text="Call Meeting" type="danger" />
    <Button text="Start to play" type="primary" />
  </div>
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

  .tasks-list {
    margin-bottom: 5rem;
  }
</style>
