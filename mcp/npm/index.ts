import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(command: string): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync(command, { timeout: 120000 })
    return stdout + stderr
  } catch (error: any) {
    return error.stdout + error.stderr || error.message
  }
}

export default createMCPServer({
  name: 'npm',
  version: '1.0.0',
  description: 'npm/yarn/pnpm package management tools for Node.js projects',
  icon: '📦',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Development', 'Package Management', 'Build Tools'],
    rating: 'beginner',
    features: ['npm install', 'yarn/pnpm support', 'scripts', 'audit', 'publish']
  })

  .addTool({
    name: 'npm_install',
    description: 'Install npm dependencies',
    parameters: {
      packages: { type: 'string', description: 'Package names (space separated), leave empty for install all' },
      saveDev: { type: 'boolean', description: 'Install as dev dependency' },
      saveExact: { type: 'boolean', description: 'Install exact version' },
      global: { type: 'boolean', description: 'Install globally' },
      force: { type: 'boolean', description: 'Force install' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const saveDev = params.saveDev ? '-D' : ''
      const saveExact = params.saveExact ? '-E' : ''
      const global = params.global ? '-g' : ''
      const force = params.force ? '-f' : ''
      const packages = params.packages || ''
      const options = { cwd: params.cwd || process.cwd() }
      const result = await safeExec(`npm install ${global} ${saveDev} ${saveExact} ${force} ${packages} 2>&1`)
      return {
        packages: packages || 'all dependencies',
        options: { saveDev: params.saveDev, global: params.global },
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_uninstall',
    description: 'Uninstall npm packages',
    parameters: {
      packages: { type: 'string', description: 'Package names (space separated)' },
      global: { type: 'boolean', description: 'Uninstall globally' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const global = params.global ? '-g' : ''
      const result = await safeExec(`npm uninstall ${global} ${params.packages} 2>&1`)
      return {
        packages: params.packages,
        global: params.global,
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_update',
    description: 'Update npm packages',
    parameters: {
      packages: { type: 'string', description: 'Package names (space separated), leave empty for update all' },
      global: { type: 'boolean', description: 'Update globally' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const global = params.global ? '-g' : ''
      const packages = params.packages || ''
      const result = await safeExec(`npm update ${global} ${packages} 2>&1`)
      return {
        packages: packages || 'all',
        global: params.global,
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_list',
    description: 'List installed npm packages',
    parameters: {
      global: { type: 'boolean', description: 'List global packages' },
      depth: { type: 'number', description: 'Dependency tree depth' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const global = params.global ? '-g' : ''
      const depth = params.depth !== undefined ? `--depth=${params.depth}` : '--depth=0'
      const result = await safeExec(`npm list ${global} ${depth} 2>&1`)
      return {
        global: params.global,
        depth: params.depth || 0,
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_run',
    description: 'Run npm script from package.json',
    parameters: {
      script: { type: 'string', description: 'Script name to run' },
      args: { type: 'string', description: 'Additional arguments' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const args = params.args || ''
      const options = { cwd: params.cwd || process.cwd() }
      const result = await safeExec(`npm run ${params.script} ${args} 2>&1`)
      return {
        script: params.script,
        args: params.args,
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_init',
    description: 'Initialize new npm project',
    parameters: {
      yes: { type: 'boolean', description: 'Use default values' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const yes = params.yes ? '-y' : ''
      const options = { cwd: params.cwd || process.cwd() }
      const result = await safeExec(`npm init ${yes} 2>&1`)
      return {
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_view',
    description: 'View package information from npm registry',
    parameters: {
      package: { type: 'string', description: 'Package name' },
      field: { type: 'string', description: 'Specific field to view (e.g., version, dependencies)' },
      json: { type: 'boolean', description: 'Output as JSON' }
    },
    execute: async (params: any) => {
      const field = params.field ? ` ${params.field}` : ''
      const json = params.json ? ' --json' : ''
      const result = await safeExec(`npm view ${params.package}${field}${json} 2>&1`)
      return {
        package: params.package,
        field: params.field,
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_outdated',
    description: 'Check for outdated packages',
    parameters: {
      global: { type: 'boolean', description: 'Check global packages' },
      json: { type: 'boolean', description: 'Output as JSON' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const global = params.global ? '-g' : ''
      const json = params.json ? ' --json' : ''
      const result = await safeExec(`npm outdated ${global}${json} 2>&1`)
      return {
        global: params.global,
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_audit',
    description: 'Run security audit',
    parameters: {
      fix: { type: 'boolean', description: 'Try to fix vulnerabilities automatically' },
      json: { type: 'boolean', description: 'Output as JSON' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const fix = params.fix ? ' fix' : ''
      const json = params.json ? ' --json' : ''
      const result = await safeExec(`npm audit${fix}${json} 2>&1`)
      return {
        fix: params.fix,
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_version',
    description: 'Bump package version',
    parameters: {
      version: { type: 'string', description: 'New version or type: major, minor, patch, etc.' },
      noGit: { type: 'boolean', description: 'Do not create git commit/tag' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const noGit = params.noGit ? ' --no-git-tag-version' : ''
      const result = await safeExec(`npm version ${params.version}${noGit} 2>&1`)
      return {
        version: params.version,
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_publish',
    description: 'Publish package to npm registry',
    parameters: {
      access: { type: 'string', description: 'Access level: public, restricted' },
      tag: { type: 'string', description: 'Publish with given tag' },
      dryRun: { type: 'boolean', description: 'Do everything except publish' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const access = params.access ? ` --access ${params.access}` : ''
      const tag = params.tag ? ` --tag ${params.tag}` : ''
      const dryRun = params.dryRun ? ' --dry-run' : ''
      const result = await safeExec(`npm publish${access}${tag}${dryRun} 2>&1`)
      return {
        output: result
      }
    }
  })

  .addTool({
    name: 'yarn_install',
    description: 'Install dependencies using yarn',
    parameters: {
      packages: { type: 'string', description: 'Package names (space separated)' },
      dev: { type: 'boolean', description: 'Install as dev dependency' },
      exact: { type: 'boolean', description: 'Install exact version' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const dev = params.dev ? '-D' : ''
      const exact = params.exact ? '-E' : ''
      const packages = params.packages || ''
      const result = await safeExec(`yarn add ${dev} ${exact} ${packages} 2>&1`)
      return {
        packages: packages || 'all dependencies',
        output: result
      }
    }
  })

  .addTool({
    name: 'pnpm_install',
    description: 'Install dependencies using pnpm',
    parameters: {
      packages: { type: 'string', description: 'Package names (space separated)' },
      saveDev: { type: 'boolean', description: 'Install as dev dependency' },
      global: { type: 'boolean', description: 'Install globally' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const saveDev = params.saveDev ? '-D' : ''
      const global = params.global ? '-g' : ''
      const packages = params.packages || ''
      const cmd = packages ? `pnpm add ${global} ${saveDev} ${packages}` : 'pnpm install'
      const result = await safeExec(`${cmd} 2>&1`)
      return {
        packages: packages || 'all dependencies',
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_clean',
    description: 'Clean node_modules and lock files',
    parameters: {
      removeLock: { type: 'boolean', description: 'Remove package-lock.json/yarn.lock/pnpm-lock.yaml' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const cwd = params.cwd || process.cwd()
      let cmds = ['rm -rf node_modules']
      if (params.removeLock) {
        cmds.push('rm -f package-lock.json yarn.lock pnpm-lock.yaml')
      }
      const result = await safeExec(cmds.join(' && '))
      return {
        removed: ['node_modules', params.removeLock ? 'lock files' : ''].filter(Boolean),
        output: result
      }
    }
  })

  .addTool({
    name: 'npm_why',
    description: 'Explain why a package is installed',
    parameters: {
      package: { type: 'string', description: 'Package name' },
      cwd: { type: 'string', description: 'Working directory' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`npm explain ${params.package} 2>&1`)
      return {
        package: params.package,
        output: result
      }
    }
  })


