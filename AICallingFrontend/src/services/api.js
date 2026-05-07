import axios from "axios";

export const authAPI = axios.create({
  baseURL: "http://localhost:8084/api/auth",
});

export const leadAPI = axios.create({
  baseURL: "http://localhost:8081/api/leads",
});

export const campaignAPI = axios.create({
  baseURL: "http://localhost:8082/api/campaigns",
});

export const emailAPI = axios.create({
  baseURL: "http://localhost:8083/api/email",
});

leadAPI.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

campaignAPI.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

emailAPI.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});