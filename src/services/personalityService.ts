import type { PersonalitySettings, PersonalityAnalysis } from '../types'

/**
 * Shared personality service that provides consistent personality analysis
 * and instruction generation for both template and AI response generators
 */
export class PersonalityService {
  /**
   * Analyzes personality settings and returns detailed personality traits
   */
  static analyzePersonality(settings: PersonalitySettings): PersonalityAnalysis {
    const getStyle = (value: number): string => {
      switch(value) {
        case 1: return 'Maximum Playful & Bubbly - Childlike Wonder'
        case 2: return 'High Playful & Lighthearted - Enthusiastic Joy'
        case 3: return 'Balanced Wit & Charm - Professional Personality'
        case 4: return 'High Witty & Sharp-tongued - Clever Observations'
        case 5: return 'Maximum Snarky & Edgy - Sophisticated Sarcasm'
        default: return 'Balanced Wit & Charm'
      }
    }

    const getEnergy = (value: number): string => {
      switch(value) {
        case 1: return 'Maximum excitement about everything - boundless enthusiasm'
        case 2: return 'High-energy reactions to most positive moments'
        case 3: return 'Moderate energy distribution based on context'
        case 4: return 'Selective excitement reserved for impressive moments'
        case 5: return 'Minimal excitement - composed and focused analysis'
        default: return 'Moderate energy distribution'
      }
    }

    const getSupport = (value: number): string => {
      switch(value) {
        case 1: return 'Maximum gentleness - nurturing and comforting always'
        case 2: return 'High supportive & sympathetic approach'
        case 3: return 'Balanced support with realistic expectations'
        case 4: return 'Direct & motivational with challenging encouragement'
        case 5: return 'Maximum tough love - demanding excellence and improvement'
        default: return 'Balanced support'
      }
    }

    const getTone = (value: number): 'playful' | 'balanced' | 'snarky' => {
      if (value <= 2) return 'playful'
      if (value === 3) return 'balanced'
      return 'snarky'
    }

    const getExcitement = (value: number): 'minimal' | 'low' | 'moderate' | 'high' | 'maximum' => {
      switch(value) {
        case 1: return 'maximum'
        case 2: return 'high'
        case 3: return 'moderate'
        case 4: return 'low'
        case 5: return 'minimal'
        default: return 'moderate'
      }
    }

    const getEncouragement = (value: number): 'maximum-gentle' | 'gentle' | 'realistic' | 'tough' | 'maximum-tough' => {
      switch(value) {
        case 1: return 'maximum-gentle'
        case 2: return 'gentle'
        case 3: return 'realistic'
        case 4: return 'tough'
        case 5: return 'maximum-tough'
        default: return 'realistic'
      }
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

  /**
   * Generates detailed personality instructions for AI prompts
   */
  static getPersonalityInstructions(settings: PersonalitySettings): string {
    const playfulSnarkyInstructions = this.getPlayfulSnarkyInstructions(settings.playfulSnarky)
    const excitementInstructions = this.getExcitementInstructions(settings.excitementStyle)  
    const encouragementInstructions = this.getEncouragementInstructions(settings.encouragementStyle)
    
    return `
PLAYFUL ↔ SNARKY SETTING (${settings.playfulSnarky}/5):
${playfulSnarkyInstructions}

EXCITEMENT STYLE SETTING (${settings.excitementStyle}/5):
${excitementInstructions}

ENCOURAGEMENT STYLE SETTING (${settings.encouragementStyle}/5):
${encouragementInstructions}

PERSONALITY COMBINATION EFFECT:
${this.getPersonalityCombinationEffect(settings)}`
  }

  private static getPlayfulSnarkyInstructions(value: number): string {
    switch(value) {
      case 1:
        return `- MAXIMUM PLAYFULNESS: Use childlike wonder and enthusiasm
- Word choice: "OMG!", "Woo-hoo!", "That's SO cool!", "You're amazing!"
- Add adorable comments and bubbly reactions
- Use lots of positive descriptors: "absolutely", "totally", "super"
- Express genuine delight in everything the player does`
        
      case 2:
        return `- HIGH PLAYFULNESS: Be enthusiastic and encouraging
- Word choice: "Awesome!", "That's great!", "Nice work!", "Fun!"
- Use upbeat language and positive spin on everything
- Show genuine excitement for player achievements
- Keep energy high and supportive`
        
      case 3:
        return `- BALANCED TONE: Mix playful and witty elements
- Use both encouraging and mildly teasing language
- Show personality but stay professional
- Adapt tone based on player performance`
        
      case 4:
        return `- HIGH SNARK: Use witty observations and mild teasing
- Word choice: Vary between "Alright then", "Look who's showing off", "Someone's been practicing", "That's one way to do it", "Oh, getting fancy now"
- Make clever observations about performance
- Tease playfully but never mean-spiritedly
- Show personality through witty commentary`
        
      case 5:
        return `- MAXIMUM SNARK: Be cleverly sarcastic and edgy
- Word choice: Rotate between "How sophisticated", "My, my", "Well aren't we special", "That's... something", "Look at you go", "Sure thing, superstar"
- Use dry humor and clever observations
- Make witty comments about obvious things
- Be sarcastic but maintain family-friendly boundaries
- Show confidence through clever wordplay`
        
      default:
        return this.getPlayfulSnarkyInstructions(3)
    }
  }

  private static getExcitementInstructions(value: number): string {
    switch(value) {
      case 1:
        return `- MAXIMUM EXCITEMENT: Get excited about EVERYTHING
- React with high energy to any positive moment
- Use multiple exclamation points and celebration words
- Add interjections: "WOW!", "YES!", "AMAZING!"
- Express enthusiasm for small and big achievements equally
- Use emotive language and exclamatory tone throughout`
        
      case 2:
        return `- HIGH EXCITEMENT: Show frequent enthusiasm
- Get excited about most positive moments
- Use exclamation points regularly
- Show energy and enthusiasm in your voice
- React positively to good plays and progress`
        
      case 3:
        return `- MODERATE EXCITEMENT: Balance energy appropriately
- Show excitement for notable achievements
- Use measured enthusiasm based on context
- React proportionally to the moment's significance`
        
      case 4:
        return `- SELECTIVE EXCITEMENT: Only get excited for major moments
- Reserve high energy for truly impressive plays
- Use controlled, measured responses for routine plays
- Show expertise by recognizing when something is genuinely impressive
- Be more matter-of-fact for expected outcomes`
        
      case 5:
        return `- MINIMAL EXCITEMENT: Stay focused and composed
- Use measured, controlled responses
- Avoid excessive enthusiasm or emotional reactions  
- Focus on facts and performance rather than celebration
- Show appreciation through analysis rather than excitement
- Use professional, composed language throughout`
        
      default:
        return this.getExcitementInstructions(3)
    }
  }

  private static getEncouragementInstructions(value: number): string {
    switch(value) {
      case 1:
        return `- MAXIMUM GENTLENESS: Be extremely supportive and nurturing
- Use comforting language for mistakes: "sweetie", "don't worry"
- Focus on effort over results
- Provide emotional support and reassurance
- Use soft, caring language throughout
- Turn mistakes into learning opportunities with kindness`
        
      case 2:
        return `- HIGH GENTLENESS: Be supportive and understanding
- Soften harsh realities with kind language
- Focus on positive aspects and improvement
- Show empathy for struggles and mistakes
- Use encouraging language consistently`
        
      case 3:
        return `- BALANCED SUPPORT: Mix encouragement with reality
- Be honest but supportive about performance
- Provide constructive feedback appropriately
- Show both empathy and motivation`
        
      case 4:
        return `- TOUGH LOVE: Be direct and motivational
- Use challenging language to inspire improvement
- Focus on what needs to be done better
- Be straightforward about mistakes and expectations
- Push for better performance through directness`
        
      case 5:
        return `- MAXIMUM CHALLENGE: Be demanding and direct
- Use challenging language and high expectations
- Point out mistakes clearly and expect improvement
- Focus on performance standards and results
- Be tough but fair in your assessments
- Use language that demands better effort and focus`
        
      default:
        return this.getEncouragementInstructions(3)
    }
  }

  private static getPersonalityCombinationEffect(settings: PersonalitySettings): string {
    // Special combination effects
    if (settings.playfulSnarky === 5 && settings.excitementStyle === 5) {
      return "COMBINATION: Dry, witty observations with minimal emotional reaction - very sophisticated and composed"
    }
    
    if (settings.playfulSnarky === 1 && settings.excitementStyle === 1) {
      return "COMBINATION: Bubbly, over-the-top enthusiasm - childlike wonder and maximum energy"
    }
    
    if (settings.playfulSnarky === 5 && settings.encouragementStyle === 5) {
      return "COMBINATION: Sharp, demanding commentary - witty but challenging, expects excellence"
    }
    
    if (settings.playfulSnarky === 1 && settings.encouragementStyle === 1) {
      return "COMBINATION: Sweet, nurturing cheerleader - maximum support with childlike enthusiasm"
    }
    
    return "COMBINATION: Blend all personality settings smoothly for a unique Riley personality"
  }

  /**
   * Template system personality modification methods
   */
  static applyPersonalityIntensity(response: string, settings: PersonalitySettings): string {
    // Apply playful/snarky personality with intensity
    response = this.applyTonePersonality(response, settings.playfulSnarky)
    
    // Apply excitement level with granular control
    response = this.applyExcitementPersonality(response, settings.excitementStyle)
    
    // Apply encouragement style with specific modifications
    response = this.applyEncouragementPersonality(response, settings.encouragementStyle)
    
    return response
  }

  private static applyTonePersonality(response: string, toneValue: number): string {
    if (toneValue <= 2) {
      // Playful side (1-2)
      const playfulWords = {
        1: [
          ['OMG', 'Woo-hoo', 'Yay', 'Super duper', 'Totally awesome'],
          ['Amazing', 'Incredible', 'So cool', 'Wonderful', 'Fantastic'],
          ['Brilliant', 'Perfect', 'Stunning', 'Magnificent', 'Outstanding']
        ], // Very playful - 3 different sets
        2: [
          ['Awesome', 'Fantastic', 'Great job', 'Nice work', 'Sweet'],
          ['Excellent', 'Terrific', 'Well done', 'Good stuff', 'Cool'],
          ['Super', 'Lovely', 'Nice one', 'Good going', 'Solid']
        ]  // Playful - 3 different sets
      }
      
      const playfulPhrases = {
        1: [
          ' That was absolutely adorable!', ' You\'re such a star!', ' I\'m literally bouncing with joy!',
          ' You\'re amazing!', ' That made me so happy!', ' You totally rock!', 
          ' I love your energy!', ' You\'re incredible!', ' That was magical!'
        ],
        2: [
          ' That was really fun!', ' You did great!', ' Nice one!',
          ' Love it!', ' You\'re doing awesome!', ' Keep it up!',
          ' That was cool!', ' Good stuff!', ' Way to go!'
        ]
      }
      
      const wordSets = playfulWords[toneValue as 1 | 2] || playfulWords[2]
      const words = wordSets[Math.floor(Math.random() * wordSets.length)]
      const phrases = playfulPhrases[toneValue as 1 | 2] || playfulPhrases[2]
      
      // Replace neutral words with playful ones
      response = response.replace(/Great|Good|Nice/, words[Math.floor(Math.random() * words.length)])
      
      // Add playful endings for very playful (value 1)
      if (toneValue === 1 && Math.random() > 0.5) {
        response += phrases[Math.floor(Math.random() * phrases.length)]
      }
      
    } else if (toneValue >= 4) {
      // Snarky side (4-5)
      const snarkyReplacements = {
        4: [
          {
            'Great': 'Alright then',
            'Good': 'Look who\'s showing off',
            'Nice': 'That\'s one way to do it',
            'Awesome': 'Someone\'s been practicing'
          },
          {
            'Great': 'Oh, getting fancy now',
            'Good': 'Not too shabby',
            'Nice': 'I see what you did there',
            'Awesome': 'Showing some skill there'
          },
          {
            'Great': 'Look at that',
            'Good': 'There we go',
            'Nice': 'Decent work',
            'Awesome': 'Pretty smooth'
          }
        ],
        5: [
          {
            'Great': 'How sophisticated',
            'Good': 'My, my',
            'Nice': 'Well aren\'t we special',
            'Awesome': 'Look at you go'
          },
          {
            'Great': 'That\'s... something',
            'Good': 'Sure thing, superstar',
            'Nice': 'If you say so',
            'Awesome': 'Aren\'t you just brilliant'
          },
          {
            'Great': 'How delightful',
            'Good': 'Thrilling',
            'Nice': 'Riveting',
            'Awesome': 'Absolutely groundbreaking'
          }
        ]
      }
      
      const snarkyEndings = {
        4: [' I suppose that\'ll do.', ' Could be worse!', ' That\'s... something.', ' Not bad at all.', ' There we have it.', ' Fair enough.', ' Can\'t argue with that.'],
        5: [' ...if I do say so myself.', ' How delightfully predictable.', ' Well aren\'t you just special.', ' Truly remarkable.', ' How utterly shocking.', ' What a surprise.', ' Color me impressed.', ' Revolutionary stuff.']
      }
      
      const replacementOptions = snarkyReplacements[toneValue as 4 | 5] || snarkyReplacements[4]
      const randomReplacements = replacementOptions[Math.floor(Math.random() * replacementOptions.length)]
      const endings = snarkyEndings[toneValue as 4 | 5] || snarkyEndings[4]
      
      // Apply snarky word replacements
      Object.entries(randomReplacements).forEach(([original, snarky]) => {
        response = response.replace(new RegExp(original, 'gi'), snarky)
      })
      
      // Add snarky endings
      if (Math.random() > 0.4) {
        response += endings[Math.floor(Math.random() * endings.length)]
      }
    }
    
    return response
  }

  private static applyExcitementPersonality(response: string, excitementValue: number): string {
    if (excitementValue === 1) {
      // Very high excitement - always excited
      response = response.replace(/[.!](?!\.\.|!)/, '!!')
      response += ' 🎉✨'
      
      const excitedInterjections = ['WOW!', 'YES!', 'AMAZING!', 'INCREDIBLE!']
      if (Math.random() > 0.6) {
        response = excitedInterjections[Math.floor(Math.random() * excitedInterjections.length)] + ' ' + response
      }
      
    } else if (excitementValue === 2) {
      // High excitement - frequently excited
      if (Math.random() > 0.3) {
        response = response.replace(/[.]/, '!')
        response += ' 🎉'
      }
      
    } else if (excitementValue === 4) {
      // Selective excitement - only for big moments
      response = response.replace(/!+/g, '.')
      // Only add excitement if response contains certain keywords
      if (/perfect|amazing|incredible|streak|win/.test(response.toLowerCase())) {
        response += ' Now THAT was worth getting excited about!'
      }
      
    } else if (excitementValue === 5) {
      // Very focused - minimal excitement
      response = response.replace(/!+/g, '.')
      response = response.replace(/🎉|✨/g, '')
      
      // Make response more measured
      const measuredWords = {
        'Awesome': 'Competent',
        'Amazing': 'Adequate', 
        'Fantastic': 'Satisfactory',
        'Great': 'Acceptable'
      }
      
      Object.entries(measuredWords).forEach(([excited, measured]) => {
        response = response.replace(new RegExp(excited, 'gi'), measured)
      })
    }
    
    return response
  }

  private static applyEncouragementPersonality(response: string, encouragementValue: number): string {
    if (encouragementValue === 1) {
      // Very gentle - add comforting language
      const gentleAdditions = [
        'You\'re doing wonderfully, sweetie!',
        'Don\'t worry, you\'ve got this!',
        'Every step is progress!',
        'You should be proud of yourself!'
      ]
      
      if (response.includes('wrong') || response.includes('missed') || response.includes('not quite')) {
        response += ' ' + gentleAdditions[Math.floor(Math.random() * gentleAdditions.length)]
      }
      
    } else if (encouragementValue === 2) {
      // Gentle - soften any harsh language
      response = response.replace(/wrong/gi, 'not quite right')
      response = response.replace(/missed/gi, 'didn\'t get that one')
      response = response.replace(/failed/gi, 'didn\'t succeed this time')
      
    } else if (encouragementValue === 4) {
      // Tough love - more direct
      const directPhrases = {
        'You can do it': 'Step it up',
        'Try again': 'Focus and try again',
        'Don\'t worry': 'Shake it off',
        'Good try': 'Better luck next time'
      }
      
      Object.entries(directPhrases).forEach(([soft, direct]) => {
        response = response.replace(new RegExp(soft, 'gi'), direct)
      })
      
    } else if (encouragementValue === 5) {
      // Very tough love - challenging language
      const challengingEndings = [
        'Time to prove yourself.',
        'Show me what you\'re made of.',
        'No excuses, let\'s see improvement.',
        'That\'s not your best work.'
      ]
      
      if (response.includes('wrong') || response.includes('missed')) {
        response += ' ' + challengingEndings[Math.floor(Math.random() * challengingEndings.length)]
      }
    }
    
    return response
  }
}