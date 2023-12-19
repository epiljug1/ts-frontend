import { useMutation } from "react-query";
import { registerUser } from "../service/user.service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useRegister = (props) => {
  const navigate = useNavigate();

  return useMutation(registerUser, {
    onSuccess: ({ data }) => {
      toast("Successfully created a new account!");
      navigate("/signin");
    },
    ...props,
  });
};
