<script lang="ts">
  export let icon: string;
  export let size: number = 1;
</script>

<i class={`ti ti-${icon}`} style={`font-size: ${size}em`} aria-hidden="true"
></i>
