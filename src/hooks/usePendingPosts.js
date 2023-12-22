import { useQuery } from "react-query";
import { getPendingPosts } from "../service/post.service";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

export const usePendingPosts = (searchData) => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  return useQuery(
    ["pending-posts", authContext?.user?.id, searchData],
    () => getPendingPosts(searchData),
    {
      onError: (err) => {
        if (err.response?.status === 401) {
          navigate("/signin");
        }
      },
      keepPreviousData: true,
    }
  );
};
