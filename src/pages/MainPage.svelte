<script lang="ts">
  import Role from "../components/Role.svelte";
  import Title from "../components/Title.svelte";
  import Subtitle from "../components/Subtitle.svelte";
  import Button from "../components/Button.svelte";
  import Task from "../components/Task.svelte";
  import ReportCard from "../components/ReportCard.svelte";

  let imposter: boolean = false;
</script>

<div class="main-content">
  <Title size="3rem" />
  <Subtitle size="1.76rem" subtitle="Tasks" />
  <div class="tasks-list">
    <Task size="1.6rem" task="Swipe Card" />
    <Task size="1.6rem" task="Inspect Sample" />
    <Task size="1.6rem" task="Fix Wiring" />
  </div>
  {#if imposter}
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
