import { createMCPServer } from '../../packages/core/mcp/builder'
import * as fs from 'fs'
import * as path from 'path'

interface WorkflowStep {
  id: string
  name: string
  type: 'llm' | 'tool' | 'condition' | 'parallel' | 'loop'
  description: string
  input: string
  outputKey: string
  tool?: string
  toolParams?: Record<string, string>
  condition?: string
  maxIterations?: number
  nextOnSuccess?: string
  nextOnFail?: string
  branches?: Record<string, string>
}

interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  entryPoint: string
  version: string
  tags: string[]
  createdAt: number
}

interface WorkflowExecution {
  id: string
  workflowId: string
  currentStep: string
  state: Record<string, any>
  status: 'pending' | 'running' | 'completed' | 'failed'
  history: { step: string; result: any; timestamp: number }[]
  startedAt: number
  completedAt?: number
  error?: string
}

const WORKFLOW_DIR = path.join(process.cwd(), '.trae', 'agent')

function ensureWorkflowDir() {
  if (!fs.existsSync(WORKFLOW_DIR)) {
    fs.mkdirSync(WORKFLOW_DIR, { recursive: true })
  }
}

function loadWorkflows(): Record<string, Workflow> {
  ensureWorkflowDir()
  const file = path.join(WORKFLOW_DIR, 'workflows.json')
  if (fs.existsSync(file)) {
    try {
      return JSON.parse(fs.readFileSync(file, 'utf-8'))
    } catch {
      return {}
    }
  }
  return {}
}

function saveWorkflows(workflows: Record<string, Workflow>) {
  ensureWorkflowDir()
  fs.writeFileSync(path.join(WORKFLOW_DIR, 'workflows.json'), JSON.stringify(workflows, null, 2), 'utf-8')
}

function loadExecutions(): Record<string, WorkflowExecution> {
  ensureWorkflowDir()
  const file = path.join(WORKFLOW_DIR, 'executions.json')
  if (fs.existsSync(file)) {
    try {
      return JSON.parse(fs.readFileSync(file, 'utf-8'))
    } catch {
      return {}
    }
  }
  return {}
}

function saveExecutions(executions: Record<string, WorkflowExecution>) {
  ensureWorkflowDir()
  fs.writeFileSync(path.join(WORKFLOW_DIR, 'executions.json'), JSON.stringify(executions, null, 2), 'utf-8')
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 6)
}

const BUILTIN_WORKFLOWS: Workflow[] = [
  {
    id: 'research-writer',
    name: 'Research & Article Writer',
    description: 'Multi-step agent for researching topics and writing articles',
    version: '1.0.0',
    tags: ['research', 'writing', 'content'],
    entryPoint: 'research',
    createdAt: Date.now(),
    steps: [
      {
        id: 'research',
        name: 'Topic Research',
        type: 'llm',
        description: 'Gather comprehensive information about the topic',
        input: 'Research this topic thoroughly: {{topic}}. Cover history, current state, key players, trends, and controversies.',
        outputKey: 'researchNotes'
      },
      {
        id: 'outline',
        name: 'Create Outline',
        type: 'llm',
        description: 'Create structured article outline based on research',
        input: 'Based on this research, create a detailed article outline with introduction, 3-5 main sections, and conclusion:\n{{researchNotes}}',
        outputKey: 'outline',
        nextOnSuccess: 'draft'
      },
      {
        id: 'draft',
        name: 'Write First Draft',
        type: 'llm',
        description: 'Write complete first draft following outline',
        input: 'Write a complete 1000-word article using this research and outline:\n\nResearch: {{researchNotes}}\n\nOutline: {{outline}}\n\nWrite in a clear, engaging style.',
        outputKey: 'draft',
        nextOnSuccess: 'critique'
      },
      {
        id: 'critique',
        name: 'Self-Critique',
        type: 'llm',
        description: 'Critique own work for improvements',
        input: 'Critique this draft. What\'s weak? What\'s missing? How can it be stronger? Be specific:\n\n{{draft}}',
        outputKey: 'critique',
        nextOnSuccess: 'revise'
      },
      {
        id: 'revise',
        name: 'Revised Final Version',
        type: 'llm',
        description: 'Produce polished final version incorporating critique',
        input: 'Rewrite the article based on this critique. Make it excellent:\n\nOriginal Draft: {{draft}}\n\nCritique: {{critique}}',
        outputKey: 'finalArticle'
      }
    ]
  },
  {
    id: 'code-review-agent',
    name: 'Deep Code Review Agent',
    description: 'Multi-stage code review with analysis, suggestions, and verification',
    version: '1.0.0',
    tags: ['code', 'review', 'quality'],
    entryPoint: 'analyze',
    createdAt: Date.now(),
    steps: [
      {
        id: 'analyze',
        name: 'Static Analysis',
        type: 'tool',
        tool: 'code-review_analyze',
        description: 'Run static code analysis',
        input: '{{code}}',
        outputKey: 'staticAnalysis'
      },
      {
        id: 'security',
        name: 'Security Audit',
        type: 'llm',
        description: 'Check for security vulnerabilities',
        input: 'Analyze this code for security vulnerabilities. Look for OWASP Top 10 issues:\n\n{{code}}',
        outputKey: 'securityReport',
        nextOnSuccess: 'suggest'
      },
      {
        id: 'suggest',
        name: 'Improvement Suggestions',
        type: 'llm',
        description: 'Generate concrete improvement suggestions',
        input: 'Based on analysis, generate 5 specific actionable improvements with code examples:\n\nStatic Analysis: {{staticAnalysis}}\nSecurity Report: {{securityReport}}\n\nOriginal Code: {{code}}',
        outputKey: 'suggestions',
        nextOnSuccess: 'verify'
      },
      {
        id: 'verify',
        name: 'Suggestion Validation',
        type: 'llm',
        description: 'Verify suggestions don\'t introduce new issues',
        input: 'Double-check these suggestions. Would any break things? Are they idiomatic?\n\nSuggestions: {{suggestions}}',
        outputKey: 'verification'
      }
    ]
  },
  {
    id: 'debug-agent',
    name: 'Debugging Agent',
    description: 'Systematic debugging workflow with root cause analysis',
    version: '1.0.0',
    tags: ['debugging', 'troubleshooting', 'support'],
    entryPoint: 'reproduce',
    createdAt: Date.now(),
    steps: [
      {
        id: 'reproduce',
        name: 'Reproduction Plan',
        type: 'llm',
        description: 'Create plan to reproduce the bug',
        input: 'Create step-by-step reproduction plan for this bug. What information is missing? What do we need to verify?\n\nProblem: {{problem}}\nError: {{errorMessage}}\nEnvironment: {{environment}}',
        outputKey: 'reproSteps',
        nextOnSuccess: 'hypothesize'
      },
      {
        id: 'hypothesize',
        name: 'Generate Hypotheses',
        type: 'llm',
        description: 'Generate possible root causes',
        input: 'Generate 3-5 testable hypotheses for the root cause. Rank by likelihood:\n\nProblem: {{problem}}\nReproduction: {{reproSteps}}',
        outputKey: 'hypotheses',
        nextOnSuccess: 'test'
      },
      {
        id: 'test',
        name: 'Test Each Hypothesis',
        type: 'loop',
        maxIterations: 5,
        description: 'Test hypotheses until culprit found',
        input: 'Test hypothesis #{{iteration}}. Design experiment to confirm or refute:\n\n{{hypotheses}}',
        outputKey: 'testResults',
        nextOnSuccess: 'fix'
      },
      {
        id: 'fix',
        name: 'Implement & Verify Fix',
        type: 'llm',
        description: 'Implement fix and verify it works',
        input: 'Implement the fix. Then write tests to verify:\n\nRoot Cause: {{testResults}}\nOriginal Code: {{code}}',
        outputKey: 'fix'
      }
    ]
  }
]

export default createMCPServer({
  name: 'agent',
  version: '1.0.0',
  description: 'Agent Workflow Orchestrator - Build and execute multi-step AI agent workflows',
  icon: '🤖',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['AI Agent', 'Workflow', 'Automation', 'Orchestration'],
    rating: 'advanced',
    features: ['Workflow Builder', 'Step Execution', 'State Management', 'Loop/Condition Logic']
  })

  .addTool({
    name: 'agent_list_workflows',
    description: 'List all available agent workflows',
    parameters: {
      tag: { type: 'string', description: 'Filter by tag' }
    },
    execute: async (params: any) => {
      const custom = Object.values(loadWorkflows())
      const all = [...BUILTIN_WORKFLOWS, ...custom]
      
      let filtered = all
      if (params.tag) {
        filtered = all.filter(w => w.tags.includes(params.tag))
      }
      
      return {
        total: filtered.length,
        builtin: BUILTIN_WORKFLOWS.length,
        custom: custom.length,
        tags: [...new Set(all.flatMap(w => w.tags))],
        workflows: filtered.map(w => ({
          id: w.id,
          name: w.name,
          description: w.description,
          steps: w.steps.length,
          tags: w.tags,
          version: w.version,
          type: BUILTIN_WORKFLOWS.some(b => b.id === w.id) ? 'builtin' : 'custom'
        }))
      }
    }
  })

  .addTool({
    name: 'agent_get_workflow',
    description: 'Get detailed workflow definition',
    parameters: {
      workflowId: { type: 'string', description: 'Workflow ID' }
    },
    execute: async (params: any) => {
      const custom = loadWorkflows()
      const workflow = BUILTIN_WORKFLOWS.find(w => w.id === params.workflowId) || custom[params.workflowId]
      
      if (!workflow) {
        return { success: false, message: `Workflow '${params.workflowId}' not found` }
      }
      
      return {
        success: true,
        workflow: {
          id: workflow.id,
          name: workflow.name,
          description: workflow.description,
          entryPoint: workflow.entryPoint,
          stepsCount: workflow.steps.length,
          tags: workflow.tags,
          version: workflow.version
        },
        steps: workflow.steps.map(s => ({
          id: s.id,
          name: s.name,
          type: s.type,
          description: s.description,
          outputsTo: s.outputKey,
          nextStep: s.nextOnSuccess || 'complete workflow'
        }))
      }
    }
  })

  .addTool({
    name: 'agent_start_workflow',
    description: 'Start executing a workflow',
    parameters: {
      workflowId: { type: 'string', description: 'Workflow ID' },
      input: { type: 'string', description: 'JSON initial input variables' }
    },
    execute: async (params: any) => {
      const custom = loadWorkflows()
      const workflow = BUILTIN_WORKFLOWS.find(w => w.id === params.workflowId) || custom[params.workflowId]
      
      if (!workflow) {
        return { success: false, message: `Workflow '${params.workflowId}' not found` }
      }
      
      const executions = loadExecutions()
      const executionId = generateId()
      
      const initialState = params.input ? JSON.parse(params.input) : {}
      
      const firstStep = workflow.steps.find(s => s.id === workflow.entryPoint) || workflow.steps[0]
      
      executions[executionId] = {
        id: executionId,
        workflowId: workflow.id,
        currentStep: firstStep.id,
        state: initialState,
        status: 'running',
        history: [],
        startedAt: Date.now()
      }
      
      saveExecutions(executions)
      
      return {
        success: true,
        executionId,
        workflow: workflow.name,
        nextStep: {
          id: firstStep.id,
          name: firstStep.name,
          type: firstStep.type,
          description: firstStep.description,
          prompt: firstStep.input
        },
        initialState,
        message: `Workflow '${workflow.name}' started. Ready to execute first step.`
      }
    }
  })

  .addTool({
    name: 'agent_step_result',
    description: 'Submit step result and advance to next step',
    parameters: {
      executionId: { type: 'string', description: 'Execution ID' },
      stepResult: { type: 'string', description: 'Result of step execution' },
      success: { type: 'boolean', description: 'Whether step succeeded' }
    },
    execute: async (params: any) => {
      const executions = loadExecutions()
      const exec = executions[params.executionId]
      
      if (!exec) {
        return { success: false, message: 'Execution not found' }
      }
      
      const custom = loadWorkflows()
      const workflow = BUILTIN_WORKFLOWS.find(w => w.id === exec.workflowId) || custom[exec.workflowId]
      const currentStep = workflow.steps.find(s => s.id === exec.currentStep)
      
      if (!currentStep) {
        return { success: false, message: 'Current step not found in workflow' }
      }
      
      exec.state[currentStep.outputKey] = params.stepResult
      exec.history.push({
        step: exec.currentStep,
        result: params.stepResult.substring(0, 200) + (params.stepResult.length > 200 ? '...' : ''),
        timestamp: Date.now()
      })
      
      let nextStepId: string | null = null
      
      if (params.success) {
        nextStepId = currentStep.nextOnSuccess || null
      } else {
        nextStepId = currentStep.nextOnFail || null
      }
      
      if (!nextStepId) {
        const currentIdx = workflow.steps.findIndex(s => s.id === exec.currentStep)
        if (currentIdx < workflow.steps.length - 1) {
          nextStepId = workflow.steps[currentIdx + 1].id
        }
      }
      
      const nextStep = nextStepId ? workflow.steps.find(s => s.id === nextStepId) : null
      
      if (nextStep) {
        exec.currentStep = nextStep.id
        
        let prompt = nextStep.input
        Object.entries(exec.state).forEach(([key, value]) => {
          prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), String(value))
        })
        
        saveExecutions(executions)
        
        return {
          success: true,
          executionId: params.executionId,
          completedStep: currentStep.name,
          stateKeys: Object.keys(exec.state),
          nextStep: {
            id: nextStep.id,
            name: nextStep.name,
            type: nextStep.type,
            description: nextStep.description,
            prompt
          },
          progress: `${exec.history.length}/${workflow.steps.length} steps`,
          message: `Completed '${currentStep.name}'. Ready for '${nextStep.name}'.`
        }
      } else {
        exec.status = 'completed'
        exec.completedAt = Date.now()
        saveExecutions(executions)
        
        return {
          success: true,
          executionId: params.executionId,
          status: 'completed',
          completedSteps: exec.history.length,
          finalState: Object.keys(exec.state),
          durationMs: exec.completedAt - exec.startedAt,
          message: `🎉 Workflow complete! All ${exec.history.length} steps finished successfully.`
        }
      }
    }
  })

  .addTool({
    name: 'agent_list_executions',
    description: 'List workflow executions',
    parameters: {
      status: { type: 'string', description: 'Filter by status: running, completed, failed' },
      limit: { type: 'number', description: 'Max results' }
    },
    execute: async (params: any) => {
      const executions = Object.values(loadExecutions())
      
      let filtered = executions
      if (params.status) {
        filtered = executions.filter(e => e.status === params.status)
      }
      
      filtered.sort((a, b) => b.startedAt - a.startedAt)
      filtered = filtered.slice(0, params.limit || 20)
      
      return {
        total: executions.length,
        running: executions.filter(e => e.status === 'running').length,
        completed: executions.filter(e => e.status === 'completed').length,
        executions: filtered.map(e => ({
          id: e.id,
          workflowId: e.workflowId,
          status: e.status,
          currentStep: e.currentStep,
          stepsCompleted: e.history.length,
          started: new Date(e.startedAt).toISOString()
        }))
      }
    }
  })

  .addTool({
    name: 'agent_create_workflow',
    description: 'Create custom agent workflow',
    parameters: {
      name: { type: 'string', description: 'Workflow name' },
      description: { type: 'string', description: 'Workflow description' },
      tags: { type: 'string', description: 'Comma-separated tags' }
    },
    execute: async (params: any) => {
      const workflows = loadWorkflows()
      const id = params.name.toLowerCase().replace(/\W+/g, '-')
      
      workflows[id] = {
        id,
        name: params.name,
        description: params.description,
        tags: (params.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        steps: [],
        entryPoint: '',
        version: '1.0.0',
        createdAt: Date.now()
      }
      
      saveWorkflows(workflows)
      
      return {
        success: true,
        workflowId: id,
        message: `Workflow '${params.name}' created. Use agent_add_step to add steps.`
      }
    }
  })

  .addTool({
    name: 'agent_add_step',
    description: 'Add step to custom workflow',
    parameters: {
      workflowId: { type: 'string', description: 'Workflow ID' },
      name: { type: 'string', description: 'Step name' },
      type: { type: 'string', description: 'Step type: llm, tool, condition' },
      description: { type: 'string', description: 'Step description' },
      inputTemplate: { type: 'string', description: 'Input prompt template (use {{var}} for placeholders)' },
      outputKey: { type: 'string', description: 'Key to store output in state' }
    },
    execute: async (params: any) => {
      const workflows = loadWorkflows()
      
      if (!workflows[params.workflowId]) {
        return { success: false, message: 'Custom workflow not found' }
      }
      
      const stepId = params.name.toLowerCase().replace(/\W+/g, '_')
      
      workflows[params.workflowId].steps.push({
        id: stepId,
        name: params.name,
        type: params.type as any,
        description: params.description,
        input: params.inputTemplate,
        outputKey: params.outputKey
      })
      
      if (!workflows[params.workflowId].entryPoint) {
        workflows[params.workflowId].entryPoint = stepId
      }
      
      saveWorkflows(workflows)
      
      return {
        success: true,
        stepId,
        workflow: params.workflowId,
        totalSteps: workflows[params.workflowId].steps.length,
        message: `Step '${params.name}' added to workflow`
      }
    }
  })

  .addTool({
    name: 'agent_react',
    description: 'Execute ReAct pattern: Reason + Act + Observe loop',
    parameters: {
      question: { type: 'string', description: 'User question' },
      maxIterations: { type: 'number', description: 'Max thought-action cycles' },
      tools: { type: 'string', description: 'JSON array of available tools' }
    },
    execute: async (params: any) => {
      const maxLoops = params.maxIterations || 5
      const availableTools = params.tools ? JSON.parse(params.tools) : ['Search', 'Calculate', 'Code Execute']
      
      const systemPrompt = `
Solve the user's question using the ReAct pattern:

THOUGHT: What do I know? What do I need to find out?
ACTION: [Tool Name] | [input to tool]
OBSERVATION: [tool result]

Repeat THOUGHT/ACTION/OBSERVATION until you have the answer.

FINAL ANSWER: [answer]

Available tools: ${availableTools.join(', ')}

Guidelines:
1. Always start with THOUGHT
2. Use tools when you don't know the answer
3. Don't make up information
4. Max ${maxLoops} iterations
5. End with FINAL ANSWER

User question: ${params.question}

Begin:`
      
      return {
        pattern: 'ReAct (Reasoning + Acting)',
        question: params.question,
        maxIterations: maxLoops,
        availableTools,
        systemPrompt,
        kickoff: 'THOUGHT:',
        message: 'ReAct pattern initialized'
      }
    }
  })

  .addTool({
    name: 'agent_reflexion',
    description: 'Reflexion pattern: Act -> Evaluate -> Reflect -> Improve',
    parameters: {
      task: { type: 'string', description: 'Task to perform iteratively' },
      maxTrials: { type: 'number', description: 'Max improvement cycles' },
      successCriteria: { type: 'string', description: 'What defines success?' }
    },
    execute: async (params: any) => {
      const trials = params.maxTrials || 3
      
      return {
        pattern: 'Reflexion',
        task: params.task,
        maxTrials: trials,
        successCriteria: params.successCriteria,
        phases: [
          'TRIAL 1: Generate first attempt',
          'EVALUATION 1: Score against rubric. Identify flaws.',
          'REFLECTION 1: What would make this better?',
          'TRIAL 2: Improved attempt',
          '...repeat until success criteria met...',
          'FINAL: Best version from all trials'
        ],
        systemPrompt: `
Reflexion - Iterative Self-Improvement

TASK: ${params.task}
SUCCESS CRITERIA: ${params.successCriteria}
MAX TRIALS: ${trials}

For EACH trial:
1. Create your best attempt
2. Score it 1-10 on each success criterion
3. Write specific, actionable feedback
4. List 3 concrete improvements to make
5. Create next version incorporating all feedback

IMPORTANT: Don't just say "improve", give SPECIFIC changes.

Start with TRIAL 1:
`,
        message: 'Reflexion improvement loop initialized'
      }
    }
  })
