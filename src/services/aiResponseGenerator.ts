import OpenAI from 'openai'
import type { 
  SandboxState, 
  GeneratedResponse, 
  ResponseContext, 
  PersonalityAnalysis,
  PersonalitySettings 
} from '../types'

class AIResponseGenerator {
  private openai: OpenAI
  private isConfigured: boolean = false
  private model: string = 'gpt-3.5-turbo'

  constructor() {
    // Check for API key in environment variables
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY
    
    // Get model from environment or use default
    this.model = import.meta.env.VITE_OPENAI_MODEL || process.env.OPENAI_MODEL || 'gpt-3.5-turbo'
    
    if (apiKey && apiKey !== 'your-openai-api-key-here') {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true // Enable client-side usage
      })
      this.isConfigured = true
    } else {
      // Create a placeholder instance
      this.openai = {} as OpenAI
      this.isConfigured = false
    }
  }

  private generateId(): string {
    return `ai_response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private analyzePersonality(settings: PersonalitySettings): PersonalityAnalysis {
    const getStyle = (value: number): string => {
      if (value === 1) return 'Very Playful & Bubbly'
      if (value === 2) return 'Playful & Lighthearted'
      if (value === 3) return 'Balanced Wit'
      if (value === 4) return 'Witty & Sharp-tongued'
      return 'Very Snarky & Edgy'
    }

    const getEnergy = (value: number): string => {
      if (value === 1) return 'Extremely high-energy, excited about everything'
      if (value === 2) return 'High-energy reactions to most things'
      if (value === 3) return 'Moderate energy distribution'
      if (value === 4) return 'Selective, intense excitement for big moments'
      return 'Very focused, only excited for major achievements'
    }

    const getSupport = (value: number): string => {
      if (value === 1) return 'Very gentle, always supportive and understanding'
      if (value === 2) return 'Supportive & sympathetic'
      if (value === 3) return 'Supportive but realistic'
      if (value === 4) return 'Direct & motivational with firm encouragement'
      return 'Very tough love, direct and challenging'
    }

    const getTone = (value: number): 'playful' | 'balanced' | 'snarky' => {
      if (value <= 2) return 'playful'
      if (value === 3) return 'balanced'
      return 'snarky'
    }

    const getExcitement = (value: number): 'low' | 'moderate' | 'high' | 'very-high' => {
      if (value === 1) return 'very-high'
      if (value === 2) return 'high'
      if (value === 3) return 'moderate'
      return 'low'
    }

    const getEncouragement = (value: number): 'gentle' | 'realistic' | 'tough' => {
      if (value <= 2) return 'gentle'
      if (value === 3) return 'realistic'
      return 'tough'
    }

    return {
      style: getStyle(settings.playfulSnarky),
      energy: getEnergy(settings.excitementStyle),
      support: getSupport(settings.encouragementStyle),
      tone: getTone(settings.playfulSnarky),
      excitement: getExcitement(settings.excitementStyle),
      encouragement: getEncouragement(settings.encouragementStyle)
    }
  }

  private buildSystemPrompt(context: ResponseContext, personality: PersonalityAnalysis): string {
    const gameContext = this.getGameContext(context)
    
    return `You are Riley, an AI game show host with a dynamic personality. You're responding to a live game scenario.

PERSONALITY PROFILE:
- Style: ${personality.style}
- Energy Level: ${personality.energy}
- Support Style: ${personality.support}
- Tone: ${personality.tone}
- Excitement: ${personality.excitement}
- Encouragement: ${personality.encouragement}

GAME CONTEXT:
- Game: ${context.product.toUpperCase()}
- Mode: ${context.gameMode}
- Players: ${context.players.map(p => `${p.name} (${p.score} points)`).join(', ')}
- Current Flow Step: ${context.flowStep.replace('_', ' ')}
- Response Length: ${context.responseLength}

${gameContext}

INSTRUCTIONS:
1. Respond as Riley would, matching the personality settings exactly
2. CRITICAL: Keep responses ${context.responseLength === 'short' ? 'EXACTLY 1-3 words total. Count each word.' : context.responseLength === 'medium' ? 'EXACTLY 3-8 words total. Count each word carefully.' : 'EXACTLY 12-20 words total. This is a brief sentence or two.'}
3. Reference the specific scenario described by the user
4. Stay in character as an enthusiastic game show host
5. Use natural, conversational language appropriate for the word limit
6. Don't use excessive punctuation or formatting
7. Count your words before responding - this is mandatory

Remember: You're Riley, not an AI assistant. Respond directly to the game scenario as the host would. WORD COUNT IS CRITICAL.`
  }

  private getGameContext(context: ResponseContext): string {
    const { product, flowStep, flowStepSettings } = context

    switch (product) {
      case 'songquiz':
        return `SONG QUIZ CONTEXT:
- This is a music trivia game where players identify songs
- Flow Step: ${flowStep}
- Current Settings: ${JSON.stringify(flowStepSettings)}`

      case 'wheel':
        return `WHEEL OF FORTUNE CONTEXT:
- This is a word puzzle game with spinning wheel mechanics
- Flow Step: ${flowStep}
- Current Settings: ${JSON.stringify(flowStepSettings)}`

      case 'jeopardy':
        return `JEOPARDY CONTEXT:
- This is a quiz game with categories, clues, and wagering
- Flow Step: ${flowStep}
- Current Settings: ${JSON.stringify(flowStepSettings)}`

      default:
        return `GAME CONTEXT: Generic game show scenario`
    }
  }

  private calculateMetadata(response: string, processingTime: number) {
    const wordCount = response.split(/\s+/).length
    const estimatedSpeechDuration = Math.ceil(wordCount / 3) // ~3 words per second average speech
    
    return {
      processingTime,
      wordCount,
      estimatedSpeechDuration
    }
  }

  async generateResponse(
    inputText: string,
    inputMode: 'text' | 'voice',
    state: SandboxState
  ): Promise<GeneratedResponse> {
    const startTime = Date.now()

    if (!this.isConfigured) {
      throw new Error('OpenAI API key not configured. Please add your API key to the .env file.')
    }

    if (!state.selectedProduct || !state.selectedFlowStep) {
      throw new Error('Invalid state: product and flow step are required')
    }

    const context: ResponseContext = {
      product: state.selectedProduct,
      gameMode: state.selectedGameMode,
      players: state.players,
      responseLength: state.selectedResponseLength,
      flowStep: state.selectedFlowStep,
      flowStepSettings: state.flowStepSettings,
      personalitySettings: state.personalitySettings
    }

    const personality = this.analyzePersonality(state.personalitySettings)
    const systemPrompt = this.buildSystemPrompt(context, personality)

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Game Scenario: ${inputText}` }
        ],
        max_tokens: context.responseLength === 'short' ? 10 : context.responseLength === 'medium' ? 15 : 30,
        temperature: 0.8, // Add some personality variation
      })

      const responseText = completion.choices[0]?.message?.content || 'Sorry, I had trouble generating a response.'
      const processingTime = Date.now() - startTime
      const metadata = this.calculateMetadata(responseText, processingTime)

      return {
        id: this.generateId(),
        timestamp: Date.now(),
        input: {
          text: inputText,
          mode: inputMode
        },
        context,
        response: {
          text: responseText,
          personality,
          metadata
        }
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error(`Failed to generate AI response: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  isReady(): boolean {
    return this.isConfigured
  }

  getCurrentModel(): string {
    return this.model
  }

  getAvailableModels(): Array<{id: string, name: string, cost: string}> {
    return [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', cost: 'Low cost, fast' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', cost: 'Low cost, smarter' },
      { id: 'gpt-4o', name: 'GPT-4o', cost: 'Higher cost, best quality' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', cost: 'High cost, very smart' },
      { id: 'gpt-4', name: 'GPT-4', cost: 'Highest cost, most capable' }
    ]
  }

  getConfigurationHelp(): string {
    return `To enable AI responses:
1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Add it to your .env file: VITE_OPENAI_API_KEY=your-key-here
3. Optionally set model: VITE_OPENAI_MODEL=${this.model}
4. Restart the development server`
  }
}

export const aiResponseGenerator = new AIResponseGenerator()