<script>
  import axios from "axios"

  export let contact
  export let onSave
  export let onDelete

  const inputClass = "form-control"

</script>

<style>
  td {
    vertical-align: middle;
  }

  .actions {
    white-space: nowrap;
  }
</style>

<tr>
  <td>
    {#if contact.id}
      <a href="/contacts/{contact.id}">{contact.id}</a>
    {/if}
  </td>
  <td>
    <input
      class="form-control"
      type="text"
      name="name"
      bind:value={contact.name} />
  </td>
  <td>
    <input class="form-control" name="email" bind:value={contact.email} />
  </td>
  <td>
    <input class="form-control" name="twitter" bind:value={contact.twitter} />
  </td>
  <td>
    <input class="form-control" name="phone" bind:value={contact.phone} />
  </td>
  <td class="actions">
    <button type="button" class="btn btn-primary btn-xs" on:click={onSave}>
      Save
    </button>
    <button type="button" class="btn btn-danger btn-xs" on:click={onDelete}>
      Destroy
    </button>
  </td>
</tr>
