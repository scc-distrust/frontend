<script>
  import Role from "../components/Role.svelte";
  import Title from "../components/Title.svelte";
  import Subtitle from "../components/Subtitle.svelte";
  import UserCard from "../components/UserCard.svelte";
  import Button from "../components/Button.svelte";

</script>

<div class="main-content">
  <Title size="3rem" />
  <Subtitle size="1.76rem" />
  <div class="user-list">
    <UserCard 
    username="Devanshu"
    borderColor="var(--card-purple-border)"
    backgroundColor="var(--card-purple-bg)"/>
    <UserCard 
    username="Santio"
    borderColor="var(--card-red-border)"
    backgroundColor="var(--card-red-bg)"/>
    <UserCard 
    username="Dave"
    borderColor="var(--card-blue-border)"
    backgroundColor="var(--card-blue-bg)"/>
  </div>
  <div class="button-container">
    <Button text="Start to play" type="primary" />
  </div>
</div>

<style>
  .button-container{
    width: 100%;
    position: absolute;
    margin-bottom: 0.5rem;
    bottom: 10px;
  }
</style>