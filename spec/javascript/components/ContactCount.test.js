import { render } from "@testing-library/svelte"
import { readable } from "svelte/store"

import ContactCount from "components/ContactCount.svelte"

function mockStore(value) {
  return readable(value, () => {})
}

jest.mock("contact-store", () => {
  return {
    contactCountStore: mockStore(3)
  }
})

describe("ContactCount", () => {
  it("renders a count from props", () => {
    const component = render(ContactCount, {
      props: {
        message: "All",
        count: 2
      }
    })

    expect(component.container).toHaveTextContent("All: 2")
  })

  it("renders a count from the store", () => {
    const component = render(ContactCount, {
      props: {
        message: "All"
      }
    })

    expect(component.container).toHaveTextContent("All: 3")
  })
})
