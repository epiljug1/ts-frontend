import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { postComment } from "../service/comment.service";

export const useCommentPost = (props) => {
  const queryClient = useQueryClient();
  return useMutation(postComment, {
    onSuccess: ({ post }) => {
      toast("New comment added.");
      queryClient.invalidateQueries(["single-post", post.data.id]);
    },
    ...props,
  });
};
