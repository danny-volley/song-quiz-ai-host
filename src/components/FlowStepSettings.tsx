import type { FlowStepType, FlowStepSettings } from '../types'

interface FlowStepSettingsProps {
  stepType: FlowStepType
  settings: FlowStepSettings
  onSettingsChange: (settings: FlowStepSettings) => void
}

export default function FlowStepSettings({ stepType, settings, onSettingsChange }: FlowStepSettingsProps) {
  const updateSetting = (key: keyof FlowStepSettings, value: string | number | boolean) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  const renderSettings = () => {
    switch (stepType) {
      case 'round_result':
        return (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Result Type</h4>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.isCorrect === true}
                  onChange={(e) => updateSetting('isCorrect', e.target.checked ? true : false)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-base text-gray-700">Correct Answer</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.isCorrect === false}
                  onChange={(e) => updateSetting('isCorrect', e.target.checked ? false : true)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-base text-gray-700">Incorrect Answer</span>
              </label>
            </div>
          </div>
        )

      case 'game_result':
        return (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Performance Level</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={settings.performance || 3}
                onChange={(e) => updateSetting('performance', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Level {settings.performance || 3} / 5
                </span>
              </div>
            </div>
          </div>
        )

      case 'streak_milestone':
        return (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Streak Count</h4>
            <select
              value={settings.streakCount || 3}
              onChange={(e) => updateSetting('streakCount', parseInt(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={3}>3 in a row</option>
              <option value={5}>5 in a row</option>
              <option value={10}>10 in a row</option>
              <option value={15}>15 in a row</option>
            </select>
          </div>
        )

      case 'big_money_spin':
        return (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Spin Value</h4>
            <select
              value={settings.spinValue || 1000}
              onChange={(e) => updateSetting('spinValue', parseInt(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={500}>$500</option>
              <option value={750}>$750</option>
              <option value={1000}>$1,000</option>
              <option value={2500}>$2,500</option>
              <option value={5000}>$5,000</option>
            </select>
          </div>
        )

      case 'daily_double':
        return (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Wager Amount</h4>
            <div className="space-y-2">
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={settings.wagerAmount || 1000}
                onChange={(e) => updateSetting('wagerAmount', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  ${settings.wagerAmount || 1000}
                </span>
              </div>
            </div>
          </div>
        )

      case 'puzzle_solve':
      case 'final_puzzle':
      case 'final_jeopardy':
        return (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Difficulty</h4>
            <div className="flex gap-2">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => updateSetting('difficulty', level)}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${settings.difficulty === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">
        ⚙️ Additional Settings
      </h3>
      {renderSettings()}
    </div>
  )
}