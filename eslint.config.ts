import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    // Configuration des environnements
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },

  // Règles recommandées pour TS et Vue
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser }
    },
    rules: {
      // Désactive le nommage multi-mots obligatoire
      'vue/multi-word-component-names': 'off',
      // Laisse TypeScript gérer les variables non définies
      'no-undef': 'off',
      // Autorise l'auto-fermeture des balises HTML (ex: <img />)
      'vue/html-self-closing': [
        'warn',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ]
    }
  }
])
