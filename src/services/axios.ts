import axios, { AxiosError } from "axios";
import { clearToken, getAccessToken } from "../utils/helpers/tokenHelper";

const apiUrl = import.meta.env.VITE_WEB_BASE_URL ?? "";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: apiUrl,
});

// Add an interceptor to attach the token to every request
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = "/login";
      return Promise.reject(new Error("Unauthorized access"));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
