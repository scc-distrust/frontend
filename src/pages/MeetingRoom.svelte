<script lang="ts">
  import Title from "../components/Title.svelte";
  import Subtitle from "../components/Subtitle.svelte";
  import UserCard from "../components/UserCard.svelte";
</script>

<div class="main-content">
  <Title size="3rem" />
  <Subtitle size="1.76rem" subtitle="Meeting Room" />
  <div class="user-list">
    <UserCard username="Devanshu" color="blue" type="" voted={true} clicked={true}/>
    <UserCard username="Santio" color="red" type="" voted={true} clicked={true}/>
    <UserCard username="Dave" color="yellow" type="" voted={true} clicked={true}/>
    <UserCard username="Dave" color="purple" type="" voted={true} clicked={true}/>
  </div>
</div>
