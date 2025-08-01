import { useState, useCallback, useRef } from 'react'

interface UseVoiceRecordingResult {
  isRecording: boolean
  audioBlob: Blob | null
  transcription: string
  error: string | null
  startRecording: () => Promise<void>
  stopRecording: () => void
  clearRecording: () => void
}

// Check if Web Speech API is available
const isWebSpeechSupported = () => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
}

export function useVoiceRecording(): UseVoiceRecordingResult {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [transcription, setTranscription] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const speechRecognitionRef = useRef<any>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startRecording = useCallback(async () => {
    try {
      setError(null)
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      })

      streamRef.current = stream

      // Setup Web Speech API if available
      if (isWebSpeechSupported()) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'
        
        recognition.onresult = (event: any) => {
          let finalTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            }
          }
          
          if (finalTranscript) {
            setTranscription(finalTranscript.trim())
          }
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setError(`Speech recognition error: ${event.error}`)
        }

        recognition.onend = () => {
          speechRecognitionRef.current = null
        }

        speechRecognitionRef.current = recognition
        recognition.start()
      }

      // Create MediaRecorder for audio backup
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' })
        setAudioBlob(audioBlob)
        
        // Stop all audio tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
          streamRef.current = null
        }
        
        // If no speech recognition result and no existing transcription, show fallback
        if (!transcription && !isWebSpeechSupported()) {
          setTranscription("Voice recorded. Speech-to-text not supported in this browser.")
        }
      }

      mediaRecorder.start(100) // Collect data every 100ms
      setIsRecording(true)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording')
      console.error('Recording error:', err)
    }
  }, [transcription])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
    
    // Stop speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop()
    }
  }, [isRecording])

  const clearRecording = useCallback(() => {
    setAudioBlob(null)
    setTranscription('')
    setError(null)
    audioChunksRef.current = []
    
    // Clean up speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop()
      speechRecognitionRef.current = null
    }
    
    // Clean up media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }, [])

  return {
    isRecording,
    audioBlob,
    transcription,
    error,
    startRecording,
    stopRecording,
    clearRecording
  }
}