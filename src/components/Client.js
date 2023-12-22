import styled from "styled-components";
import Image from "../images/user.png";
import Button, { ButtonSpinner } from "./Button";
import { useRemoveUser } from "../hooks/useRemoveUser";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import EditProfile from "../pages/EditProfile";

const Client = (props) => {
  const user = useAuthContext().user;
  const { mutateAsync, isLoading } = useRemoveUser();

  const [modalIsOpen, setIsOpen] = useState(false);

  const onRemoveUser = async () => {
    await mutateAsync(props.id);
  };

  const onEditUser = () => setIsOpen(true);

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
            {isLoading ? <ButtonSpinner /> : "Delete"}
          </Button>
          <Button onClick={onEditUser}>Edit</Button>
        </ButtonWrapper>
      )}
      <EditProfile
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        firstName={props?.name}
        lastName={props?.surname}
        email={props?.email}
        id={props?.id}
        currentUser
      />
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
