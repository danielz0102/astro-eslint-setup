#!/usr/bin/env node
import { intro, outro } from '@clack/prompts'
import {
  askForInstallations,
  createConfigFile,
  installDependencies,
} from './App'

intro('Welcome to Astro ESLint Setup 🚀')
await askForInstallations()
await installDependencies()
await createConfigFile()
outro('🎉 ESLint setup completed successfully!')
