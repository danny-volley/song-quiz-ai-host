import { useState, useEffect } from 'react'
import type { GeneratedResponse, TTSMetadata } from '../types'
import { ttsService } from '../services/ttsService'
import AudioPlayer from './AudioPlayer'

interface OutputSystemProps {
  response: GeneratedResponse | null
  isGenerating: boolean
  onClear?: () => void
  enableTTS?: boolean
  autoPlayTTS?: boolean
}

export default function OutputSystem({ 
  response, 
  isGenerating, 
  onClear, 
  enableTTS = true,
  autoPlayTTS = true 
}: OutputSystemProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [ttsData, setTTSData] = useState<TTSMetadata | null>(null)

  // Generate TTS when new response arrives
  useEffect(() => {
    if (!response || !enableTTS || !ttsService.isReady()) {
      setTTSData(null) // Clear any previous TTS data
      return
    }

    const generateTTS = async () => {
      const startTime = Date.now()
      
      setTTSData({
        duration: 0,
        isGenerating: true,
        hasError: false
      })

      try {
        const ttsResult = await ttsService.generateSpeech({
          text: response.response.text,
          // Optimize settings for Riley's personality
          stability: 0.6,
          similarityBoost: 0.85,
          style: 0.4,
          useSpeakerBoost: true
        })

        const generationTime = Date.now() - startTime

        if (ttsResult.success && ttsResult.audioUrl && ttsResult.audioUrl.startsWith('blob:')) {
          setTTSData({
            audioUrl: ttsResult.audioUrl,
            duration: ttsResult.duration,
            isGenerating: false,
            hasError: false,
            generationTime
          })
        } else {
          // Ensure no invalid audioUrl is set
          setTTSData({
            audioUrl: undefined,
            duration: 0,
            isGenerating: false,
            hasError: true,
            error: ttsResult.error || 'TTS generation failed',
            generationTime
          })
        }
      } catch (error) {
        const generationTime = Date.now() - startTime
        console.error('TTS generation failed:', error)
        setTTSData({
          audioUrl: undefined,
          duration: 0,
          isGenerating: false,
          hasError: true,
          error: error instanceof Error ? error.message : 'TTS generation failed',
          generationTime
        })
      }
    }

    generateTTS()
  }, [response?.id, enableTTS]) // Only regenerate when response ID or TTS setting changes

  // Cleanup blob URLs when component unmounts or response changes
  useEffect(() => {
    return () => {
      if (ttsData?.audioUrl && ttsData.audioUrl.startsWith('blob:')) {
        ttsService.revokeAudioUrl(ttsData.audioUrl)
      }
    }
  }, [ttsData?.audioUrl])

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const formatTextForDisplay = (text: string) => {
    // Clean up SSML tags for display while preserving the expressive formatting
    return text
      .replace(/<break time="[^"]*"\s*\/>/g, ' ') // Remove break tags but keep spaces
      .replace(/!{2,}/g, '!!') // Normalize multiple exclamation points
      .trim()
  }

  const getPersonalityColor = (tone: string) => {
    switch (tone) {
      case 'playful': return 'text-pink-600 bg-pink-50'
      case 'snarky': return 'text-purple-600 bg-purple-50' 
      default: return 'text-blue-600 bg-blue-50'
    }
  }

  const getTotalLatency = () => {
    if (!response) return 0
    const processingTime = response.response.metadata.processingTime
    const ttsTime = ttsData?.generationTime || 0
    return processingTime + ttsTime
  }

  // Loading state during AI response generation
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

  // Empty state when no response
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
          {enableTTS && !ttsService.isReady() && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="space-y-2">
                <p className="text-sm text-blue-800 font-medium">
                  🎤 Voice synthesis available with ElevenLabs
                </p>
                <p className="text-xs text-blue-700">
                  Add your ElevenLabs API key to .env to enable Riley's voice. Text responses work without it.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {/* Header */}
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
            {/* Latency indicator */}
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              getTotalLatency() < 600 
                ? 'bg-green-100 text-green-800' 
                : getTotalLatency() < 1000
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {getTotalLatency()}ms
            </div>
            
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

        {/* Main Response - Text Display */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 mb-4">
          <div className="text-gray-900 leading-relaxed text-lg font-medium">
            "{formatTextForDisplay(response.response.text)}"
          </div>
        </div>

        {/* TTS Audio Player */}
        {enableTTS && ttsService.isReady() && (
          <div className="mb-4">
            {ttsData?.isGenerating && (
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-purple-700 font-medium">
                    🎤 Generating Riley's voice...
                  </span>
                </div>
              </div>
            )}
            
            {ttsData?.audioUrl && !ttsData.hasError && (
              <AudioPlayer
                audioUrl={ttsData.audioUrl}
                text={response.response.text}
                autoPlay={autoPlayTTS}
                onError={(error) => {
                  console.error('Audio playback error:', error)
                  setTTSData(prev => prev ? { ...prev, hasError: true, error } : null)
                }}
              />
            )}
            
            {ttsData?.hasError && (
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600">⚠️</span>
                    <span className="text-sm text-yellow-800 font-medium">
                      Voice synthesis unavailable
                    </span>
                  </div>
                  <p className="text-xs text-yellow-700">
                    {ttsData.error?.includes('CORS') || ttsData.error?.includes('Failed to fetch') 
                      ? "TTS is disabled in development mode due to browser security restrictions. The text response above shows what Riley would say."
                      : ttsData.error
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Response Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>{response.response.metadata.wordCount} words</span>
            <span>{response.response.metadata.estimatedSpeechDuration}s speech</span>
            <span>{response.response.metadata.processingTime}ms AI</span>
            {ttsData?.generationTime && (
              <span>{ttsData.generationTime}ms TTS</span>
            )}
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

              {/* TTS Information */}
              {enableTTS && ttsData && (
                <div className="space-y-3 md:col-span-2">
                  <h4 className="font-medium text-gray-900">Voice Synthesis</h4>
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <strong>Voice:</strong>
                        <p className="text-gray-700 mt-1">Nayva (ElevenLabs)</p>
                      </div>
                      <div>
                        <strong>Generation Time:</strong>
                        <p className="text-gray-700 mt-1">{ttsData.generationTime}ms</p>
                      </div>
                      <div>
                        <strong>Status:</strong>
                        <p className={`mt-1 font-medium ${
                          ttsData.hasError ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {ttsData.hasError ? 'Failed' : 'Success'}
                        </p>
                      </div>
                      <div>
                        <strong>Total Latency:</strong>
                        <p className={`mt-1 font-medium ${
                          getTotalLatency() < 600 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {getTotalLatency()}ms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}