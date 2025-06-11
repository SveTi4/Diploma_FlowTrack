import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 481px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    height: 80px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 16px;
  }
`

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
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

  @media (max-width: 480px) {
    font-size: 18px;
  }
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: flex-end;
    padding-top: 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
` 