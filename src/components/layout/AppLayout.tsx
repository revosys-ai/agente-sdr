import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Toasts } from '../ui/Toasts';

export function AppLayout() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <div className="fx">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="grid-bg" />
      </div>
      <div id="app" style={{ display: 'grid', gridTemplateColumns: '248px 1fr', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
      <Toasts />
    </>
  );
}
