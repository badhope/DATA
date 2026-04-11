import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 30000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

async function sentryAPI(endpoint: string): Promise<any> {
  const token = process.env.SENTRY_AUTH_TOKEN
  const org = process.env.SENTRY_ORG
  const headers = token ? `-H "Authorization: Bearer ${token}"` : ''
  const result = await safeExec(`curl -s ${headers} https://sentry.io/api/0${endpoint}`)
  try { return JSON.parse(result) } catch { return { error: result.substring(0, 1000) } }
}

export default createMCPServer({
  name: 'sentry',
  version: '1.0.0',
  description: 'Sentry error monitoring - Track issues, performance, and application health',
  icon: '🛡️',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Monitoring', 'Development', 'DevOps'],
    rating: 'intermediate',
    features: ['Error Tracking', 'Performance Monitoring', 'Issue Management', 'Release Tracking']
  })
  .addTool({
    name: 'sentry_set_auth',
    description: 'Configure Sentry authentication token and organization',
    parameters: {
      token: { type: 'string', description: 'Sentry Auth Token (org:read, project:read, issue:read scopes)' },
      organization: { type: 'string', description: 'Sentry organization slug' }
    },
    execute: async (args: any) => {
      process.env.SENTRY_AUTH_TOKEN = args.token
      process.env.SENTRY_ORG = args.organization
      return { 
        success: true, 
        message: 'Sentry authentication configured successfully',
        createToken: 'https://sentry.io/settings/account/api/auth-tokens/'
      }
    }
  })
  .addTool({
    name: 'sentry_list_projects',
    description: 'List all projects in Sentry organization',
    parameters: {},
    execute: async () => {
      const org = process.env.SENTRY_ORG
      const projects = await sentryAPI(`/organizations/${org}/projects/`)
      return {
        count: Array.isArray(projects) ? projects.length : 0,
        projects: Array.isArray(projects) ? projects.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          platform: p.platform,
          status: p.status,
          errorCount: p.causeOfLatestIssue
        })) : [],
        raw: projects
      }
    }
  })
  .addTool({
    name: 'sentry_list_issues',
    description: 'List issues in a project',
    parameters: {
      project: { type: 'string', description: 'Project slug' },
      status: { type: 'string', description: 'Issue status: unresolved, resolved, ignored' },
      query: { type: 'string', description: 'Search query' },
      perPage: { type: 'number', description: 'Results per page' }
    },
    execute: async (args: any) => {
      const org = process.env.SENTRY_ORG
      const status = args.status || 'unresolved'
      const perPage = args.perPage || 25
      const query = args.query ? `&query=${encodeURIComponent(args.query)}` : ''
      const issues = await sentryAPI(`/organizations/${org}/issues/?project=${args.project}&status=${status}&per_page=${perPage}${query}`)
      return {
        count: Array.isArray(issues) ? issues.length : 0,
        issues: Array.isArray(issues) ? issues.map((i: any) => ({
          id: i.id,
          title: i.title,
          culprit: i.culprit,
          level: i.level,
          status: i.status,
          count: i.count,
          userCount: i.userCount,
          firstSeen: i.firstSeen,
          lastSeen: i.lastSeen,
          permalink: i.permalink
        })) : [],
        raw: issues
      }
    }
  })
  .addTool({
    name: 'sentry_get_issue_events',
    description: 'Get recent events for an issue',
    parameters: {
      issueId: { type: 'string', description: 'Issue ID' },
      perPage: { type: 'number', description: 'Results per page' }
    },
    execute: async (args: any) => {
      const perPage = args.perPage || 10
      const events = await sentryAPI(`/issues/${args.issueId}/events/?per_page=${perPage}`)
      return {
        count: Array.isArray(events) ? events.length : 0,
        events: Array.isArray(events) ? events.map((e: any) => ({
          id: e.id,
          dateCreated: e.dateCreated,
          message: e.message,
          platform: e.platform
        })) : [],
        raw: events
      }
    }
  })
  .addTool({
    name: 'sentry_get_release_health',
    description: 'Get release health statistics',
    parameters: {
      project: { type: 'string', description: 'Project slug' },
      perPage: { type: 'number', description: 'Results per page' }
    },
    execute: async (args: any) => {
      const org = process.env.SENTRY_ORG
      const perPage = args.perPage || 25
      const releases = await sentryAPI(`/organizations/${org}/releases/?project=${args.project}&per_page=${perPage}`)
      return {
        count: Array.isArray(releases) ? releases.length : 0,
        releases: Array.isArray(releases) ? releases.map((r: any) => ({
          version: r.version,
          dateReleased: r.dateReleased,
          newGroups: r.newGroups,
          events: r.events
        })) : [],
        raw: releases
      }
    }
  })
  .build()
