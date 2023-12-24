import styled from "styled-components";
import Button from "./Button";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLikePost } from "../hooks/useLikePost";
import { useDeletePost } from "../hooks/useDeletePost";
import { useState } from "react";
import EditPost from "../pages/EditPost";

//images
import Image from "../images/user.png";
import Location from "../images/location.png";
import Like from "../images/like.png";
import Liked from "../images/liked.png";
import Comment from "../images/comment.png";
import DeleteImage from "../images/delete-icon.png";
import OpenPost from "../images/open.png";

const Post = (props) => {
  const authContext = useAuthContext();
  const date = new Date(props.date).toString().slice(0, 24);

  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: removePost } = useDeletePost();

  const [modalIsOpen, setIsOpen] = useState(false);

  const onLike = async () => {
    await likePost(props.id);
  };

  const onRemove = async () => {
    await removePost(props.id);
  };

  const onOpenPost = () => {
    setIsOpen(true);
  };

  return (
    <MainWrapper>
      <EditPost
        // modalIsOpen={props.content === "evo ga"}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        postId={props.id}
        city={props.city}
        content={props.content}
        isUser={props.delete}
      />
      <ContentWrapper>
        <HeaderWrapper>
          <Title>
            <img
              src={Image}
              style={{ width: "30px", borderRadius: "50%" }}
              alt="Avatar"
            />
            {props.name + " " + props.surname}
          </Title>
          <LocationWrapper>
            {props.city.split(",")[0]}, {props.city.split(",")[2]}
            <img
              src={Location}
              style={{ width: "18px", marginLeft: "5px" }}
              alt="Location"
            />
          </LocationWrapper>
        </HeaderWrapper>
        <Description>{props.description}</Description>
        <PostWrapper>
          <DateWrapper>
            {/* {props.isUpdated ? "(Edited) " : ""} */}
            {date}
          </DateWrapper>
          {
            <NotificationWrapper>
              {authContext.user && !props.pendingPosts && !props.pending && (
                <>
                  <NotificationItem onClick={onLike}>
                    <img
                      src={props.isLiked ? Liked : Like}
                      style={{
                        width: "18px",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      alt="Like"
                    />
                    {props.likes}
                  </NotificationItem>
                  {(props.delete || authContext?.user?.role === "Admin") && (
                    <NotificationItem onClick={onRemove}>
                      <img
                        src={DeleteImage}
                        style={{
                          width: "18px",
                          marginLeft: "5px",
                          cursor: "pointer",
                        }}
                        title="Delete post"
                        alt="Delete"
                      />
                    </NotificationItem>
                  )}
                </>
              )}
              {authContext.user &&
                !props.pending &&
                authContext.user.role !== "Admin" && (
                  <NotificationItem onClick={onOpenPost}>
                    <img
                      src={OpenPost}
                      style={{
                        width: "18px",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      title="Open post"
                      alt="Open post"
                    />
                  </NotificationItem>
                )}
            </NotificationWrapper>
          }
          {props.pending && authContext.user.role !== "Admin" && (
            <div>Waiting for admin approve</div>
          )}
          {authContext.user &&
            authContext.user.role === "Admin" &&
            props.pendingPosts && (
              <ButtonWrapper>
                <Button onClick={() => props.onVerify(props.id)}>Verify</Button>
                <Button onClick={() => props.onRemove(props.id)}>Remove</Button>
              </ButtonWrapper>
            )}
          {props.isClient && (
            <div>
              <Button
                style={{
                  margin: "0px 10px",
                  borderRadius: "5px",
                  border: "1px solid rgba(79, 76, 129, 1)",
                }}
                onClick={props.onDeletePost}
              >
                Delete
              </Button>
              <Button
                style={{
                  margin: "0px 10px",
                  borderRadius: "5px",
                  border: "1px solid rgba(79, 76, 129, 1)",
                }}
                onClick={props.onOpenDialog}
              >
                Open
              </Button>
            </div>
          )}
        </PostWrapper>
        {/* {props.delete && <button onClick={props.onDeletePost}>Delete</button>} */}
      </ContentWrapper>
    </MainWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const NotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NotificationItem = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: transparent;
  border: 0;
`;

const LocationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2%;
  width: 300px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  font-style: italic;
  font-weight: bold;
`;

const PostWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MainWrapper = styled.div`
  width: 55vw;
  height: 250px;

  background: rgb(79, 76, 129);
  background: linear-gradient(
    180deg,
    rgba(79, 76, 129, 1) 0%,
    rgba(156, 70, 172, 1) 40%
  );

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  margin: 100px auto;

  // cursor: pointer;
`;

const ContentWrapper = styled.div`
  width: 90%;
  height: 85%;

  background: rgb(139, 134, 221);
  background: linear-gradient(
    180deg,
    rgba(139, 134, 221, 1) 0%,
    rgba(206, 150, 241, 1) 35%
  );

  border-radius: 20px;

  position: relative;
  padding: 10px 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 2%;
  width: 200px;
`;

const Description = styled.div`
  font-size: 1.2rem;
  color: rgba(0, 0, 0);

  font-weight: 400;

  text-align: justify;
  text-justify: inter-word;

  cursor: text;
`;

const DateWrapper = styled.div`
  font-size: 0.8rem;
`;

export default Post;
