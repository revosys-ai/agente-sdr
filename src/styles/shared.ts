import styled, { css } from 'styled-components';
import { rise } from './GlobalStyle';

export const Card = styled.div<{ $noPad?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.default};
  padding: ${({ $noPad }) => ($noPad ? '10px 14px 6px' : '22px')};
  backdrop-filter: blur(12px);
  transition: border-color 0.2s;

  &:hover { border-color: ${({ theme }) => theme.colors.border2}; }
`;

export const CardTitle = styled.h3`
  font-size: 15.5px;
  font-weight: 600;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardSub = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 400;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text3};
`;

export const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface2};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 10px 16px;
  font-weight: 500;
  font-size: 13.5px;
  transition: border-color 0.18s, background 0.18s, transform 0.18s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border2};
    background: rgba(255,255,255,.07);
    transform: translateY(-1px);
  }
`;

export const BtnPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => theme.gradients.primary};
  border: none;
  color: #04121f;
  padding: 13px 26px;
  font-weight: 700;
  font-size: 13.5px;
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

export const GridCols4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
`;

export const GridCols2 = styled.div`
  display: grid;
  grid-template-columns: 1.45fr 1fr;
  gap: 16px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

export const RiseCard = styled(Card)<{ $delay?: number }>`
  opacity: 0;
  animation: ${rise} 0.55s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
  animation-delay: ${({ $delay }) => $delay ?? 0}s;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const Field = styled.div`
  margin-bottom: 18px;
`;

export const FieldLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: 8px;
`;

export const inputBase = css`
  width: 100%;
  background: rgba(255,255,255,.04);
  border: 1px solid ${({ theme }) => theme.colors.border};
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
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const StyledInput = styled.input`${inputBase}`;
export const StyledTextarea = styled.textarea`${inputBase} resize: vertical; line-height: 1.6;`;
export const StyledSelect = styled.select`
  ${inputBase}
  option { background: ${({ theme }) => theme.colors.bg2}; }
`;

export const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font-size: 11.5px;
  margin-top: 5px;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

export const Mono = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
`;

export const Muted = styled.span`
  color: ${({ theme }) => theme.colors.text3};
  font-size: 12px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
`;

export const Th = styled.th`
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text3};
  font-weight: 400;
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0 14px 13px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Td = styled.td`
  padding: 14px;
  border-bottom: 1px solid rgba(255,255,255,.05);
`;

export const TBody = styled.tbody`
  tr { transition: background 0.14s; }
  tr:hover { background: rgba(255,255,255,.03); }
  tr:last-child td { border-bottom: none; }
`;

export const HealthBar = styled.div`
  height: 6px;
  border-radius: 4px;
  background: rgba(255,255,255,.07);
  overflow: hidden;
  width: 96px;
`;

export const HealthFill = styled.span<{ $pct: number }>`
  display: block;
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.blue}, ${({ theme }) => theme.colors.orange});
  border-radius: 4px;
  transition: width 0.9s cubic-bezier(0.2, 0.7, 0.3, 1);
`;
