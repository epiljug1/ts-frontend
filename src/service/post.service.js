import { api } from "../api/api.instance";

export const getAllPosts = async (searchData) => {
  let search = searchData.search ? `search=${searchData.search}` : ``;
  let citySearch = searchData.search ? `&search=${searchData.search}` : ``;
  const { data } = await api.get(`/posts?${search}${citySearch}`);
  return data;
};

export const createPost = async (postData) => {
  const { data } = await api.post("/posts/create", postData);
  return data;
};

export const likePost = async (id) => {
  const { data } = await api.post(`/posts/${id}/like`);
  return data;
};

export const getPendingPosts = async () => {
  const { data } = await api.get("/posts/pending");
  return data;
};

export const verifyPost = async (id) => {
  const { data } = await api.post(`/posts/${id}/verify`);
  return data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};
