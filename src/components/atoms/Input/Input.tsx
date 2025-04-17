import styled from 'styled-components'
import { BaseProps } from '../../../types/common'

interface InputProps extends BaseProps {
  type?: 'text' | 'password'
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.light};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Input = ({ type = 'text', ...props }: InputProps) => {
  return <StyledInput type={type} {...props} />
} 