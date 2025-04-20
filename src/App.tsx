import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { AuthPage } from './components/organisms/AuthPage/AuthPage'
import { RegisterPage } from './components/organisms/RegisterPage/RegisterPage'
import { MainTemplate } from './components/templates/MainTemplate/MainTemplate'
import { StatsPage } from './components/pages/StatsPage/StatsPage'
import { ProjectsPage } from './components/pages/ProjectsPage/ProjectsPage'
import { GuidesPage } from './components/pages/GuidesPage/GuidesPage'
import { NotificationsPage } from './components/pages/NotificationsPage/NotificationsPage'
import { ArchivePage } from './components/pages/ArchivePage/ArchivePage'
import { SupportPage } from './components/pages/SupportPage/SupportPage'
import { ProfilePage } from './components/pages/ProfilePage/ProfilePage'
import { ProjectDetailsPage } from './components/pages/ProjectDetailsPage/ProjectDetailsPage'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/projects" element={
              <MainTemplate>
                <ProjectsPage />
              </MainTemplate>
            } />
            <Route path="/projects/:id" element={
              <MainTemplate>
                <ProjectDetailsPage />
              </MainTemplate>
            } />
            // Projects/new: Страница создания нового проекта (нужно дописать!)
            <Route path="/stats" element={
              <MainTemplate>
                <StatsPage />
              </MainTemplate>
            } />
            <Route path="/guides" element={
              <MainTemplate>
                <GuidesPage />
              </MainTemplate>
            } />
            <Route path="/notifications" element={
              <MainTemplate>
                <NotificationsPage />
              </MainTemplate>
            } />
            <Route path="/archive" element={
              <MainTemplate>
                <ArchivePage />
              </MainTemplate>
            } />
            <Route path="/support" element={
              <MainTemplate>
                <SupportPage />
              </MainTemplate>
            } />
            <Route path="/profile" element={
              <MainTemplate>
                <ProfilePage />
              </MainTemplate>
            } />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
