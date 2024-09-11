<script lang="ts">
  // Props
  const { children } = $props();
</script>

<header class="mb-4 bg-slate-50 py-4 dark:bg-slate-800">
  <div class="mx-auto max-w-screen-lg px-4">
    <div class="flex items-center justify-between flex-wrap">
      <a href="/">
        <enhanced:img alt="Logo" src="/static/logo.png?w=96" />
      </a>

      <div class="custom flex items-center gap-4">
        <a href="/ordre">Ordre</a>
        <a href="/pakke">Pakke</a>
        <a href="/faktura">Faktura</a>
        <a href="/logout" role="button" data-sveltekit-reload>Logg ut</a>
      </div>
    </div>
  </div>
</header>

<main class="mx-auto max-w-screen-lg px-4 pb-32">
  {@render children()}
</main>
