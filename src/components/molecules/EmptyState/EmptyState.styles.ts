import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 48px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  text-align: center;
`

export const IconContainer = styled.div`
  margin-bottom: 24px;
  svg {
    width: 48px;
    height: 48px;
    stroke: currentColor;
  }
`

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  max-width: 400px;
  margin-bottom: 24px;
`

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
` 