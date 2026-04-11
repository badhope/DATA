import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as crypto from 'crypto'

const execAsync = promisify(exec)

async function safeExec(cmd: string, cwd?: string): Promise<string> {
  try {
    const { stdout } = await execAsync(cmd, { timeout: 120000, cwd })
    return stdout.trim()
  } catch (e: any) {
    return e.stdout || e.stderr || e.message
  }
}

interface CodeChunk {
  id: string
  filePath: string
  type: 'function' | 'class' | 'interface' | 'type' | 'constant' | 'module'
  name: string
  startLine: number
  endLine: number
  content: string
  signature: string
  imports: string[]
  exports: string[]
  calls: string[]
  calledBy: string[]
  dependencies: string[]
  dependents: string[]
  embedding?: number[]
  hash: string
  lastModified: number
}

interface RAGIndex {
  version: string
  projectRoot: string
  lastIndexed: number
  chunks: Map<string, CodeChunk>
  fileHashMap: Map<string, string>
  callGraph: Map<string, string[]>
  reverseCallGraph: Map<string, string[]>
}

const RAG_STORAGE_DIR = path.join(process.cwd(), '.trae', 'code-rag')

async function initRAGStorage() {
  await fs.mkdir(RAG_STORAGE_DIR, { recursive: true })
}

function generateChunkId(filePath: string, name: string, type: string): string {
  return crypto.createHash('md5').update(`${filePath}:${type}:${name}`).digest('hex').substring(0, 16)
}

function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex')
}

async function loadIndex(): Promise<RAGIndex> {
  const indexPath = path.join(RAG_STORAGE_DIR, 'index.json')
  try {
    const data = await fs.readFile(indexPath, 'utf-8')
    const parsed = JSON.parse(data)
    return {
      ...parsed,
      chunks: new Map(Object.entries(parsed.chunks || {})),
      fileHashMap: new Map(Object.entries(parsed.fileHashMap || {})),
      callGraph: new Map(Object.entries(parsed.callGraph || {})),
      reverseCallGraph: new Map(Object.entries(parsed.reverseCallGraph || {}))
    }
  } catch {
    return {
      version: '1.0.0',
      projectRoot: process.cwd(),
      lastIndexed: 0,
      chunks: new Map(),
      fileHashMap: new Map(),
      callGraph: new Map(),
      reverseCallGraph: new Map()
    }
  }
}

async function saveIndex(index: RAGIndex) {
  const indexPath = path.join(RAG_STORAGE_DIR, 'index.json')
  await fs.writeFile(indexPath, JSON.stringify({
    ...index,
    chunks: Object.fromEntries(index.chunks),
    fileHashMap: Object.fromEntries(index.fileHashMap),
    callGraph: Object.fromEntries(index.callGraph),
    reverseCallGraph: Object.fromEntries(index.reverseCallGraph)
  }, null, 2))
}

async function getTypeScriptFiles(root: string): Promise<string[]> {
  const cmd = `npx ts-node -e "
const fg = require('fast-glob');
const files = fg.sync(['**/*.{ts,tsx,js,jsx}'], {
  cwd: '${root.replace(/\\/g, '/')}',
  ignore: ['node_modules/**', 'dist/**', 'build/**', '**/*.d.ts'],
  absolute: true
});
console.log(files.join('\\n'));
" 2>&1 || find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | grep -v node_modules | grep -v dist`
  
  const result = await safeExec(cmd)
  return result.split('\n').filter(Boolean).slice(0, 500)
}

async function extractSymbols(filePath: string, content: string): Promise<CodeChunk[]> {
  const chunks: CodeChunk[] = []
  const lines = content.split('\n')
  
  const patterns = [
    { regex: /^(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\(/gm, type: 'function' as const },
    { regex: /^(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/gm, type: 'function' as const },
    { regex: /^(?:export\s+)?class\s+(\w+)/gm, type: 'class' as const },
    { regex: /^(?:export\s+)?interface\s+(\w+)/gm, type: 'interface' as const },
    { regex: /^(?:export\s+)?type\s+(\w+)\s*=/gm, type: 'type' as const },
    { regex: /^(?:export\s+)?const\s+(\w+)\s*:/gm, type: 'constant' as const }
  ]

  for (const { regex, type } of patterns) {
    let match
    while ((match = regex.exec(content)) !== null) {
      const name = match[1]
      const startLine = content.substring(0, match.index).split('\n').length
      
      let endLine = startLine
      let braceCount = 0
      let foundBrace = false
      for (let i = startLine - 1; i < lines.length; i++) {
        const line = lines[i]
        if (line.includes('{')) {
          braceCount += (line.match(/\{/g) || []).length
          foundBrace = true
        }
        if (line.includes('}')) {
          braceCount -= (line.match(/\}/g) || []).length
        }
        if (foundBrace && braceCount === 0) {
          endLine = i + 1
          break
        }
      }
      
      const chunkContent = lines.slice(startLine - 1, endLine).join('\n')
      const calls: string[] = []
      const callRegex = /(\w+)\s*\(/g
      let callMatch
      while ((callMatch = callRegex.exec(chunkContent)) !== null) {
        if (!['if', 'for', 'while', 'switch', 'try', 'catch'].includes(callMatch[1])) {
          calls.push(callMatch[1])
        }
      }

      chunks.push({
        id: generateChunkId(filePath, name, type),
        filePath,
        type,
        name,
        startLine,
        endLine,
        content: chunkContent,
        signature: lines[startLine - 1]?.trim() || name,
        imports: [],
        exports: [],
        calls: [...new Set(calls)],
        calledBy: [],
        dependencies: [],
        dependents: [],
        hash: hashContent(chunkContent),
        lastModified: Date.now()
      })
    }
  }

  return chunks
}

function buildCallGraph(index: RAGIndex) {
  const nameToId = new Map<string, string[]>()
  for (const [id, chunk] of index.chunks) {
    const existing = nameToId.get(chunk.name) || []
    existing.push(id)
    nameToId.set(chunk.name, existing)
  }

  for (const [callerId, caller] of index.chunks) {
    for (const calleeName of caller.calls) {
      const calleeIds = nameToId.get(calleeName) || []
      for (const calleeId of calleeIds) {
        if (calleeId !== callerId) {
          const existing = index.callGraph.get(callerId) || []
          if (!existing.includes(calleeId)) existing.push(calleeId)
          index.callGraph.set(callerId, existing)

          const reverse = index.reverseCallGraph.get(calleeId) || []
          if (!reverse.includes(callerId)) reverse.push(callerId)
          index.reverseCallGraph.set(calleeId, reverse)
        }
      }
    }
  }
}

function searchChunks(index: RAGIndex, query: string, limit: number = 10): CodeChunk[] {
  const queryLower = query.toLowerCase()
  const scored: { chunk: CodeChunk, score: number }[] = []

  for (const [_, chunk] of index.chunks) {
    let score = 0
    const contentLower = chunk.content.toLowerCase()
    const nameLower = chunk.name.toLowerCase()

    if (nameLower.includes(queryLower)) score += 50
    if (nameLower === queryLower) score += 100
    if (contentLower.includes(queryLower)) score += 10
    score += (chunk.calledBy.length + chunk.calls.length) * 2
    if (chunk.type === 'function') score += 5
    if (chunk.type === 'class') score += 8

    scored.push({ chunk, score })
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.chunk)
}

function getImpactChain(index: RAGIndex, chunkId: string, maxDepth: number = 3): string[] {
  const visited = new Set<string>()
  const queue: { id: string, depth: number }[] = [{ id: chunkId, depth: 0 }]

  while (queue.length > 0) {
    const { id, depth } = queue.shift()!
    if (visited.has(id) || depth > maxDepth) continue
    visited.add(id)

    const dependents = index.reverseCallGraph.get(id) || []
    for (const dep of dependents) {
      queue.push({ id: dep, depth: depth + 1 })
    }
  }

  return Array.from(visited)
}

export default createMCPServer({
  name: 'code-rag',
  version: '1.0.0',
  description: '代码语义RAG - 智能代码索引、调用链分析、跨文件依赖追踪、架构理解',
  icon: '🧠',
  author: 'Trae Professional'
})
  .forTrae({
    categories: ['Code Analysis', 'Architecture', 'Developer Tools'],
    rating: 'advanced',
    features: ['增量代码索引', '调用链图谱', '依赖追踪', '语义搜索', '影响分析', '架构生成']
  })
  .withCache(300)

  .addTool({
    name: 'rag_index_build',
    description: '构建代码索引 - 扫描整个项目、提取符号、构建调用图',
    parameters: {
      rootDir: { type: 'string', description: '项目根目录，默认当前目录' },
      incremental: { type: 'boolean', description: '增量索引，只处理变更文件' },
      maxFiles: { type: 'number', description: '最大索引文件数，默认500' }
    },
    execute: async (params: any) => {
      await initRAGStorage()
      const index = await loadIndex()
      const rootDir = params.rootDir || process.cwd()
      const incremental = params.incremental !== false

      const startTime = Date.now()
      const files = await getTypeScriptFiles(rootDir)
      const filesToProcess = files.slice(0, params.maxFiles || 500)

      let newChunks = 0
      let updatedChunks = 0
      let skippedChunks = 0

      for (const file of filesToProcess) {
        try {
          const stats = await fs.stat(file)
          const fileHash = `${stats.mtimeMs}-${stats.size}`
          
          if (incremental && index.fileHashMap.get(file) === fileHash) {
            skippedChunks++
            continue
          }

          const content = await fs.readFile(file, 'utf-8')
          const chunks = await extractSymbols(file, content)
          
          for (const chunk of chunks) {
            const existing = index.chunks.get(chunk.id)
            if (!existing) {
              newChunks++
            } else if (existing.hash !== chunk.hash) {
              updatedChunks++
            } else {
              skippedChunks++
              continue
            }
            index.chunks.set(chunk.id, chunk)
          }

          index.fileHashMap.set(file, fileHash)
        } catch (e) {}
      }

      buildCallGraph(index)
      index.lastIndexed = Date.now()
      await saveIndex(index)

      return {
        success: true,
        projectRoot: rootDir,
        durationMs: Date.now() - startTime,
        totalFiles: filesToProcess.length,
        totalSymbols: index.chunks.size,
        newChunks,
        updatedChunks,
        skippedChunks,
        functions: Array.from(index.chunks.values()).filter(c => c.type === 'function').length,
        classes: Array.from(index.chunks.values()).filter(c => c.type === 'class').length,
        callGraphEdges: Array.from(index.callGraph.values()).reduce((a, b) => a + b.length, 0),
        message: `✨ 索引构建完成！共 ${index.chunks.size} 个代码符号`
      }
    }
  })

  .addTool({
    name: 'rag_search',
    description: '语义代码搜索 - 按功能、名称、类型搜索代码符号',
    parameters: {
      query: { type: 'string', description: '搜索关键词，如：函数名、功能描述等', required: true },
      type: { type: 'string', description: '过滤类型: function, class, interface, type, constant' },
      filePath: { type: 'string', description: '限定文件路径包含' },
      limit: { type: 'number', description: '返回结果数量，默认10' },
      includeCallers: { type: 'boolean', description: '包含调用者信息' },
      includeCallees: { type: 'boolean', description: '包含被调用者信息' }
    },
    execute: async (params: any) => {
      const index = await loadIndex()
      const limit = params.limit || 10

      if (index.chunks.size === 0) {
        return { success: false, error: '索引为空，请先运行 rag_index_build' }
      }

      let results = searchChunks(index, params.query, limit * 2)

      if (params.type) {
        results = results.filter(r => r.type === params.type)
      }
      if (params.filePath) {
        results = results.filter(r => r.filePath.includes(params.filePath))
      }

      results = results.slice(0, limit)

      const enriched = results.map(chunk => {
        const result: any = {
          id: chunk.id,
          name: chunk.name,
          type: chunk.type,
          filePath: path.relative(process.cwd(), chunk.filePath),
          lines: `${chunk.startLine}-${chunk.endLine}`,
          signature: chunk.signature.substring(0, 150),
          preview: chunk.content.substring(0, 500) + (chunk.content.length > 500 ? '...' : '')
        }

        if (params.includeCallers) {
          const callerIds = index.reverseCallGraph.get(chunk.id) || []
          result.callers = callerIds.map(id => {
            const c = index.chunks.get(id)
            return c ? `${c.name} (${path.basename(c.filePath)})` : id
          })
          result.callerCount = callerIds.length
        }

        if (params.includeCallees) {
          const calleeIds = index.callGraph.get(chunk.id) || []
          result.callees = calleeIds.map(id => {
            const c = index.chunks.get(id)
            return c ? c.name : id
          })
          result.calleeCount = calleeIds.length
        }

        return result
      })

      return {
        success: true,
        query: params.query,
        totalIndexed: index.chunks.size,
        found: results.length,
        results: enriched
      }
    }
  })

  .addTool({
    name: 'rag_impact_analysis',
    description: '变更影响分析 - 分析修改某个函数/类会影响哪些其他代码',
    parameters: {
      symbolName: { type: 'string', description: '函数名或类名', required: true },
      maxDepth: { type: 'number', description: '递归深度，默认3层' },
      generateMermaid: { type: 'boolean', description: '生成Mermaid调用链图' }
    },
    execute: async (params: any) => {
      const index = await loadIndex()
      const maxDepth = params.maxDepth || 3

      const targetChunks = searchChunks(index, params.symbolName, 5)
      if (targetChunks.length === 0) {
        return { success: false, error: `未找到符号: ${params.symbolName}` }
      }

      const target = targetChunks[0]
      const chainIds = getImpactChain(index, target.id, maxDepth)

      const impacted = chainIds.map(id => index.chunks.get(id)).filter(Boolean) as CodeChunk[]

      const grouped = impacted.reduce((acc: any, chunk) => {
        const file = path.relative(process.cwd(), chunk.filePath)
        if (!acc[file]) acc[file] = []
        acc[file].push({
          name: chunk.name,
          type: chunk.type,
          lines: `${chunk.startLine}-${chunk.endLine}`
        })
        return acc
      }, {})

      let mermaid = ''
      if (params.generateMermaid) {
        mermaid = 'graph TD\n'
        mermaid += `  T[${target.name}] -->|修改| RESULT\n`
        for (const id of chainIds) {
          const chunk = index.chunks.get(id)
          if (chunk) {
            const callers = index.reverseCallGraph.get(id) || []
            for (const callerId of callers) {
              const caller = index.chunks.get(callerId)
              if (caller && chainIds.includes(callerId)) {
                mermaid += `  ${caller.name} -->|调用| ${chunk.name}\n`
              }
            }
          }
        }
      }

      return {
        success: true,
        target: {
          name: target.name,
          type: target.type,
          file: path.relative(process.cwd(), target.filePath),
          lines: `${target.startLine}-${target.endLine}`
        },
        maxDepth,
        totalImpacted: impacted.length,
        filesAffected: Object.keys(grouped).length,
        groupedByFile: grouped,
        mermaid: mermaid,
        warning: chainIds.length > 50 ? '⚠️ 影响链超过50个节点，建议谨慎修改' : '',
        message: `修改 ${target.name} 会影响 ${impacted.length} 个代码符号，涉及 ${Object.keys(grouped).length} 个文件`
      }
    }
  })

  .addTool({
    name: 'rag_call_chain',
    description: '完整调用链追踪 - 找到从入口到目标的完整调用路径',
    parameters: {
      targetName: { type: 'string', description: '目标函数名', required: true },
      entryPoints: { type: 'string', description: '入口函数名，逗号分隔' },
      maxDepth: { type: 'number', description: '最大搜索深度，默认10' }
    },
    execute: async (params: any) => {
      const index = await loadIndex()
      const maxDepth = params.maxDepth || 10

      const targets = searchChunks(index, params.targetName, 3)
      if (targets.length === 0) {
        return { success: false, error: `未找到目标: ${params.targetName}` }
      }

      const entryNames = params.entryPoints ? params.entryPoints.split(',') : ['handler', 'main', 'default', 'execute']
      
      const paths: string[][] = []
      for (const target of targets) {
        for (const entryName of entryNames) {
          const entries = searchChunks(index, entryName, 5)
          
          for (const entry of entries) {
            const visited = new Set<string>()
            const queue: { id: string, path: string[] }[] = [{ id: entry.id, path: [entry.name] }]

            while (queue.length > 0) {
              const { id, path } = queue.shift()!
              if (visited.has(id) || path.length > maxDepth) continue
              visited.add(id)

              if (id === target.id) {
                paths.push(path)
                break
              }

              const callees = index.callGraph.get(id) || []
              for (const calleeId of callees) {
                const callee = index.chunks.get(calleeId)
                if (callee) {
                  queue.push({ id: calleeId, path: [...path, callee.name] })
                }
              }
            }
          }
        }
      }

      return {
        success: true,
        target: params.targetName,
        pathsFound: paths.length,
        callChains: paths.map((p, i) => ({
          chain: p,
          length: p.length,
          readable: p.join(' → ')
        })),
        shortestChain: paths.length > 0 ? paths.reduce((a, b) => a.length <= b.length ? a : b).join(' → ') : null,
        message: paths.length > 0 ? `找到 ${paths.length} 条调用路径` : '未找到调用路径'
      }
    }
  })

  .addTool({
    name: 'rag_architecture',
    description: '自动生成架构图 - 分析模块依赖、生成Mermaid架构图',
    parameters: {
      level: { type: 'string', description: '粒度: file, folder, module' },
      outputType: { type: 'string', description: '输出格式: mermaid, text, json' },
      includeExternal: { type: 'boolean', description: '包含外部依赖' }
    },
    execute: async (params: any) => {
      const index = await loadIndex()
      const level = params.level || 'file'

      const modules: Map<string, Set<string>> = new Map()
      const deps: Map<string, Set<string>> = new Map()

      for (const [id, chunk] of index.chunks) {
        let key: string
        if (level === 'folder') {
          key = path.dirname(path.relative(process.cwd(), chunk.filePath)).split(path.sep)[0] || 'root'
        } else if (level === 'module') {
          key = path.basename(chunk.filePath).replace(/\.[^.]+$/, '')
        } else {
          key = path.relative(process.cwd(), chunk.filePath)
        }

        if (!modules.has(key)) modules.set(key, new Set())
        modules.get(key)!.add(chunk.name)

        const callees = index.callGraph.get(id) || []
        for (const calleeId of callees) {
          const callee = index.chunks.get(calleeId)
          if (callee) {
            let calleeKey: string
            if (level === 'folder') {
              calleeKey = path.dirname(path.relative(process.cwd(), callee.filePath)).split(path.sep)[0] || 'root'
            } else if (level === 'module') {
              calleeKey = path.basename(callee.filePath).replace(/\.[^.]+$/, '')
            } else {
              calleeKey = path.relative(process.cwd(), callee.filePath)
            }

            if (key !== calleeKey) {
              if (!deps.has(key)) deps.set(key, new Set())
              deps.get(key)!.add(calleeKey)
            }
          }
        }
      }

      let mermaid = 'graph TB\n'
      for (const [module] of modules) {
        const safeName = module.replace(/[^a-zA-Z0-9]/g, '_')
        mermaid += `  ${safeName}["${module}"]\n`
      }
      for (const [from, toSet] of deps) {
        const fromSafe = from.replace(/[^a-zA-Z0-9]/g, '_')
        for (const to of toSet) {
          const toSafe = to.replace(/[^a-zA-Z0-9]/g, '_')
          mermaid += `  ${fromSafe} -->|依赖| ${toSafe}\n`
        }
      }

      const moduleStats = Array.from(modules.entries()).map(([name, symbols]) => ({
        name,
        symbolCount: symbols.size,
        outgoingDeps: deps.get(name)?.size || 0,
        incomingDeps: Array.from(deps.entries()).filter(([_, v]) => v.has(name)).length
      })).sort((a, b) => b.symbolCount - a.symbolCount)

      return {
        success: true,
        level,
        modulesCount: modules.size,
        dependenciesCount: Array.from(deps.values()).reduce((a, b) => a + b.size, 0),
        moduleStats,
        mermaid,
        hotspots: moduleStats.filter(m => m.incomingDeps > 5).map(m => m.name),
        message: `架构分析完成，共 ${modules.size} 个模块，${deps.size} 条依赖关系`
      }
    }
  })

  .addTool({
    name: 'rag_find_definition',
    description: '精确定义查找 - 比普通搜索更精准的定义定位',
    parameters: {
      symbolName: { type: 'string', description: '符号名称', required: true },
      gotoIde: { type: 'boolean', description: '生成IDE跳转链接' }
    },
    execute: async (params: any) => {
      const index = await loadIndex()
      const results = searchChunks(index, params.symbolName, 5)

      if (results.length === 0) {
        return { success: false, error: `未找到定义: ${params.symbolName}` }
      }

      const definitions = results.map(r => ({
        name: r.name,
        type: r.type,
        file: path.relative(process.cwd(), r.filePath),
        line: r.startLine,
        signature: r.signature,
        vscodeLink: params.gotoIde ? `vscode://file/${r.filePath}:${r.startLine}` : null
      }))

      return {
        success: true,
        query: params.symbolName,
        found: definitions.length,
        definitions
      }
    }
  })

  .addPrompt({
    name: 'code-expert',
    description: '代码专家模式 - 基于RAG索引的深度代码分析',
    arguments: [{ name: 'question', description: '关于代码的问题', required: true }],
    generate: async (args?: Record<string, any>) => `
## 🧠 代码专家模式: ${args?.question}

### 执行流程
1. 首先调用 \`rag_index_build\` 确保索引是最新的
2. 使用 \`rag_search\` 搜索相关代码符号
3. 使用 \`rag_impact_analysis\` 分析影响链
4. 使用 \`rag_call_chain\` 追踪调用路径
5. 结合所有信息给出完整回答

### 提示
- 询问"修改支付流程有什么风险？" → 自动进行影响分析
- 询问"登录流程是怎样的？" → 自动追踪调用链
- 询问"项目架构是怎样的？" → 自动生成架构图
    `.trim()
  })

  .build()
