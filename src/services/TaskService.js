import axios from "axios";



const base_url ="http://localhost:8080";

export const allTasks = () => axios.get(`${base_url}/tasks`);

export const addTask = (task) => axios.post(`${base_url}/task`, task);
export const getTask =(taskId) => axios.get(`${base_url}/tasks/${taskId}`);
export const updatedTask= (taskId, task) => axios.put(`${base_url}/tasks/${taskId}`,task);
export const removeTask = (taskId) => axios.delete(`${base_url}/tasks/${taskId}`);
