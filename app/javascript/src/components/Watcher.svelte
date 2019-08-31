<script>
  import { store } from "./store";

  $: small = true
  $: medium = $store > 10;
  $: large = $store > 20;
</script>

<style>
  .small {
    font-size: 1rem;
  }

  .medium {
    font-size: 2rem;
  }

  .large {
    font-size: 3rem;
  }
</style>

<div>
  <div class="small" class:medium class:large>
    {#if large}
      <span>Large</span>
    {:else if medium}
      <span>Medium</span>
    {:else}
      <span>Small</span>
    {/if}
  </div>

</div>
