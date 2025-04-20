import styled from 'styled-components'

const Button = styled.button<{ 
  variant: 'primary' | 'secondary' | 'danger',
  size: 'small' | 'medium' | 'large'
}>`
  background: none;
  border: none;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '4px'
      case 'large':
        return '12px'
      default:
        return '8px'
    }
  }};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;
  border-radius: 6px;

  &:hover {
    opacity: 1;
    ${({ variant, theme }) => {
      switch (variant) {
        case 'danger':
          return `color: ${theme.colors.danger}`
        case 'primary':
          return `background: rgba(255, 255, 255, 0.15)`
        default:
          return `background: rgba(255, 255, 255, 0.1)`
      }
    }}
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: ${({ size }) => {
      switch (size) {
        case 'small':
          return '16px'
        case 'large':
          return '24px'
        default:
          return '20px'
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case 'small':
          return '16px'
        case 'large':
          return '24px'
        default:
          return '20px'
      }
    }};
    stroke: ${({ theme, variant }) => {
      switch (variant) {
        case 'danger':
          return theme.colors.danger
        default:
          return theme.colors.light
      }
    }};
  }
`

interface IconButtonProps {
  icon: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export const IconButton = ({ 
  icon, 
  onClick, 
  variant = 'secondary', 
  size = 'medium',
  disabled = false
}: IconButtonProps) => {
  return (
    <Button 
      onClick={onClick} 
      variant={variant}
      size={size}
      disabled={disabled}
    >
      {icon}
    </Button>
  )
} 