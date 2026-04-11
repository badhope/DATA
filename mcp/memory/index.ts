import { createMCPServer } from '../../packages/core/mcp/builder'
import * as fs from 'fs'
import * as path from 'path'

interface MemoryItem {
  id: string
  content: string
  type: 'fact' | 'conversation' | 'preference' | 'goal' | 'entity' | 'reflection'
  metadata: Record<string, any>
  timestamp: number
  importance: number
  accessCount: number
  lastAccessed: number
  tags: string[]
}

interface MemoryStore {
  [key: string]: MemoryItem
}

const MEMORY_DIR = path.join(process.cwd(), '.trae', 'memory')
const MEMORY_FILE = path.join(MEMORY_DIR, 'memory-store.json')

function ensureMemoryDir() {
  if (!fs.existsSync(MEMORY_DIR)) {
    fs.mkdirSync(MEMORY_DIR, { recursive: true })
  }
}

function loadMemory(): MemoryStore {
  ensureMemoryDir()
  if (fs.existsSync(MEMORY_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'))
    } catch {
      return {}
    }
  }
  return {}
}

function saveMemory(store: MemoryStore) {
  ensureMemoryDir()
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(store, null, 2), 'utf-8')
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export default createMCPServer({
  name: 'memory',
  version: '1.0.0',
  description: 'Agent Memory System - Contextual memory management for long-term AI agent retention',
  icon: '🧠',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['AI Agent', 'Context Management', 'Productivity'],
    rating: 'advanced',
    features: ['Long-term Memory', 'Context Window', 'Knowledge Graph', 'Importance Ranking']
  })

  .addTool({
    name: 'memory_store',
    description: 'Store a new memory item',
    parameters: {
      content: { type: 'string', description: 'Memory content to store' },
      type: { type: 'string', description: 'Memory type: fact, conversation, preference, goal, entity, reflection' },
      importance: { type: 'number', description: 'Importance score 1-10' },
      tags: { type: 'string', description: 'Comma-separated tags for categorization' },
      metadata: { type: 'string', description: 'JSON string of additional metadata' }
    },
    execute: async (params: any) => {
      const store = loadMemory()
      const id = generateId()
      const now = Date.now()
      
      const memory: MemoryItem = {
        id,
        content: params.content,
        type: (params.type as any) || 'fact',
        importance: Math.min(10, Math.max(1, params.importance || 5)),
        tags: (params.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        metadata: params.metadata ? JSON.parse(params.metadata) : {},
        timestamp: now,
        accessCount: 0,
        lastAccessed: now
      }
      
      store[id] = memory
      saveMemory(store)
      
      return {
        success: true,
        memoryId: id,
        memory,
        message: `Memory stored successfully with importance: ${memory.importance}`
      }
    }
  })

  .addTool({
    name: 'memory_recall',
    description: 'Recall memories with semantic search',
    parameters: {
      query: { type: 'string', description: 'Search query' },
      type: { type: 'string', description: 'Filter by memory type' },
      tags: { type: 'string', description: 'Filter by tags (comma-separated)' },
      limit: { type: 'number', description: 'Maximum results to return' },
      minImportance: { type: 'number', description: 'Minimum importance score' },
      sortBy: { type: 'string', description: 'Sort by: recency, importance, accessCount' }
    },
    execute: async (params: any) => {
      const store = loadMemory()
      const query = params.query?.toLowerCase() || ''
      const tagList = (params.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean)
      const limit = params.limit || 20
      const minImportance = params.minImportance || 0
      const sortBy = params.sortBy || 'recency'
      
      let results = Object.values(store)
        .filter(m => !params.type || m.type === params.type)
        .filter(m => m.importance >= minImportance)
        .filter(m => tagList.length === 0 || tagList.some((tag: string) => m.tags.includes(tag)))
        .filter(m => !query || 
          m.content.toLowerCase().includes(query) ||
          m.tags.some(t => t.toLowerCase().includes(query))
        )
      
      if (sortBy === 'recency') {
        results.sort((a, b) => b.timestamp - a.timestamp)
      } else if (sortBy === 'importance') {
        results.sort((a, b) => b.importance - a.importance)
      } else if (sortBy === 'accessCount') {
        results.sort((a, b) => b.accessCount - a.accessCount)
      }
      
      results = results.slice(0, limit)
      
      results.forEach(m => {
        store[m.id].accessCount++
        store[m.id].lastAccessed = Date.now()
      })
      saveMemory(store)
      
      return {
        query: params.query,
        count: results.length,
        memories: results.map(m => ({
          id: m.id,
          type: m.type,
          content: m.content,
          importance: m.importance,
          tags: m.tags,
          age: Math.round((Date.now() - m.timestamp) / 3600000) + 'h ago',
          accessCount: m.accessCount
        }))
      }
    }
  })

  .addTool({
    name: 'memory_forget',
    description: 'Forget (delete) a specific memory',
    parameters: {
      memoryId: { type: 'string', description: 'ID of memory to delete' },
      confirm: { type: 'boolean', description: 'Confirm deletion' }
    },
    execute: async (params: any) => {
      if (!params.confirm) {
        return {
          success: false,
          message: 'Please confirm deletion by setting confirm: true'
        }
      }
      
      const store = loadMemory()
      if (!store[params.memoryId]) {
        return {
          success: false,
          message: 'Memory not found'
        }
      }
      
      const deleted = store[params.memoryId]
      delete store[params.memoryId]
      saveMemory(store)
      
      return {
        success: true,
        deletedMemory: {
          id: deleted.id,
          type: deleted.type,
          content: deleted.content
        },
        message: 'Memory permanently forgotten'
      }
    }
  })

  .addTool({
    name: 'memory_update',
    description: 'Update an existing memory',
    parameters: {
      memoryId: { type: 'string', description: 'ID of memory to update' },
      content: { type: 'string', description: 'New content' },
      importance: { type: 'number', description: 'New importance score' },
      tags: { type: 'string', description: 'New tags (comma-separated)' }
    },
    execute: async (params: any) => {
      const store = loadMemory()
      if (!store[params.memoryId]) {
        return { success: false, message: 'Memory not found' }
      }
      
      const memory = store[params.memoryId]
      if (params.content !== undefined) memory.content = params.content
      if (params.importance !== undefined) memory.importance = Math.min(10, Math.max(1, params.importance))
      if (params.tags !== undefined) {
        memory.tags = params.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      }
      
      saveMemory(store)
      
      return {
        success: true,
        memoryId: params.memoryId,
        updatedMemory: memory,
        message: 'Memory updated successfully'
      }
    }
  })

  .addTool({
    name: 'memory_summary',
    description: 'Get summary of all memories and statistics',
    parameters: {
      includeRecent: { type: 'boolean', description: 'Include recent memories' }
    },
    execute: async (params: any) => {
      const store = loadMemory()
      const memories = Object.values(store)
      
      const typeStats: Record<string, number> = {}
      const tagStats: Record<string, number> = {}
      
      memories.forEach(m => {
        typeStats[m.type] = (typeStats[m.type] || 0) + 1
        m.tags.forEach(t => {
          tagStats[t] = (tagStats[t] || 0) + 1
        })
      })
      
      const avgImportance = memories.length > 0 
        ? (memories.reduce((s, m) => s + m.importance, 0) / memories.length).toFixed(1)
        : 0
      
      const result: any = {
        totalMemories: memories.length,
        typeDistribution: typeStats,
        topTags: Object.entries(tagStats)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10),
        averageImportance: avgImportance,
        memoryPath: MEMORY_FILE
      }
      
      if (params.includeRecent) {
        result.recentMemories = memories
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 10)
          .map(m => ({
            id: m.id,
            type: m.type,
            content: m.content.substring(0, 100) + (m.content.length > 100 ? '...' : ''),
            importance: m.importance
          }))
      }
      
      return result
    }
  })

  .addTool({
    name: 'memory_export',
    description: 'Export all memories to JSON',
    parameters: {
      outputPath: { type: 'string', description: 'Output file path' }
    },
    execute: async (params: any) => {
      const store = loadMemory()
      const outputPath = params.outputPath || path.join(process.cwd(), 'memory-export.json')
      
      fs.writeFileSync(outputPath, JSON.stringify(Object.values(store), null, 2), 'utf-8')
      
      return {
        success: true,
        memoryCount: Object.keys(store).length,
        outputPath,
        message: `Memories exported successfully to ${outputPath}`
      }
    }
  })

  .addTool({
    name: 'memory_prune',
    description: 'Prune low importance or old memories',
    parameters: {
      maxAgeHours: { type: 'number', description: 'Maximum age in hours' },
      minImportance: { type: 'number', description: 'Minimum importance to keep' },
      dryRun: { type: 'boolean', description: 'Show what would be deleted without deleting' }
    },
    execute: async (params: any) => {
      const store = loadMemory()
      const now = Date.now()
      const maxAgeMs = (params.maxAgeHours || 720) * 3600000
      const minImportance = params.minImportance || 2
      
      const toDelete = Object.values(store)
        .filter(m => m.importance < minImportance || (now - m.timestamp) > maxAgeMs)
      
      if (!params.dryRun) {
        toDelete.forEach(m => delete store[m.id])
        saveMemory(store)
      }
      
      return {
        dryRun: params.dryRun,
        prunedCount: toDelete.length,
        prunedMemories: toDelete.map(m => ({
          id: m.id,
          type: m.type,
          importance: m.importance,
          ageHours: Math.round((now - m.timestamp) / 3600000)
        })),
        message: params.dryRun 
          ? `Dry run: ${toDelete.length} memories would be pruned` 
          : `${toDelete.length} memories pruned`
      }
    }
  })

  .addTool({
    name: 'memory_clear_all',
    description: 'Clear ALL memories (use with caution!)',
    parameters: {
      confirm: { type: 'boolean', description: 'Must be true to proceed' },
      backup: { type: 'boolean', description: 'Create backup before clearing' }
    },
    execute: async (params: any) => {
      if (!params.confirm) {
        return { success: false, message: 'Confirmation required! Set confirm: true' }
      }
      
      const store = loadMemory()
      const count = Object.keys(store).length
      
      if (params.backup) {
        const backupPath = path.join(MEMORY_DIR, `backup-${Date.now()}.json`)
        fs.writeFileSync(backupPath, JSON.stringify(store, null, 2), 'utf-8')
      }
      
      saveMemory({})
      
      return {
        success: true,
        clearedCount: count,
        backup: params.backup,
        message: `All ${count} memories cleared! ${params.backup ? 'Backup created.' : ''}`
      }
    }
  })
