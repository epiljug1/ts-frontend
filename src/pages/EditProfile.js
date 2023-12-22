import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import NewModal from "../components/Modal";
import Button from "../components/Button";
import { useAuthContext } from "../hooks/useAuthContext";
import ValidationError from "../components/ValidationError";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { currentUser } from "../service/user.service";

const EditProfile = (props) => {
  const context = useAuthContext();
  const { modalIsOpen, setIsOpen } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: context.user?.firstName,
      lastName: context.user?.lastName,
      email: context.user?.email,
      password: "",
    },
    mode: "onChange",
  });

  const { mutateAsync } = useUpdateUser();

  const onSubmit = async (data) => {
    if (context.user.id) {
      await mutateAsync({
        id: context.user.id,
        ...data,
        password: data.password ? data.password : undefined,
      });
      const { data: userData } = await currentUser();
      context.login(userData);
      setIsOpen(false);
    }
  };

  return (
    <NewModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Title>Edit Profile</Title>

        <ItemWrapper>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <ValidationError marginTop={1}>
              {errors.firstName.message}
            </ValidationError>
          )}
        </ItemWrapper>

        <ItemWrapper>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <ValidationError marginTop={1}>
              {errors.lastName.message}
            </ValidationError>
          )}
        </ItemWrapper>

        <ItemWrapper>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            {...register("password", {
              validate: (value) => {
                if (value === "") {
                  return true;
                }
                if (value.length < 8) {
                  return "Password must be at least 8 characters long";
                }
                return true;
              },
            })}
          />
          {errors.password && (
            <ValidationError marginTop={1}>
              {errors.password.message}
            </ValidationError>
          )}
        </ItemWrapper>

        <ItemWrapper>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" disabled {...register("email")} />
          {/* Assuming email is set elsewhere since it's disabled */}
        </ItemWrapper>

        <ButtonWrapper type="submit">Submit</ButtonWrapper>
      </FormWrapper>
    </NewModal>
  );
};

const Label = styled.label`
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.8);
`;

const ButtonWrapper = styled(Button)`
  margin-top: 20px;
`;

const FormWrapper = styled.form`
  width: 50%;
  height: auto;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 20px;
  text-align: center;
  padding: 60px 100px;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.99);
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  margin-bottom: 25px;
`;

const Input = styled.input`
  border: 1px solid;
  border-radius: 15px;
  line-height: 1.15;
  font-size: 1.1rem;
  padding: 5px 15px;
  border-color: 1px solid #c6d2d9;
  font-family: inherit;

  // width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const NewWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
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

// const Button = styled.button`
//   font-size: 1.1rem;
//   border-radius: 10px;
//   width: 140px;
//   height: 35px;

//   &:hover {
//     background: rgba(0, 0, 0, 0.4);
//     font-weight: bold;
//   }
// `;

const Title = styled.div`
  font-weight: 700;
  font-size: 2rem;
  color: black;
  margin-bottom: 20px;
`;

const MainWrapper = styled.div`
  overflow: scroll;

  width: 75%;

  display: flex;
  flex-direction: column;
  margin: 0 auto;

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

export default EditProfile;
