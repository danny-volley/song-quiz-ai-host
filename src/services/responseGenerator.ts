import type { 
  SandboxState, 
  GeneratedResponse, 
  ResponseContext, 
  PersonalityAnalysis,
  PersonalitySettings 
} from '../types'

class ResponseGenerator {
  private generateId(): string {
    return `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
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

  private generateResponseText(
    inputText: string, 
    context: ResponseContext, 
    personality: PersonalityAnalysis
  ): string {
    // Base response templates based on game type and personality
    const templates = this.getResponseTemplates(context, personality)
    
    // Select appropriate template based on flow step and context
    const template = this.selectTemplate(templates, context)
    
    // Generate personalized response
    const response = this.personalizeResponse(template, inputText, context, personality)
    
    return response
  }

  private getResponseTemplates(context: ResponseContext, _personality: PersonalityAnalysis) {
    const { product } = context

    const baseTemplates = {
      songquiz: {
        correct: [
          "Nice work! You nailed that one!",
          "Excellent! You've got great musical taste!",
          "Perfect! That was spot on!"
        ],
        incorrect: [
          "Oops! That was actually [correct answer]. Don't worry, happens to the best of us!",
          "Not quite! The answer was [correct answer]. You'll get the next one!",
          "Close, but that was [correct answer]. Keep your ears open!"
        ],
        streak: [
          "You're on fire! [count] songs in a row!",
          "Incredible streak! [count] correct answers!",
          "Wow! [count] songs and counting!"
        ]
      },
      wheel: {
        solve: [
          "Amazing solve! You figured that out with minimal letters!",
          "Incredible! That was a tough puzzle to crack!",
          "Outstanding puzzle solving skills!"
        ],
        bankrupt: [
          "Oh no! Bankrupt! That's gotta sting, but don't give up!",
          "Ouch! Hit the bankrupt, but there's still time to bounce back!",
          "Bankrupt! But hey, that's part of the game!"
        ],
        bigSpin: [
          "YES! Big money spin! [amount] on the board!",
          "Fantastic spin! [amount] is yours!",
          "What a spin! [amount] - that's serious money!"
        ]
      },
      jeopardy: {
        correct: [
          "That's right! Well done!",
          "Correct! You know your [category]!",
          "Yes! Great knowledge there!"
        ],
        incorrect: [
          "Not quite. The correct response was [answer].",
          "Oops! We were looking for [answer].",
          "No, but good try! The answer was [answer]."
        ],
        dailyDouble: [
          "Daily Double! How much are you wagering?",
          "You found the Daily Double! What's your wager?",
          "Daily Double time! Make your wager!"
        ]
      }
    }

    // Modify templates based on personality
    return this.adjustTemplatesForPersonality(baseTemplates[product], _personality)
  }

  private adjustTemplatesForPersonality(templates: any, _personality: PersonalityAnalysis) {
    // This would contain logic to modify response templates based on personality traits
    // For now, return as-is - this is where the real AI personality customization would happen
    return templates
  }

  private selectTemplate(templates: any, context: ResponseContext): string {
    // Select appropriate template based on flow step and settings
    const { flowStep, flowStepSettings } = context
    
    if (flowStep === 'round_result') {
      return flowStepSettings.isCorrect 
        ? templates.correct?.[0] || "Great job!"
        : templates.incorrect?.[0] || "Not quite, but keep trying!"
    }
    
    if (flowStep === 'streak_milestone') {
      return templates.streak?.[0] || "Amazing streak!"
    }
    
    return templates.correct?.[0] || "Well done!"
  }

  private personalizeResponse(
    template: string, 
    inputText: string, 
    context: ResponseContext, 
    personality: PersonalityAnalysis
  ): string {
    let response = template

    // Include context from input text in response
    const inputWords = inputText.toLowerCase().split(' ')
    if (inputWords.includes('perfect') || inputWords.includes('streak')) {
      response = response.replace('Great job!', 'Incredible streak!')
    } else if (inputWords.includes('wrong') || inputWords.includes('missed')) {
      response = response.replace('Well done!', "Don't worry, you'll get the next one!")
    }

    // Add personality flair based on settings
    if (personality.tone === 'playful') {
      response = this.addPlayfulElements(response)
    } else if (personality.tone === 'snarky') {
      response = this.addSnarkyElements(response)
    }

    // Adjust for excitement level
    if (personality.excitement === 'very-high') {
      response = this.addExcitementElements(response)
    }

    // Add context-specific details
    response = this.addContextDetails(response, inputText, context)

    // Adjust length based on response length setting
    response = this.adjustResponseLength(response, context.responseLength)

    return response
  }

  private addPlayfulElements(response: string): string {
    const playfulWords = ['Awesome', 'Fantastic', 'Amazing', 'Super', 'Wonderful']
    const randomPlayful = playfulWords[Math.floor(Math.random() * playfulWords.length)]
    return response.replace('Great', randomPlayful)
  }

  private addSnarkyElements(response: string): string {
    // Add a bit of edge to responses
    return response + " ...if I do say so myself!"
  }

  private addExcitementElements(response: string): string {
    return response + " 🎉"
  }

  private addContextDetails(response: string, _inputText: string, context: ResponseContext): string {
    // Add specific details from the input context
    if (context.players.length > 1) {
      const playerNames = context.players.map(p => p.name).join(' and ')
      response = response.replace(/You/g, playerNames)
    }
    
    return response
  }

  private adjustResponseLength(response: string, length: 'short' | 'medium' | 'long'): string {
    if (length === 'short') {
      return response.split('.')[0] + '.'
    } else if (length === 'long') {
      return response + " Keep up the great energy and let's see what comes next!"
    }
    return response
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
    const responseText = this.generateResponseText(inputText, context, personality)
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
  }
}

export const responseGenerator = new ResponseGenerator()