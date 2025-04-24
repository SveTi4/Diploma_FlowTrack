import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Основные цвета фона
      background: string
      surface: string
      
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
    
    // Можно добавить другие параметры темы
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

    typography: {
      fontFamily: string,
      fontSize: {
        xs: string,
        sm: string,
        md: string,
        lg: string,
        xl: string,
        xxl: string
      },
      fontWeight: {
        regular: number,
        medium: number,
        semibold: number,
        bold: number
      }
    }
  }
}

export const darkTheme: DefaultTheme = {
  colors: {
    // Основные цвета фона
    background: '#191A1C', // Основной фон контента
    surface: '#121316',    // Фон для карточек, панелей

    // Цвета текста
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',

    // Цвета границ
    border: 'rgba(255, 255, 255, 0.1)',

    // Акцентные цвета
    primary: '#7B68EE',   // Можете заменить на ваш основной цвет
    secondary: '#4F46E5',
    error: '#FF5252',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',

    // Состояния
    primaryHover: '#6B46C1',
    surfaceHover: 'rgba(255, 255, 255, 0.1)', // Фон при наведении
    backgroundHover: 'rgba(255, 255, 255, 0.1)'
  },
  
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
  }
}

// В будущем можно добавить светлую тему
export const lightTheme: DefaultTheme = {
  // ... конфигурация светлой темы
}

export const theme = {
  colors: {
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    secondary: '#4F46E5',
    background: '#121316',
    surface: '#1E293B',
    border: 'rgba(255, 255, 255, 0.1);',
    light: '#F8FAFC',
    dark: '#020617',
    danger: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',
    disabled: '#475569',
    input: '#1E293B'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
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
} as const

export type Theme = typeof theme 