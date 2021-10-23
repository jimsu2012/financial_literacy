import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getHeaders = () => {
  return { Authorization: `Token ${getToken()}` };
};
