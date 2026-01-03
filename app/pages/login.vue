<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="p-4 py-8 text-center text-2xl font-bold">
      Connexion Administrateur
    </h1>
    <a
      :href="`${config.public.backendUrl}/auth/google`"
      class="flex items-center gap-3 rounded-lg border px-6 py-2 transition hover:bg-gray-50"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        width="20"
      />
      Continuer avec Google
    </a>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

onMounted(async () => {
  try {
    const response = await fetch(`${config.public.backendUrl}/auth/admin`, {
      credentials: 'include'
    })
    if (response.ok) {
      await navigateTo('/')
    }
  } catch (e) {
    // Reste sur login
  }
})
</script>
