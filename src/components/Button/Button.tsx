import styled from 'styled-components';

interface AdditionalButtonProps {
  bg?: string;
  color?: string;
}

export const Button = styled.button<AdditionalButtonProps>`
  cursor: pointer;
  outline: none;
  background-color: ${(props) => props.bg || '#5e81ac'};
  color: ${(props) => props.color || '#fff'};
  text-transform: capitalize;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 700;
  transition: .3s;
  border: solid 1.75px ${(props) => props.bg || '#5e81ac'};
  &: hover {
    color: ${(props) => props.bg || '#5e81ac'};
    background-color: transparent;
  }
`;
