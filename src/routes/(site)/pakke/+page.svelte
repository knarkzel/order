<script lang="ts">
  import { page } from "$app/stores";
  import { availableOrders } from "$lib/order";
  import { superForm } from "sveltekit-superforms";
  import Orders from "$lib/components/Orders.svelte";
  
  // Props
  const { data } = $props();
  const { bundles, orders } = $derived(data);
  const { form, errors, submitting, enhance } = superForm(data.form);

  // Check if any orders are taken
  const ordersNotTaken = $derived.by(() => availableOrders(bundles, orders));
  $inspect(ordersNotTaken);
</script>

<svelte:head>
  <title>Pakke - Kjøtt På Døra</title>
</svelte:head>

<h1>Pakke</h1>

{#if ordersNotTaken.length == 0}
  <p>
    Du har ingen ordre som kan legges til i en pakke. Hvis du skal lage en ny pakke, lag noen ordre først under <a href="/ordre">Ordre</a>.
  </p>
{:else}
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
{/if}

{#each bundles as bundle}
  <article>
    <div class="custom flex items-baseline justify-between gap-4 mb-4">
      <h2>{bundle.name}</h2>
      <div class="flex items-baseline gap-4">
        <a class="text-blue-500 decoration-inherit hover:text-blue-600" href={`/pakke/endre/${bundle.id}?from=${$page.url.pathname}`}>Endre</a>
        <a class="text-green-600 decoration-inherit hover:text-green-700" href={`/pakke/lag-kopi/${bundle.id}?from=${$page.url.pathname}`}>Lag kopi</a>
        <small class="rounded bg-slate-100 p-1">{bundle.created.split(" ")[0]}</small>
      </div>
    </div>
    <Orders orders={bundle.expand.orders} bundle_id={bundle.id} />
  </article>
{/each}
