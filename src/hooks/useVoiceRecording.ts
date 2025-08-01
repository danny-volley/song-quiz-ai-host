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

export function useVoiceRecording(): UseVoiceRecordingResult {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [transcription, setTranscription] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

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

      // Create MediaRecorder
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
        stream.getTracks().forEach(track => track.stop())
        
        // For now, set a placeholder transcription
        // In a real implementation, you would send the audio to a speech-to-text service
        setTranscription("Voice recording completed. Speech-to-text integration coming soon...")
      }

      mediaRecorder.start(100) // Collect data every 100ms
      setIsRecording(true)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording')
      console.error('Recording error:', err)
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }, [isRecording])

  const clearRecording = useCallback(() => {
    setAudioBlob(null)
    setTranscription('')
    setError(null)
    audioChunksRef.current = []
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