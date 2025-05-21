import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store'
import { GlobalStyles } from './styles/GlobalStyles'
import { AuthPage } from './components/pages/AuthPage/AuthPage'
import { RegisterPage } from './components/pages/RegisterPage/RegisterPage'
import { MainTemplate } from './components/templates/MainTemplate/MainTemplate'
import { ProjectsPage } from "./components/pages/ProjectsPage/ProjectsPage"
import { ProjectPage } from "./components/pages/ProjectPage/ProjectPage"
import { PageHeader } from "./components/molecules/PageHeader/PageHeader"

export const Router = () => {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <GlobalStyles />
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
          <Route path="/notifications" element={
            <MainTemplate>
              <PageHeader title={'Уведомления'}>
                Тут пока что пусто
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/archive" element={
            <MainTemplate>
              <PageHeader title={'Архив'}>
                Тут пока что пусто
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/support" element={
            <MainTemplate>
              <PageHeader title={'Поддержка'}>
                Тут пока что пусто
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/profile" element={
            <MainTemplate>
              <PageHeader title={'Профиль'} >
                Тут пока что пусто
              </PageHeader>
            </MainTemplate>
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
} 