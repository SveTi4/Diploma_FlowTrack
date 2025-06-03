import { ProgressContainer, ProgressInfo, ProgressBar } from './ProgressBar.styles'

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