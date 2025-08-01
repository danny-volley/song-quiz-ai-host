import { ResponseLength } from '../types'
import { responseLengths } from '../data/products'

interface ResponseLengthSelectorProps {
  selectedLength: ResponseLength
  onLengthChange: (length: ResponseLength) => void
}

export default function ResponseLengthSelector({ selectedLength, onLengthChange }: ResponseLengthSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          📏 Response Length
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Control how detailed Riley's responses should be.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {responseLengths.map((lengthInfo) => (
          <button
            key={lengthInfo.id}
            onClick={() => onLengthChange(lengthInfo.id)}
            className={`
              p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-md
              ${selectedLength === lengthInfo.id
                ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-gray-900">{lengthInfo.label}</h4>
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${selectedLength === lengthInfo.id
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {lengthInfo.wordCount}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{lengthInfo.description}</p>
              </div>
              <div className={`
                w-4 h-4 rounded-full border-2 transition-colors
                ${selectedLength === lengthInfo.id
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
                }
              `}>
                {selectedLength === lengthInfo.id && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}