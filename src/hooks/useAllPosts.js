import { useQuery } from "react-query";
import { getAllPosts } from "../service/post.service";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

export const useAllPosts = (searchData) => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  return useQuery(
    ["all-posts", authContext?.user?.id, searchData],
    () => getAllPosts(searchData),
    {
      onError: (err) => {
        console.log("ERR: ", err);
        if (err.response.status === 401) {
          navigate("/signin");
        }
      },
      keepPreviousData: true,
    }
  );
};
