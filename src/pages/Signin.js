import React, { useContext, useState } from "react";
import { AuthContext as authContext } from "../context/authContext";
import styled from "styled-components";
import Button, { ButtonSpinner } from "../components/Button";
import Title from "../components/Title";

import Image from "../images/logo2.jpg";

import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import {
  validatePassword,
  validateInput,
  validateEmail,
} from "../utils/validateData";
import ValidationError from "../components/ValidationError";
import Errors from "../components/Errors";
import { useLogin } from "../hooks/useLogin";

const SignIn = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(authContext);
  const [error, setError] = useState("");
  const { mutateAsync, isLoading } = useLogin({
    onError: (error) => {
      // Assuming error contains a message, adjust as needed
      // console.log("error:error", error.response.data.message);
      setError(
        error.response.data.message || "An error occurred during login."
      );
    },
  });

  const username = useRef(null);
  const password = useRef(null);

  const [usernameValidation, setUsernameValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const value = {
      email: username.current.value,
      password: password.current.value,
    };

    const emailVal = validateEmail(value.email);
    const passVal = validatePassword(value.password, true);
    setUsernameValidation(emailVal);
    setPasswordValidation(passVal);

    if (!passVal && !emailVal) {
      await mutateAsync({
        email: value.email,
        password: value.password,
      });
      navigate(location.state?.path || "/all-posts");
    }
  };

  return (
    <>
      <Wrapper>
        <FormWrapper onSubmit={onSubmitHandler}>
          {/* <ImageWrapper> */}
          <img
            src={Image}
            style={{ width: "85px", cursor: "pointer" }}
            alt="ETF Logo"
            onClick={() => {
              navigate("/");
            }}
          />
          {/* </ImageWrapper> */}
          <Title>Sign in</Title>
          <ContentWrapper></ContentWrapper>
          <InputField
            ref={username}
            placeholder="Enter email"
            type="text"
            style={{ marginBottom: "15px" }}
          />
          {usernameValidation && (
            <ValidationError>{usernameValidation}</ValidationError>
          )}
          <InputField
            ref={password}
            placeholder="Enter password"
            type="password"
            style={{ marginBottom: "15px" }}
          />
          {passwordValidation && (
            <ValidationError>{passwordValidation}</ValidationError>
          )}
          {!!error && (
            <Errors>
              {error}
              {/* {error.message.includes("username") && (
                <strong>{username.current.value}</strong>
              )} */}
            </Errors>
          )}
          <Button
            style={{
              background: "#ff9800",
              color: "#ffffff",
              padding: "5px 90px",
            }}
          >
            {isLoading ? <ButtonSpinner /> : "SIGN IN"}
          </Button>

          <ContentWrapper>
            Don't have an account{" "}
            <LinkNavigate to="/signup">Sign up</LinkNavigate>
          </ContentWrapper>
        </FormWrapper>
      </Wrapper>
    </>
  );
};

const LinkNavigate = styled(Link)`
  text-decoration: none;
  color: #2196f3;
  cursor: pointer;
  outline-color: #2196f3;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  text-align: center;
  padding-top: 5rem;
`;

const FormWrapper = styled.form`
  width: 20%;
  height: auto;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 20px;
  text-align: center;
  padding: 60px 100px;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.99);
`;

const InputField = styled.input`
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

const ImageWrapper = styled.a`
  text-align: center;
  width: 30px;
  height: 30px;
`;

const ContentWrapper = styled.p`
  text-align: center;
`;

const LinkTag = styled.a`
  color: #2196f3;
  cursor: pointer;
  outline-color: #2196f3;
`;

// const Button = styled.button`
//   border: 1px solid;
//   border-radius: 15px;
//   font-size: 1.1rem;
//   padding: 5px 15px;
//   background: #ff9800;
//   color: #ffffff;
//   cursor: pointer;
// `;

export default SignIn;
