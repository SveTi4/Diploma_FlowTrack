import { ChangeEvent } from 'react'
import { Input } from './SearchInput.styles'

interface SearchInputProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchInput = ({ value = '', onChange, placeholder = 'Поиск...' }: SearchInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <Input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  )
} 