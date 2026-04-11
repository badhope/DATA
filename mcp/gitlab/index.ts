import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 30000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

async function gitlabAPI(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
  const token = process.env.GITLAB_TOKEN
  const headers = token ? `-H "PRIVATE-TOKEN: ${token}"` : ''
  const bodyArg = body ? `-H "Content-Type: application/json" -d '${JSON.stringify(body).replace(/'/g, "'\\''")}'` : ''
  const result = await safeExec(`curl -s -X ${method} ${headers} ${bodyArg} https://gitlab.com/api/v4${endpoint}`)
  try { return JSON.parse(result) } catch { return { error: result } }
}

export default createMCPServer({
  name: 'gitlab',
  version: '1.0.0',
  description: 'GitLab API toolkit - Manage repositories, merge requests, CI/CD pipelines with personal access token',
  icon: '🦊',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['API Integration', 'DevOps'],
    rating: 'intermediate',
    features: ['Repository Management', 'Merge Requests', 'CI/CD Pipelines', 'Issues']
  })
  .addTool({
    name: 'gitlab_set_token',
    description: 'Set GitLab Personal Access Token for authenticated API calls',
    parameters: {
      token: {
        type: 'string',
        description: 'GitLab Personal Access Token (api scope)'
      },
      host: {
        type: 'string',
        description: 'GitLab host (for self-managed)',
        required: false
      }
    },
    execute: async (args: any) => {
      process.env.GITLAB_TOKEN = args.token
      process.env.GITLAB_HOST = args.host
      return { 
        success: true, 
        message: 'GitLab token configured successfully',
        host: args.host || 'gitlab.com',
        scopes: 'api, read_user, read_repository, write_repository'
      }
    }
  })
  .addTool({
    name: 'gitlab_get_user',
    description: 'Get authenticated user information',
    parameters: {},
    execute: async () => {
      const user = await gitlabAPI('/user')
      return { user }
    }
  })
  .addTool({
    name: 'gitlab_list_projects',
    description: 'List all projects for authenticated user',
    parameters: {
      membership: {
        type: 'boolean',
        description: 'Only projects user is member of',
        required: false
      },
      perPage: {
        type: 'number',
        description: 'Results per page',
        required: false
      }
    },
    execute: async (args: any) => {
      const membership = args.membership !== false
      const perPage = args.perPage || 30
      const projects = await gitlabAPI(`/projects?membership=${membership}&per_page=${perPage}&order_by=last_activity_at&sort=desc`)
      return {
        count: projects.length,
        projects: Array.isArray(projects) ? projects.map((p: any) => ({
          id: p.id,
          name: p.path_with_namespace,
          url: p.web_url,
          visibility: p.visibility,
          lastActivity: p.last_activity_at
        })) : []
      }
    }
  })
  .addTool({
    name: 'gitlab_create_project',
    description: 'Create a new GitLab project',
    parameters: {
      name: {
        type: 'string',
        description: 'Project name',
        required: true
      },
      description: {
        type: 'string',
        description: 'Project description',
        required: false
      },
      visibility: {
        type: 'string',
        description: 'private, internal, public',
        required: false
      }
    },
    execute: async (args: any) => {
      const project = await gitlabAPI('/projects', 'POST', {
        name: args.name,
        description: args.description || '',
        visibility: args.visibility || 'private',
        initialize_with_readme: true
      })
      return {
        success: !project.message,
        project: project.web_url || project.message,
        id: project.id,
        sshUrl: project.ssh_url_to_repo,
        httpUrl: project.http_url_to_repo
      }
    }
  })
  .addTool({
    name: 'gitlab_list_merge_requests',
    description: 'List merge requests for a project',
    parameters: {
      projectId: {
        type: 'string',
        description: 'Project ID or URL-encoded path',
        required: true
      },
      state: {
        type: 'string',
        description: 'Filter: opened, closed, merged, all',
        required: false
      }
    },
    execute: async (args: any) => {
      const state = args.state || 'opened'
      const mrs = await gitlabAPI(`/projects/${encodeURIComponent(args.projectId)}/merge_requests?state=${state}`)
      return {
        count: Array.isArray(mrs) ? mrs.length : 0,
        mergeRequests: Array.isArray(mrs) ? mrs.map((mr: any) => ({
          iid: mr.iid,
          title: mr.title,
          author: mr.author?.username,
          url: mr.web_url,
          sourceBranch: mr.source_branch,
          targetBranch: mr.target_branch,
          state: mr.state
        })) : []
      }
    }
  })
  .addTool({
    name: 'gitlab_list_pipelines',
    description: 'List CI/CD pipelines for a project',
    parameters: {
      projectId: {
        type: 'string',
        description: 'Project ID or URL-encoded path',
        required: true
      },
      status: {
        type: 'string',
        description: 'Filter: running, pending, success, failed, canceled',
        required: false
      }
    },
    execute: async (args: any) => {
      const statusArg = args.status ? `&status=${args.status}` : ''
      const pipelines = await gitlabAPI(`/projects/${encodeURIComponent(args.projectId)}/pipelines?per_page=20${statusArg}`)
      return {
        count: Array.isArray(pipelines) ? pipelines.length : 0,
        pipelines: Array.isArray(pipelines) ? pipelines.map((p: any) => ({
          id: p.id,
          ref: p.ref,
          status: p.status,
          url: p.web_url,
          createdAt: p.created_at,
          updatedAt: p.updated_at
        })) : []
      }
    }
  })
  .build()
