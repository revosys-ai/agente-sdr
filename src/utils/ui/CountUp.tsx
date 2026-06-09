import { useCountUp } from '../../modules/shared/hooks/useCountUp';

interface Props {
  to: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ to, suffix = '', duration = 900 }: Props) {
  const value = useCountUp(to, duration);
  return <>{value}{suffix}</>;
}
