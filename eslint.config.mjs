// npm install -D vite-plugin-eslint2
// Import de la configuration ESLint générée par Nuxt
import withNuxt from './.nuxt/eslint.config.mjs'

// Export de la configuration ESLint personnalisée
export default withNuxt({
  rules: {
    // Autorise les noms de composants Vue en un seul mot
    'vue/multi-word-component-names': 'off',

    // Affiche un avertissement lors de l'utilisation de console.log
    'no-console': 'warn',
  },
})
