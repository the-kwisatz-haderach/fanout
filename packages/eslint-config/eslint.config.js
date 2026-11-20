import { defineConfig } from 'eslint/config'
import node from 'eslint-plugin-n'

export default defineConfig({
  plugins: { n: node },
  extends: ['@eslint-recommended/typescript', 'n/recommended-module'],
})
