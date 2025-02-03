<script lang="ts">
  import Button from "../components/Button.svelte";
  import Title from "../components/Title.svelte";

  let number = 1;

  function incrementNumber() {
    number++;
  }
</script>

<Title size="4rem" />
<Button text="hello world" type="primary" />
<Button text="hello world" type="default" fullWidth={false} />
<Button text="hello world" type="danger" />
<button on:click={incrementNumber}>Click Me: {number}</button>

<style>
  button {
    padding: 1rem;
  }
</style>
