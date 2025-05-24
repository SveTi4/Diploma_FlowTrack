import styled from 'styled-components'

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 6px 16px ${({ theme }) => theme.colors.primary}40;
  }
`

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Description = styled.p<{ isEmpty?: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  font-style: ${({ isEmpty }) => isEmpty ? 'italic' : 'normal'};
`

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
`

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const MetaDot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.5;
`

export const MetaDate = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const MetaLabel = styled.span`
  opacity: 0.7;
`

export const TimeBlock = styled.div<{ isExpired: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${({ theme, isExpired }) => 
    isExpired 
      ? `${theme.colors.danger}10` 
      : `${theme.colors.primary}10`
  };
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, isExpired }) => 
      isExpired 
        ? `${theme.colors.danger}15` 
        : `${theme.colors.primary}15`
    };
  }
`

export const TimeIcon = styled.div<{ isExpired?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ theme, isExpired }) => 
    isExpired 
      ? theme.colors.danger 
      : theme.colors.primary
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 14px;
`

export const TimeText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const TimeDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
` 