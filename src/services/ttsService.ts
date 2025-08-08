interface TTSOptions {
  text: string
  voiceId?: string
  stability?: number
  similarityBoost?: number
  style?: number
  useSpeakerBoost?: boolean
}

interface TTSResponse {
  audioUrl: string
  duration: number
  success: boolean
  error?: string
}

class TTSService {
  private apiKey: string | null = null
  private baseUrl = 'https://api.elevenlabs.io/v1'
  private defaultVoiceId = 'h2dQOVyUfIDqY2whPOMo' // Nayva voice ID
  private isConfigured = false

  constructor() {
    // Check for ElevenLabs API key in environment variables
    this.apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY
    this.isConfigured = !!(this.apiKey && this.apiKey !== 'your-elevenlabs-api-key-here')
  }

  async generateSpeech(options: TTSOptions): Promise<TTSResponse> {
    if (!this.isConfigured) {
      return {
        audioUrl: '',
        duration: 0,
        success: false,
        error: 'ElevenLabs API key not configured'
      }
    }

    const voiceId = options.voiceId || this.defaultVoiceId
    
    try {
      // Enhance text for speech synthesis
      let enhancedText: string
      try {
        enhancedText = this.enhanceTextForSpeech(options.text)
      } catch (error) {
        console.warn('Text enhancement failed, using original text:', error)
        enhancedText = options.text
      }
      
      const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey!,
        },
        body: JSON.stringify({
          text: enhancedText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: options.stability ?? 0.5,
            similarity_boost: options.similarityBoost ?? 0.8,
            style: options.style ?? 0.5,
            use_speaker_boost: options.useSpeakerBoost ?? true
          }
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`)
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      // Estimate duration based on text length (rough approximation)
      const wordCount = options.text.split(/\s+/).length
      const estimatedDuration = Math.ceil(wordCount / 3) * 1000 // ~3 words per second in milliseconds

      return {
        audioUrl,
        duration: estimatedDuration,
        success: true
      }
    } catch (error) {
      console.error('TTS generation failed:', error)
      
      // Provide more specific error messages
      let errorMessage = 'Unknown TTS error'
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: Unable to reach ElevenLabs API. This may be due to CORS restrictions in development mode. Consider using a proxy server for production.'
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      return {
        audioUrl: '',
        duration: 0,
        success: false,
        error: errorMessage
      }
    }
  }

  async getVoices(): Promise<Array<{id: string, name: string}>> {
    if (!this.isConfigured) {
      return []
    }

    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey!,
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.status}`)
      }

      const data = await response.json()
      return data.voices.map((voice: { voice_id: string; name: string }) => ({
        id: voice.voice_id,
        name: voice.name
      }))
    } catch (error) {
      console.error('Failed to fetch voices:', error)
      return []
    }
  }

  isReady(): boolean {
    return this.isConfigured
  }

  getDefaultVoiceId(): string {
    return this.defaultVoiceId
  }

  getConfigurationHelp(): string {
    return `To enable TTS:
1. Get an ElevenLabs API key from https://elevenlabs.io/
2. Add it to your .env file: VITE_ELEVENLABS_API_KEY=your-key-here
3. Restart the development server
4. Note: CORS restrictions may prevent API calls in development mode. Consider using a proxy server or testing in production.`
  }

  // Enhance text for better speech synthesis
  private enhanceTextForSpeech(text: string): string {
    let enhanced = text

    // If text already contains SSML-like tags, preserve them as-is
    if (enhanced.includes('<break')) {
      return enhanced
    }

    // Only add automatic enhancements if the original text is simple
    // This prevents over-processing short responses
    
    // Add breaks between sentences only if there are multiple sentences
    const sentenceCount = (enhanced.match(/[.!?]/g) || []).length
    if (sentenceCount > 1) {
      enhanced = enhanced.replace(/([.!?])\s+([A-Z])/g, '$1 <break time="0.4s" /> $2')
    }
    
    // Add slight pause after ellipses only if followed by more text
    enhanced = enhanced.replace(/\.\.\.\s*([A-Z])/g, '... <break time="0.3s" /> $1')
    
    // Normalize multiple exclamation points (don't add more)
    enhanced = enhanced.replace(/!{3,}/g, '!!')
    
    return enhanced
  }

  // Check if we're in development mode where CORS issues are common
  isDevelopmentMode(): boolean {
    return import.meta.env.DEV || window.location.hostname === 'localhost'
  }

  // Cleanup blob URLs to prevent memory leaks
  revokeAudioUrl(url: string): void {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url)
    }
  }
}

export const ttsService = new TTSService()
export type { TTSOptions, TTSResponse }