import { cancel, confirm, isCancel, log, spinner, select } from '@clack/prompts'
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
const packageManagers = ['npm', 'pnpm', 'yarn', 'bun']

export async function askForInstallations() {
  log.step('The following dependencies will be installed')
  log.message(astroDependencies.map((dep) => `• ${dep}`).join('\n'))
  const result = await confirm({ message: 'Do you want to proceed?' })

  if (isCancel(result) || result === false) {
    cancel('🛑 Installation aborted')
    return process.exit(0)
  }
}

export async function askForPackageManager() {
  const result = await select({
    message: 'Which package manager would you like to use?',
    options: packageManagers.map(pm => ({ value: pm, label: pm })),
  })

  if (isCancel(result)) {
    cancel('🛑 Installation aborted')
    return process.exit(0)
  }

  return result
}

export async function installDependencies(packageManager: string) {
  const spin = spinner()
  spin.start('📦 Installing dependencies...')

  const command = (() => {
    switch (packageManager) {
      case 'npm':
        return 'npm i -D';
      case 'pnpm':
        return 'pnpm i -D';
      case 'yarn':
        return 'yarn add -D';
      case 'bun':
        return 'bun add -d';
      default:
        throw new Error(`Unknown package manager: ${packageManager}`);
    }
  })()

  await execAsync(`${command} ${astroDependencies.join(' ')}`, {
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
