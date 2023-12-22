import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deletePost } from "../service/post.service";

export const useDeletePost = (props) => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      toast("Post successfully removed.");
      queryClient.invalidateQueries(["pending-posts"]);
      queryClient.invalidateQueries(["popular-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
    },
    ...props,
  });
};
