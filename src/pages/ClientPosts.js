import Post from "../components/Post";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Image from "../images/create.png";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import NumOfPosts from "../components/NumOfPosts";
import { useAllPosts } from "../hooks/useAllPosts";
import { useGetCities } from "../hooks/useGetCities";
import Select from "react-select";
import { useUserPost } from "../hooks/useUserPosts";
import ListPosts from "../components/ListPosts";

const customStyles = {
  control: (provided) => ({
    ...provided,
    cursor: "pointer",
    fontSize: "1.125rem",
    padding: "2px",
    margin: "10px",
    background: "#e8d9d8",
    opacity: 0.4,
    border: "1px solid white",
    borderRadius: "3px",
    color: "rgba(0, 0, 0, 0.6)",
    boxShadow: "none",
    width: "350px",
    "&:hover": {
      border: "1px solid white",
    },
  }),
  menu: (provided) => ({
    ...provided,
    margin: "10px",
    borderRadius: "3px",
  }),
  // You can add more custom styles for other parts like menuList, option, etc.
};

const ClientPosts = (props) => {
  const [search, setSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const { data: allPosts, isLoading } = useUserPost();
  const { data: citiesOptions, isLoading: isLoadingCities } =
    useGetCities(citySearch);

  const onSearchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <NavBar />
      <ListPosts fetchPosts={useUserPost} />
    </>
  );
};

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* z-index: 999; */

  margin: 60px 1px 20px;
  width: 80%;
`;

const NoPosts = styled.div`
  text-align: center;
  color: black;
  font-size: 1.2rem;
  margin: 10px;
`;

const SearchFilter = styled.div`
  display: flex;
`;

const Input = styled.input`
  font-size: 1.125rem;
  padding: 10px;
  margin: 10px;
  background: #e8d9d8;
  opacity: 0.4;
  border: 1px solid white;
  border-radius: 3px;

  ::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const MainWrapper = styled.div`
  position: realtive;

  overflow: scroll;

  width: 80vw;
  height: 90%;

  margin: 0px 0px 5%;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;

  background: #d9cece;

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

export default ClientPosts;
