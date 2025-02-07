<script lang="ts">
  import Button from "../components/Button.svelte";
  import Title from "../components/Title.svelte";
</script>

<div class="main-container">
  <Title size="6rem" />
  <img
    class="img"
    src="https://cdn.vectorstock.com/i/preview-2x/31/01/pixel-art-character-vector-28943101.webp"
    alt="Choose your character."
  />
  <div class="login-form">
    <div class="input-container">
      <!-- <img
        src="https://e7.pngegg.com/pngimages/205/544/png-clipart-wifi-symbol-wi-fi-alliance-logo-internet-wifi-modem-icon-miscellaneous-text.png"
        alt="User Icon"
        class="input-icon"
      /> -->
      <input type="text" placeholder="Username" class="input-field" />
    </div>
    <div class="input-container">
      <!-- <img
        src="https://e7.pngegg.com/pngimages/205/544/png-clipart-wifi-symbol-wi-fi-alliance-logo-internet-wifi-modem-icon-miscellaneous-text.png"
        alt="User Icon"
        class="input-icon"
      /> -->
      <input
        type="text"
        placeholder="Server Address(local host)"
        class="input-field"
      />
    </div>
  </div>
  <div class="button-container">
    <Button text="Connect" type="primary" />
    <Button text="How to play" type="default" />
  </div>
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 400px;
    margin: auto;
  }

  .input-container {
    width: 100%;
  }

  .input-field {
    width: 100%;
    padding: 15px;
    font-size: 1rem;
    border: 1px solid var(--gray);
    border-radius: 8px;
    background-color: var(--gray);
    outline: none;
  }

  .input-field::placeholder {
    font-family: "Inria Sans", serif;
    color: #676767;
  }

  .img {
    width: 200px;
    height: 200px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    border: 2px solid grey;
  }

  .login-form {
    /* display: flex; */
    flex-direction: column;
    margin-top: 10%;
    width: 100%;
    max-width: 300px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }

  .input-container {
    display: flex;
    margin: 10px;
    height: 45px;
    align-self: center;
    border-radius: 8px;
  }

  .button-container {
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    /* min-height: 100vh; */
    justify-content: center;
    margin-bottom: 0.5rem;
    bottom: 10px;
    
  }
</style>
