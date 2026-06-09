import styled from 'styled-components';
import { useThemeStore } from '../../store/themeStore';

const Track = styled.button`
  position: relative;
  width: 52px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface2};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  transition: border-color 0.18s, background 0.18s;
  flex-shrink: 0;

  &:hover { border-color: ${({ theme }) => theme.colors.border2}; }
`;

const Knob = styled.span<{ $dark: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $dark }) => ($dark ? '26px' : '2px')};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradients.primary};
  box-shadow: 0 2px 6px rgba(0,0,0,.2);
  transition: left 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.onAccent};
`;

const IconSlot = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  color: ${({ theme }) => theme.colors.text3};
`;

function SunIcon({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width={size} height={size}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

function MoonIcon({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeStore();
  const isDark = mode === 'dark';

  return (
    <Track type="button" onClick={toggleMode} aria-label="Alternar tema claro/escuro">
      <IconSlot><SunIcon /></IconSlot>
      <IconSlot><MoonIcon /></IconSlot>
      <Knob $dark={isDark}>
        {isDark ? <MoonIcon size={13} /> : <SunIcon size={13} />}
      </Knob>
    </Track>
  );
}
