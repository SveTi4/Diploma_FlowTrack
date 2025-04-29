import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Основные цвета фона
      background: string
      surface: string
      light: string
      dark: string
      ghost: string
      
      // Цвета текста
      text: string
      textSecondary: string
      
      // Цвета границ
      border: string
      
      // Акцентные цвета
      primary: string
      secondary: string
      error: string
      success: string
      warning: string
      danger: string
      
      // Состояния
      primaryHover: string
      backgroundHover: string
      surfaceHover: string
    }
    
    spacing: {
      small: string
      medium: string
      large: string
    }
    
    borderRadius: {
      small: string
      medium: string
      large: string
    }
    
    breakpoints: {
      mobile: string
      tablet: string
      desktop: string
      wide: string
    }

    typography: {
      fontFamily: string
      fontSize: {
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
        xxl: string
      }
      fontWeight: {
        regular: number
        medium: number
        semibold: number
        bold: number
      }
    }

    shadows: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}

// Базовые значения, общие для всех тем
const baseTheme = {
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px'
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
      xxl: '32px'
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
  }
}

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    // Основные цвета фона
    background: '#FFFFFF',
    surface: '#F8FAFC',
    light: '#fff',
    dark: '#000',
    ghost: 'rgb(145,145,145)',

    // Цвета текста
    text: '#0F172A',
    textSecondary: '#64748B',

    // Цвета границ
    border: '#E2E8F0',

    // Акцентные цвета
    primary: '#3B82F6',
    secondary: '#6366F1',
    error: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#DC2626',

    // Состояния
    primaryHover: '#2563EB',
    backgroundHover: 'rgba(15, 23, 42, 0.03)',
    surfaceHover: 'rgba(15, 23, 42, 0.05)'
  }
}

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    // Основные цвета фона
    background: '#191A1C',
    surface: '#121316',
    light: '#fff',
    dark: '#000',
    ghost: 'rgb(145,145,145)',

    // Цвета текста
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',

    // Цвета границ
    border: 'rgba(255, 255, 255, 0.1)',

    // Акцентные цвета
    primary: '#7B68EE',
    secondary: '#4F46E5',
    error: '#FF5252',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',

    // Состояния
    primaryHover: '#6B46C1',
    backgroundHover: 'rgba(255, 255, 255, 0.1)',
    surfaceHover: 'rgba(255, 255, 255, 0.1)'
  }
}

export type Theme = DefaultTheme 