import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: ${({ theme }) => theme.colors.border} solid 1px;
    
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const ErrorMessage = styled.div`
  color: #FF3B30;
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
` 