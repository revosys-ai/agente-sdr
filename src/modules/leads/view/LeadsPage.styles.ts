import styled from 'styled-components';
import { Mono } from '../../../styles/shared';

export const BantCell = styled(Mono)`
  color: ${({ theme }) => theme.colors.text3};
`;

export const ScoreValue = styled.b`
  font-family: ${({ theme }) => theme.fonts.display};
`;

export const EmptyRow = styled.td`
  text-align: center;
  padding: 32px !important;
  color: ${({ theme }) => theme.colors.text3};
`;
