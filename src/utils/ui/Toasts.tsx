import styled from 'styled-components';
import { rise } from '../../styles/GlobalStyle';
import { useAppStore } from '../../store/appStore';

type ToastType = 'success' | 'error' | 'info';

const Container = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastItem = styled.div<{ $type: ToastType }>`
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border2};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 14px 18px;
  font-size: 13.5px;
  backdrop-filter: blur(12px);
  animation: ${rise} 0.3s ease;
  max-width: 320px;
  cursor: pointer;

  ${({ $type, theme }) =>
    $type === 'success' && `border-color: rgba(79,214,160,.4); color: ${theme.colors.green};`}
  ${({ $type, theme }) =>
    $type === 'error' && `border-color: rgba(255,122,107,.4); color: ${theme.colors.red};`}
`;

export function Toasts() {
  const { toasts, removeToast } = useAppStore();

  return (
    <Container>
      {toasts.map(t => (
        <ToastItem key={t.id} $type={t.type} onClick={() => removeToast(t.id)}>
          {t.message}
        </ToastItem>
      ))}
    </Container>
  );
}
