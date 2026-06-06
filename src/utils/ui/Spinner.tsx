import styled from 'styled-components';
import { spin } from '../../styles/GlobalStyle';

const SpinSvg = styled.svg`
  animation: ${spin} 0.8s linear infinite;
`;

export function Spinner({ size = 20 }: { size?: number }) {
  return (
    <SpinSvg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#3aa0ff" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </SpinSvg>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
  opacity: 0.6;
`;

export function LoadingState() {
  return (
    <LoadingWrapper>
      <Spinner size={28} />
    </LoadingWrapper>
  );
}
