import { useState } from 'react'
import type { GeneratedResponse } from '../types'
import AudioPlayer from './AudioPlayer'

interface ResponseHistoryProps {
  responses: GeneratedResponse[]
  onClearHistory?: () => void
  maxDisplayed?: number
}

export default function ResponseHistory({ 
  responses, 
  onClearHistory, 
  maxDisplayed = 10 
}: ResponseHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (responses.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-lg">📜</span>
          </div>
          <h3 className="text-md font-semibold text-gray-900 mb-1">
            No History Yet
          </h3>
          <p className="text-sm text-gray-600">
            Generate some responses to see them here
          </p>
        </div>
      </div>
    )
  }

  const displayedResponses = responses.slice(-maxDisplayed).reverse()

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPersonalityColor = (tone: string) => {
    switch (tone) {
      case 'playful': return 'text-pink-600 bg-pink-50 border-pink-200'
      case 'snarky': return 'text-purple-600 bg-purple-50 border-purple-200' 
      default: return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Response History ({responses.length})
        </h3>
        {onClearHistory && responses.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayedResponses.map((response) => {
          const isExpanded = expandedId === response.id
          const totalLatency = response.response.metadata.processingTime + 
            (response.response.metadata.tts?.generationTime || 0)

          return (
            <div key={response.id} className="bg-white border rounded-lg shadow-sm">
              {/* Compact Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(response.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">R</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        "{response.response.text}"
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(response.timestamp)}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getPersonalityColor(response.response.personality.tone)}`}>
                          {response.response.personality.tone}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          totalLatency < 600 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {totalLatency}ms
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg 
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-200 p-4 space-y-4">
                  {/* Original Input */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Original Input</h5>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-sm text-gray-700">"{response.input.text}"</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-500">Mode:</span>
                        <span className="px-2 py-1 bg-white rounded text-xs">
                          {response.input.mode === 'voice' ? '🎤 Voice' : '📝 Text'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* TTS Audio (if available) */}
                  {response.response.metadata.tts?.audioUrl && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Riley's Voice</h5>
                      <AudioPlayer
                        audioUrl={response.response.metadata.tts.audioUrl}
                        text={response.response.text}
                        autoPlay={false}
                      />
                    </div>
                  )}

                  {/* Context Summary */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Context</h5>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><strong>Game:</strong> {response.context.product}</div>
                        <div><strong>Mode:</strong> {response.context.gameMode}</div>
                        <div><strong>Flow:</strong> {response.context.flowStep}</div>
                        <div><strong>Length:</strong> {response.context.responseLength}</div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Performance</h5>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><strong>Words:</strong> {response.response.metadata.wordCount}</div>
                        <div><strong>Speech:</strong> {response.response.metadata.estimatedSpeechDuration}s</div>
                        <div><strong>AI Time:</strong> {response.response.metadata.processingTime}ms</div>
                        {response.response.metadata.tts && (
                          <div><strong>TTS Time:</strong> {response.response.metadata.tts.generationTime}ms</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {responses.length > maxDisplayed && (
        <div className="text-center text-sm text-gray-500 py-2">
          Showing {maxDisplayed} of {responses.length} responses
        </div>
      )}
    </div>
  )
}