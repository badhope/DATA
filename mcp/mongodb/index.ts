import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 30000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

let mongoConfig: any = {
  host: 'localhost',
  port: 27017,
  database: 'test'
}

function buildMongoUri(): string {
  const auth = mongoConfig.username && mongoConfig.password 
    ? `${mongoConfig.username}:${encodeURIComponent(mongoConfig.password)}@` 
    : ''
  const uri = `mongodb://${auth}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`
  return uri
}

export default createMCPServer({
  name: 'mongodb',
  version: '1.0.0',
  description: 'MongoDB toolkit - Connect, query, and manage NoSQL databases with mongosh',
  icon: '🍃',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Database', 'Development'],
    rating: 'intermediate',
    features: ['CRUD Operations', 'Aggregation Pipeline', 'Index Management', 'Schema Analysis']
  })
  .addTool({
    name: 'mongo_configure',
    description: 'Configure MongoDB connection parameters',
    parameters: {
      host: { type: 'string', description: 'MongoDB host' },
      port: { type: 'number', description: 'MongoDB port' },
      database: { type: 'string', description: 'Database name' },
      username: { type: 'string', description: 'Username for authentication' },
      password: { type: 'string', description: 'Password for authentication' },
      connectionString: { type: 'string', description: 'Full MongoDB connection string (overrides other params)' }
    },
    execute: async (args: any) => {
      if (args.connectionString) {
        mongoConfig.connectionString = args.connectionString
      } else {
        mongoConfig = { ...mongoConfig, ...args }
      }
      return {
        success: true,
        message: 'MongoDB configuration updated',
        connection: args.connectionString || buildMongoUri().replace(/:([^@]+)@/, ':***@')
      }
    }
  })
  .addTool({
    name: 'mongo_ping',
    description: 'Test MongoDB connection',
    parameters: {},
    execute: async () => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "db.adminCommand('ping').ok" 2>&1`)
      const connected = result.includes('1')
      return {
        connected,
        message: connected ? 'Connection successful' : 'Connection failed',
        raw: result.substring(0, 500)
      }
    }
  })
  .addTool({
    name: 'mongo_list_databases',
    description: 'List all databases on the server',
    parameters: {},
    execute: async () => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "JSON.stringify(db.adminCommand('listDatabases').databases)" 2>&1`)
      try {
        const dbs = JSON.parse(result)
        return {
          count: dbs.length,
          databases: dbs.map((db: any) => ({
            name: db.name,
            sizeOnDisk: db.sizeOnDisk,
            empty: db.empty
          }))
        }
      } catch {
        return { error: 'Failed to parse database list', raw: result }
      }
    }
  })
  .addTool({
    name: 'mongo_list_collections',
    description: 'List all collections in current database',
    parameters: {},
    execute: async () => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "JSON.stringify(db.getCollectionNames())" 2>&1`)
      try {
        const collections = JSON.parse(result)
        return {
          count: collections.length,
          collections
        }
      } catch {
        return { error: 'Failed to parse collection list', raw: result }
      }
    }
  })
  .addTool({
    name: 'mongo_find',
    description: 'Execute find query on a collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      query: { type: 'string', description: 'Query filter as JSON (e.g., \'{"status": "active"}\')' },
      projection: { type: 'string', description: 'Projection as JSON' },
      sort: { type: 'string', description: 'Sort specification as JSON' },
      limit: { type: 'number', description: 'Limit results' },
      skip: { type: 'number', description: 'Skip results' },
      pretty: { type: 'boolean', description: 'Pretty print output' }
    },
    execute: async (args: any) => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const query = args.query || '{}'
      const projection = args.projection || '{}'
      const sort = args.sort || '{}'
      const limit = args.limit || 50
      const skip = args.skip || 0
      const jsCmd = `JSON.stringify(db.getCollection('${args.collection}').find(${query}, ${projection}).sort(${sort}).skip(${skip}).limit(${limit}).toArray())`
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "${jsCmd}" 2>&1`)
      try {
        const docs = JSON.parse(result)
        return {
          count: docs.length,
          documents: args.pretty ? docs : JSON.stringify(docs)
        }
      } catch {
        return { error: 'Query execution failed', raw: result.substring(0, 1000) }
      }
    }
  })
  .addTool({
    name: 'mongo_insert_one',
    description: 'Insert a single document into a collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      document: { type: 'string', description: 'Document to insert as JSON' }
    },
    execute: async (args: any) => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const docEscaped = args.document.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
      const jsCmd = `JSON.stringify(db.getCollection('${args.collection}').insertOne(JSON.parse("${docEscaped}")))`
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "${jsCmd}" 2>&1`)
      try {
        const opResult = JSON.parse(result)
        return {
          success: opResult.acknowledged,
          insertedId: opResult.insertedId,
          raw: result
        }
      } catch {
        return { error: 'Insert failed', raw: result.substring(0, 500) }
      }
    }
  })
  .addTool({
    name: 'mongo_update_one',
    description: 'Update a single document in a collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      filter: { type: 'string', description: 'Filter criteria as JSON' },
      update: { type: 'string', description: 'Update operations as JSON ($set, $inc, etc.)' }
    },
    execute: async (args: any) => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const jsCmd = `JSON.stringify(db.getCollection('${args.collection}').updateOne(${args.filter}, ${args.update}))`
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "${jsCmd}" 2>&1`)
      try {
        const opResult = JSON.parse(result)
        return {
          success: opResult.acknowledged,
          matchedCount: opResult.matchedCount,
          modifiedCount: opResult.modifiedCount,
          raw: result
        }
      } catch {
        return { error: 'Update failed', raw: result.substring(0, 500) }
      }
    }
  })
  .addTool({
    name: 'mongo_delete_one',
    description: 'Delete a single document from a collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      filter: { type: 'string', description: 'Filter criteria as JSON' }
    },
    execute: async (args: any) => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const jsCmd = `JSON.stringify(db.getCollection('${args.collection}').deleteOne(${args.filter}))`
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "${jsCmd}" 2>&1`)
      try {
        const opResult = JSON.parse(result)
        return {
          success: opResult.acknowledged,
          deletedCount: opResult.deletedCount,
          raw: result
        }
      } catch {
        return { error: 'Delete failed', raw: result.substring(0, 500) }
      }
    }
  })
  .addTool({
    name: 'mongo_aggregate',
    description: 'Execute aggregation pipeline on a collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      pipeline: { type: 'string', description: 'Aggregation pipeline as JSON array' }
    },
    execute: async (args: any) => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const jsCmd = `JSON.stringify(db.getCollection('${args.collection}').aggregate(${args.pipeline}).toArray())`
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "${jsCmd}" 2>&1`)
      try {
        const docs = JSON.parse(result)
        return {
          count: docs.length,
          results: docs
        }
      } catch {
        return { error: 'Aggregation failed', raw: result.substring(0, 1000) }
      }
    }
  })
  .addTool({
    name: 'mongo_count',
    description: 'Count documents in a collection with optional filter',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      query: { type: 'string', description: 'Query filter as JSON' }
    },
    execute: async (args: any) => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const query = args.query || '{}'
      const jsCmd = `db.getCollection('${args.collection}').countDocuments(${query})`
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "${jsCmd}" 2>&1`)
      const count = parseInt(result)
      return {
        count: isNaN(count) ? 0 : count,
        raw: result
      }
    }
  })
  .addTool({
    name: 'mongo_create_index',
    description: 'Create an index on a collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' },
      keys: { type: 'string', description: 'Index keys as JSON (e.g., \'{"createdAt": -1}\')' },
      name: { type: 'string', description: 'Index name' },
      unique: { type: 'boolean', description: 'Create unique index' },
      background: { type: 'boolean', description: 'Build in background' }
    },
    execute: async (args: any) => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const options = JSON.stringify({
        name: args.name,
        unique: args.unique,
        background: args.background
      })
      const jsCmd = `JSON.stringify(db.getCollection('${args.collection}').createIndex(${args.keys}, ${options}))`
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "${jsCmd}" 2>&1`)
      return {
        indexName: result.replace(/"/g, '').trim(),
        raw: result
      }
    }
  })
  .addTool({
    name: 'mongo_list_indexes',
    description: 'List all indexes on a collection',
    parameters: {
      collection: { type: 'string', description: 'Collection name' }
    },
    execute: async (args: any) => {
      const uri = mongoConfig.connectionString || buildMongoUri()
      const jsCmd = `JSON.stringify(db.getCollection('${args.collection}').getIndexes())`
      const result = await safeExec(`mongosh "${uri}" --quiet --eval "${jsCmd}" 2>&1`)
      try {
        const indexes = JSON.parse(result)
        return {
          count: indexes.length,
          indexes: indexes.map((idx: any) => ({
            name: idx.name,
            key: idx.key,
            unique: idx.unique,
            sparse: idx.sparse
          }))
        }
      } catch {
        return { error: 'Failed to list indexes', raw: result.substring(0, 500) }
      }
    }
  })
  .build()
