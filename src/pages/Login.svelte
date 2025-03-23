<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../components/Button.svelte";
  import HowToPlay from "../components/HowToPlay.svelte";
  import Icon from "../components/Icon.svelte";
  import Input from "../components/Input.svelte";
  import Title from "../components/Title.svelte";
  import UserProfile from "../components/UserProfile.svelte";

  let howToPlay: boolean = false;
  // let timer = 120;

  const showHowToPlay = () => {
    howToPlay = true;
  };

  // onMount(() => {
  //   setInterval(() => {
  //     timer -= 1;
  //   }, 1000);
  // });

  const login = () => {};
</script>

<div class="main-container">
  <Title size="6rem" />
  <UserProfile editable={true} />
  <form class="login-form" on:submit|preventDefault={login}>
    <Input id="username">
      <Icon icon="user-circle" size={1.4} />
      Username
    </Input>
    <Input id="address">
      <Icon icon="wifi" size={1.4} />
      Server Address (localhost)
    </Input>

    <div class="button-container">
      <Button text="Connect" type="primary" />
      <Button text="How to play" type="default" on:click={showHowToPlay} />
    </div>
  </form>

  {#if howToPlay}
    <HowToPlay />
  {/if}
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 400px;
    height: 100%;
    margin: auto;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    margin: 2rem 1rem 1rem 1rem;
    width: 100%;
    height: 100%;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: auto;
    margin-bottom: 2rem;
  }
</style>
