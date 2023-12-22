import { useForm } from "react-hook-form";
import styled from "styled-components";
import NewModal from "../components/Modal";
import { useSinglePost } from "../hooks/useSinglePost";
import Errors from "../components/Errors";
import Button, { ButtonSpinner } from "../components/Button";
import CommentForm from "../components/CommentForm";
import DeleteImage from "../images/delete-icon.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { useUpdatePost } from "../hooks/useUpdatePost";

const EditPost = (props) => {
  const { modalIsOpen, setIsOpen } = props;
  const user = useAuthContext().user;
  const { data: postData } = useSinglePost(props.postId, modalIsOpen);

  const { mutateAsync: deleteComment } = useDeleteComment();
  const { mutateAsync: updatePost, isLoading: updatingPost } = useUpdatePost();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      content: props.content,
    },
  });

  const onSubmit = async (data) => {
    await updatePost({
      ...data,
      id: props.postId,
    });
    reset(data);
  };

  const onRemoveComment = async (id) => {
    await deleteComment(id);
  };

  const getDate = (date) => new Date(date).toString().slice(0, 24);

  return (
    <NewModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
      <MainWrapper>
        <Title>
          <i>{props.city}</i>
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("content", { required: "Content is required" })}
            disabled={!props.isUser}
            placeholder="Enter content"
          />
          {errors.content && <Errors>{errors.content.message}</Errors>}
          {props.isUser && (
            <NewWrapper>
              <ButtonWrapper disabled={!isDirty} type="submit">
                {updatingPost ? <ButtonSpinner /> : "Edit Post"}
              </ButtonWrapper>
            </NewWrapper>
          )}
        </form>
      </MainWrapper>
      <hr />
      <CommentContentWrapper>
        {postData &&
          postData.comments.map((item) => {
            return (
              <CommentWrapper key={item.createdAt}>
                <CommentHeader>
                  <div>
                    {item.user.firstName} {item.user.firstName}
                  </div>
                  <div>{getDate(item.createdAt)}</div>
                </CommentHeader>
                <Label>{item.content}</Label>
                {(item.user.id === user.id || props.isUser) && (
                  <DeleteItem onClick={() => onRemoveComment(item.id)}>
                    <img
                      src={DeleteImage}
                      style={{
                        width: "18px",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      title="Remove comment"
                      alt="Remove comment"
                    />
                  </DeleteItem>
                )}
              </CommentWrapper>
            );
          })}
      </CommentContentWrapper>
      <CommentForm postId={props.postId} />
    </NewModal>
  );
};

const DeleteItem = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: transparent;
  border: 0;
`;

const CommentContentWrapper = styled.div`
  max-height: 500px;
  max-width: 1000px;
  overflow-y: auto;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;
  background: #d9cece;
  width: 75%;
  margin: 15px auto;
`;

const Label = styled.div`
  font-size: 1rem;
  font-style: italic;
  font-weight: 700;
  margin-left: 10px;
  width: 95%;
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

const Title = styled.div`
  font-weight: 700;
  font-size: 2rem;
  color: black;
  margin-bottom: 20px;
`;

const MainWrapper = styled.div`
  overflow: scroll;

  width: 75%;
  height: 50%;

  display: flex;
  flex-direction: column;
  margin: 0 auto 20px;

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

export default EditPost;
