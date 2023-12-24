import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import EditProfile from "../pages/EditProfile";
import { useState } from "react";

const NavBar = (props) => {
  const user = useAuthContext().user;
  const location = useLocation();
  const logout = useLogout();

  const onSignOutHandler = async () => {
    await logout.mutateAsync();
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <NavWrapper>
      <span>
        <LinkStyle to="/all-posts">All Posts</LinkStyle>
        <LinkStyle to="/popular-posts">Popular Posts</LinkStyle>
        {user?.role === "Admin" && (
          <LinkStyle to="/pending-posts">Pending Posts</LinkStyle>
        )}
        {user && user?.role !== "Admin" && (
          <LinkStyle to="/personal-posts">Your Posts</LinkStyle>
        )}
        {user && user?.role !== "Admin" && (
          <LinkStyle state={{ from: location.pathname }} to="/create-new-post">
            Create Post
          </LinkStyle>
        )}
        <LinkStyle to="/users-list">Users</LinkStyle>
      </span>
      <NavPart>
        {user && (
          <LinkStyle to="/signin" onClick={onSignOutHandler}>
            Logout
          </LinkStyle>
        )}
        {user && (
          <Button onClick={() => setIsOpen(true)}>
            {`${user.firstName} ${user.lastName}`}
          </Button>
        )}
        {!user && <LinkStyle to="/signup">Sign up</LinkStyle>}
        {!user && <LinkStyle to="/signin">Sign in</LinkStyle>}
      </NavPart>
      <EditProfile
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        firstName={user?.firstName}
        lastName={user?.lastName}
        email={user?.email}
        id={user?.id}
        currentUser
      />
    </NavWrapper>
  );
};

const NavPart = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  border-radius: 10px;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 5px;
  margin: 0px 20px;
  font-size: 1.25rem;

  &:hover {
    color: #b392ee;
    scale: 1.1;
    // font-weight: bold;
  }
  &:focus {
    /* text-decoration: underline; */
    border: 2px solid black;
    border-radius: 10px;
    font-weight: bold;
  }
`;

const LinkStyle = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  padding: 10px 5px;
  margin: 0px 20px;
  font-size: 1.25rem;

  &:hover {
    color: #b392ee;
    scale: 1.1;
    // font-weight: bold;
  }
  &:focus {
    /* text-decoration: underline; */
    border: 2px solid black;
    border-radius: 10px;
    font-weight: bold;
  }
`;

const NavWrapper = styled.div`
  background: #343a40;
  padding: 2px 12px;
  color: #ffffff;
  width: 100%;
  position: fixed;
  z-index: 2;
  height: 3.5rem;
  box-shadow: 0 7px 12px 0 rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default NavBar;
