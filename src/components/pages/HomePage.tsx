import styled from 'styled-components'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`

export const HomePage = () => {
  return (
    <Container>
      <h1>Главная страница</h1>
    </Container>
  )
} 