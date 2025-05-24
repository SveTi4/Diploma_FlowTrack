import styled from 'styled-components'

export const DescriptionWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.surface};
  flex: 1;
  white-space: pre-wrap;
`

export const EditableTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.5;
  flex: 1;
  min-height: 100px;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
` 