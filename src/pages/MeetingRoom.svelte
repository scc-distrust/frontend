<script lang="ts">
  import Title from "../components/Title.svelte";
  import Subtitle from "../components/Subtitle.svelte";
  import UserCard from "../components/UserCard.svelte";
</script>

<div class="main-content">
  <Title size="3rem" />
  <Subtitle size="1.76rem" subtitle="Meeting Room" />
  <div class="user-list">
    <UserCard username="Devanshu" color="blue" type="" />
    <UserCard username="Santio" color="red" />
    <UserCard username="Dave" color="yellow" />
    <UserCard username="Dave" color="purple" />
  </div>
</div>
