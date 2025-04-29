import styled from 'styled-components'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`

const Title = styled.h1`
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`

interface PagePlaceholderProps {
  title: string
}

export const PagePlaceholder = ({ title }: PagePlaceholderProps) => (
  <Container>
    <Title>{title}</Title>
    <div>Страница в разработке...</div>
  </Container>
) 