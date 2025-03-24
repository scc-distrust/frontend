<script lang="ts">
  import Title from "../components/Title.svelte";
  import Icon from "../components/Icon.svelte";

  import trophy from "../assets/imgs/trophy.png";

  export let message: string = "VICTORY!";
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
  <div class="trophy">
    <div class="shine"></div>
    <img class="trophy-icon" src={trophy} alt="Trophy icon" />
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
    height: 2rem;
  }

  .message,
  .drop-shadow {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    font-family: "Bungee", serif;
    font-size: 4rem;
    font-weight: normal;
  }

  .message {
    z-index: 20;
    color: var(--yellow);
  }

  .drop-shadow {
    z-index: 10;
    margin: 0.3rem -0.25rem;
    color: transparent;
    -webkit-text-stroke: 1px var(--yellow);
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

  .trophy {
    position: relative;
  }

  .shine,
  .trophy-icon {
    margin-top: 4rem;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  .shine {
    z-index: 10;
    height: 15rem;
    width: 15rem;
    background: transparent;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(0, 0, 0, 0) 60%
    );
  }

  .trophy-icon {
    z-index: 20;
    width: 160px;
    height: 160px;
  }
</style>
