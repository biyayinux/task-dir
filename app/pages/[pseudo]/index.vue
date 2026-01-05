<script setup>
const config = useRuntimeConfig()
const admin = ref(null)

const fetchProfile = async () => {
  const token = localStorage.getItem('auth_token')
  if (!token) return navigateTo('/login')

  try {
    const response = await fetch(`${config.public.backendUrl}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.ok) {
      admin.value = await response.json()
    } else {
      // Si le token est invalide ou expiré
      localStorage.removeItem('auth_token')
      await navigateTo('/login')
    }
  } catch (error) {
    console.error('Erreur :', error)
    await navigateTo('/login')
  }
}

onMounted(fetchProfile)
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center p-4">
    <div
      v-if="admin"
      class="w-full max-w-md space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div class="flex flex-col items-center space-y-4">
        <UiTitle>Profil de {{ admin.pseudo }}</UiTitle>
        <UiAvatar :src="admin.photo_profil || '/images/avatar.svg'" />
        <div class="text-center">
          <h2 class="mt-2">{{ admin.noms }}</h2>
          <UiParagraph class="mt-2">{{ admin.pseudo }}</UiParagraph>
          <UiParagraph class="py-2">{{ admin.email }}</UiParagraph>
          <UiParagraph v-if="admin.poste">
            {{ admin.poste }}
          </UiParagraph>
        </div>
        <div class="flex w-full flex-col gap-2 pt-4">
          <NuxtLink :to="`/${admin.pseudo}/settings`" class="w-full">
            <UiButton class="w-full justify-center">
              Paramètres du profil
            </UiButton>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="text-center text-xs text-gray-400 hover:underline"
          >
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center gap-2">
      <UiParagraph class="animate-pulse text-gray-400"
        >Chargement du profil...</UiParagraph
      >
    </div>
  </div>
</template>
