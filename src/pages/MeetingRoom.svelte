<script lang="ts">
  import Title from "../components/Title.svelte";
  import Subtitle from "../components/Subtitle.svelte";
  import UserCard from "../components/UserCard.svelte";
  import Button from "../components/Button.svelte";

  let timer: number = 120;
</script>

<div class="main-content">
  <Title size="3rem" />
  <Subtitle size="1.76rem" subtitle="Meeting Room" />
  <div class="user-list">
    <UserCard username="Devanshu" color="blue" voted={true} />
    <UserCard username="Santio" color="red" voted={true} />
    <UserCard username="Dave" color="yellow" voted={true} />
    <UserCard username="Dave" color="purple" voted={true} />
  </div>
  <div class="timmer">
    <div class="time-left">
      {timer}s
    </div>
    <p class="time-message">left for voting!</p>
  </div>
  <div class="button-container">
    <Button text="Skip Vote" type="default" />
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

  .timmer {
    position: absolute;
    font-family: "Ubuntu Mono", serif;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    bottom: 95px;
    margin: 0;
  }

  .time-left {
    font-family: "Ubuntu Mono", serif;
    font-weight: 600;
    color: var(--green);
    margin: 0;
    font-size: 3.4rem;
  }

  .time-message {
    margin: 0;
    font-weight: lighter;
  }
</style>
