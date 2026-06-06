import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { RevoLogo } from '../ui/RevoLogo';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

function IconOverview() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M3 13h8V3H3zM13 21h8V3h-8zM3 21h8v-6H3z" />
    </svg>
  );
}
function IconLeads() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
    </svg>
  );
}
function IconBehavior() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9z" />
    </svg>
  );
}
function IconKnowledge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}
function IconClients() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

const CLIENT_NAV: NavItem[] = [
  { to: '/overview', label: 'Visão geral', icon: <IconOverview /> },
  { to: '/leads', label: 'Leads', icon: <IconLeads /> },
  { to: '/behavior', label: 'Comportamento', icon: <IconBehavior /> },
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
    <aside className="sidebar">
      <div className="side-brand">
        <RevoLogo size={32} />
        <span className="wordmark" style={{ fontSize: 18, color: '#fff' }}>REVOSYS</span>
      </div>

      <div className="nav-cap eyebrow">Painel</div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {nav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="side-foot">
        <div className="user-row">
          <div className="avatar">{user?.initials ?? '??'}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name}
            </div>
            <div className="eyebrow" style={{ marginTop: 1 }}>{activeRole.toUpperCase()}</div>
          </div>
        </div>
        <button
          className="nav-item"
          style={{ marginTop: 6, color: 'var(--red)', width: '100%' }}
          onClick={logout}
        >
          <IconLogout />
          Sair
        </button>
      </div>
    </aside>
  );
}
