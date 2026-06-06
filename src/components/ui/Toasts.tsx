import { useAppStore } from '../../store/appStore';

export function Toasts() {
  const { toasts, removeToast } = useAppStore();

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast ${t.type}`}
          onClick={() => removeToast(t.id)}
          style={{ cursor: 'pointer' }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
