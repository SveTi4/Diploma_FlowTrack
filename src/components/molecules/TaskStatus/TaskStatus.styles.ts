import styled from 'styled-components'

export const StatusWrapper = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
  background: inherit;
  border-right: inherit;
  transition: all 0.2s ease-in-out;
  position: relative;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`

export const IconWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.2s ease-in-out;
`

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  position: absolute;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
` 