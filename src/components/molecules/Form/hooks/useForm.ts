import { useState, FormEvent } from 'react'
import { LoginFormValues, RegisterFormValues, FormErrors } from '../types/auth.types'

type FormValues = LoginFormValues | RegisterFormValues

interface UseFormProps {
  initialValues: FormValues
  onSubmit: (values: FormValues) => Promise<void>
  validate?: (values: FormValues) => FormErrors
}

export const useForm = ({ initialValues, onSubmit, validate }: UseFormProps) => {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (validate) {
        const validationErrors = validate(values)
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors)
          return
        }
      }

      await onSubmit(values)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit
  }
} 