import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../store/authStore';
import { mockLogin } from '../../mocks/auth.mock';
import { RevoLogo } from '../ui/RevoLogo';
import { Spinner } from '../ui/Spinner';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});
type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const { login, isAuthenticated } = useAuthStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (isAuthenticated) return <Navigate to="/overview" replace />;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 700));
    const result = mockLogin(data.email, data.password);
    if (result) {
      login(result.user, result.tokens);
    } else {
      setError('E-mail ou senha inválidos.');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="fx">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="grid-bg" />
      </div>
      <div id="login" style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="login-card">
          <div className="brand">
            <RevoLogo size={40} />
            <div>
              <span className="wordmark" style={{ fontSize: 24, color: '#fff', display: 'block' }}>REVOSYS</span>
              <span className="eyebrow">SDR CONSOLE</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="field">
              <label>E-mail</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                className={errors.email ? 'input-error' : ''}
                {...register('email')}
              />
              {errors.email && <p className="error-msg">{errors.email.message}</p>}
            </div>
            <div className="field">
              <label>Senha</label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className={errors.password ? 'input-error' : ''}
                {...register('password')}
              />
              {errors.password && <p className="error-msg">{errors.password.message}</p>}
            </div>

            {error && (
              <div style={{ color: 'var(--red)', fontSize: 13, marginBottom: 16, fontFamily: 'JetBrains Mono', letterSpacing: '.04em' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? <Spinner size={18} /> : 'Entrar →'}
            </button>
          </form>

          <p className="muted" style={{ textAlign: 'center', marginTop: 18, fontFamily: 'JetBrains Mono', letterSpacing: '.06em', fontSize: '10.5px', textTransform: 'uppercase' }}>
            Acesso por nível · cliente · equipe
          </p>

          <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(255,255,255,.03)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <p className="eyebrow" style={{ marginBottom: 8 }}>Contas de demo</p>
            <p className="muted" style={{ lineHeight: 1.8 }}>
              equipe: <span className="mono">marina@revosys.io</span> · <span className="mono">revosys2024</span><br />
              cliente: <span className="mono">cliente@techsolve.com</span> · <span className="mono">techsolve123</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
