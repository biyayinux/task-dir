import { defineStore } from 'pinia'

// On définit la structure de l'objet Admin
interface Admin {
  pseudo: string
  noms: string
  email: string
  photo_profil?: string // Le ? signifie que c'est optionnel
  poste?: string
}

export const useMeStore = defineStore('me', () => {
  // On précise que l'état peut être soit un Admin, soit null
  const me = ref<Admin | null>(null)

  // On type le paramètre 'data' avec notre interface Admin
  const setMe = (data: Admin) => {
    me.value = data
  }

  const clearMe = () => {
    me.value = null
  }

  return { me, setMe, clearMe }
})
