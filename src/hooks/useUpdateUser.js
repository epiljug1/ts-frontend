import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { updateUser } from "../service/user.service";

export const useUpdateUser = (props) => {
  return useMutation(updateUser, {
    onSuccess: ({ data }) => {
      toast("Profile updated.");
    },
    ...props,
  });
};
