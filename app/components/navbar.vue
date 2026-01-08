<script setup>
import { storeToRefs } from 'pinia'
import {
  Home,
  Users,
  User,
  Sun,
  Moon,
  ClipboardCheck,
  Menu,
  X
} from 'lucide-vue-next'

const meStore = useMeAdminStore()
const { me } = storeToRefs(meStore)

// État pour le menu mobile
const isMenuOpen = ref(false)

const colorMode = useColorMode()
const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="relative p-4">
    <div class="flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <ClipboardCheck class="h-6 w-6" />
        <span>TaskDir</span>
      </NuxtLink>
      <div class="flex items-center gap-4">
        <nav class="hidden gap-4 md:flex">
          <NuxtLink to="/" class="flex items-center gap-2">
            <Home :size="20" />
            <span>Accueil</span>
          </NuxtLink>
          <NuxtLink to="/admins" class="flex items-center gap-2">
            <Users :size="20" />
            <span>Administrateurs</span>
          </NuxtLink>
          <NuxtLink
            v-if="me"
            :to="`/${me.pseudo}`"
            class="flex items-center gap-2"
          >
            <User :size="20" />
            <span>Profil</span>
          </NuxtLink>
        </nav>
        <div v-if="me" class="flex items-center gap-2">
          <img
            :src="me.photo_profil || '/images/avatar.svg'"
            class="h-6 w-6 rounded-full shadow-sm"
          />
        </div>
        <NuxtLink v-else to="/login" class="text-sm hover:underline">
          Connexion...
        </NuxtLink>
        <ClientOnly>
          <button @click="toggleDark" type="button">
            <Sun v-if="colorMode.value === 'dark'" class="h-6 w-6" />
            <Moon v-else class="h-6 w-6" />
          </button>
        </ClientOnly>
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden">
          <Menu v-if="!isMenuOpen" class="h-7 w-7" />
          <X v-else class="h-7 w-7" />
        </button>
      </div>
    </div>
    <div
      v-if="isMenuOpen"
      class="absolute top-full left-0 z-50 flex w-full flex-col gap-4 bg-inherit p-4 md:hidden"
    >
      <NuxtLink
        to="/"
        @click="isMenuOpen = false"
        class="flex items-center gap-2"
      >
        <Home :size="20" />
        <span>Accueil</span>
      </NuxtLink>
      <NuxtLink
        to="/admins"
        @click="isMenuOpen = false"
        class="flex items-center gap-2"
      >
        <Users :size="20" />
        <span>Administrateurs</span>
      </NuxtLink>
      <NuxtLink
        v-if="me"
        :to="`/${me.pseudo}`"
        @click="isMenuOpen = false"
        class="flex items-center gap-2"
      >
        <User :size="20" />
        <span>Profil</span>
      </NuxtLink>
    </div>
  </header>
</template>
