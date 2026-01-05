<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const admin = ref(null)
const isLoading = ref(false)

// Charger les données actuelles
const loadData = async () => {
  const token = localStorage.getItem('auth_token')
  if (!token) return navigateTo('/login')

  try {
    const res = await fetch(`${config.public.backendUrl}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.ok) {
      admin.value = await res.json()
    } else {
      await navigateTo('/login')
    }
  } catch (e) {
    console.error('Erreur de chargement')
  }
}

// Sauvegarder les modifications
const updateProfile = async () => {
  const token = localStorage.getItem('auth_token')
  isLoading.value = true

  try {
    const response = await fetch(`${config.public.backendUrl}/admin/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(admin.value)
    })

    if (response.ok) {
      const data = await response.json()
      alert('Profil mis à jour !')
      // Redirection vers la page profil (avec le nouveau pseudo si changé)
      await navigateTo(`/${data.admin.pseudo}`)
    } else {
      const err = await response.json()
      alert(err.message || 'Erreur lors de la mise à jour')
    }
  } catch (error) {
    console.error(error)
    alert('Une erreur est survenue.')
  } finally {
    isLoading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center p-4">
    <div
      v-if="admin"
      class="w-full max-w-md space-y-6 rounded-xl border bg-white p-6 shadow-sm"
    >
      <UiTitle>Réglages du profil</UiTitle>
      <div class="space-y-4">
        <div>
          <label class="text-xs font-bold text-gray-500 uppercase"
            >Nom Complet</label
          >
          <input
            v-model="admin.noms"
            type="text"
            class="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label class="text-xs font-bold text-gray-500 uppercase"
            >Pseudo</label
          >
          <input
            v-model="admin.pseudo"
            type="text"
            class="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label class="text-xs font-bold text-gray-500 uppercase">Poste</label>
          <select
            v-model="admin.poste"
            class="w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="CEO">CEO</option>
            <option value="CTO">CTO</option>
            <option value="Développeur">Développeur</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-bold text-gray-500 uppercase"
            >GitHub</label
          >
          <input
            v-model="admin.github"
            type="text"
            placeholder="https://github.com/..."
            class="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div class="flex gap-2 pt-4">
          <UiButton
            @click="updateProfile"
            :disabled="isLoading"
            class="flex-1 justify-center bg-black text-white"
          >
            {{ isLoading ? 'Enregistrement...' : 'Sauvegarder' }}
          </UiButton>
          <button
            @click="navigateTo(`/${route.params.pseudo}`)"
            class="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center gap-2">
      <div
        class="h-8 w-8 animate-spin rounded-full border-b-2 border-black"
      ></div>
      <p class="text-gray-400">Chargement des réglages...</p>
    </div>
  </div>
</template>
