<script lang="ts">
  import SecondButton from "./components/SecondButton.svelte";

  let number = 1;

  function incrementNumber() {
    number++;
  }
</script>

<button on:click={incrementNumber}>Click Me: {number}</button>
<SecondButton />

<style>
  button {
    padding: 1rem;
  }
</style>