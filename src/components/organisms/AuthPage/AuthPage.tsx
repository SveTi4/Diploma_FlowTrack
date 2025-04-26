import styled from 'styled-components'
import { LoginForm } from '../../molecules/LoginForm/LoginForm'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`

export const AuthPage = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  )
} 