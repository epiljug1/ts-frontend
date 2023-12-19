import NavBar from "../components/NavBar";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext as authContext } from "../context/authContext";
import { useGetCities } from "../hooks/useGetCities";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { useCreatePost } from "../hooks/useCreatePost";
import Errors from "../components/Errors";
import { ButtonSpinner } from "../components/Button";

const CreateNewPost = (props) => {
  const { mutateAsync, isLoading } = useCreatePost();
  const context = useContext(authContext);
  const navigate = useNavigate();

  const [citySearch, setCitySearch] = useState("");
  const { data: citiesOptions, isLoading: isLoadingCities } =
    useGetCities(citySearch);

  const onCloseHandler = () => {
    navigate("/all-posts");
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await mutateAsync(data);
    navigate("/all-posts");
  };

  return (
    <>
      <NavBar />
      <MainWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title>
            {context.user.firstName} {context.user.lastName}
          </Title>
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <Select
                // {...field}
                cacheOptions
                placeholder={"Search by city..."}
                options={citiesOptions}
                isLoading={isLoadingCities}
                defaultOptions
                isClearable
                onInputChange={(newVal) => setCitySearch(newVal)}
                onChange={(val) => {
                  console.log("VAL: ", val);
                  field.onChange(val?.value);
                }}
              />
            )}
          />
          {errors.city && <Errors>{errors.city.message}</Errors>}

          <Input
            {...register("content", { required: "Content is required" })}
            placeholder="Enter content"
          />
          {errors.content && <Errors>{errors.content.message}</Errors>}
          <NewWrapper>
            {/* {postAdded && <PostAdded color="#418a21"> {postAdded}</PostAdded>}
            {errorss &&
              errorss.map((error) => (
                <PostAdded color="#ed1a2f">{error.message}</PostAdded>
              ))}
            {!postAdded && !errorss.length && <br />} */}
            <ButtonWrapper>
              <Button onClick={onCloseHandler}>Close</Button>
              <Button type="submit">
                {isLoading ? <ButtonSpinner /> : "Post"}
              </Button>
            </ButtonWrapper>
          </NewWrapper>
        </form>
      </MainWrapper>
    </>
  );
};

const NewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 1100px) {
    justify-content: center;
    gap: 10px;
  }
`;

const PostAdded = styled.div`
  text-align: center;
  color: ${(props) => props.color};
  border: 2px solid;
  font-size: 1.1rem;
  border-radius: 10px;
  margin: 5px;

  padding: 5px;
  width: fit-content;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 15px;
  @media (max-width: 500px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 10px;
  width: 140px;
  height: 35px;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    font-weight: bold;
  }
`;

const Input = styled.textarea`
  // min-width: 800px;
  // max-width: 100%;
  min-height: 170px;
  height: 100%;
  width: 97%;

  box-shadow: 0px 2px 16px hsl(260deg 10% 10% / 0.5);
  border-radius: 10px;
  border-color: transparent;

  /* margin: 30px 0px; */
  margin-top: 20px;

  font-size: 1.125rem;

  resize: none;

  padding: 10px;

  align-self: center;

  @media (max-width: 750px) {
    min-height: 100px;
  }
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 1.4rem;
  color: black;
  margin-bottom: 10px;
`;

const MainWrapper = styled.div`
  overflow: scroll;

  width: 50%;
  height: 40%;

  position: relative;
  display: flex;
  flex-direction: column;

  margin: 150px 20px 1000px;
  //   margin: auto;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 100px;

  padding: 30px 40px 10px;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;

  background: #d9cece;

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  @media (max-width: 1100px) {
    align-items: center !important;
  }
`;

export default CreateNewPost;
