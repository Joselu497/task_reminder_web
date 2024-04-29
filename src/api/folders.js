import axiosInstance from "./config/axios";
import apiRoutes from "./config/routes.js";

export const getFolders = (data) => axiosInstance.get(apiRoutes.folders, data).then(response => response.data);
export const postFolder = (data) => axiosInstance.post(apiRoutes.folders, data).then(response => response.data);
export const putFolder = (id, data) => axiosInstance.put(`${apiRoutes.folders}${id}/`, data).then(response => response.data);
export const deleteFolder = (id) => axiosInstance.delete(`${apiRoutes.folders}${id}`).then(response => response.data);