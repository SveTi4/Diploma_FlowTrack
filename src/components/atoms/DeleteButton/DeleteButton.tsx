import styled from 'styled-components'
import { TrashIcon } from '../Icon/icons'

const StyledButton = styled.button<{ $size?: number }>`
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
    color: ${({ theme }) => theme.colors.error};
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
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, size = 16 }) => {
  return (
    <StyledButton onClick={onClick} $size={size}>
      <TrashIcon size={size} />
    </StyledButton>
  )
} 