import styled from 'styled-components';

export const GuidesWrapper = styled.div`
  display: flex;
  gap: 32px;
  padding: 24px;
  width: 100%;
`;

export const Nav = styled.nav`
  width: 25vw;
  max-width: 180px;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  margin-bottom: 4px;
`;

export const MenuButton = styled.button<{ $active: boolean }>`
  position: relative;
  background: ${({ $active, theme }) => $active ? theme.colors.surface : 'transparent'};
  border: none;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: ${({ $active }) => $active ? 600 : 400};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  text-align: left;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
  outline: none;

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 4px;
    width: 100%;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.2s;
    opacity: 0.7;
    pointer-events: none;
  }

  &:hover::after,
  &:focus::after {
    transform: scaleX(1);
    opacity: 1;
  }

  ${({ $active }) =>
    $active && `
      &::after {
        transform: scaleX(1);
        opacity: 1;
      }
    `}
`;

export const ContentWrapper = styled.div`
  width: 80vw;
  margin-left: 24px;
`;

export const MarkdownContent = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: 24px 20px;
  transition: background 0.2s, color 0.2s;

  h1, h2, h3 {
    margin: 1em 0 0.6em;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.text};
  }
  h1 { font-size: 2em; }
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.2em; }

  ul {
    list-style: inside disc;
    padding-left: 1.2em;
  }
  ol {
    list-style: inside decimal;
    padding-left: 1.2em;
  }
  li {
    margin-bottom: 0.3em;
  }
  p {
    margin: 0.5em 0 1em 0;
  }
  code {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.95em;
  }
  pre {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 6px;
    padding: 12px;
    overflow-x: auto;
    font-size: 0.95em;
  }
  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.border};
    margin: 1em 0;
    padding: 0.5em 1em;
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.surface};
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`; 