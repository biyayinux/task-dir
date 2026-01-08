<script setup lang="ts">
const { others, isLoading, fetchOthers } = useOthersAdmins()

const { fetchProfile } = useMeAdmin()

// Récupération des données au montage du composant
onMounted(() => {
  fetchProfile() // Charge tes infos (Me)
  fetchOthers() // Charge les photos des autres
})
</script>

<template>
  <div>
    <div class="space-y-4">
      <div class="flex -space-x-3">
        <ClientOnly>
          <template v-if="!isLoading">
            <img
              v-for="(admin, index) in others"
              :key="index"
              :src="admin.photo_profil || '/images/avatar.svg'"
              class="h-10 w-10 rounded-full object-cover ring-2 ring-white transition-transform hover:scale-110"
              alt="Profil"
            />
          </template>
          <template #fallback>
            <div class="flex -space-x-3">
              <div
                v-for="i in 3"
                :key="i"
                class="h-10 w-10 animate-pulse rounded-full bg-gray-100"
              ></div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
    <div class="mt-4">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
        doloribus porro quidem! Adipisci in harum pariatur fugit molestias
        similique eaque vitae cumque, optio animi iste ex labore eius aliquid
        quam.
      </p>
    </div>
  </div>
</template>
