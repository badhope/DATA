import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 60000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

let dbConfig: any = {}

function buildPgUri(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  const { host, port, user, password, database } = dbConfig
  const auth = user && password ? `${user}:${password}@` : user ? `${user}@` : ''
  return `postgresql://${auth}${host || 'localhost'}:${port || 5432}/${database || 'postgres'}`
}

function buildMysqlUri(): string {
  if (process.env.MYSQL_URL) return process.env.MYSQL_URL
  const { host, port, user, password, database } = dbConfig
  const auth = user && password ? `${user}:${password}@` : user ? `${user}@` : ''
  return `mysql://${auth}${host || 'localhost'}:${port || 3306}/${database || ''}`
}

export default createMCPServer({
  name: 'database',
  version: '1.0.0',
  description: 'SQL Database toolkit - PostgreSQL, MySQL, SQLite querying and schema management',
  icon: '🗄️',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Database', 'Data Analysis'],
    rating: 'intermediate',
    features: ['PostgreSQL', 'MySQL', 'SQLite', 'Query Execution', 'Schema Inspection']
  })
  .addTool({
    name: 'db_configure',
    description: 'Configure database connection parameters',
    parameters: {
      type: { type: 'string', description: 'Database type: postgres, mysql, sqlite' },
      host: { type: 'string', description: 'Database host' },
      port: { type: 'number', description: 'Database port' },
      user: { type: 'string', description: 'Database username' },
      password: { type: 'string', description: 'Database password' },
      database: { type: 'string', description: 'Database name' },
      filename: { type: 'string', description: 'SQLite database file path' }
    },
    execute: async (args: any) => {
      dbConfig = args
      return {
        success: true,
        message: `Database configured: ${args.type}`,
        connection: args.type === 'sqlite' ? args.filename : `${args.host || 'localhost'}:${args.port || 5432}/${args.database}`
      }
    }
  })
  .addTool({
    name: 'db_set_url',
    description: 'Set database connection URL (DATABASE_URL)',
    parameters: {
      url: { type: 'string', description: 'Database connection URL (postgresql:// or mysql://)' }
    },
    execute: async (args: any) => {
      if (args.url.startsWith('postgres')) {
        process.env.DATABASE_URL = args.url
        dbConfig.type = 'postgres'
      } else if (args.url.startsWith('mysql')) {
        process.env.MYSQL_URL = args.url
        dbConfig.type = 'mysql'
      }
      return {
        success: true,
        message: 'Database connection URL configured',
        type: dbConfig.type
      }
    }
  })
  .addTool({
    name: 'db_query',
    description: 'Execute SQL query and return results',
    parameters: {
      sql: { type: 'string', description: 'SQL query to execute' },
      outputFormat: { type: 'string', description: 'Output format: json, csv, table' }
    },
    execute: async (args: any) => {
      let result = ''
      const format = args.outputFormat || 'json'
      
      if (dbConfig.type === 'postgres') {
        const uri = buildPgUri()
        result = await safeExec(`psql "${uri}" -c "${args.sql.replace(/"/g, '\\"')}" -${format} 2>&1 || echo "psql command failed"`)
      } else if (dbConfig.type === 'mysql') {
        const uri = buildMysqlUri()
        result = await safeExec(`mysql -e "${args.sql.replace(/"/g, '\\"')}" 2>&1 || echo "mysql command failed"`)
      } else if (dbConfig.type === 'sqlite' && dbConfig.filename) {
        result = await safeExec(`sqlite3 "${dbConfig.filename}" "${args.sql}" 2>&1 || echo "sqlite3 command failed"`)
      } else {
        return { error: 'Database type not configured. Use db_configure first.' }
      }
      
      return { result: result.substring(0, 5000) }
    }
  })
  .addTool({
    name: 'db_list_tables',
    description: 'List all tables in the database',
    parameters: {
      schema: { type: 'string', description: 'Schema name (for PostgreSQL)' }
    },
    execute: async (args: any) => {
      let result = ''
      const schema = args.schema || 'public'
      
      if (dbConfig.type === 'postgres') {
        const uri = buildPgUri()
        result = await safeExec(`psql "${uri}" -c "SELECT table_name FROM information_schema.tables WHERE table_schema = '${schema}';" 2>&1`)
      } else if (dbConfig.type === 'mysql') {
        result = await safeExec(`mysql -e "SHOW TABLES;" 2>&1`)
      } else if (dbConfig.type === 'sqlite' && dbConfig.filename) {
        result = await safeExec(`sqlite3 "${dbConfig.filename}" ".tables" 2>&1`)
      } else {
        return { error: 'Database type not configured' }
      }
      
      return { tables: result.substring(0, 3000) }
    }
  })
  .addTool({
    name: 'db_describe_table',
    description: 'Get table schema information',
    parameters: {
      table: { type: 'string', description: 'Table name' }
    },
    execute: async (args: any) => {
      let result = ''
      
      if (dbConfig.type === 'postgres') {
        const uri = buildPgUri()
        result = await safeExec(`psql "${uri}" -c "\\d ${args.table}" 2>&1`)
      } else if (dbConfig.type === 'mysql') {
        result = await safeExec(`mysql -e "DESCRIBE ${args.table};" 2>&1`)
      } else if (dbConfig.type === 'sqlite' && dbConfig.filename) {
        result = await safeExec(`sqlite3 "${dbConfig.filename}" ".schema ${args.table}" 2>&1`)
      } else {
        return { error: 'Database type not configured' }
      }
      
      return { schema: result.substring(0, 3000) }
    }
  })
  .addTool({
    name: 'db_dump',
    description: 'Create database dump/backup',
    parameters: {
      database: { type: 'string', description: 'Database name' },
      outputFile: { type: 'string', description: 'Output dump file path' }
    },
    execute: async (args: any) => {
      let result = ''
      
      if (dbConfig.type === 'postgres') {
        const uri = buildPgUri()
        result = await safeExec(`pg_dump "${uri}" -f "${args.outputFile}" 2>&1`)
      } else if (dbConfig.type === 'mysql') {
        result = await safeExec(`mysqldump ${args.database} > "${args.outputFile}" 2>&1`)
      } else if (dbConfig.type === 'sqlite' && dbConfig.filename) {
        result = await safeExec(`sqlite3 "${dbConfig.filename}" ".dump" > "${args.outputFile}" 2>&1`)
      } else {
        return { error: 'Database type not configured' }
      }
      
      return {
        success: !result.includes('Error'),
        outputFile: args.outputFile,
        raw: result.substring(0, 500)
      }
    }
  })
  .addTool({
    name: 'db_export_csv',
    description: 'Export table or query results to CSV',
    parameters: {
      table: { type: 'string', description: 'Table name to export' },
      query: { type: 'string', description: 'Custom SELECT query to export' },
      outputFile: { type: 'string', description: 'Output CSV file path' }
    },
    execute: async (args: any) => {
      return {
        outputFile: args.outputFile,
        message: 'CSV export feature requires database CLI tools',
        table: args.table,
        query: args.query
      }
    }
  })
  .build()
