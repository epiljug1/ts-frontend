import styled from "styled-components";

const ValidationErrorField = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: ${(props) => props.marginTop || -10}px;
`;

const ValidationError = (props) => {
  return (
    <ValidationErrorField marginTop={props.marginTop}>
      {props.children}
    </ValidationErrorField>
  );
};

export default ValidationError;
