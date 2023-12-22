import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { getAllUsers } from "../service/user.service";
import { useAuthContext } from "./useAuthContext";

export const useAllUsers = () => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  return useQuery(["all-users", authContext?.user?.id], getAllUsers, {
    onError: (err) => {
      if (err.response?.status === 401) {
        navigate("/signin");
      }
    },
  });
};
