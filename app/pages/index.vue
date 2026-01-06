<script setup>
import { storeToRefs } from 'pinia'

const meStore = useMeStore()
const { me } = storeToRefs(meStore) // Garde la réactivité
const config = useRuntimeConfig()

// Fonction de récupération des données
const fetchProfile = async () => {
  // On ne touche pas au localStorage sur le serveur
  if (import.meta.server) return

  const token = localStorage.getItem('auth_token')
  if (!token) return navigateTo('/login')

  try {
    const data = await $fetch(`${config.public.backendUrl}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // On nourrit le store Pinia (le Header se mettra à jour tout seul)
    meStore.setMe(data)
  } catch (error) {
    console.error('Erreur de session:', error)
    logout() // Déconnexion si le token est invalide
  }
}

// Fonction de déconnexion
const logout = async () => {
  meStore.clearMe()
  if (import.meta.client) {
    localStorage.removeItem('auth_token')
  }
  await navigateTo('/login')
}

onMounted(fetchProfile)
</script>

<template>
  <div class="flex min-h-[80vh] flex-col items-center justify-center p-4">
    <div
      v-if="me"
      class="w-full max-w-md space-y-6 rounded-2xl border bg-white p-8 shadow-lg"
    >
      <div class="flex flex-col items-center space-y-4">
        <NuxtLink :to="`/${me.pseudo}`">
          <UiAvatar
            :src="me.photo_profil || '/images/avatar.svg'"
            class="border-primary/10 h-24 w-24 border-4 transition-transform hover:scale-105"
          />
        </NuxtLink>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900">{{ me.noms }}</h1>
          <NuxtLink :to="`/${me.pseudo}`" class="text-primary hover:underline">
            @{{ me.pseudo }}
          </NuxtLink>
        </div>
        <div class="w-full space-y-3 border-t pt-4 text-sm text-gray-600">
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
            class="w-full justify-center border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
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
      <p class="animate-pulse text-gray-500">
        Synchronisation de votre profil...
      </p>
    </div>
  </div>
</template>
