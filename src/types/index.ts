export type ProductType = 'songquiz' | 'wheel' | 'jeopardy'

export type ResponseLength = 'short' | 'medium' | 'long' | 'banter'

export type GameMode = 'single' | 'multiplayer'

export interface Player {
  id: string
  name: string
  score: number
}

export interface PersonalitySettings {
  playfulSnarky: number        // 1=Playful, 5=Snarky
  excitementStyle: number      // 1=Easily Excited, 5=Focused Excitement
  encouragementStyle: number   // 1=Gentle Encouragement, 5=Tough Love
}

export interface SelectedPersonality {
  id: string
  name: string
}

export interface SelectedVoice {
  id: string
  name: string
}

export interface ResponseLengthInfo {
  id: ResponseLength
  label: string
  description: string
  wordCount: string
}

export interface Product {
  id: ProductType
  name: string
  description: string
  flowSteps: FlowStep[]
}

export type FlowStepType = 'round_result' | 'game_result' | 'streak_milestone' | 'comeback_moment' | 'answer_steal' | 'playlist_selection' | 'banter' |
                          'puzzle_solve' | 'bankrupt' | 'big_money_spin' | 'final_puzzle' |
                          'daily_double' | 'category_completion' | 'final_jeopardy' | 'score_momentum'

export interface FlowStepSettings {
  // Round Result settings
  isCorrect?: boolean
  
  // Game Result settings (1-5 performance scale)
  performance?: number
  
  // Streak Milestone settings
  streakCount?: number
  
  // Big Money Spin settings
  spinValue?: number
  
  // Daily Double settings
  wagerAmount?: number
  
  // General settings that could apply to multiple types
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface FlowStep {
  id: string
  name: string
  description: string
  type: FlowStepType
  hasSettings: boolean
}

export interface SandboxState {
  selectedProduct: ProductType | null
  selectedResponseLength: ResponseLength
  selectedGameMode: GameMode
  selectedFlowStep: string | null
  flowStepSettings: FlowStepSettings
  personalitySettings: PersonalitySettings
  selectedPersonality: SelectedPersonality
  selectedVoice: SelectedVoice
  players: Player[]
  inputText: string
  lastResponse?: GeneratedResponse
}

export interface GeneratedResponse {
  id: string
  timestamp: number
  input: {
    text: string
    mode: 'text' | 'voice'
  }
  context: ResponseContext
  response: {
    text: string
    personality: PersonalityAnalysis
    metadata: ResponseMetadata
  }
  generateVoice: boolean
}

export interface ResponseContext {
  product: ProductType
  gameMode: GameMode
  players: Player[]
  responseLength: ResponseLength
  flowStep: string
  flowStepSettings: FlowStepSettings
  personalitySettings: PersonalitySettings
  selectedPersonality: SelectedPersonality
}

export interface PersonalityAnalysis {
  style: string
  energy: string
  support: string
  tone: 'playful' | 'balanced' | 'snarky'
  excitement: 'minimal' | 'low' | 'moderate' | 'high' | 'maximum'
  encouragement: 'maximum-gentle' | 'gentle' | 'realistic' | 'tough' | 'maximum-tough'
}

export interface ResponseMetadata {
  processingTime: number
  wordCount: number
  estimatedSpeechDuration: number
  tts?: TTSMetadata
}

export interface TTSMetadata {
  audioUrl?: string
  duration: number
  isGenerating: boolean
  hasError: boolean
  error?: string
  generationTime?: number
}