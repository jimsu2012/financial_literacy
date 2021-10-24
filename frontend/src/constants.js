import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const setToken = (token) => {
  localStorage.setItem("token", token);
  axiosInstance.defaults.headers.common["Authorization"] = `Token ${token}`;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setUserId = (id) => {
  localStorage.setItem("id", id);
};

export const getUserId = () => {
  return localStorage.getItem("id");
};
