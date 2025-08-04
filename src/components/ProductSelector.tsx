import { ProductType, GameMode } from '../types'
import { products } from '../data/products'

interface ProductSelectorProps {
  selectedProduct: ProductType | null
  selectedGameMode: GameMode
  onProductChange: (product: ProductType) => void
  onGameModeChange: (mode: GameMode) => void
}

export default function ProductSelector({ selectedProduct, selectedGameMode, onProductChange, onGameModeChange }: ProductSelectorProps) {
  const selectedProductInfo = products.find(p => p.id === selectedProduct)
  
  const gameModes = [
    { id: 'single' as const, label: 'Single Player' },
    { id: 'multiplayer' as const, label: 'Multiplayer' }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        🎮 Game Product
      </h3>
      
      {/* Horizontally Aligned Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Selection Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
          <select
            value={selectedProduct || ''}
            onChange={(e) => onProductChange(e.target.value as ProductType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a product...</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Game Mode Selection Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Game Mode</label>
          <select
            value={selectedGameMode}
            onChange={(e) => onGameModeChange(e.target.value as GameMode)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {gameModes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Description */}
      {selectedProductInfo && (
        <p className="text-xs text-gray-600">{selectedProductInfo.description}</p>
      )}
    </div>
  )
}