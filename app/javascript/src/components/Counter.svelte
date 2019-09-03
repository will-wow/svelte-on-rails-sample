<script>
  import { store, initialize } from "./store"

  export let counter
  initialize(counter)

  $: doubled = $store * 2
  $: bigNumber = $store > 10
</script>

<style>
  .bigNumber {
    color: var(--red);
  }
</style>

<div class="jumbotron">
  <h1>Counter</h1>
  <div class:bigNumber>Counter: {$store}</div>
  <div>Doubled: {doubled}</div>
  <div>
    <button class="btn-xs" on:click={() => $store++}>Add 1</button>
  </div>
</div>
