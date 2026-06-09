import styled from 'styled-components';
import { Outlet, Navigate } from 'react-router-dom';
import { float } from '../../styles/GlobalStyle';
import { useAuthStore } from '../../store/authStore';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Toasts } from '../ui/Toasts';

const Fx = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Blob = styled.div<{ $warm?: boolean }>`
  position: absolute;
  border-radius: 50%;
  filter: blur(95px);
  opacity: 0.5;
  animation: ${float} 20s ease-in-out infinite;

  ${({ $warm, theme }) =>
    $warm
      ? `
    width: 560px; height: 560px;
    background: radial-gradient(circle, ${theme.glows.orange}, transparent 66%);
    bottom: -230px; left: -150px;
    animation-delay: -7s;
  `
      : `
    width: 540px; height: 540px;
    background: radial-gradient(circle, ${theme.glows.blue}, transparent 65%);
    top: -190px; right: -130px;
  `}
`;

const GridBg = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.gridLine} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.gridLine} 1px, transparent 1px);
  background-size: 46px 46px;
  mask: radial-gradient(circle at 55% 28%, #000, transparent 80%);
`;

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: 248px 1fr;
  min-height: 100vh;
  position: relative;
  z-index: 1;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Content = styled.div`
  padding: 30px 32px 70px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 900px) {
    padding: 20px 16px 60px;
  }
`;

export function AppLayout() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <Fx>
        <Blob />
        <Blob $warm />
        <GridBg />
      </Fx>
      <AppGrid>
        <Sidebar />
        <Main>
          <Topbar />
          <Content>
            <Outlet />
          </Content>
        </Main>
      </AppGrid>
      <Toasts />
    </>
  );
}
