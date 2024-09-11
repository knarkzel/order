<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  
  // Props
  const { data } = $props();
  const { orders } = $derived(data);
  const { form, errors, submitting, enhance } = superForm(data.form);
</script>

<svelte:head>
  <title>Endre pakke - Kjøtt På Døra</title>
</svelte:head>

<h1>Endre pakke</h1>

<form method="POST" use:enhance>
  <label for="name">
    Navn:
    <input name="name" bind:value={$form.name} aria-invalid={$errors.name ? true : undefined} />
    {#if $errors.name}<small>{$errors.name}</small>{/if}
  </label>

  <fieldset>
    <legend>Ordre:</legend>
    {#each orders as order}
      <label>
        <input type="checkbox" name="orders" value={order.id} bind:group={$form.orders} aria-invalid={$errors.orders ? true : undefined} />
        {order.name}
      </label>
    {/each}
    {#if $errors.orders}<small>{$errors.orders._errors[0]}</small>{/if}
  </fieldset>

  <button type="submit" aria-busy={$submitting} disabled={$submitting}>Oppdater pakke</button>
</form>
