import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// Request interceptor (before sending the request)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // take the token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

// Response interceptor (after receiving the response)
axiosInstance.interceptors.response.use(
  (response) => response, // if the response success (200 - 299), just return response (let it go!)
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // 1) call api refresh to backend
        // Browser otomatis kirim refresh token di cookie karena withCredentials: true

        const res = await axios.get("http://localhost:8000/api/auth/refresh", {
          withCredentials: true,
        });
        const { user, accessToken } = res.data.data;

        // const newAccessToken = res.data.data.accessToken;

        // 2) update access token di zustand
        useAuthStore
          .getState()
          .setAuth(user.userId, user.email, user.role, accessToken);

        // 3) update Header di request yang tadi gagal
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // ulangi request yang tadi gagal
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // jika refresh token juga expired atau gagal
        useAuthStore.getState().clearAuth();
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
