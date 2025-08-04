import type { PersonalitySettings } from '../types'
import type { Theme } from '../utils/themes'

interface PersonalitySlidersProps {
  settings: PersonalitySettings
  onSettingsChange: (settings: PersonalitySettings) => void
  theme: Theme
}

interface SliderConfig {
  key: keyof PersonalitySettings
  label: string
  leftLabel: string
  rightLabel: string
  description: string
  color: string
}

const getSliderConfigs = (theme: Theme): SliderConfig[] => [
  {
    key: 'playfulSnarky',
    label: 'Playful ←→ Snarky',
    leftLabel: 'Playful',
    rightLabel: 'Snarky',
    description: 'Controls level of teasing, comedic timing, and edge in responses',
    color: theme.primary
  },
  {
    key: 'excitementStyle',
    label: 'Easily Excited ←→ Focused Excitement',
    leftLabel: 'Easily Excited',
    rightLabel: 'Focused',
    description: 'Determines energy distribution and reaction intensity',
    color: theme.secondary
  },
  {
    key: 'encouragementStyle',
    label: 'Gentle Encouragement ←→ Tough Love',
    leftLabel: 'Gentle',
    rightLabel: 'Tough Love',
    description: 'Controls supportive language style and response to player struggles',
    color: theme.accent
  }
]

export default function PersonalitySliders({ settings, onSettingsChange, theme }: PersonalitySlidersProps) {
  const sliderConfigs = getSliderConfigs(theme)

  const updateSetting = (key: keyof PersonalitySettings, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  const resetToDefaults = () => {
    onSettingsChange({
      playfulSnarky: 3,
      excitementStyle: 3,
      encouragementStyle: 3
    })
  }

  const getColorClasses = (color: string, isActive: boolean = false) => {
    const colorMap: Record<string, { active: string; inactive: string }> = {
      'purple-600': { active: 'bg-purple-600', inactive: 'bg-purple-200' },
      'pink-500': { active: 'bg-pink-500', inactive: 'bg-pink-200' },
      'purple-500': { active: 'bg-purple-500', inactive: 'bg-purple-200' },
      'green-600': { active: 'bg-green-600', inactive: 'bg-green-200' },
      'yellow-500': { active: 'bg-yellow-500', inactive: 'bg-yellow-200' },
      'green-500': { active: 'bg-green-500', inactive: 'bg-green-200' },
      'blue-600': { active: 'bg-blue-600', inactive: 'bg-blue-200' },
      'sky-500': { active: 'bg-sky-500', inactive: 'bg-sky-200' },
      'blue-500': { active: 'bg-blue-500', inactive: 'bg-blue-200' },
      'gray-600': { active: 'bg-gray-600', inactive: 'bg-gray-200' },
      'gray-500': { active: 'bg-gray-500', inactive: 'bg-gray-200' }
    }
    
    const colors = colorMap[color] || colorMap['gray-500']
    return isActive ? colors.active : colors.inactive
  }

  const getValueDisplayClasses = (color: string) => {
    // Function to get badge display classes based on theme color
    const badgeMap: Record<string, string> = {
      'purple-600': 'bg-purple-100 text-purple-800',
      'pink-500': 'bg-pink-100 text-pink-800',
      'purple-500': 'bg-purple-100 text-purple-800',
      'green-600': 'bg-green-100 text-green-800',
      'yellow-500': 'bg-yellow-100 text-yellow-800',
      'green-500': 'bg-green-100 text-green-800',
      'blue-600': 'bg-blue-100 text-blue-800',
      'sky-500': 'bg-sky-100 text-sky-800',
      'blue-500': 'bg-blue-100 text-blue-800',
      'gray-600': 'bg-gray-100 text-gray-800',
      'gray-500': 'bg-gray-100 text-gray-800'
    }
    
    return badgeMap[color] || badgeMap['gray-500']
  }

  const getPreviewTextClass = (textType: 'primary' | 'secondary') => {
    if (theme.name === 'Song Quiz') {
      return textType === 'primary' ? 'text-purple-900' : 'text-purple-800'
    } else if (theme.name === 'Wheel of Fortune') {
      return textType === 'primary' ? 'text-green-900' : 'text-green-800'
    } else if (theme.name === 'Jeopardy') {
      return textType === 'primary' ? 'text-blue-900' : 'text-blue-800'
    }
    return textType === 'primary' ? 'text-gray-900' : 'text-gray-800'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          🎛️ Riley's Personality
        </h3>
        <button
          onClick={resetToDefaults}
          className="px-3 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Vertical Sliders in Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sliderConfigs.map((config) => (
          <div key={config.key} className="flex flex-col items-center space-y-3">
            {/* Vertical Slider Container */}
            <div className="flex flex-col items-center space-y-2 h-32">
              {/* Top Label */}
              <span className="text-xs text-gray-600 text-center">{config.rightLabel}</span>
              
              {/* Custom Vertical Slider */}
              <div className="relative h-20 w-6 flex justify-center">
                {/* Slider Track */}
                <div 
                  className={`
                    absolute w-1 h-full rounded-full cursor-pointer
                    ${getColorClasses(config.color, false)}
                  `}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const y = e.clientY - rect.top
                    const percentage = 1 - (y / rect.height) // Invert for natural feel
                    const newValue = Math.max(1, Math.min(5, Math.round(1 + percentage * 4)))
                    updateSetting(config.key, newValue)
                  }}
                />
                
                {/* Active Track */}
                <div 
                  className={`
                    absolute w-1 rounded-full bottom-0 pointer-events-none
                    ${getColorClasses(config.color, true)}
                  `}
                  style={{
                    height: `${((settings[config.key] - 1) / 4) * 100}%`
                  }}
                />
                
                {/* Slider Handle */}
                <div
                  className={`
                    absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing z-10
                    ${getColorClasses(config.color, true)}
                  `}
                  style={{
                    bottom: `${((settings[config.key] - 1) / 4) * (80 - 16)}px`, // 80px track height - 16px handle
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    
                    const slider = e.currentTarget.parentElement!
                    const sliderRect = slider.getBoundingClientRect()
                    const startY = e.clientY
                    const startValue = settings[config.key]
                    const trackHeight = sliderRect.height - 16 // Account for handle height
                    
                    let isDragging = true
                    
                    const handleMouseMove = (e: MouseEvent) => {
                      if (!isDragging) return
                      e.preventDefault()
                      
                      const deltaY = startY - e.clientY // Invert for natural vertical feel
                      const valueChange = (deltaY / trackHeight) * 4 // 4 is the range (5-1)
                      const newValue = Math.max(1, Math.min(5, startValue + valueChange))
                      
                      // Update more frequently for smoother dragging
                      updateSetting(config.key, Math.round(newValue))
                    }
                    
                    const handleMouseUp = (e: MouseEvent) => {
                      e.preventDefault()
                      isDragging = false
                      document.removeEventListener('mousemove', handleMouseMove, true)
                      document.removeEventListener('mouseup', handleMouseUp, true)
                      document.body.style.userSelect = ''
                      document.body.style.cursor = ''
                    }
                    
                    // Prevent text selection and show drag cursor
                    document.body.style.userSelect = 'none'
                    document.body.style.cursor = 'ns-resize'
                    
                    // Use capture phase for more reliable event handling
                    document.addEventListener('mousemove', handleMouseMove, true)
                    document.addEventListener('mouseup', handleMouseUp, true)
                  }}
                />
              </div>
              
              {/* Bottom Label */}
              <span className="text-xs text-gray-600 text-center">{config.leftLabel}</span>
            </div>

            {/* Value Display */}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getValueDisplayClasses(config.color)}`}>
              {settings[config.key]} / 5
            </span>
          </div>
        ))}
      </div>

      {/* Detailed Personality Preview */}
      <div className={`p-4 bg-gradient-to-r ${theme.gradients.personality} rounded-lg border border-gray-200`}>
        <h4 className={`font-medium ${getPreviewTextClass('primary')} text-sm mb-3`}>Current Style:</h4>
        <div className={`space-y-2 text-xs ${getPreviewTextClass('secondary')}`}>
          <div>
            <span className="font-medium">Style ({settings.playfulSnarky}/5):</span>
            <span className="ml-1 italic">"{
              settings.playfulSnarky === 1 ? 'Very Playful & Bubbly' :
              settings.playfulSnarky === 2 ? 'Playful & Lighthearted' :
              settings.playfulSnarky === 3 ? 'Balanced Wit' :
              settings.playfulSnarky === 4 ? 'Witty & Sharp-tongued' :
              'Very Snarky & Edgy'
            }"</span>
          </div>
          <div>
            <span className="font-medium">Energy ({settings.excitementStyle}/5):</span>
            <span className="ml-1 italic">"{
              settings.excitementStyle === 1 ? 'Extremely high-energy, excited about everything' :
              settings.excitementStyle === 2 ? 'High-energy reactions to most things' :
              settings.excitementStyle === 3 ? 'Moderate energy distribution' :
              settings.excitementStyle === 4 ? 'Selective, intense excitement for big moments' :
              'Very focused, only excited for major achievements'
            }"</span>
          </div>
          <div>
            <span className="font-medium">Support ({settings.encouragementStyle}/5):</span>
            <span className="ml-1 italic">"{
              settings.encouragementStyle === 1 ? 'Very gentle, always supportive and understanding' :
              settings.encouragementStyle === 2 ? 'Supportive & sympathetic' :
              settings.encouragementStyle === 3 ? 'Supportive but realistic' :
              settings.encouragementStyle === 4 ? 'Direct & motivational with firm encouragement' :
              'Very tough love, direct and challenging'
            }"</span>
          </div>
        </div>
      </div>
    </div>
  )
}