import styled from 'styled-components'

export const IconWrapper = styled.div<{ size: number, color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  color: ${({ color }) => color || 'inherit'};
  
  svg {
    width: inherit;
    height: 100%;
  }
` 