<template>
  <div class="p-6 text-center">
    <div v-if="admin" class="space-y-4">
      <h1 class="text-2xl font-bold">Bienvenue chez MKDIR</h1>
      <div class="flex flex-col items-center gap-2">
        <img
          :src="admin.photos[0].value"
          class="h-20 w-20 rounded-full border shadow"
        />
        <p class="text-lg font-semibold">{{ admin.displayName }}</p>
        <p class="text-gray-600">{{ admin.emails[0].value }}</p>
      </div>
      <a
        :href="`${config.public.backendUrl}/logout`"
        class="mt-4 block text-red-500 underline"
      >
        Se déconnecter
      </a>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const admin = ref(null)

onMounted(async () => {
  document.title = 'Système interne MKDIR'

  try {
    const response = await fetch(`${config.public.backendUrl}/auth/admin`, {
      credentials: 'include'
    })

    if (response.ok) {
      admin.value = await response.json()
    } else {
      // Si le backend répond 401 (non autorisé), on dégage vers login
      await navigateTo('/login')
    }
  } catch (error) {
    await navigateTo('/login')
  }
})
</script>
