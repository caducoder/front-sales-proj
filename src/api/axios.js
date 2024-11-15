import axios from "axios";

import { API_URL } from "../constants";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.get(`${API_URL}/sessions/refresh`, {
          withCredentials: true,
        });
        const { token } = response.data;
        localStorage.setItem("@App:token", JSON.stringify(token));

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        localStorage.removeItem("@App:token");
        // console.log('interceptor redirect');
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
