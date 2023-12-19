import styled, { css, keyframes } from "styled-components";

// Spinner Animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Spinner
export const ButtonSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid black;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;
const Button = styled.button`
  border: 1px solid;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "15px"};
  font-size: 1.1rem;
  padding: 5px 15px;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
  &:focus {
    background: rgba(0, 0, 0, 0.7);
  }

  ${(props) =>
    props.loading &&
    css`
      cursor: not-allowed;
      opacity: 0.7;
      &:hover {
        scale: 1;
      }
    `}
`;

export default Button;
