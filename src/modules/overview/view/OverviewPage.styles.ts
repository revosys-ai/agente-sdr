import styled from 'styled-components';
import { GridCols2, RiseCard } from '../../../styles/shared';

export const FunnelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
`;

export const FunnelName = styled.span`
  width: 130px;
  color: ${({ theme }) => theme.colors.text2};
  font-size: 13px;
  flex-shrink: 0;
`;

const barBase = `
  height: 32px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  padding-left: 13px;
  font-family: 'Sora', sans-serif;
  font-size: 13px;
  font-weight: 600;
  min-width: 78px;
  transition: width 0.9s cubic-bezier(0.2, 0.7, 0.3, 1);
`;

export const Bar1 = styled.div<{ $w: number }>`
  ${barBase}
  width: ${({ $w }) => $w}%;
  background: ${({ theme }) => theme.gradients.primary};
  color: #04121f;
  box-shadow: 0 4px 18px rgba(58,160,255,.32);
`;

export const Bar2 = styled.div<{ $w: number }>`
  ${barBase}
  width: ${({ $w }) => $w}%;
  background: rgba(58,160,255,.16);
  color: ${({ theme }) => theme.colors.cyan};
  border: 1px solid rgba(58,160,255,.32);
`;

export const Bar3 = styled.div<{ $w: number }>`
  ${barBase}
  width: ${({ $w }) => $w}%;
  background: rgba(58,160,255,.22);
  color: ${({ theme }) => theme.colors.cyan};
  border: 1px solid rgba(111,210,255,.3);
`;

export const Bar4 = styled.div<{ $w: number }>`
  ${barBase}
  width: ${({ $w }) => Math.max($w, 12)}%;
  background: ${({ theme }) => theme.gradients.warm};
  color: #2a1500;
  box-shadow: 0 4px 18px rgba(255,154,60,.34);
`;

export const BehaviorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InfoLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: 4px;
`;

export const InfoText = styled.div<{ $muted?: boolean }>`
  font-size: 13px;
  color: ${({ theme, $muted }) => ($muted ? theme.colors.text2 : theme.colors.text)};
`;

export const BehaviorGrid = styled(GridCols2)`
  margin-top: 0;
`;

export const BehaviorCard = styled(RiseCard)``;
