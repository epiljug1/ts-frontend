import React, { useState } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import Image from "../images/logo2.jpg";
import Button, { ButtonSpinner } from "../components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  validateEmail,
  validatePassword,
  validateInput,
} from "../utils/validateData";
import Errors from "../components/Errors";
import { useRegister } from "../hooks/useRegister";

const SignUp = (props) => {
  const [error, setError] = useState("");
  const { mutateAsync, isLoading } = useRegister({
    onError: (error) => {
      // Assuming error contains a message, adjust as needed
      // console.log("error:error", error.response.data.message);
      setError(
        error.response.data.message || "An error occurred during login."
      );
    },
  });
  let value = {};

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameValidation, setNameValidation] = useState("");
  const [surnameValidation, setSurnameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  let navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    value = {
      firstName: name,
      lastName: surname,
      email,
      password,
    };
    const nameValidation = validateInput(name, "Name");
    const lastnameValidation = validateInput(surname, "Surname");
    const emailValidation = validateEmail(email);
    const passValidation = validatePassword(password);
    setNameValidation(nameValidation);
    setSurnameValidation(lastnameValidation);
    setEmailValidation(emailValidation);
    setPasswordValidation(passValidation);

    const isValid = !(
      nameValidation ||
      lastnameValidation ||
      emailValidation ||
      passValidation
    );

    if (isValid) {
      await mutateAsync(value);
    }
  };
  const onNameChange = (e) => {
    const name = e.target.value.trim();
    setName(name);
  };
  return (
    <Wrapper>
      <FormWrapper onSubmit={onSubmitHandler}>
        <img
          src={Image}
          style={{ width: "85px", cursor: "pointer" }}
          alt="ETF Logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <Title>Sign Up</Title>
        {/* <ContentWrapper>Input your info</ContentWrapper> */}
        <InputField
          value={name}
          onChange={onNameChange}
          placeholder="First Name"
          type="text"
          style={{ marginBottom: "15px" }}
        />
        {nameValidation && <ValidationError>{nameValidation}</ValidationError>}
        <InputField
          value={surname}
          onChange={(e) => setSurname(e.target.value.trim())}
          placeholder="Last Name"
          type="text"
          style={{ marginBottom: "15px" }}
        />
        {surnameValidation && (
          <ValidationError>{surnameValidation}</ValidationError>
        )}
        <InputField
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          placeholder="example@exmaple.com"
          type="email"
          style={{ marginBottom: "15px" }}
        />
        {emailValidation && (
          <ValidationError>{emailValidation}</ValidationError>
        )}
        <InputField
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          placeholder="Password"
          type="password"
          style={{ marginBottom: "15px" }}
        />
        {passwordValidation && (
          <ValidationError>{passwordValidation}</ValidationError>
        )}
        {!!error && <Errors>{error}</Errors>}
        <Button
          type="submit"
          style={{
            background: "#ff9800",
            color: "#ffffff",
            padding: "5px 90px",
          }}
        >
          {isLoading ? <ButtonSpinner /> : "SIGN UP"}
        </Button>
        <ContentWrapper>
          Already have an account{" "}
          <LinkNavigate to="/signin">Sign in</LinkNavigate>
        </ContentWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

const ValidationError = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: -15px;
  margin-bottom: 10px;
`;

const LinkNavigate = styled(Link)`
  text-decoration: none;
  color: #2196f3;
  cursor: pointer;
  outline-color: #2196f3;
`;
export default SignUp;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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
`;

const ImageWrapper = styled.a`
  text-align: center;
  width: 30px;
  height: 30px;
`;

const ContentWrapper = styled.p`
  text-align: center;
`;
