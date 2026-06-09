import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { useThemeStore } from './store/themeStore';
import { GlobalStyle } from './styles/GlobalStyle';
import { LoginPage } from './modules/auth/view/LoginPage';
import { AppLayout } from './utils/layout/AppLayout';
import { OverviewPage } from './modules/overview/view/OverviewPage';
import { LeadsPage } from './modules/leads/view/LeadsPage';
import { BehaviorPage } from './modules/behavior/view/BehaviorPage';
import { KnowledgePage } from './modules/knowledge/view/KnowledgePage';
import { ClientsPage } from './modules/clients/view/ClientsPage';
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
  const mode = useThemeStore(s => s.mode);
  const theme = mode === 'dark' ? darkTheme : lightTheme;

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
