/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import "../src/foo"
import Counter from "../src/components/Counter.svelte"
import Watcher from "../src/components/Watcher.svelte"

const CLASS_ATTRIBUTE_NAME = "data-svelte-component"

function setup(registeredComponents) {
  const toMount = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}]`)

  console.log(toMount)

  for (let i = 0; i < toMount.length; i += 1) {
    const node = toMount[i]
    const className = node.getAttribute(CLASS_ATTRIBUTE_NAME)
    const Component = registeredComponents[className]

    console.log(Component, node)

    if (Component) {
      if (node.innerHTML.length === 0) {
        new Component({
          target: node,
          props: JSON.parse(node.dataset.svelteProps)
        })
      }
    } else {
      console.error(
        `webpacker-svelte: can not render a component that has not been registered: ${className}`
      )
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setup({ Counter, Watcher })
})
