<script setup lang="ts">
const { others, isLoading, fetchOthers } = useOthersAdmins()

onMounted(() => {
  fetchOthers()
})
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 font-bold">Liste des Administrateurs</h1>
    <ClientOnly>
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="flex items-center gap-4 opacity-20">
          <div class="h-12 w-12 rounded-full bg-gray-400" />
          <div class="h-4 w-24 bg-gray-400" />
        </div>
      </div>
      <div v-else-if="others && others.length > 0" class="space-y-4">
        <NuxtLink
          v-for="admin in others"
          :key="admin.pseudo"
          :to="`/admins/${admin.pseudo}`"
          class="flex items-center gap-4 border-b pb-4 last:border-0"
        >
          <img
            :src="admin.photo_profil || '/images/avatar.svg'"
            class="h-12 w-12 rounded-full border object-cover"
          />
          <div class="flex flex-col">
            <span class="text-sm font-bold">@{{ admin.pseudo }}</span>
            <span
              v-if="admin.description"
              class="max-w-xs truncate text-xs opacity-60"
            >
              {{ admin.description }}
            </span>
          </div>
        </NuxtLink>
      </div>
      <p v-else class="italic opacity-50">Aucun admin trouvé.</p>
      <template #fallback>
        <div>Chargement...</div>
      </template>
    </ClientOnly>
  </div>
</template>
