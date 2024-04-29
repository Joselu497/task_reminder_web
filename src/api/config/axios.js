import axios from "axios";

/**
 * Check if the current environment is development.
 * @returns {boolean} True if the current environment is development, false otherwise.
 */
const isDevEnv = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

/**
 * Create an instance of Axios with custom configuration.
 * @returns {AxiosInstance} An instance of Axios with custom configuration.
 */
const axiosInstance = axios.create({
  baseURL: isDevEnv ? "http://localhost:8000/" : process.env.DB_HOST,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

/**
 * Add a request interceptor to add the Authorization header to every request.
 * @param {AxiosRequestConfig} config - The config object for the request.
 * @returns {AxiosRequestConfig} The modified config object with the Authorization header.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
