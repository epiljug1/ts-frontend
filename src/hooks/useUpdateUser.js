import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { updateUser } from "../service/user.service";

export const useUpdateUser = (props) => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: ({ data }) => {
      toast("Profile updated.");
      queryClient.invalidateQueries(["all-users"]);
    },
    ...props,
  });
};
