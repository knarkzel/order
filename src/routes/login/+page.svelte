<script lang="ts">
  import { superForm } from "sveltekit-superforms";

  // Props
  let { data } = $props();
  const { form, errors, submitting, enhance } = superForm(data.form);
</script>

<svelte:head>
  <title>Login - Kjøtt På Døra</title>
</svelte:head>

<div class="flex h-screen items-center justify-center">
  <div class="max-w-sm flex-grow">
    <h1>Login</h1>

    <form method="POST" use:enhance>
      <label for="email">
        Email:
        <input name="email" type="email" bind:value={$form.email} aria-invalid={$errors.email ? true : undefined} />
        {#if $errors.email}<small>{$errors.email}</small>{/if}
      </label>

      <label for="password">
        Password:
        <input name="password" type="password" bind:value={$form.password} aria-invalid={$errors.password ? true : undefined} />
        {#if $errors.password}<small>{$errors.password}</small>{/if}
      </label>

      <button type="submit" aria-busy={$submitting} disabled={$submitting}>Login</button>
    </form>

    <p class="text-center">
      Don't have an account? <a href="/register">Register</a>
    </p>
  </div>
</div>
