import styled from 'styled-components'

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 30px ${({ theme }) => theme.colors.primary}15,
    0 0 15px ${({ theme }) => theme.colors.primary}10;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(
        circle at 50% 50%,
        ${({ theme }) => theme.colors.primary}05 0%,
        ${({ theme }) => theme.colors.primary}02 25%,
        ${({ theme }) => theme.colors.primary}00 50%
      ),
      repeating-linear-gradient(
        45deg,
        ${({ theme }) => theme.colors.primary}00 0px,
        ${({ theme }) => theme.colors.primary}00 2px,
        ${({ theme }) => theme.colors.primary}02 2px,
        ${({ theme }) => theme.colors.primary}02 4px
      );
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary}00 0%,
      ${({ theme }) => theme.colors.primary}03 50%,
      ${({ theme }) => theme.colors.primary}00 100%
    );
    animation: frostGlow 4s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes frostGlow {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`

export const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  opacity: 0.9;
`

export const CardContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`

export const Description = styled.p<{ isEmpty: boolean }>`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme, isEmpty }) => isEmpty ? theme.colors.textSecondary : theme.colors.text};
  line-height: 1.5;
  opacity: 0.8;
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.7;
`

export const MetaDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.5;
`

export const MetaDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const MetaLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.7;
`

export const TimeBlock = styled.div<{ isExpired: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme, isExpired }) => isExpired ? theme.colors.error : theme.colors.textSecondary};
  opacity: 0.8;
`

export const TimeIcon = styled.div<{ isExpired: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme, isExpired }) => isExpired ? theme.colors.error : theme.colors.textSecondary};
  opacity: 0.8;
`

export const TimeText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`

export const TimeDate = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.7;
`

export const HighlightedText = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2px;
  border-radius: 2px;
`

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: ${({ theme }) => theme.spacing.small};
` 