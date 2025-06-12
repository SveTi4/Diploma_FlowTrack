import styled from 'styled-components'

export const ProgressContainer = styled.div`
  margin-top: 8px;
`

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 12px;
`

export const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    transition: width 0.3s ease;
  }
` 