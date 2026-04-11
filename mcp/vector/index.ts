import { createMCPServer } from '../../packages/core/mcp/builder'
import * as fs from 'fs'
import * as path from 'path'
import { createHash } from 'crypto'

interface VectorDocument {
  id: string
  content: string
  embedding: number[]
  metadata: Record<string, any>
  timestamp: number
  source: string
  chunkIndex?: number
  totalChunks?: number
}

interface VectorCollection {
  name: string
  dimension: number
  documents: Record<string, VectorDocument>
  createdAt: number
  updatedAt: number
}

interface VectorStore {
  [collectionName: string]: VectorCollection
}

const VECTOR_DIR = path.join(process.cwd(), '.trae', 'vector')
const VECTOR_FILE = path.join(VECTOR_DIR, 'vector-store.json')

function ensureVectorDir() {
  if (!fs.existsSync(VECTOR_DIR)) {
    fs.mkdirSync(VECTOR_DIR, { recursive: true })
  }
}

function loadVectorStore(): VectorStore {
  ensureVectorDir()
  if (fs.existsSync(VECTOR_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(VECTOR_FILE, 'utf-8'))
    } catch {
      return {}
    }
  }
  return {}
}

function saveVectorStore(store: VectorStore) {
  ensureVectorDir()
  fs.writeFileSync(VECTOR_FILE, JSON.stringify(store, null, 2), 'utf-8')
}

function generateId(content: string): string {
  return createHash('md5').update(content + Date.now()).digest('hex').substring(0, 16)
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0
  let dot = 0, normA = 0, normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return normA === 0 || normB === 0 ? 0 : dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

function simpleEmbedding(text: string): number[] {
  const words = text.toLowerCase().split(/\W+/).filter(Boolean)
  const dim = 1536
  const vec = new Array(dim).fill(0)
  
  words.forEach((word, wi) => {
    let hash = 0
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash) + word.charCodeAt(i)
      hash |= 0
    }
    for (let i = 0; i < Math.min(20, word.length); i++) {
      const idx = Math.abs((hash + i * 31 + wi) % dim)
      vec[idx] += 1 / (1 + Math.log(wi + 1))
    }
  })
  
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1
  return vec.map(v => v / norm)
}

function chunkText(text: string, chunkSize: number = 500, overlap: number = 50): string[] {
  const chunks: string[] = []
  const sentences = text.split(/(?<=[.!?。！？])\s+/)
  let current = ''
  
  for (const sentence of sentences) {
    if (current.length + sentence.length > chunkSize && current) {
      chunks.push(current)
      current = current.substring(Math.min(current.length, overlap))
    }
    current += (current ? ' ' : '') + sentence
  }
  if (current) chunks.push(current)
  
  return chunks.length > 0 ? chunks : [text]
}

export default createMCPServer({
  name: 'vector',
  version: '1.0.0',
  description: 'Vector Database & RAG System - Semantic search and knowledge retrieval engine',
  icon: '🔍',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['AI', 'RAG', 'Semantic Search', 'Knowledge Base'],
    rating: 'advanced',
    features: ['Vector Embeddings', 'Semantic Search', 'Document Chunking', 'RAG Pipeline']
  })

  .addTool({
    name: 'vector_create_collection',
    description: 'Create a new vector collection',
    parameters: {
      name: { type: 'string', description: 'Collection name' },
      dimension: { type: 'number', description: 'Vector dimension (default: 1536)' }
    },
    execute: async (params: any) => {
      const store = loadVectorStore()
      const name = params.name.toLowerCase().replace(/\W+/g, '_')
      
      if (store[name]) {
        return { success: false, message: `Collection '${name}' already exists` }
      }
      
      store[name] = {
        name,
        dimension: params.dimension || 1536,
        documents: {},
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      
      saveVectorStore(store)
      
      return {
        success: true,
        collection: name,
        dimension: store[name].dimension,
        message: `Vector collection '${name}' created`
      }
    }
  })

  .addTool({
    name: 'vector_add',
    description: 'Add document to vector collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      content: { type: 'string', description: 'Document content' },
      source: { type: 'string', description: 'Source identifier (file path, URL, etc.)' },
      metadata: { type: 'string', description: 'JSON metadata' },
      autoChunk: { type: 'boolean', description: 'Automatically chunk large text' },
      chunkSize: { type: 'number', description: 'Chunk size when auto-chunking' }
    },
    execute: async (params: any) => {
      const store = loadVectorStore()
      const collectionName = params.collection.toLowerCase().replace(/\W+/g, '_')
      
      if (!store[collectionName]) {
        store[collectionName] = {
          name: collectionName,
          dimension: 1536,
          documents: {},
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      }
      
      const collection = store[collectionName]
      const source = params.source || 'manual'
      const metadata = params.metadata ? JSON.parse(params.metadata) : {}
      
      const chunks = params.autoChunk 
        ? chunkText(params.content, params.chunkSize || 500)
        : [params.content]
      
      const ids: string[] = []
      
      chunks.forEach((chunk, idx) => {
        const id = generateId(chunk + idx)
        collection.documents[id] = {
          id,
          content: chunk,
          embedding: simpleEmbedding(chunk),
          metadata,
          timestamp: Date.now(),
          source,
          chunkIndex: params.autoChunk ? idx : undefined,
          totalChunks: params.autoChunk ? chunks.length : undefined
        }
        ids.push(id)
      })
      
      collection.updatedAt = Date.now()
      saveVectorStore(store)
      
      return {
        success: true,
        collection: collectionName,
        documentIds: ids,
        chunks: chunks.length,
        source,
        message: `Added ${chunks.length} document chunk(s) to '${collectionName}'`
      }
    }
  })

  .addTool({
    name: 'vector_search',
    description: 'Semantic search in vector collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      query: { type: 'string', description: 'Search query' },
      limit: { type: 'number', description: 'Number of results' },
      minScore: { type: 'number', description: 'Minimum similarity score (0-1)' },
      includeEmbeddings: { type: 'boolean', description: 'Include vectors in result' }
    },
    execute: async (params: any) => {
      const store = loadVectorStore()
      const collectionName = params.collection.toLowerCase().replace(/\W+/g, '_')
      
      if (!store[collectionName]) {
        return { success: false, message: `Collection '${collectionName}' does not exist` }
      }
      
      const collection = store[collectionName]
      const queryEmbedding = simpleEmbedding(params.query)
      const limit = params.limit || 10
      const minScore = params.minScore || 0
      
      const results = Object.values(collection.documents)
        .map(doc => ({
          ...doc,
          score: cosineSimilarity(queryEmbedding, doc.embedding)
        }))
        .filter(d => d.score >= minScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
      
      return {
        query: params.query,
        collection: collectionName,
        found: results.length,
        results: results.map(r => ({
          id: r.id,
          score: parseFloat(r.score.toFixed(4)),
          content: r.content,
          source: r.source,
          metadata: r.metadata,
          chunk: r.chunkIndex !== undefined ? `${r.chunkIndex + 1}/${r.totalChunks}` : undefined,
          embedding: params.includeEmbeddings ? r.embedding : undefined
        }))
      }
    }
  })

  .addTool({
    name: 'vector_add_file',
    description: 'Process and add a file to vector store',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      filePath: { type: 'string', description: 'Path to file' },
      chunkSize: { type: 'number', description: 'Chunk size in characters' }
    },
    execute: async (params: any) => {
      const filePath = path.resolve(params.filePath)
      
      if (!fs.existsSync(filePath)) {
        return { success: false, message: `File not found: ${filePath}` }
      }
      
      const ext = path.extname(filePath).toLowerCase()
      let content = ''
      
      if (['.txt', '.md', '.json', '.js', '.ts', '.py', '.java', '.cpp', '.c', '.go', '.rs', '.html', '.css'].includes(ext)) {
        content = fs.readFileSync(filePath, 'utf-8')
      } else {
        return { success: false, message: `Unsupported file type: ${ext}` }
      }
      
      const store = loadVectorStore()
      const collectionName = params.collection.toLowerCase().replace(/\W+/g, '_')
      
      if (!store[collectionName]) {
        store[collectionName] = {
          name: collectionName,
          dimension: 1536,
          documents: {},
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      }
      
      const collection = store[collectionName]
      const chunks = chunkText(content, params.chunkSize || 800)
      const ids: string[] = []
      
      chunks.forEach((chunk, idx) => {
        const id = generateId(chunk + idx)
        collection.documents[id] = {
          id,
          content: chunk,
          embedding: simpleEmbedding(chunk),
          metadata: { file: filePath, extension: ext },
          timestamp: Date.now(),
          source: filePath,
          chunkIndex: idx,
          totalChunks: chunks.length
        }
        ids.push(id)
      })
      
      collection.updatedAt = Date.now()
      saveVectorStore(store)
      
      return {
        success: true,
        collection: collectionName,
        file: filePath,
        documentIds: ids,
        chunks: chunks.length,
        message: `Processed ${filePath} into ${chunks.length} vector embeddings`
      }
    }
  })

  .addTool({
    name: 'vector_list_collections',
    description: 'List all vector collections',
    parameters: {},
    execute: async () => {
      const store = loadVectorStore()
      
      return {
        collections: Object.values(store).map(c => ({
          name: c.name,
          dimension: c.dimension,
          documents: Object.keys(c.documents).length,
          created: new Date(c.createdAt).toISOString(),
          updated: new Date(c.updatedAt).toISOString()
        }))
      }
    }
  })

  .addTool({
    name: 'vector_delete',
    description: 'Delete documents from vector collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      documentId: { type: 'string', description: 'Document ID to delete' }
    },
    execute: async (params: any) => {
      const store = loadVectorStore()
      const collectionName = params.collection.toLowerCase().replace(/\W+/g, '_')
      
      if (!store[collectionName]) {
        return { success: false, message: `Collection '${collectionName}' does not exist` }
      }
      
      if (!store[collectionName].documents[params.documentId]) {
        return { success: false, message: 'Document not found' }
      }
      
      const deleted = store[collectionName].documents[params.documentId]
      delete store[collectionName].documents[params.documentId]
      store[collectionName].updatedAt = Date.now()
      saveVectorStore(store)
      
      return {
        success: true,
        deleted: {
          id: deleted.id,
          source: deleted.source,
          contentPreview: deleted.content.substring(0, 100) + '...'
        },
        message: 'Document deleted from vector store'
      }
    }
  })

  .addTool({
    name: 'vector_rag_query',
    description: 'Complete RAG pipeline: search + context augmentation',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      query: { type: 'string', description: 'User question' },
      contextLimit: { type: 'number', description: 'Max context chunks' },
      formatPrompt: { type: 'boolean', description: 'Format as LLM prompt' }
    },
    execute: async (params: any) => {
      const store = loadVectorStore()
      const collectionName = params.collection.toLowerCase().replace(/\W+/g, '_')
      
      if (!store[collectionName]) {
        return { success: false, message: `Collection '${collectionName}' does not exist` }
      }
      
      const collection = store[collectionName]
      const queryEmbedding = simpleEmbedding(params.query)
      const limit = params.contextLimit || 5
      
      const results = Object.values(collection.documents)
        .map(doc => ({
          ...doc,
          score: cosineSimilarity(queryEmbedding, doc.embedding)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
      
      const context = results
        .map((r, i) => `[Context ${i + 1} | Score: ${r.score.toFixed(2)} | Source: ${r.source}]\n${r.content}`)
        .join('\n\n---\n\n')
      
      const prompt = params.formatPrompt ? `
Based on the following context, answer the user's question.

CONTEXT:
${context}

QUESTION: ${params.query}

ANSWER:` : undefined
      
      return {
        query: params.query,
        collection: collectionName,
        contextChunks: results.length,
        contextSources: [...new Set(results.map(r => r.source))],
        averageScore: (results.reduce((s, r) => s + r.score, 0) / results.length).toFixed(3),
        context,
        llmPrompt: prompt,
        message: `RAG context prepared from ${results.length} relevant chunks`
      }
    }
  })

  .addTool({
    name: 'vector_clear_collection',
    description: 'Clear all documents in a collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      confirm: { type: 'boolean', description: 'Confirm deletion' }
    },
    execute: async (params: any) => {
      if (!params.confirm) {
        return { success: false, message: 'Set confirm: true to proceed' }
      }
      
      const store = loadVectorStore()
      const collectionName = params.collection.toLowerCase().replace(/\W+/g, '_')
      
      if (!store[collectionName]) {
        return { success: false, message: `Collection '${collectionName}' does not exist` }
      }
      
      const count = Object.keys(store[collectionName].documents).length
      store[collectionName].documents = {}
      store[collectionName].updatedAt = Date.now()
      saveVectorStore(store)
      
      return {
        success: true,
        collection: collectionName,
        clearedCount: count,
        message: `Cleared ${count} documents from '${collectionName}'`
      }
    }
  })
