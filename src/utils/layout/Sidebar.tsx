import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { RevoLogo } from '../ui/RevoLogo';

interface NavItem { to: string; label: string; icon: React.ReactNode; }

function IconOverview() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M3 13h8V3H3zM13 21h8V3h-8zM3 21h8v-6H3z" /></svg>;
}
function IconLeads() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /></svg>;
}
function IconBehavior() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9z" /></svg>;
}
function IconKnowledge() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>;
}
function IconClients() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
}
function IconLogout() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
}

const Aside = styled.aside`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: sticky;
  top: 0;
  height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface}, transparent);
  overflow-y: auto;

  @media (max-width: 900px) { display: none; }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 6px 8px 22px;
`;

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  letter-spacing: 0.02em;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;

const NavCaption = styled.p`
  padding: 16px 12px 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.text3};
`;

const NavGroup = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const navItemBase = `
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 13px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  width: 100%;
  text-align: left;
  text-decoration: none;
  transition: background 0.16s, color 0.16s;
  background: none;
`;

const NavItem = styled(NavLink)`
  ${navItemBase}
  color: ${({ theme }) => theme.colors.text2};

  &:hover {
    background: ${({ theme }) => theme.colors.navHoverBg};
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    background: linear-gradient(135deg, rgba(58,160,255,.18), rgba(111,210,255,.08));
    color: ${({ theme }) => theme.colors.text};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.navActiveShadow};

    svg { color: ${({ theme }) => theme.colors.cyan}; filter: drop-shadow(0 0 6px ${({ theme }) => theme.glows.blue}); }

    &::before {
      content: '';
      position: absolute;
      left: 0; top: 18%; height: 64%; width: 3px;
      border-radius: 3px;
      background: ${({ theme }) => theme.gradients.primary};
    }
  }
`;

const LogoutButton = styled.button`
  ${navItemBase}
  color: ${({ theme }) => theme.colors.red};
  margin-top: 6px;
  cursor: pointer;

  &:hover { background: rgba(255,122,107,.08); }
`;

const Footer = styled.div`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 16px;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 6px 8px;
`;

const Avatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 11px;
  background: linear-gradient(135deg, rgba(58,160,255,.28), rgba(255,154,60,.22));
  border: 1px solid ${({ theme }) => theme.colors.border2};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.display};
  flex-shrink: 0;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.text3};
  margin-top: 1px;
`;

const CLIENT_NAV: NavItem[] = [
  { to: '/overview',  label: 'Visão geral',        icon: <IconOverview /> },
  { to: '/leads',     label: 'Leads',               icon: <IconLeads /> },
  { to: '/behavior',  label: 'Comportamento',       icon: <IconBehavior /> },
  { to: '/knowledge', label: 'Base de conhecimento', icon: <IconKnowledge /> },
];

const EQUIPE_NAV: NavItem[] = [
  { to: '/clients', label: 'Clientes', icon: <IconClients /> },
  ...CLIENT_NAV,
];

export function Sidebar() {
  const { user, activeRole, logout } = useAuthStore();
  const nav = activeRole === 'equipe' ? EQUIPE_NAV : CLIENT_NAV;

  return (
    <Aside>
      <Brand>
        <RevoLogo size={32} />
        <Wordmark>REVOSYS</Wordmark>
      </Brand>

      <NavCaption>Painel</NavCaption>

      <NavGroup>
        {nav.map(item => (
          <NavItem key={item.to} to={item.to}>
            {item.icon}
            {item.label}
          </NavItem>
        ))}
      </NavGroup>

      <Footer>
        <UserRow>
          <Avatar>{user?.initials ?? '??'}</Avatar>
          <div style={{ minWidth: 0 }}>
            <UserName>{user?.name}</UserName>
            <UserRole>{activeRole.toUpperCase()}</UserRole>
          </div>
        </UserRow>
        <LogoutButton onClick={logout}>
          <IconLogout />
          Sair
        </LogoutButton>
      </Footer>
    </Aside>
  );
}
