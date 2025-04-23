import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { AuthPage } from './components/organisms/AuthPage/AuthPage'
import { RegisterPage } from './components/organisms/RegisterPage/RegisterPage'
import { MainTemplate } from './components/templates/MainTemplate/MainTemplate'
import './App.css'
import {ProjectsPage} from "./components/pages/ProjectsPage/ProjectsPage.tsx";
import {ProjectPage} from "./components/pages/ProjectPage/ProjectPage.tsx";
import {PageHeader} from "./components/molecules/PageHeader/PageHeader.tsx";

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
                <ProjectPage />
              </MainTemplate>
            } />
            // Projects/new: Страница создания нового проекта (нужно дописать!)
            <Route path="/stats" element={
              <MainTemplate>
                <PageHeader title={'Статистика'}>
                  Когда-нибудь тут будет статичстика
                </PageHeader>
                {/*<StatsPage />*/}
              </MainTemplate>
            } />
            <Route path="/guides" element={
              <MainTemplate>
                <PageHeader title={'Гайды'}>
                  Если мне будет не лень то может и гайды появятся
                </PageHeader>
                {/*<GuidesPage />*/}
              </MainTemplate>
            } />
            <Route path="/notifications" element={
              <MainTemplate>
                <PageHeader title={'Уведомления'}>
                  Ууууу, этот пункт вообще покрыт тайной
                </PageHeader>
                {/*<NotificationsPage />*/}
              </MainTemplate>
            } />
            <Route path="/archive" element={
              <MainTemplate>
                <PageHeader title={'Архив'}>
                  Туть будет то, что ты "СЛУЧАЙНО" удалил/а, но оно оказалось жизненно необходимым
                </PageHeader>
                {/*<ArchivePage />*/}
              </MainTemplate>
            } />
            <Route path="/support" element={
              <MainTemplate>
                <PageHeader title={'Поддержка'}>
                  Увы, тебе уже ничего не поможет...
                </PageHeader>
                {/*<SupportPage />*/}
              </MainTemplate>
            } />
            <Route path="/profile" element={
              <MainTemplate>
                <PageHeader title={'Профиль'} >
                  Профиль - база, позже появится, отвечаю
                </PageHeader>
                {/*<ProfilePage />*/}
              </MainTemplate>
            } />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
