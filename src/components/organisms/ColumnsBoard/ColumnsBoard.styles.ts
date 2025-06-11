import styled from 'styled-components'

export const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0px;

  @media (max-width: 480px) {
    margin-bottom: 0;
  }
`

export const BoardTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 0;
  overflow-x: auto;
  width: 100%;
  align-items: flex-start;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding-bottom: 48px;
  position: relative;
  left: 0;
  right: 0;
  
  /* Стилизация скроллбара */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  @media (max-width: 480px) {
    gap: 16px;
    padding: 16px 0;
    padding-bottom: 48px;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scroll-padding: 16px;
  }
` 