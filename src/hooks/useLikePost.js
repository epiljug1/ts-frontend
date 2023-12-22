import { useMutation, useQueryClient } from "react-query";
import { likePost } from "../service/post.service";

export const useLikePost = (props) => {
  const queryClient = useQueryClient();
  return useMutation(likePost, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["popular-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
    },
    ...props,
  });
};
