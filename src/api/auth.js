import axiosInstance from "./config/axios";
import apiRoutes from "./config/routes.js";

export const login = (data) => axiosInstance.post(apiRoutes.login, data).then(response => response.data);
export const register = (data) => axiosInstance.post(apiRoutes.register, data).then(response => response.data);
