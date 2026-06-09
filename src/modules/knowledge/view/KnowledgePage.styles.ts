import styled from 'styled-components';

export const KbItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.rowBorder};

  &:last-of-type { border: none; }
`;

export const KbLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

export const KbIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(58,160,255,.12);
  border: 1px solid rgba(58,160,255,.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.cyan};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  flex-shrink: 0;
`;

export const KbName = styled.div`
  font-weight: 600;
`;

export const KbMeta = styled.div`
  color: ${({ theme }) => theme.colors.text3};
  font-size: 12px;
`;

export const UploadZone = styled.div<{ $dragging?: boolean }>`
  border: 1.5px dashed ${({ theme, $dragging }) =>
    $dragging ? theme.colors.blue : theme.colors.border2};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text3};
  font-size: 13px;
  margin-top: 16px;
  cursor: pointer;
  transition: border-color 0.16s, color 0.16s, background 0.16s;
  background: ${({ $dragging }) =>
    $dragging ? 'rgba(58,160,255,.05)' : 'transparent'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.text2};
    background: rgba(255,154,60,.05);
  }
`;
