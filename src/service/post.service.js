import { api } from "../api/api.instance";
import { getSearchQuery } from "../utils/postSearchQuery";

export const getAllPosts = async (searchData) => {
  const query = getSearchQuery(searchData);
  const { data } = await api.get(`/posts${query}`);
  return data;
};

export const getPopularPost = async (searchData) => {
  const query = getSearchQuery(searchData);
  const { data } = await api.get(`/posts/popular${query}`);
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

export const getPendingPosts = async (searchData) => {
  const query = getSearchQuery(searchData);
  const { data } = await api.get("/posts/pending" + query);
  return data;
};

export const verifyPost = async (id) => {
  const { data } = await api.post(`/posts/${id}/verify`);
  return data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};
