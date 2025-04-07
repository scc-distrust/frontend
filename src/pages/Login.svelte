<script lang="ts">
  import { get } from "svelte/store";
  import { createEventDispatcher } from "svelte";
  import Button from "../components/Button.svelte";
  import HowToPlay from "../components/HowToPlay.svelte";
  import Icon from "../components/Icon.svelte";
  import Input from "../components/Input.svelte";
  import Title from "../components/Title.svelte";
  import UserProfile from "../components/UserProfile.svelte";
  import { debugging, profilePicture, toggleDevPage } from "../lib/user";

  export let error: string | null = null;

  let howToPlay: boolean = false;
  let username: string = "";
  let address: string = "";

  let clicks = 0;
  let lastClick = 0;

  function handleDevClick() {
    const now = Date.now();
    if (now - lastClick < 300) {
      clicks++;
    } else {
      clicks = 1;
    }
    lastClick = now;

    if (clicks === 10 && !get(debugging)) {
      debugging.set(true);
    } else if (clicks === 5 && get(debugging)) {
      debugging.set(false);
    }
  }

  const dispatcher = createEventDispatcher<{
    login: {
      username: string;
      address: string;
      picture: string;
    };
  }>();

  const showHowToPlay = () => {
    howToPlay = true;
  };

  const hideHowToPlay = () => {
    howToPlay = false;
  };

  const login = () => {
    dispatcher("login", {
      username,
      address,
      picture: get(profilePicture),
    });
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div on:mousedown={handleDevClick} class="developer-mode"></div>

<div class="main-container">
  <Title size="6rem" />
  <UserProfile editable={true} />
  <form on:submit|preventDefault={login}>
    <Input id="username" bind:value={username}>
      <Icon icon="user-circle" size={1.4} />
      Username
    </Input>
    <Input id="address" bind:value={address}>
      <Icon icon="wifi" size={1.4} />
      Server Address (localhost)
    </Input>

    {#if !!error}
      <span class="error">{error}</span>
    {/if}

    <div class="button-container">
      <Button text="Connect" type="primary" />
      {#if $debugging}
        <Button text="Developer Mode" type="warning" on:click={toggleDevPage} />
      {/if}
      <Button text="How to play" type="default" on:click={showHowToPlay} />
    </div>
  </form>

  {#if howToPlay}
    <HowToPlay on:exit={hideHowToPlay} />
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

  form {
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
    padding-top: 5rem;
    margin-top: auto;
    margin-bottom: 2rem;
  }

  .error {
    color: red;
    margin-top: 2rem;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 1.2rem;
  }

  .developer-mode {
    position: fixed;
    top: 0;
    left: 0;
    width: 1cm;
    height: 1cm;
    z-index: 100;
    display: flex;
  }
</style>
