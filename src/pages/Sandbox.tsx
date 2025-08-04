import ProductSelector from '../components/ProductSelector'
import ResponseLengthSelector from '../components/ResponseLengthSelector'
import FlowStepSelector from '../components/FlowStepSelector'
import PlayerConfiguration from '../components/PlayerConfiguration'
import PersonalitySliders from '../components/PersonalitySliders'
import InputSystem from '../components/InputSystem'
import ResponseDisplay from '../components/ResponseDisplay'
import { useSandboxState } from '../hooks/useSandboxState'
import { aiResponseGenerator } from '../services/aiResponseGenerator'
import { getTheme } from '../utils/themes'
import { useState } from 'react'

export default function Sandbox() {
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false)
  
  const {
    state,
    updateProduct,
    updateResponseLength,
    updateGameMode,
    updateFlowStep,
    updateFlowStepSettings,
    updatePersonalitySettings,
    updatePlayers,
    updateInputText,
    updateLastResponse,
    resetState,
    isValid
  } = useSandboxState()

  const theme = getTheme(state.selectedProduct)

  const getTextColorClass = (textType: 'primary' | 'secondary') => {
    const product = state.selectedProduct
    if (product === 'songquiz') {
      return textType === 'primary' ? 'text-purple-900' : 'text-purple-700'
    } else if (product === 'wheel') {
      return textType === 'primary' ? 'text-green-900' : 'text-green-700'
    } else if (product === 'jeopardy') {
      return textType === 'primary' ? 'text-blue-900' : 'text-blue-700'
    }
    return textType === 'primary' ? 'text-gray-900' : 'text-gray-700'
  }

  const getBadgeClasses = (badgeType: 'primary' | 'secondary') => {
    const product = state.selectedProduct
    if (product === 'songquiz') {
      return badgeType === 'primary' ? 'bg-purple-100 text-purple-800' : 'bg-pink-100 text-pink-800'
    } else if (product === 'wheel') {
      return badgeType === 'primary' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    } else if (product === 'jeopardy') {
      return badgeType === 'primary' ? 'bg-blue-100 text-blue-800' : 'bg-sky-100 text-sky-800'
    }
    return badgeType === 'primary' ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} fixed inset-0 overflow-auto`}>
      <div className="space-y-6 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className={`text-2xl font-bold ${getTextColorClass('primary')}`}>
            Welcome to Riley's Sandbox
          </h2>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 ${getBadgeClasses('primary')} text-xs font-medium rounded`}>
              PROTOTYPE
            </span>
            {aiResponseGenerator.isReady() && (
              <span className={`px-2 py-1 ${getBadgeClasses('secondary')} text-xs font-medium rounded flex items-center gap-1`}>
                🤖 {aiResponseGenerator.getCurrentModel()}
              </span>
            )}
          </div>
        </div>
        <p className={`text-sm ${getTextColorClass('secondary')} max-w-4xl mx-auto`}>
          This prototype is meant to test an AI Host integration into Song Quiz, and optionally other products, for desirable text and voice output.
        </p>
      </div>
      
      {/* Top Row - Game Product & Player Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme.cardBackground} p-4 rounded-xl shadow-lg border border-white/20`}>
          <ProductSelector
            selectedProduct={state.selectedProduct}
            selectedGameMode={state.selectedGameMode}
            onProductChange={updateProduct}
            onGameModeChange={updateGameMode}
          />
        </div>
        
        <div className={`${theme.cardBackground} p-4 rounded-xl shadow-lg border border-white/20`}>
          <PlayerConfiguration
            gameMode={state.selectedGameMode}
            players={state.players}
            onPlayersChange={updatePlayers}
          />
        </div>
      </div>

      {/* Second Row - Response Length, Flow Step & Personality */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${theme.cardBackground} p-6 rounded-xl shadow-lg border border-white/20`}>
          <ResponseLengthSelector
            selectedLength={state.selectedResponseLength}
            onLengthChange={updateResponseLength}
          />
        </div>

        <div className={`${theme.cardBackground} p-6 rounded-xl shadow-lg border border-white/20`}>
          <FlowStepSelector
            selectedProduct={state.selectedProduct}
            selectedFlowStep={state.selectedFlowStep}
            flowStepSettings={state.flowStepSettings}
            onFlowStepChange={updateFlowStep}
            onFlowStepSettingsChange={updateFlowStepSettings}
          />
        </div>

        <div className={`${theme.cardBackground} p-4 rounded-xl shadow-lg border border-white/20`}>
          <PersonalitySliders
            settings={state.personalitySettings}
            onSettingsChange={updatePersonalitySettings}
            theme={theme}
          />
        </div>
      </div>

      {/* Input & Response Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input System */}
        <div className={`${theme.cardBackground} p-6 rounded-xl shadow-lg border border-white/20`}>
          <InputSystem
            selectedProduct={state.selectedProduct}
            inputText={state.inputText}
            onInputChange={updateInputText}
            sandboxState={state}
            onResponseGenerated={updateLastResponse}
            onGeneratingChange={setIsGeneratingResponse}
          />
        </div>

        {/* Response Display */}
        <div className={`${theme.cardBackground} rounded-xl shadow-lg border border-white/20`}>
          <ResponseDisplay
            response={state.lastResponse || null}
            isGenerating={isGeneratingResponse}
            onClear={() => updateLastResponse(undefined)}
          />
        </div>
      </div>
      </div>
    </div>
  )
}