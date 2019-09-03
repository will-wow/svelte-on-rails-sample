<script>
  import { store } from "./store"

  export let counter

  $: doubled = counter * 2
  $: bigNumber = counter > 10

  $: store.set(counter)
</script>

<style>
  .bigNumber {
    color: var(--red);
  }
</style>

<div class="jumbotron">
  <h1>Foo</h1>
  <div class:bigNumber>Counter: {counter}</div>
  <div>Doubled: {doubled}</div>
  <div>
    <button class="btn-xs" on:click={() => counter++}>Add 1</button>
  </div>
</div>
