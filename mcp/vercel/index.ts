import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 30000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

async function vercelAPI(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
  const token = process.env.VERCEL_TOKEN
  const headers = `-H "Authorization: Bearer ${token}" -H "Content-Type: application/json"`
  const bodyArg = body ? `-d '${JSON.stringify(body).replace(/'/g, "'\\''")}'` : ''
  const result = await safeExec(`curl -s -X ${method} ${headers} ${bodyArg} https://api.vercel.com${endpoint}`)
  try { return JSON.parse(result) } catch { return { error: result } }
}

export default createMCPServer({
  name: 'vercel',
  version: '1.0.0',
  description: 'Vercel API toolkit - Manage deployments, projects, domains with authentication token',
  icon: '▲',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['API Integration', 'DevOps', 'Cloud'],
    rating: 'intermediate',
    features: ['Deployments', 'Projects', 'Domains', 'Environment Variables', 'Logs']
  })
  .addTool({
    name: 'vercel_set_token',
    description: 'Set Vercel authentication token',
    parameters: {
      token: { type: 'string', description: 'Vercel API Token' },
      teamId: { type: 'string', description: 'Optional Team ID for team operations' }
    },
    execute: async (params: any) => {
      process.env.VERCEL_TOKEN = params.token
      if (params.teamId) process.env.VERCEL_TEAM_ID = params.teamId
      return { 
        success: true, 
        message: 'Vercel token configured successfully',
        createToken: 'https://vercel.com/account/tokens',
        cliHint: 'Install Vercel CLI: npm i -g vercel && vercel login'
      }
    }
  })
  .addTool({
    name: 'vercel_get_user',
    description: 'Get authenticated user information',
    parameters: {},
    execute: async () => {
      const result = await vercelAPI('/v2/user')
      return { user: result.user }
    }
  })
  .addTool({
    name: 'vercel_list_projects',
    description: 'List all Vercel projects',
    parameters: {
      limit: { type: 'number', description: 'Max results' },
      teamId: { type: 'string', description: 'Team ID (overrides env)' }
    },
    execute: async (params: any) => {
      const teamId = params.teamId || process.env.VERCEL_TEAM_ID
      const limit = params.limit || 50
      const teamParam = teamId ? `&teamId=${teamId}` : ''
      const result = await vercelAPI(`/v9/projects?limit=${limit}${teamParam}`)
      return {
        count: result.projects?.length || 0,
        projects: result.projects?.map((p: any) => ({
          name: p.name,
          url: `https://${p.name}.vercel.app`,
          framework: p.framework,
          updatedAt: new Date(p.updatedAt).toISOString(),
          targets: p.targets
        })) || [],
        error: result.error?.message
      }
    }
  })
  .addTool({
    name: 'vercel_create_project',
    description: 'Create a new Vercel project',
    parameters: {
      name: { type: 'string', description: 'Project name' },
      framework: { type: 'string', description: 'Framework preset' },
      envJson: { type: 'string', description: 'Environment variables as JSON string' },
      buildCommand: { type: 'string', description: 'Custom build command' },
      outputDirectory: { type: 'string', description: 'Output directory' },
      installCommand: { type: 'string', description: 'Custom install command' },
      teamId: { type: 'string', description: 'Team ID' }
    },
    execute: async (params: any) => {
      const teamId = params.teamId || process.env.VERCEL_TEAM_ID
      const teamParam = teamId ? `?teamId=${teamId}` : ''
      
      const body: any = {
        name: params.name,
        framework: params.framework || null,
        buildCommand: params.buildCommand || null,
        outputDirectory: params.outputDirectory || null,
        installCommand: params.installCommand || null
      }
      
      if (params.envJson) {
        try {
          const envVars = JSON.parse(params.envJson)
          body.environmentVariables = Object.entries(envVars).map(([key, value]) => ({
            key,
            value,
            target: ['production', 'preview', 'development'],
            type: 'encrypted'
          }))
        } catch {}
      }
      
      const result = await vercelAPI(`/v9/projects${teamParam}`, 'POST', body)
      return {
        success: !result.error,
        project: result.name ? {
          name: result.name,
          url: `https://${result.name}.vercel.app`,
          id: result.id
        } : null,
        projectId: result.id,
        error: result.error?.message
      }
    }
  })
  .addTool({
    name: 'vercel_list_deployments',
    description: 'List deployments for a project',
    parameters: {
      project: { type: 'string', description: 'Project name or ID' },
      limit: { type: 'number', description: 'Max results' },
      state: { type: 'string', description: 'Filter by state: BUILDING, READY, ERROR, CANCELED' },
      teamId: { type: 'string', description: 'Team ID' }
    },
    execute: async (params: any) => {
      const teamId = params.teamId || process.env.VERCEL_TEAM_ID
      const limit = params.limit || 20
      const projectParam = params.project ? `&project=${params.project}` : ''
      const stateParam = params.state ? `&state=${params.state}` : ''
      const teamParam = teamId ? `&teamId=${teamId}` : ''
      
      const result = await vercelAPI(`/v6/deployments?limit=${limit}${projectParam}${stateParam}${teamParam}`)
      return {
        count: result.deployments?.length || 0,
        deployments: result.deployments?.map((d: any) => ({
          uid: d.uid,
          name: d.name,
          url: d.url,
          state: d.state,
          creator: d.creator?.username,
          createdAt: new Date(d.createdAt).toISOString(),
          target: d.target
        })) || [],
        error: result.error?.message
      }
    }
  })
  .addTool({
    name: 'vercel_deploy',
    description: 'Trigger a deployment for current directory',
    parameters: {
      prod: { type: 'boolean', description: 'Deploy to production' },
      name: { type: 'string', description: 'Project name override' },
      token: { type: 'string', description: 'Override Vercel token' }
    },
    execute: async (params: any) => {
      const token = params.token || process.env.VERCEL_TOKEN || ''
      const prodFlag = params.prod ? '--prod' : ''
      const nameFlag = params.name ? `--name ${params.name}` : ''
      
      const result = await safeExec(`npx vercel deploy ${prodFlag} ${nameFlag} --token ${token} 2>&1`)
      
      const urlMatch = result.match(/https:\/\/[\w.-]+\.vercel\.app/)
      
      return {
        output: result,
        deploymentUrl: urlMatch?.[0],
        isProduction: params.prod || false
      }
    }
  })
  .addTool({
    name: 'vercel_add_domain',
    description: 'Assign a custom domain to a project',
    parameters: {
      projectId: { type: 'string', description: 'Project ID' },
      domain: { type: 'string', description: 'Custom domain name' },
      teamId: { type: 'string', description: 'Team ID' }
    },
    execute: async (params: any) => {
      const teamId = params.teamId || process.env.VERCEL_TEAM_ID
      const teamParam = teamId ? `?teamId=${teamId}` : ''
      
      const result = await vercelAPI(`/v9/projects/${params.projectId}/domains${teamParam}`, 'POST', {
        name: params.domain
      })
      
      return {
        success: !result.error,
        domain: result.name,
        verified: result.verified,
        verification: result.verification,
        error: result.error?.message
      }
    }
  })
  .addTool({
    name: 'vercel_set_env',
    description: 'Set environment variable for a project',
    parameters: {
      projectId: { type: 'string', description: 'Project ID' },
      key: { type: 'string', description: 'Environment variable name' },
      value: { type: 'string', description: 'Environment variable value' },
      target: { type: 'string', description: 'JSON array of targets: production, preview, development' },
      teamId: { type: 'string', description: 'Team ID' }
    },
    execute: async (params: any) => {
      const teamId = params.teamId || process.env.VERCEL_TEAM_ID
      const teamParam = teamId ? `?teamId=${teamId}` : ''
      let target: string[] = ['production', 'preview', 'development']
      
      if (params.target) {
        try {
          target = JSON.parse(params.target)
        } catch {}
      }
      
      const result = await vercelAPI(`/v9/projects/${params.projectId}/env${teamParam}`, 'POST', {
        key: params.key,
        value: params.value,
        target,
        type: 'encrypted'
      })
      
      return {
        success: !result.error,
        created: result.created,
        key: result.key,
        id: result.id,
        error: result.error?.message
      }
    }
  })
  .build()
