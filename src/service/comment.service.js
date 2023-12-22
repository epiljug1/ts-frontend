import { api } from "../api/api.instance";

export const postComment = async (commentData) => {
  const { data } = await api.post("/comments/create", commentData);
  return data;
};

export const deleteComment = async (id) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data;
};
