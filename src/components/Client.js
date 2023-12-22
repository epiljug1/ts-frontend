import styled from "styled-components";
import Image from "../images/user.png";
import Button, { ButtonSpinner } from "./Button";
import { useRemoveUser } from "../hooks/useRemoveUser";
import { useAuthContext } from "../hooks/useAuthContext";

const Client = (props) => {
  const user = useAuthContext().user;
  const { mutateAsync, isLoading } = useRemoveUser();

  const onRemoveUser = async () => {
    await mutateAsync(props.id);
  };
  return (
    <Wrapper>
      <Title>
        <img
          src={Image}
          style={{ width: "50px", borderRadius: "50%" }}
          alt="Avatar"
        />
        {props.name + " " + props.surname}
      </Title>
      <div>
        Email: <strong>{props.email}</strong>
      </div>
      {user?.role === "Admin" && (
        <ButtonWrapper>
          <Button onClick={onRemoveUser}>
            {isLoading ? <ButtonSpinner /> : "Remove Account"}
          </Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Wrapper = styled.div`
  width: 220px;
  height: 200px;

  background: rgb(139, 134, 221);
  background: linear-gradient(
    180deg,
    rgba(139, 134, 221, 1) 0%,
    rgba(206, 150, 241, 1) 35%
  );

  border-radius: 20px;

  padding: 10px 40px;
  margin: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  color: rgba(0, 0, 0);

  display: flex;
  align-items: center;
  gap: 2%;
`;

export default Client;
