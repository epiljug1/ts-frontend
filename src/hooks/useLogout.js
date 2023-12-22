import { useMutation } from "react-query";
import { logoutUser } from "../service/user.service";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const authContext = useAuthContext();

  return useMutation(logoutUser, {
    onError: (err) => {
    },
    onSuccess: ({ data }) => {
      authContext.logout();
    },
  });
};
