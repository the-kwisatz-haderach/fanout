import { defineConfig } from 'eslint/config'
import node from 'eslint-plugin-n'
import base from './base.js'

export default defineConfig(base, node.configs['flat/recommended-module'])
