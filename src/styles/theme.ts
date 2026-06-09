import 'styled-components';

interface ThemeColors {
  bg: string;
  bg2: string;
  surface: string;
  surface2: string;
  surface3: string;
  border: string;
  border2: string;
  text: string;
  text2: string;
  text3: string;
  blue: string;
  cyan: string;
  orange: string;
  gold: string;
  green: string;
  red: string;
  onAccent: string;
  inputBg: string;
  headerBg: string;
  rowBorder: string;
  rowHover: string;
  gridLine: string;
  navHoverBg: string;
  navActiveShadow: string;
  shadowStrong: string;
  loginCardFrom: string;
  loginCardTo: string;
  demoBoxBg: string;
  selection: string;
}

interface ThemeGlows {
  blue: string;
  orange: string;
}

export interface AppTheme {
  mode: 'light' | 'dark';
  colors: ThemeColors;
  gradients: {
    primary: string;
    warm: string;
  };
  glows: ThemeGlows;
  radius: {
    default: string;
    sm: string;
    xs: string;
  };
  fonts: {
    display: string;
    body: string;
    mono: string;
  };
}

const radius = { default: '16px', sm: '11px', xs: '8px' } as const;
const fonts = {
  display: "'Sora', sans-serif",
  body: "'Hanken Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;
const gradients = {
  primary: 'linear-gradient(135deg, #2f8bff 0%, #5fcfff 100%)',
  warm: 'linear-gradient(135deg, #ff9330 0%, #ffc24d 100%)',
} as const;

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    bg: '#15171f',
    bg2: '#1c1f2a',
    surface: 'rgba(255,255,255,.03)',
    surface2: 'rgba(255,255,255,.05)',
    surface3: 'rgba(255,255,255,.07)',
    border: 'rgba(255,255,255,.08)',
    border2: 'rgba(255,255,255,.15)',
    text: '#eef2f8',
    text2: '#9098ad',
    text3: '#6b7390',
    blue: '#3aa0ff',
    cyan: '#6fd2ff',
    orange: '#ff9a3c',
    gold: '#ffc24d',
    green: '#4fd6a0',
    red: '#ff7a6b',
    onAccent: '#04121f',
    inputBg: 'rgba(255,255,255,.04)',
    headerBg: 'rgba(21,23,31,.65)',
    rowBorder: 'rgba(255,255,255,.05)',
    rowHover: 'rgba(255,255,255,.03)',
    gridLine: 'rgba(255,255,255,.022)',
    navHoverBg: 'rgba(255,255,255,.045)',
    navActiveShadow: 'rgba(255,255,255,.07)',
    shadowStrong: 'rgba(0,0,0,.7)',
    loginCardFrom: 'rgba(255,255,255,.05)',
    loginCardTo: 'rgba(255,255,255,.018)',
    demoBoxBg: 'rgba(255,255,255,.03)',
    selection: 'rgba(58,160,255,.35)',
  },
  gradients,
  glows: {
    blue: 'rgba(58,160,255,.5)',
    orange: 'rgba(255,154,60,.42)',
  },
  radius,
  fonts,
};

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    bg: '#f3f4f7',
    bg2: '#e8eaef',
    surface: 'rgba(20,24,40,.035)',
    surface2: 'rgba(20,24,40,.055)',
    surface3: 'rgba(20,24,40,.08)',
    border: 'rgba(20,24,40,.1)',
    border2: 'rgba(20,24,40,.18)',
    text: '#1c2030',
    text2: '#5b6175',
    text3: '#8991a8',
    blue: '#2f7fe0',
    cyan: '#1aa8d6',
    orange: '#e8842a',
    gold: '#cc9a30',
    green: '#23a87c',
    red: '#e6594a',
    onAccent: '#04121f',
    inputBg: 'rgba(20,24,40,.035)',
    headerBg: 'rgba(243,244,247,.75)',
    rowBorder: 'rgba(20,24,40,.06)',
    rowHover: 'rgba(20,24,40,.03)',
    gridLine: 'rgba(20,24,40,.025)',
    navHoverBg: 'rgba(20,24,40,.05)',
    navActiveShadow: 'rgba(20,24,40,.06)',
    shadowStrong: 'rgba(20,24,40,.12)',
    loginCardFrom: 'rgba(255,255,255,.85)',
    loginCardTo: 'rgba(255,255,255,.55)',
    demoBoxBg: 'rgba(20,24,40,.035)',
    selection: 'rgba(47,127,224,.18)',
  },
  gradients,
  glows: {
    blue: 'rgba(58,160,255,.18)',
    orange: 'rgba(255,154,60,.16)',
  },
  radius,
  fonts,
};

export const theme = lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
