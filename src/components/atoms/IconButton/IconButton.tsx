import styled from 'styled-components'
import {InfoIcon, RefreshIcon, TrashIcon} from '../Icon/icons'

const StyledButton = styled.button<{ $size?: number, $color: string }>`
  background: none;
  border: none;
  padding: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.1s ease;

  &:hover {
    opacity: 1;
    color: ${({ theme, $color }) => $color === 'danger' 
            ? theme.colors.danger 
            : $color === 'warning' 
                    ? theme.colors.warning 
                    : theme.colors.ghost
    };
  }

  svg {
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    stroke: currentColor;
  }
`

interface DeleteButtonProps {
  onClick: (e: React.MouseEvent) => void;
  size?: number;
  type?: 'delete' | 'info' | 'reload';
}

export const IconButton: React.FC<DeleteButtonProps> = ({ onClick, size = 16 , type='delete' }) => {
  switch (type) {
    case 'delete':
      return (
        <StyledButton onClick={onClick} $size={size} $color={'danger'}>
          <TrashIcon size={size}/>
        </StyledButton>
      )
    case 'info':
      return (
        <StyledButton onClick={onClick} $size={size} $color={'warning'}>
          <InfoIcon size={size} />
        </StyledButton>
      )
    case 'reload':
      return (
        <StyledButton onClick={onClick} $size={size} $color={'ghost'}>
          <RefreshIcon size={size} />
        </StyledButton>
      )
    default:
      return (
        <StyledButton onClick={onClick} $size={size} $color={'danger'}>
          <InfoIcon size={size} />
        </StyledButton>
      )
  }
} 