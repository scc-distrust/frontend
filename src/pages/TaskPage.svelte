<script lang="ts">
  import Title from "../components/Title.svelte";

  export let description =
    "Move each handle to the outlined box to complete this task.";
</script>

<Title size="3rem" />

<div class="task-box">
  <slot />
</div>

<div class="instructions">
  <h2>Instructions</h2>
  <hr />

  <p>{description}</p>
</div>

<style>
  .task-box {
    width: 80%;
    height: 40%;
    margin: 0 auto;
    background-color: var(--background-100);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .instructions {
    margin: 5rem 3rem;
    margin-bottom: 0;
  }

  h2 {
    font-size: 3em;
    margin: 0;
    font-family: "Ubuntu Mono", "serif";
  }

  hr {
    margin: 0;
    border: none;
    border-top: 1px solid #999;
  }

  p {
    font-family: "Ubuntu Mono", "serif";
    font-size: 2em;
    letter-spacing: 0.1em;
    word-spacing: 0.3em;
  }
</style>
