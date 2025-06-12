import { ThemeProvider } from './contexts/ThemeContext'
import { PanelProvider } from './contexts/PanelContext'
import { Router } from './Router'
import { Provider } from 'react-redux'
import { store } from './store'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <PanelProvider>
          <Router />
        </PanelProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
