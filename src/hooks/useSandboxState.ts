import { useState, useCallback } from 'react'
import { ProductType, ResponseLength, SandboxState, FlowStepSettings, GameMode, Player, PersonalitySettings } from '../types'
import { products } from '../data/products'

const initialState: SandboxState = {
  selectedProduct: 'songquiz',
  selectedResponseLength: 'medium',
  selectedGameMode: 'single',
  selectedFlowStep: 'round_result',
  flowStepSettings: {
    isCorrect: true,
    performance: 3,
    streakCount: 3,
    spinValue: 1000,
    wagerAmount: 1000,
    difficulty: 'medium'
  },
  personalitySettings: {
    playfulSnarky: 3,
    excitementStyle: 3,
    encouragementStyle: 3
  },
  players: [
    {
      id: 'player_1',
      name: 'Player 1',
      score: 0
    }
  ],
  inputText: ''
}

export function useSandboxState() {
  const [state, setState] = useState<SandboxState>(initialState)

  const updateProduct = useCallback((product: ProductType) => {
    const selectedProductData = products.find(p => p.id === product)
    const firstFlowStep = selectedProductData?.flowSteps[0]?.id || null
    
    setState(prev => ({
      ...prev,
      selectedProduct: product,
      selectedFlowStep: firstFlowStep // Auto-select first flow step
    }))
  }, [])

  const updateResponseLength = useCallback((length: ResponseLength) => {
    setState(prev => ({
      ...prev,
      selectedResponseLength: length
    }))
  }, [])

  const updateFlowStep = useCallback((stepId: string) => {
    setState(prev => ({
      ...prev,
      selectedFlowStep: stepId
    }))
  }, [])

  const updateInputText = useCallback((text: string) => {
    setState(prev => ({
      ...prev,
      inputText: text
    }))
  }, [])

  const updateGameMode = useCallback((mode: GameMode) => {
    setState(prev => ({
      ...prev,
      selectedGameMode: mode,
      // Reset to single player when switching to single mode
      players: mode === 'single' 
        ? [{ id: 'player_1', name: 'Player 1', score: 0 }]
        : prev.players.length === 1 
          ? [...prev.players, { id: 'player_2', name: 'Player 2', score: 0 }]
          : prev.players
    }))
  }, [])

  const updatePlayers = useCallback((players: Player[]) => {
    setState(prev => ({
      ...prev,
      players
    }))
  }, [])

  const updateFlowStepSettings = useCallback((settings: FlowStepSettings) => {
    setState(prev => ({
      ...prev,
      flowStepSettings: settings
    }))
  }, [])

  const updatePersonalitySettings = useCallback((settings: PersonalitySettings) => {
    setState(prev => ({
      ...prev,
      personalitySettings: settings
    }))
  }, [])

  const resetState = useCallback(() => {
    setState(initialState)
  }, [])

  const isValid = useCallback(() => {
    return !!(
      state.selectedProduct &&
      state.selectedResponseLength &&
      state.selectedFlowStep
    )
  }, [state])

  return {
    state,
    updateProduct,
    updateResponseLength,
    updateGameMode,
    updateFlowStep,
    updateFlowStepSettings,
    updatePersonalitySettings,
    updatePlayers,
    updateInputText,
    resetState,
    isValid
  }
}