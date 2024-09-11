<script lang="ts">
  import { availableOrders } from "$lib/order";
  import { superForm } from "sveltekit-superforms";
  import Orders from "$lib/components/Orders.svelte";

  // Props
  const { data } = $props();
  const { orders, bundles } = $derived(data);
  const { form, errors, submitting, enhance } = superForm(data.form);

  // Check if any orders are taken
  const ordersNotTaken = $derived.by(() => availableOrders(bundles, orders));
</script>

<svelte:head>
  <title>Ordre - Kjøtt På Døra</title>
</svelte:head>

<h1>Ordre</h1>

<form method="POST" use:enhance>
  <label for="name">
    Navn:
    <input name="name" bind:value={$form.name} aria-invalid={$errors.name ? true : undefined} />
    {#if $errors.name}<small>{$errors.name}</small>{/if}
  </label>

  <label for="content">
    Innhold:
    <textarea name="content" rows="4" bind:value={$form.content} aria-invalid={$errors.content ? true : undefined}></textarea>
    {#if $errors.content}<small>{$errors.content}</small>{/if}
  </label>

  <button type="submit" aria-busy={$submitting} disabled={$submitting}>Lag ordre</button>
</form>

<Orders orders={ordersNotTaken} />
