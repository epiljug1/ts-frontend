import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { verifyPost } from "../service/post.service";

export const useVerifyPost = (props) => {
  const queryClient = useQueryClient();

  return useMutation(verifyPost, {
    onSuccess: ({ data }) => {
      toast("Post successfully verified.");
      console.log("Verified post");
      queryClient.refetchQueries(["pending-posts"]);
      queryClient.refetchQueries(["all-posts"]);
      queryClient.refetchQueries(["user-posts"]);
    },
    ...props,
  });
};
