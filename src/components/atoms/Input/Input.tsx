import { BaseProps } from '../../../types/common'
import { StyledInput } from './Input.styles'

interface InputProps extends BaseProps {
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ type = 'text', ...props }: InputProps) => {
  return <StyledInput type={type} {...props} />
} 