<script lang="ts">
  import { superForm } from "sveltekit-superforms";

  // Props
  const { data } = $props();
  const { orders } = $derived(data);
  const { form, errors, submitting, enhance } = superForm(data.form);
</script>

<h1>Bestilling</h1>
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

  <button type="submit" aria-busy={$submitting} disabled={$submitting}>Lag bestilling</button>
</form>

<div class="grid gap-4">
  {#each orders as order}
	<article>
      <h3>{order.name}</h3>
      <ul>
        {#each order.items as item}
	      <li>{item}</li>
        {/each}
      </ul>
    </article>
  {/each}
</div>
