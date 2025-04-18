<script lang="ts">
  export let icon: string;
  export let size: number = 1;
  export let color: string = "unset";
</script>

<i
  class={`ti ti-${icon}`}
  style={`font-size: ${size}em; color: ${color}; stroke-width: 10;`}
  aria-hidden="true"
></i>
