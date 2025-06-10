import { useTheme } from '../../../contexts/ThemeContext'
import { ThemeDarkIcon, ThemeLightIcon } from "../../atoms"
import { ToggleButton } from './ThemeToggle.styles'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Переключить тему">
      {theme === 'light' ? <ThemeLightIcon /> : <ThemeDarkIcon />}
    </ToggleButton>
  )
} 