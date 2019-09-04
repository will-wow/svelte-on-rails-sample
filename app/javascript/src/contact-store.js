import { writable } from "svelte/store"
import axios from "axios"

export const contactStore = writable([])

export const createContact = async contact => {
  const { data: createdContact } = await axios.post("/api/contacts", {
    contact
  })
  contactStore.update(contacts => [...contacts, createdContact])
}

export const saveContact = contact => {
  axios.put(`/api/contacts/${contact.id}`, { contact })
}

export const deleteContact = contact => {
  contactStore.update(contacts =>
    contacts.filter(({ id }) => id !== contact.id)
  )
  return axios.delete(`/api/contacts/${contact.id}`)
}
