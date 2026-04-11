import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 60000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.stderr || e.message }
}

export default createMCPServer({
  name: 'aws',
  version: '1.0.0',
  description: 'AWS toolkit - Manage EC2, S3, Lambda, CloudFront, Route53, and more AWS services',
  icon: '🟠',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Cloud', 'DevOps', 'Infrastructure'],
    rating: 'intermediate',
    features: ['EC2 Management', 'S3 Storage', 'Lambda', 'CloudFront', 'Route53 DNS']
  })
  .addTool({
    name: 'aws_configure',
    description: 'Configure AWS credentials and region',
    parameters: {
      accessKeyId: { type: 'string', description: 'AWS Access Key ID' },
      secretAccessKey: { type: 'string', description: 'AWS Secret Access Key' },
      region: { type: 'string', description: 'Default region (e.g., us-east-1)' },
      profile: { type: 'string', description: 'AWS profile name (e.g., default)' }
    },
    execute: async (params: any) => {
      const profile = params.profile || 'default'
      const region = params.region || 'us-east-1'
      await safeExec(`aws configure set aws_access_key_id ${params.accessKeyId} --profile ${profile} 2>&1`)
      await safeExec(`aws configure set aws_secret_access_key ${params.secretAccessKey} --profile ${profile} 2>&1`)
      await safeExec(`aws configure set region ${region} --profile ${profile} 2>&1`)
      process.env.AWS_PROFILE = profile
      process.env.AWS_REGION = region
      return { 
        success: true,
        profile,
        region,
        message: 'AWS credentials configured successfully',
        docs: 'https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html'
      }
    }
  })
  .addTool({
    name: 'aws_sts_caller_identity',
    description: 'Verify credentials and get current account info',
    parameters: {},
    execute: async () => {
      const result = await safeExec('aws sts get-caller-identity --output json 2>&1')
      try {
        return JSON.parse(result)
      } catch {
        return { raw: result }
      }
    }
  })
  .addTool({
    name: 'aws_ec2_list',
    description: 'List EC2 instances',
    parameters: {
      region: { type: 'string', description: 'AWS region' },
      filters: { type: 'string', description: 'Filter instances, e.g., Name=instance-state-name,Values=running' }
    },
    execute: async (params: any) => {
      const region = params.region ? `--region ${params.region}` : ''
      const filters = params.filters ? `--filters "${params.filters}"` : ''
      const result = await safeExec(`aws ec2 describe-instances ${region} ${filters} --query "Reservations[*].Instances[*].{ID:InstanceId,Name:Tags[?Key=='Name']|[0].Value,State:State.Name,Type:InstanceType,IP:PublicIpAddress,LaunchTime:LaunchTime}" --output json 2>&1`)
      try {
        const data = JSON.parse(result)
        const instances = data.flat()
        return { count: instances.length, instances }
      } catch {
        return { raw: result.substring(0, 5000) }
      }
    }
  })
  .addTool({
    name: 'aws_ec2_start_stop',
    description: 'Start, stop, or reboot EC2 instance',
    parameters: {
      instanceId: { type: 'string', description: 'EC2 Instance ID' },
      action: { type: 'string', description: 'Action: start, stop, reboot, terminate' },
      region: { type: 'string', description: 'AWS region' }
    },
    execute: async (params: any) => {
      const region = params.region ? `--region ${params.region}` : ''
      const result = await safeExec(`aws ec2 ${params.action}-instances --instance-ids ${params.instanceId} ${region} 2>&1`)
      return {
        instanceId: params.instanceId,
        action: params.action,
        result
      }
    }
  })
  .addTool({
    name: 'aws_s3_list_buckets',
    description: 'List all S3 buckets',
    parameters: {
      region: { type: 'string', description: 'AWS region' }
    },
    execute: async (params: any) => {
      const region = params.region ? `--region ${params.region}` : ''
      const result = await safeExec(`aws s3api list-buckets ${region} --output json 2>&1`)
      try {
        const parsed = JSON.parse(result)
        return {
          count: parsed.Buckets?.length || 0,
          buckets: parsed.Buckets?.map((b: any) => ({
            name: b.Name,
            creationDate: b.CreationDate
          })) || [],
          owner: parsed.Owner
        }
      } catch {
        return { raw: result }
      }
    }
  })
  .addTool({
    name: 'aws_s3_list_objects',
    description: 'List objects in S3 bucket',
    parameters: {
      bucket: { type: 'string', description: 'Bucket name' },
      prefix: { type: 'string', description: 'Key prefix for filtering' },
      maxKeys: { type: 'number', description: 'Max number of keys' }
    },
    execute: async (params: any) => {
      const prefix = params.prefix ? `--prefix ${params.prefix}` : ''
      const maxKeys = params.maxKeys ? `--max-items ${params.maxKeys}` : ''
      const result = await safeExec(`aws s3api list-objects-v2 --bucket ${params.bucket} ${prefix} ${maxKeys} --output json 2>&1`)
      try {
        const parsed = JSON.parse(result)
        return {
          bucket: params.bucket,
          prefix: params.prefix,
          count: parsed.Contents?.length || 0,
          objects: parsed.Contents?.slice(0, 100).map((o: any) => ({
            key: o.Key,
            size: o.Size,
            lastModified: o.LastModified,
            etag: o.ETag
          })) || [],
          truncated: parsed.IsTruncated
        }
      } catch {
        return { raw: result.substring(0, 5000) }
      }
    }
  })
  .addTool({
    name: 'aws_s3_upload',
    description: 'Upload file to S3 bucket',
    parameters: {
      localPath: { type: 'string', description: 'Local file path' },
      bucket: { type: 'string', description: 'Bucket name' },
      key: { type: 'string', description: 'S3 object key' },
      acl: { type: 'string', description: 'ACL: private, public-read, etc.' }
    },
    execute: async (params: any) => {
      const acl = params.acl ? `--acl ${params.acl}` : ''
      const key = params.key || params.localPath.split('/').pop()
      const result = await safeExec(`aws s3 cp "${params.localPath}" s3://${params.bucket}/${key} ${acl} 2>&1`)
      return {
        local: params.localPath,
        destination: `s3://${params.bucket}/${key}`,
        result
      }
    }
  })
  .addTool({
    name: 'aws_s3_download',
    description: 'Download file from S3 bucket',
    parameters: {
      bucket: { type: 'string', description: 'Bucket name' },
      key: { type: 'string', description: 'S3 object key' },
      localPath: { type: 'string', description: 'Local destination path' }
    },
    execute: async (params: any) => {
      const dest = params.localPath || params.key.split('/').pop()
      const result = await safeExec(`aws s3 cp s3://${params.bucket}/${params.key} "${dest}" 2>&1`)
      return {
        source: `s3://${params.bucket}/${params.key}`,
        local: dest,
        result
      }
    }
  })
  .addTool({
    name: 'aws_lambda_list',
    description: 'List Lambda functions',
    parameters: {
      region: { type: 'string', description: 'AWS region' },
      maxItems: { type: 'number', description: 'Max number of functions' }
    },
    execute: async (params: any) => {
      const region = params.region ? `--region ${params.region}` : ''
      const maxItems = params.maxItems ? `--max-items ${params.maxItems}` : ''
      const result = await safeExec(`aws lambda list-functions ${region} ${maxItems} --output json 2>&1`)
      try {
        const parsed = JSON.parse(result)
        return {
          count: parsed.Functions?.length || 0,
          functions: parsed.Functions?.map((f: any) => ({
            name: f.FunctionName,
            runtime: f.Runtime,
            handler: f.Handler,
            memorySize: f.MemorySize,
            timeout: f.Timeout,
            lastModified: f.LastModified,
            arn: f.FunctionArn
          })) || []
        }
      } catch {
        return { raw: result.substring(0, 5000) }
      }
    }
  })
  .addTool({
    name: 'aws_lambda_invoke',
    description: 'Invoke a Lambda function',
    parameters: {
      functionName: { type: 'string', description: 'Lambda function name or ARN' },
      payload: { type: 'string', description: 'JSON payload as string' },
      region: { type: 'string', description: 'AWS region' }
    },
    execute: async (params: any) => {
      const region = params.region ? `--region ${params.region}` : ''
      const payload = params.payload ? `--payload '${params.payload.replace(/'/g, "'\\''")}'` : '--payload {}'
      const result = await safeExec(`aws lambda invoke ${region} --function-name ${params.functionName} ${payload} /dev/stdout 2>&1`)
      return {
        functionName: params.functionName,
        result
      }
    }
  })
  .addTool({
    name: 'aws_cloudfront_list',
    description: 'List CloudFront distributions',
    parameters: {
      maxItems: { type: 'number', description: 'Max number of distributions' }
    },
    execute: async (params: any) => {
      const maxItems = params.maxItems ? `--max-items ${params.maxItems}` : ''
      const result = await safeExec(`aws cloudfront list-distributions ${maxItems} --output json 2>&1`)
      try {
        const parsed = JSON.parse(result)
        const items = parsed.DistributionList?.Items || []
        return {
          count: items.length,
          distributions: items.map((d: any) => ({
            id: d.Id,
            domain: d.DomainName,
            status: d.Status,
            origins: d.Origins?.Quantity,
            enabled: d.Enabled,
            lastModified: d.LastModifiedTime
          }))
        }
      } catch {
        return { raw: result.substring(0, 5000) }
      }
    }
  })
  .addTool({
    name: 'aws_cloudfront_invalidate',
    description: 'Create CloudFront cache invalidation',
    parameters: {
      distributionId: { type: 'string', description: 'CloudFront distribution ID' },
      paths: { type: 'string', description: 'Paths to invalidate, e.g., "/*,/images/*"' }
    },
    execute: async (params: any) => {
      const items = params.paths?.split(',').map((p: string) => p.trim()) || ['/*']
      const result = await safeExec(`aws cloudfront create-invalidation --distribution-id ${params.distributionId} --paths ${items.join(' ')} 2>&1`)
      return {
        distributionId: params.distributionId,
        paths: items,
        result
      }
    }
  })
  .addTool({
    name: 'aws_route53_list_zones',
    description: 'List Route53 hosted zones',
    parameters: {
      maxItems: { type: 'string', description: 'Max number of zones' }
    },
    execute: async (params: any) => {
      const maxItems = params.maxItems ? `--max-items ${params.maxItems}` : ''
      const result = await safeExec(`aws route53 list-hosted-zones ${maxItems} --output json 2>&1`)
      try {
        const parsed = JSON.parse(result)
        return {
          count: parsed.HostedZones?.length || 0,
          zones: parsed.HostedZones?.map((z: any) => ({
            id: z.Id?.replace('/hostedzone/', ''),
            name: z.Name,
            private: z.Config?.PrivateZone,
            recordCount: z.ResourceRecordSetCount
          })) || []
        }
      } catch {
        return { raw: result }
      }
    }
  })
  .addTool({
    name: 'aws_route53_add_record',
    description: 'Create or update Route53 DNS record',
    parameters: {
      hostedZoneId: { type: 'string', description: 'Hosted Zone ID' },
      name: { type: 'string', description: 'Record name (e.g., subdomain.example.com)' },
      type: { type: 'string', description: 'Record type: A, CNAME, TXT, MX, etc.' },
      value: { type: 'string', description: 'Record value' },
      ttl: { type: 'number', description: 'TTL in seconds (e.g., 300 for 5 minutes)' }
    },
    execute: async (params: any) => {
      const ttl = params.ttl || 300
      const changeBatch = `{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"${params.name}","Type":"${params.type}","TTL":${ttl},"ResourceRecords":[{"Value":"${params.value}"}]}}]}`
      const result = await safeExec(`aws route53 change-resource-record-sets --hosted-zone-id ${params.hostedZoneId} --change-batch '${changeBatch}' 2>&1`)
      return {
        zoneId: params.hostedZoneId,
        record: `${params.name} ${params.type} ${params.value}`,
        result
      }
    }
  })
  .build()
