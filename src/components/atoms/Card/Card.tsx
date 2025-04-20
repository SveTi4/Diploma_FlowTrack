import styled from 'styled-components'

const CardContainer = styled.div`
  background: #27282A;
  border: #323336 1px solid;
  border-radius: 12px;
  padding: 20px;
`

const CardTitle = styled.h3`
  color: white;
  font-size: 16px;
  margin-bottom: 16px;
`

const CardContent = styled.div`
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
`

interface CardProps {
  title?: string
  children: React.ReactNode
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <CardContainer>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  )
} 