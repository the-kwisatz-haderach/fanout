import node from '@fanout/eslint-config/node'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig(node, globalIgnores(['dist/**']))
