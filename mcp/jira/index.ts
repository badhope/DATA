import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 30000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

async function jiraAPI(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
  const email = process.env.JIRA_EMAIL
  const token = process.env.JIRA_API_TOKEN
  const domain = process.env.JIRA_DOMAIN
  const auth = email && token ? `-u ${email}:${token}` : ''
  const bodyArg = body ? `-H "Content-Type: application/json" -d '${JSON.stringify(body).replace(/'/g, "'\\''")}'` : ''
  const result = await safeExec(`curl -s -X ${method} ${auth} ${bodyArg} https://${domain}.atlassian.net/rest/api/3${endpoint}`)
  try { return JSON.parse(result) } catch { return { error: result } }
}

export default createMCPServer({
  name: 'jira',
  version: '1.0.0',
  description: 'Jira API toolkit - Manage projects, issues, sprints, workflows with API token',
  icon: '📋',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Project Management', 'API Integration'],
    rating: 'intermediate',
    features: ['Issue Tracking', 'Sprint Management', 'Project Planning', 'Workflow Automation']
  })
  .addTool({
    name: 'jira_set_auth',
    description: 'Configure Jira authentication with domain, email, and API token',
    parameters: {
      domain: { type: 'string', description: 'Jira cloud domain (e.g., yourcompany)' },
      email: { type: 'string', description: 'Atlassian account email' },
      token: { type: 'string', description: 'Jira API token' }
    },
    execute: async (params: any) => {
      process.env.JIRA_DOMAIN = params.domain
      process.env.JIRA_EMAIL = params.email
      process.env.JIRA_API_TOKEN = params.token
      return { 
        success: true, 
        message: 'Jira authentication configured successfully',
        baseUrl: `https://${params.domain}.atlassian.net`,
        createToken: 'https://id.atlassian.com/manage-profile/security/api-tokens'
      }
    }
  })
  .addTool({
    name: 'jira_get_myself',
    description: 'Get current user profile information',
    parameters: {},
    execute: async () => {
      const result = await jiraAPI('/myself')
      return {
        accountId: result.accountId,
        displayName: result.displayName,
        email: result.emailAddress,
        locale: result.locale,
        timezone: result.timeZone
      }
    }
  })
  .addTool({
    name: 'jira_list_projects',
    description: 'List all accessible Jira projects',
    parameters: {
      startAt: { type: 'number', description: 'Start index' },
      maxResults: { type: 'number', description: 'Max results' }
    },
    execute: async (params: any) => {
      const startAt = params.startAt || 0
      const maxResults = params.maxResults || 50
      const result = await jiraAPI(`/project/search?startAt=${startAt}&maxResults=${maxResults}`)
      return {
        total: result.total,
        projects: result.values?.map((p: any) => ({
          id: p.id,
          key: p.key,
          name: p.name,
          type: p.projectTypeKey,
          category: p.projectCategory?.name,
          lead: p.lead?.displayName,
          url: `https://${process.env.JIRA_DOMAIN}.atlassian.net/browse/${p.key}`
        })) || [],
        error: result.errorMessages?.[0]
      }
    }
  })
  .addTool({
    name: 'jira_search_issues',
    description: 'Search issues using JQL query',
    parameters: {
      jql: { type: 'string', description: 'JQL query (e.g., project = "PROJ" AND status != Done)' },
      startAt: { type: 'number', description: 'Start index' },
      maxResults: { type: 'number', description: 'Max results' },
      fields: { type: 'string', description: 'Comma-separated fields to return' }
    },
    execute: async (params: any) => {
      const startAt = params.startAt || 0
      const maxResults = params.maxResults || 50
      const fieldsParam = params.fields || 'summary,status,assignee,priority,created,updated'
      const result = await jiraAPI('/search', 'POST', {
        jql: params.jql,
        startAt,
        maxResults,
        fields: fieldsParam.split(',').map((f: string) => f.trim())
      })
      return {
        total: result.total,
        issues: result.issues?.map((issue: any) => ({
          id: issue.id,
          key: issue.key,
          summary: issue.fields?.summary,
          status: issue.fields?.status?.name,
          assignee: issue.fields?.assignee?.displayName,
          priority: issue.fields?.priority?.name,
          created: issue.fields?.created,
          updated: issue.fields?.updated,
          url: `https://${process.env.JIRA_DOMAIN}.atlassian.net/browse/${issue.key}`
        })) || [],
        error: result.errorMessages?.[0]
      }
    }
  })
  .addTool({
    name: 'jira_get_issue',
    description: 'Get detailed information about a specific issue',
    parameters: {
      issueKey: { type: 'string', description: 'Issue key (e.g., PROJ-123)' }
    },
    execute: async (params: any) => {
      const result = await jiraAPI(`/issue/${params.issueKey}`)
      return {
        key: result.key,
        summary: result.fields?.summary,
        description: result.fields?.description?.content?.[0]?.content?.[0]?.text,
        issueType: result.fields?.issuetype?.name,
        status: result.fields?.status?.name,
        priority: result.fields?.priority?.name,
        assignee: result.fields?.assignee?.displayName,
        reporter: result.fields?.reporter?.displayName,
        created: result.fields?.created,
        updated: result.fields?.updated,
        labels: result.fields?.labels,
        comments: result.fields?.comment?.comments?.map((c: any) => ({
          author: c.author?.displayName,
          body: c.body?.content?.[0]?.content?.[0]?.text,
          created: c.created
        })),
        url: `https://${process.env.JIRA_DOMAIN}.atlassian.net/browse/${result.key}`,
        error: result.errorMessages?.[0]
      }
    }
  })
  .addTool({
    name: 'jira_create_issue',
    description: 'Create a new Jira issue',
    parameters: {
      projectKey: { type: 'string', description: 'Project key' },
      summary: { type: 'string', description: 'Issue summary/title' },
      description: { type: 'string', description: 'Issue description' },
      issueType: { type: 'string', description: 'Issue type: Bug, Task, Story, Epic' },
      priority: { type: 'string', description: 'Priority: Highest, High, Medium, Low, Lowest' },
      assigneeId: { type: 'string', description: 'Assignee account ID' },
      labels: { type: 'string', description: 'Comma-separated labels' }
    },
    execute: async (params: any) => {
      const fields: any = {
        project: { key: params.projectKey },
        summary: params.summary,
        issuetype: { name: params.issueType || 'Task' }
      }
      
      if (params.description) {
        fields.description = {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: params.description }]
          }]
        }
      }
      if (params.priority) fields.priority = { name: params.priority }
      if (params.assigneeId) fields.assignee = { id: params.assigneeId }
      if (params.labels) fields.labels = params.labels.split(',').map((l: string) => l.trim())
      
      const result = await jiraAPI('/issue', 'POST', { fields })
      return {
        success: !result.errorMessages,
        key: result.key,
        id: result.id,
        url: `https://${process.env.JIRA_DOMAIN}.atlassian.net/browse/${result.key}`,
        error: result.errorMessages?.[0]
      }
    }
  })
  .addTool({
    name: 'jira_update_issue',
    description: 'Update an existing issue',
    parameters: {
      issueKey: { type: 'string', description: 'Issue key' },
      summary: { type: 'string', description: 'New issue summary' },
      description: { type: 'string', description: 'New issue description' },
      status: { type: 'string', description: 'New status name' },
      assigneeId: { type: 'string', description: 'New assignee account ID' },
      priority: { type: 'string', description: 'New priority name' }
    },
    execute: async (params: any) => {
      const fields: any = {}
      if (params.summary) fields.summary = params.summary
      if (params.priority) fields.priority = { name: params.priority }
      if (params.assigneeId) fields.assignee = { id: params.assigneeId }
      if (params.description) {
        fields.description = {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: params.description }]
          }]
        }
      }
      
      const result = await jiraAPI(`/issue/${params.issueKey}`, 'PUT', { fields })
      return {
        success: !result || !result.errorMessages,
        issueKey: params.issueKey,
        error: result?.errorMessages?.[0]
      }
    }
  })
  .addTool({
    name: 'jira_add_comment',
    description: 'Add a comment to an issue',
    parameters: {
      issueKey: { type: 'string', description: 'Issue key' },
      comment: { type: 'string', description: 'Comment text' }
    },
    execute: async (params: any) => {
      const body = {
        body: {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: params.comment }]
          }]
        }
      }
      const result = await jiraAPI(`/issue/${params.issueKey}/comment`, 'POST', body)
      return {
        success: !result.errorMessages,
        commentId: result.id,
        author: result.author?.displayName,
        created: result.created,
        error: result.errorMessages?.[0]
      }
    }
  })
  .addTool({
    name: 'jira_list_sprints',
    description: 'List sprints for a board',
    parameters: {
      boardId: { type: 'number', description: 'Board ID' },
      state: { type: 'string', description: 'Sprint state: active, future, closed' },
      startAt: { type: 'number', description: 'Start index' },
      maxResults: { type: 'number', description: 'Max results' }
    },
    execute: async (params: any) => {
      const state = params.state || 'active'
      const startAt = params.startAt || 0
      const maxResults = params.maxResults || 50
      const result = await jiraAPI(`/board/${params.boardId}/sprint?state=${state}&startAt=${startAt}&maxResults=${maxResults}`)
      return {
        total: result.total,
        sprints: result.values?.map((s: any) => ({
          id: s.id,
          name: s.name,
          state: s.state,
          startDate: s.startDate,
          endDate: s.endDate,
          goal: s.goal
        })) || [],
        error: result.errorMessages?.[0]
      }
    }
  })
  .build()
