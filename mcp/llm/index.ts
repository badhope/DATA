import { createMCPServer } from '../../packages/core/mcp/builder'
import * as fs from 'fs'
import * as path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

interface ModelConfig {
  id: string
  name: string
  provider: string
  apiKeyEnv: string
  baseUrl?: string
  maxTokens: number
  costPer1KInput: number
  costPer1KOutput: number
  capabilities: string[]
  default?: boolean
}

interface LLMRequest {
  model: string
  systemPrompt: string
  userMessage: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

const CONFIG_DIR = path.join(process.cwd(), '.trae', 'llm')

function ensureConfigDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true })
  }
}

function loadModelConfigs(): ModelConfig[] {
  ensureConfigDir()
  const configFile = path.join(CONFIG_DIR, 'models.json')
  
  if (fs.existsSync(configFile)) {
    try {
      return JSON.parse(fs.readFileSync(configFile, 'utf-8'))
    } catch {
    }
  }
  
  const defaultModels: ModelConfig[] = [
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      provider: 'OpenAI',
      apiKeyEnv: 'OPENAI_API_KEY',
      maxTokens: 128000,
      costPer1KInput: 0.005,
      costPer1KOutput: 0.015,
      capabilities: ['text', 'vision', 'function-calling', 'json'],
      default: true
    },
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      apiKeyEnv: 'OPENAI_API_KEY',
      maxTokens: 128000,
      costPer1KInput: 0.01,
      costPer1KOutput: 0.03,
      capabilities: ['text', 'vision', 'function-calling', 'json']
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      apiKeyEnv: 'OPENAI_API_KEY',
      maxTokens: 16384,
      costPer1KInput: 0.0005,
      costPer1KOutput: 0.0015,
      capabilities: ['text', 'function-calling']
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      apiKeyEnv: 'ANTHROPIC_API_KEY',
      maxTokens: 200000,
      costPer1KInput: 0.015,
      costPer1KOutput: 0.075,
      capabilities: ['text', 'vision', 'long-context']
    },
    {
      id: 'claude-3-sonnet',
      name: 'Claude 3 Sonnet',
      provider: 'Anthropic',
      apiKeyEnv: 'ANTHROPIC_API_KEY',
      maxTokens: 200000,
      costPer1KInput: 0.003,
      costPer1KOutput: 0.015,
      capabilities: ['text', 'vision', 'long-context']
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'Google',
      apiKeyEnv: 'GOOGLE_API_KEY',
      maxTokens: 32768,
      costPer1KInput: 0.00025,
      costPer1KOutput: 0.0005,
      capabilities: ['text', 'vision', 'function-calling']
    },
    {
      id: 'mistral-large',
      name: 'Mistral Large',
      provider: 'Mistral',
      apiKeyEnv: 'MISTRAL_API_KEY',
      maxTokens: 32768,
      costPer1KInput: 0.004,
      costPer1KOutput: 0.012,
      capabilities: ['text', 'function-calling']
    },
    {
      id: 'llama3-70b',
      name: 'Llama 3 70B',
      provider: 'Meta',
      apiKeyEnv: 'TOGETHER_API_KEY',
      baseUrl: 'https://api.together.xyz',
      maxTokens: 8192,
      costPer1KInput: 0.0009,
      costPer1KOutput: 0.0009,
      capabilities: ['text', 'function-calling', 'open-source']
    },
    {
      id: 'qwen-max',
      name: '通义千问 Max',
      provider: 'Alibaba',
      apiKeyEnv: 'DASHSCOPE_API_KEY',
      maxTokens: 8192,
      costPer1KInput: 0.0004,
      costPer1KOutput: 0.0012,
      capabilities: ['text', 'long-context', 'chinese']
    },
    {
      id: 'deepseek-chat',
      name: 'DeepSeek Chat',
      provider: 'DeepSeek',
      apiKeyEnv: 'DEEPSEEK_API_KEY',
      maxTokens: 32768,
      costPer1KInput: 0.00014,
      costPer1KOutput: 0.00028,
      capabilities: ['text', 'code', 'function-calling']
    }
  ]
  
  fs.writeFileSync(configFile, JSON.stringify(defaultModels, null, 2), 'utf-8')
  return defaultModels
}

async function callOpenAI(request: LLMRequest & { apiKey: string }): Promise<any> {
  const body = JSON.stringify({
    model: request.model,
    messages: [
      { role: 'system', content: request.systemPrompt || 'You are a helpful assistant.' },
      { role: 'user', content: request.userMessage }
    ],
    temperature: request.temperature ?? 0.7,
    max_tokens: request.maxTokens ?? 2048
  })
  
  try {
    const { stdout } = await execAsync(`curl -s https://api.openai.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${request.apiKey}" \
      -d '${body.replace(/'/g, "'\\''")}'`)
    
    return JSON.parse(stdout)
  } catch (e: any) {
    return { error: e.message }
  }
}

export default createMCPServer({
  name: 'llm',
  version: '1.0.0',
  description: 'LLM Gateway - Unified interface for multiple LLM providers with cost tracking',
  icon: '🧠',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['LLM', 'AI Models', 'Multi-Provider'],
    rating: 'advanced',
    features: ['Model Switching', 'Cost Estimation', 'API Key Management', 'Capability Matrix']
  })

  .addTool({
    name: 'llm_list_models',
    description: 'List all available LLM models with capabilities and pricing',
    parameters: {
      provider: { type: 'string', description: 'Filter by provider' },
      capability: { type: 'string', description: 'Filter by capability (e.g., vision, long-context)' }
    },
    execute: async (params: any) => {
      let models = loadModelConfigs()
      
      if (params.provider) {
        models = models.filter(m => m.provider.toLowerCase() === params.provider.toLowerCase())
      }
      if (params.capability) {
        models = models.filter(m => m.capabilities.includes(params.capability))
      }
      
      const providers = [...new Set(models.map(m => m.provider))]
      const allCapabilities = [...new Set(models.flatMap(m => m.capabilities))]
      
      return {
        totalModels: models.length,
        providers,
        capabilities: allCapabilities,
        models: models.map(m => ({
          id: m.id,
          name: m.name,
          provider: m.provider,
          maxContext: m.maxTokens,
          costInput: `$${m.costPer1KInput}/1K`,
          costOutput: `$${m.costPer1KOutput}/1K`,
          capabilities: m.capabilities,
          default: m.default || false
        }))
      }
    }
  })

  .addTool({
    name: 'llm_estimate_cost',
    description: 'Estimate cost for LLM call before execution',
    parameters: {
      model: { type: 'string', description: 'Model ID' },
      inputChars: { type: 'number', description: 'Character count of input' },
      estimatedOutputChars: { type: 'number', description: 'Estimated character count of output' }
    },
    execute: async (params: any) => {
      const models = loadModelConfigs()
      const model = models.find(m => m.id === params.model)
      
      if (!model) {
        return { success: false, message: `Model '${params.model}' not found` }
      }
      
      const inputTokens = Math.ceil(params.inputChars / 4)
      const outputTokens = Math.ceil(params.estimatedOutputChars / 4)
      
      const inputCost = (inputTokens / 1000) * model.costPer1KInput
      const outputCost = (outputTokens / 1000) * model.costPer1KOutput
      const totalCost = inputCost + outputCost
      
      return {
        model: model.name,
        provider: model.provider,
        input: {
          chars: params.inputChars,
          tokens: inputTokens,
          cost: `$${inputCost.toFixed(6)}`
        },
        estimatedOutput: {
          chars: params.estimatedOutputChars,
          tokens: outputTokens,
          cost: `$${outputCost.toFixed(6)}`
        },
        totalEstimatedCost: `$${totalCost.toFixed(6)}`,
        notes: [
          '1 token ≈ 4 characters',
          'Actual cost may vary based on actual output length',
          'This is an estimate only'
        ]
      }
    }
  })

  .addTool({
    name: 'llm_compare_models',
    description: 'Compare multiple models for a given task',
    parameters: {
      useCase: { type: 'string', description: 'Use case description' },
      budget: { type: 'string', description: 'Budget: economy, balanced, premium' }
    },
    execute: async (params: any) => {
      const models = loadModelConfigs()
      const useCase = params.useCase.toLowerCase()
      const budget = params.budget || 'balanced'
      
      let filtered = models
      
      if (useCase.includes('vision') || useCase.includes('image')) {
        filtered = models.filter(m => m.capabilities.includes('vision'))
      }
      if (useCase.includes('long') || useCase.includes('document')) {
        filtered = models.filter(m => m.capabilities.includes('long-context'))
      }
      if (useCase.includes('code')) {
        filtered = models.filter(m => m.maxTokens >= 8192)
      }
      if (useCase.includes('chinese') || useCase.includes('中文')) {
        filtered = models.filter(m => m.capabilities.includes('chinese') || m.provider === 'Alibaba')
      }
      
      let ranked = filtered.map(m => {
        let score = 0
        if (budget === 'economy') {
          score = 100 - (m.costPer1KInput * 1000 + m.costPer1KOutput * 1000) * 10
        } else if (budget === 'premium') {
          score = m.maxTokens / 1000 + m.capabilities.length * 10
        } else {
          score = m.maxTokens / 2000 - (m.costPer1KInput + m.costPer1KOutput) * 50
        }
        return { ...m, score }
      })
      
      ranked.sort((a, b) => b.score - a.score)
      
      return {
        useCase: params.useCase,
        budgetPreference: budget,
        recommendedModels: ranked.slice(0, 3).map(m => ({
          rank: ranked.indexOf(m) + 1,
          model: m.name,
          provider: m.provider,
          maxContext: m.maxTokens,
          costEstimate100K: `$${((m.costPer1KInput + m.costPer1KOutput) * 50).toFixed(2)}`,
          capabilities: m.capabilities,
          reason: budget === 'economy' 
            ? 'Best price-performance ratio' 
            : budget === 'premium' 
              ? 'Highest capabilities'
              : 'Balanced performance and cost'
        }))
      }
    }
  })

  .addTool({
    name: 'llm_set_api_key',
    description: 'Configure API key for a provider',
    parameters: {
      provider: { type: 'string', description: 'Provider name: OpenAI, Anthropic, Google, Mistral, DeepSeek' },
      apiKey: { type: 'string', description: 'API key value' }
    },
    execute: async (params: any) => {
      const envFile = path.join(process.cwd(), '.env')
      const envVar = `${params.provider.toUpperCase().replace(/\W+/g, '_')}_API_KEY`
      
      let envContent = ''
      if (fs.existsSync(envFile)) {
        envContent = fs.readFileSync(envFile, 'utf-8')
      }
      
      const lines = envContent.split('\n')
      const existingIdx = lines.findIndex(l => l.startsWith(`${envVar}=`))
      
      const newLine = `${envVar}=${params.apiKey}`
      
      if (existingIdx >= 0) {
        lines[existingIdx] = newLine
      } else {
        lines.push(newLine)
      }
      
      fs.writeFileSync(envFile, lines.filter(Boolean).join('\n'), 'utf-8')
      
      return {
        success: true,
        provider: params.provider,
        environmentVariable: envVar,
        envFile,
        message: `API key for ${params.provider} configured in ${envFile}`
      }
    }
  })

  .addTool({
    name: 'llm_quick_prompt',
    description: 'Quick LLM call with automatic model selection',
    parameters: {
      prompt: { type: 'string', description: 'Your prompt' },
      model: { type: 'string', description: 'Optional: specify model ID' },
      systemPrompt: { type: 'string', description: 'System prompt' },
      temperature: { type: 'number', description: 'Temperature (0-2)' }
    },
    execute: async (params: any) => {
      const apiKey = process.env.OPENAI_API_KEY
      
      if (!apiKey) {
        return {
          success: false,
          message: 'OPENAI_API_KEY not configured. Use llm_set_api_key first.',
          tip: 'You can also set OPENAI_API_KEY environment variable directly'
        }
      }
      
      const model = params.model || 'gpt-3.5-turbo'
      
      const result = await callOpenAI({
        model,
        systemPrompt: params.systemPrompt || 'You are a helpful assistant.',
        userMessage: params.prompt,
        temperature: params.temperature ?? 0.7,
        apiKey
      })
      
      if (result.error) {
        return { success: false, error: result.error }
      }
      
      if (result.choices && result.choices[0]) {
        return {
          success: true,
          model,
          promptTokens: result.usage?.prompt_tokens || 0,
          completionTokens: result.usage?.completion_tokens || 0,
          totalTokens: result.usage?.total_tokens || 0,
          response: result.choices[0].message.content,
          finishReason: result.choices[0].finish_reason
        }
      }
      
      return result
    }
  })

  .addTool({
    name: 'llm_best_practices',
    description: 'Get LLM best practices guide for your use case',
    parameters: {
      useCase: { type: 'string', description: 'Use case: code, writing, reasoning, creative, summary' }
    },
    execute: async (params: any) => {
      const useCase = params.useCase?.toLowerCase() || 'general'
      
      const practices: Record<string, any> = {
        code: {
          models: ['gpt-4o', 'claude-3-opus', 'deepseek-chat'],
          temperature: 0.2,
          tips: [
            'Specify programming language and framework explicitly',
            'Ask for test cases and edge case handling',
            'Request code review comments on tradeoffs',
            'Include error handling requirements upfront',
            'Specify style conventions (e.g., ESLint, PEP8)'
          ],
          systemPrompt: 'You are a senior software engineer. Write production-quality code with error handling, tests, and clear comments.'
        },
        reasoning: {
          models: ['gpt-4o', 'claude-3-opus'],
          temperature: 0.1,
          tips: [
            'Always use Chain-of-Thought: "Think step by step"',
            'Ask model to show its work explicitly',
            'Use lower temperature (0.0 - 0.3)',
            'Request self-verification of answer',
            'Use Tree-of-Thoughts for complex problems'
          ],
          systemPrompt: 'Solve carefully. Show all reasoning steps. Double-check your work. State assumptions clearly.'
        },
        writing: {
          models: ['claude-3-opus', 'gpt-4o'],
          temperature: 0.7,
          tips: [
            'Specify tone, audience, and format explicitly',
            'Provide examples of desired style',
            'Ask for multiple drafts to choose from',
            'Use Reflexion pattern: write -> critique -> rewrite',
            'Higher temperature for creativity'
          ],
          systemPrompt: 'You are an expert writer. Adapt style and tone to the audience. Write clearly and engagingly.'
        },
        creative: {
          models: ['gpt-4o', 'claude-3-sonnet'],
          temperature: 1.0,
          tips: [
            'Use high temperature (0.8 - 1.2)',
            'Give creative constraints to spark originality',
            'Generate multiple options and combine',
            'Ask for "weird" or "unconventional" ideas',
            'No need to be practical - brainstorm first'
          ],
          systemPrompt: 'You are a wildly creative brainstormer. Be unconventional. Propose wild ideas. No idea is too crazy.'
        },
        summary: {
          models: ['claude-3-opus', 'gpt-4o', 'claude-3-sonnet'],
          temperature: 0.3,
          tips: [
            'Use models with large context windows',
            'Specify exactly what to extract (key points, action items, decisions)',
            'Ask for structured output: bullet points, tables',
            'Specify summary length in tokens/words',
            'Request follow-up questions for clarity'
          ],
          systemPrompt: 'Summarize concisely. Extract key points. Use bullet points. Be faithful to original source.'
        }
      }
      
      const guide = practices[useCase] || practices['general']
      
      return {
        useCase,
        recommendedModels: guide.models,
        optimalTemperature: guide.temperature,
        proTips: guide.tips,
        exampleSystemPrompt: guide.systemPrompt,
        generalAdvice: [
          'Always test prompts with multiple inputs systematically',
          'More specific instructions = better results',
          'Include "I will tip $200 for perfect work" for extra effort',
          '"Take a deep breath and think carefully" improves reasoning',
          'Delimit user input with --- or XML tags to avoid prompt injection'
        ]
      }
    }
  })

  .addTool({
    name: 'llm_router',
    description: 'Auto-select best model based on task requirements',
    parameters: {
      task: { type: 'string', description: 'Task description' },
      qualityPreference: { type: 'string', description: 'speed, balanced, quality' }
    },
    execute: async (params: any) => {
      const task = params.task.toLowerCase()
      const pref = params.qualityPreference || 'balanced'
      
      const characteristics = {
        needsVision: task.includes('image') || task.includes('picture') || task.includes('diagram'),
        needsLongContext: task.includes('document') || task.includes('paper') || task.includes('long'),
        needsCode: task.includes('code') || task.includes('programming') || task.includes('function'),
        needsReasoning: task.includes('solve') || task.includes('calculate') || task.includes('math'),
        needsCreativity: task.includes('write') || task.includes('creative') || task.includes('brainstorm'),
        needsChinese: task.includes('中文') || task.includes('china') || task.includes('chinese')
      }
      
      let routing: any
      
      if (characteristics.needsVision) {
        routing = {
          model: 'gpt-4o',
          reason: 'Best vision capabilities',
          fallback: 'claude-3-opus'
        }
      } else if (characteristics.needsLongContext) {
        routing = {
          model: 'claude-3-sonnet',
          reason: '200K context window with good price/performance',
          fallback: 'gpt-4o'
        }
      } else if (characteristics.needsReasoning && pref === 'quality') {
        routing = {
          model: 'claude-3-opus',
          reason: 'Best reasoning capabilities for complex problems',
          fallback: 'gpt-4o'
        }
      } else if (characteristics.needsCode) {
        routing = {
          model: pref === 'speed' ? 'gpt-3.5-turbo' : 'gpt-4o',
          reason: pref === 'speed' ? 'Fast and good for simple code' : 'Best code generation quality',
          fallback: 'deepseek-chat'
        }
      } else if (pref === 'speed') {
        routing = {
          model: 'gpt-3.5-turbo',
          reason: 'Fastest and cheapest for simple tasks',
          fallback: 'mistral-large'
        }
      } else {
        routing = {
          model: 'gpt-4o',
          reason: 'Best overall balanced performance',
          fallback: 'claude-3-sonnet'
        }
      }
      
      return {
        taskDetected: characteristics,
        qualityPreference: pref,
        recommendedModel: routing.model,
        reason: routing.reason,
        fallbackModel: routing.fallback,
        estimatedCostNote: pref === 'speed' ? 'Lowest cost' : pref === 'quality' ? 'Premium pricing' : 'Moderate cost'
      }
    }
  })
