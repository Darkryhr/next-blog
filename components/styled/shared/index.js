import styled from 'styled-components';

export const LinkButton = styled.button`
  color: ${(props) => props.theme.colors.text.base};
  background: none;
  border: none;
  cursor: pointer;
  min-width: 28px;
  transition: 0.3s all;

  &:focus {
    outline: none;
  }
  &:hover {
    filter: opacity(0.7);
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.base};
  cursor: pointer;
  padding: 1.5em 2em;
  transition: 0.3s all;
  font-size: medium;
  &:hover {
    background: ${({ theme }) => theme.colors.primary.base};
  }
`;

export const HeartBtn = styled.button`
  border-radius: 50px;
  font-weight: 600;
  font-size: medium;
  border: none;
  background: rgb(251, 109, 151);
  background: linear-gradient(
    42deg,
    rgba(251, 109, 151, 1) 0%,
    rgba(224, 24, 61, 1) 100%
  );
  margin: 2em 0;
  padding: 10px 30px;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    filter: saturate(1.5);
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  letter-spacing: 0.01em;
  font-size: 1.7em;
  margin: 12px 0;
  cursor: pointer;
`;

export const Subtitle = styled.h2`
  font-size: 1.1em;
  opacity: 0.8;
`;

export const Info = styled.h3`
  opacity: 0.6;
  font-weight: 300;
  font-size: 0.9em;
`;
