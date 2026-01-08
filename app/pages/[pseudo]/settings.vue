<script setup lang="ts">
const { me, isLoading, updateProfile, logout, fetchProfile } = useEditAdmin()

// Formulaire local
const form = ref({ ...me.value })

// On force TanStack Query à vérifier s'il y a des changements sur le serveur
onMounted(() => {
  fetchProfile()
})

// Ce watch mettra à jour le formulaire si TanStack Query
watch(
  me,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal }
    }
  },
  { deep: true }
)
</script>

<template>
  <main class="mx-auto max-w-xl p-6">
    <div v-if="me" class="space-y-6">
      <h1 class="text-center text-xl font-bold">Réglages</h1>
      <div class="grid gap-6">
        <div
          v-for="field in [
            'noms',
            'pseudo',
            'email',
            'description',
            'github',
            'portefolio',
            'photo_profil'
          ]"
          :key="field"
        >
          <label class="block text-[10px] font-bold uppercase opacity-50">{{
            field
          }}</label>
          <input
            v-model="(form as any)[field]"
            type="text"
            class="w-full border-b bg-transparent py-1 outline-none"
          />
        </div>
      </div>
      <div class="space-y-4 pt-4 text-center">
        <UiButton :disabled="isLoading" @click="updateProfile(form)">
          {{ isLoading ? 'En cours...' : 'Enregistrer' }}
        </UiButton>
        <button @click="logout">Se déconnecter</button>
      </div>
    </div>
  </main>
</template>
