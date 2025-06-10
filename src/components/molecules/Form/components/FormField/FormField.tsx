import React from 'react'
import { Container, Label, Input, Error } from './FormField.styles'

interface FormFieldProps {
  name: string
  label: string
  type?: 'text' | 'password'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  disabled
}) => {
  return (
    <Container>
      <Label htmlFor={name}>
        {label}
        {required && ' *'}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <Error id={`${name}-error`} role="alert">
          {error}
        </Error>
      )}
    </Container>
  )
} 