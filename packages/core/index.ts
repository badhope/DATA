export * from './mcp/types'
export * from './mcp/builder'
export * from './mcp/registry'
export { loadSkillFromDirectory } from './loader'
export { SkillRegistry } from './registry'

import { globalMCPRegistry } from './mcp/registry'

const MCP_MODULES = {
  agent: () => import('../../mcp/agent/index'),
  aliyun: () => import('../../mcp/aliyun/index'),
  aws: () => import('../../mcp/aws/index'),
  bitbucket: () => import('../../mcp/bitbucket/index'),
  cloudflare: () => import('../../mcp/cloudflare/index'),
  'code-generator': () => import('../../mcp/code-generator/index'),
  'code-review': () => import('../../mcp/code-review/index'),
  'coding-workflow': () => import('../../mcp/coding-workflow/index'),
  database: () => import('../../mcp/database/index'),
  'debugging-workflow': () => import('../../mcp/debugging-workflow/index'),
  'dependency-analyzer': () => import('../../mcp/dependency-analyzer/index'),
  docker: () => import('../../mcp/docker/index'),
  documentation: () => import('../../mcp/documentation/index'),
  filesystem: () => import('../../mcp/filesystem/index'),
  git: () => import('../../mcp/git/index'),
  gitee: () => import('../../mcp/gitee/index'),
  github: () => import('../../mcp/github/index'),
  gitlab: () => import('../../mcp/gitlab/index'),
  images: () => import('../../mcp/images/index'),
  jira: () => import('../../mcp/jira/index'),
  kubernetes: () => import('../../mcp/kubernetes/index'),
  llm: () => import('../../mcp/llm/index'),
  memory: () => import('../../mcp/memory/index'),
  mongodb: () => import('../../mcp/mongodb/index'),
  npm: () => import('../../mcp/npm/index'),
  openai: () => import('../../mcp/openai/index'),
  pdf: () => import('../../mcp/pdf/index'),
  'performance-optimizer': () => import('../../mcp/performance-optimizer/index'),
  powerpoint: () => import('../../mcp/powerpoint/index'),
  prompt: () => import('../../mcp/prompt/index'),
  puppeteer: () => import('../../mcp/puppeteer/index'),
  react: () => import('../../mcp/react/index'),
  redis: () => import('../../mcp/redis/index'),
  'refactoring-workflow': () => import('../../mcp/refactoring-workflow/index'),
  search: () => import('../../mcp/search/index'),
  'security-auditor': () => import('../../mcp/security-auditor/index'),
  sentry: () => import('../../mcp/sentry/index'),
  spreadsheet: () => import('../../mcp/spreadsheet/index'),
  ssh: () => import('../../mcp/ssh/index'),
  terminal: () => import('../../mcp/terminal/index'),
  'test-generator': () => import('../../mcp/test-generator/index'),
  typescript: () => import('../../mcp/typescript/index'),
  vector: () => import('../../mcp/vector/index'),
  vercel: () => import('../../mcp/vercel/index'),
  word: () => import('../../mcp/word/index')
}

export async function registerAllMCP(
  filter?: (name: string) => boolean
): Promise<{ registered: string[]; failed: string[] }> {
  const registered: string[] = []
  const failed: string[] = []

  for (const [name, loader] of Object.entries(MCP_MODULES)) {
    if (filter && !filter(name)) continue
    
    try {
      const module = await loader()
      let serverOrBuilder = module.default || module
      
      if ('build' in serverOrBuilder && typeof serverOrBuilder.build === 'function') {
        serverOrBuilder = serverOrBuilder.build()
      }
      
      const server = serverOrBuilder as any
      
      if (server && server.config) {
        globalMCPRegistry.register(name, server)
        registered.push(name)
      }
    } catch (e) {
      failed.push(name)
    }
  }

  return { registered, failed }
}

export async function registerMCP(name: keyof typeof MCP_MODULES): Promise<boolean> {
  const loader = MCP_MODULES[name]
  if (!loader) return false
  
  try {
    const module = await loader()
    let serverOrBuilder = module.default || module
    
    if ('build' in serverOrBuilder && typeof serverOrBuilder.build === 'function') {
      serverOrBuilder = serverOrBuilder.build()
    }
    
    const server = serverOrBuilder as any
    
    if (server && server.config) {
      globalMCPRegistry.register(name, server)
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

export { globalMCPRegistry }

export function listInstalledMCP() {
  return globalMCPRegistry.listServers()
}

export function listAllTools() {
  return globalMCPRegistry.listAllTools()
}

export function listAllPrompts() {
  return globalMCPRegistry.listAllPrompts()
}

export function getAvailableMCPCount(): number {
  return Object.keys(MCP_MODULES).length
}
