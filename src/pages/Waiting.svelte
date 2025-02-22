<script>
  import Role from "../components/Role.svelte";
  import Title from "../components/Title.svelte";
  import Subtitle from "../components/Subtitle.svelte";
  import UserCard from "../components/UserCard.svelte";
  import Button from "../components/Button.svelte";
</script>

<div class="main-content">
  <Title size="3rem" />
  <Subtitle size="1.76rem" subtitle="Waiting room" />
  <div class="user-list">
    <UserCard username="Devanshu" color="blue" />
    <UserCard username="Santio" color="red" />
    <UserCard username="Dave" color="yellow" />
    <UserCard username="Dave" color="purple" />
  </div>
  <div class="button-container">
    <Button text="Start to play" type="primary" />
  </div>
</div>

<style>
  .button-container {
    width: 100%;
    position: absolute;
    margin-bottom: 0.5rem;
    bottom: 10px;
  }
</style>
