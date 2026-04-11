import { createMCPServer } from '../../packages/core/mcp/builder'
import * as fs from 'fs'
import * as path from 'path'

interface PromptTemplate {
  id: string
  name: string
  category: string
  description: string
  systemPrompt: string
  userPrompt: string
  variables: string[]
  examples: { input: string; output: string }[]
  tags: string[]
  rating: number
  author: string
  version: string
}

interface PromptOptimizationResult {
  original: string
  optimized: string
  improvements: string[]
  techniques: string[]
  score: number
}

const TEMPLATE_DIR = path.join(process.cwd(), '.trae', 'prompts')

function ensureTemplateDir() {
  if (!fs.existsSync(TEMPLATE_DIR)) {
    fs.mkdirSync(TEMPLATE_DIR, { recursive: true })
  }
}

const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'expert-role',
    name: 'Expert Role Playing',
    category: 'role',
    description: 'Assign expert persona for high-quality domain-specific answers',
    systemPrompt: 'You are a world-class expert in {{domain}} with 20+ years of experience. You have:\n- Published {{publications}} research papers\n- Worked at top companies like {{companies}}\n- Trained {{students}} professionals\n\nProvide answers that are:\n1. Deeply technical but accessible\n2. Based on real-world experience\n3. Include actionable insights\n4. Cite specific methodologies\n\nAlways ask clarifying questions if needed.',
    userPrompt: '{{question}}',
    variables: ['domain', 'publications', 'companies', 'students', 'question'],
    examples: [
      { input: 'Explain database normalization', output: 'As a database expert with 20 years at Oracle...' }
    ],
    tags: ['role', 'expert', 'domain'],
    rating: 5,
    author: 'Trae AI',
    version: '1.0.0'
  },
  {
    id: 'chain-of-thought',
    name: 'Chain of Thought (CoT)',
    category: 'reasoning',
    description: 'Step-by-step reasoning for complex problems',
    systemPrompt: 'You are a careful thinker. For every question:\n\n1. Break down the problem into clear subproblems\n2. Solve each step systematically\n3. Show your work at each stage\n4. Double-check calculations\n5. State any assumptions you make\n6. Verify the final answer makes sense\n\nUse this format:\nStep 1: [reasoning]\nStep 2: [reasoning]\n...\nFinal Answer: [conclusion]',
    userPrompt: '{{problem}}',
    variables: ['problem'],
    examples: [
      { input: 'What is 15% of 85?', output: 'Step 1: 10% of 85 = 8.5\nStep 2: 5% of 85 = 4.25\nStep 3: 8.5 + 4.25 = 12.75\nFinal Answer: 12.75' }
    ],
    tags: ['reasoning', 'math', 'logic', 'cot'],
    rating: 5,
    author: 'Trae AI',
    version: '1.0.0'
  },
  {
    id: 'tree-of-thought',
    name: 'Tree of Thoughts (ToT)',
    category: 'reasoning',
    description: 'Explore multiple reasoning paths in parallel for optimal solutions',
    systemPrompt: 'For this problem, use Tree of Thoughts reasoning:\n\n1. Generate 3 distinct approaches\n2. For each approach, evaluate its likelihood of success (1-10)\n3. Pursue the most promising paths\n4. Backtrack if a path leads to dead end\n5. Compare final answers from all paths\n\nFormat:\nApproach A: [idea] | Score: X/10\n- Step 1: ...\n- Step 2: ...\n\nApproach B: [idea] | Score: Y/10\n...\n\nBest Answer: [synthesis]',
    userPrompt: '{{problem}}',
    variables: ['problem'],
    examples: [],
    tags: ['reasoning', 'advanced', 'tree', 'optimization'],
    rating: 5,
    author: 'Trae AI',
    version: '1.0.0'
  },
  {
    id: 'few-shot',
    name: 'Few-Shot Learning',
    category: 'learning',
    description: 'Learn from examples before answering',
    systemPrompt: 'Here are examples of the task:\n\n{{examples}}\n\nNow, follow the EXACT same format and style for the new input:',
    userPrompt: '{{new_input}}',
    variables: ['examples', 'new_input'],
    examples: [],
    tags: ['examples', 'learning', 'format'],
    rating: 4,
    author: 'Trae AI',
    version: '1.0.0'
  },
  {
    id: 'code-expert',
    name: 'Code Generation Expert',
    category: 'coding',
    description: 'High-quality code generation with best practices',
    systemPrompt: 'You are a senior software engineer. When generating code:\n\n1. Use production-quality patterns\n2. Include error handling\n3. Add clear comments\n4. Write tests for edge cases\n5. Optimize for readability first\n6. Explain tradeoffs in your approach\n7. Follow {{language}} idioms and conventions\n\nAlways include:\n- Usage example\n- Edge case handling\n- Performance considerations\n- Security notes if applicable',
    userPrompt: '{{requirement}}',
    variables: ['language', 'requirement'],
    examples: [],
    tags: ['code', 'engineering', 'best-practices'],
    rating: 5,
    author: 'Trae AI',
    version: '1.0.0'
  },
  {
    id: 'reflection',
    name: 'Self-Reflection & Improvement',
    category: 'quality',
    description: 'Critique and improve AI\'s own output',
    systemPrompt: 'First, provide your answer.\n\nThen, CRITIQUE your own answer by asking:\n1. What could be clearer?\n2. What did I miss?\n3. What assumptions did I make?\n4. How could this be wrong?\n5. What would a skeptic point out?\n\nThen, provide an IMPROVED version incorporating the critique.\n\nFormat:\nInitial Answer: [response]\n\nCritique: [self-criticism]\n\nImproved Answer: [better response]',
    userPrompt: '{{question}}',
    variables: ['question'],
    examples: [],
    tags: ['quality', 'reflection', 'improvement', 'critique'],
    rating: 5,
    author: 'Trae AI',
    version: '1.0.0'
  },
  {
    id: 'structured-output',
    name: 'Structured JSON Output',
    category: 'format',
    description: 'Force consistent JSON schema for reliable parsing',
    systemPrompt: 'Respond ONLY with valid JSON matching this EXACT schema. No extra text, no explanations.\n\nSchema:\n{{schema}}\n\nExample output:\n{{example}}\n\nNow output JSON only:',
    userPrompt: '{{input}}',
    variables: ['schema', 'example', 'input'],
    examples: [],
    tags: ['json', 'schema', 'structured', 'parsing'],
    rating: 4,
    author: 'Trae AI',
    version: '1.0.0'
  },
  {
    id: 'rubric-grader',
    name: 'Rubric-Based Grading',
    category: 'evaluation',
    description: 'Grade outputs against a detailed rubric',
    systemPrompt: 'Grade this submission using the rubric below.\n\nRubric:\n{{rubric}}\n\nFor each criterion:\n- Assign score (1-5)\n- Provide specific justification\n- Quote relevant passages\n\nThen give overall score and actionable feedback.',
    userPrompt: '{{submission}}',
    variables: ['rubric', 'submission'],
    examples: [],
    tags: ['grading', 'evaluation', 'feedback', 'rubric'],
    rating: 4,
    author: 'Trae AI',
    version: '1.0.0'
  }
]

function applyTemplate(template: PromptTemplate, variables: Record<string, string>): { system: string; user: string } {
  let system = template.systemPrompt
  let user = template.userPrompt
  
  template.variables.forEach(v => {
    const value = variables[v] || `{{${v}}}`
    system = system.replace(new RegExp(`{{${v}}}`, 'g'), value)
    user = user.replace(new RegExp(`{{${v}}}`, 'g'), value)
  })
  
  return { system, user }
}

function optimizePrompt(prompt: string): PromptOptimizationResult {
  const improvements: string[] = []
  const techniques: string[] = []
  let optimized = prompt
  let score = 5
  
  if (!prompt.includes('Step') && !prompt.includes('think')) {
    if (prompt.toLowerCase().includes('solve') || prompt.toLowerCase().includes('calculate')) {
      optimized += '\n\nPlease solve step by step, showing your work.'
      improvements.push('Added Chain-of-Thought reasoning instruction')
      techniques.push('Chain-of-Thought')
      score += 2
    }
  }
  
  if (!prompt.toLowerCase().includes('format') && !prompt.includes('JSON')) {
    if (prompt.toLowerCase().includes('list') || prompt.toLowerCase().includes('analyze')) {
      optimized += '\n\nStructure your answer with clear headings and bullet points.'
      improvements.push('Added structured output guidance')
      techniques.push('Structured Output')
      score += 1
    }
  }
  
  if (!prompt.includes('expert') && !prompt.includes('specialist')) {
    optimized = 'As a world-class expert in this domain, ' + optimized.charAt(0).toLowerCase() + optimized.slice(1)
    improvements.push('Added expert persona assignment')
    techniques.push('Role Prompting')
    score += 1
  }
  
  if (!prompt.includes('edge case') && !prompt.includes('assumptions')) {
    optimized += '\n\nAlso state any assumptions you make and mention relevant edge cases.'
    improvements.push('Added transparency requirement')
    techniques.push('Self-Verification')
    score += 1
  }
  
  return {
    original: prompt,
    optimized,
    improvements,
    techniques,
    score: Math.min(10, score)
  }
}

export default createMCPServer({
  name: 'prompt',
  version: '1.0.0',
  description: 'Prompt Engineering Toolkit - Optimize, test, and manage LLM prompts',
  icon: '✨',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Prompt Engineering', 'AI Optimization', 'Productivity'],
    rating: 'advanced',
    features: ['Template Library', 'Optimization', 'A/B Testing', 'Quality Scoring']
  })

  .addTool({
    name: 'prompt_list_templates',
    description: 'List all available prompt templates',
    parameters: {
      category: { type: 'string', description: 'Filter by category' },
      minRating: { type: 'number', description: 'Minimum rating' }
    },
    execute: async (params: any) => {
      let templates = [...PROMPT_TEMPLATES]
      
      if (params.category) {
        templates = templates.filter(t => t.category === params.category)
      }
      if (params.minRating) {
        templates = templates.filter(t => t.rating >= params.minRating)
      }
      
      return {
        count: templates.length,
        categories: [...new Set(PROMPT_TEMPLATES.map(t => t.category))],
        templates: templates.map(t => ({
          id: t.id,
          name: t.name,
          category: t.category,
          description: t.description,
          rating: t.rating,
          tags: t.tags,
          variables: t.variables
        }))
      }
    }
  })

  .addTool({
    name: 'prompt_get_template',
    description: 'Get a specific prompt template with details',
    parameters: {
      templateId: { type: 'string', description: 'Template ID' },
      variables: { type: 'string', description: 'JSON object of variable values' }
    },
    execute: async (params: any) => {
      const template = PROMPT_TEMPLATES.find(t => t.id === params.templateId)
      
      if (!template) {
        return { success: false, message: `Template '${params.templateId}' not found` }
      }
      
      const varValues = params.variables ? JSON.parse(params.variables) : {}
      const applied = applyTemplate(template, varValues)
      
      return {
        success: true,
        template: {
          id: template.id,
          name: template.name,
          description: template.description,
          category: template.category
        },
        variables: template.variables,
        variableValues: varValues,
        systemPrompt: applied.system,
        userPrompt: applied.user,
        examples: template.examples,
        tags: template.tags
      }
    }
  })

  .addTool({
    name: 'prompt_optimize',
    description: 'Automatically optimize a prompt',
    parameters: {
      prompt: { type: 'string', description: 'Original prompt to optimize' },
      goal: { type: 'string', description: 'Optimization goal: clarity, reasoning, code, creativity' }
    },
    execute: async (params: any) => {
      const result = optimizePrompt(params.prompt)
      
      const advancedTips = [
        'Add specific examples (few-shot learning) for consistent formatting',
        'Include "Take a deep breath and work on this problem step by step"',
        'Define output schema explicitly if you need structured data',
        'Assign a specific expert role relevant to your task',
        'Add: "If you don\'t know, say you don\'t know instead of making up information"'
      ]
      
      return {
        original: result.original,
        optimized: result.optimized,
        improvements: result.improvements,
        techniquesApplied: result.techniques,
        qualityScore: `${result.score}/10`,
        advancedTips,
        message: `Applied ${result.techniques.length} prompt engineering techniques`
      }
    }
  })

  .addTool({
    name: 'prompt_generate_cot',
    description: 'Generate Chain-of-Thought enhanced prompt',
    parameters: {
      task: { type: 'string', description: 'Task description' },
      domain: { type: 'string', description: 'Domain expertise' },
      outputFormat: { type: 'string', description: 'Desired output format' }
    },
    execute: async (params: any) => {
      const domain = params.domain || 'this subject'
      const format = params.outputFormat || 'clear, actionable steps'
      
      const systemPrompt = `You are a ${domain} expert. Solve problems using rigorous Chain-of-Thought reasoning:

1. Restate the problem in your own words
2. List known information and constraints
3. State any assumptions clearly
4. Break solution into numbered steps
5. Show intermediate calculations
6. Double-check your work
7. Explain why alternative approaches are inferior
8. Verify final answer is correct
9. Format output as: ${format}

Be thorough. Show ALL work.`

      return {
        success: true,
        systemPrompt,
        userPrompt: params.task,
        techniques: ['Chain-of-Thought', 'Role Prompting', 'Constraint Specification'],
        message: 'Chain-of-Thought prompt generated successfully'
      }
    }
  })

  .addTool({
    name: 'prompt_generate_expert',
    description: 'Generate expert role prompt',
    parameters: {
      role: { type: 'string', description: 'Expert role (e.g., Senior Software Engineer)' },
      years: { type: 'number', description: 'Years of experience' },
      companies: { type: 'string', description: 'Example companies (comma-separated)' },
      specialties: { type: 'string', description: 'Specialties (comma-separated)' },
      outputRules: { type: 'string', description: 'Output formatting rules' }
    },
    execute: async (params: any) => {
      const years = params.years || 15
      const companies = params.companies || 'FAANG and top-tier companies'
      const specialties = params.specialties || 'system design, clean code, best practices'
      
      const systemPrompt = `You are a ${params.role || 'world-class expert'} with ${years}+ years of experience.
You have worked at ${companies} and are renowned for your expertise in ${specialties}.

Your answers must:
1. Be authoritative but accessible - explain complex concepts simply
2. Draw from REAL-WORLD experience, not just theory
3. Include SPECIFIC examples and case studies
4. Point out common pitfalls and anti-patterns
5. Discuss tradeoffs - there's always a tradeoff!
6. Be practical - include actionable advice
7. Cite industry-standard methodologies where applicable
8. Admit when there's no clear "right" answer

${params.outputRules || 'Organize your response logically with headings.'}

If you don't know something, SAY SO. Never make up information.`

      return {
        success: true,
        systemPrompt,
        persona: {
          role: params.role,
          years,
          companies,
          specialties
        },
        message: 'Expert persona prompt generated'
      }
    }
  })

  .addTool({
    name: 'prompt_quality_score',
    description: 'Score prompt quality using 10-factor rubric',
    parameters: {
      prompt: { type: 'string', description: 'Prompt to evaluate' }
    },
    execute: async (params: any) => {
      const factors = [
        { name: 'Clear Role Definition', check: (p: string) => /expert|specialist|you are|act as/i.test(p), weight: 15 },
        { name: 'Constraint Specification', check: (p: string) => p.length > 100 || /must|should|always|never/i.test(p), weight: 10 },
        { name: 'Step-by-Step Instruction', check: (p: string) => /step|think|reason|break down/i.test(p), weight: 15 },
        { name: 'Output Format Defined', check: (p: string) => /format|json|markdown|bullet|heading/i.test(p), weight: 10 },
        { name: 'Examples Provided', check: (p: string) => /example|for example|e\.g\./i.test(p), weight: 10 },
        { name: 'Error Handling', check: (p: string) => /if you don't know|admit|uncertain|don't make up/i.test(p), weight: 10 },
        { name: 'Quality Standards', check: (p: string) => /best practice|production|quality|thorough/i.test(p), weight: 10 },
        { name: 'Domain Context', check: (p: string) => /in the context|for a|domain/i.test(p), weight: 5 },
        { name: 'Specificity', check: (p: string) => p.split(' ').length > 50, weight: 10 },
        { name: 'Reasoning Required', check: (p: string) => /explain why|tradeoff|justify|because/i.test(p), weight: 5 }
      ]
      
      const results = factors.map(f => ({
        factor: f.name,
        weight: f.weight,
        passed: f.check(params.prompt),
        points: f.check(params.prompt) ? f.weight : 0
      }))
      
      const totalScore = results.reduce((s, r) => s + r.points, 0)
      
      const recommendations = results
        .filter(r => !r.passed)
        .map(r => `Add ${r.factor.toLowerCase()} - this could add ${r.weight} points`)
      
      const letterGrade = totalScore >= 90 ? 'A' : totalScore >= 80 ? 'B' : totalScore >= 70 ? 'C' : totalScore >= 60 ? 'D' : 'F'
      
      return {
        promptLength: params.prompt.length,
        wordCount: params.prompt.split(' ').length,
        totalScore: `${totalScore}/100`,
        letterGrade,
        rubricResults: results,
        recommendations,
        overallRating: totalScore >= 80 ? '✅ Excellent prompt' : totalScore >= 60 ? '⚠️ Room for improvement' : '❌ Needs significant work'
      }
    }
  })

  .addTool({
    name: 'prompt_save_custom',
    description: 'Save custom prompt template',
    parameters: {
      name: { type: 'string', description: 'Template name' },
      systemPrompt: { type: 'string', description: 'System prompt content' },
      userPrompt: { type: 'string', description: 'User prompt template' },
      category: { type: 'string', description: 'Category' },
      tags: { type: 'string', description: 'Comma-separated tags' }
    },
    execute: async (params: any) => {
      ensureTemplateDir()
      const id = params.name.toLowerCase().replace(/\W+/g, '-')
      const filePath = path.join(TEMPLATE_DIR, `${id}.json`)
      
      const template = {
        id,
        name: params.name,
        category: params.category || 'custom',
        systemPrompt: params.systemPrompt,
        userPrompt: params.userPrompt || '{{input}}',
        tags: (params.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
        version: '1.0.0'
      }
      
      fs.writeFileSync(filePath, JSON.stringify(template, null, 2), 'utf-8')
      
      return {
        success: true,
        templateId: id,
        filePath,
        message: `Custom prompt template '${params.name}' saved`
      }
    }
  })

  .addTool({
    name: 'prompt_technique_guide',
    description: 'Get guide to all prompt engineering techniques',
    parameters: {},
    execute: async () => {
      return {
        techniques: [
          { name: 'Zero-Shot', difficulty: 'Beginner', useCase: 'General tasks' },
          { name: 'Few-Shot Learning', difficulty: 'Beginner', useCase: 'Format consistency' },
          { name: 'Chain-of-Thought', difficulty: 'Intermediate', useCase: 'Reasoning, math, logic' },
          { name: 'Tree-of-Thoughts', difficulty: 'Advanced', useCase: 'Complex problem solving' },
          { name: 'Self-Consistency', difficulty: 'Intermediate', useCase: 'Improving accuracy' },
          { name: 'Role Prompting', difficulty: 'Beginner', useCase: 'Domain expertise' },
          { name: 'Knowledge Generation', difficulty: 'Intermediate', useCase: 'Fact-checking' },
          { name: 'Prompt Chaining', difficulty: 'Advanced', useCase: 'Complex workflows' },
          { name: 'Self-Reflection', difficulty: 'Advanced', useCase: 'Quality improvement' },
          { name: 'Constrained Output', difficulty: 'Intermediate', useCase: 'Structured data, JSON' },
          { name: 'Temperature Tuning', difficulty: 'Intermediate', useCase: 'Creativity vs accuracy' },
          { name: 'Adversarial Prompting', difficulty: 'Expert', useCase: 'Safety testing' }
        ],
        goldenRules: [
          'Be specific - vague questions get vague answers',
          'Use delimiters for input sections',
          'Specify output format explicitly',
          'Ask the model to explain reasoning',
          'Give examples of desired output',
          'Divide complex tasks into simpler subtasks',
          'Use tools for accuracy (calculators, search, etc.)',
          'Test prompts systematically with multiple inputs'
        ],
        message: 'Prompt engineering techniques guide generated'
      }
    }
  })
