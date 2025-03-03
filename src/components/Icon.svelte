<script lang="ts">
  export let icon: string;
  export let size: number = 1;
  export let color: string = "initial";
</script>

<i
  class={`ti ti-${icon}`}
  style={`font-size: ${size}em; color: ${color};`}
  aria-hidden="true"
></i>
