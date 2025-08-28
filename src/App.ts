import { cancel, confirm, isCancel, log, spinner } from '@clack/prompts'
import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execAsync = promisify(exec)
const userDirectory = process.cwd()
const astroDependencies = [
  'eslint',
  '@eslint/js',
  'eslint-plugin-astro',
  'eslint-plugin-jsx-a11y',
  'typescript-eslint',
]

export async function askForInstallations() {
  log.step('The following dependencies will be installed')
  log.message(astroDependencies.map((dep) => `• ${dep}`).join('\n'))
  const result = await confirm({ message: 'Do you want to proceed?' })

  if (isCancel(result) || result === false) {
    cancel('🛑 Installation aborted')
    return process.exit(0)
  }
}

export async function installDependencies() {
  const spin = spinner()
  spin.start('📦 Installing dependencies...')

  await execAsync(`pnpm install -D ${astroDependencies.join(' ')}`, {
    cwd: userDirectory,
  })

  spin.stop('✅ Dependencies installed')
}

export async function createConfigFile() {
  const spin = spinner()
  spin.start('📦 Creating ESLint config file...')

  const moduleDir = path.dirname(fileURLToPath(import.meta.url))
  await fs.copyFile(
    path.join(moduleDir, 'astro-config.mjs'),
    path.join(userDirectory, 'eslint.config.mjs')
  )

  spin.stop('✅ ESLint config file created')
}
