import styled from 'styled-components'
import { BaseProps } from '../../../types/common'

interface InputProps extends BaseProps {
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Input = ({ type = 'text', ...props }: InputProps) => {
  return <StyledInput type={type} {...props} />
} 