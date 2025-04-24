import { ThemeProvider } from 'styled-components'
import { darkTheme } from './styles/theme'
import { Router } from './Router'

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router />
    </ThemeProvider>
  )
}

export default App
