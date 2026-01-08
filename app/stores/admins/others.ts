import { defineStore } from 'pinia'

export interface OtherAdmin {
  noms: string
  pseudo: string
  description?: string
  github?: string
  portefolio?: string
  photo_profil?: string
  poste?: string
  inscrit_le: string
}

export const useOthersAdminStore = defineStore('others_admins', () => {
  // Liste des autres administrateurs
  const others = ref<OtherAdmin[]>([])

  // Met à jour la liste avec toutes les infos
  const setOthers = (data: OtherAdmin[]) => {
    others.value = data
  }

  // Nettoyage du store
  const clearOthers = () => {
    others.value = []
  }

  return { others, setOthers, clearOthers }
})
