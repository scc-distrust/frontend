<script lang="ts">
  import Title from "../components/Title.svelte";
  import Icon from "../components/Icon.svelte";

  export let message: string = "YOU LOST!";
  export let traitors = [
    { name: "Santio", image: "hello" },
    { name: "Darren", image: "helloq" },
  ];
</script>

<Title size="3rem" />
<div class="container">
  <div class="title">
    <div class="message">{message}</div>
    <div class="drop-shadow">{message}</div>
  </div>
  <div class="arrow-line">
    <div class="arrow-left">
      <Icon icon="caret-left-filled" size={3} />
    </div>
    <div class="line"></div>
    <div class="arrow-right">
      <Icon icon="caret-right-filled" size={3} />
    </div>
  </div>
  <div class="traitor-title">TRAITORS</div>
  <div class="traitors">
    {#each traitors as traitor}
      <div class="traitor-card">
        <img
          aria-hidden="true"
          src="https://api.dicebear.com/9.x/pixel-art/svg?seed={traitor.image}"
          alt="Traitor profile picture"
          class="traitor-image"
        />
        <p class="traitor-name">{traitor.name}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
    width: 100%;
    margin: auto;
  }

  .title {
    position: relative;
    height: 1.5rem;
  }

  .message,
  .drop-shadow {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    font-family: "Bungee", serif;
    font-size: 3rem;
    font-weight: normal;
    width: 17rem;
  }

  .message {
    z-index: 20;
    color: var(--red);
  }

  .drop-shadow {
    z-index: 10;
    margin: 0.2rem -0.25rem;
    color: transparent;
    -webkit-text-stroke: 1px var(--red);
  }

  .arrow-line {
    display: flex;
    align-items: center;
    margin-top: -8px;
    margin-bottom: 20px;
    width: 100%;
  }

  .arrow-left {
    transform: translateX(60%);
  }

  .arrow-right {
    transform: translateX(-60%);
  }

  .line {
    margin: 0 auto;
    width: 95%;
    height: 6px;
    background-color: white;
  }

  .traitor-title {
    font-family: "Bungee", serif;
    font-size: 1.6rem;
    color: var(--red);
    margin-top: 20px;
  }

  .traitors {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 10px;
  }

  .traitor-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .traitor-image {
    width: 100px;
    height: 100px;
  }

  .traitor-name {
    font-family: "Bungee", serif;
    font-size: 1rem;
    margin-top: 8px;
    color: var(--text-color);
  }
</style>
