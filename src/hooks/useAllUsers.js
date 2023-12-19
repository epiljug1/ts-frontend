import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { getAllUsers } from "../service/user.service";

export const useAllUsers = () => {
  const navigate = useNavigate();
  return useQuery(["all-users"], getAllUsers, {
    onError: (err) => {
      console.log("ERR: ", err);
      if (err.response.status === 401) {
        navigate("/signin");
      }
    },
  });
};
