import styled from 'styled-components'

const Container = styled.div<{ type: 'loading' | 'error' | 'success' }>`
  text-align: center;
  padding: 32px;
  color: ${({ theme, type }) => {
    switch (type) {
      case 'error':
        return theme.colors.danger
      case 'success':
        return theme.colors.success
      default:
        return theme.colors.light
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface StatusTextProps {
  type: 'loading' | 'error' | 'success'
  text: string
  icon?: React.ReactNode
}

export const StatusText = ({ type, text, icon }: StatusTextProps) => {
  return (
    <Container type={type}>
      {icon && <IconContainer>{icon}</IconContainer>}
      {text}
    </Container>
  )
} 