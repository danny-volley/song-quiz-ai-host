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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🎛️ Riley's Personality
          </h3>
          <p className="text-sm text-gray-600">
            Adjust Riley's personality traits to customize her responses and hosting style.
          </p>
        </div>
        <button
          onClick={resetToDefaults}
          className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Reset Defaults
        </button>
      </div>

      <div className="space-y-6">
        {sliderConfigs.map((config) => (
          <div key={config.key} className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">{config.label}</h4>
              <p className="text-sm text-gray-600">{config.description}</p>
            </div>

            <div className="space-y-2">
              {/* Slider Labels */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>{config.leftLabel}</span>
                <span>{config.rightLabel}</span>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={settings[config.key]}
                  onChange={(e) => updateSetting(config.key, parseInt(e.target.value))}
                  className={`
                    w-full h-2 rounded-lg appearance-none cursor-pointer slider
                    ${getColorClasses(config.color)}
                  `}
                  style={{
                    background: `linear-gradient(to right, 
                      ${getColorClasses(config.color)} 0%, 
                      ${getColorClasses(config.color)} ${((settings[config.key] - 1) / 4) * 100}%, 
                      ${getColorClasses(config.color, false)} ${((settings[config.key] - 1) / 4) * 100}%, 
                      ${getColorClasses(config.color, false)} 100%)`
                  }}
                />
              </div>

              {/* Value Display */}
              <div className="flex justify-center">
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${config.color === 'pink' ? 'bg-pink-100 text-pink-800' : ''}
                  ${config.color === 'orange' ? 'bg-orange-100 text-orange-800' : ''}
                  ${config.color === 'green' ? 'bg-green-100 text-green-800' : ''}
                `}>
                  {settings[config.key]} / 5
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Personality Preview */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <h4 className="font-medium text-purple-900 mb-2">Riley's Current Personality</h4>
        <div className="text-sm text-purple-800 space-y-1">
          <div>
            <strong>Style:</strong> {
              settings.playfulSnarky === 1 ? 'Very Playful & Bubbly' :
              settings.playfulSnarky === 2 ? 'Playful & Lighthearted' :
              settings.playfulSnarky === 3 ? 'Balanced Wit' :
              settings.playfulSnarky === 4 ? 'Witty & Sharp-tongued' :
              'Very Snarky & Edgy'
            }
          </div>
          <div>
            <strong>Energy:</strong> {
              settings.excitementStyle === 1 ? 'Extremely high-energy, excited about everything' :
              settings.excitementStyle === 2 ? 'High-energy reactions to most things' :
              settings.excitementStyle === 3 ? 'Moderate energy distribution' :
              settings.excitementStyle === 4 ? 'Selective, intense excitement for big moments' :
              'Very focused, only excited for major achievements'
            }
          </div>
          <div>
            <strong>Support:</strong> {
              settings.encouragementStyle === 1 ? 'Very gentle, always supportive and understanding' :
              settings.encouragementStyle === 2 ? 'Supportive & sympathetic' :
              settings.encouragementStyle === 3 ? 'Supportive but realistic' :
              settings.encouragementStyle === 4 ? 'Direct & motivational with firm encouragement' :
              'Very tough love, direct and challenging'
            }
          </div>
        </div>
      </div>
    </div>
  )
}