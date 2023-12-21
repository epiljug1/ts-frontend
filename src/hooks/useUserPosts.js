import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";
import { getUserPosts } from "../service/user.service";

export const useUserPost = (searchData) => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  return useQuery(
    ["user-posts", authContext.user.id, searchData],
    () => getUserPosts(searchData),
    {
      onError: (err) => {
        console.log("ERR: ", err);
        if (err?.response?.status === 401) {
          navigate("/signin");
        }
      },
      keepPreviousData: true,
    }
  );
};
