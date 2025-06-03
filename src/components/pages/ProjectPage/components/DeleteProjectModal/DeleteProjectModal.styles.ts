import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const WarningText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.5;
`

export const WarningTitle = styled.h4`
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 500;
`

export const WarningDescription = styled.p`
  margin: 0 0 16px 0;
`

export const WarningOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
`

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const OptionTitle = styled.span`
  font-weight: 500;
`

export const OptionDescription = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
` 