import { ThemeProvider } from './contexts/ThemeContext'
import { Router } from './Router'

const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}

export default App
