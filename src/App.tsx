import { ThemeProvider } from './contexts/ThemeContext'
import { PanelProvider } from './contexts/PanelContext'
import { Router } from './Router'

const App = () => {
  return (
    <ThemeProvider>
      <PanelProvider>
        <Router />
      </PanelProvider>
    </ThemeProvider>
  )
}

export default App
