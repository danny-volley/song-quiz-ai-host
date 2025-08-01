import { useState, useEffect } from 'react'
import type { ProductType, SandboxState, GeneratedResponse } from '../types'
import { useVoiceRecording } from '../hooks/useVoiceRecording'
import { responseGenerator } from '../services/responseGenerator'

interface InputSystemProps {
  selectedProduct: ProductType | null
  inputText: string
  onInputChange: (text: string) => void
  sandboxState: SandboxState
  onResponseGenerated: (response: GeneratedResponse) => void
  onGeneratingChange?: (isGenerating: boolean) => void
}

interface ExampleScenario {
  title: string
  description: string
  context: string
}

const exampleScenarios: Record<ProductType, ExampleScenario[]> = {
  songquiz: [
    {
      title: "Perfect Streak",
      description: "Player got 5 songs correct in a row",
      context: "Amazing! You just nailed 5 songs in a row - 'Bohemian Rhapsody', 'Sweet Child O Mine', 'Hotel California', 'Billie Jean', and 'Smells Like Teen Spirit'. You're on fire!"
    },
    {
      title: "Wrong Answer",
      description: "Player missed a popular 80s song",
      context: "Oops! That was 'Don't Stop Believin' by Journey - one of the biggest hits of the 80s. Don't worry, happens to the best of us!"
    },
    {
      title: "Close Call",
      description: "Player got it right at the last second",
      context: "Whew! You got 'Thriller' by Michael Jackson with just 2 seconds left on the clock. That was cutting it close!"
    },
    {
      title: "Genre Master",
      description: "Player excelling in specific music genre",
      context: "Wow! You're absolutely crushing this hip-hop playlist - 8 out of 10 correct on these rap classics!"
    }
  ],
  wheel: [
    {
      title: "Big Solve",
      description: "Player solved a difficult puzzle",
      context: "Incredible! You solved 'PRACTICE MAKES PERFECT' with only the letters R, S, T, L, N, E revealed. That's some serious puzzle-solving skills!"
    },
    {
      title: "Bankrupt Hit",
      description: "Player landed on bankrupt",
      context: "Oh no! You just hit BANKRUPT and lost $2,400. That's gotta sting, but don't give up - there's still time to bounce back!"
    },
    {
      title: "Big Money Spin",
      description: "Player landed on high value",
      context: "YES! You just spun $5,000 and got the letter T - there are 3 T's in the puzzle! That's $15,000 right there!"
    },
    {
      title: "Final Puzzle Win",
      description: "Player won the bonus round",
      context: "Unbelievable! You solved the final puzzle 'CHOCOLATE CHIP COOKIE' and won the car! What an amazing finish!"
    }
  ],
  jeopardy: [
    {
      title: "Daily Double Wager",
      description: "Player found Daily Double and made big wager",
      context: "You found the Daily Double in 'POTPOURRI' for $1,000! You're betting it all - $8,000 is riding on this answer!"
    },
    {
      title: "Category Sweep",
      description: "Player completed entire category",
      context: "Outstanding! You just ran the entire 'WORLD CAPITALS' category - all five clues correct! You really know your geography!"
    },
    {
      title: "Comeback Story",
      description: "Player rallied from behind",
      context: "What a turnaround! You were down $5,000 going into Double Jeopardy, but now you're leading by $3,000. Incredible comeback!"
    },
    {
      title: "Final Jeopardy Drama",
      description: "Close Final Jeopardy finish",
      context: "This Final Jeopardy is going to decide it all! You're trailing by just $400 - your wager of $2,000 could win or lose the game!"
    }
  ]
}

type InputMode = 'text' | 'voice'

export default function InputSystem({ selectedProduct, inputText, onInputChange, sandboxState, onResponseGenerated, onGeneratingChange }: InputSystemProps) {
  const [inputMode, setInputMode] = useState<InputMode>('text')
  const [showExamples, setShowExamples] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  
  const {
    isRecording,
    transcription,
    error: recordingError,
    startRecording,
    stopRecording,
    clearRecording
  } = useVoiceRecording()

  const currentExamples = selectedProduct ? exampleScenarios[selectedProduct] || [] : []
  const characterLimit = 500

  const handleExampleSelect = (scenario: ExampleScenario) => {
    onInputChange(scenario.context)
    setShowExamples(false)
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
      const response = await responseGenerator.generateResponse(
        inputText,
        inputMode,
        sandboxState
      )
      
      onResponseGenerated(response)
      
      // Clear input after successful generation
      onInputChange('')
    } catch (error) {
      console.error('Failed to generate response:', error)
      alert('Failed to generate response. Please try again.')
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
              rows={4}
              maxLength={characterLimit}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {inputText.length}/{characterLimit}
            </div>
          </div>

          {/* Example Scenarios */}
          {selectedProduct && currentExamples.length > 0 && (
            <div className="space-y-2">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                💡 Example Scenarios
                <span className={`transform transition-transform ${showExamples ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {showExamples && (
                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                  {currentExamples.map((scenario, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleSelect(scenario)}
                      className="p-3 text-left border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm mb-1">
                        {scenario.title}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {scenario.description}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-2">
                        "{scenario.context.substring(0, 100)}..."
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
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
        </div>
      )}

      {/* Input Status & Submit */}
      {inputText && (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm font-medium text-green-900">
                Context Ready
              </span>
            </div>
            <p className="text-sm text-green-800 mt-1">
              Riley is ready to respond to this scenario with your current personality and game settings.
            </p>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!inputText.trim() || !selectedProduct || isGenerating}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
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
        </div>
      )}
    </div>
  )
}