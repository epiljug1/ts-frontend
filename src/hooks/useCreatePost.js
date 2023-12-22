import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createPost } from "../service/post.service";

export const useCreatePost = (props) => {
  const queryClient = useQueryClient();
  return useMutation(createPost, {
    onSuccess: ({ data }) => {
      toast("Successfully created a new post.");
      queryClient.invalidateQueries(["pending-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
    },
    ...props,
  });
};
