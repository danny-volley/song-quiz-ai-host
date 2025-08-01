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
    <div className="space-y-8">
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
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Test and explore Riley's AI host personality across different games and scenarios. 
          Configure the settings below to see how Riley responds to different contexts.
        </p>
      </div>
      
      {/* Selection Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <ProductSelector
            selectedProduct={state.selectedProduct}
            selectedGameMode={state.selectedGameMode}
            onProductChange={updateProduct}
            onGameModeChange={updateGameMode}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <ResponseLengthSelector
            selectedLength={state.selectedResponseLength}
            onLengthChange={updateResponseLength}
          />
        </div>
      </div>

      {/* Secondary Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <FlowStepSelector
            selectedProduct={state.selectedProduct}
            selectedFlowStep={state.selectedFlowStep}
            flowStepSettings={state.flowStepSettings}
            onFlowStepChange={updateFlowStep}
            onFlowStepSettingsChange={updateFlowStepSettings}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <PlayerConfiguration
            gameMode={state.selectedGameMode}
            players={state.players}
            onPlayersChange={updatePlayers}
          />
        </div>
      </div>

      {/* Personality Configuration */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <PersonalitySliders
          settings={state.personalitySettings}
          onSettingsChange={updatePersonalitySettings}
        />
      </div>

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
      <ResponseDisplay
        response={state.lastResponse || null}
        isGenerating={isGeneratingResponse}
        onClear={() => updateLastResponse(undefined)}
      />
      
      {/* Configuration Status */}
      <div className={`
        border rounded-lg p-6 transition-all duration-200
        ${isValid() 
          ? 'bg-green-50 border-green-200' 
          : 'bg-yellow-50 border-yellow-200'
        }
      `}>
        <div className="flex items-center gap-3">
          <div className={`
            w-3 h-3 rounded-full
            ${isValid() ? 'bg-green-500' : 'bg-yellow-500'}
          `} />
          <h3 className={`
            text-lg font-semibold
            ${isValid() ? 'text-green-900' : 'text-yellow-900'}
          `}>
            Configuration Status
          </h3>
        </div>
        <p className={`
          mt-2
          ${isValid() ? 'text-green-800' : 'text-yellow-800'}
        `}>
          {isValid() 
            ? '✅ All required selections complete! Ready for personality controls and input testing.'
            : '⚠️ Please complete all selections above to continue with Riley setup.'
          }
        </p>
        
        {isValid() && (
          <div className="mt-4 p-3 bg-white rounded border border-green-300">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-green-900 mb-2">Current Configuration:</h4>
                <div className="text-sm text-green-800 space-y-1">
                  <div><strong>Product:</strong> {state.selectedProduct}</div>
                  <div><strong>Game Mode:</strong> {state.selectedGameMode}</div>
                  <div><strong>Players:</strong> {state.players.length} ({state.players.map(p => p.name).join(', ')})</div>
                  <div><strong>Response Length:</strong> {state.selectedResponseLength}</div>
                  <div><strong>Flow Step:</strong> {state.selectedFlowStep}</div>
                </div>
              </div>
              <button
                onClick={resetState}
                className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
              >
                Reset All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🔄 Next Steps
        </h3>
        <p className="text-blue-800">
          Once personality controls and input systems are added, you'll be able to test 
          Riley's responses with your configured settings.
        </p>
      </div>
    </div>
  )
}