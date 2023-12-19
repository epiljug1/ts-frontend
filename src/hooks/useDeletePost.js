import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deletePost } from "../service/post.service";

export const useDeletePost = (props) => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      toast("Post successfully removed.");
      queryClient.refetchQueries(["pending-posts"]);
      queryClient.refetchQueries(["all-posts"]);
      queryClient.refetchQueries(["user-posts"]);
    },
    ...props,
  });
};
