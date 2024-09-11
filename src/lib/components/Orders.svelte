<script lang="ts">
  // Props
  const { orders } = $props();
</script>

<div class="grid md:grid-cols-2 gap-4 custom">
  {#each orders as order}
    <article>
      <h3>{order.name}</h3>
      <ul class="mb-0">
        {#each order.items as item}
          <li>{item}</li>
        {/each}
      </ul>
    </article>
  {/each}
</div>
