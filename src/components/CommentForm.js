import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button, { ButtonSpinner } from "./Button";
import { useCommentPost } from "../hooks/useCommentPost";
import { useAuthContext } from "../hooks/useAuthContext";

export default function CommentForm(props) {
  const user = useAuthContext().user;
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    watch,
    reset,
  } = useForm({});

  const { mutateAsync, isLoading } = useCommentPost();

  const content = watch("content");

  const onSubmit = async (data) => {
    await mutateAsync({
      content: data?.content,
      post: props.postId,
      user: user.id,
    });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("content", { required: "Content is required" })}
        placeholder="Comment..."
      />
      <ButtonWrapper disabled={!isDirty || !content} type="submit">
        {isLoading ? <ButtonSpinner /> : "Comment"}
      </ButtonWrapper>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;
  background: #d9cece;

  width: 75%;
  padding: 10px 20px;
  margin: 0 auto;
`;

const ButtonWrapper = styled(Button)`
  /* margin-top: 20px; */
`;

const Input = styled.input`
  border: 1px solid;
  border-radius: 5px;
  line-height: 1.15;
  font-size: 1.1rem;
  padding: 10px 5px;
  font-family: inherit;

  margin-left: auto;
  margin-right: auto;

  width: 90%;
  max-height: 400px;
`;
