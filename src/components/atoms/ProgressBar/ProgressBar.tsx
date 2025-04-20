import styled from 'styled-components'

const ProgressContainer = styled.div`
  margin-top: 8px;
`

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.7;
  font-size: 12px;
`

const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
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

interface ProgressBarProps {
  progress: number
  timeLeft: string
}

export const ProgressBarComponent = ({ progress, timeLeft }: ProgressBarProps) => {
  return (
    <ProgressContainer>
      <ProgressInfo>
        <span>Прогресс {progress}%</span>
        <span>{timeLeft}</span>
      </ProgressInfo>
      <ProgressBar progress={progress} />
    </ProgressContainer>
  )
} 