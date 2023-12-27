import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
