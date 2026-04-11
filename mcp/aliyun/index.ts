import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 30000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

export default createMCPServer({
  name: 'aliyun',
  version: '1.0.0',
  description: 'Alibaba Cloud toolkit - Manage ECS, OSS, DNS, CDN, and more cloud services',
  icon: '☁️',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Cloud', 'DevOps', 'Infrastructure'],
    rating: 'intermediate',
    features: ['ECS Management', 'OSS Storage', 'DNS Configuration', 'CDN Management']
  })
  .addTool({
    name: 'aliyun_set_auth',
    description: 'Configure Alibaba Cloud credentials',
    parameters: {
      accessKeyId: { type: 'string', description: 'Aliyun Access Key ID' },
      accessKeySecret: { type: 'string', description: 'Aliyun Access Key Secret' },
      region: { type: 'string', description: 'Default region' }
    },
    execute: async (params: any) => {
      process.env.ALIYUN_ACCESS_KEY_ID = params.accessKeyId
      process.env.ALIYUN_ACCESS_KEY_SECRET = params.accessKeySecret
      process.env.ALIYUN_REGION = params.region || 'cn-hangzhou'
      return { 
        success: true, 
        message: 'Alibaba Cloud credentials configured successfully',
        region: params.region || 'cn-hangzhou',
        installCli: 'npm install @alicloud/aliyun-api-gateway -g or download official aliyun cli'
      }
    }
  })
  .addTool({
    name: 'aliyun_ecs_list',
    description: 'List ECS instances',
    parameters: {
      region: { type: 'string', description: 'Region ID' },
      pageSize: { type: 'number', description: 'Page size' }
    },
    execute: async (params: any) => {
      const region = params.region || process.env.ALIYUN_REGION || 'cn-hangzhou'
      const pageSize = params.pageSize || 50
      const result = await safeExec(`aliyun ecs DescribeInstances --region ${region} --PageSize ${pageSize} 2>&1`)
      try {
        const parsed = JSON.parse(result)
        const instances = parsed.Instances?.Instance || []
        return {
          count: instances.length,
          instances: instances.map((i: any) => ({
            id: i.InstanceId,
            name: i.InstanceName,
            status: i.Status,
            publicIp: i.PublicIpAddress?.IpAddress?.join(', '),
            innerIp: i.InnerIpAddress?.IpAddress?.join(', '),
            os: i.OSName,
            cpu: i.Cpu,
            memory: i.Memory,
            instanceType: i.InstanceType,
            creationTime: i.CreationTime,
            expiredTime: i.ExpiredTime
          }))
        }
      } catch {
        return { error: 'Failed to parse ECS list', raw: result.substring(0, 1000) }
      }
    }
  })
  .addTool({
    name: 'aliyun_ecs_start',
    description: 'Start an ECS instance',
    parameters: {
      instanceId: { type: 'string', description: 'ECS Instance ID' },
      region: { type: 'string', description: 'Region ID' }
    },
    execute: async (params: any) => {
      const region = params.region || process.env.ALIYUN_REGION || 'cn-hangzhou'
      const result = await safeExec(`aliyun ecs StartInstance --region ${region} --InstanceId ${params.instanceId} 2>&1`)
      return {
        instanceId: params.instanceId,
        result: result.substring(0, 500)
      }
    }
  })
  .addTool({
    name: 'aliyun_ecs_stop',
    description: 'Stop an ECS instance',
    parameters: {
      instanceId: { type: 'string', description: 'ECS Instance ID' },
      region: { type: 'string', description: 'Region ID' },
      forceStop: { type: 'boolean', description: 'Force stop' }
    },
    execute: async (params: any) => {
      const region = params.region || process.env.ALIYUN_REGION || 'cn-hangzhou'
      const force = params.forceStop ? '--ForceStop true' : ''
      const result = await safeExec(`aliyun ecs StopInstance --region ${region} --InstanceId ${params.instanceId} ${force} 2>&1`)
      return {
        instanceId: params.instanceId,
        result: result.substring(0, 500)
      }
    }
  })
  .addTool({
    name: 'aliyun_oss_list_buckets',
    description: 'List all OSS buckets',
    parameters: {},
    execute: async () => {
      const region = process.env.ALIYUN_REGION || 'cn-hangzhou'
      const result = await safeExec(`aliyun oss ls 2>&1 || aliyun oss GetService --region ${region} 2>&1`)
      return {
        raw: result.substring(0, 2000)
      }
    }
  })
  .addTool({
    name: 'aliyun_oss_list_objects',
    description: 'List objects in an OSS bucket',
    parameters: {
      bucket: { type: 'string', description: 'Bucket name' },
      prefix: { type: 'string', description: 'Object prefix' },
      maxKeys: { type: 'number', description: 'Max keys' }
    },
    execute: async (params: any) => {
      const prefix = params.prefix || ''
      const maxKeys = params.maxKeys || 100
      const result = await safeExec(`aliyun oss ls oss://${params.bucket}/${prefix} --max-keys ${maxKeys} 2>&1`)
      return {
        bucket: params.bucket,
        prefix: params.prefix,
        result: result.substring(0, 2000)
      }
    }
  })
  .addTool({
    name: 'aliyun_oss_upload',
    description: 'Upload file to OSS bucket',
    parameters: {
      localPath: { type: 'string', description: 'Local file path' },
      bucket: { type: 'string', description: 'Bucket name' },
      objectKey: { type: 'string', description: 'Destination object key' }
    },
    execute: async (params: any) => {
      const key = params.objectKey || params.localPath.split('/').pop()
      const result = await safeExec(`aliyun oss cp "${params.localPath}" oss://${params.bucket}/${key} 2>&1`)
      return {
        local: params.localPath,
        destination: `oss://${params.bucket}/${key}`,
        result: result.substring(0, 1000)
      }
    }
  })
  .addTool({
    name: 'aliyun_oss_download',
    description: 'Download file from OSS bucket',
    parameters: {
      bucket: { type: 'string', description: 'Bucket name' },
      objectKey: { type: 'string', description: 'Object key to download' },
      localPath: { type: 'string', description: 'Local destination path' }
    },
    execute: async (params: any) => {
      const dest = params.localPath || params.objectKey.split('/').pop()
      const result = await safeExec(`aliyun oss cp oss://${params.bucket}/${params.objectKey} "${dest}" 2>&1`)
      return {
        source: `oss://${params.bucket}/${params.objectKey}`,
        local: dest,
        result: result.substring(0, 1000)
      }
    }
  })
  .addTool({
    name: 'aliyun_dns_list_domains',
    description: 'List all domains in DNS service',
    parameters: {
      pageSize: { type: 'number', description: 'Page size' }
    },
    execute: async (params: any) => {
      const pageSize = params.pageSize || 50
      const region = process.env.ALIYUN_REGION || 'cn-hangzhou'
      const result = await safeExec(`aliyun alidns DescribeDomains --region ${region} --PageSize ${pageSize} 2>&1`)
      try {
        const parsed = JSON.parse(result)
        return {
          count: parsed.TotalCount,
          domains: parsed.Domains?.Domain?.map((d: any) => ({
            name: d.DomainName,
            id: d.DomainId,
            recordCount: d.RecordCount
          })) || [],
          raw: result.substring(0, 500)
        }
      } catch {
        return { raw: result.substring(0, 1000) }
      }
    }
  })
  .addTool({
    name: 'aliyun_dns_add_record',
    description: 'Add DNS record for a domain',
    parameters: {
      domainName: { type: 'string', description: 'Domain name' },
      rr: { type: 'string', description: 'Subdomain prefix (e.g., www, @)' },
      type: { type: 'string', description: 'Record type: A, CNAME, TXT, MX, etc.' },
      value: { type: 'string', description: 'Record value' },
      ttl: { type: 'number', description: 'TTL in seconds' }
    },
    execute: async (params: any) => {
      const region = process.env.ALIYUN_REGION || 'cn-hangzhou'
      const ttl = params.ttl || 600
      const result = await safeExec(`aliyun alidns AddDomainRecord --region ${region} --DomainName ${params.domainName} --RR ${params.rr} --Type ${params.type} --Value "${params.value}" --TTL ${ttl} 2>&1`)
      return {
        domain: params.domainName,
        record: `${params.rr}.${params.domainName}`,
        type: params.type,
        value: params.value,
        result: result.substring(0, 500)
      }
    }
  })
  .addTool({
    name: 'aliyun_cdn_list_domains',
    description: 'List CDN domains',
    parameters: {
      pageSize: { type: 'number', description: 'Page size' }
    },
    execute: async (params: any) => {
      const pageSize = params.pageSize || 50
      const region = process.env.ALIYUN_REGION || 'cn-hangzhou'
      const result = await safeExec(`aliyun cdn DescribeUserDomains --region ${region} --PageSize ${pageSize} 2>&1`)
      return {
        result: result.substring(0, 2000)
      }
    }
  })
  .addTool({
    name: 'aliyun_cdn_refresh',
    description: 'Refresh CDN cache for URLs or paths',
    parameters: {
      objectPath: { type: 'string', description: 'URL or directory to refresh' },
      objectType: { type: 'string', description: 'File or Directory' }
    },
    execute: async (params: any) => {
      const region = process.env.ALIYUN_REGION || 'cn-hangzhou'
      const type = params.objectType || 'File'
      const result = await safeExec(`aliyun cdn RefreshObjectCaches --region ${region} --ObjectPath "${params.objectPath}" --ObjectType ${type} 2>&1`)
      return {
        path: params.objectPath,
        type: type,
        result: result.substring(0, 500)
      }
    }
  })
  .build()
