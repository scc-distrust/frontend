<script lang="ts">
  import type { Color } from "../lib/user";

  export let reportname: string = "Report Name";
  export let status: string = "Dead Player!";
  // export let image: string =
  //   "https://cdn.vectorstock.com/i/preview-2x/31/01/pixel-art-character-vector-28943101.webp";
  export let color: Color;
</script>

<div
  class="report-card"
  style="border-left-color: var(--{color}-border); background-color: var(--{color}-bg);"
>
  <div class="report-info">
    <div class="name-container">
      <span class="icon">💀</span>
      <p class="username">{reportname}</p>
    </div>
    <p class="status">{status}</p>
  </div>
  <button class="report-btn">Report</button>
</div>

<style>
  .report-card {
    margin: 3% 5%;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--purple-bg);
    border-left: 10px solid var(--purple-border);
    border-radius: 10px;
    padding: 10px 15px;
    width: auto;
    font-family: "Ubuntu Mono", sans-serif;
  }

  .report-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .icon {
    font-size: 1.5rem;
  }

  .username {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0%;
    color: var(--font-color);
    font-family: "Ubuntu Mono", serif;
  }
  .name-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status {
    font-size: 1.5rem;
    color: var(--font-color);
    margin: 0%;
  }

  .report-btn {
    background-color: var(--red);
    color: var(--white);
    border: none;
    font-family: "Ubuntu Mono", serif;
    padding: 10px 36px;
    font-size: 1.2rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .report-btn:hover {
    background-color: var(--grey);
  }
</style>
