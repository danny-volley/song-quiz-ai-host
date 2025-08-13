import type { 
  SandboxState, 
  GeneratedResponse, 
  ResponseContext, 
  PersonalityAnalysis,
  PersonalitySettings,
  SelectedPersonality
} from '../types'
import { PersonalityService } from './personalityService'
import { MultiAIProvider, type AIProvider, type AIModel } from './aiProviders'
import { getPersonalityById } from '../data/personalities'

class AIResponseGenerator {
  private aiProvider: MultiAIProvider

  constructor() {
    this.aiProvider = new MultiAIProvider()
  }

  private generateId(): string {
    return `ai_response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private analyzePersonality(settings: PersonalitySettings): PersonalityAnalysis {
    return PersonalityService.analyzePersonality(settings)
  }

  private buildSystemPrompt(context: ResponseContext): string {
    const gameContext = this.getGameContext(context)
    const responseExamples = this.getResponseExamples(context.responseLength, context.selectedPersonality)
    
    // Get the selected personality profile
    const personality = getPersonalityById(context.selectedPersonality.id)
    if (!personality) {
      throw new Error(`Personality not found: ${context.selectedPersonality.id}`)
    }
    
    return `${personality.systemPromptCore}

CORE PERSONALITY:
${personality.corePersonality}

Age & Energy: ${personality.age}

PERSONALITY PILLARS:
${personality.personalityPillars.map(pillar => `- ${pillar}`).join('\n')}

/* Temporarily disabled - using original personality profile instead of slider overrides
CURRENT PERSONALITY SETTINGS (CRITICAL - FOLLOW THESE EXACTLY):
${PersonalityService.getPersonalityInstructions(context.personalitySettings)}
*/

GAME CONTEXT:
- Game: ${context.product.toUpperCase()}
- Mode: ${context.gameMode}
- Players: ${['round_result', 'game_result', 'streak_milestone', 'comeback_moment', 'answer_steal'].includes(context.flowStep) ? 
    context.players.map(p => `${p.name} (${p.score} points)`).join(', ') : 
    context.players.map(p => p.name).join(', ')}
- Current Flow Step: ${context.flowStep.replace('_', ' ')}
- Response Length: ${context.responseLength}

${gameContext}

${personality.displayName.toUpperCase()}'S RESPONSE STYLE GUIDELINES:
These examples show ${personality.displayName}'s TONE and APPROACH - do NOT copy them verbatim. Create fresh, contextual responses that match this energy:

${personality.expressionStyle}

${responseExamples}

CRITICAL: Use the player's NAME and specific details from the input scenario. 
- Reference the actual guess/answer if provided
${['round_result', 'game_result', 'streak_milestone', 'comeback_moment', 'answer_steal'].includes(context.flowStep) ? 
  '- Acknowledge score changes and performance trends when relevant' : 
  '- Focus on the musical moments and player engagement rather than competitive elements'}
- Make it personal to THIS player's game experience
- Create variety - never repeat the same response twice

CRITICAL INSTRUCTIONS:
1. You ARE ${personality.displayName} - respond as the host, not as an AI assistant
2. MANDATORY WORD COUNT: ${context.responseLength === 'short' ? 'EXACTLY 1-3 SPOKEN words total. SSML tags like <break> do not count toward word limit.' : context.responseLength === 'medium' ? 'EXACTLY 3-8 SPOKEN words total. SSML tags like <break> do not count toward word limit.' : context.responseLength === 'banter' ? 'EXACTLY 16-30 SPOKEN words total. SSML tags like <break> do not count toward word limit. Use 2-3 sentences for natural host commentary.' : 'EXACTLY 12-20 SPOKEN words total. SSML tags like <break> do not count toward word limit. This is 1-2 sentences maximum.'}
3. Use appropriate player context:
   - Call players by name: ${context.players.map(p => p.name).join(', ')}
   ${['round_result', 'game_result', 'streak_milestone', 'comeback_moment', 'answer_steal'].includes(context.flowStep) ? 
     `- Reference current scores when relevant: ${context.players.map(p => `${p.name} has ${p.score} points`).join(', ')}` : 
     '- Focus on the musical experience and player interactions rather than scores'}
   - Acknowledge what just happened in their specific game scenario
4. BE CREATIVE - Never copy the examples verbatim. Create fresh responses that match ${personality.displayName}'s style
5. Reference the actual game content: song titles, answers, guesses, performance details
6. Match the personality settings while staying true to ${personality.displayName}'s core character
7. Use natural, conversational language appropriate for the word limit  
8. Stay family-friendly but maintain ${personality.displayName}'s personality
9. Count your words before responding - this is mandatory for proper game timing
10. Make each response unique - vary your language and approach

VOICE EXPRESSION GUIDELINES:
${personality.voiceGuidelines}

Remember: You're ${personality.displayName} responding to THIS specific moment with THESE specific players in their unique game situation. Make it personal, authentic, and expressive for voice synthesis.`
  }


  private getResponseExamples(responseLength: string, selectedPersonality: SelectedPersonality): string {
    // Get the personality profile
    const personality = getPersonalityById(selectedPersonality.id)
    if (!personality) {
      return '' // Fallback if personality not found
    }
    switch (responseLength) {
      case 'short':
        return `SHORT RESPONSE STYLE EXAMPLES (1-3 words) - ADAPT THESE, DON'T COPY:
Show ${personality.displayName}'s energy in just 1-3 words with voice expression:
- Celebratory reactions: ${personality.shortExamples.celebratory.map(ex => `"${ex}"`).join(' or ')}
- Impressed responses: ${personality.shortExamples.impressed.map(ex => `"${ex}"`).join(' or ')}
- Encouraging nudges: ${personality.shortExamples.encouraging.map(ex => `"${ex}"`).join(' or ')}
- Snarky responses: ${personality.shortExamples.snarky.map(ex => `"${ex}"`).join(' or ')}

Focus on 2-3 word phrases over single words. CREATE YOUR OWN versions that fit the actual scenario and player context. Use variety to avoid repetition of overused phrases!`

      case 'medium':
        return `MEDIUM RESPONSE STYLE EXAMPLES (3-8 words) - ADAPT THESE, DON'T COPY:
Show more ${personality.displayName} personality in 3-8 words with voice expression:
- Correct answers: ${personality.mediumExamples.correct.map(ex => `"${ex}"`).join(' or ')}
- Incorrect answers: ${personality.mediumExamples.incorrect.map(ex => `"${ex}"`).join(' or ')}
- Transitions: ${personality.mediumExamples.transition.map(ex => `"${ex}"`).join(' or ')}

CREATE YOUR OWN versions using the player's name, score, and specific game context.`

      case 'long':
        return `LONG RESPONSE STYLE EXAMPLES (12-20 words) - ADAPT THESE, DON'T COPY:
Express full ${personality.displayName} personality in 1-2 sentences with voice expression:
- Performance feedback: ${personality.longExamples.performance.map(ex => `"${ex}"`).join(' or ')}
- Comeback moments: ${personality.longExamples.comeback.map(ex => `"${ex}"`).join(' or ')}
- General banter: ${personality.longExamples.banter.map(ex => `"${ex}"`).join(' or ')}

CREATE YOUR OWN responses that reference the player's actual situation, score, and performance.`

      case 'banter':
        return `BANTER RESPONSE STYLE EXAMPLES (16-30 words) - ADAPT THESE, DON'T COPY:
Express ${personality.displayName}'s conversational hosting style in 2-3 sentences:
- Musical observations: ${personality.banterExamples.musical.map(ex => `"${ex}"`).join(' or ')}
- Cultural commentary: ${personality.banterExamples.cultural.map(ex => `"${ex}"`).join(' or ')}
- Observational humor: ${personality.banterExamples.observational.map(ex => `"${ex}"`).join(' or ')}

CREATE YOUR OWN host commentary that fits the current game moment and player situation.`

      default:
        return ''
    }
  }

  private getGameContext(context: ResponseContext): string {
    const { product, flowStep, flowStepSettings } = context
    
    // Filter settings to only include relevant ones for each game
    const getRelevantSettings = (product: string, settings: Record<string, unknown>) => {
      switch (product) {
        case 'songquiz': {
          const { isCorrect, performance, streakCount, difficulty } = settings
          return { isCorrect, performance, streakCount, difficulty }
        }
        case 'wheel': {
          const { spinValue, difficulty: wheelDifficulty } = settings
          return { spinValue, difficulty: wheelDifficulty }
        }
        case 'jeopardy': {
          const { wagerAmount, difficulty: jeopardyDifficulty } = settings
          return { wagerAmount, difficulty: jeopardyDifficulty }
        }
        default:
          return settings
      }
    }
    
    const relevantSettings = getRelevantSettings(product, flowStepSettings as Record<string, unknown>)

    switch (product) {
      case 'songquiz':
        return `SONG QUIZ CONTEXT:
Song Quiz is a multiplayer music trivia game where players use their voice to guess the title and artist of songs from short audio clips across various decades. Players can compete solo or challenge friends or random opponents, earning points for speed and accuracy (typically 10-20 points per correct answer). The game includes genre and decade customization, and regularly updates its catalog with popular music.
- Flow Step: ${flowStep}
- Current Settings: ${JSON.stringify(relevantSettings)}`

      case 'wheel':
        return `WHEEL OF FORTUNE CONTEXT:
This voice game of Wheel of Fortune simulates the classic TV game show, allowing players to spin a virtual wheel and guess letters to solve word puzzles. The game features categories like "Phrase" or "Before & After", and multiple rounds of play. Players can earn virtual prizes and streaks, and it's accessible solo or with others.
- Flow Step: ${flowStep}
- Current Settings: ${JSON.stringify(relevantSettings)}`

      case 'jeopardy':
        return `JEOPARDY CONTEXT:
The Jeopardy voice game delivers a daily quiz experience with clues across six categories, modeled after the iconic TV game show. Players respond using phrased answers (e.g., "What is…") and can play each weekday, with extra clues available via a subscription. The game includes familiar sounds and themes to enhance the nostalgic trivia challenge.
- Flow Step: ${flowStep}
- Current Settings: ${JSON.stringify(relevantSettings)}`

      default:
        return `GAME CONTEXT: Generic game show scenario`
    }
  }

  private calculateMetadata(response: string, processingTime: number) {
    // Remove SSML tags before counting words for accurate metrics
    const cleanText = response.replace(/<break[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    const wordCount = cleanText.split(/\s+/).length
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
    state: SandboxState,
    generateVoice: boolean = true
  ): Promise<GeneratedResponse> {
    if (!this.isReady()) {
      throw new Error('AI provider not configured. Please add your API key to the .env file.')
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
      personalitySettings: state.personalitySettings,
      selectedPersonality: state.selectedPersonality
    }

    const personality = this.analyzePersonality(state.personalitySettings)
    const systemPrompt = this.buildSystemPrompt(context)

    try {
      const maxTokens = context.responseLength === 'short' ? 15 : context.responseLength === 'medium' ? 25 : context.responseLength === 'banter' ? 75 : 50
      const aiResponse = await this.aiProvider.generateResponse(
        `Game Scenario: ${inputText}`,
        systemPrompt,
        maxTokens
      )

      const responseText = aiResponse.text
      const processingTime = aiResponse.processingTime
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
        },
        generateVoice
      }
    } catch (error) {
      console.error('AI API error:', error)
      throw new Error(`Failed to generate AI response: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  isReady(): boolean {
    return this.aiProvider.isReady()
  }

  getCurrentModel(): string {
    return this.aiProvider.getCurrentModel()
  }

  getCurrentProvider(): AIProvider {
    return this.aiProvider.getCurrentProvider()
  }

  setProvider(provider: AIProvider): boolean {
    return this.aiProvider.setProvider(provider)
  }

  getAvailableModels(): AIModel[] {
    return this.aiProvider.getAllAvailableModels()
  }

  getModelsForCurrentProvider(): AIModel[] {
    return this.aiProvider.getModelsForCurrentProvider()
  }

  setModel(modelId: string): boolean {
    return this.aiProvider.setModel(modelId)
  }

  getAvailableProviders(): Array<{provider: AIProvider, name: string, ready: boolean}> {
    return this.aiProvider.getAvailableProviders()
  }

  getConfigurationHelp(): string {
    return this.aiProvider.getConfigurationHelp()
  }
}

export const aiResponseGenerator = new AIResponseGenerator()