import withNuxt from './.nuxt/eslint.config.mjs'
import tailwind from 'eslint-plugin-tailwindcss'

export default withNuxt(
  // Config Tailwind recommandée
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      // Tri des classes Tailwind
      'tailwindcss/classnames-order': 'warn',
      // Autorise les classes personnalisées
      'tailwindcss/no-custom-classname': 'off',

      // Autorise composants Vue 1 mot
      'vue/multi-word-component-names': 'off',
      // Avertissement console.log
      'no-console': 'warn',
    },
    settings: {
      tailwindcss: {
        // Pas besoin de config spécifique en v4
        config: undefined,
      },
    },
  },
)
