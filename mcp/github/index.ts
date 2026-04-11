import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 30000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

async function githubAPI(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
  const token = process.env.GITHUB_TOKEN
  const headers = `-H "Authorization: token ${token}" -H "Content-Type: application/json"`
  const bodyArg = body ? `-d '${JSON.stringify(body).replace(/'/g, "'\\''")}'` : ''
  const result = await safeExec(`curl -s -X ${method} ${headers} ${bodyArg} https://api.github.com${endpoint}`)
  try { return JSON.parse(result) } catch { return { error: result } }
}

export default createMCPServer({
  name: 'github',
  version: '1.0.0',
  description: 'GitHub API toolkit - Manage repositories, PRs, issues, releases with personal access token',
  icon: '🐙',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['API Integration', 'DevOps'],
    rating: 'intermediate',
    features: ['Repository Management', 'Pull Requests', 'Issues', 'Releases']
  })
  .addTool({
    name: 'github_set_token',
    description: 'Set GitHub Personal Access Token for authenticated API calls',
    parameters: {
      token: { type: 'string', description: 'GitHub Personal Access Token (repo scope)' }
    },
    execute: async (params: any) => {
      process.env.GITHUB_TOKEN = params.token
      await safeExec(`git config --global github.token ${params.token}`)
      return { 
        success: true, 
        message: 'GitHub token configured successfully',
        scopes: 'repo, workflow, write:packages, delete:packages',
        createToken: 'https://github.com/settings/tokens'
      }
    }
  })
  .addTool({
    name: 'github_get_user',
    description: 'Get authenticated user and rate limit information',
    parameters: {},
    execute: async () => {
      const user = await githubAPI('/user')
      const rateLimit = await githubAPI('/rate_limit')
      return { user, rateLimit: rateLimit.rate }
    }
  })
  .addTool({
    name: 'github_list_repos',
    description: 'List all repositories for authenticated user',
    parameters: {
      type: { type: 'string', description: 'Filter: all, owner, public, private' },
      perPage: { type: 'number', description: 'Results per page' }
    },
    execute: async (params: any) => {
      const type = params.type || 'owner'
      const perPage = params.perPage || 30
      const repos = await githubAPI(`/user/repos?type=${type}&per_page=${perPage}`)
      return {
        count: Array.isArray(repos) ? repos.length : 0,
        repositories: Array.isArray(repos) ? repos.map((r: any) => ({
          name: r.full_name,
          description: r.description,
          stars: r.stargazers_count,
          forks: r.forks_count,
          url: r.html_url,
          private: r.private
        })) : []
      }
    }
  })
  .addTool({
    name: 'github_create_repo',
    description: 'Create a new GitHub repository',
    parameters: {
      name: { type: 'string', description: 'Repository name' },
      description: { type: 'string', description: 'Project description' },
      private: { type: 'boolean', description: 'Make repository private' },
      autoInit: { type: 'boolean', description: 'Initialize with README' }
    },
    execute: async (params: any) => {
      const result = await githubAPI('/user/repos', 'POST', {
        name: params.name,
        description: params.description || '',
        private: params.private || false,
        auto_init: params.autoInit !== false
      })
      return {
        success: !result.message,
        repository: result.html_url || result.message,
        cloneUrl: result.clone_url,
        error: result.message
      }
    }
  })
  .addTool({
    name: 'github_list_prs',
    description: 'List pull requests for a repository',
    parameters: {
      owner: { type: 'string', description: 'Repository owner' },
      repo: { type: 'string', description: 'Repository name' },
      state: { type: 'string', description: 'Filter: open, closed, all' }
    },
    execute: async (params: any) => {
      const state = params.state || 'open'
      const prs = await githubAPI(`/repos/${params.owner}/${params.repo}/pulls?state=${state}`)
      return {
        count: Array.isArray(prs) ? prs.length : 0,
        pullRequests: Array.isArray(prs) ? prs.map((pr: any) => ({
          number: pr.number,
          title: pr.title,
          author: pr.user?.login,
          state: pr.state,
          url: pr.html_url,
          createdAt: pr.created_at
        })) : []
      }
    }
  })
  .addTool({
    name: 'github_create_issue',
    description: 'Create a new issue in a repository',
    parameters: {
      owner: { type: 'string', description: 'Repository owner' },
      repo: { type: 'string', description: 'Repository name' },
      title: { type: 'string', description: 'Issue title' },
      body: { type: 'string', description: 'Issue description (markdown supported)' },
      labels: { type: 'string', description: 'Comma-separated label names' }
    },
    execute: async (params: any) => {
      const labels = params.labels?.split(',').map((l: string) => l.trim()).filter(Boolean) || []
      const result = await githubAPI(`/repos/${params.owner}/${params.repo}/issues`, 'POST', {
        title: params.title,
        body: params.body || '',
        labels
      })
      return {
        success: !result.message,
        issueNumber: result.number,
        url: result.html_url,
        error: result.message
      }
    }
  })
  .addTool({
    name: 'github_list_issues',
    description: 'List issues for a repository',
    parameters: {
      owner: { type: 'string', description: 'Repository owner' },
      repo: { type: 'string', description: 'Repository name' },
      state: { type: 'string', description: 'Filter: open, closed, all' },
      labels: { type: 'string', description: 'Comma-separated label names' }
    },
    execute: async (params: any) => {
      const state = params.state || 'open'
      const labels = params.labels || ''
      const issues = await githubAPI(`/repos/${params.owner}/${params.repo}/issues?state=${state}&labels=${labels}`)
      return {
        count: Array.isArray(issues) ? issues.filter((i: any) => !i.pull_request).length : 0,
        issues: Array.isArray(issues) ? issues.filter((i: any) => !i.pull_request).map((issue: any) => ({
          number: issue.number,
          title: issue.title,
          author: issue.user?.login,
          state: issue.state,
          labels: issue.labels?.map((l: any) => l.name).join(', '),
          url: issue.html_url
        })) : []
      }
    }
  })
  .addTool({
    name: 'github_create_release',
    description: 'Create a new release for a repository',
    parameters: {
      owner: { type: 'string', description: 'Repository owner' },
      repo: { type: 'string', description: 'Repository name' },
      tagName: { type: 'string', description: 'Tag name for the release' },
      target: { type: 'string', description: 'Target commitish (branch or SHA)' },
      name: { type: 'string', description: 'Release title' },
      body: { type: 'string', description: 'Release notes' },
      draft: { type: 'boolean', description: 'Is draft release' },
      prerelease: { type: 'boolean', description: 'Is pre-release' }
    },
    execute: async (params: any) => {
      const result = await githubAPI(`/repos/${params.owner}/${params.repo}/releases`, 'POST', {
        tag_name: params.tagName,
        target_commitish: params.target || 'main',
        name: params.name || params.tagName,
        body: params.body || '',
        draft: params.draft || false,
        prerelease: params.prerelease || false
      })
      return {
        success: !result.message,
        releaseUrl: result.html_url,
        uploadUrl: result.upload_url,
        error: result.message
      }
    }
  })
  .build()
