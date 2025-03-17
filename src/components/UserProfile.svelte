<script lang="ts">
  import { profilePicture, randomSeed } from "../lib/user";
  import Icon from "./Icon.svelte";

  export let editable: boolean = false;

  const openEditor = () => {
    profilePicture.set(randomSeed());
  };
</script>

<button class:editable on:click={openEditor}>
  <img
    src="https://api.dicebear.com/9.x/pixel-art/svg?seed={$profilePicture}"
    alt="Choose your character."
  />

  {#if editable}
    <div class="edit">
      <Icon icon="rotate" size={1.5} />
    </div>
  {/if}
</button>

<style>
  button {
    position: relative;
    padding: 0.25em;
    outline: none;
    background: none;
    border: none;
  }

  .editable {
    cursor: pointer;
  }

  .editable .edit {
    cursor: pointer;
  }

  img {
    width: 120px;
    height: 128px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    border: 4px solid var(--gray);
  }

  .edit {
    position: absolute;
    bottom: 4px;
    right: 4px;
    background-color: var(--gray);
    color: black;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
