<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import Orders from "$lib/components/Orders.svelte";
  
  // Props
  const { data } = $props();
  const { bundles, orders } = $derived(data);
  const { form, errors, submitting, enhance } = superForm(data.form);
</script>

<svelte:head>
  <title>Pakke - Kjøtt På Døra</title>
</svelte:head>

<h1>Pakke</h1>

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
        <input type="checkbox" name="orders" value={order.id} bind:group={$form.orders} />
        {order.name}
      </label>
    {/each}
    {#if $errors.orders}<small>{$errors.orders}</small>{/if}
  </fieldset>

  <button type="submit" aria-busy={$submitting} disabled={$submitting}>Lag pakke</button>
</form>

{#each bundles as bundle}
  <article>
    <h2>{bundle.name}</h2>
    <Orders orders={bundle.expand.orders} />
  </article>
{/each}
