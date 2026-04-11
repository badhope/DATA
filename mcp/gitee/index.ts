import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 30000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

async function giteeAPI(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
  const token = process.env.GITEE_TOKEN
  const headers = token ? `-H "Authorization: token ${token}"` : ''
  const bodyArg = body ? `-H "Content-Type: application/json" -d '${JSON.stringify(body).replace(/'/g, "'\\''")}'` : ''
  const result = await safeExec(`curl -s -X ${method} ${headers} ${bodyArg} https://gitee.com/api/v5${endpoint}`)
  try { return JSON.parse(result) } catch { return { error: result.substring(0, 1000) } }
}

export default createMCPServer({
  name: 'gitee',
  version: '1.0.0',
  description: 'Gitee(码云) API toolkit - Manage repositories, PRs, Issues with personal access token',
  icon: '🐎',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['API Integration', 'DevOps'],
    rating: 'intermediate',
    features: ['Repository Management', 'Pull Requests', 'Issues', 'Gitee Pages']
  })
  .addTool({
    name: 'gitee_set_token',
    description: 'Set Gitee Personal Access Token for authenticated API calls',
    parameters: {
      token: {
        type: 'string',
        description: 'Gitee Personal Access Token (projects, user_info, repo, pull_requests, issues scopes)'
      }
    },
    execute: async (args: any) => {
      process.env.GITEE_TOKEN = args.token
      return { 
        success: true, 
        message: 'Gitee token configured successfully',
        scopes: 'projects, user_info, repo, pull_requests, issues, notes',
        apiDocs: 'https://gitee.com/api/v5/swagger'
      }
    }
  })
  .addTool({
    name: 'gitee_get_user',
    description: 'Get authenticated user information',
    parameters: {},
    execute: async () => {
      const user = await giteeAPI('/user')
      return {
        login: user.login,
        name: user.name,
        email: user.email,
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        avatar: user.avatar_url,
        raw: user
      }
    }
  })
  .addTool({
    name: 'gitee_list_repos',
    description: 'List user repositories',
    parameters: {
      type: { type: 'string', description: 'Repository type: owner, member, all' },
      sort: { type: 'string', description: 'Sort: created, updated, pushed, full_name' },
      perPage: { type: 'number', description: 'Results per page' },
      page: { type: 'number', description: 'Page number' }
    },
    execute: async (args: any) => {
      const type = args.type || 'owner'
      const sort = args.sort || 'updated'
      const perPage = args.perPage || 30
      const page = args.page || 1
      const repos = await giteeAPI(`/user/repos?type=${type}&sort=${sort}&per_page=${perPage}&page=${page}`)
      return {
        count: Array.isArray(repos) ? repos.length : 0,
        repositories: Array.isArray(repos) ? repos.map((r: any) => ({
          fullName: r.full_name,
          description: r.description,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language,
          defaultBranch: r.default_branch
        })) : [],
        page,
        perPage
      }
    }
  })
  .addTool({
    name: 'gitee_create_repo',
    description: 'Create a new repository',
    parameters: {
      name: { type: 'string', description: 'Repository name' },
      description: { type: 'string', description: 'Repository description' },
      private: { type: 'boolean', description: 'Make repository private' },
      autoInit: { type: 'boolean', description: 'Initialize with README' }
    },
    execute: async (args: any) => {
      const result = await giteeAPI('/user/repos', 'POST', {
        name: args.name,
        description: args.description,
        private: args.private || false,
        auto_init: args.autoInit || false
      })
      return {
        created: result.id ? true : false,
        url: result.html_url,
        ssh: result.ssh_url,
        clone: result.clone_url,
        raw: result
      }
    }
  })
  .addTool({
    name: 'gitee_list_prs',
    description: 'List pull requests for a repository',
    parameters: {
      owner: { type: 'string', description: 'Repository owner' },
      repo: { type: 'string', description: 'Repository name' },
      state: { type: 'string', description: 'State: open, closed, merged' },
      sort: { type: 'string', description: 'Sort: created, updated' }
    },
    execute: async (args: any) => {
      const state = args.state || 'open'
      const prs = await giteeAPI(`/repos/${args.owner}/${args.repo}/pulls?state=${state}`)
      return {
        count: Array.isArray(prs) ? prs.length : 0,
        pullRequests: Array.isArray(prs) ? prs.map((pr: any) => ({
          number: pr.number,
          title: pr.title,
          state: pr.state,
          author: pr.user?.login,
          createdAt: pr.created_at,
          htmlUrl: pr.html_url
        })) : [],
        raw: prs
      }
    }
  })
  .addTool({
    name: 'gitee_list_issues',
    description: 'List issues for a repository',
    parameters: {
      owner: { type: 'string', description: 'Repository owner' },
      repo: { type: 'string', description: 'Repository name' },
      state: { type: 'string', description: 'State: open, closed' },
      labels: { type: 'string', description: 'Comma separated list of labels' }
    },
    execute: async (args: any) => {
      const state = args.state || 'open'
      const labels = args.labels || ''
      const issues = await giteeAPI(`/repos/${args.owner}/${args.repo}/issues?state=${state}&labels=${labels}`)
      return {
        count: Array.isArray(issues) ? issues.length : 0,
        issues: Array.isArray(issues) ? issues.map((issue: any) => ({
          number: issue.number,
          title: issue.title,
          state: issue.state,
          author: issue.user?.login,
          labels: issue.labels?.map((l: any) => l.name).join(', '),
          createdAt: issue.created_at
        })) : [],
        raw: issues
      }
    }
  })
  .build()
