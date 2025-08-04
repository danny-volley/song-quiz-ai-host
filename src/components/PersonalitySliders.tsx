import type { PersonalitySettings } from '../types'

interface PersonalitySlidersProps {
  settings: PersonalitySettings
  onSettingsChange: (settings: PersonalitySettings) => void
}

interface SliderConfig {
  key: keyof PersonalitySettings
  label: string
  leftLabel: string
  rightLabel: string
  description: string
  color: string
}

const sliderConfigs: SliderConfig[] = [
  {
    key: 'playfulSnarky',
    label: 'Playful ←→ Snarky',
    leftLabel: 'Playful',
    rightLabel: 'Snarky',
    description: 'Controls level of teasing, comedic timing, and edge in responses',
    color: 'pink'
  },
  {
    key: 'excitementStyle',
    label: 'Easily Excited ←→ Focused Excitement',
    leftLabel: 'Easily Excited',
    rightLabel: 'Focused',
    description: 'Determines energy distribution and reaction intensity',
    color: 'orange'
  },
  {
    key: 'encouragementStyle',
    label: 'Gentle Encouragement ←→ Tough Love',
    leftLabel: 'Gentle',
    rightLabel: 'Tough Love',
    description: 'Controls supportive language style and response to player struggles',
    color: 'green'
  }
]

export default function PersonalitySliders({ settings, onSettingsChange }: PersonalitySlidersProps) {
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
    const colors = {
      pink: isActive ? 'bg-pink-500' : 'bg-pink-200',
      orange: isActive ? 'bg-orange-500' : 'bg-orange-200',
      green: isActive ? 'bg-green-500' : 'bg-green-200'
    }
    return colors[color as keyof typeof colors] || colors.pink
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
            <span className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${config.color === 'pink' ? 'bg-pink-100 text-pink-800' : ''}
              ${config.color === 'orange' ? 'bg-orange-100 text-orange-800' : ''}
              ${config.color === 'green' ? 'bg-green-100 text-green-800' : ''}
            `}>
              {settings[config.key]} / 5
            </span>
          </div>
        ))}
      </div>

      {/* Detailed Personality Preview */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <h4 className="font-medium text-purple-900 text-sm mb-3">Current Style:</h4>
        <div className="space-y-2 text-xs text-purple-800">
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