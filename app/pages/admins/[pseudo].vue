<script setup lang="ts">
const route = useRoute()
const pseudoParam = route.params.pseudo
const othersStore = useOthersAdminStore()

// Récupère l'admin dans le store
const admin = computed(() =>
  othersStore.others.find((a) => a.pseudo === pseudoParam)
)

// Recharge si le store est vide
onMounted(() => {
  if (othersStore.others.length === 0) {
    const { fetchOthers } = useOthersAdmins()
    fetchOthers()
  }
})
</script>

<template>
  <main class="mx-auto max-w-xl p-6">
    <div v-if="admin" class="space-y-6">
      <section class="text-center">
        <img
          :src="admin.photo_profil || '/images/avatar.svg'"
          class="mx-auto h-24 w-24 rounded-full border object-cover"
        />
        <h1 class="mt-4 text-2xl font-bold">{{ admin.noms }}</h1>
        <p class="text-sm">
          @{{ admin.pseudo }}
          <span v-if="admin.poste">• {{ admin.poste }}</span>
        </p>
      </section>
      <p v-if="admin.description" class="text-center italic opacity-70">
        "{{ admin.description }}"
      </p>
      <section
        class="grid grid-cols-1 gap-4 border-t pt-6 text-sm sm:grid-cols-2"
      >
        <div v-if="admin.github" class="flex flex-col">
          <span class="font-bold">GitHub</span>
          <a :href="admin.github" target="_blank" class="italic underline"
            >Lien</a
          >
        </div>
        <div v-if="admin.portefolio" class="flex flex-col">
          <span class="font-bold">Portfolio</span>
          <a :href="admin.portefolio" target="_blank" class="italic underline"
            >Site</a
          >
        </div>
        <div class="flex flex-col">
          <span class="font-bold">Membre depuis</span>
          <span>{{ new Date(admin.inscrit_le).toLocaleDateString() }}</span>
        </div>
      </section>
    </div>
    <div v-else class="py-10 text-center opacity-50">Chargement...</div>
  </main>
</template>
