import { ProductType } from '../types'

export interface Theme {
  name: string
  background: string
  cardBackground: string
  primary: string
  secondary: string
  accent: string
  text: {
    primary: string
    secondary: string
    accent: string
  }
  gradients: {
    main: string
    card: string
    personality: string
  }
}

export const themes: Record<ProductType, Theme> = {
  'songquiz': {
    name: 'Song Quiz',
    background: 'from-purple-400 via-pink-300 to-purple-500',
    cardBackground: 'bg-white/90 backdrop-blur-sm',
    primary: 'purple-600',
    secondary: 'pink-500',
    accent: 'purple-500',
    text: {
      primary: 'purple-900',
      secondary: 'purple-700',
      accent: 'pink-600'
    },
    gradients: {
      main: 'from-purple-400 via-pink-300 to-purple-500',
      card: 'from-purple-50 to-pink-50',
      personality: 'from-purple-100 to-pink-100'
    }
  },
  'wheel': {
    name: 'Wheel of Fortune',
    background: 'from-green-400 via-yellow-300 to-green-500',
    cardBackground: 'bg-white/90 backdrop-blur-sm',
    primary: 'green-600',
    secondary: 'yellow-500',
    accent: 'green-500',
    text: {
      primary: 'green-900',
      secondary: 'green-700',
      accent: 'yellow-600'
    },
    gradients: {
      main: 'from-green-400 via-yellow-300 to-green-500',
      card: 'from-green-50 to-yellow-50',
      personality: 'from-green-100 to-yellow-100'
    }
  },
  'jeopardy': {
    name: 'Jeopardy',
    background: 'from-blue-300 via-sky-200 to-blue-400',
    cardBackground: 'bg-white/90 backdrop-blur-sm',
    primary: 'blue-600',
    secondary: 'sky-500',
    accent: 'blue-500',
    text: {
      primary: 'blue-900',
      secondary: 'blue-700',
      accent: 'sky-600'
    },
    gradients: {
      main: 'from-blue-300 via-sky-200 to-blue-400',
      card: 'from-blue-50 to-sky-50',
      personality: 'from-blue-100 to-sky-100'
    }
  }
}

export const defaultTheme: Theme = {
  name: 'Default',
  background: 'from-gray-100 via-gray-50 to-gray-100',
  cardBackground: 'bg-white/90 backdrop-blur-sm',
  primary: 'gray-600',
  secondary: 'gray-500',
  accent: 'gray-500',
  text: {
    primary: 'gray-900',
    secondary: 'gray-700',
    accent: 'gray-600'
  },
  gradients: {
    main: 'from-gray-100 via-gray-50 to-gray-100',
    card: 'from-gray-50 to-gray-100',
    personality: 'from-gray-50 to-gray-100'
  }
}

export function getTheme(productType: ProductType | null): Theme {
  if (!productType || !themes[productType]) {
    return defaultTheme
  }
  return themes[productType]
}