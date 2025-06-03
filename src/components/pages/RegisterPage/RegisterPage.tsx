import styled from 'styled-components'
import { RegisterForm } from '../../molecules/Forms/RegisterForm.tsx'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`

export const RegisterPage = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  )
} 