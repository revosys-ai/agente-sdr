import 'styled-components';

export const theme = {
  colors: {
    bg: '#04050a',
    bg2: '#080a12',
    surface: 'rgba(255,255,255,.025)',
    surface2: 'rgba(255,255,255,.045)',
    border: 'rgba(255,255,255,.08)',
    border2: 'rgba(255,255,255,.15)',
    text: '#eef2f8',
    text2: '#9098ad',
    text3: '#525a70',
    blue: '#3aa0ff',
    cyan: '#6fd2ff',
    orange: '#ff9a3c',
    gold: '#ffc24d',
    green: '#4fd6a0',
    red: '#ff7a6b',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #2f8bff 0%, #5fcfff 100%)',
    warm: 'linear-gradient(135deg, #ff9330 0%, #ffc24d 100%)',
  },
  glows: {
    blue: 'rgba(58,160,255,.5)',
    orange: 'rgba(255,154,60,.42)',
  },
  radius: {
    default: '16px',
    sm: '11px',
    xs: '8px',
  },
  fonts: {
    display: "'Sora', sans-serif",
    body: "'Hanken Grotesk', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
} as const;

export type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
