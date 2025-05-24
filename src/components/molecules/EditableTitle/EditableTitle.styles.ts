import styled from 'styled-components'

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid transparent;
  flex: 1;
`

export const EditableInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  flex: 1;
  height: 36px;
  box-sizing: border-box;
  background: none;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
` 