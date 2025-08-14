// Legacy component - use OutputSystem for new implementations
import OutputSystem from './OutputSystem'
import type { GeneratedResponse, SelectedPersonality, SelectedVoice } from '../types'

interface ResponseDisplayProps {
  response: GeneratedResponse | null
  isGenerating: boolean
  onClear?: () => void
  selectedPersonality?: SelectedPersonality
  selectedVoice?: SelectedVoice
}

export default function ResponseDisplay({ response, isGenerating, onClear, selectedPersonality, selectedVoice }: ResponseDisplayProps) {
  return (
    <OutputSystem 
      response={response}
      isGenerating={isGenerating}
      onClear={onClear}
      selectedPersonality={selectedPersonality}
      selectedVoice={selectedVoice}
      enableTTS={response?.generateVoice ?? true}
      autoPlayTTS={true}
    />
  )
}