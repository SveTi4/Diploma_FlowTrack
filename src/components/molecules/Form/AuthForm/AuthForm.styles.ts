import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const Container = styled.div<{ isChanging: boolean }>`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(4px);
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 8px;
    max-width: calc(100% - 2rem);
    margin: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

export const FormWrapper = styled.div<{ isChanging: boolean; isLogin: boolean }>`
  animation: ${({ isChanging, isLogin }) => 
    isChanging 
      ? isLogin 
        ? slideIn 
        : slideOut 
      : 'none'
  } 0.3s ease-in-out;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;

    &::after {
      width: 40px;
      height: 2px;
    }
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.error}11;
  border-radius: 4px;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.375rem;
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &::before {
      left: 100%;
    }
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surface};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    padding: 0.625rem;
    font-size: 0.875rem;
  }
`

export const ToggleButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s ease;
  position: relative;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.2s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary}dd;

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    height: 1.75rem;
  }
` 