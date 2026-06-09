import styled from 'styled-components';
import { useAuthStore } from '../../store/authStore';
import { useAppStore, CLIENT_OPTIONS } from '../../store/appStore';
import { ThemeToggle } from '../ui/ThemeToggle';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 9;
  background: ${({ theme }) => theme.colors.headerBg};
  backdrop-filter: blur(14px);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const ClientSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 8px 13px;
  transition: border-color 0.16s;

  &:hover { border-color: ${({ theme }) => theme.colors.border2}; }
`;

const TenantSelect = styled.select`
  background: none;
  border: none;
  padding: 0;
  width: auto;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.display};
  outline: none;
  cursor: pointer;

  option { background: ${({ theme }) => theme.colors.bg2}; }
`;

const ActiveDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.green};
  box-shadow: 0 0 0 4px rgba(79,214,160,.16), 0 0 10px ${({ theme }) => theme.colors.green};
  flex-shrink: 0;
`;

const TenantId = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text3};
  font-size: 12px;
`;

const SegmentedControl = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 4px;
  gap: 3px;
`;

const SegButton = styled.button<{ $active: boolean }>`
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.gradients.primary : 'none'};
  color: ${({ $active, theme }) =>
    $active ? '#04121f' : theme.colors.text2};
  padding: 7px 16px;
  border-radius: ${({ theme }) => theme.radius.xs};
  font-size: 13px;
  font-weight: 600;
  transition: background 0.16s, color 0.16s;
  box-shadow: ${({ $active }) =>
    $active ? '0 4px 14px rgba(58,160,255,.32)' : 'none'};
`;

const RoleTag = styled.span<{ $role: 'cliente' | 'equipe' }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};

  ${({ $role, theme }) =>
    $role === 'cliente'
      ? `color: ${theme.colors.cyan}; background: rgba(58,160,255,.12);`
      : `color: ${theme.colors.gold}; background: rgba(255,154,60,.12);`}
`;

export function Topbar() {
  const { activeRole, setRole, user } = useAuthStore();
  const { activeTenantId, setTenant } = useAppStore();

  const isEquipe = activeRole === 'equipe';

  const handleRoleChange = (role: 'cliente' | 'equipe') => {
    if (user?.role === 'cliente' && role === 'equipe') return;
    setRole(role);
  };

  return (
    <Header>
      <Left>
        {isEquipe ? (
          <>
            <ClientSwitch>
              <ActiveDot />
              <TenantSelect value={activeTenantId} onChange={e => setTenant(e.target.value)}>
                {CLIENT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </TenantSelect>
            </ClientSwitch>
            <TenantId>{activeTenantId}</TenantId>
          </>
        ) : (
          <TenantId>{user?.tenantId ?? activeTenantId}</TenantId>
        )}
      </Left>

      <Right>
        {user?.role === 'equipe' && (
          <SegmentedControl>
            <SegButton $active={activeRole === 'cliente'} onClick={() => handleRoleChange('cliente')}>
              Cliente
            </SegButton>
            <SegButton $active={activeRole === 'equipe'} onClick={() => handleRoleChange('equipe')}>
              Equipe
            </SegButton>
          </SegmentedControl>
        )}
        <RoleTag $role={activeRole}>
          {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
        </RoleTag>
        <ThemeToggle />
      </Right>
    </Header>
  );
}
