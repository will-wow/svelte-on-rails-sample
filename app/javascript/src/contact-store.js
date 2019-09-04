import { writable, derived } from "svelte/store"
import axios from "axios"

export const contactStore = writable([])

export const contactCount = derived(contactStore, contacts => contacts.length)

export const createContact = async contact => {
  const { data: createdContact } = await axios.post("/api/contacts", {
    contact
  })
  contactStore.update(contacts => [...contacts, createdContact])
}

export const saveContact = async contact => {
  updateContact(contact.id, { saving: true })

  await axios.put(`/api/contacts/${contact.id}`, { contact })

  updateContact(contact.id, { saving: false })
}

export const deleteContact = contact => {
  contactStore.update(contacts =>
    contacts.filter(({ id }) => id !== contact.id)
  )
  return axios.delete(`/api/contacts/${contact.id}`)
}

const updateContact = (contactId, data) => {
  contactStore.update(contacts =>
    contacts.map(contact => {
      if (contact.id === contactId) {
        return Object.assign({}, contact, data)
      }
      return contact
    })
  )
}
