import { useState, useEffect } from 'react'
import type { ProductType, SandboxState, GeneratedResponse } from '../types'
import { useVoiceRecording } from '../hooks/useVoiceRecording'
import { responseGenerator } from '../services/responseGenerator'
import { aiResponseGenerator } from '../services/aiResponseGenerator'
import { getRandomExample, getRandomDetailedContextExample } from '../utils/exampleGenerator'

interface InputSystemProps {
  selectedProduct: ProductType | null
  inputText: string
  onInputChange: (text: string) => void
  sandboxState: SandboxState
  onResponseGenerated: (response: GeneratedResponse) => void
  onGeneratingChange?: (isGenerating: boolean) => void
}


type InputMode = 'text' | 'voice'

export default function InputSystem({ selectedProduct, inputText, onInputChange, sandboxState, onResponseGenerated, onGeneratingChange }: InputSystemProps) {
  const [inputMode, setInputMode] = useState<InputMode>('text')
  const [isGenerating, setIsGenerating] = useState(false)
  const [useAI, setUseAI] = useState(aiResponseGenerator.isReady())
  const [generateVoice, setGenerateVoice] = useState(true)
  
  const {
    isRecording,
    transcription,
    error: recordingError,
    startRecording,
    stopRecording,
    clearRecording
  } = useVoiceRecording()

  const characterLimit = 1500

  const handleProvideExample = () => {
    if (!selectedProduct || !sandboxState.selectedFlowStep) return
    
    const example = getRandomExample(
      selectedProduct,
      sandboxState.selectedFlowStep as any, // Type assertion needed due to string/FlowStepType mismatch
      sandboxState.flowStepSettings
    )
    
    onInputChange(example.text)
  }

  const handleContextExample = () => {
    if (!selectedProduct) return
    
    const example = getRandomDetailedContextExample(selectedProduct)
    if (example) {
      onInputChange(example.text)
    }
  }

  // Update input text when transcription is available
  useEffect(() => {
    if (transcription && inputMode === 'voice') {
      onInputChange(transcription)
    }
  }, [transcription, inputMode, onInputChange])

  const handleVoiceRecord = async () => {
    if (!isRecording) {
      await startRecording()
    } else {
      stopRecording()
    }
  }

  const handleClearVoice = () => {
    clearRecording()
    onInputChange('')
  }

  const handleSubmit = async () => {
    if (!inputText.trim() || !selectedProduct || isGenerating) return
    
    setIsGenerating(true)
    onGeneratingChange?.(true)
    
    try {
      const generator = useAI ? aiResponseGenerator : responseGenerator
      const response = await generator.generateResponse(
        inputText,
        inputMode,
        sandboxState,
        generateVoice
      )
      
      onResponseGenerated(response)
      
      // Clear input after successful generation
      onInputChange('')
    } catch (error) {
      console.error('Failed to generate response:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate response. Please try again.'
      alert(errorMessage)
    } finally {
      setIsGenerating(false)
      onGeneratingChange?.(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            💬 Input Context
          </h3>
          <p className="text-sm text-gray-600">
            Describe the game scenario or moment for Riley to respond to.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* AI/Template Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setUseAI(false)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                !useAI
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Templates
            </button>
            <button
              onClick={() => setUseAI(true)}
              disabled={!aiResponseGenerator.isReady()}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                useAI && aiResponseGenerator.isReady()
                  ? 'bg-white text-gray-900 shadow-sm'
                  : aiResponseGenerator.isReady()
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 cursor-not-allowed'
              }`}
              title={!aiResponseGenerator.isReady() ? 'AI responses require OpenAI API key configuration' : ''}
            >
              🤖 AI
            </button>
          </div>

          {/* Input Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setInputMode('text')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                inputMode === 'text'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📝 Text
            </button>
            <button
              onClick={() => setInputMode('voice')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                inputMode === 'voice'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎤 Voice
            </button>
          </div>
        </div>
      </div>

      {/* AI Configuration Info */}
      {useAI && !aiResponseGenerator.isReady() && (
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">⚠️</span>
            <span className="font-medium text-yellow-900">AI Configuration Required</span>
          </div>
          <div className="text-sm text-yellow-800 mt-1">
            <p>{aiResponseGenerator.getConfigurationHelp()}</p>
          </div>
        </div>
      )}

      {/* Current Mode Indicator and Context Status */}
      <div className="flex items-center gap-3">
        {(useAI && aiResponseGenerator.isReady()) ? (
          <div className="flex-1 p-2 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600">🤖</span>
                <span className="font-medium text-green-900">AI Mode Active</span>
                <span className="text-green-700">- Using {aiResponseGenerator.getCurrentModel()}</span>
              </div>
              <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                Change model in .env file
              </div>
            </div>
          </div>
        ) : !useAI ? (
          <div className="flex-1 p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-600">📋</span>
              <span className="font-medium text-blue-900">Using fixed responses as a fallback</span>
            </div>
          </div>
        ) : null}

        {/* Context Status Indicator */}
        <div className={`px-3 py-2 rounded-lg border text-sm font-medium ${
          inputText.trim() 
            ? 'bg-green-50 border-green-200 text-green-900' 
            : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              inputText.trim() ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            <span>{inputText.trim() ? 'Context Ready' : 'Add Context'}</span>
          </div>
        </div>
      </div>

      {inputMode === 'text' ? (
        <div className="space-y-3">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={
                selectedProduct 
                  ? `Describe a ${selectedProduct} scenario for Riley to respond to...`
                  : 'Select a product first, then describe a scenario for Riley to respond to...'
              }
              disabled={!selectedProduct}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm resize-none"
              rows={6}
              maxLength={characterLimit}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {inputText.length}/{characterLimit}
            </div>
          </div>

          {/* Three-column layout: Example Buttons | Submit Button | Generate Voice */}
          <div className="flex items-center justify-between">
            {/* Left: Example Buttons */}
            <div className="flex-1 flex flex-col gap-2 justify-start">
              {selectedProduct && sandboxState.selectedFlowStep && (
                <button
                  onClick={handleProvideExample}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium text-sm flex items-center gap-2 w-fit"
                >
                  💡 Simple Example
                </button>
              )}
              {selectedProduct && (
                <button
                  onClick={handleContextExample}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium text-sm flex items-center gap-2 w-fit"
                >
                  📚 Context Examples
                </button>
              )}
            </div>

            {/* Center: Submit Button */}
            <div className="flex-1 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={!inputText.trim() || !selectedProduct || isGenerating}
                className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${
                  inputText.trim() && selectedProduct && !isGenerating
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Generating...
                  </>
                ) : (
                  '🚀 Submit to Riley'
                )}
              </button>
            </div>

            {/* Right: Generate Voice Checkbox */}
            <div className="flex-1 flex justify-end">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="generateVoice"
                  checked={generateVoice}
                  onChange={(e) => setGenerateVoice(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                />
                <label htmlFor="generateVoice" className="text-sm font-medium text-gray-700">
                  🎤 Generate Voice
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Voice Input Mode */
        <div className="space-y-4">
          {/* Recording Error */}
          {recordingError && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                <span className="font-medium text-red-900">Recording Error</span>
              </div>
              <p className="text-sm text-red-800 mt-1">{recordingError}</p>
            </div>
          )}

          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}>
              <span className="text-2xl">🎤</span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleVoiceRecord}
                disabled={!selectedProduct}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isRecording
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : selectedProduct
                      ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              
              {(inputText || transcription) && (
                <button
                  onClick={handleClearVoice}
                  className="px-4 py-2 rounded-lg font-medium bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mt-2 text-center">
              {isRecording 
                ? 'Recording... Click to stop'
                : selectedProduct
                  ? 'Click to record your scenario description'
                  : 'Select a product first to enable voice recording'
              }
            </p>
          </div>
          
          {/* Voice Input Preview */}
          {inputText && inputMode === 'voice' && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">Voice Input:</h4>
                <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">
                  {inputText.length} characters
                </span>
              </div>
              <p className="text-sm text-blue-800">"{inputText}"</p>
            </div>
          )}

          {/* Three-column layout: (empty) | Submit Button | Generate Voice */}
          <div className="flex items-center justify-between">
            {/* Left: Empty space (no Provide Example in voice mode) */}
            <div className="flex-1"></div>

            {/* Center: Submit Button */}
            <div className="flex-1 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={!inputText.trim() || !selectedProduct || isGenerating}
                className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${
                  inputText.trim() && selectedProduct && !isGenerating
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Generating...
                  </>
                ) : (
                  '🚀 Submit to Riley'
                )}
              </button>
            </div>

            {/* Right: Generate Voice Checkbox */}
            <div className="flex-1 flex justify-end">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="generateVoiceVoiceMode"
                  checked={generateVoice}
                  onChange={(e) => setGenerateVoice(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                />
                <label htmlFor="generateVoiceVoiceMode" className="text-sm font-medium text-gray-700">
                  🎤 Generate Voice
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}