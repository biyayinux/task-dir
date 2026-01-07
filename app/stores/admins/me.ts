import { defineStore } from 'pinia'

// On définit la structure de l'objet Me
interface Me {
  id: number
  noms: string
  pseudo: string
  description?: string
  email: string
  github?: string
  portefolio?: string
  photo_profil?: string // Le ? signifie que c'est optionnel
  poste?: string
  inscrit_le: string
}

export const useMeAdminStore = defineStore('me_admin', () => {
  // On précise que l'état peut être soit un Me, soit null
  const me = ref<Me | null>(null)

  // On type le paramètre 'data' avec notre interface Me
  const setMeAdmin = (data: Me) => {
    me.value = data
  }

  const clearMeAdmin = () => {
    me.value = null
  }

  return { me, setMeAdmin, clearMeAdmin }
})
