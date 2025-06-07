import { StyledInput } from './Input.styles'

interface InputProps {
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  id?: string
}

export const Input = ({ type = 'text', ...props }: InputProps) => {
  return <StyledInput type={type} {...props} />
} 