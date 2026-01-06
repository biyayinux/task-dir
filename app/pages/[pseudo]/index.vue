<script setup lang="ts">
const { me, fetchProfile, logout } = useMe()

// Récupération des données au montage du composant
onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <div class="flex min-h-[80vh] flex-col items-center justify-center p-4">
    <div
      v-if="me"
      class="w-full max-w-md space-y-6 rounded-2xl border p-8 shadow-lg dark:bg-gray-900"
    >
      <div class="flex flex-col items-center space-y-4">
        <NuxtLink :to="`/${me.pseudo}`">
          <UiAvatar
            :src="me.photo_profil || '/images/avatar.svg'"
            class="border-primary/10 h-24 w-24 border-4 transition-transform hover:scale-105"
          />
        </NuxtLink>
        <div class="text-center">
          <h1 class="text-2xl font-bold">{{ me.noms }}</h1>
          <NuxtLink :to="`/${me.pseudo}`" class="text-primary hover:underline">
            @{{ me.pseudo }}
          </NuxtLink>
        </div>
        <div class="w-full space-y-3 border-t pt-4 text-sm opacity-80">
          <div class="flex justify-between">
            <span class="font-medium">Email:</span>
            <span>{{ me.email }}</span>
          </div>
          <div v-if="me.poste" class="flex justify-between">
            <span class="font-medium">Poste:</span>
            <span>{{ me.poste }}</span>
          </div>
        </div>
        <div class="flex w-full flex-col gap-3 pt-4">
          <NuxtLink :to="`/${me.pseudo}/settings`" class="w-full">
            <UiButton variant="outline" class="w-full justify-center">
              Modifier le profil
            </UiButton>
          </NuxtLink>
          <UiButton
            @click="logout"
            variant="destructive"
            class="w-full justify-center border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
          >
            Se déconnecter
          </UiButton>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center gap-4">
      <div
        class="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
      ></div>
      <p class="animate-pulse opacity-70">Synchronisation de votre profil...</p>
    </div>
  </div>
</template>
