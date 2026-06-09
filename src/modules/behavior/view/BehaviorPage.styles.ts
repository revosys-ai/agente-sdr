import styled from 'styled-components';

export const EditLock = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.orange};
  display: inline-flex;
  align-items: center;
  gap: 7px;
`;

export const SaveBar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 20px;
`;

export const SaveMeta = styled.span`
  color: ${({ theme }) => theme.colors.text3};
  font-size: 12px;
`;

export const PreviewBox = styled.div`
  background: rgba(58,160,255,.05);
  border: 1px solid rgba(58,160,255,.2);
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.65;
  margin-top: 14px;
`;

export const CardsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
