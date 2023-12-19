import { useMutation, useQueryClient } from "react-query";
import { likePost } from "../service/post.service";

export const useLikePost = (props) => {
  const queryClient = useQueryClient();
  return useMutation(likePost, {
    onSuccess: ({ data }) => {
      console.log("liked post");
      queryClient.refetchQueries(["all-posts"]);
      queryClient.refetchQueries(["user-posts"]);
    },
    ...props,
  });
};
