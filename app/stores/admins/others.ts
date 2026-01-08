import { defineStore } from 'pinia'

// Structure d'un autre admin
export interface OtherAdmin {
  photo_profil: string
}

export const useOthersAdminStore = defineStore('others_admins', () => {
  const others = ref<OtherAdmin[]>([])

  // Met à jour la liste
  const setOthers = (data: OtherAdmin[]) => {
    others.value = data
  }

  // Réinitialise la liste
  const clearOthers = () => {
    others.value = []
  }

  return { others, setOthers, clearOthers }
})
