import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 15000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

let redisConfig: any = {
  host: 'localhost',
  port: 6379,
  db: '0'
}

function buildRedisArgs(): string {
  let args = `-h ${redisConfig.host} -p ${redisConfig.port} -n ${redisConfig.db}`
  if (redisConfig.password) args += ` -a ${redisConfig.password}`
  if (redisConfig.username) args += ` --user ${redisConfig.username}`
  return args
}

function buildRedisCmd(command: string): string {
  const args = buildRedisArgs()
  return `redis-cli ${args} ${command} 2>&1`
}

export default createMCPServer({
  name: 'redis',
  version: '1.0.0',
  description: 'Redis toolkit - Cache management, key operations, pub/sub, and data structures',
  icon: '🔴',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Database', 'Development', 'Caching'],
    rating: 'intermediate',
    features: ['Key-Value Operations', 'Hash/Sorted Set Commands', 'Pub/Sub Messaging', 'Connection Management']
  })
  .addTool({
    name: 'redis_configure',
    description: 'Configure Redis connection parameters',
    parameters: {
      host: { type: 'string', description: 'Redis host' },
      port: { type: 'number', description: 'Redis port' },
      db: { type: 'number', description: 'Database number' },
      password: { type: 'string', description: 'Redis password' },
      username: { type: 'string', description: 'Redis username (Redis 6+ ACL)' },
      url: { type: 'string', description: 'Full Redis URL: redis://user:pass@host:port/db' }
    },
    execute: async (params: any) => {
      if (params.url) {
        redisConfig.url = params.url
      } else {
        redisConfig = { ...redisConfig, ...params }
      }
      return {
        success: true,
        message: 'Redis configuration updated',
        connection: params.url || `${redisConfig.host}:${redisConfig.port}/${redisConfig.db}`
      }
    }
  })
  .addTool({
    name: 'redis_ping',
    description: 'Test Redis connection',
    parameters: {},
    execute: async () => {
      const result = await safeExec(buildRedisCmd('PING'))
      return {
        connected: result.includes('PONG'),
        response: result
      }
    }
  })
  .addTool({
    name: 'redis_set',
    description: 'Set string value',
    parameters: {
      key: { type: 'string', description: 'Key name' },
      value: { type: 'string', description: 'Value to store' },
      ttl: { type: 'number', description: 'Expire time in seconds' },
      nx: { type: 'boolean', description: 'Only set if key does not exist' },
      xx: { type: 'boolean', description: 'Only set if key already exists' }
    },
    execute: async (params: any) => {
      let opts = ''
      if (params.ttl) opts += ` EX ${params.ttl}`
      if (params.nx) opts += ' NX'
      if (params.xx) opts += ' XX'
      const result = await safeExec(buildRedisCmd(`SET "${params.key}" "${params.value}"${opts}`))
      return { success: result.includes('OK'), raw: result }
    }
  })
  .addTool({
    name: 'redis_get',
    description: 'Get string value',
    parameters: {
      key: { type: 'string', description: 'Key name' }
    },
    execute: async (params: any) => {
      const result = await safeExec(buildRedisCmd(`GET "${params.key}"`))
      return { value: result === 'nil' ? null : result }
    }
  })
  .addTool({
    name: 'redis_del',
    description: 'Delete keys',
    parameters: {
      keys: { type: 'string', description: 'JSON array of key names' }
    },
    execute: async (params: any) => {
      const keyArray = JSON.parse(params.keys || '[]')
      const keyStr = keyArray.map((k: string) => `"${k}"`).join(' ')
      const result = await safeExec(buildRedisCmd(`DEL ${keyStr}`))
      return { deleted: parseInt(result) || 0, raw: result }
    }
  })
  .addTool({
    name: 'redis_exists',
    description: 'Check if keys exist',
    parameters: {
      keys: { type: 'string', description: 'JSON array of key names' }
    },
    execute: async (params: any) => {
      const keyArray = JSON.parse(params.keys || '[]')
      const keyStr = keyArray.map((k: string) => `"${k}"`).join(' ')
      const result = await safeExec(buildRedisCmd(`EXISTS ${keyStr}`))
      return { exists: parseInt(result) || 0 }
    }
  })
  .addTool({
    name: 'redis_expire',
    description: 'Set key TTL',
    parameters: {
      key: { type: 'string', description: 'Key name' },
      seconds: { type: 'number', description: 'TTL in seconds' }
    },
    execute: async (params: any) => {
      const result = await safeExec(buildRedisCmd(`EXPIRE "${params.key}" ${params.seconds}`))
      return { success: result === '1', raw: result }
    }
  })
  .addTool({
    name: 'redis_ttl',
    description: 'Get key remaining TTL',
    parameters: {
      key: { type: 'string', description: 'Key name' }
    },
    execute: async (params: any) => {
      const result = await safeExec(buildRedisCmd(`TTL "${params.key}"`))
      const ttl = parseInt(result)
      return {
        ttl: ttl < 0 ? null : ttl,
        exists: ttl !== -2,
        hasExpiry: ttl !== -1
      }
    }
  })
  .addTool({
    name: 'redis_incr',
    description: 'Increment integer value',
    parameters: {
      key: { type: 'string', description: 'Key name' },
      increment: { type: 'number', description: 'Increment amount' }
    },
    execute: async (params: any) => {
      const cmd = params.increment ? `INCRBY "${params.key}" ${params.increment}` : `INCR "${params.key}"`
      const result = await safeExec(buildRedisCmd(cmd))
      return { value: parseInt(result), raw: result }
    }
  })
  .addTool({
    name: 'redis_hset',
    description: 'Set hash field',
    parameters: {
      key: { type: 'string', description: 'Hash key name' },
      field: { type: 'string', description: 'Field name' },
      value: { type: 'string', description: 'Field value' }
    },
    execute: async (params: any) => {
      const result = await safeExec(buildRedisCmd(`HSET "${params.key}" "${params.field}" "${params.value}"`))
      return { newFields: parseInt(result) || 0, raw: result }
    }
  })
  .addTool({
    name: 'redis_hgetall',
    description: 'Get all hash fields',
    parameters: {
      key: { type: 'string', description: 'Hash key name' }
    },
    execute: async (params: any) => {
      const result = await safeExec(buildRedisCmd(`HGETALL "${params.key}"`))
      return { raw: result }
    }
  })
  .addTool({
    name: 'redis_lpush',
    description: 'Prepend to list',
    parameters: {
      key: { type: 'string', description: 'List key name' },
      values: { type: 'string', description: 'JSON array of values' }
    },
    execute: async (params: any) => {
      const valueArray = JSON.parse(params.values || '[]')
      const valueStr = valueArray.map((v: string) => `"${v}"`).join(' ')
      const result = await safeExec(buildRedisCmd(`LPUSH "${params.key}" ${valueStr}`))
      return { length: parseInt(result) || 0 }
    }
  })
  .addTool({
    name: 'redis_lrange',
    description: 'Get list range',
    parameters: {
      key: { type: 'string', description: 'List key name' },
      start: { type: 'number', description: 'Start index' },
      stop: { type: 'number', description: 'Stop index' }
    },
    execute: async (params: any) => {
      const start = params.start || 0
      const stop = params.stop ?? -1
      const result = await safeExec(buildRedisCmd(`LRANGE "${params.key}" ${start} ${stop}`))
      return { values: result.split('\n').filter(Boolean) }
    }
  })
  .addTool({
    name: 'redis_sadd',
    description: 'Add to set',
    parameters: {
      key: { type: 'string', description: 'Set key name' },
      members: { type: 'string', description: 'JSON array of members' }
    },
    execute: async (params: any) => {
      const memberArray = JSON.parse(params.members || '[]')
      const memberStr = memberArray.map((m: string) => `"${m}"`).join(' ')
      const result = await safeExec(buildRedisCmd(`SADD "${params.key}" ${memberStr}`))
      return { added: parseInt(result) || 0 }
    }
  })
  .addTool({
    name: 'redis_smembers',
    description: 'Get all set members',
    parameters: {
      key: { type: 'string', description: 'Set key name' }
    },
    execute: async (params: any) => {
      const result = await safeExec(buildRedisCmd(`SMEMBERS "${params.key}"`))
      return { members: result.split('\n').filter(Boolean) }
    }
  })
  .addTool({
    name: 'redis_zadd',
    description: 'Add to sorted set',
    parameters: {
      key: { type: 'string', description: 'Sorted set key name' },
      score: { type: 'number', description: 'Score value' },
      member: { type: 'string', description: 'Member name' }
    },
    execute: async (params: any) => {
      const result = await safeExec(buildRedisCmd(`ZADD "${params.key}" ${params.score} "${params.member}"`))
      return { added: parseInt(result) || 0 }
    }
  })
  .addTool({
    name: 'redis_zrange',
    description: 'Get sorted set range by rank',
    parameters: {
      key: { type: 'string', description: 'Sorted set key name' },
      start: { type: 'number', description: 'Start index' },
      stop: { type: 'number', description: 'Stop index' },
      withScores: { type: 'boolean', description: 'Include scores' }
    },
    execute: async (params: any) => {
      const start = params.start || 0
      const stop = params.stop ?? -1
      const withScores = params.withScores ? ' WITHSCORES' : ''
      const result = await safeExec(buildRedisCmd(`ZRANGE "${params.key}" ${start} ${stop}${withScores}`))
      return { values: result.split('\n').filter(Boolean) }
    }
  })
  .addTool({
    name: 'redis_keys',
    description: 'Find keys matching pattern',
    parameters: {
      pattern: { type: 'string', description: 'Pattern e.g. "user:*"' }
    },
    execute: async (params: any) => {
      const result = await safeExec(buildRedisCmd(`KEYS "${params.pattern || '*'}"`))
      const keys = result.split('\n').filter(Boolean)
      return { count: keys.length, keys: keys.slice(0, 100) }
    }
  })
  .addTool({
    name: 'redis_flushdb',
    description: 'Remove all keys from current database',
    parameters: {
      async: { type: 'boolean', description: 'Flush asynchronously' }
    },
    execute: async (params: any) => {
      const asyncFlag = params.async ? ' ASYNC' : ''
      const result = await safeExec(buildRedisCmd(`FLUSHDB${asyncFlag}`))
      return { success: result.includes('OK'), raw: result }
    }
  })
  .addTool({
    name: 'redis_info',
    description: 'Get server information and statistics',
    parameters: {
      section: { type: 'string', description: 'Information section: server, clients, memory, persistence, stats' }
    },
    execute: async (params: any) => {
      const section = params.section || ''
      const result = await safeExec(buildRedisCmd(`INFO ${section}`))
      return { info: result }
    }
  })
  .build()
