<script>
  import axios from "axios"

  export let contact

  const handleSave = () => {
    axios.post(`/api/contacts/${contact.id}`, contact)
  }

  const handleDelete = () => {
    axios.post(`/api/contacts/${contact.id}`, contact)
  }
</script>

<form class="tr">
  <span class="td">
    <a href="/contacts/{contact.id}">{contact.id}</a>
  </span>
  <span class="td">
    <input name="name" bind:value={contact.name} % />
  </span>
  <span class="td">
    <input name="email" bind:value={contact.email} % />
  </span>
  <span class="td">
    <input name="twitter" bind:value={contact.twitter} % />
  </span>
  <span class="td">
    <input name="phone" bind:value={contact.phone} % />
  </span>
  <span class="td">
    <button type="button" class="btn btn-primary btn-xs" on:click={handleSave}>
      Save
    </button>
    <button type="button" class="btn btn-danger btn-xs" on:click={handleDelete}>
      Destroy
    </button>
  </span>
</form>
