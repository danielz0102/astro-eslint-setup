#!/usr/bin/env node
import { intro, outro } from '@clack/prompts'
import {
  askForInstallations,
  askForPackageManager,
  createConfigFile,
  installDependencies,
} from './App'

intro('Welcome to Astro ESLint Setup 🚀')
await askForInstallations()
const packageManager = await askForPackageManager()
await installDependencies(packageManager)
await createConfigFile()
outro('🎉 ESLint setup completed successfully!')
