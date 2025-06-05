import { useTheme } from '../../../contexts/ThemeContext'
import { ToggleButton } from './ThemeToggle.styles'
import {ThemeDarkIcon, ThemeLightIcon} from "../Icon/icons.tsx";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Переключить тему">
      {theme === 'light' ? (
        <ThemeLightIcon />
      ) : (
        <ThemeDarkIcon />
      )}
    </ToggleButton>
  )
} 