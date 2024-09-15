import axios from "axios";

import { API_URL } from "../constants";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const storagedToken = localStorage.getItem("@App:token");
    if (storagedToken) {
      config.headers.Authorization = `Bearer ${storagedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
