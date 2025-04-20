import styled from 'styled-components'
import { RegisterForm } from '../../molecules/RegisterForm/RegisterForm'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.md};
  background: #191A1D;
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
  color: #FFFFFF;
`

const Subtitle = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: #A5A5A7;
`

export const RegisterPage = () => {
  return (
    <Container>
      <Logo />
      <Title>Регистрация</Title>
      <Subtitle>Создайте новый аккаунт</Subtitle>
      <RegisterForm />
    </Container>
  )
} 