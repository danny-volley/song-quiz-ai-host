// Legacy component - use OutputSystem for new implementations
import OutputSystem from './OutputSystem'
import type { GeneratedResponse } from '../types'

interface ResponseDisplayProps {
  response: GeneratedResponse | null
  isGenerating: boolean
  onClear?: () => void
}

export default function ResponseDisplay({ response, isGenerating, onClear }: ResponseDisplayProps) {
  return (
    <OutputSystem 
      response={response}
      isGenerating={isGenerating}
      onClear={onClear}
      enableTTS={true}
      autoPlayTTS={true}
    />
  )
}