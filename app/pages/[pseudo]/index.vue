<script setup lang="ts">
// Utilisation du composable pour récupérer l'admin connecté
const { me, fetchProfile } = useMe()

onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <main class="mx-auto max-w-2xl p-6">
    <div v-if="me" class="space-y-8">
      <section class="flex flex-col items-center gap-4 text-center">
        <UiAvatar
          :src="me.photo_profil || '/images/avatar.svg'"
          class="h-32 w-32 rounded-full border"
        />
        <div>
          <h1 class="text-3xl font-bold">{{ me.noms }}</h1>
          <p class="text-primary">@{{ me.pseudo }} • {{ me.poste }}</p>
        </div>
      </section>
      <section v-if="me.description" class="text-center italic opacity-80">
        "{{ me.description }}"
      </section>
      <section class="grid grid-cols-1 gap-4 pt-6 text-sm sm:grid-cols-2">
        <div class="flex flex-col">
          <span class="font-semibold">Email</span>
          <span>{{ me.email }}</span>
        </div>
        <div v-if="me.github" class="flex flex-col">
          <span class="font-semibold">GitHub</span>
          <a :href="me.github" target="_blank" class="underline">Lien GitHub</a>
        </div>
        <div v-if="me.portefolio" class="flex flex-col">
          <span class="font-semibold">Portfolio</span>
          <a :href="me.portefolio" target="_blank" class="underline"
            >Voir le site</a
          >
        </div>
        <div class="flex flex-col">
          <span class="font-semibold">Membre depuis</span>
          <span>{{ new Date(me.inscrit_le).toLocaleDateString() }}</span>
        </div>
      </section>
      <footer class="flex flex-col gap-3 pt-6">
        <NuxtLink :to="`/${me.pseudo}/settings`" class="w-full">
          <UiButton variant="outline" class="w-full"
            >Modifier le profil</UiButton
          >
        </NuxtLink>
      </footer>
    </div>
    <div v-else class="py-20 text-center opacity-50">
      Chargement du profil...
    </div>
  </main>
</template>
