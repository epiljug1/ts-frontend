import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteUser } from "../service/user.service";

export const useRemoveUser = (props) => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      toast("User successfully removed.");
      queryClient.invalidateQueries(["all-users"]);
      queryClient.invalidateQueries(["pending-posts"]);
      queryClient.invalidateQueries(["popular-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
    },
    ...props,
  });
};
