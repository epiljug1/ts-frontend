import NavBar from "../components/NavBar";
import styled from "styled-components";
import Client from "../components/Client";
import Spinner from "../components/Spinner";
import { useAllUsers } from "../hooks/useAllUsers";
import { useAuth } from "../hooks/useAuth";

const ListAllClients = () => {
  const { isAuthenticated: isAuth } = useAuth();
  const { data: allUsers, isLoading: loadingAllUsers } = useAllUsers();
  return (
    <>
      <NavBar />
      {loadingAllUsers && <Spinner />}
      <MainWrapper>
        {!isAuth && <Title>Users with the most posts</Title>}
        {allUsers?.map((client) => (
          <Client
            key={client.email}
            name={client.firstName}
            surname={client.lastName}
            email={client.email}
            id={client._id}
          />
        ))}
      </MainWrapper>
    </>
  );
};

const Title = styled.div`
  color: rgba(0, 0, 0, 0.9);
  position: absolute;
  top: -5px;
  font-style: italic;
  width: fit-content;
  margin: 10px auto;
  font-weight: 400;
  font-size: 1.3rem;
`;

const MainWrapper = styled.div`
  overflow: scroll;

  min-width: 80vw;
  min-height: 80vh;

  margin: 6% 5%;
  padding: 20px 14px;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;

  position: relative;

  background: #d9cece;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  @media (max-width: 700px) {
    margin: 13% 5%;
  }
`;

export default ListAllClients;
