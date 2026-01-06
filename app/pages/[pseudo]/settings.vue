<script setup lang="ts">
const { me, isLoading, updateProfile, logout } = useEditAdmin()

// On crée une copie locale pour le formulaire pour éviter de modifier le store avant validation
const form = ref({ ...me.value })

// On s'assure que le formulaire est rempli si les données arrivent après le montage
watch(
  me,
  (newVal) => {
    if (newVal) form.value = { ...newVal }
  },
  { immediate: true }
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
            :placeholder="field"
          />
        </div>
      </div>
      <div class="space-y-4 pt-4 text-center">
        <UiButton
          @click="updateProfile(form)"
          :disabled="isLoading"
          class="w-full border py-2 text-sm disabled:opacity-30"
        >
          {{ isLoading ? 'En cours...' : 'Enregistrer' }}
        </UiButton>
        <button @click="logout">Se déconnecter</button>
      </div>
    </div>
    <div v-else class="py-20 text-center text-sm opacity-30">Chargement...</div>
  </main>
</template>
