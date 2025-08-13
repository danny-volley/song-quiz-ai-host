import { ProductType, FlowStep, FlowStepSettings, SelectedPersonality } from '../types'
import { products } from '../data/products'
import FlowStepSettingsComponent from './FlowStepSettings'

interface FlowStepSelectorProps {
  selectedProduct: ProductType | null
  selectedFlowStep: string | null
  flowStepSettings: FlowStepSettings
  onFlowStepChange: (stepId: string) => void
  onFlowStepSettingsChange: (settings: FlowStepSettings) => void
  selectedPersonality?: SelectedPersonality
}

export default function FlowStepSelector({ 
  selectedProduct, 
  selectedFlowStep,
  flowStepSettings,
  onFlowStepChange,
  onFlowStepSettingsChange,
  selectedPersonality
}: FlowStepSelectorProps) {
  const personalityName = selectedPersonality?.name || 'Riley'
  const currentProduct = products.find(p => p.id === selectedProduct)
  const flowSteps: FlowStep[] = currentProduct?.flowSteps || []

  if (!selectedProduct) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🎯 Game Flow Step
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Select a product first to see available game moments.
          </p>
        </div>
        <div className="p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">Choose a game product above to see flow steps</p>
        </div>
      </div>
    )
  }

  const selectedStep = flowSteps.find(step => step.id === selectedFlowStep)

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-purple-900 mb-2">
          🎯 Game Flow Step
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose a specific moment in {currentProduct?.name} for {personalityName} to comment on.
        </p>
      </div>
      
      <div className="space-y-3">
        <select
          value={selectedFlowStep || ''}
          onChange={(e) => onFlowStepChange(e.target.value)}
          className="block w-full rounded-lg border-2 border-purple-300 bg-white shadow-lg hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-base font-medium px-4 py-3"
        >
          <option value="" disabled>
            🎯 Select a game moment...
          </option>
          {flowSteps.map((step) => (
            <option key={step.id} value={step.id}>
              {step.name}
            </option>
          ))}
        </select>

        {/* Show selected step description */}
        {selectedStep && (
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900 mb-1">{selectedStep.name}</h4>
            <p className="text-sm text-purple-800">{selectedStep.description}</p>
          </div>
        )}
      </div>

      {/* Flow Step Settings */}
      {selectedStep?.hasSettings && selectedStep.type && (
        <div className="pt-4 border-t border-gray-200">
          <FlowStepSettingsComponent
            stepType={selectedStep.type}
            settings={flowStepSettings}
            onSettingsChange={onFlowStepSettingsChange}
          />
        </div>
      )}
    </div>
  )
}