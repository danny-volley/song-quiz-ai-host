export interface Voice {
  id: string
  name: string
  gender?: string
  description?: string
}

// ElevenLabs voices
export const defaultVoices: Voice[] = [
  {
    id: 'h2dQOVyUfIDqY2whPOMo',
    name: 'Nayva',
    gender: 'Female'
  },
  {
    id: 'yj30vwTGJxSHezdAGsv9',
    name: 'Jessa',
    gender: 'Female'
  },
  {
    id: 'TbMNBJ27fH2U0VgpSNko',
    name: 'Lori',
    gender: 'Female'
  }
]

export function getVoiceById(id: string): Voice | null {
  return defaultVoices.find(voice => voice.id === id) || null
}

export function getDefaultVoice(): Voice {
  return defaultVoices[0] // Nayva is default
}