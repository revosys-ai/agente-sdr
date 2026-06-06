import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 13px 16px;
  color: ${({ theme }) => theme.colors.text2};
  font-size: 13px;
  margin-bottom: 22px;
`;

const IconWrap = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
  flex-shrink: 0;
  display: flex;
`;

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="17" height="17">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

interface Props {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Banner({ children, icon }: Props) {
  return (
    <Wrapper>
      <IconWrap>{icon ?? <InfoIcon />}</IconWrap>
      {children}
    </Wrapper>
  );
}
