import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 60000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

async function openAIRequest(endpoint: string, body: any): Promise<any> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return { error: 'OPENAI_API_KEY not set. Call openai_set_api_key first.' }
  
  const data = JSON.stringify(body).replace(/'/g, "'\\''")
  const result = await safeExec(`curl -s -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${apiKey}" \
    -d '${data}' https://api.openai.com/v1${endpoint}`)
  
  try { return JSON.parse(result) } catch { return { raw: result.substring(0, 1000) } }
}

export default createMCPServer({
  name: 'openai',
  version: '1.0.0',
  description: 'OpenAI API toolkit - Call GPT-4o, DALL-E 3, Whisper, Embeddings with API key',
  icon: '🤖',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['AI', 'API Integration'],
    rating: 'intermediate',
    features: ['GPT-4o', 'DALL-E 3', 'Vision', 'Embeddings', 'Function Calling']
  })
  .addTool({
    name: 'openai_set_api_key',
    description: 'Set OpenAI API key for authenticated requests',
    parameters: {
      apiKey: { type: 'string', description: 'OpenAI API Key from platform.openai.com' },
      orgId: { type: 'string', description: 'Optional: Organization ID' }
    },
    execute: async (args: any) => {
      process.env.OPENAI_API_KEY = args.apiKey
      if (args.orgId) process.env.OPENAI_ORG_ID = args.orgId
      return {
        success: true,
        message: 'OpenAI API key configured',
        availableModels: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo', 'dall-e-3', 'whisper-1', 'text-embedding-3-large']
      }
    }
  })
  .addTool({
    name: 'openai_chat_completion',
    description: 'Call GPT-4o / GPT-4 Turbo chat completion',
    parameters: {
      model: { type: 'string', description: 'Model name' },
      messages: { type: 'string', description: 'JSON array of messages: [{role: "user", content: "text"}]' },
      temperature: { type: 'number', description: 'Sampling temperature 0-2' },
      maxTokens: { type: 'number', description: 'Maximum tokens to generate' },
      systemPrompt: { type: 'string', description: 'Optional system prompt' }
    },
    execute: async (args: any) => {
      const messagesArray = JSON.parse(args.messages || '[]')
      const allMessages = args.systemPrompt 
        ? [{ role: 'system', content: args.systemPrompt }, ...messagesArray]
        : messagesArray
      
      const result = await openAIRequest('/chat/completions', {
        model: args.model || 'gpt-4o',
        messages: allMessages,
        temperature: args.temperature || 0.7,
        max_tokens: args.maxTokens
      })
      
      if (result.error) return result
      
      return {
        model: result.model,
        usage: result.usage,
        content: result.choices?.[0]?.message?.content,
        role: result.choices?.[0]?.message?.role,
        finishReason: result.choices?.[0]?.finish_reason
      }
    }
  })
  .addTool({
    name: 'openai_vision_analyze',
    description: 'Analyze images using GPT-4o Vision',
    parameters: {
      imageUrl: { type: 'string', description: 'Image URL or base64 data URI' },
      prompt: { type: 'string', description: 'What to ask about the image' },
      detail: { type: 'string', description: 'Detail level: low, high, auto' }
    },
    execute: async (args: any) => {
      const result = await openAIRequest('/chat/completions', {
        model: 'gpt-4o',
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: args.prompt || 'Describe this image in detail' },
            { type: 'image_url', image_url: { url: args.imageUrl, detail: args.detail || 'auto' } }
          ]
        }],
        max_tokens: 4000
      })
      
      return {
        analysis: result.choices?.[0]?.message?.content || result.error,
        usage: result.usage
      }
    }
  })
  .addTool({
    name: 'openai_generate_image',
    description: 'Generate images using DALL-E 3',
    parameters: {
      prompt: { type: 'string', description: 'Image generation prompt' },
      size: { type: 'string', description: 'Image size: 1024x1024, 1792x1024, 1024x1792' },
      quality: { type: 'string', description: 'Quality: standard, hd' },
      style: { type: 'string', description: 'Style: vivid, natural' },
      n: { type: 'number', description: 'Number of images (1-10)' }
    },
    execute: async (args: any) => {
      const result = await openAIRequest('/images/generations', {
        model: 'dall-e-3',
        prompt: args.prompt,
        size: args.size || '1024x1024',
        quality: args.quality || 'standard',
        style: args.style || 'vivid',
        n: args.n || 1,
        response_format: 'url'
      })
      
      return {
        images: result.data?.map((img: any) => ({
          url: img.url,
          revisedPrompt: img.revised_prompt
        })) || result.error
      }
    }
  })
  .addTool({
    name: 'openai_create_embeddings',
    description: 'Create text embeddings for semantic search and RAG',
    parameters: {
      texts: { type: 'string', description: 'JSON array of input texts to embed' },
      model: { type: 'string', description: 'Embedding model' },
      encodingFormat: { type: 'string', description: 'Encoding format: float, base64' }
    },
    execute: async (args: any) => {
      const inputTexts = JSON.parse(args.texts || '[]')
      const result = await openAIRequest('/embeddings', {
        model: args.model || 'text-embedding-3-large',
        input: inputTexts,
        encoding_format: args.encodingFormat || 'float'
      })
      
      return {
        embeddings: result.data?.map((e: any) => ({
          index: e.index,
          embedding: e.embedding
        })) || result.error,
        model: result.model,
        usage: result.usage
      }
    }
  })
  .build()
