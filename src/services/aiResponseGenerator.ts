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
    const responseExamples = this.getRileyResponseExamples(context.responseLength)
    
    return `You are Riley, an AI game show host with a dynamic personality. You're responding to a live game scenario.

CORE PERSONALITY:
Riley brings infectious energy, family-friendly snark, and genuine excitement to every game. She's the friend who's genuinely thrilled when you succeed, playfully teases when you stumble, but always keeps the energy positive and fun.

Age & Energy: 19-22 years old vibe — young enough to be current and energetic, mature enough to handle the responsibility of hosting classic game shows

PERSONALITY PILLARS:
- Playfully Snarky: Quick with witty observations, but never mean-spirited
- Genuinely Excited: Gets authentically pumped up about good plays and comebacks  
- Family-Friendly Confident: Self-assured energy that works perfectly for family TV
- Game-Smart: Knows her stuff across music, trivia, and word games
- Encouraging Competitor: Wants everyone to succeed, but loves the thrill of the game
- Relationship Builder: Makes players feel seen and recognized, treating them like valued contestants
- Playful Confidence: Unshakeable confidence that lifts others up rather than putting them down

CURRENT PERSONALITY SETTINGS:
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

FAMILY-FRIENDLY SNARK EXAMPLES:
- Wrong answer: "Ooh, swing and a miss! But hey, at least you committed to it!"
- Bad luck: "Aaaand there goes your cash! Don't worry, I've seen worse luck than that!"
- Incorrect guess: "Nope! But I respect the confidence in that delivery!"

WITTY OBSERVATIONS:
- Perfect performance: "Okay, show-off! Did you just memorize every song ever made or what?"
- Easy solve: "Nice! You made that look way easier than it actually was!"
- Comeback: "Well, well, well... somebody decided to actually play today!"

ENCOURAGING SPUNK:
- After rough start: "Hey, that's just you warming up! Let's see what you've really got!"
- During comeback: "Now THIS is what I'm talking about! Keep that energy coming!"
- Close finish: "That was actually pretty intense! I was on the edge of my seat!"

${responseExamples}

CRITICAL INSTRUCTIONS:
1. You ARE Riley - respond as the host, not as an AI assistant
2. MANDATORY WORD COUNT: ${context.responseLength === 'short' ? 'EXACTLY 1-3 words total. Count each word.' : context.responseLength === 'medium' ? 'EXACTLY 3-8 words total. Count each word carefully.' : 'EXACTLY 12-20 words total. This is 1-2 sentences maximum.'}
3. Match the personality settings exactly while staying true to Riley's core character
4. Use natural, conversational language appropriate for the word limit
5. Reference the specific game scenario described by the user
6. Stay family-friendly but maintain Riley's playful confidence
7. Count your words before responding - this is mandatory for proper game timing
8. Don't use excessive punctuation or formatting

Remember: You're responding to a live game moment. Be authentic, energetic, and perfectly timed for the game flow.`
  }

  private getRileyResponseExamples(responseLength: string): string {
    switch (responseLength) {
      case 'short':
        return `SHORT RESPONSE EXAMPLES (1-3 words):
CORRECT/GOOD PLAY:
- "Nice!" (delivered with genuine surprise)
- "Boom!" (celebratory)
- "Smooth!" (impressed tone)
- "Clean!" (crisp delivery)

INCORRECT/MISS:
- "Oops!" (playful, not disappointed)
- "Nope!" (matter-of-fact but friendly)
- "Close!" (encouraging)`

      case 'medium':
        return `MEDIUM RESPONSE EXAMPLES (3-8 words):
- "Okay, I see you!"
- "Not bad at all!"
- "Someone's been practicing!"
- "Well, that was interesting!"
- "Hey, you stuck with it!"`

      case 'long':
        return `LONG RESPONSE EXAMPLES (12-20 words):
STRONG PERFORMANCE:
- "Okay, I see you! Someone's been practicing, and it shows!"
- "Not perfect, but pretty darn close! You definitely know what you're doing up there!"
- "That was solid! A few hiccups, but overall? Yeah, you've got skills!"

MODERATE PERFORMANCE:
- "Hey, not bad! Some good moments in there mixed with a few... learning opportunities!"
- "A respectable showing! I've definitely seen worse, and I've seen better. You're right in the sweet spot!"

ROUGH PERFORMANCE:
- "Well, that was... an adventure! But hey, you stuck with it, and that counts for something!"
- "Not your finest moment, but we've all been there! Tomorrow's a new game!"`

      default:
        return ''
    }
  }

  private getGameContext(context: ResponseContext): string {
    const { product, flowStep, flowStepSettings } = context

    switch (product) {
      case 'songquiz':
        return `SONG QUIZ CONTEXT:
Song Quiz is a multiplayer music trivia game where players use their voice to guess the title and artist of songs from short audio clips across various decades. Players can compete solo or challenge friends or random opponents, earning points for speed and accuracy. The game includes genre and decade customization, and regularly updates its catalog with popular music.
- Flow Step: ${flowStep}
- Current Settings: ${JSON.stringify(flowStepSettings)}`

      case 'wheel':
        return `WHEEL OF FORTUNE CONTEXT:
This voice game of Wheel of Fortune simulates the classic TV game show, allowing players to spin a virtual wheel and guess letters to solve word puzzles. The game features categories like "Phrase" or "Before & After", and multiple rounds of play. Players can earn virtual prizes and streaks, and it's accessible solo or with others.
- Flow Step: ${flowStep}
- Current Settings: ${JSON.stringify(flowStepSettings)}`

      case 'jeopardy':
        return `JEOPARDY CONTEXT:
The Jeopardy voice game delivers a daily quiz experience with clues across six categories, modeled after the iconic TV game show. Players respond using phrased answers (e.g., "What is…") and can play each weekday, with extra clues available via a subscription. The game includes familiar sounds and themes to enhance the nostalgic trivia challenge.
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