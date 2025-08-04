import ProductSelector from '../components/ProductSelector'
import ResponseLengthSelector from '../components/ResponseLengthSelector'
import FlowStepSelector from '../components/FlowStepSelector'
import PlayerConfiguration from '../components/PlayerConfiguration'
import PersonalitySliders from '../components/PersonalitySliders'
import InputSystem from '../components/InputSystem'
import ResponseDisplay from '../components/ResponseDisplay'
import { useSandboxState } from '../hooks/useSandboxState'
import { aiResponseGenerator } from '../services/aiResponseGenerator'
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to Riley's Sandbox
          </h2>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              PROTOTYPE
            </span>
            {aiResponseGenerator.isReady() && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded flex items-center gap-1">
                🤖 {aiResponseGenerator.getCurrentModel()}
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 max-w-4xl mx-auto">
          This prototype is meant to test an AI Host integration into Song Quiz, and optionally other products, for desirable text and voice output.
        </p>
      </div>
      
      {/* Top Row - Game Product & Player Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <ProductSelector
            selectedProduct={state.selectedProduct}
            selectedGameMode={state.selectedGameMode}
            onProductChange={updateProduct}
            onGameModeChange={updateGameMode}
          />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <PlayerConfiguration
            gameMode={state.selectedGameMode}
            players={state.players}
            onPlayersChange={updatePlayers}
          />
        </div>
      </div>

      {/* Second Row - Response Length, Flow Step & Personality */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <ResponseLengthSelector
            selectedLength={state.selectedResponseLength}
            onLengthChange={updateResponseLength}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <FlowStepSelector
            selectedProduct={state.selectedProduct}
            selectedFlowStep={state.selectedFlowStep}
            flowStepSettings={state.flowStepSettings}
            onFlowStepChange={updateFlowStep}
            onFlowStepSettingsChange={updateFlowStepSettings}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <PersonalitySliders
            settings={state.personalitySettings}
            onSettingsChange={updatePersonalitySettings}
          />
        </div>
      </div>

      {/* Input & Response Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input System */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
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
        <div className="bg-white rounded-lg shadow-sm border">
          <ResponseDisplay
            response={state.lastResponse || null}
            isGenerating={isGeneratingResponse}
            onClear={() => updateLastResponse(undefined)}
          />
        </div>
      </div>
    </div>
  )
}