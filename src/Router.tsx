import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store'
import { GlobalStyles } from './styles/GlobalStyles'
import { AuthPage } from './components/organisms/AuthPage/AuthPage'
import { RegisterPage } from './components/organisms/RegisterPage/RegisterPage'
import { MainTemplate } from './components/templates/MainTemplate/MainTemplate'
import { ProjectsPage } from "./components/pages/ProjectsPage/ProjectsPage"
import { ProjectPage } from "./components/pages/ProjectPage/ProjectPage"
import { PageHeader } from "./components/molecules/PageHeader/PageHeader"

export const Router = () => {
  return (
    <Provider store={store}>
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
                Когда-нибудь тут будет статичстика
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/guides" element={
            <MainTemplate>
              <PageHeader title={'Гайды'}>
                Если мне будет не лень то может и гайды появятся
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/notifications" element={
            <MainTemplate>
              <PageHeader title={'Уведомления'}>
                Ууууу, этот пункт вообще покрыт тайной
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/archive" element={
            <MainTemplate>
              <PageHeader title={'Архив'}>
                Туть будет то, что ты "СЛУЧАЙНО" удалил/а, но оно оказалось жизненно необходимым
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/support" element={
            <MainTemplate>
              <PageHeader title={'Поддержка'}>
                Увы, тебе уже ничего не поможет...
              </PageHeader>
            </MainTemplate>
          } />
          <Route path="/profile" element={
            <MainTemplate>
              <PageHeader title={'Профиль'} >
                Профиль - база, позже появится, отвечаю
              </PageHeader>
            </MainTemplate>
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
} 