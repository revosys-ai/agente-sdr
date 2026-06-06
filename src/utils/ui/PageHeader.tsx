import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 26px;
  flex-wrap: wrap;
`;

const Left = styled.div``;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: 2px;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;
  margin-top: 8px;
`;

interface Props {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, action }: Props) {
  return (
    <Wrapper>
      <Left>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title>{title}</Title>
      </Left>
      {action}
    </Wrapper>
  );
}
