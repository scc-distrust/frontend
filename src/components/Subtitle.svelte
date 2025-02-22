<script lang="ts">
  export let size: string = "1em";
  export let subtitle: string = "Subtitle";
</script>

<div class="subtitle">
  <h1 style="--size: {size}">{subtitle}</h1>
</div>

<style>
  h1 {
    font-family: "Ubuntu Mono", serif;
    font-size: var(--size);
    text-align: left;
    margin-top: 5%;
    margin-bottom: 2%;
    /* margin-left: 5%; */
  }

  .subtitle{
    margin-left: 5%;
    margin-right: 5%;
    border-bottom: 1px solid var(--gray);
  }
</style>
