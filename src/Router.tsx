import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalStyles } from './styles/GlobalStyles'
import { AuthPage, ProjectsPage, ProjectPage, ArchivePage } from './components/pages'
import { MainTemplate } from './components/templates'
import { PageHeader } from "./components/molecules"

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
              <PageHeader title={'Статистика'}>
                Тут пока что пусто
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/guides" element={
            <MainTemplate>
              <PageHeader title={'Гайды'}>
                Тут пока что пусто
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/archive" element={
            <MainTemplate>
              <ArchivePage />
            </MainTemplate>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
} 