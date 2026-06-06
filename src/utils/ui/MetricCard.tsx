import styled, { css } from 'styled-components';
import { rise } from '../../styles/GlobalStyle';
import { useCountUp } from '../../hooks/useCountUp';

const Card = styled.div<{ $featured?: boolean; $delay?: number }>`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.default};
  padding: 22px;
  backdrop-filter: blur(12px);
  overflow: hidden;
  opacity: 0;
  animation: ${rise} 0.55s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
  animation-delay: ${({ $delay }) => $delay ?? 0}s;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border2};
  }

  ${({ $featured, theme }) =>
    $featured &&
    css`
      background: linear-gradient(
        150deg,
        rgba(255,154,60,.16),
        rgba(255,194,77,.05) 60%,
        transparent
      );
      &::after {
        content: '';
        position: absolute;
        top: -40px;
        right: -40px;
        width: 120px;
        height: 120px;
        background: radial-gradient(circle, ${theme.glows.orange}, transparent 70%);
        opacity: 0.5;
      }
    `}
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.text3};
`;

const Value = styled.div<{ $featured?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 33px;
  font-weight: 700;
  margin-top: 10px;
  letter-spacing: -0.03em;

  ${({ $featured }) =>
    $featured &&
    css`
      background: linear-gradient(135deg, #ff9330 0%, #ffc24d 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
`;

const Delta = styled.p<{ $down?: boolean }>`
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
  color: ${({ theme, $down }) => ($down ? theme.colors.orange : theme.colors.green)};
`;

const Spark = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 26px;
  margin-top: 12px;
`;

const SparkBar = styled.div<{ $h: number }>`
  flex: 1;
  height: ${({ $h }) => $h}%;
  background: linear-gradient(180deg, #6fd2ff, rgba(58,160,255,.25));
  border-radius: 2px;
  opacity: 0.9;
`;

const SPARK_HEIGHTS = [40, 55, 48, 70, 62, 85];

interface Props {
  label: string;
  value: number;
  suffix?: string;
  delta?: string;
  deltaDown?: boolean;
  featured?: boolean;
  spark?: boolean;
  delay?: number;
}

export function MetricCard({ label, value, suffix = '', delta, deltaDown, featured, spark, delay }: Props) {
  const count = useCountUp(value);

  return (
    <Card $featured={featured} $delay={delay}>
      <Label>{label}</Label>
      <Value $featured={featured}>{count}{suffix}</Value>
      {delta && <Delta $down={deltaDown}>{delta}</Delta>}
      {spark && (
        <Spark>
          {SPARK_HEIGHTS.map((h, i) => <SparkBar key={i} $h={h} />)}
        </Spark>
      )}
    </Card>
  );
}
