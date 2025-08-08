import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
// AI provider abstraction for supporting multiple LLM providers

export type AIProvider = 'openai' | 'anthropic'

export interface AIModel {
  id: string
  name: string
  provider: AIProvider
  cost: string
  maxTokens?: number
}

export interface AIResponse {
  text: string
  processingTime: number
}

export abstract class BaseAIProvider {
  protected isConfigured: boolean = false
  protected model: string = ''

  abstract isReady(): boolean
  abstract generateResponse(prompt: string, systemPrompt: string, maxTokens: number): Promise<AIResponse>
  abstract getCurrentModel(): string
  abstract getAvailableModels(): AIModel[]
  abstract getConfigurationHelp(): string
  abstract setModel(modelId: string): boolean
}

export class OpenAIProvider extends BaseAIProvider {
  private openai: OpenAI
  
  constructor() {
    super()
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    this.model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-5'
    
    if (apiKey && apiKey !== 'your-openai-api-key-here') {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
      })
      this.isConfigured = true
    } else {
      this.openai = {} as OpenAI
      this.isConfigured = false
    }
  }

  isReady(): boolean {
    return this.isConfigured
  }

  async generateResponse(prompt: string, systemPrompt: string, maxTokens: number): Promise<AIResponse> {
    const startTime = Date.now()
    
    try {
      // GPT-5 and newer models use max_completion_tokens instead of max_tokens
      const isGPT5 = this.model === 'gpt-5' || this.model.startsWith('gpt-5')
      
      const requestOptions: any = {
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ]
      }
      
      // GPT-5 only supports temperature of 1 (default), other models can use 0.8
      if (!isGPT5) {
        requestOptions.temperature = 0.8
      }
      
      // Use appropriate token parameter based on model
      if (isGPT5) {
        requestOptions.max_completion_tokens = maxTokens
      } else {
        requestOptions.max_tokens = maxTokens
      }
      
      const completion = await this.openai.chat.completions.create(requestOptions)

      const text = completion.choices[0]?.message?.content || 'Sorry, I had trouble generating a response.'
      const processingTime = Date.now() - startTime

      return { text, processingTime }
    } catch (error) {
      const processingTime = Date.now() - startTime
      console.error('OpenAI API Error:', error)
      
      // Return more specific error information
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      return { 
        text: `Sorry, I had trouble generating a response. Error: ${errorMessage}`, 
        processingTime 
      }
    }
  }

  getCurrentModel(): string {
    return this.model
  }

  getAvailableModels(): AIModel[] {
    return [
      { id: 'gpt-5', name: 'GPT-5 (Latest)', provider: 'openai', cost: 'Most advanced OpenAI model', maxTokens: 8192 },
      { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', cost: 'High quality, balanced cost', maxTokens: 8192 },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai', cost: 'Low cost, smarter', maxTokens: 8192 },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai', cost: 'High cost, very smart', maxTokens: 8192 },
      { id: 'gpt-4', name: 'GPT-4', provider: 'openai', cost: 'Previous generation flagship', maxTokens: 4096 },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai', cost: 'Low cost, fast', maxTokens: 4096 }
    ]
  }

  setModel(modelId: string): boolean {
    const availableModels = this.getAvailableModels()
    if (availableModels.some(m => m.id === modelId)) {
      this.model = modelId
      return true
    }
    return false
  }

  getConfigurationHelp(): string {
    return `To enable OpenAI responses:
1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Add it to your .env file: VITE_OPENAI_API_KEY=your-key-here
3. Optionally set model: VITE_OPENAI_MODEL=${this.model}
4. Restart the development server`
  }
}

export class AnthropicProvider extends BaseAIProvider {
  private anthropic: Anthropic
  
  constructor() {
    super()
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    this.model = import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-sonnet-4-20250514'
    
    if (apiKey && apiKey.startsWith('sk-ant-api')) {
      this.anthropic = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true
      })
      this.isConfigured = true
    } else {
      this.anthropic = {} as Anthropic
      this.isConfigured = false
    }
  }

  isReady(): boolean {
    return this.isConfigured
  }

  async generateResponse(prompt: string, systemPrompt: string, maxTokens: number): Promise<AIResponse> {
    const startTime = Date.now()
    
    const completion = await this.anthropic.messages.create({
      model: this.model,
      max_tokens: maxTokens,
      temperature: 0.8,
      system: systemPrompt,
      messages: [
        { role: 'user', content: prompt }
      ]
    })

    const text = completion.content[0]?.type === 'text' 
      ? completion.content[0].text 
      : 'Sorry, I had trouble generating a response.'
    const processingTime = Date.now() - startTime

    return { text, processingTime }
  }

  getCurrentModel(): string {
    return this.model
  }

  getAvailableModels(): AIModel[] {
    return [
      { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4 (Latest)', provider: 'anthropic', cost: 'Most advanced model, excellent for coding', maxTokens: 8192 },
      { id: 'claude-opus-4-20250514', name: 'Claude Opus 4', provider: 'anthropic', cost: 'Most powerful Claude 4 model', maxTokens: 8192 },
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', provider: 'anthropic', cost: 'High quality, balanced cost', maxTokens: 8192 },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', provider: 'anthropic', cost: 'Fast and cost-effective', maxTokens: 8192 },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', provider: 'anthropic', cost: 'Previous generation, still powerful', maxTokens: 4096 }
    ]
  }

  setModel(modelId: string): boolean {
    const availableModels = this.getAvailableModels()
    if (availableModels.some(m => m.id === modelId)) {
      this.model = modelId
      return true
    }
    return false
  }

  getConfigurationHelp(): string {
    return `To enable Claude responses:
1. Get an Anthropic API key from https://console.anthropic.com/
2. Add it to your .env file: VITE_ANTHROPIC_API_KEY=your-key-here
3. Optionally set model: VITE_ANTHROPIC_MODEL=${this.model}
4. Restart the development server`
  }
}

export class MultiAIProvider {
  private providers: Map<AIProvider, BaseAIProvider> = new Map()
  private currentProvider: AIProvider
  
  constructor() {
    this.providers.set('openai', new OpenAIProvider())
    this.providers.set('anthropic', new AnthropicProvider())
    
    // Auto-detect which provider to use based on configuration
    const preferredProvider = import.meta.env.VITE_AI_PROVIDER as AIProvider
    
    if (preferredProvider && this.providers.get(preferredProvider)?.isReady()) {
      this.currentProvider = preferredProvider
    } else {
      // Fallback to first available provider
      this.currentProvider = this.getFirstAvailableProvider() || 'openai'
    }
  }

  private getFirstAvailableProvider(): AIProvider | null {
    for (const [providerName, provider] of this.providers) {
      if (provider.isReady()) {
        return providerName
      }
    }
    return null
  }

  getCurrentProvider(): AIProvider {
    return this.currentProvider
  }

  setProvider(provider: AIProvider): boolean {
    if (this.providers.has(provider) && this.providers.get(provider)!.isReady()) {
      this.currentProvider = provider
      return true
    }
    return false
  }

  isReady(): boolean {
    return this.providers.get(this.currentProvider)?.isReady() || false
  }

  async generateResponse(prompt: string, systemPrompt: string, maxTokens: number): Promise<AIResponse> {
    const provider = this.providers.get(this.currentProvider)
    if (!provider) {
      throw new Error(`Provider ${this.currentProvider} not available`)
    }
    return provider.generateResponse(prompt, systemPrompt, maxTokens)
  }

  getCurrentModel(): string {
    return this.providers.get(this.currentProvider)?.getCurrentModel() || 'unknown'
  }

  getAllAvailableModels(): AIModel[] {
    const models: AIModel[] = []
    for (const provider of this.providers.values()) {
      if (provider.isReady()) {
        models.push(...provider.getAvailableModels())
      }
    }
    return models
  }

  getModelsForCurrentProvider(): AIModel[] {
    const provider = this.providers.get(this.currentProvider)
    if (!provider || !provider.isReady()) {
      return []
    }
    return provider.getAvailableModels()
  }

  setModel(modelId: string): boolean {
    const provider = this.providers.get(this.currentProvider)
    if (!provider || !provider.isReady()) {
      return false
    }
    return provider.setModel(modelId)
  }

  getAvailableProviders(): Array<{provider: AIProvider, name: string, ready: boolean}> {
    return Array.from(this.providers.entries()).map(([provider, instance]) => ({
      provider,
      name: provider === 'openai' ? 'OpenAI' : 'Anthropic Claude',
      ready: instance.isReady()
    }))
  }

  getConfigurationHelp(): string {
    const availableProvider = this.getFirstAvailableProvider()
    if (availableProvider) {
      return this.providers.get(availableProvider)!.getConfigurationHelp()
    }
    
    return `No AI providers configured. You can set up either:

OpenAI:
1. Get an API key from https://platform.openai.com/api-keys
2. Add VITE_OPENAI_API_KEY=your-key-here to .env

Anthropic Claude:
1. Get an API key from https://console.anthropic.com/
2. Add VITE_ANTHROPIC_API_KEY=your-key-here to .env

Then restart the development server.`
  }
}