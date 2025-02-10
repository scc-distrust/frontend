<script lang="ts">
  import type { ButtonStyle } from "../lib/buttons";

  export let text: string;
  export let fullWidth: boolean = true;
  export let type: ButtonStyle = "primary";
</script>

<button
  class={type}
  style="width: {fullWidth ? '-webkit-fill-available' : 'auto'}">{text}</button
>

<style>
  button {
    outline: none;
    border: none;
    background-color: #fff;
    color: #fff;
    padding: 0.75rem 1rem;
    margin: 0.5rem 0;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
    font-family: "Ubuntu Mono", serif;
    font-size: 1.2rem;
    /* max-width: 50%; */
  }

  button:hover {
    filter: brightness(0.8);
  }

  button:active {
    scale: 0.95;
  }

  button.primary {
    background-color: var(--purple);
  }

  button.danger {
    background-color: var(--red);
  }

  button.default {
    background-color: var(--gray);
    color: #000000;
  }
</style>
