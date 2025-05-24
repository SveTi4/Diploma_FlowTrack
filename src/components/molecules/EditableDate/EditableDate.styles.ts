import styled from 'styled-components'

export const DateWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const DateValue = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.surface};
  flex: 1;
`

export const EditableInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.5;
  flex: 1;
  height: 36px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
` 