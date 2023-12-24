import { useMutation } from "react-query";
import { loginUser } from "../service/user.service";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const useLogin = (props) => {
  const authContext = useAuthContext();

  return useMutation(loginUser, {
    onSuccess: ({ data }) => {
      toast("You're successfully logged in.");
      authContext.login(data.user);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("authToken", data.user.token);
      localStorage.setItem(
        "name",
        `${data.user.firstName} ${data.user.firstName}`
      );
    },
    ...props,
  });
};
