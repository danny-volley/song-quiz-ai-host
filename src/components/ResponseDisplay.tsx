import { useState } from 'react'
import type { GeneratedResponse } from '../types'

interface ResponseDisplayProps {
  response: GeneratedResponse | null
  isGenerating: boolean
  onClear?: () => void
}

export default function ResponseDisplay({ response, isGenerating, onClear }: ResponseDisplayProps) {
  const [showDetails, setShowDetails] = useState(false)

  if (isGenerating) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🤖 Riley is thinking...
            </h3>
            <p className="text-sm text-gray-600">
              Analyzing your scenario and crafting a personalized response
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!response) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Response Yet
          </h3>
          <p className="text-sm text-gray-600">
            Submit an input above to see Riley's response
          </p>
        </div>
      </div>
    )
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const getPersonalityColor = (tone: string) => {
    switch (tone) {
      case 'playful': return 'text-pink-600 bg-pink-50'
      case 'snarky': return 'text-purple-600 bg-purple-50' 
      default: return 'text-blue-600 bg-blue-50'
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Riley's Response
              </h3>
              <p className="text-sm text-gray-500">
                Generated at {formatTimestamp(response.timestamp)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {onClear && (
              <button
                onClick={onClear}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Main Response */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 mb-4">
          <div className="text-gray-900 leading-relaxed">
            "{response.response.text}"
          </div>
        </div>

        {/* Response Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>{response.response.metadata.wordCount} words</span>
            <span>{response.response.metadata.estimatedSpeechDuration}s speech</span>
            <span>{response.response.metadata.processingTime}ms generated</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              response.id.startsWith('ai_') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {response.id.startsWith('ai_') ? '🤖 AI' : '📋 Template'}
            </span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPersonalityColor(response.response.personality.tone)}`}>
            {response.response.personality.tone}
          </div>
        </div>

        {/* Detailed Information */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input Context */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Input Context</h4>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="text-sm">
                    <strong>Original Input:</strong>
                    <p className="text-gray-600 mt-1">"{response.input.text}"</p>
                  </div>
                  <div className="text-sm">
                    <strong>Input Mode:</strong> 
                    <span className="ml-2 px-2 py-1 bg-white rounded text-xs">
                      {response.input.mode === 'voice' ? '🎤 Voice' : '📝 Text'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Game Context */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Game Context</h4>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                  <div><strong>Product:</strong> {response.context.product}</div>
                  <div><strong>Mode:</strong> {response.context.gameMode}</div>
                  <div><strong>Flow Step:</strong> {response.context.flowStep}</div>
                  <div><strong>Response Length:</strong> {response.context.responseLength}</div>
                  <div><strong>Players:</strong> {response.context.players.map(p => p.name).join(', ')}</div>
                </div>
              </div>

              {/* Personality Analysis */}
              <div className="space-y-3 md:col-span-2">
                <h4 className="font-medium text-gray-900">Personality Analysis</h4>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Style:</strong>
                      <p className="text-gray-700 mt-1">{response.response.personality.style}</p>
                    </div>
                    <div>
                      <strong>Energy:</strong>
                      <p className="text-gray-700 mt-1">{response.response.personality.energy}</p>
                    </div>
                    <div>
                      <strong>Support:</strong>
                      <p className="text-gray-700 mt-1">{response.response.personality.support}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}