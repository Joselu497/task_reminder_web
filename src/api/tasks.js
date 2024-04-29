import axiosInstance from "./config/axios";
import apiRoutes from "./config/routes.js";

/**
 * Get tasks from the API with optional query parameters.
 * @param {string} ordering - The field to order the tasks by. Default is 'title'.
 * @param {number} limit - The maximum number of tasks to return. Default is '-1' (no limit).
 * @param {number} offset - The index of the first task to return. Default is '0'.
 * @param {boolean|string} completed - Whether to return only completed tasks, only incomplete tasks, or all tasks.
 * @param {string} status - The status of the tasks to return.
 * @param {string} search - A search term to filter the tasks by.
 * @param {string|number} folder_id - The ID of the folder to filter the tasks by.
 * @param {Object} data - Additional data to send with the request.
 * @returns {Promise<Object>} A promise that resolves to the task data.
 */
export const getTasks = (ordering, limit, offset, completed, status, search, folder_id, data) => 
    axiosInstance.get(`${apiRoutes.tasks}?ordering=${ordering || 'title'}&limit=${limit || '-1'}&offset=${offset || '0'}&completed=${completed || ''}&status=${status || ''}&search=${search || ''}&folder_id=${folder_id || ''}`, data).then(response => response.data);
export const postTask = (data) => axiosInstance.post(apiRoutes.tasks, data).then(response => response.data);
export const putTask = (id, data) => axiosInstance.put(`${apiRoutes.tasks}${id}/`, data).then(response => response.data);
export const deleteTask = (id) => axiosInstance.delete(`${apiRoutes.tasks}${id}`).then(response => response.data);
export const completeTask = (id, data) => axiosInstance.put(`${apiRoutes.tasks}${id}/complete/`, data).then(response => response.data);
