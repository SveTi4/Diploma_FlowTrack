import React from 'react';
import styled from 'styled-components';
import { CheckIcon } from "../Icon/icons.tsx";

const StatusWrapper = styled.div`
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

const IconWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.2s ease-in-out;
`

const LoadingSpinner = styled.div`
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

interface TaskStatusProps {
  status: boolean;
  onStatusChange: () => void;
  isLoading?: boolean;
}

export const TaskStatus: React.FC<TaskStatusProps> = ({ 
  status, 
  onStatusChange,
  isLoading = false 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const currentColor = status ? 'green' : 'red';
  const hoverColor = !status ? 'green' : 'red';
  
  return (
    <StatusWrapper
      onClick={onStatusChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <IconWrapper isVisible={!isHovered}>
            <CheckIcon size={24} color={currentColor} />
          </IconWrapper>
          <IconWrapper isVisible={isHovered}>
            <CheckIcon size={24} color={hoverColor} />
          </IconWrapper>
        </>
      )}
    </StatusWrapper>
  );
}; 