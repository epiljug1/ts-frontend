import { api } from "../api/api.instance";
import { getSearchQuery } from "../utils/postSearchQuery";

export const loginUser = async (data) => {
  return await api.post("/users/authenticate", data);
};

export const logoutUser = async () => {
  return await api.post("/users/logout");
};

export const registerUser = async (data) => {
  return await api.post("/users/register", data);
};

export const updateUser = async ({ id, ...data }) => {
  return await api.put(`/users/${id}`, data);
};

export const getAllUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const currentUser = async () => {
  return await api.get("/users/current");
};

export const getUserPosts = async (searchData) => {
  const query = getSearchQuery(searchData);
  const { data } = await api.get("/users/posts" + query);
  return data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};
