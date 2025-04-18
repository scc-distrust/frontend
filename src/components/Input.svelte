<script lang="ts">
  export let id: string;
  export let value: string = "";
</script>

<div class="input-container">
  {#if value.trim() === ""}
    <label for={id}><slot /></label>
  {/if}

  <input {id} type="text" bind:value />
</div>

<style>
  .input-container {
    position: relative;
    width: 100%;
    display: flex;
    align-self: center;
    border-radius: 8px;
    padding: 2rem 0;
  }

  .input-container > * {
    position: absolute;
  }

  .input-container:has(input[value=""]) > label,
  .input-container:has(input:focus) > label {
    display: none;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid var(--gray);
    border-radius: 8px;
    background-color: var(--gray);
    outline: none;
    z-index: 1;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25em;
    font-family: "Inria Sans", serif;
    color: #676767;
    padding: 0.75rem 1rem;
    z-index: 2;
    user-select: none;
  }
</style>
