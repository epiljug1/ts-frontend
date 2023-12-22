import styled from "styled-components";

const NumOfPosts = (props) => {
  return <NuberOfPosts>{props.children}</NuberOfPosts>;
};

const NuberOfPosts = styled.div`
  color: rgba(0, 0, 0, 0.9);
  width: fit-content;
  margin: 10px auto;
  font-size: 1.3rem;
  font-style: italic;
`;

export default NumOfPosts;
