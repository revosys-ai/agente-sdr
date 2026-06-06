import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import { float } from '../../styles/GlobalStyle';
import { useAuthStore } from '../../store/authStore';
import { mockLogin } from '../../mocks/auth.mock';
import { RevoLogo } from '../ui/RevoLogo';
import { Spinner } from '../ui/Spinner';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});
type FormData = z.infer<typeof schema>;

const Backdrop = styled.div`
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
      ? `width:560px;height:560px;background:radial-gradient(circle,${theme.glows.orange},transparent 66%);bottom:-230px;left:-150px;animation-delay:-7s;`
      : `width:540px;height:540px;background:radial-gradient(circle,${theme.glows.blue},transparent 65%);top:-190px;right:-130px;`}
`;

const GridBg = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
  background-size: 46px 46px;
  mask: radial-gradient(circle at 55% 28%, #000, transparent 80%);
`;

const Center = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  position: relative;
  width: 398px;
  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.018));
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 42px 38px;
  backdrop-filter: blur(20px);
  box-shadow: 0 34px 90px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.07);

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(58,160,255,.6), transparent 42%, transparent 58%, rgba(255,154,60,.55));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 30px;
`;

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  letter-spacing: 0.02em;
  font-size: 24px;
  color: #fff;
  display: block;
`;

const BrandSub = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.text3};
`;

const Field = styled.div`
  margin-bottom: 18px;
`;

const FieldLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: 8px;
`;

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  background: rgba(255,255,255,.04);
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.red : theme.colors.border)};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 12px 14px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.blue};
    background: rgba(58,160,255,.07);
    box-shadow: 0 0 0 4px rgba(58,160,255,.13);
  }
`;

const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font-size: 11.5px;
  margin-top: 5px;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background: ${({ theme }) => theme.gradients.primary};
  border: none;
  color: #04121f;
  padding: 13px;
  font-weight: 700;
  font-size: 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 8px 28px rgba(58,160,255,.34);
  transition: filter 0.18s, transform 0.18s, box-shadow 0.18s;

  &:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: translateY(-1px);
    box-shadow: 0 12px 36px rgba(58,160,255,.5);
  }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const AuthError = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: 13px;
  margin-bottom: 16px;
  font-family: ${({ theme }) => theme.fonts.mono};
  letter-spacing: 0.04em;
`;

const Hint = styled.p`
  text-align: center;
  margin-top: 18px;
  font-family: ${({ theme }) => theme.fonts.mono};
  letter-spacing: 0.06em;
  font-size: 10.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text3};
`;

const DemoBox = styled.div`
  margin-top: 20px;
  padding: 12px 16px;
  background: rgba(255,255,255,.03);
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const DemoLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: 8px;
`;

const DemoText = styled.p`
  color: ${({ theme }) => theme.colors.text3};
  font-size: 12px;
  line-height: 1.8;

  span { font-family: ${({ theme }) => theme.fonts.mono}; }
`;

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
      <Backdrop>
        <Blob />
        <Blob $warm />
        <GridBg />
      </Backdrop>
      <Center>
        <Card>
          <BrandRow>
            <RevoLogo size={40} />
            <div>
              <BrandName>REVOSYS</BrandName>
              <BrandSub>SDR CONSOLE</BrandSub>
            </div>
          </BrandRow>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Field>
              <FieldLabel>E-mail</FieldLabel>
              <Input
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                $error={!!errors.email}
                {...register('email')}
              />
              {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
            </Field>
            <Field>
              <FieldLabel>Senha</FieldLabel>
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                $error={!!errors.password}
                {...register('password')}
              />
              {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
            </Field>

            {error && <AuthError>{error}</AuthError>}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? <Spinner size={18} /> : 'Entrar →'}
            </SubmitButton>
          </form>

          <Hint>Acesso por nível · cliente · equipe</Hint>

          <DemoBox>
            <DemoLabel>Contas de demo</DemoLabel>
            <DemoText>
              equipe: <span>marina@revosys.io</span> · <span>revosys2024</span><br />
              cliente: <span>cliente@techsolve.com</span> · <span>techsolve123</span>
            </DemoText>
          </DemoBox>
        </Card>
      </Center>
    </>
  );
}
