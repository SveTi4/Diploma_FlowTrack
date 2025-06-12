import { useTheme } from 'styled-components';

// Function to convert hex to HSL
const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
  // Remove the hash if it exists
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Function to convert HSL to hex
const HSLToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c/2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const useColorIntensity = () => {
  const theme = useTheme();

  const getColor = (count: number) => {
    if (count === 0) return theme.colors.surface;
    
    const { h, s, l } = hexToHSL(theme.colors.primary);
    
    if (count <= 3) {
      // Самая тусклая версия
      return HSLToHex(h, s * 0.3, l * 0.7);
    } else if (count <= 6) {
      // Средняя версия
      return HSLToHex(h, s * 0.5, l * 0.8);
    } else if (count <= 9) {
      // Светлая версия
      return HSLToHex(h, s * 0.7, l * 0.9);
    }
    
    // Полная версия для высокой активности
    return theme.colors.primary;
  };

  return { getColor };
}; 