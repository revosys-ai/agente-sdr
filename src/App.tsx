import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { LoginPage } from './utils/auth/LoginPage';
import { AppLayout } from './utils/layout/AppLayout';
import { OverviewPage } from './pages/OverviewPage';
import { LeadsPage } from './pages/LeadsPage';
import { BehaviorPage } from './pages/BehaviorPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { ClientsPage } from './pages/ClientsPage';
import { useAuthStore } from './store/authStore';

const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});

function EquipeGuard({ children }: { children: React.ReactNode }) {
  const { activeRole } = useAuthStore();
  if (activeRole !== 'equipe') return <Navigate to="/overview" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={qc}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/behavior" element={<BehaviorPage />} />
              <Route path="/knowledge" element={<KnowledgePage />} />
              <Route path="/clients" element={<EquipeGuard><ClientsPage /></EquipeGuard>} />
              <Route path="*" element={<Navigate to="/overview" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
