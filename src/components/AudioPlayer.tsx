import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
  audioUrl: string
  text: string
  onPlayStart?: () => void
  onPlayEnd?: () => void
  onError?: (error: string) => void
  autoPlay?: boolean
  className?: string
}

export default function AudioPlayer({
  audioUrl,
  text,
  onPlayStart,
  onPlayEnd,
  onError,
  autoPlay = false,
  className = ''
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [hasError, setHasError] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !audioUrl) return

    const handleLoadStart = () => {
      setIsLoading(true)
      setHasError(false)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
      setDuration(audio.duration)
      
      if (autoPlay && !hasError) {
        handlePlay()
      }
    }

    const handleTimeUpdate = () => {
      const current = audio.currentTime
      const total = audio.duration
      setCurrentTime(current)
      setProgress(total > 0 ? (current / total) * 100 : 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
      onPlayEnd?.()
    }

    const handleError = (e: Event) => {
      console.error('Audio playback error:', e)
      setIsLoading(false)
      setIsPlaying(false)
      setHasError(true)
      onError?.('Failed to load or play audio')
    }

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [audioUrl, autoPlay, hasError, onPlayEnd, onError]) // handlePlay is recreated each render, so it's safe to call in effect

  const handlePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        await audio.play()
        setIsPlaying(true)
        setIsLoading(false)
        onPlayStart?.()
      }
    } catch (error) {
      console.error('Playback error:', error)
      setIsLoading(false)
      setIsPlaying(false)
      setHasError(true)
      onError?.('Failed to play audio')
    }
  }

  const handleReplay = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    setCurrentTime(0)
    setProgress(0)
    
    if (!isPlaying) {
      handlePlay()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!audioUrl) {
    return null
  }

  return (
    <div className={`bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 ${className}`}>
      <audio ref={audioRef} src={audioUrl} preload="auto" />
      
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlay}
          disabled={isLoading || hasError}
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : hasError ? (
            <span className="text-xs">⚠️</span>
          ) : isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Progress and Info */}
        <div className="flex-1 min-w-0">
          {/* Text being spoken */}
          <div className="text-sm text-gray-700 font-medium mb-2 line-clamp-2">
            "{text}"
          </div>
          
          {/* Progress bar */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="flex-shrink-0">{formatTime(currentTime)}</span>
            <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="flex-shrink-0">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Replay Button */}
        <button
          onClick={handleReplay}
          disabled={isLoading || hasError}
          className="flex-shrink-0 p-2 text-gray-600 hover:text-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Replay"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Error state */}
      {hasError && (
        <div className="mt-2 text-xs text-red-600 bg-red-50 rounded px-2 py-1">
          ⚠️ Audio playback failed. The text is still available above.
        </div>
      )}
    </div>
  )
}