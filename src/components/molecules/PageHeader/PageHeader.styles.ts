import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  font-size: 20px;

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.8;
  }
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 500;
`

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
` 