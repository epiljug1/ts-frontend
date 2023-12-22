import { useQuery } from "react-query";
import { getPost } from "../service/post.service";
import { useNavigate } from "react-router";

export const useSinglePost = (id, isEnabled) => {
  const navigate = useNavigate();
  return useQuery(["single-post", id], () => getPost(id), {
    onError: (err) => {
      if (err?.response?.status === 401) {
        navigate("/signin");
      }
    },
    keepPreviousData: true,
    enabled: isEnabled,
  });
};
