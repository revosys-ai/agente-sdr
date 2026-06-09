import { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { mockLogin } from '../../../mocks/auth.mock';

export function useLogin() {
  const { login } = useAuthStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 700));
    const result = mockLogin(email, password);
    if (result) {
      login(result.user, result.tokens);
    } else {
      setError('E-mail ou senha inválidos.');
    }
    setLoading(false);
    return !!result;
  };

  return { submit, error, loading };
}
