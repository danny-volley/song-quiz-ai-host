import { useState } from 'react'
import { SelectedPersonality, SelectedVoice } from '../types'
import { personalities } from '../data/personalities'
import { defaultVoices } from '../data/voices'

interface PersonalitySelectorProps {
  selectedPersonality: SelectedPersonality
  onPersonalityChange: (personality: SelectedPersonality) => void
  selectedVoice: SelectedVoice
  onVoiceChange: (voice: SelectedVoice) => void
}

export default function PersonalitySelector({ selectedPersonality, onPersonalityChange, selectedVoice, onVoiceChange }: PersonalitySelectorProps) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const selectedPersonalityInfo = personalities.find(p => p.id === selectedPersonality.id)
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        🎭 AI Host Personality
      </h3>
      
      {/* Inline Host Character and Voice Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Host Character</label>
          <select
            value={selectedPersonality.id}
            onChange={(e) => {
              const personality = personalities.find(p => p.id === e.target.value)
              if (personality) {
                onPersonalityChange({
                  id: personality.id,
                  name: personality.name
                })
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {personalities.map((personality) => (
              <option key={personality.id} value={personality.id}>
                {personality.avatar && `${personality.avatar} `}{personality.displayName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Voice Selection</label>
          <select
            value={selectedVoice.id}
            onChange={(e) => {
              const voice = defaultVoices.find(v => v.id === e.target.value)
              if (voice) {
                onVoiceChange({
                  id: voice.id,
                  name: voice.name
                })
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {defaultVoices.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name} ({voice.gender})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Collapsible Personality Description */}
      {selectedPersonalityInfo && (
        <div className="bg-gray-50 rounded-lg">
          <button
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              {selectedPersonalityInfo.avatar && (
                <span className="text-lg">{selectedPersonalityInfo.avatar}</span>
              )}
              <span className="font-medium text-gray-900 text-sm">{selectedPersonalityInfo.displayName} Description</span>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${isDescriptionOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDescriptionOpen && (
            <div className="px-3 pb-3 space-y-2 border-t border-gray-200">
              <p className="text-sm text-gray-700 mt-2">{selectedPersonalityInfo.description}</p>
              <p className="text-xs text-gray-600">{selectedPersonalityInfo.age}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}