import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { updatePost } from "../service/post.service";

export const useUpdatePost = (props) => {
  const queryClient = useQueryClient();
  return useMutation(updatePost, {
    onSuccess: ({ data }) => {
      toast("Successfully updated a post.");
      queryClient.invalidateQueries(["single-post", data.id]);
      queryClient.invalidateQueries(["pending-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
    },
    ...props,
  });
};
