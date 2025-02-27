<script lang="ts">
  export let size: string = "0.5em";
  export let task: string = "Task Name";
</script>

<div class="task">
  <p style="--size: {size}">{task}</p>
</div>

<style>
  p {
    font-family: "Ubuntu Mono", serif;
    font-size: var(--size);
    text-align: left;
    /* margin-left: 5%; */
  }

  .task {
    margin-left: 12%;
    position: relative;
    margin-bottom: -0.5rem;
  }

  .task::before {
    content: "•";
    font-size: 1.5rem;
    font-weight: bold;
    position: absolute;
    left: -1.5rem;
    
  }
</style>
