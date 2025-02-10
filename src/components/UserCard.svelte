<script lang="ts">
  export let username: string = "Username";
  export let image: string =
    "https://cdn.vectorstock.com/i/preview-2x/31/01/pixel-art-character-vector-28943101.webp";
  export let borderColor: string = "var(--card-purple-border)";
  export let backgroundColor: string = "var(--card-purple-bg)";
</script>

<div
  class="user-card"
  style="border-left-color: {borderColor}; background-color: {backgroundColor};"
>
  {#if image}
    <img src={image} alt={username} class="character-image" />
  {:else}
    <div class="user-image placeholder">No Image</div>
  {/if}
  <p class="username">{username}</p>
</div>

<style>
  .user-card {
    margin: 3% 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    /* padding: 5px; */
    border-radius: 10px;
    background-color: var(--gray);
    width: auto;
    text-align: center;
    border-left: 10px solid;
  }

  .character-image {
    margin-left: 1%;
    width: 60px;
    height: 60px;
    mix-blend-mode: multiply;
  }

  .username {
    font-family: "Ubuntu Mono", serif;
    font-size: 2.2rem;
    color: var(--font-color);
    margin: 0%;
  }
</style>
