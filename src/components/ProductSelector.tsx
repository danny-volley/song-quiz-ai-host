import { ProductType, GameMode } from '../types'
import { products } from '../data/products'

interface ProductSelectorProps {
  selectedProduct: ProductType | null
  selectedGameMode: GameMode
  onProductChange: (product: ProductType) => void
  onGameModeChange: (mode: GameMode) => void
}

export default function ProductSelector({ selectedProduct, selectedGameMode, onProductChange, onGameModeChange }: ProductSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          🎮 Select Game Product
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose which game context Riley should provide commentary for.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onProductChange(product.id)}
            className={`
              p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-md
              ${selectedProduct === product.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              </div>
              <div className={`
                w-4 h-4 rounded-full border-2 transition-colors
                ${selectedProduct === product.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
                }
              `}>
                {selectedProduct === product.id && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Game Mode Selection */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900">Game Mode</h4>
        <div className="flex gap-3">
          {[
            { id: 'single' as const, label: 'Single Player', desc: 'One player experience' },
            { id: 'multiplayer' as const, label: 'Multiplayer', desc: 'Multiple players competing' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => onGameModeChange(mode.id)}
              className={`
                flex-1 p-3 text-left border rounded-lg transition-all duration-200 hover:shadow-sm
                ${selectedGameMode === mode.id
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-200'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">{mode.label}</h5>
                  <p className="text-xs text-gray-600 mt-0.5">{mode.desc}</p>
                </div>
                <div className={`
                  w-3 h-3 rounded-full border-2 transition-colors
                  ${selectedGameMode === mode.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                  }
                `}>
                  {selectedGameMode === mode.id && (
                    <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}