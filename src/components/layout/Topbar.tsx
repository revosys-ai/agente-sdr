import { useAuthStore } from '../../store/authStore';
import { useAppStore, CLIENT_OPTIONS } from '../../store/appStore';

export function Topbar() {
  const { activeRole, setRole, user } = useAuthStore();
  const { activeTenantId, setTenant } = useAppStore();

  const isEquipe = activeRole === 'equipe';

  const handleRoleChange = (role: 'cliente' | 'equipe') => {
    if (user?.role === 'cliente' && role === 'equipe') return; // clientes não podem virar equipe
    setRole(role);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        {isEquipe && (
          <>
            <div className="client-switch">
              <span className="dot" />
              <select
                value={activeTenantId}
                onChange={e => setTenant(e.target.value)}
              >
                {CLIENT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <span className="mono muted">{activeTenantId}</span>
          </>
        )}
        {!isEquipe && (
          <span className="mono muted">{user?.tenantId ?? activeTenantId}</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {user?.role === 'equipe' && (
          <div className="seg">
            <button
              data-role="cliente"
              className={activeRole === 'cliente' ? 'on' : ''}
              onClick={() => handleRoleChange('cliente')}
            >
              Cliente
            </button>
            <button
              data-role="equipe"
              className={activeRole === 'equipe' ? 'on' : ''}
              onClick={() => handleRoleChange('equipe')}
            >
              Equipe
            </button>
          </div>
        )}
        <span className={`role-tag role-${activeRole}`}>
          {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
        </span>
      </div>
    </header>
  );
}
