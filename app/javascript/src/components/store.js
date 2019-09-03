import { writable } from "svelte/store"

console.log("store setup")

const DEFAULT_COUNT = 0

export const store = writable(DEFAULT_COUNT)

export const initialize = count => {
  if (count === DEFAULT_COUNT) {
    store.set(count)
  }
}
