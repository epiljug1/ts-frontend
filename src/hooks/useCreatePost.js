import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createPost } from "../service/post.service";

export const useCreatePost = (props) => {
  return useMutation(createPost, {
    onSuccess: ({ data }) => {
      toast("Successfully created a new post.");
      console.log("Created post: ", data)
    },
    ...props,
  });
};
