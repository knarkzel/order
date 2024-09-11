<script lang="ts">
  import { page } from "$app/stores";

  // Props
  const { orders, bundle_id } = $props();
</script>

<div class="custom grid gap-4">
  {#each orders as order}
    <article>
      <div class="custom mb-2 flex items-baseline justify-between gap-4">
        <h3>{order.name}</h3>
        <div class="flex items-baseline gap-4">
          <a href={`/ordre/slett/${order.id}?from=${$page.url.pathname}`}>Slett</a>
          <a class="text-blue-500 decoration-inherit hover:text-blue-600" href={`/ordre/endre/${order.id}?from=${$page.url.pathname}`}
            >Endre</a
                    >
          {#if bundle_id}
            <a class="text-green-600 decoration-inherit hover:text-green-700" href={`/ordre/lag-kopi/${order.id}?bundle_id=${bundle_id}&from=${$page.url.pathname}`}>Lag kopi</a>
          {/if}
          <small class="rounded bg-slate-100 p-1">{order.created.split(" ")[0]}</small>
        </div>
      </div>
      <ul class="mb-0">
        {#each order.items as item}
          <li>{item}</li>
        {/each}
      </ul>
    </article>
  {/each}
</div>
