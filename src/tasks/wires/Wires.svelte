<div class="container">
  <div class="container-1">
    <div class="box red"></div>
    <div class="box green"></div>
    <div class="box blue"></div>
    <div class="box purple"></div>
  </div>
  <div class="container-2">
    <div class="box red"></div>
    <div class="box green"></div>
    <div class="box blue"></div>
    <div class="box purple"></div>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }

  .container-1,
  .container-2 {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .box {
    width: 50px;
    height: 50px;
    border-radius: 8px;
  }

  .red {
    background-color: var(--red);
  }
  .green {
    background-color: var(--green);
  }
  .blue {
    background-color: var(--cyan);
  }
  .purple {
    background-color: var(--purple);
  }
</style>
