import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteComment } from "../service/comment.service";

export const useDeleteComment = (props) => {
  const queryClient = useQueryClient();

  return useMutation(deleteComment, {
    onSuccess: ({ data }) => {
      toast("Comment successfully removed.");
      queryClient.invalidateQueries(["single-post", data?.post]);
    },
    ...props,
  });
};
