import styled from 'styled-components';

export const ClientName = styled.b`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
`;

export const TenantCode = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text3};
  font-size: 12px;
`;
