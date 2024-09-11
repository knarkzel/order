<script lang="ts">
  import { superForm } from "sveltekit-superforms";

  // Props
  const { data } = $props();
  const { form, errors, submitting, enhance } = superForm(data.form);
</script>

<svelte:head>
  <title>Faktura - Kjøtt På Døra</title>
</svelte:head>

<h1>Faktura</h1>
<p>Last opp tidligere bestillinger fra leverandører for å få enkel oversikt over priser.</p>

<form method="POST" enctype="multipart/form-data" use:enhance>
  <label for="invoice">
    Bestilling:
    <input name="invoice" type="file" accept="application/pdf" bind:value={$form.invoice} aria-invalid={$errors.invoice ? true : undefined} />
    {#if $errors.invoice}<small>{$errors.invoice}</small>{/if}
  </label>

  <button type="submit" aria-busy={$submitting} disabled={$submitting}>Legg til faktura</button>
</form>
