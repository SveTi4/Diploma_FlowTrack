import styled from 'styled-components'
import { LoginForm } from '../../molecules/LoginForm/LoginForm'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.light};
`

const Logo = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(45deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.secondary}
  );
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};
`

const Subtitle = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.dark};
  opacity: 0.7;
`

export const AuthPage = () => {
  return (
    <Container>
      <Logo />
      <Title>Добро пожаловать</Title>
      <Subtitle>Авторизируйтесь или войдите под своим логином</Subtitle>
      <LoginForm />
    </Container>
  )
} 