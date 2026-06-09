import { createGlobalStyle, keyframes } from 'styled-components';

export const float = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(34px, -28px); }
`;

export const rise = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
`;

export const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html { scroll-behavior: smooth; }

  body {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 14px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    transition: background 0.25s ease, color 0.25s ease;
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.display};
    letter-spacing: -0.02em;
    font-weight: 600;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    color: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.selection};
  }
`;
