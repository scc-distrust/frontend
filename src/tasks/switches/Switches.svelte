<script lang="ts">
  import Switch from "./Switch.svelte";
</script>

<div>
  <Switch color="red" />
  <Switch color="green" />
  <Switch color="blue" />
  <Switch color="purple" />
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 90%;
    width: 90%;
    margin: auto;
  }
</style>
