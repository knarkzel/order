<script lang="ts">
  // Props
  const { orders } = $props();
</script>

<div class="custom grid gap-4">
  {#each orders as order}
    <article>
      <div class="flex gap-4 justify-between items-baseline custom mb-2">
        <h3>{order.name}</h3>
        <div class="flex gap-4 items-baseline">
          <a class="text-blue-500 hover:text-blue-600 decoration-inherit" href={`/ordre/endre/${order.id}`}>Endre</a>
          <a href={`/ordre/slett/${order.id}`}>Slett</a>
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
