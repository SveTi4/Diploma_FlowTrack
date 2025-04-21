import styled from 'styled-components'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange: (value: string) => void
}

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  color: white;
  width: 240px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }
`

export const SearchInput = ({ placeholder = 'Поиск...', value, onChange }: SearchInputProps) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
} 