import { Container, Title } from './PagePlaceholder.styles'

interface PagePlaceholderProps {
  title: string
}

export const PagePlaceholder = ({ title }: PagePlaceholderProps) => (
  <Container>
    <Title>{title}</Title>
    <div>Страница в разработке...</div>
  </Container>
) 