export const theme = {
  colors: {
    primary: '#2589FF',
    secondary: '#5856D6',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    info: '#5856D6',
    light: '#F2F2F7',
    dark: '#1C1C1E',
    page_bg: '#191A1D',
    project_card_bg: '#27282A',
    sidebar_bg: '#121315',
    sidebar_item_bg: '#1E1F21',

  },
  
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.25,
    },
    nav_link: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      opacity: 0.6,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
}

export type Theme = typeof theme 