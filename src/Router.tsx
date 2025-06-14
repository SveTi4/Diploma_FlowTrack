import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalStyles } from './styles/GlobalStyles'
import { AuthPage, ProjectsPage, ProjectPage, StatsPage, GuidesPage } from './components/pages'
import { MainTemplate } from './components/templates'

export const Router = () => {
  return (
    <>
      {/* @ts-expect-error GlobalStyles использует styled-components, который не имеет типов */}
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/projects" element={
            <MainTemplate>
              <ProjectsPage />
            </MainTemplate>
          } />
          <Route path="/projects/:id" element={
            <MainTemplate>
              <ProjectPage />
            </MainTemplate>
          } />
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
          <Route path="/archive" element={
            <MainTemplate>
              <ProjectsPage />
            </MainTemplate>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
} 