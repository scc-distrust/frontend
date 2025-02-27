<script>
  import Title from "./Title.svelte";
  import Subtitle from "./Subtitle.svelte";
</script>

<div class="main-content">
  <div class="holder">
    <hr />
  </div>

  <!-- <Title size="3rem" /> -->
  <Subtitle size="1.76rem" subtitle="How to play" />
  <div class="instruction">
    <p>
      Distrust is a game heavily inspired on Among Us and Mafia. Connect to the
      server using the server address given by the host, once all users are in
      the waiting room the host can start the game.
    </p>
    <p>
      The game starts with one or two traitors, with the rest of the users being
      workers, the role of the worker is to complete tasks and suspect who might
      be the traitor. If the workers vote the traitor out during a meeting, they
      win the game. Alongside that, if all tasks are completed, the workers also
      win.
    </p>
    <p>
      The role of the traitor is to act like a worker, pretending to be
      completing tasks while secretly eliminating others in the app when you get
      nearby. If there is an equal (or less than) amount of workers to traitors,
      they win.
    </p>
  </div>
</div>

<style>
  .instruction {
    /* background-color: var(--background-100); */
    font-family: "Ubuntu Mono", serif;
    font-size: 1.2rem;
    margin-left: 5%;
    margin-right: 5%;
    text-align: left;
    text-indent: 2rem;
  }
  .main-content {
    background-color: var(--background-100);
    width: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0;
    z-index: 100;
  }

  .holder {
    width: 30%;
    margin: 0 auto;
  }

  hr {
    border: 2px solid #fff;
    border-radius: 10px;
  }
</style>
