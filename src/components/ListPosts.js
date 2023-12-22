import Post from "../components/Post";
import styled from "styled-components";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import NumOfPosts from "../components/NumOfPosts";
import { useGetCities } from "../hooks/useGetCities";
import Select from "react-select";
import { useAuthContext } from "../hooks/useAuthContext";
import { ButtonSpinner } from "./Button";

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
};

const ListPosts = (props) => {
  const context = useAuthContext();
  const { fetchPosts, pendingPosts } = props;
  const [search, setSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [city, setCity] = useState("");
  const {
    data: allPosts,
    isLoading,
    isFetching: isFetchingPosts,
  } = fetchPosts({
    search,
    city,
  });
  const { data: citiesOptions, isLoading: isLoadingCities } =
    useGetCities(citySearch);

  const onSearchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <FilterWrapper>
        <SearchFilter>
          <Input type="text" placeholder="Search" onChange={onSearchHandler} />
        </SearchFilter>
        <Select
          cacheOptions
          placeholder={"Search by city..."}
          options={citiesOptions}
          isLoading={isLoadingCities}
          defaultOptions
          styles={customStyles}
          onInputChange={(newVal) => setCitySearch(newVal)}
          onChange={(val) => (val ? setCity(val.value) : setCity(""))}
          isClearable
        />
      </FilterWrapper>
      {isLoading && <Spinner />}
      <MainWrapper>
        {!context?.user && <NumOfPosts>{props.placeholder}</NumOfPosts>}
        {!isLoading && allPosts && context?.user && (
          <NumOfPosts>
            Number of posts:
            {isFetchingPosts ? (
              <ButtonSpinner />
            ) : (
              <strong>{allPosts?.length}</strong>
            )}
          </NumOfPosts>
        )}
        {allPosts?.map((post) => (
          <Post
            {...post}
            key={post.id || post._id}
            id={post.id || post._id}
            name={post.user.firstName}
            surname={post.user.lastName}
            description={post.content}
            date={post.createdAt}
            city={post.city}
            likes={post.likes}
            comments={post.comments.length}
            isUpdated={post.createdAt !== post.updatedAt}
            pendingPosts={pendingPosts}
            onVerify={props.onVerify}
            onRemove={props.onRemove}
            delete={post?.user?._id === context?.user?.id}
          />
        ))}
        {!isLoading && !allPosts.length && (
          <NoPosts>
            {props.placeholder ? (
              <i>{props.placeholder}</i>
            ) : (
              <>
                Today there is no posts to display.
                <strong>Create your own ones!</strong>
              </>
            )}
          </NoPosts>
        )}
      </MainWrapper>
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
  align-items: center;
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

export default ListPosts;
