import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 30000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

async function cfAPI(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
  const token = process.env.CLOUDFLARE_TOKEN
  const headers = `-H "Authorization: Bearer ${token}" -H "Content-Type: application/json"`
  const bodyArg = body ? `-d '${JSON.stringify(body).replace(/'/g, "'\\''")}'` : ''
  const result = await safeExec(`curl -s -X ${method} ${headers} ${bodyArg} https://api.cloudflare.com/client/v4${endpoint}`)
  try { return JSON.parse(result) } catch { return { error: result } }
}

export default createMCPServer({
  name: 'cloudflare',
  version: '1.0.0',
  description: 'Cloudflare API toolkit - Manage DNS, Zones, Workers, CDN, and security settings with API token',
  icon: '🌩️',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['API Integration', 'DevOps', 'Cloud'],
    rating: 'intermediate',
    features: ['DNS Management', 'Workers', 'CDN', 'Security', 'Analytics']
  })
  .addTool({
    name: 'cf_set_token',
    description: 'Set Cloudflare API Token for authentication',
    parameters: {
      token: { type: 'string', description: 'Cloudflare API Token' },
      accountId: { type: 'string', description: 'Optional Cloudflare Account ID' }
    },
    execute: async (params: any) => {
      process.env.CLOUDFLARE_TOKEN = params.token
      if (params.accountId) process.env.CLOUDFLARE_ACCOUNT = params.accountId
      return { 
        success: true, 
        message: 'Cloudflare token configured successfully',
        requiredScopes: 'zone:read, zone:edit, dns:read, dns:edit, workers:edit',
        createToken: 'https://dash.cloudflare.com/profile/api-tokens'
      }
    }
  })
  .addTool({
    name: 'cf_verify_token',
    description: 'Verify Cloudflare token validity and permissions',
    parameters: {},
    execute: async () => {
      const result = await cfAPI('/user/tokens/verify')
      return {
        valid: result.success,
        status: result.result?.status,
        expiresOn: result.result?.expires_on,
        scopes: result.result?.policies
      }
    }
  })
  .addTool({
    name: 'cf_list_zones',
    description: 'List all Cloudflare zones (domains)',
    parameters: {
      status: { type: 'string', description: 'Filter by status: active, pending, initializing, deleted' },
      perPage: { type: 'number', description: 'Results per page' }
    },
    execute: async (params: any) => {
      const status = params.status ? `&status=${params.status}` : ''
      const perPage = params.perPage || 50
      const result = await cfAPI(`/zones?per_page=${perPage}${status}`)
      return {
        count: result.result?.length || 0,
        zones: result.result?.map((z: any) => ({
          id: z.id,
          name: z.name,
          status: z.status,
          nameservers: z.name_servers,
          plan: z.plan?.name
        })) || []
      }
    }
  })
  .addTool({
    name: 'cf_list_dns_records',
    description: 'List all DNS records for a zone',
    parameters: {
      zoneId: { type: 'string', description: 'Zone ID' },
      type: { type: 'string', description: 'Record type: A, AAAA, CNAME, TXT, MX' },
      perPage: { type: 'number', description: 'Results per page' }
    },
    execute: async (params: any) => {
      const type = params.type ? `&type=${params.type}` : ''
      const perPage = params.perPage || 100
      const result = await cfAPI(`/zones/${params.zoneId}/dns_records?per_page=${perPage}${type}`)
      return {
        count: result.result?.length || 0,
        records: result.result?.map((r: any) => ({
          id: r.id,
          type: r.type,
          name: r.name,
          content: r.content,
          ttl: r.ttl,
          proxied: r.proxied
        })) || []
      }
    }
  })
  .addTool({
    name: 'cf_create_dns_record',
    description: 'Create a new DNS record',
    parameters: {
      zoneId: { type: 'string', description: 'Zone ID' },
      type: { type: 'string', description: 'Record type: A, AAAA, CNAME, TXT, MX' },
      name: { type: 'string', description: 'DNS record name' },
      content: { type: 'string', description: 'Record content/value' },
      ttl: { type: 'number', description: 'TTL (1 for auto)' },
      proxied: { type: 'boolean', description: 'Proxy through Cloudflare' }
    },
    execute: async (params: any) => {
      const result = await cfAPI(`/zones/${params.zoneId}/dns_records`, 'POST', {
        type: params.type,
        name: params.name,
        content: params.content,
        ttl: params.ttl || 1,
        proxied: params.proxied !== false
      })
      return {
        success: result.success,
        record: result.result,
        errors: result.errors
      }
    }
  })
  .addTool({
    name: 'cf_update_dns_record',
    description: 'Update an existing DNS record',
    parameters: {
      zoneId: { type: 'string', description: 'Zone ID' },
      recordId: { type: 'string', description: 'DNS Record ID' },
      type: { type: 'string', description: 'Record type' },
      name: { type: 'string', description: 'DNS record name' },
      content: { type: 'string', description: 'Record content/value' },
      ttl: { type: 'number', description: 'TTL' },
      proxied: { type: 'boolean', description: 'Proxy through Cloudflare' }
    },
    execute: async (params: any) => {
      const body: any = {}
      if (params.type) body.type = params.type
      if (params.name) body.name = params.name
      if (params.content) body.content = params.content
      if (params.ttl) body.ttl = params.ttl
      if (typeof params.proxied === 'boolean') body.proxied = params.proxied
      
      const result = await cfAPI(`/zones/${params.zoneId}/dns_records/${params.recordId}`, 'PATCH', body)
      return {
        success: result.success,
        errors: result.errors
      }
    }
  })
  .addTool({
    name: 'cf_delete_dns_record',
    description: 'Delete a DNS record',
    parameters: {
      zoneId: { type: 'string', description: 'Zone ID' },
      recordId: { type: 'string', description: 'DNS Record ID' }
    },
    execute: async (params: any) => {
      const result = await cfAPI(`/zones/${params.zoneId}/dns_records/${params.recordId}`, 'DELETE')
      return {
        success: result.success,
        errors: result.errors
      }
    }
  })
  .addTool({
    name: 'cf_list_workers',
    description: 'List all Cloudflare Workers',
    parameters: {
      accountId: { type: 'string', description: 'Account ID (uses env if not set)' }
    },
    execute: async (params: any) => {
      const accountId = params.accountId || process.env.CLOUDFLARE_ACCOUNT
      const result = await cfAPI(`/accounts/${accountId}/workers/scripts`)
      return {
        count: result.result?.length || 0,
        workers: result.result?.map((w: any) => ({
          id: w.id,
          name: w.name,
          modifiedOn: w.modified_on
        })) || []
      }
    }
  })
  .addTool({
    name: 'cf_purge_cache',
    description: 'Purge Cloudflare cache for a zone',
    parameters: {
      zoneId: { type: 'string', description: 'Zone ID' },
      purgeEverything: { type: 'boolean', description: 'Purge all cache' },
      files: { type: 'string', description: 'JSON array of specific URLs to purge' }
    },
    execute: async (params: any) => {
      const body: any = {}
      if (params.purgeEverything !== false) body.purge_everything = true
      if (params.files) {
        try {
          body.files = JSON.parse(params.files)
        } catch {}
      }
      
      const result = await cfAPI(`/zones/${params.zoneId}/purge_cache`, 'POST', body)
      return {
        success: result.success,
        errors: result.errors
      }
    }
  })
  .addTool({
    name: 'cf_get_zone_analytics',
    description: 'Get zone analytics and traffic statistics',
    parameters: {
      zoneId: { type: 'string', description: 'Zone ID' },
      since: { type: 'string', description: 'Start time (ISO format or relative: -7d)' }
    },
    execute: async (params: any) => {
      const since = params.since || '-7d'
      const result = await cfAPI(`/zones/${params.zoneId}/analytics/dashboard?since=${since}`)
      return {
        analytics: result.result
      }
    }
  })
  .build()
