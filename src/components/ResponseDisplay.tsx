// Legacy component - use OutputSystem for new implementations
import OutputSystem from './OutputSystem'
import type { GeneratedResponse, SelectedPersonality } from '../types'

interface ResponseDisplayProps {
  response: GeneratedResponse | null
  isGenerating: boolean
  onClear?: () => void
  selectedPersonality?: SelectedPersonality
}

export default function ResponseDisplay({ response, isGenerating, onClear, selectedPersonality }: ResponseDisplayProps) {
  return (
    <OutputSystem 
      response={response}
      isGenerating={isGenerating}
      onClear={onClear}
      selectedPersonality={selectedPersonality}
      enableTTS={response?.generateVoice ?? true}
      autoPlayTTS={true}
    />
  )
}