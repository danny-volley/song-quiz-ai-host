import type { 
  SandboxState, 
  GeneratedResponse, 
  ResponseContext, 
  PersonalityAnalysis,
  PersonalitySettings 
} from '../types'
import { PersonalityService } from './personalityService'

class ResponseGenerator {
  private generateId(): string {
    return `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private analyzePersonality(settings: PersonalitySettings): PersonalityAnalysis {
    return PersonalityService.analyzePersonality(settings)
  }

  private generateResponseText(
    inputText: string, 
    context: ResponseContext
  ): string {
    // Base response templates based on game type and personality
    const templates = this.getResponseTemplates(context)
    
    // Select appropriate template based on flow step and context
    const template = this.selectTemplate(templates, context)
    
    // Generate personalized response
    const response = this.personalizeResponse(template, inputText, context)
    
    return response
  }

  private getResponseTemplates(context: ResponseContext) {
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
    return this.adjustTemplatesForPersonality(baseTemplates[product])
  }

  private adjustTemplatesForPersonality(templates: Record<string, unknown>) {
    // This would contain logic to modify response templates based on personality traits
    // For now, return as-is - this is where the real AI personality customization would happen
    return templates
  }

  private selectTemplate(templates: Record<string, unknown>, context: ResponseContext): string {
    // Select appropriate template based on flow step and settings
    const { flowStep, flowStepSettings } = context
    
    if (flowStep === 'round_result') {
      const correctTemplates = templates.correct as string[] || []
      const incorrectTemplates = templates.incorrect as string[] || []
      return flowStepSettings.isCorrect 
        ? correctTemplates[0] || "Great job!"
        : incorrectTemplates[0] || "Not quite, but keep trying!"
    }
    
    if (flowStep === 'streak_milestone') {
      const streakTemplates = templates.streak as string[] || []
      return streakTemplates[0] || "Amazing streak!"
    }
    
    const correctTemplates = templates.correct as string[] || []
    return correctTemplates[0] || "Well done!"
  }

  private personalizeResponse(
    template: string, 
    inputText: string, 
    context: ResponseContext
  ): string {
    let response = template

    // Include context from input text in response
    const inputWords = inputText.toLowerCase().split(' ')
    if (inputWords.includes('perfect') || inputWords.includes('streak')) {
      response = response.replace('Great job!', 'Incredible streak!')
    } else if (inputWords.includes('wrong') || inputWords.includes('missed')) {
      response = response.replace('Well done!', "Don't worry, you'll get the next one!")
    }

    // Apply comprehensive personality modifications
    response = PersonalityService.applyPersonalityIntensity(response, context.personalitySettings)

    // Add context-specific details
    response = this.addContextDetails(response, inputText, context)

    // Adjust length based on response length setting
    response = this.adjustResponseLength(response, context.responseLength, context)

    return response
  }


  private addContextDetails(response: string, _inputText: string, context: ResponseContext): string {
    // Add specific details from the input context
    if (context.players.length > 1) {
      const playerNames = context.players.map(p => p.name).join(' and ')
      response = response.replace(/You/g, playerNames)
    }
    
    return response
  }

  private adjustResponseLength(response: string, length: 'short' | 'medium' | 'long', context: ResponseContext): string {
    if (length === 'short') {
      // Always use PersonalityService for varied short responses to prevent repetition
      const isCorrect = /great|good|nice|perfect|awesome|excellent|correct|right|yes|nailed|spot on/i.test(response)
      
      // Use PersonalityService for all short responses to ensure variety
      return PersonalityService.generateShortResponse(isCorrect, context.personalitySettings)
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
    state: SandboxState,
    generateVoice: boolean = true
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
    const responseText = this.generateResponseText(inputText, context)
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
  }
}

export const responseGenerator = new ResponseGenerator()