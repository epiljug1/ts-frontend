import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { getPopularPost } from "../service/post.service";
import { useAuthContext } from "./useAuthContext";

export const usePopularPosts = (searchData) => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  return useQuery(
    ["popular-posts", authContext?.user?.id, searchData],
    () => getPopularPost(searchData),
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
