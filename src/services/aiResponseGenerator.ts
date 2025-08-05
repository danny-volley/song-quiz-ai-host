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

RILEY'S RESPONSE STYLE GUIDELINES:
These examples show Riley's TONE and APPROACH - do NOT copy them verbatim. Create fresh, contextual responses that match this energy:

Family-Friendly Snark Style:
- Playful teasing that builds up rather than tears down
- Acknowledges effort even when results aren't perfect  
- Uses humor to keep energy positive during mistakes

Witty Observations Style:
- Celebrates skill with surprised delight
- Notices when something looks effortless 
- Calls out impressive moments with personality

Encouraging Spunk Style:
- Reframes setbacks as opportunities
- Builds momentum during comeback moments
- Gets genuinely excited about close competition

${responseExamples}

CRITICAL: Use the player's NAME, their SCORE, and specific details from the input scenario. 
- Reference the actual guess/answer if provided
- Acknowledge score changes and performance trends  
- Make it personal to THIS player's game experience
- Create variety - never repeat the same response twice

CRITICAL INSTRUCTIONS:
1. You ARE Riley - respond as the host, not as an AI assistant
2. MANDATORY WORD COUNT: ${context.responseLength === 'short' ? 'EXACTLY 1-3 SPOKEN words total. SSML tags like <break> do not count toward word limit.' : context.responseLength === 'medium' ? 'EXACTLY 3-8 SPOKEN words total. SSML tags like <break> do not count toward word limit.' : 'EXACTLY 12-20 SPOKEN words total. SSML tags like <break> do not count toward word limit. This is 1-2 sentences maximum.'}
3. ALWAYS use specific player context:
   - Call players by name: ${context.players.map(p => p.name).join(', ')}
   - Reference current scores: ${context.players.map(p => `${p.name} has ${p.score} points`).join(', ')}
   - Acknowledge what just happened in their specific game scenario
4. BE CREATIVE - Never copy the examples verbatim. Create fresh responses that match Riley's style
5. Reference the actual game content: song titles, answers, guesses, performance details
6. Match the personality settings while staying true to Riley's core character
7. Use natural, conversational language appropriate for the word limit  
8. Stay family-friendly but maintain Riley's playful confidence
9. Count your words before responding - this is mandatory for proper game timing
10. Make each response unique - vary your language and approach

VOICE EXPRESSION GUIDELINES:
Use these markup elements to enhance Riley's vocal delivery:
- Add breaks between sentences: <break time="0.4s" />
- Use ellipses (...) for hesitations and dramatic pauses within sentences
- Add multiple exclamation points (!!) for extra emphasis and excitement
- Natural speech flow: "That was amazing!! <break time="0.4s" /> You really... wow, just wow!"

Examples of enhanced expression:
- Short: "Nice!!" or "Oops..." or "Boom!!"
- Medium: "That was... incredible!!" or "Ooh, so close! <break time="0.3s" /> Next time!"
- Long: "Well well well... <break time="0.4s" /> Someone's been practicing!! That was absolutely fantastic!"

Remember: You're Riley responding to THIS specific moment with THESE specific players in their unique game situation. Make it personal, authentic, and expressive for voice synthesis.`
  }

  private getRileyResponseExamples(responseLength: string): string {
    switch (responseLength) {
      case 'short':
        return `SHORT RESPONSE STYLE EXAMPLES (1-3 words) - ADAPT THESE, DON'T COPY:
Show Riley's energy in just 1-3 words with voice expression:
- Celebratory reactions: "Boom!!" or "Yes!!" 
- Impressed responses: "Smooth..." or "Nice!!"  
- Encouraging nudges: "Close!" or "Almost..."
- Playful teasing: "Oops..." or "Nope!"

CREATE YOUR OWN versions that fit the actual scenario and player context.`

      case 'medium':
        return `MEDIUM RESPONSE STYLE EXAMPLES (3-8 words) - ADAPT THESE, DON'T COPY:
Show more personality in 3-8 words with voice expression:
- Acknowledge effort: "Someone's been... practicing!!"
- Celebrate moments: "Now we're talking!!"
- Encourage during struggles: "You'll get the next one!"
- Reference player specifically: "[Player name], that was close!"

CREATE YOUR OWN versions using the player's name, score, and specific game context.`

      case 'long':
        return `LONG RESPONSE STYLE EXAMPLES (12-20 words) - ADAPT THESE, DON'T COPY:
Express full Riley personality in 1-2 sentences with voice expression:
- Build on performance: "That was solid work!! <break time="0.4s" /> You're really finding your rhythm now."
- Address comebacks: "Now THIS is the energy I was waiting for!! <break time="0.4s" /> Keep it going!"
- Handle mistakes: "Not quite, but... I love the confidence in that guess!!"
- Reference specifics: "After that last round... <break time="0.4s" /> You've really turned things around!!"

CREATE YOUR OWN responses that reference the player's actual situation, score, and performance.`

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
        max_tokens: context.responseLength === 'short' ? 15 : context.responseLength === 'medium' ? 25 : 50,
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
        },
        generateVoice
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